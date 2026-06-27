// api/links-api.js — CRUD cho MOS360_LINKS_KV
// Key trong KV: "{slug}" → JSON LinkRecord
// Key danh mục index: "idx:all" → JSON string[] (danh sách slug, tối đa 500)

// LinkRecord { key, title, url, cat, note, clicks, created, updated }

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
        return json({ links: entries.filter(Boolean) });
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
        const raw = await kv.get(key);
        if (!raw) return json({ ok: false, msg: 'Not found' });
        const rec = JSON.parse(raw);
        rec.clicks = (rec.clicks || 0) + 1;
        await kv.put(key, JSON.stringify(rec));
        return json({ ok: true, clicks: rec.clicks });
    }

    // ── POST /api/links/bulk ─────────────────────────────────────
    // Import hàng loạt trong 1 request — nhanh, không bị ngắt khi deploy
    if (path === '/api/links/bulk' && request.method === 'POST') {
        if (!isAdmin(request)) return json({ ok: false, msg: 'Không có quyền' }, 403);

        const body = await request.json().catch(() => ({}));
        const links = body.links || [];
        if (!links.length) return json({ ok: false, msg: 'Không có links nào' });

        const now = Date.now();
        const slugs = [];
        let fail = 0;

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

        // Cập nhật index — merge với slugs đã có (nếu có)
        const idxRaw = await kv.get('idx:all');
        const existing = idxRaw ? JSON.parse(idxRaw) : [];
        // Thêm slug mới vào đầu, loại bỏ trùng
        const merged = [...new Set([...slugs, ...existing])];
        await kv.put('idx:all', JSON.stringify(merged));

        return json({ ok: true, count: slugs.length, fail, total: merged.length });
    }

    // ── POST /api/links/clear ────────────────────────────────────
    // Xóa toàn bộ links trong KV kể cả data cũ có prefix link:
    if (path === '/api/links/clear' && request.method === 'POST') {
        if (!isAdmin(request)) return json({ ok: false, msg: 'Không có quyền' }, 403);

        try {
            const toDelete = new Set();

            // 1. Đọc idx:all để lấy slugs hiện tại
            const idxRaw = await kv.get('idx:all');
            const slugs = idxRaw ? JSON.parse(idxRaw) : [];
            slugs.forEach(s => toDelete.add(s));
            toDelete.add('idx:all');

            // 2. Scan prefix 'link:' để xóa data cũ
            let cursor;
            do {
                const result = cursor
                    ? await kv.list({ prefix: 'link:', cursor, limit: 1000 })
                    : await kv.list({ prefix: 'link:', limit: 1000 });
                result.keys.forEach(k => toDelete.add(k.name));
                cursor = result.list_complete ? undefined : result.cursor;
            } while (cursor);

            // 3. Xóa tất cả
            const keys = [...toDelete];
            await Promise.all(keys.map(k => kv.delete(k)));

            return json({ ok: true, deleted: keys.length });
        } catch (e) {
            return json({ ok: false, msg: e.message, stack: e.stack }, 500);
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

    const rec = JSON.parse(raw);
    // Tăng click counter bất đồng bộ (không block redirect)
    rec.clicks = (rec.clicks || 0) + 1;
    kv.put(slug, JSON.stringify(rec)); // fire and forget

    return Response.redirect(rec.url, 302);
}