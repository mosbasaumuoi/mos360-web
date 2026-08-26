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

    // GET /api/admin/promo-codes — lấy TOÀN BỘ bảng mã giảm giá (kể cả mã
    // đã hết hạn/đang tắt — để admin xem lại lịch sử, sửa, hoặc bật lại)
    if (path === '/api/admin/promo-codes' && request.method === 'GET') {
        try {
            const raw = await env.MOS360_USERS_KV.get('promo_codes');
            const codes = raw ? JSON.parse(raw) : [];
            return json({ success: true, codes });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // POST /api/admin/promo-codes — lưu đè TOÀN BỘ bảng mã (admin sửa/thêm/
    // xoá trực tiếp trên bảng ở Dashboard rồi lưu 1 lần cả danh sách, đơn
    // giản hơn nhiều so với làm CRUD riêng từng mã, phù hợp quy mô ít mã).
    if (path === '/api/admin/promo-codes' && request.method === 'POST') {
        try {
            const body = await request.json();
            const codes = Array.isArray(body.codes) ? body.codes : [];
            await env.MOS360_USERS_KV.put('promo_codes', JSON.stringify(codes));
            return json({ success: true, msg: 'Đã lưu bảng mã giảm giá!' });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // GET /api/admin/mos-registrations — danh sách đăng ký học MOS (đọc
    // trực tiếp từ Apps Script DKHOC, real-time — không qua publish cache)
    if (path === '/api/admin/mos-registrations' && request.method === 'GET') {
        try {
            const result = await callDKHocScript('listDKHoc', {});
            if (!result.ok) return json({ success: false, msg: result.msg || 'Lỗi tải danh sách' });
            return json({ success: true, items: result.items || [] });
        } catch (e) {
            return json({ success: false, msg: 'Lỗi tải dữ liệu: ' + e.message });
        }
    }

    // POST /api/admin/mos-registrations/confirm-payment — body: { maDangKy }
    // Đánh dấu đã thanh toán trong Sheet + TỰ ĐỘNG gửi email xác nhận kèm
    // hướng dẫn tải phần mềm cho học viên (nếu học viên có để lại email).
    if (path === '/api/admin/mos-registrations/confirm-payment' && request.method === 'POST') {
        try {
            const body = await request.json();
            const maDangKy = String(body.maDangKy || '').trim();
            if (!maDangKy) return json({ success: false, msg: 'Thiếu mã đăng ký' });

            const result = await callDKHocScript('confirmDKHocPayment', { maDangKy });
            if (!result.ok) return json({ success: false, msg: result.msg || 'Không xác nhận được' });

            let emailResult = { ok: false, msg: 'Học viên chưa để lại email' };
            if (result.email) {
                emailResult = await sendPaymentConfirmEmail(env, {
                    toEmail: result.email, toName: result.ten,
                    khoaHoc: result.khoaHoc, soTien: result.soTien, maDangKy: result.maDangKy
                });
            }

            return json({
                success: true,
                msg: emailResult.ok ? 'Đã xác nhận thanh toán và gửi email cho học viên!' : ('Đã xác nhận thanh toán (email chưa gửi được: ' + emailResult.msg + ')')
            });
        } catch (e) {
            return json({ success: false, msg: 'Lỗi: ' + e.message });
        }
    }

    // POST /api/admin/mos-registrations/update — sửa thông tin đăng ký
    if (path === '/api/admin/mos-registrations/update' && request.method === 'POST') {
        try {
            const body = await request.json();
            const result = await callDKHocScript('updateDKHoc', body);
            return json({ success: !!result.ok, msg: result.msg });
        } catch (e) {
            return json({ success: false, msg: 'Lỗi: ' + e.message });
        }
    }

    // POST /api/admin/mos-registrations/delete — body: { maDangKy }
    if (path === '/api/admin/mos-registrations/delete' && request.method === 'POST') {
        try {
            const body = await request.json();
            const maDangKy = String(body.maDangKy || '').trim();
            if (!maDangKy) return json({ success: false, msg: 'Thiếu mã đăng ký' });
            const result = await callDKHocScript('deleteDKHoc', { maDangKy });
            return json({ success: !!result.ok, msg: result.msg });
        } catch (e) {
            return json({ success: false, msg: 'Lỗi: ' + e.message });
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

// Apps Script riêng cho sheet "Đăng ký học MOS" (DKHOC) — khác hẳn với
// CONFIG.APPS_SCRIPT_URL ở trên (đó là sheet học viên Online). Cùng URL
// đang dùng trong api/register-api.js.
const DKHOC_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbweC3d-SKm29ltW6Y13hWqYuw8Q-4X23QEbF0AhQL_IfA2YiWYzVkIOyV4n-sxApEpcMA/exec";

async function callDKHocScript(action, data) {
    const resp = await fetch(DKHOC_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data })
    });
    return await resp.json();
}

// Gửi email xác nhận thanh toán qua Resend — dùng lại đúng cơ chế đã có
// sẵn ở api/license-api.js (sendPasswordEmail), tách hàm riêng ở đây vì
// nội dung email khác hẳn (xác nhận đóng học phí + hướng dẫn tải phần
// mềm/tài liệu, không phải gửi mật khẩu).
async function sendPaymentConfirmEmail(env, { toEmail, toName, khoaHoc, soTien, maDangKy }) {
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) return { ok: false, msg: "Chưa cấu hình RESEND_API_KEY" };
    if (!toEmail) return { ok: false, msg: "Học viên chưa để lại email" };

    const amountStr = (Number(soTien) || 0).toLocaleString('vi-VN') + 'đ';
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
        <h2 style="color:#FF5722">✅ Đã xác nhận thanh toán — MOS360</h2>
        <p>Chào <b>${escHtml(toName)}</b>,</p>
        <p>MOS360 xác nhận đã nhận được học phí cho khóa học <b>${escHtml(khoaHoc)}</b>:</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:6px 0;color:#64748b">Mã đăng ký</td><td style="padding:6px 0;font-weight:700">${escHtml(maDangKy)}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b">Số tiền đã đóng</td><td style="padding:6px 0;font-weight:700;color:#22c55e">${amountStr}</td></tr>
        </table>
        <h3 style="margin-top:24px">🖥️ Bước tiếp theo — Tải phần mềm MOS360</h3>
        <p>1. Tải phần mềm luyện thi MOS360: <a href="https://go.mos360.vn/2019setup">Tải tại đây</a></p>
        <p>2. Hướng dẫn cài đặt phần mềm MOS360 từng bước: <a href="https://docs.google.com/document/d/1j2zrxTZWvuPa6CaffkKlS9UMbU4xFLWC/edit">Xem hướng dẫn</a></p>
        <p>3. Hướng dẫn tải và cài đặt Office: <a href="https://go.mos360.vn/hdcaioffice2019">Xem hướng dẫn/library</a></p>
        <p style="margin-top:20px;color:#64748b;font-size:0.9rem">Lịch khai giảng cụ thể MOS360 sẽ thông báo qua Zalo trong thời gian sớm nhất. Mọi thắc mắc liên hệ hotline <b>0912.888.360</b>.</p>
        <p style="margin-top:24px">Trân trọng,<br>MOS360</p>
      </div>`;

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                from: "MOS360 <hotro@mos360.vn>",
                to: [toEmail],
                subject: `✅ Xác nhận thanh toán khóa học ${khoaHoc} — MOS360`,
                html
            })
        });
        const text = await res.text();
        if (!res.ok) return { ok: false, msg: "Resend lỗi: " + text.slice(0, 200) };
        return { ok: true };
    } catch (e) {
        return { ok: false, msg: e.message };
    }
}

function escHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
}