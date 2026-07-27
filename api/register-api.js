// ============================================================
// MOS360 — Proxy đăng ký (học / thi / lịch offline)
// ============================================================
// Trước đây form đăng ký gửi THẲNG từ trình duyệt học viên tới Google
// Apps Script — Worker không hề "nhìn thấy" dữ liệu này nên không thể tự
// động làm gì thêm. Giờ đổi thành: trình duyệt → Worker (endpoint này) →
// vừa forward y hệt sang Apps Script (giữ nguyên hành vi ghi Google Sheet
// như trước, không đổi cấu trúc dữ liệu), vừa bắn thông báo Telegram tức
// thời để không cần tự mở Sheet kiểm tra hàng ngày.
//
// Không dùng Workers KV ở đây — chỉ có 2 lệnh fetch() ra ngoài (Apps
// Script + Telegram), không tốn bất kỳ quota get/put/delete nào.
// ============================================================

// TODO cân nhắc sau: chuyển 2 giá trị này sang Cloudflare Workers Secrets
// (env.TELEGRAM_BOT_TOKEN / env.TELEGRAM_CHAT_ID) thay vì hardcode, để đổi
// bot/nhóm không cần sửa & deploy lại code.
const TELEGRAM_BOT_TOKEN = "8542812107:AAFfaesBpmxRJMopSbhGXVwbTj1GQZNW12M";
const TELEGRAM_CHAT_ID = "-5511945951";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbweC3d-SKm29ltW6Y13hWqYuw8Q-4X23QEbF0AhQL_IfA2YiWYzVkIOyV4n-sxApEpcMA/exec";

export async function handleRegisterAPI(request, env) {
    let payload;
    try {
        payload = await request.json();
    } catch (e) {
        return json({ ok: false, msg: "Dữ liệu không hợp lệ" }, 400);
    }

    // 1. Forward nguyên payload sang Apps Script — giữ đúng hành vi ghi
    // Google Sheet như trước, không đổi bất kỳ trường dữ liệu nào.
    let data;
    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(payload)
        });
        data = await res.json();
    } catch (e) {
        return json({ ok: false, msg: "Không kết nối được máy chủ đăng ký. Vui lòng thử lại." }, 502);
    }

    const isOk = data.ok === true || data.success === true;

    // 2. Nếu ghi Sheet thành công, bắn thông báo Telegram. Nếu Telegram lỗi
    // (mất mạng, bot bị xóa khỏi nhóm...) KHÔNG làm hỏng luồng đăng ký —
    // học viên vẫn nhận kết quả bình thường, chỉ mất phần thông báo.
    if (isOk) {
        try {
            await sendTelegramNotification(payload);
        } catch (e) {
            console.error("Lỗi gửi thông báo Telegram:", e.message);
        }
    }

    return json(data);
}

async function sendTelegramNotification(payload) {
    const text = buildMessage(payload);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: "HTML"
        })
    });
}

function buildMessage(p) {
    if (p.action === "dkhoc") {
        const isPromo = !!(p.magiamgia && String(p.magiamgia).trim());
        return (isPromo ? "🔥 <b>ĐĂNG KÝ HỌC (CÓ MÃ GIẢM GIÁ)</b>" : "📝 <b>ĐĂNG KÝ HỌC MỚI</b>") +
            `\n👤 Họ tên: ${esc(p.ten)}` +
            `\n📱 SĐT: ${esc(p.sdt)}` +
            `\n📚 Khóa học: ${esc(p.khoahoc)}` +
            (p.truong ? `\n🏫 Trường: ${esc(p.truong)}` : "") +
            (isPromo ? `\n🎟 Mã giảm giá: ${esc(p.magiamgia)}` : "") +
            (p.kenh ? `\n📣 Kênh biết đến: ${esc(p.kenh)}` : "") +
            (p.ghichu ? `\n📝 Ghi chú: ${esc(p.ghichu)}` : "");
    }

    if (p.action === "dkthi") {
        const mon = [p.word && "Word", p.excel && "Excel", p.ppt && "PowerPoint"].filter(Boolean).join(", ");
        return "🎯 <b>ĐĂNG KÝ THI MỚI</b>" +
            `\n👤 Họ tên: ${esc(p.ten)}` +
            `\n📱 SĐT: ${esc(p.sdt)}` +
            `\n📄 Môn thi: ${esc(mon)}` +
            (p.thanhPho ? `\n📍 Thành phố: ${esc(p.thanhPho)}` : "") +
            (p.dotThi ? `\n🗓 Đợt thi: ${esc(p.dotThi)}` : "") +
            (p.ngayThi ? `\n📆 Ngày thi: ${esc(p.ngayThi)}` : "");
    }

    if (p.action === "dkoffline") {
        const caLabels = [];
        for (let i = 1; i <= 6; i++) { if (p["ca" + i]) caLabels.push("Ca " + i); }
        return "📅 <b>ĐĂNG KÝ LỊCH HỌC OFFLINE</b>" +
            `\n👤 Họ tên: ${esc(p.ten)}` +
            `\n📱 SĐT: ${esc(p.sdt)}` +
            `\n📆 Ngày học: ${esc(p.ngay)}` +
            (caLabels.length ? `\n⏰ Ca học: ${esc(caLabels.join(", "))}` : "") +
            (p.ghichu ? `\n📝 Ghi chú: ${esc(p.ghichu)}` : "");
    }

    return "📥 <b>Có đăng ký mới</b>\n" + esc(JSON.stringify(p));
}

// Escape ký tự đặc biệt HTML để không vỡ định dạng parse_mode: "HTML" của
// Telegram nếu học viên lỡ gõ &, <, > trong tên/ghi chú.
function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
}