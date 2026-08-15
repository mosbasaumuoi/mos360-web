// ============================================================
// MOS360 LICENSE API — Cấp mật khẩu Excel/Word/PPT theo máy
// ============================================================
// Port chính xác 1-1 từ thuật toán C# (Form2.cs ToMD5):
//   input = (userPrefix?) + mac + ngayhethang("yyyyMMdd") + SALT
//   md5hex = MD5(input)
//   password = 10 ký tự CUỐI của md5hex (lowercase)
//
// randomID học viên gửi = Base64( mac + ngayHienTai("yyyyMMdd") )
// → Admin chỉ cần: Base64Decode → tách mac (bỏ 8 ký tự ngày cuối)
//   → tính ngayhethang = ngày cấp + 60 → tính password
//
// userPrefix theo môn (đã đồng bộ với Form2.cs Learn — toàn chữ thường):
//   Excel: "excel test"
//   Word : "word test"
//   PPT  : "ppt test"
// ============================================================

const SALT = "FJKSFxnEO7EUKIK9KFWT";

const SUBJECT_PREFIX = {
    excel: "excel test",
    word: "word test",
    ppt: "ppt test"
};

const SUBJECT_LABEL = {
    excel: "Excel (Learn + Test)",
    word: "Word (Learn + Test)",
    ppt: "PowerPoint (Learn + Test)"
};

// ───────────────────────── MD5 (Web Crypto) ─────────────────────────
async function md5Hex(input) {
    // Web Crypto không có MD5 sẵn (chỉ SHA-*) → dùng implement JS thuần,
    // nhỏ gọn, đã test khớp 100% với System.Security.Cryptography.MD5 của .NET.
    return md5(input);
}

// Cài đặt MD5 thuần JS (RFC 1321) — không phụ thuộc thư viện ngoài,
// chạy được trong Cloudflare Workers runtime.
function md5(string) {
    function rotateLeft(x, c) { return (x << c) | (x >>> (32 - c)); }
    function addUnsigned(x, y) {
        const x4 = (x & 0x40000000), y4 = (y & 0x40000000);
        const x8 = (x & 0x80000000), y8 = (y & 0x80000000);
        const result = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF);
        if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8;
        if (x4 | y4) {
            if (result & 0x40000000) return result ^ 0xC0000000 ^ x8 ^ y8;
            return result ^ 0x40000000 ^ x8 ^ y8;
        }
        return result ^ x8 ^ y8;
    }
    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }
    function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function convertToWordArray(string) {
        let wordCount;
        const messageLength = string.length;
        const numberOfWordsTemp1 = messageLength + 8;
        const numberOfWordsTemp2 = (numberOfWordsTemp1 - (numberOfWordsTemp1 % 64)) / 64;
        const numberOfWords = (numberOfWordsTemp2 + 1) * 16;
        const wordArray = new Array(numberOfWords - 1);
        let bytePosition = 0, byteCount = 0;
        while (byteCount < messageLength) {
            wordCount = (byteCount - (byteCount % 4)) / 4;
            bytePosition = (byteCount % 4) * 8;
            wordArray[wordCount] = (wordArray[wordCount] | (string.charCodeAt(byteCount) << bytePosition));
            byteCount++;
        }
        wordCount = (byteCount - (byteCount % 4)) / 4;
        bytePosition = (byteCount % 4) * 8;
        wordArray[wordCount] = wordArray[wordCount] | (0x80 << bytePosition);
        wordArray[numberOfWords - 2] = messageLength << 3;
        wordArray[numberOfWords - 1] = messageLength >>> 29;
        return wordArray;
    }
    function wordToHex(value) {
        let hex = "", byte, count;
        for (count = 0; count <= 3; count++) {
            byte = (value >>> (count * 8)) & 255;
            hex += ("0" + byte.toString(16)).slice(-2);
        }
        return hex;
    }
    function utf8Encode(string) {
        return unescape(encodeURIComponent(string));
    }

    let x = [];
    let k, AA, BB, CC, DD, a, b, c, d;
    const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = utf8Encode(string);
    x = convertToWordArray(string);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA); b = addUnsigned(b, BB);
        c = addUnsigned(c, CC); d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

// ───────────────────────── Helpers ─────────────────────────

function formatYYYYMMDD(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}${m}${d}`;
}

function addDaysUTC(date, days) {
    const d = new Date(date.getTime());
    d.setUTCDate(d.getUTCDate() + days);
    return d;
}

// "Hôm nay" theo NGÀY DƯƠNG LỊCH Việt Nam (UTC+7), không phải ngày UTC của máy chủ.
// Quan trọng: Cloudflare Workers chạy giờ UTC. Nếu lấy thẳng new Date() rồi đọc
// getUTCFullYear/Month/Date(), trong khung 00:00–06:59 giờ VN (= 17:00–23:59 UTC
// hôm trước) sẽ tính NHẦM "hôm nay" là ngày hôm trước theo lịch VN — lệch 1 ngày
// so với app C# gốc chạy theo giờ hệ thống Việt Nam. Cộng 7 giờ trước khi đọc Y/M/D
// để luôn khớp đúng ngày dương lịch mà admin tại Việt Nam đang thấy trên máy họ.
function todayVietnam() {
    const now = new Date();
    const vnShifted = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    return new Date(Date.UTC(vnShifted.getUTCFullYear(), vnShifted.getUTCMonth(), vnShifted.getUTCDate()));
}

// Base64Decode(randomID) → { mac, ngayHocVienGui }
// randomID = Base64( mac + "yyyyMMdd" )  → 8 ký tự cuối luôn là ngày
function decodeRandomID(randomID) {
    // Chuẩn hoá trước khi decode — dung thứ các kiểu hỏng thường gặp khi
    // mã ID (Base64) đi qua deep-link/copy-paste:
    //   1. '+' bị trình duyệt hiểu nhầm thành dấu cách trong query string
    //      (do app gửi link không encode) → base64 thật không có dấu
    //      cách nên khôi phục an toàn.
    //   2. Biến thể URL-safe Base64 ('-' thay '+', '_' thay '/').
    //   3. Thiếu ký tự đệm '=' ở cuối (một số nơi cắt bớt khi copy).
    //   4. Khoảng trắng/xuống dòng thừa do dán từ nơi khác.
    let clean = randomID.trim()
        .replace(/\s+/g, "+")
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    while (clean.length % 4 !== 0) clean += "=";

    let decoded;
    try {
        decoded = atob(clean);
    } catch (e) {
        throw new Error("Mã ID không hợp lệ (không decode được Base64) — vui lòng copy lại nguyên mã từ phần mềm, tránh gõ tay hoặc dán thiếu.");
    }
    if (decoded.length < 9) {
        throw new Error("Mã ID quá ngắn, không hợp lệ");
    }
    const dateStr = decoded.slice(-8);
    const mac = decoded.slice(0, -8);
    if (!/^\d{8}$/.test(dateStr)) {
        throw new Error("Mã ID không đúng định dạng (thiếu ngày hợp lệ)");
    }
    return { mac, dateStr };
}

// Tính password cho 1 môn, trả về cả password hiện hành (60 ngày tính từ
// hôm nay) — đây là trường hợp chuẩn khi admin duyệt ngay sau khi học viên gửi mã.
async function computePassword(mac, subject, expireDate) {
    const prefix = SUBJECT_PREFIX[subject];
    if (!prefix) throw new Error("Môn học không hợp lệ: " + subject);
    const input = prefix + mac + formatYYYYMMDD(expireDate) + SALT;
    const hash = await md5Hex(input);
    return hash.slice(-10);
}

// Dùng chung cho cả "Cấp thủ công" (/compute) lẫn "Duyệt yêu cầu" (/approve):
// decode randomID → tính hạn 60 ngày kể từ NGÀY DUYỆT (giờ VN) → tính password
// từng môn → lưu pwd_index:{password} để tra cứu sau này.
async function computeAndSaveLicense(randomID, subjects, studentName, phone, env) {
    const { mac } = decodeRandomID(randomID);
    const todayUTC = todayVietnam();
    const expireDate = addDaysUTC(todayUTC, 60);

    const results = [];
    for (const subj of subjects) {
        if (!SUBJECT_PREFIX[subj]) continue;
        const password = await computePassword(mac, subj, expireDate);
        results.push({
            subject: subj,
            label: SUBJECT_LABEL[subj],
            password,
            expireDate: formatYYYYMMDD(expireDate),
            expireDateDisplay: `${String(expireDate.getUTCDate()).padStart(2, "0")}/${String(expireDate.getUTCMonth() + 1).padStart(2, "0")}/${expireDate.getUTCFullYear()}`
        });
    }

    // Lưu index theo password — mỗi môn 1 key riêng, key = chính password đó.
    // Cho phép tra cứu trực tiếp: học viên gửi password → biết ngay
    // ai, máy nào, môn gì, hạn bao giờ — phục vụ hỗ trợ/gia hạn sau này.
    //   Key:   pwd_index:{password}
    //   Value: { studentName, phone, subject, mac, expireDate, issuedAt }
    try {
        const now = new Date().toISOString();
        for (const r of results) {
            const pwdKey = "pwd_index:" + r.password;
            const value = {
                studentName: studentName || "",
                phone: phone || "",
                subject: r.subject,
                mac,
                expireDate: r.expireDate,
                issuedAt: now
            };
            await env.MOS360_USERS_KV.put(pwdKey, JSON.stringify(value));
        }
    } catch (e) {
        // Không chặn response nếu lưu index lỗi
    }

    return { mac, results };
}

// ───────────────────────── API Handler ─────────────────────────

const RECEIVE_CHANNELS = ["email", "zalo", "facebook"];

export async function handleLicenseAPI(path, request, env) {
    const url = new URL(request.url);

    // ── POST /api/license/request — học viên tự nộp yêu cầu (trang công khai,
    // KHÔNG cần token admin). Chỉ lưu vào hàng chờ, KHÔNG tính password ở đây —
    // password chỉ được tính khi admin bấm Duyệt (đối chiếu đã thanh toán chưa).
    // body: { studentName, phone, randomID, subjects, receiveChannel, receiveContact }
    if (path === "/api/license/request" && request.method === "POST") {
        try {
            const body = await request.json();
            const studentName = (body.studentName || "").trim();
            const phone = (body.phone || "").trim();
            const randomID = (body.randomID || "").trim();
            const subjects = Array.isArray(body.subjects) ? body.subjects.filter(s => SUBJECT_PREFIX[s]) : [];
            const receiveChannel = (body.receiveChannel || "").trim();
            const receiveContact = (body.receiveContact || "").trim();

            if (!studentName) return json({ success: false, msg: "Vui lòng nhập tên" });
            if (!phone) return json({ success: false, msg: "Vui lòng nhập số điện thoại" });
            if (!randomID) return json({ success: false, msg: "Vui lòng dán mã ID từ app" });
            if (subjects.length === 0) return json({ success: false, msg: "Vui lòng chọn ít nhất 1 môn đã đăng ký" });
            if (!RECEIVE_CHANNELS.includes(receiveChannel)) return json({ success: false, msg: "Vui lòng chọn kênh nhận kết quả" });
            if (!receiveContact) return json({ success: false, msg: "Vui lòng nhập thông tin liên hệ cho kênh đã chọn" });

            // Validate randomID parse được ngay từ lúc nộp, để học viên biết sửa ngay
            // nếu copy thiếu/sai, thay vì để admin phát hiện trễ lúc duyệt.
            try {
                decodeRandomID(randomID);
            } catch (e) {
                // Học viên NGHĨ là đã gửi thành công nhưng thực ra yêu cầu chưa
                // được lưu (lỗi mã ID) → admin sẽ không thấy gì trong hàng chờ và
                // không biết học viên đã cố gửi. Ghi lại lỗi này để admin nhìn
                // thấy trong Dashboard và chủ động liên hệ, thay vì yêu cầu biến
                // mất không dấu vết.
                try {
                    const failKey = "failed_request:" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
                    await env.MOS360_USERS_KV.put(failKey, JSON.stringify({
                        studentName, phone, randomID, reason: e.message, requestedAt: new Date().toISOString()
                    }), { expirationTtl: 30 * 24 * 60 * 60 }); // tự xoá sau 30 ngày
                } catch (e2) { /* không chặn response nếu ghi log lỗi thất bại */ }
                return json({ success: false, msg: e.message });
            }

            const now = new Date();
            const key = "pending:" + now.getTime() + "_" + Math.random().toString(36).slice(2, 8);
            const value = {
                studentName, phone, randomID, subjects,
                receiveChannel, receiveContact,
                status: "pending",
                requestedAt: now.toISOString()
            };
            await env.MOS360_USERS_KV.put(key, JSON.stringify(value));

            return json({ success: true, msg: "Đã gửi yêu cầu thành công! MOS360 sẽ xử lý và gửi mật khẩu cho bạn sớm nhất." });
        } catch (e) {
            return json({ success: false, msg: e.message || "Có lỗi xảy ra, vui lòng thử lại" });
        }
    }

    // ── Từ đây trở xuống là API cho ADMIN — bắt buộc token ──
    const authHeader = request.headers.get("X-Admin-Token") || "";
    const token = url.searchParams.get("token") || authHeader;
    if (token !== "mos360admin2026") {
        return json({ success: false, msg: "Unauthorized" }, 401);
    }

    // POST /api/license/compute — tính password từ randomID + môn học (cấp thủ công,
    // không qua hàng chờ — dùng khi admin có sẵn mã ID, vd học viên gửi qua kênh khác)
    // body: { randomID, subjects: ["excel","word"], studentName?, phone? }
    if (path === "/api/license/compute" && request.method === "POST") {
        try {
            const body = await request.json();
            const randomID = (body.randomID || "").trim();
            const subjects = Array.isArray(body.subjects) ? body.subjects : [];
            if (!randomID) return json({ success: false, msg: "Thiếu mã ID học viên gửi" });
            if (subjects.length === 0) return json({ success: false, msg: "Chưa chọn môn học nào" });

            const { mac, results } = await computeAndSaveLicense(
                randomID, subjects, (body.studentName || "").trim(), (body.phone || "").trim(), env
            );

            return json({ success: true, mac, results });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // GET /api/license/failed-requests — nhật ký các lần học viên gửi bị lỗi
    // (mã ID không decode được...) — để admin biết có người đã CỐ gửi nhưng
    // thất bại, thay vì không thấy gì và tưởng chưa ai gửi.
    if (path === "/api/license/failed-requests" && request.method === "GET") {
        try {
            const requestedLimit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 500);
            let allKeys = [];
            let cursor = undefined;
            for (let page = 0; page < 20; page++) {
                const listResult = await env.MOS360_USERS_KV.list({ prefix: "failed_request:", limit: 1000, cursor });
                allKeys = allKeys.concat(listResult.keys);
                if (listResult.list_complete || !listResult.cursor) break;
                cursor = listResult.cursor;
            }
            const items = [];
            for (const k of allKeys) {
                const raw = await env.MOS360_USERS_KV.get(k.name);
                if (!raw) continue;
                items.push({ key: k.name, ...JSON.parse(raw) });
            }
            items.sort((a, b) => (b.requestedAt || "").localeCompare(a.requestedAt || ""));
            return json({ success: true, items: items.slice(0, requestedLimit) });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // DELETE /api/license/failed-requests — xoá 1 dòng nhật ký lỗi (sau khi
    // admin đã liên hệ/xử lý xong với học viên).
    if (path === "/api/license/failed-requests" && request.method === "DELETE") {
        try {
            const body = await request.json();
            const key = body.key || "";
            if (!key || !key.startsWith("failed_request:")) return json({ success: false, msg: "Thiếu hoặc sai key" });
            await env.MOS360_USERS_KV.delete(key);
            return json({ success: true });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // GET /api/license/pending — danh sách yêu cầu đang chờ duyệt (mới nhất lên đầu)
    if (path === "/api/license/pending" && request.method === "GET") {
        try {
            // Lưu ý: KV.list() trả key theo thứ tự tăng dần (cũ → mới vì key =
            // "pending:" + timestamp). Nếu limit quá nhỏ, những yêu cầu MỚI NHẤT
            // (còn thật sự pending) có thể nằm ở các trang sau và bị bỏ sót —
            // trong khi các key cũ nhất (đã approved từ lâu) lại chiếm hết trang đầu.
            // → Duyệt hết toàn bộ các trang (theo cursor) thay vì chỉ lấy 1 trang.
            const requestedLimit = Math.min(parseInt(url.searchParams.get("limit") || "1000", 10), 5000);
            let allKeys = [];
            let cursor = undefined;
            for (let page = 0; page < 20; page++) { // an toàn: tối đa 20 trang (~20.000 key)
                const listResult = await env.MOS360_USERS_KV.list({ prefix: "pending:", limit: 1000, cursor });
                allKeys = allKeys.concat(listResult.keys);
                if (listResult.list_complete || !listResult.cursor) break;
                cursor = listResult.cursor;
            }

            const items = [];
            for (const k of allKeys) {
                const raw = await env.MOS360_USERS_KV.get(k.name);
                if (!raw) continue;
                let info;
                try { info = JSON.parse(raw); } catch (e2) { continue; }
                if (info.status !== "pending") continue; // đã duyệt rồi thì không hiện ở hàng chờ nữa
                items.push({ key: k.name, ...info });
            }
            items.sort((a, b) => (b.requestedAt || "").localeCompare(a.requestedAt || ""));
            return json({ success: true, items: items.slice(0, requestedLimit) });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // ───────────────────────── Gửi email mật khẩu qua Resend ─────────────────────────

    async function sendPasswordEmail(env, { studentName, email, results }) {
        const apiKey = env.RESEND_API_KEY;
        if (!apiKey) return { ok: false, msg: "Chưa cấu hình RESEND_API_KEY" };

        const subjectLabel = { excel: "📊 Excel", word: "📄 Word", ppt: "📽️ PowerPoint" };

        const passwordRows = results.map(r => `
        <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#1e293b">${subjectLabel[r.subject] || r.subject}</td>
            <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-family:monospace;font-size:1.1rem;font-weight:800;color:#0052CC;letter-spacing:1px">${r.password}</td>
            <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:0.9rem">Đến ngày ${r.expireDateDisplay}</td>
        </tr>`).join("");

        const html = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4fa;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08)">

  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,#0052CC,#003d99);padding:28px 32px;text-align:center">
    <div style="font-size:2rem;font-weight:900;letter-spacing:-1px">
      <span style="color:#FF5722">MOS</span><span style="color:#ffffff">360</span>
    </div>
    <div style="color:rgba(255,255,255,0.8);font-size:0.85rem;margin-top:4px">Trung tâm luyện thi MOS chứng chỉ quốc tế</div>
  </div>

  <!-- BODY -->
  <div style="padding:28px 32px">
    <p style="font-size:1rem;color:#1e293b;margin-bottom:6px">Xin chào <strong>${studentName || "bạn"}</strong>,</p>
    <p style="color:#475569;font-size:0.9rem;line-height:1.6;margin-bottom:24px">
      Yêu cầu cấp mật khẩu phần mềm MOS360 của bạn đã được xử lý.<br>
      Mật khẩu có hiệu lực kích hoạt trong vòng 7 ngày. 
      Dưới đây là thông tin mật khẩu kích hoạt:
    </p>

    <!-- BẢNG MẬT KHẨU -->
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:24px">
      <thead>
        <tr style="background:#f8fafc">
          <th style="padding:10px 16px;text-align:left;font-size:0.75rem;color:#64748b;font-weight:700;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0">MÔN HỌC</th>
          <th style="padding:10px 16px;text-align:left;font-size:0.75rem;color:#64748b;font-weight:700;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0">MẬT KHẨU</th>
          <th style="padding:10px 16px;text-align:left;font-size:0.75rem;color:#64748b;font-weight:700;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0">HIỆU LỰC</th>
        </tr>
      </thead>
      <tbody>${passwordRows}</tbody>
    </table>

    <!-- HƯỚNG DẪN -->
    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:16px 18px;margin-bottom:24px">
      <div style="font-weight:700;color:#0369a1;margin-bottom:8px;font-size:0.9rem">📋 Hướng dẫn kích hoạt</div>
      <ol style="margin:0;padding-left:18px;color:#0c4a6e;font-size:0.85rem;line-height:1.8">
        <li>Mở phần mềm MOS360 trên máy tính</li>
        <li>Chọn môn học tương ứng</li>
        <li>Nhập mật khẩu vào ô kích hoạt → bấm <strong>Xác nhận</strong></li>
        <li>Mật khẩu được khoá theo máy — không dùng được trên máy khác</li>
      </ol>
    </div>

    <p style="color:#64748b;font-size:0.82rem;line-height:1.6">
      Nếu cần hỗ trợ, vui lòng liên hệ MOS360 qua 
      <a href="https://zalo.me/0912888360" style="color:#0052CC">Zalo</a> hoặc 
      <a href="https://mos360.vn" style="color:#0052CC">mos360.vn</a>.
    </p>
  </div>

  <!-- FOOTER -->
  <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;text-align:center">
    <p style="color:#94a3b8;font-size:0.75rem;margin:0">© MOS360.VN · Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
  </div>

</div>
</body></html>`;

        try {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: "MOS360 <hotro@mos360.vn>",
                    to: [email],
                    subject: `🔑 Mật khẩu phần mềm MOS360 — ${studentName || ""}`,
                    html
                })
            });

            // Đọc raw text trước — tránh crash nếu Resend trả về HTML hoặc response rỗng
            const rawText = await res.text();
            let data = {};
            try { data = JSON.parse(rawText); } catch (_) { /* không phải JSON */ }

            if (!res.ok) {
                const errMsg = data.message || data.error || rawText.slice(0, 120) || `HTTP ${res.status}`;
                return { ok: false, msg: errMsg };
            }
            return { ok: true, emailId: data.id };
        } catch (e) {
            return { ok: false, msg: e.message };
        }
    }

    // POST /api/license/approve — duyệt 1 yêu cầu đang chờ: tính password,
    // DELETE /api/license/pending — xóa yêu cầu khỏi hàng chờ (từ chối / trùng lặp)
    // body: { key: "pending:169..._ab12cd" }
    if (path === "/api/license/pending" && request.method === "DELETE") {
        try {
            const body = await request.json();
            const key = (body.key || "").trim();
            if (!key || !key.startsWith("pending:")) return json({ success: false, msg: "Thiếu hoặc sai mã yêu cầu" });
            await env.MOS360_USERS_KV.delete(key);
            return json({ success: true, msg: "Đã xóa yêu cầu" });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // lưu pwd_index như bình thường, đổi trạng thái pending -> approved.
    // body: { key: "pending:169..._ab12cd" }
    if (path === "/api/license/approve" && request.method === "POST") {
        try {
            const body = await request.json();
            const key = (body.key || "").trim();
            if (!key || !key.startsWith("pending:")) return json({ success: false, msg: "Thiếu hoặc sai mã yêu cầu" });

            const raw = await env.MOS360_USERS_KV.get(key);
            if (!raw) return json({ success: false, msg: "Yêu cầu không tồn tại hoặc đã bị xoá" });
            const reqInfo = JSON.parse(raw);
            if (reqInfo.status !== "pending") return json({ success: false, msg: "Yêu cầu này đã được duyệt trước đó" });

            const { mac, results } = await computeAndSaveLicense(
                reqInfo.randomID, reqInfo.subjects, reqInfo.studentName, reqInfo.phone, env
            );

            reqInfo.status = "approved";
            reqInfo.approvedAt = new Date().toISOString();
            await env.MOS360_USERS_KV.put(key, JSON.stringify(reqInfo));

            // Gửi email tự động — không chặn response nếu email lỗi
            let emailResult = { ok: false, msg: "Không có địa chỉ email" };
            const studentEmail = reqInfo.receiveContact;
            if (studentEmail && studentEmail.includes("@")) {
                emailResult = await sendPasswordEmail(env, {
                    studentName: reqInfo.studentName,
                    email: studentEmail,
                    results
                });
            }

            return json({
                success: true,
                mac,
                results,
                studentName: reqInfo.studentName,
                phone: reqInfo.phone,
                receiveChannel: reqInfo.receiveChannel,
                receiveContact: reqInfo.receiveContact,
                emailSent: emailResult.ok,
                emailMsg: emailResult.ok ? `Đã gửi tới ${studentEmail}` : emailResult.msg
            });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // GET /api/license/lookup?password=xxxx — tra cứu 1 password cụ thể
    if (path === "/api/license/lookup" && request.method === "GET") {
        try {
            const password = (url.searchParams.get("password") || "").trim().toLowerCase();
            if (!password) return json({ success: false, msg: "Thiếu password cần tra" });
            const raw = await env.MOS360_USERS_KV.get("pwd_index:" + password);
            if (!raw) return json({ success: false, msg: "Không tìm thấy password này" });
            return json({ success: true, info: JSON.parse(raw) });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // GET /api/license/search?q=... — tìm theo SĐT hoặc họ tên (dùng cho tab
    // "Số ĐT" / "Họ tên" trong Tra cứu Admin Dashboard). Trước đây endpoint
    // này KHÔNG tồn tại nên tab "Số ĐT"/"Họ tên" luôn báo lỗi 404 "License
    // API not found" — chỉ tab "Mật khẩu" (dùng /lookup) hoạt động.
    // Vì dữ liệu chỉ có index theo password (pwd_index:), endpoint này quét
    // toàn bộ danh sách rồi lọc theo q — giống cách /api/license/list đã
    // làm, không phát sinh thêm bất kỳ lệnh "put" nào (chỉ get/list, không
    // tốn quota ghi KV).
    if (path === "/api/license/search" && request.method === "GET") {
        try {
            const q = (url.searchParams.get("q") || "").trim().toLowerCase();
            if (!q) return json({ success: false, msg: "Thiếu từ khóa tìm kiếm" });

            const listResult = await env.MOS360_USERS_KV.list({ prefix: "pwd_index:", limit: 1000 });
            const items = [];
            for (const k of listResult.keys) {
                const raw = await env.MOS360_USERS_KV.get(k.name);
                if (!raw) continue;
                const info = JSON.parse(raw);
                const phone = (info.phone || "").toLowerCase();
                const name = (info.studentName || "").toLowerCase();
                if (phone.includes(q) || name.includes(q)) {
                    items.push({ password: k.name.replace("pwd_index:", ""), ...info });
                }
            }
            // Mới nhất lên đầu, giống /api/license/list
            items.sort((a, b) => (b.issuedAt || "").localeCompare(a.issuedAt || ""));

            return json({ success: true, items, total: items.length });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // GET /api/license/list — liệt kê toàn bộ index đã cấp (mới nhất theo
    // thứ tự liệt kê của KV; hỗ trợ phân trang qua cursor giống KV.list gốc)
    // ?limit=50&cursor=xxx
    if (path === "/api/license/list" && request.method === "GET") {
        try {
            const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 1000);
            const cursor = url.searchParams.get("cursor") || undefined;
            const listResult = await env.MOS360_USERS_KV.list({ prefix: "pwd_index:", limit, cursor });

            const items = [];
            for (const k of listResult.keys) {
                const raw = await env.MOS360_USERS_KV.get(k.name);
                if (raw) {
                    const info = JSON.parse(raw);
                    items.push({ password: k.name.replace("pwd_index:", ""), ...info });
                }
            }
            // Mới nhất lên đầu
            items.sort((a, b) => (b.issuedAt || "").localeCompare(a.issuedAt || ""));

            return json({
                success: true,
                items,
                cursor: listResult.list_complete ? null : listResult.cursor
            });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // POST /api/license/renew — gia hạn 60 ngày kể từ HÔM NAY (không cần học viên gửi mã ID lại).
    // body: { password: "abc1234567" }
    //
    // Vì password = MD5(salt + mac + ngày_hết_hạn + SALT), khi ngày thay đổi thì
    // password buộc phải đổi. Flow:
    //   1. Tra pwd_index:{oldPwd} → lấy mac, subject, studentName, phone
    //   2. Tính newExpireDate = hôm nay (giờ VN) + 60 ngày
    //   3. Tính newPassword theo đúng thuật toán C# (dùng computePassword)
    //   4. Lưu pwd_index:{newPassword} với expireDate mới
    //   5. Xoá pwd_index:{oldPassword} (password cũ không còn hiệu lực)
    //   6. Trả newPassword + expireDateDisplay để admin gửi cho học viên
    if (path === "/api/license/renew" && request.method === "POST") {
        try {
            const body = await request.json();
            const oldPassword = (body.password || "").trim().toLowerCase();
            if (!oldPassword) return json({ success: false, msg: "Thiếu password cần gia hạn" });

            const oldRaw = await env.MOS360_USERS_KV.get("pwd_index:" + oldPassword);
            if (!oldRaw) return json({ success: false, msg: "Không tìm thấy password này trong hệ thống" });

            const info = JSON.parse(oldRaw);
            const { mac, subject, studentName, phone } = info;

            const todayUTC = todayVietnam();
            const newExpireDate = addDaysUTC(todayUTC, 60);
            const newPassword = await computePassword(mac, subject, newExpireDate);
            const newExpireDateStr = formatYYYYMMDD(newExpireDate);
            const newExpireDateDisplay =
                `${String(newExpireDate.getUTCDate()).padStart(2, "0")}/${String(newExpireDate.getUTCMonth() + 1).padStart(2, "0")}/${newExpireDate.getUTCFullYear()}`;

            const newRecord = {
                studentName: studentName || "",
                phone: phone || "",
                subject,
                mac,
                expireDate: newExpireDateStr,
                issuedAt: new Date().toISOString(),
                renewedFrom: oldPassword   // audit trail — biết đây là gia hạn từ password nào
            };

            await env.MOS360_USERS_KV.put("pwd_index:" + newPassword, JSON.stringify(newRecord));
            await env.MOS360_USERS_KV.delete("pwd_index:" + oldPassword);

            return json({
                success: true,
                oldPassword,
                newPassword,
                expireDateDisplay: newExpireDateDisplay,
                studentName: studentName || "",
                subject
            });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    // POST /api/license/revoke — xoá 1 mật khẩu (vô hiệu hoá tức thì).
    // Dùng khi học viên vi phạm, hoàn tiền, hoặc cần cấp lại từ đầu.
    // body: { password: "abc1234567" }
    if (path === "/api/license/revoke" && request.method === "POST") {
        try {
            const body = await request.json();
            const password = (body.password || "").trim().toLowerCase();
            if (!password) return json({ success: false, msg: "Thiếu password cần xoá" });

            const raw = await env.MOS360_USERS_KV.get("pwd_index:" + password);
            if (!raw) return json({ success: false, msg: "Không tìm thấy password này" });

            const info = JSON.parse(raw);
            await env.MOS360_USERS_KV.delete("pwd_index:" + password);

            return json({
                success: true,
                msg: `Đã xoá mật khẩu của ${info.studentName || info.phone || "học viên"}`
            });
        } catch (e) {
            return json({ success: false, msg: e.message });
        }
    }

    return json({ success: false, msg: "License API not found" }, 404);
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
}