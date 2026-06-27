// api/links-api.js — CRUD cho MOS360_LINKS_KV
// Key trong KV: "link:{slug}" → JSON LinkRecord
// Key danh mục index: "idx:all" → JSON string[] (danh sách slug, tối đa 500)

// LinkRecord { key, title, url, cat, note, clicks, created, updated }

import MOS360_LINKS from "../mos360_links.json";

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
        return cookie.includes('mos360_admin=true') || authH === 'mos360_admin';
    }

    // ── GET /api/links/list ──────────────────────────────────────
    if (path === '/api/links/list' && request.method === 'GET') {
        const idxRaw = await kv.get('idx:all');
        const slugs = idxRaw ? JSON.parse(idxRaw) : [];

        // Nếu KV trống → fallback về file JSON tĩnh
        if (!slugs.length) {
            const staticLinks = (MOS360_LINKS.links || []).map(function (l) {
                return {
                    key: l.key,
                    title: l.title,
                    url: l.url,
                    cat: l.cat || 'other',
                    note: l.note || '',
                    clicks: 0,
                    created: 0,
                    updated: 0,
                    _static: true   // đánh dấu để client biết là chưa sync KV
                };
            });
            return json({ links: staticLinks, source: 'static' });
        }

        const entries = await Promise.all(
            slugs.map(async (slug) => {
                const raw = await kv.get('link:' + slug);
                return raw ? JSON.parse(raw) : null;
            })
        );
        return json({ links: entries.filter(Boolean), source: 'kv' });
    }

    // ── POST /api/links/seed ─────────────────────────────────────
    // Seed toàn bộ mos360_links.json vào KV (chỉ chạy 1 lần hoặc khi cần reset)
    if (path === '/api/links/seed' && request.method === 'POST') {
        if (!isAdmin(request)) return json({ ok: false, msg: 'Không có quyền' }, 403);

        const links = MOS360_LINKS.links || [];
        if (!links.length) return json({ ok: false, msg: 'File JSON trống' });

        const now = Date.now();
        const slugs = [];
        for (const l of links) {
            if (!l.key || !l.url || !l.title) continue;
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
            await kv.put('link:' + l.key, JSON.stringify(record));
            slugs.push(l.key);
        }

        await kv.put('idx:all', JSON.stringify(slugs));
        return json({ ok: true, count: slugs.length });
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
            key = editKey;
            const existing = await kv.get('link:' + key);
            const prev = existing ? JSON.parse(existing) : {};
            const record = { ...prev, title, url, cat: cat || 'other', note: note || '', updated: Date.now() };
            await kv.put('link:' + key, JSON.stringify(record));
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
            const existing = await kv.get('link:' + key);
            if (existing) key = key + '-' + Date.now().toString(36).slice(-4);
        }

        const conflict = await kv.get('link:' + key);
        if (conflict) return json({ ok: false, msg: 'Key "' + key + '" đã tồn tại. Vui lòng chọn key khác.' });

        const record = { key, title, url, cat: cat || 'other', note: note || '', clicks: 0, created: Date.now(), updated: Date.now() };
        await kv.put('link:' + key, JSON.stringify(record));

        const idxRaw = await kv.get('idx:all');
        const slugs = idxRaw ? JSON.parse(idxRaw) : [];
        if (!slugs.includes(key)) {
            slugs.unshift(key);
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

        await kv.delete('link:' + key);
        const idxRaw = await kv.get('idx:all');
        const slugs = idxRaw ? JSON.parse(idxRaw) : [];
        const newIdx = slugs.filter((s) => s !== key);
        await kv.put('idx:all', JSON.stringify(newIdx));
        return json({ ok: true });
    }

    // ── POST /api/links/click ─────────────────────────────────────
    if (path.startsWith('/api/links/click/') && request.method === 'POST') {
        const key = path.split('/api/links/click/')[1];
        if (!key) return json({ ok: false });
        const raw = await kv.get('link:' + key);
        if (!raw) return json({ ok: false, msg: 'Not found' });
        const rec = JSON.parse(raw);
        rec.clicks = (rec.clicks || 0) + 1;
        await kv.put('link:' + rec.key, JSON.stringify(rec));
        return json({ ok: true, clicks: rec.clicks });
    }

    return new Response('Not found', { status: 404 });
}

// ── REDIRECT HANDLER ──────────────────────────────────────────
export async function handleLinkRedirect(slug, env) {
    const kv = env.MOS360_LINKS_KV;
    const raw = await kv.get('link:' + slug);

    // Nếu không có trong KV, thử tìm trong file tĩnh
    if (!raw) {
        const staticLink = (MOS360_LINKS.links || []).find(l => l.key === slug);
        if (!staticLink) return null;
        return Response.redirect(staticLink.url, 302);
    }

    const rec = JSON.parse(raw);
    rec.clicks = (rec.clicks || 0) + 1;
    kv.put('link:' + slug, JSON.stringify(rec)); // fire and forget

    return Response.redirect(rec.url, 302);
}