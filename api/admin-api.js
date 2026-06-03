import { CONFIG, normalizePhone } from '../config.js';

export async function handleAdminAPI(path, request, env) {
    // Kiểm tra admin auth
    const authHeader = request.headers.get('X-Admin-Token') || '';
    const url = new URL(request.url);
    const token = url.searchParams.get('token') || authHeader;
    if (token !== 'mos360admin2026') {
        return json({ success: false, msg: 'Unauthorized' }, 401);
    }

    // GET /api/admin/students — lấy danh sách học viên
    if (path === '/api/admin/students') {
        try {
            const resp = await fetch(CONFIG.STUDENT_SHEET_URL + '&v=' + Date.now());
            const tsv = await resp.text();
            const rows = tsv.split('\n').slice(1);
            const students = [];
            rows.forEach(row => {
                const cols = row.split('\t');
                if (cols.length < 2) return;
                const course = (cols[0] || '').replace(/\r/g, '').trim();
                const phone = (cols[1] || '').replace(/\r/g, '').trim();
                const date = (cols[2] || '').replace(/\r/g, '').trim();
                const expire = (cols[3] || '').replace(/\r/g, '').trim();
                if (course && phone) students.push({ course, phone, date, expire });
            });
            return json({ success: true, students });
        } catch (e) {
            return json({ success: false, msg: 'Lỗi tải sheet: ' + e.message });
        }
    }

    // GET /api/admin/devices — đếm thiết bị
    if (path === '/api/admin/devices') {
        const phone = normalizePhone(url.searchParams.get('phone') || '');
        const course = (url.searchParams.get('course') || '').replace(/\s+/g, ' ').trim().toLowerCase();
        const kvKey = phone + '_' + course.replace(/\s+/g, '_');
        try {
            const stored = await env.MOS360_USERS_KV.get(kvKey);
            const devices = stored ? JSON.parse(stored) : [];
            return json({ success: true, count: devices.length, devices });
        } catch (e) {
            return json({ success: true, count: 0 });
        }
    }

    // POST /api/admin/reset-devices — reset thiết bị
    if (path === '/api/admin/reset-devices' && request.method === 'POST') {
        try {
            const body = await request.json();
            const phone = normalizePhone(body.phone || '');
            const course = (body.course || '').replace(/\s+/g, ' ').trim().toLowerCase();
            const kvKey = phone + '_' + course.replace(/\s+/g, '_');
            await env.MOS360_USERS_KV.delete(kvKey);
            return json({ success: true, msg: 'Reset thành công!' });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // POST /api/admin/renew — gia hạn học viên
    if (path === '/api/admin/renew' && request.method === 'POST') {
        try {
            const body = await request.json();
            const result = await callAppsScript('renew', body, env);
            return json(result);
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // POST /api/admin/add-student — thêm học viên
    if (path === '/api/admin/add-student' && request.method === 'POST') {
        try {
            const body = await request.json();
            const result = await callAppsScript('add', body, env);
            return json(result);
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    return json({ success: false, msg: 'API not found' }, 404);
}

async function callAppsScript(action, data, env) {
    if (!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
        return { success: false, msg: 'Chưa cấu hình Google Apps Script URL!' };
    }
    const resp = await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data })
    });
    return await resp.json();
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
}
