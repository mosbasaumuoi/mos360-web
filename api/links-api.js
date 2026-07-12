// api/links-api.js — CRUD cho MOS360_LINKS_KV
// Key trong KV: "{slug}" → JSON LinkRecord
// Key danh mục index: "idx:all" → JSON string[] (danh sách slug, tối đa 500)

// LinkRecord { key, title, url, cat, note, clicks, created, updated }

// ── Sampling cho counter "clicks" ──────────────────────────────────────
// Số click chỉ mang tính tham khảo (không phải dữ liệu quan trọng), nhưng
// mỗi click trước đây tốn 1 put KV → link càng phổ biến càng ngốn quota
// (đúng là nguồn ngốn quota nếu link được nhiều học viên bấm mỗi ngày).
// Giờ chỉ ghi thật 1/100 lượt click, mỗi lần ghi cộng dồn x100 — số liệu
// hiển thị vẫn xấp xỉ đúng mà giảm ~99% số put cho phần này.
const CLICK_SAMPLE_RATE = 1 / 100;
const CLICK_STEP = Math.round(1 / CLICK_SAMPLE_RATE); // = 100

export async function handleLinksAPI(path, request, env) {
    const kv = env.MOS360_LINKS_KV;
    const json = (data, status = 200) =>
        new Response(JSON.stringify(data), {
            status,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
        });

    // ── Xác thực admin (mọi thao tác write) ─────────────────────
    function isAdmin(req) {
        const cookie = req.headers.get('Cookie') || '';
        const authH = req.headers.get('X-Admin-Auth') || '';
        // Client gửi kèm header X-Admin-Auth khi gọi từ fetch() phía JS
        return cookie.includes('mos360_admin=true') || authH === 'mos360_admin';
    }

    // ── GET /api/links/list ──────────────────────────────────────
    // Công khai: chỉ trả về danh mục "form" (📝 Đăng ký).
    // Admin (có cookie/token hợp lệ): trả về toàn bộ thư viện.
    if (path === '/api/links/list' && request.method === 'GET') {
        const idxRaw = await kv.get('idx:all');
        const slugs = idxRaw ? JSON.parse(idxRaw) : [];
        if (!slugs.length) return json({ links: [] });

        const entries = await Promise.all(
            slugs.map(async (slug) => {
                const raw = await kv.get(slug);
                return raw ? JSON.parse(raw) : null;
            })
        );
        let links = entries.filter(Boolean);
        if (!isAdmin(request)) {
            links = links.filter((l) => l.cat === 'form');
        }
        return json({ links });
    }

    // ── POST /api/links/save ─────────────────────────────────────
    if (path === '/api/links/save' && request.method === 'POST') {
        if (!isAdmin(request)) return json({ ok: false, msg: 'Không có quyền' }, 403);

        const body = await request.json().catch(() => ({}));
        let { key, title, url, cat, note, editKey } = body;

        if (!title) return json({ ok: false, msg: 'Thiếu tên link' });
        if (!url || !url.startsWith('http')) return json({ ok: false, msg: 'URL không hợp lệ' });

        const isEdit = !!editKey;

        if (isEdit) {
            // Chỉ cập nhật URL + meta, giữ nguyên key và clicks
            key = editKey;
            const existing = await kv.get(key);
            const prev = existing ? JSON.parse(existing) : {};
            const record = { ...prev, title, url, cat: cat || 'other', note: note || '', updated: Date.now() };
            await kv.put(key, JSON.stringify(record));
            return json({ ok: true, key });
        }

        // Tạo mới — sinh key nếu trống
        if (!key) {
            key = title.toLowerCase()
                .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                .replace(/[ìíịỉĩ]/g, 'i')
                .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                .replace(/[ùúụủũưừứựửữ]/g, 'u')
                .replace(/[ỳýỵỷỹ]/g, 'y')
                .replace(/đ/g, 'd')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .slice(0, 32);
            // Đảm bảo unique
            const existing = await kv.get(key);
            if (existing) key = key + '-' + Date.now().toString(36).slice(-4);
        }

        // Kiểm tra trùng key
        const conflict = await kv.get(key);
        if (conflict) return json({ ok: false, msg: 'Key "' + key + '" đã tồn tại. Vui lòng chọn key khác.' });

        const record = { key, title, url, cat: cat || 'other', note: note || '', clicks: 0, created: Date.now(), updated: Date.now() };
        await kv.put(key, JSON.stringify(record));

        // Cập nhật index
        const idxRaw = await kv.get('idx:all');
        const slugs = idxRaw ? JSON.parse(idxRaw) : [];
        if (!slugs.includes(key)) {
            slugs.unshift(key); // thêm đầu danh sách (mới nhất trước)
            await kv.put('idx:all', JSON.stringify(slugs));
        }

        return json({ ok: true, key });
    }

    // ── POST /api/links/delete ───────────────────────────────────
    if (path === '/api/links/delete' && request.method === 'POST') {
        if (!isAdmin(request)) return json({ ok: false, msg: 'Không có quyền' }, 403);
        const body = await request.json().catch(() => ({}));
        const { key } = body;
        if (!key) return json({ ok: false, msg: 'Thiếu key' });

        await kv.delete(key);
        const idxRaw = await kv.get('idx:all');
        const slugs = idxRaw ? JSON.parse(idxRaw) : [];
        const newIdx = slugs.filter((s) => s !== key);
        await kv.put('idx:all', JSON.stringify(newIdx));
        return json({ ok: true });
    }

    // ── POST /api/links/click ─────────────────────────────────────
    // Gọi từ redirect handler để tăng counter
    if (path.startsWith('/api/links/click/') && request.method === 'POST') {
        const key = path.split('/api/links/click/')[1];
        if (!key) return json({ ok: false });
        // Sampling: chỉ ghi KV cho 1/100 lượt click (xem giải thích đầu file)
        if (Math.random() >= CLICK_SAMPLE_RATE) return json({ ok: true, sampled: false });
        const raw = await kv.get(key);
        if (!raw) return json({ ok: false, msg: 'Not found' });
        const rec = JSON.parse(raw);
        rec.clicks = (rec.clicks || 0) + CLICK_STEP;
        await kv.put(key, JSON.stringify(rec));
        return json({ ok: true, clicks: rec.clicks });
    }

    // ── POST /api/links/bulk ─────────────────────────────────────
    // Import hàng loạt trong 1 request — nhanh, không bị ngắt khi deploy
    if (path === '/api/links/bulk' && request.method === 'POST') {
        if (!isAdmin(request)) return json({ ok: false, msg: 'Không có quyền' }, 403);

        try {
            const body = await request.json().catch(() => ({}));
            const links = body.links || [];
            if (!links.length) return json({ ok: false, msg: 'Không có links nào' });

            const now = Date.now();
            const slugs = [];
            let fail = 0;

            // Ghi từng link vào KV
            for (const l of links) {
                if (!l.key || !l.url || !l.title) { fail++; continue; }
                const record = {
                    key: l.key,
                    title: l.title,
                    url: l.url,
                    cat: l.cat || 'other',
                    note: l.note || '',
                    clicks: l.clicks || 0,
                    created: l.created || now,
                    updated: l.updated || now
                };
                await kv.put(l.key, JSON.stringify(record));
                slugs.push(l.key);
            }

            // Ghi đè idx:all hoàn toàn (không merge để đảm bảo sạch)
            await kv.put('idx:all', JSON.stringify(slugs));

            return json({ ok: true, count: slugs.length, fail, total: slugs.length });
        } catch (e) {
            return json({ ok: false, msg: e.message }, 500);
        }
    }

    // ── POST /api/links/clear ────────────────────────────────────
    // Xóa toàn bộ links trong KV kể cả data cũ có prefix link:
    if (path === '/api/links/clear' && request.method === 'POST') {
        if (!isAdmin(request)) return json({ ok: false, msg: 'Không có quyền' }, 403);

        try {
            // Chiến lược tiết kiệm KV delete quota:
            // Chỉ xóa idx:all → library hiện trống
            // Khi import bulk mới → idx:all được ghi đè, data cũ tự bị bỏ qua
            // (data cũ vẫn tồn tại trong KV nhưng không được index → vô hiệu)
            await kv.delete('idx:all');

            // Cũng xóa các key link: cũ nếu còn (tối đa 100 để không vượt quota)
            const oldIdx = await kv.list({ prefix: 'link:', limit: 100 });
            if (oldIdx.keys.length > 0) {
                await Promise.all(oldIdx.keys.map(k => kv.delete(k.name)));
            }

            return json({ ok: true, deleted: 1 + oldIdx.keys.length, msg: 'Đã xóa index. Import JSON để tạo lại.' });
        } catch (e) {
            return json({ ok: false, msg: e.message }, 500);
        }
    }

    return new Response('Not found', { status: 404 });
}

// ── REDIRECT HANDLER (gọi từ index.js khi path không khớp route) ──────────
// Dùng cho: path = "/" + slug (short URL từ go.mos360.vn hoặc từ mos360.vn/go/*)
export async function handleLinkRedirect(slug, env) {
    const kv = env.MOS360_LINKS_KV;
    const raw = await kv.get(slug);
    if (!raw) return null; // không tìm thấy → để caller xử lý 404

    // Sampling: chỉ ghi KV cho 1/100 lượt click (xem giải thích đầu file).
    // Đây là nơi tốn quota nhiều nhất trước đây vì MỌI lượt bấm link rút
    // gọn (short link) đều chạy qua đây.
    if (Math.random() < CLICK_SAMPLE_RATE) {
        const rec = JSON.parse(raw);
        rec.clicks = (rec.clicks || 0) + CLICK_STEP;
        kv.put(slug, JSON.stringify(rec)); // fire and forget
    }

    const { url } = JSON.parse(raw);
    return Response.redirect(url, 302);
}