import { CONFIG, normalizePhone } from '../config.js';

export async function handleAdminAPI(path, request, env) {
    // POST /api/admin/login — xác thực tài khoản/mật khẩu Admin HOÀN TOÀN
    // ở server, không còn lộ ra ngoài client JS như trước (trước đây so
    // sánh trực tiếp trong <script> gửi về trình duyệt — ai bấm "View Page
    // Source" cũng đọc được mật khẩu). Route này KHÔNG yêu cầu token trước
    // vì đây chính là bước cấp token, nên đặt trước lớp chặn token bên dưới.
    // TODO cân nhắc sau: chuyển "Mos360" sang Cloudflare Workers Secret
    // (env.ADMIN_PASSWORD) thay vì hardcode trong source, để đổi mật khẩu
    // không cần sửa/deploy lại code.
    if (path === '/api/admin/login' && request.method === 'POST') {
        try {
            const body = await request.json();
            const u = (body.user || '').trim();
            const p = (body.pass || '').trim();
            if (u === 'admin@mos360' && p === 'Mos360') {
                return json({ success: true, token: 'mos360admin2026' });
            }
            return json({ success: false, msg: 'Tài khoản hoặc mật khẩu quản lý không đúng!' }, 401);
        } catch (e) {
            return json({ success: false, msg: 'Yêu cầu không hợp lệ' }, 400);
        }
    }

    // Kiểm tra admin auth (áp dụng cho mọi route admin còn lại bên dưới)
    const authHeader = request.headers.get('X-Admin-Token') || '';
    const url = new URL(request.url);
    const token = url.searchParams.get('token') || authHeader;
    if (token !== 'mos360admin2026') {
        return json({ success: false, msg: 'Unauthorized' }, 401);
    }

    // GET /api/admin/students — lấy danh sách học viên
    // Đọc TRỰC TIẾP qua Apps Script (action "list") — luôn là dữ liệu mới
    // nhất trong sheet tại thời điểm gọi. TRƯỚC ĐÂY đọc qua link
    // "Publish to web" (CONFIG.STUDENT_SHEET_URL) — bị Google cache riêng
    // và có thể không tự xuất bản lại, khiến sửa trong Sheet không thấy
    // đồng bộ ngay trên Dashboard.
    if (path === '/api/admin/students') {
        try {
            const result = await callAppsScript('list', {}, env);
            if (!result.success) return json({ success: false, msg: result.msg || 'Lỗi tải dữ liệu học viên' });
            return json({ success: true, students: result.students || [] });
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

    // POST /api/admin/update-student — sửa thông tin học viên (Họ tên, SĐT,
    // Khóa học, Trường, Lớp, Kênh, Ghi chú, Ngày ĐK, Hết hạn)
    if (path === '/api/admin/update-student' && request.method === 'POST') {
        try {
            const body = await request.json();
            const result = await callAppsScript('update', body, env);
            return json(result);
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // POST /api/admin/delete-student — xóa 1 học viên khỏi sheet
    if (path === '/api/admin/delete-student' && request.method === 'POST') {
        try {
            const body = await request.json();
            const result = await callAppsScript('delete', body, env);
            return json(result);
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // GET /api/admin/promo — lấy cấu hình KM hiện tại
    if (path === '/api/admin/promo' && request.method === 'GET') {
        try {
            const raw = await env.MOS360_USERS_KV.get('promo_config');
            const promo = raw ? JSON.parse(raw) : {
                active: false,
                title: '',
                subtitle: '',
                badge: '',
                deadline: '',
                color: '#FF5722',
                showBanner: true,
                showSection: true,
                discounts: []
            };
            return json({ success: true, promo });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // POST /api/admin/promo — lưu cấu hình KM
    if (path === '/api/admin/promo' && request.method === 'POST') {
        try {
            const body = await request.json();
            await env.MOS360_USERS_KV.put('promo_config', JSON.stringify(body));
            return json({ success: true, msg: 'Đã lưu cấu hình khuyến mãi!' });
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