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
// THÊM (thanh toán "Đăng ký học MOS"): với action "dkhoc", Worker tự
// TÍNH TIỀN (400.000đ/môn − giá trị mã giảm giá nếu có, đọc trực tiếp từ
// KV — KHÔNG tin số tiền/mã do client tự gửi lên, tránh học viên sửa giá
// qua DevTools), sinh Mã đăng ký + nội dung chuyển khoản VietQR, rồi mới
// forward toàn bộ (kèm số tiền đã tính) sang Apps Script để ghi Sheet.
// ============================================================

// TODO cân nhắc sau: chuyển 2 giá trị này sang Cloudflare Workers Secrets
// (env.TELEGRAM_BOT_TOKEN / env.TELEGRAM_CHAT_ID) thay vì hardcode, để đổi
// bot/nhóm không cần sửa & deploy lại code.
const TELEGRAM_BOT_TOKEN = "8542812107:AAFfaesBpmxRJMopSbhGXVwbTj1GQZNW12M";
const TELEGRAM_CHAT_ID = "-5511945951";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbweC3d-SKm29ltW6Y13hWqYuw8Q-4X23QEbF0AhQL_IfA2YiWYzVkIOyV4n-sxApEpcMA/exec";

// ── CẤU HÌNH HỌC PHÍ & TÀI KHOẢN NHẬN TIỀN ─────────────────
const HOC_PHI_MOI_MON = 400000; // đồng giá 400k/môn
const BANK_INFO = {
    bin: "970436",              // Vietcombank
    accountNo: "1912888360",
    accountName: "NGUYEN THI THAO"
};

export async function handleRegisterAPI(request, env) {
    let payload;
    try {
        payload = await request.json();
    } catch (e) {
        return json({ ok: false, msg: "Dữ liệu không hợp lệ" }, 400);
    }

    // 0. Riêng "Đăng ký học MOS" (dkhoc) — tính tiền + sinh mã đăng ký +
    // nội dung chuyển khoản TRƯỚC khi ghi Sheet, để lưu luôn số tiền cuối
    // cùng (đã trừ mã giảm giá) vào Sheet thay vì phải tính lại sau.
    let paymentInfo = null;
    if (payload.action === "dkhoc") {
        paymentInfo = await computeDKHocPayment(payload, env);
        payload = { ...payload, maDangKy: paymentInfo.maDangKy, soTien: paymentInfo.amount, soTienCoc: paymentInfo.depositAmount, email: String(payload.email || "").trim() };
    }

    // 1. Forward payload (đã bổ sung mã đăng ký/số tiền nếu là dkhoc) sang
    // Apps Script — giữ đúng hành vi ghi Google Sheet như trước.
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

    // 3. Trả kèm thông tin thanh toán (mã đăng ký, số tiền, nội dung CK,
    // thông tin ngân hàng) để trình duyệt tự dựng QR VietQR — không cần
    // Apps Script biết gì về việc này.
    if (isOk && paymentInfo) {
        return json({ ...data, ...paymentInfo });
    }

    return json(data);
}

// Tính số tiền cần đóng cho 1 lượt đăng ký học MOS + sinh mã đăng ký và
// nội dung chuyển khoản chuẩn hoá (không dấu, không khoảng trắng).
//
// 2 CƠ CHẾ mã giảm giá (phân biệt bằng có/không có "depositMonths"):
//  A) ĐẶT CỌC (depositMonths = 1/2/3 → số môn được áp cọc):
//     Tổng tiền = Cọc + (số môn đã chọn − số môn được cọc, tối thiểu 0)
//                 × Học phí ưu đãi môn dư
//     (chọn ÍT môn hơn số môn được cọc vẫn đóng đủ tiền cọc, không bớt)
//  B) GIẢM GIÁ CỐ ĐỊNH (depositMonths = 0):
//     Tổng tiền = max(0, số môn × 400.000 − Giá trị giảm)
async function computeDKHocPayment(payload, env) {
    const soMon = String(payload.khoahoc || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean).length;

    let match = null;
    const codeInput = String(payload.magiamgia || "").trim().toUpperCase();
    if (codeInput && env.MOS360_USERS_KV) {
        try {
            const raw = await env.MOS360_USERS_KV.get("promo_codes");
            const codes = raw ? JSON.parse(raw) : [];
            const todayStr = new Date().toISOString().slice(0, 10);
            match = codes.find(c =>
                String(c.code || "").trim().toUpperCase() === codeInput &&
                c.active !== false &&
                (!c.startDate || c.startDate <= todayStr) &&
                (!c.endDate || c.endDate >= todayStr)
            ) || null;
        } catch (e) { /* mã lỗi/không đọc được KV → coi như không có mã, không chặn đăng ký */ }
    }

    let amount, depositAmount = 0, extraTuitionAmount = 0, extraCount = 0, baseAmount = soMon * HOC_PHI_MOI_MON, discount = 0;
    const depositMonths = match && match.depositMonths ? (Number(match.depositMonths) || 0) : 0;

    if (match && depositMonths > 0) {
        depositAmount = Number(match.deposit) || 0;
        extraCount = Math.max(0, soMon - depositMonths);
        extraTuitionAmount = extraCount * (Number(match.tuitionPerExtra) || 0);
        amount = depositAmount + extraTuitionAmount;
    } else {
        discount = match ? (Number(match.discountAmount) || 0) : 0;
        amount = Math.max(0, baseAmount - discount);
    }

    const maDangKy = "MOS" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const qrContent = buildQrContent(payload.ten, payload.sdt, maDangKy);

    return {
        maDangKy,
        amount,
        soTien: amount, // alias — client-side (index.js) đọc field "soTien" khi hiện lên form
        baseAmount,
        discount,
        isDeposit: depositMonths > 0,
        depositAmount,
        depositMonths,
        extraCount,
        extraTuitionAmount,
        qrContent,
        bankInfo: BANK_INFO,
        qrImageUrl: `https://img.vietqr.io/image/${BANK_INFO.bin}-${BANK_INFO.accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(qrContent)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`
    };
}

// Nội dung chuyển khoản: HOTENHOCVIEN_SODIENTHOAI_MADANGKY — viết hoa,
// bỏ dấu tiếng Việt, khoảng trắng thay bằng "_" (ngân hàng không nhận
// được dấu tiếng Việt/khoảng trắng phức tạp trong nội dung CK).
function buildQrContent(ten, sdt, maDangKy) {
    const noAccent = String(ten || "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/gi, "d")
        .toUpperCase()
        .trim()
        .replace(/\s+/g, "_");
    return [noAccent, String(sdt || "").trim(), maDangKy].filter(Boolean).join("_");
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
            (p.email ? `\n📧 Email: ${esc(p.email)}` : "") +
            `\n📚 Khóa học: ${esc(p.khoahoc)}` +
            (p.maDangKy ? `\n🎫 Mã đăng ký: <code>${esc(p.maDangKy)}</code>` : "") +
            (typeof p.soTienCoc === "number" && p.soTienCoc > 0 ? `\n💵 Trong đó tiền cọc: ${p.soTienCoc.toLocaleString("vi-VN")}đ` : "") +
            (typeof p.soTien === "number" ? `\n💰 Tổng tiền: ${p.soTien.toLocaleString("vi-VN")}đ` : "") +
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