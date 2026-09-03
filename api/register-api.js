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

// ── LỆ PHÍ THI (dkthi) — TRA THEO THÀNH PHỐ + ĐỢT THI ───────
// QUAN TRỌNG: bảng này phải khớp với "CONFIG.LICH_THI" ở index.js (nơi
// hiển thị lịch thi cho học viên chọn). Đây là bản sao dùng RIÊNG ở phía
// server để tự tính lại lệ phí — KHÔNG tin số "lePhi" học viên tự gửi từ
// trình duyệt (tránh sửa giá qua DevTools), giống hệt lý do computeDKHocPayment
// không tin "soTien"/"magiamgia" của client.
// Mỗi khi admin cập nhật lịch thi/lệ phí ở CONFIG.LICH_THI (index.js), CẦN
// cập nhật lại bảng này cho khớp, nếu không hệ thống sẽ dùng mức lệ phí
// mặc định DEFAULT_LE_PHI bên dưới (an toàn nhưng có thể không đúng giá mới).
const LICH_THI_FEE = {
    "Hải Phòng": [
        { dot: "Đợt 5/2026", ngayThi: "27–28/06/2026", lephi: 950000, diaDiem: "CITAD – Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)" },
        { dot: "Đợt 6/2026", ngayThi: "01–02/08/2026", lephi: 950000, diaDiem: "CITAD – Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)" },
        { dot: "Đợt 7/2026", ngayThi: "29–30/08/2026", lephi: 950000, diaDiem: "CITAD – Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)" },
        { dot: "Đợt 8/2026", ngayThi: "26–27/09/2026", lephi: 950000, diaDiem: "CITAD – Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)" }
    ],
    "Hà Nội": [
        { dot: "Đợt 6/2026", ngayThi: "21/07/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)" },
        { dot: "Đợt 7/2026", ngayThi: "18/08/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)" },
        { dot: "Đợt 8/2026", ngayThi: "22/09/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)" }
    ],
    "Hồ Chí Minh": [
        { dot: "Đợt 6/2026", ngayThi: "23/07/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)" },
        { dot: "Đợt 7/2026", ngayThi: "20/08/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)" },
        { dot: "Đợt 8/2026", ngayThi: "24/09/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)" }
    ]
};
const DEFAULT_LE_PHI = 950000; // dùng khi không khớp được thành phố/đợt thi nào ở trên

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
        payload = { ...payload, maDangKy: paymentInfo.maDangKy, soTien: paymentInfo.amount, soTienCoc: paymentInfo.depositAmount, soMonApCoc: paymentInfo.coveredCount, email: String(payload.email || "").trim() };
    }

    // 0b. "Đăng ký thi" (dkthi) — cùng nguyên tắc với dkhoc: Worker tự TÍNH
    // LỆ PHÍ (tra theo thành phố + đợt thi, nhân số môn đăng ký), KHÔNG tin
    // "lePhi"/số tiền client tự gửi, rồi sinh Mã đăng ký thi (tiền tố "LPT")
    // + nội dung chuyển khoản VietQR — y hệt luồng "Đăng ký học".
    // v11 — TRỪ CỌC: nếu học viên này (tra theo SĐT/Email, hoặc theo Mã
    // đăng ký học nếu học viên tự nhập để xác định chính xác — trường
    // "maDangKyHoc") còn "Số tiền cọc" CHƯA DÙNG từ (các) lần Đăng ký học
    // trước đó, số cọc đó được TỰ ĐỘNG trừ thẳng vào lệ phí thi lần này.
    // Cũng KHÔNG tin số cọc do client tự gửi — Worker tự tra lại qua Apps
    // Script (action "checkDeposit"), giống hệt lý do không tin "lePhi".
    if (payload.action === "dkthi") {
        paymentInfo = await computeDKThiPayment(payload, env);
        payload = {
            ...payload,
            maDangKy: paymentInfo.maDangKy,
            soTien: paymentInfo.amount,
            feeFallback: paymentInfo.feeFallback,
            email: String(payload.email || "").trim(),
            cocApDung: paymentInfo.cocApDung
        };
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
//  A) ĐẶT CỌC (depositMonths = 1/2/3 → hạn mức TỐI ĐA số môn được cọc,
//     CỘNG DỒN qua nhiều lần đăng ký của CÙNG SĐT dùng CÙNG mã — không
//     phải reset mỗi lần đăng ký):
//       1. Tra hạn mức đã dùng (usedCount) qua các lần đăng ký trước.
//       2. remainingQuota = max(0, depositMonths − usedCount)
//       3. coveredCount = min(số môn đang đăng ký, remainingQuota)
//          → coveredCount môn được tính giá CỌC (VNĐ/môn)
//       4. extraCount = số môn đang đăng ký − coveredCount
//          → extraCount môn còn lại tính HỌC PHÍ ƯU ĐÃI (VNĐ/môn dư)
//     VD: mã cho phép cọc tối đa 2 môn, đăng ký lần 1 đã dùng 1 môn →
//     lần 2 đăng ký 1 môn nữa vẫn còn hạn mức (remainingQuota=1) → môn
//     đó tiếp tục được giá cọc. Nhưng nếu lần 2 đăng ký khi hạn mức đã
//     dùng hết (usedCount ≥ depositMonths) → toàn bộ môn lần này tính
//     theo học phí ưu đãi, KHÔNG còn giá cọc nữa.
//  B) GIẢM GIÁ CỐ ĐỊNH (depositMonths = 0):
//     Tổng tiền = max(0, số môn × max(0, 400.000 − Giá trị giảm/môn))
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

    let amount, depositAmount = 0, extraTuitionAmount = 0, extraCount = 0, coveredCount = 0,
        baseAmount = soMon * HOC_PHI_MOI_MON, discount = 0, quotaMsg = "";
    const depositMonths = match && match.depositMonths ? (Number(match.depositMonths) || 0) : 0;

    if (match && depositMonths > 0) {
        const usedCount = await getPromoUsage(payload.sdt, codeInput, env);
        const remainingQuota = Math.max(0, depositMonths - usedCount);
        coveredCount = Math.min(soMon, remainingQuota);
        extraCount = soMon - coveredCount;
        depositAmount = coveredCount * (Number(match.deposit) || 0);
        extraTuitionAmount = extraCount * (Number(match.tuitionPerExtra) || 0);
        amount = depositAmount + extraTuitionAmount;
        if (extraCount > 0) {
            quotaMsg = usedCount > 0
                ? `Bạn đã dùng mã ${codeInput} cho ${usedCount}/${depositMonths} môn ở (các) lần đăng ký trước. Lần này chỉ còn ${remainingQuota} suất giá cọc — ${extraCount} môn còn lại áp dụng học phí ưu đãi ${(Number(match.tuitionPerExtra) || 0).toLocaleString("vi-VN")}đ/môn.`
                : `Mã ${codeInput} chỉ áp dụng giá cọc cho tối đa ${depositMonths} môn. ${extraCount} môn vượt hạn mức áp dụng học phí ưu đãi ${(Number(match.tuitionPerExtra) || 0).toLocaleString("vi-VN")}đ/môn.`;
        }
    } else {
        discount = match ? (Number(match.discountAmount) || 0) : 0;
        // Giảm áp dụng TRÊN TỪNG MÔN (VD giảm 50k/môn) — không phải trừ 1
        // lần duy nhất vào tổng đơn hàng.
        amount = Math.max(0, soMon * Math.max(0, HOC_PHI_MOI_MON - discount));
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
        coveredCount,
        extraCount,
        extraTuitionAmount,
        quotaMsg,
        qrContent,
        bankInfo: BANK_INFO,
        qrImageUrl: `https://img.vietqr.io/image/${BANK_INFO.bin}-${BANK_INFO.accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(qrContent)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`
    };
}

// Tra cứu tổng số môn ĐÃ ĐƯỢC ÁP GIÁ CỌC của 1 SĐT với 1 mã KM cụ thể,
// cộng dồn qua các lần đăng ký trước (đọc trực tiếp từ Apps Script DKHOC,
// luôn là dữ liệu mới nhất — không cache).
async function getPromoUsage(sdt, code, env) {
    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({ action: "checkPromoUsage", sdt, code })
        });
        const data = await res.json();
        return Number(data.usedCount) || 0;
    } catch (e) {
        return 0; // lỗi tra cứu → coi như chưa dùng, không chặn đăng ký (an toàn về UX hơn là chặn nhầm)
    }
}

// GET /api/promo-usage?sdt=..&code=.. — endpoint CÔNG KHAI để form đăng
// ký tra hạn mức TRƯỚC khi hiện popup xác nhận (xem giá đúng thực tế
// trước khi gửi, khớp với số server sẽ tính chính thức lúc submit).
export async function handlePromoUsageAPI(request, env) {
    const url = new URL(request.url);
    const sdt = url.searchParams.get("sdt") || "";
    const code = (url.searchParams.get("code") || "").trim().toUpperCase();
    if (!sdt || !code) return json({ ok: true, usedCount: 0 });
    const usedCount = await getPromoUsage(sdt, code, env);
    return json({ ok: true, usedCount });
}

// POST /api/register-payment-report — body: { maDangKy, method } — học
// viên tự báo đã chuyển khoản/tiền mặt ngay trên trang QR. KHÔNG tự xác
// nhận thanh toán chính thức (đó vẫn cần admin đối chiếu) — chỉ ghi nhận
// + báo Telegram để admin ưu tiên kiểm tra đơn này sớm hơn.
export async function handlePaymentReportAPI(request, env) {
    let body;
    try { body = await request.json(); } catch (e) { return json({ ok: false, msg: "Dữ liệu không hợp lệ" }, 400); }

    const maDangKy = String(body.maDangKy || "").trim();
    const method = String(body.method || "").trim();
    if (!maDangKy) return json({ ok: false, msg: "Thiếu mã đăng ký" }, 400);

    let data;
    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({ action: "reportPayment", maDangKy, method })
        });
        data = await res.json();
    } catch (e) {
        return json({ ok: false, msg: "Không kết nối được máy chủ. Vui lòng thử lại." }, 502);
    }

    if (data.ok) {
        try {
            const methodEmoji = method === "tien_mat" ? "💵" : "🏦";
            const text = `${methodEmoji} <b>HỌC VIÊN BÁO ĐÃ THANH TOÁN (${esc(data.method)})</b>` +
                `\n👤 ${esc(data.ten)} — ${esc(data.sdt)}` +
                `\n📚 ${esc(data.khoaHoc)}` +
                `\n🎫 Mã đăng ký: <code>${esc(data.maDangKy)}</code>` +
                (typeof data.soTien === "number" ? `\n💰 Số tiền: ${data.soTien.toLocaleString("vi-VN")}đ` : "") +
                `\n⚠️ Vui lòng kiểm tra và xác nhận trên Dashboard.`;
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" })
            });
        } catch (e) { console.error("Lỗi gửi Telegram báo thanh toán:", e.message); }
    }

    return json(data);
}

// Tính lệ phí cho 1 lượt "Đăng ký thi" (dkthi) + sinh Mã đăng ký (tiền tố
// "LPT" — phân biệt với "MOS" của Đăng ký học) và nội dung chuyển khoản
// VietQR. Lệ phí = (Lệ phí/môn tra theo thành phố+đợt thi) × số môn thi
// đã chọn (Word/Excel/PowerPoint) — TÍNH LẠI Ở SERVER, không tin số tiền
// hay lệ phí do client tự gửi lên.
// v11 — TRỪ CỌC: sau khi tính lệ phí gốc, tự tra số "Cọc" CHƯA DÙNG của
// học viên này (getDepositAvailable) rồi trừ thẳng vào lệ phí trước khi
// sinh QR — xem chú thích ở nơi gọi hàm này (handleRegisterAPI).
async function computeDKThiPayment(payload, env) {
    const thanhPho = String(payload.thanhPho || "").trim();
    const dotThi = String(payload.dotThi || "").trim();
    const soMon = [payload.word, payload.excel, payload.ppt].filter(Boolean).length;

    const lichTP = LICH_THI_FEE[thanhPho] || [];
    const lich = lichTP.find(r => r.dot === dotThi) || null;
    const lephi = lich ? (Number(lich.lephi) || DEFAULT_LE_PHI) : DEFAULT_LE_PHI;

    const grossAmount = soMon * lephi;

    // Tra cọc chưa dùng — nếu có "maDangKyHoc" (học viên tự nhập để xác
    // định chính xác, dùng khi trùng SĐT/nhiều người) thì tra chính xác
    // theo mã đó; không thì tự động tra theo SĐT/Email. Nếu kết quả
    // "ambiguous" (nhiều người khác tên cùng dùng chung SĐT đều có cọc)
    // → KHÔNG tự trừ gì cả, để an toàn (tránh trừ nhầm cọc của người khác)
    // — client cần hỏi lại học viên nhập Mã đăng ký học để xác định đúng.
    const depositInfo = await getDepositAvailable(payload.sdt, payload.email, payload.maDangKyHoc, env);
    const cocApDung = (!depositInfo.ambiguous) ? Math.max(0, Math.min(Number(depositInfo.coc) || 0, grossAmount)) : 0;
    const amount = Math.max(0, grossAmount - cocApDung);

    const maDangKy = "LPT" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const qrContent = buildQrContent(payload.ten, payload.sdt, maDangKy);

    return {
        maDangKy,
        amount,
        soTien: amount, // alias — client-side (index.js) đọc field "soTien" khi hiện lên form
        grossAmount,
        lephi,
        soMon,
        thanhPho,
        dotThi,
        ngayThi: lich ? lich.ngayThi : (payload.ngayThi || ""),
        diaDiem: lich ? lich.diaDiem : (payload.diaDiem || ""),
        // Thông tin cọc — trả về để client hiện rõ "đã trừ cọc bao nhiêu"
        // và để Telegram/Sheet ghi nhận đúng khoản đã trừ.
        cocApDung,
        cocAmbiguous: !!depositInfo.ambiguous,
        cocOptions: depositInfo.options || [],
        // Cảnh báo nội bộ (hiện trong Telegram) nếu không khớp được lịch thi
        // đã cấu hình — giúp admin phát hiện sớm khi lịch thi mới chưa được
        // cập nhật vào LICH_THI_FEE (khi đó hệ thống tạm dùng DEFAULT_LE_PHI).
        feeFallback: !lich,
        qrContent,
        bankInfo: BANK_INFO,
        qrImageUrl: `https://img.vietqr.io/image/${BANK_INFO.bin}-${BANK_INFO.accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(qrContent)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`
    };
}

// Tra số tiền cọc CHƯA DÙNG của 1 học viên (đọc trực tiếp từ Apps Script,
// action "checkDeposit" — luôn là dữ liệu mới nhất, không cache):
//  - Nếu có "maDangKyHoc" (Mã đăng ký học, dạng "MOSxxxxx") → tra CHÍNH
//    XÁC theo mã đó (dùng khi tự động tra theo SĐT/Email bị trùng nhiều
//    người, học viên tự nhập mã đã nhận lúc Đăng ký học để xác định đúng
//    mình).
//  - Không thì tự động tra theo SĐT (Email chỉ để đối chiếu thêm phòng
//    khi SĐT gõ sai).
// Trả về { coc, ten, ambiguous, options } — "ambiguous: true" nghĩa là
// nhiều học viên KHÁC TÊN đang dùng chung SĐT này đều có cọc → KHÔNG tự
// trừ, phải hỏi lại Mã đăng ký học.
async function getDepositAvailable(sdt, email, maDangKyHoc, env) {
    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
                action: "checkDeposit",
                sdt: sdt || "",
                email: email || "",
                maDangKyHoc: maDangKyHoc || ""
            })
        });
        const data = await res.json();
        return {
            coc: Number(data.coc) || 0,
            ten: data.ten || "",
            ambiguous: !!data.ambiguous,
            options: Array.isArray(data.options) ? data.options : []
        };
    } catch (e) {
        return { coc: 0, ten: "", ambiguous: false, options: [] }; // lỗi tra cứu → coi như không có cọc, không chặn đăng ký
    }
}

// GET /api/deposit-lookup?sdt=..&email=..&maDangKyHoc=.. — endpoint CÔNG
// KHAI để form "Đăng ký thi" tra trước số cọc sẽ được trừ (hiện preview
// cho học viên xem TRƯỚC khi bấm gửi), khớp với số Worker sẽ tính chính
// thức lúc submit thật (computeDKThiPayment ở trên).
export async function handleDepositLookupAPI(request, env) {
    const url = new URL(request.url);
    const sdt = url.searchParams.get("sdt") || "";
    const email = url.searchParams.get("email") || "";
    const maDangKyHoc = url.searchParams.get("maDangKyHoc") || "";
    if (!sdt && !email && !maDangKyHoc) return json({ ok: true, coc: 0, ambiguous: false });
    const info = await getDepositAvailable(sdt, email, maDangKyHoc, env);
    return json({ ok: true, ...info });
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
            (p.email ? `\n📧 Email: ${esc(p.email)}` : "") +
            `\n📄 Môn thi: ${esc(mon)}` +
            (p.thanhPho ? `\n📍 Thành phố: ${esc(p.thanhPho)}` : "") +
            (p.dotThi ? `\n🗓 Đợt thi: ${esc(p.dotThi)}` : "") +
            (p.ngayThi ? `\n📆 Ngày thi: ${esc(p.ngayThi)}` : "") +
            (p.maDangKy ? `\n🎫 Mã đăng ký: <code>${esc(p.maDangKy)}</code>` : "") +
            (typeof p.cocApDung === "number" && p.cocApDung > 0 ? `\n🎉 Đã trừ cọc: -${p.cocApDung.toLocaleString("vi-VN")}đ` : "") +
            (typeof p.soTien === "number" ? `\n💰 Lệ phí cần đóng: ${p.soTien.toLocaleString("vi-VN")}đ` : "") +
            (p.feeFallback ? `\n⚠️ Không khớp được lịch thi trong hệ thống — đang dùng lệ phí mặc định, admin kiểm tra lại LICH_THI_FEE trong api/register-api.js!` : "");
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