// ============================================================
// MOS360 RESULT API — Nhận kết quả Học/Thi từ WinApp (Excel/Word/PPT)
// ============================================================
// WinApp (Frm_GoToSummary.cs) gửi POST khi học viên Submit bài:
//   POST /api/submit-result
//   Headers: X-WinApp-Key: <secret riêng cho WinApp>
//   Body: {
//     password, subject, type, score, correctCount, totalCount,
//     domains: [{ name, percent }]
//   }
//
// Định danh học viên qua "password" — tra trực tiếp key đã có sẵn
// pwd_index:{password} (được ghi bởi api/license-api.js lúc cấp mật
// khẩu), KHÔNG cần thêm bước build index theo MAC.
//
// Kết quả lưu theo từng học viên (key theo phone), giữ lịch sử nhiều
// lần làm bài:
//   Key:   results:{phone}:{timestamp}
//   Value: { studentName, phone, subject, type, score, correctCount,
//            totalCount, domains, submittedAt }
//   Key phụ (danh sách key, để liệt kê nhanh không cần KV.list quét toàn bộ):
//   results_index:{phone} -> [resultKey, resultKey, ...]  (mới nhất ở đầu, tối đa 200)
//
// Index theo NGÀY (giờ Việt Nam, UTC+7) — phục vụ thống kê tổng toàn hệ
// thống mà không cần biết trước SĐT nào:
//   Key:   all_results:{yyyy-MM-dd} -> [resultKey, resultKey, ...]
//   Dùng để gộp lên "hôm nay / 7 ngày / 30 ngày" bằng cách duyệt qua các
//   ngày liên tiếp, không cần KV.list quét toàn bộ namespace.
// ============================================================

// Secret riêng cho WinApp — KHÔNG dùng chung với token admin "mos360admin2026".
// Lý do: file .exe phân phối cho hàng trăm máy học viên, có thể bị decompile
// đọc ra chuỗi này. Nếu dùng chung token admin, lộ token sẽ lộ luôn quyền
// quản trị toàn hệ thống (sửa học viên, khuyến mãi...). Secret riêng này chỉ
// cho phép ghi kết quả thi — rủi ro thấp hơn nhiều nếu bị lộ.
const WINAPP_SECRET = "mos360_winapp_secret_2026";

const SUBJECTS_VALID = ["excel", "word", "ppt"];
const TYPES_VALID = ["learn", "test"];

const MAX_RESULTS_PER_STUDENT = 200;

export async function handleResultAPI(path, request, env) {
    if (path === "/api/submit-result" && request.method === "POST") {
        return handleSubmitResult(request, env);
    }

    if (path === "/api/results" && request.method === "GET") {
        return handleGetResults(request, env);
    }

    if (path === "/api/results/stats" && request.method === "GET") {
        return handleGetStats(request, env);
    }

    return json({ success: false, msg: "Result API not found" }, 404);
}

// ───────────────────────── POST /api/submit-result ─────────────────────────

async function handleSubmitResult(request, env) {
    // Auth bằng secret riêng — không dùng token admin
    const winAppKey = request.headers.get("X-WinApp-Key") || "";
    if (winAppKey !== WINAPP_SECRET) {
        return json({ success: false, msg: "Unauthorized" }, 401);
    }

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return json({ success: false, msg: "Body không phải JSON hợp lệ" }, 400);
    }

    const password = (body.password || "").trim().toLowerCase();
    const subject = (body.subject || "").trim().toLowerCase();
    const type = (body.type || "").trim().toLowerCase();
    const score = Number(body.score);
    const correctCount = body.correctCount !== undefined ? Number(body.correctCount) : null;
    const totalCount = body.totalCount !== undefined ? Number(body.totalCount) : null;
    const domains = Array.isArray(body.domains) ? body.domains : [];

    // ── Validate ──
    if (!password) return json({ success: false, msg: "Thiếu password" }, 400);
    if (!SUBJECTS_VALID.includes(subject)) return json({ success: false, msg: "subject không hợp lệ (excel/word/ppt)" }, 400);
    if (!TYPES_VALID.includes(type)) return json({ success: false, msg: "type không hợp lệ (learn/test)" }, 400);
    if (!Number.isFinite(score)) return json({ success: false, msg: "score không hợp lệ" }, 400);

    // ── Tra học viên qua pwd_index (đã có sẵn từ license-api.js) ──
    let studentInfo;
    try {
        const raw = await env.MOS360_USERS_KV.get("pwd_index:" + password);
        if (!raw) {
            return json({ success: false, msg: "Mật khẩu không hợp lệ hoặc chưa được cấp" }, 404);
        }
        studentInfo = JSON.parse(raw);
    } catch (e) {
        return json({ success: false, msg: "Lỗi tra cứu học viên: " + e.message }, 500);
    }

    // ── Kiểm tra hạn dùng (expireDate dạng yyyyMMdd, giống license-api.js) ──
    if (studentInfo.expireDate) {
        const todayStr = formatTodayVN();
        if (todayStr > studentInfo.expireDate) {
            return json({ success: false, msg: "Mật khẩu đã hết hạn sử dụng" }, 403);
        }
    }

    // ── Lưu kết quả ──
    const now = new Date();
    const submittedAt = now.toISOString();
    const phone = studentInfo.phone || "unknown";

    const resultRecord = {
        studentName: studentInfo.studentName || "",
        phone,
        subject,
        type,
        score,
        correctCount,
        totalCount,
        domains,
        submittedAt
    };

    const resultKey = "results:" + phone + ":" + now.getTime();
    const dayKey = "all_results:" + formatDateVN(now);

    try {
        await env.MOS360_USERS_KV.put(resultKey, JSON.stringify(resultRecord));

        // Cập nhật danh sách key theo học viên — giữ tối đa MAX_RESULTS_PER_STUDENT,
        // mới nhất lên đầu, để trang xem lịch sử không cần quét toàn bộ KV.
        const listKey = "results_index:" + phone;
        const existingRaw = await env.MOS360_USERS_KV.get(listKey);
        const existingList = existingRaw ? JSON.parse(existingRaw) : [];
        existingList.unshift(resultKey);
        const trimmed = existingList.slice(0, MAX_RESULTS_PER_STUDENT);
        await env.MOS360_USERS_KV.put(listKey, JSON.stringify(trimmed));

        // Cập nhật index theo ngày (giờ VN) — phục vụ thống kê tổng,
        // không giới hạn số lượng vì 1 ngày khó vượt quá vài trăm lượt nộp.
        const dayRaw = await env.MOS360_USERS_KV.get(dayKey);
        const dayList = dayRaw ? JSON.parse(dayRaw) : [];
        dayList.push(resultKey);
        await env.MOS360_USERS_KV.put(dayKey, JSON.stringify(dayList));
    } catch (e) {
        return json({ success: false, msg: "Lỗi lưu kết quả: " + e.message }, 500);
    }

    return json({ success: true, msg: "Đã lưu kết quả", studentName: resultRecord.studentName });
}

// ───────────────────────── GET /api/results?phone=... ─────────────────────────
// Dùng cho Admin Dashboard (tab Thống kê WinApp) và sau này là trang
// tra cứu công khai cho học viên.

async function handleGetResults(request, env) {
    const url = new URL(request.url);
    const phone = (url.searchParams.get("phone") || "").trim();
    const subject = (url.searchParams.get("subject") || "").trim().toLowerCase();
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 200);

    if (!phone) {
        return json({ success: false, msg: "Thiếu số điện thoại" }, 400);
    }

    try {
        const listKey = "results_index:" + phone;
        const listRaw = await env.MOS360_USERS_KV.get(listKey);
        if (!listRaw) {
            return json({ success: true, results: [] });
        }

        const keys = JSON.parse(listRaw).slice(0, limit);
        const results = await Promise.all(
            keys.map(async (key) => {
                const raw = await env.MOS360_USERS_KV.get(key);
                return raw ? JSON.parse(raw) : null;
            })
        );

        let filtered = results.filter(Boolean);
        if (subject && SUBJECTS_VALID.includes(subject)) {
            filtered = filtered.filter(r => r.subject === subject);
        }

        return json({ success: true, results: filtered });
    } catch (e) {
        return json({ success: false, msg: e.message }, 500);
    }
}

// ───────────────────────── GET /api/results/stats ─────────────────────────
// Thống kê tổng toàn hệ thống theo khung thời gian — không cần biết
// trước SĐT nào. Dùng cho khối số liệu tổng quan ở đầu tab Thống kê.
// Query: ?range=today | 7days | 30days | 365days | all  (mặc định: today)

const RANGE_DAYS_MAP = { today: 1, "7days": 7, "30days": 30, "365days": 365 };

async function handleGetStats(request, env) {
    const url = new URL(request.url);
    const range = (url.searchParams.get("range") || "today").trim();

    try {
        // Liệt kê TẤT CẢ ngày thực sự có dữ liệu qua KV.list (mỗi ngày có nộp bài
        // chỉ tạo đúng 1 key all_results:yyyy-MM-dd) — tránh đoán trước số ngày
        // rồi gọi GET lãng phí cho hàng trăm ngày trống. Cách này dùng chung được
        // cho mọi khung thời gian, kể cả "365 ngày" lẫn "toàn bộ", mà tốc độ chỉ
        // phụ thuộc số ngày THỰC SỰ có dữ liệu, không phụ thuộc độ dài khung lọc.
        // Lưu ý: KV.list() trả tối đa 1000 key/lần — đủ dùng cho ~2.7 năm dữ liệu
        // (mỗi ngày 1 key); nếu vận hành lâu hơn sẽ cần thêm phân trang qua cursor.
        const listResult = await env.MOS360_USERS_KV.list({ prefix: "all_results:" });
        let dayKeyNames = listResult.keys.map(k => k.name);

        if (range !== "all") {
            const numDays = RANGE_DAYS_MAP[range] || 1;
            const now = new Date();
            const cutoffDateStr = formatDateVN(new Date(now.getTime() - (numDays - 1) * 24 * 60 * 60 * 1000));
            // Key dạng "all_results:yyyy-MM-dd" — so sánh chuỗi trực tiếp an toàn
            // vì định dạng ngày luôn zero-pad cố định độ dài.
            dayKeyNames = dayKeyNames.filter(name => name.slice("all_results:".length) >= cutoffDateStr);
        }

        // Lấy song song toàn bộ day-index (nhanh hơn nhiều so với vòng lặp tuần tự
        // — quan trọng khi range lớn như 365days/all, có thể tới hàng trăm ngày)
        const dayLists = await Promise.all(
            dayKeyNames.map(async (dayKey) => {
                const dayRaw = await env.MOS360_USERS_KV.get(dayKey);
                return dayRaw ? JSON.parse(dayRaw) : [];
            })
        );
        const allKeys = dayLists.flat();

        const records = await Promise.all(
            allKeys.map(async (key) => {
                const raw = await env.MOS360_USERS_KV.get(key);
                return raw ? JSON.parse(raw) : null;
            })
        );
        const valid = records.filter(Boolean);

        // Tổng hợp số liệu
        const bySubject = { excel: 0, word: 0, ppt: 0 };
        const byType = { learn: 0, test: 0 };
        let totalScore = 0;
        const uniquePhones = new Set();

        for (const r of valid) {
            if (bySubject[r.subject] !== undefined) bySubject[r.subject]++;
            if (byType[r.type] !== undefined) byType[r.type]++;
            totalScore += r.score || 0;
            if (r.phone) uniquePhones.add(r.phone);
        }

        const avgScore = valid.length > 0 ? Math.round(totalScore / valid.length) : 0;

        return json({
            success: true,
            range,
            totalSubmissions: valid.length,
            uniqueStudents: uniquePhones.size,
            avgScore,
            bySubject,
            byType
        });
    } catch (e) {
        return json({ success: false, msg: e.message }, 500);
    }
}

// ───────────────────────── Helpers ─────────────────────────

// "Hôm nay" theo ngày dương lịch Việt Nam (UTC+7), khớp cách tính
// trong api/license-api.js (todayVietnam) để so sánh expireDate nhất quán.
function formatTodayVN() {
    const now = new Date();
    const vnShifted = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const y = vnShifted.getUTCFullYear();
    const m = String(vnShifted.getUTCMonth() + 1).padStart(2, "0");
    const d = String(vnShifted.getUTCDate()).padStart(2, "0");
    return `${y}${m}${d}`;
}

// Định dạng ngày theo giờ Việt Nam, dùng cho key all_results:{yyyy-MM-dd}
function formatDateVN(date) {
    const vnShifted = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const y = vnShifted.getUTCFullYear();
    const m = String(vnShifted.getUTCMonth() + 1).padStart(2, "0");
    const d = String(vnShifted.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
}