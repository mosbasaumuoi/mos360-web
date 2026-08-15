// ============================================================
// MOS360 — Đăng ký học ONLINE (IC3 GS6 / Generative AI / AI Productivity)
// ============================================================
// Form công khai (trang /courses và /register) gọi endpoint này — KHÔNG
// cần admin token vì học viên tự điền, chưa đăng nhập.
//
// Khác với /api/register (dùng cho "Học MOS" — giữ nguyên, ghi vào sheet
// lead cũ), endpoint này ghi THẲNG vào sheet "Quản lý học viên" (cùng
// sheet dùng để đăng nhập học Online / hiển thị trong Admin Dashboard
// tab "Học viên Online"), với NGÀY HẾT HẠN ĐỂ TRỐNG.
//
// Vì sao để trống: học viên chưa xác nhận thanh toán. Admin đối chiếu
// chuyển khoản xong thì vào Dashboard bấm "🔄 Gia hạn" (đúng SĐT + khóa
// học vừa đăng ký) để điền hạn dùng — lúc đó tài khoản mới đăng nhập
// học Online được. Hạn dùng trống ⇒ /api/verify-code luôn từ chối đăng
// nhập (xem index.js).
// ============================================================

import { CONFIG } from '../config.js';

// Dùng chung bot/nhóm Telegram với register-api.js để admin nhận thông
// báo tức thời, biết vào Dashboard xử lý.
const TELEGRAM_BOT_TOKEN = "8542812107:AAFfaesBpmxRJMopSbhGXVwbTj1GQZNW12M";
const TELEGRAM_CHAT_ID = "-5511945951";

export async function handleOnlineRegisterAPI(request, env) {
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return json({ success: false, msg: "Dữ liệu không hợp lệ" }, 400);
    }

    const course = String(body.course || "").trim();
    const phone = String(body.phone || "").trim();
    const name = String(body.name || "").trim();

    if (!course || !phone || !name) {
        return json({ success: false, msg: "Vui lòng điền đầy đủ Họ tên, SĐT và chọn khóa học." }, 400);
    }

    const today = new Date();
    const date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    const payload = {
        action: "add",
        course, phone, date,
        expire: "", // ĐỂ TRỐNG — chờ admin xác nhận thanh toán rồi Gia hạn
        name,
        school: String(body.school || "").trim(),
        classInfo: String(body.classInfo || "").trim(),
        channel: String(body.channel || "").trim(),
        note: String(body.note || "").trim(),
        promoCode: String(body.promoCode || "").trim(),
        discountAmount: Number(body.discountAmount) || 0,
        facebook: String(body.facebook || "").trim(),
        referrer: String(body.referrer || "").trim() // giữ để tương thích ngược, form hiện không còn thu thập trường này
    };

    if (!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.includes("YOUR_SCRIPT_ID")) {
        return json({ success: false, msg: "Chưa cấu hình Google Apps Script URL!" }, 500);
    }

    let data;
    try {
        const resp = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        data = await resp.json();
    } catch (e) {
        return json({ success: false, msg: "Không kết nối được máy chủ đăng ký. Vui lòng thử lại hoặc liên hệ Zalo." }, 502);
    }

    const isOk = data.success === true || data.ok === true;

    if (isOk) {
        try { await notifyTelegram(payload); } catch (e) { /* không chặn luồng đăng ký */ }
    }

    return json({ success: isOk, msg: data.msg || (isOk ? "Đã gửi đăng ký thành công!" : "Gửi thất bại, vui lòng thử lại.") });
}

async function notifyTelegram(p) {
    const text = "🌐 <b>ĐĂNG KÝ HỌC ONLINE MỚI</b>" +
        `\n👤 Họ tên: ${esc(p.name)}` +
        `\n📱 SĐT: ${esc(p.phone)}` +
        `\n📚 Khóa học: ${esc(p.course)}` +
        (p.school ? `\n🏫 Trường: ${esc(p.school)}` : "") +
        (p.classInfo ? `\n🎓 Lớp/Khoa: ${esc(p.classInfo)}` : "") +
        (p.channel ? `\n📣 Kênh biết đến: ${esc(p.channel)}` : "") +
        (p.promoCode ? `\n🏷️ Mã giảm giá: ${esc(p.promoCode)}` + (p.discountAmount ? ` (giảm ${p.discountAmount.toLocaleString('vi-VN')}đ)` : "") : "") +
        (p.facebook ? `\n🔗 Facebook: ${esc(p.facebook)}` : "") +
        (p.referrer ? `\n🙋 Người giới thiệu: ${esc(p.referrer)}` : "") +
        (p.note ? `\n📝 Ghi chú: ${esc(p.note)}` : "") +
        "\n⏳ Trạng thái: <b>Chờ xác nhận thanh toán</b> — vào Dashboard, tab Học viên Online, bấm 🔄 Gia hạn để kích hoạt.";
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" })
    });
}

function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
}
