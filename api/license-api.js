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
    let decoded;
    try {
        decoded = atob(randomID.trim());
    } catch (e) {
        throw new Error("Mã ID không hợp lệ (không decode được Base64)");
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

// ───────────────────────── API Handler ─────────────────────────

export async function handleLicenseAPI(path, request, env) {
    const authHeader = request.headers.get("X-Admin-Token") || "";
    const url = new URL(request.url);
    const token = url.searchParams.get("token") || authHeader;
    if (token !== "mos360admin2026") {
        return json({ success: false, msg: "Unauthorized" }, 401);
    }

    // POST /api/license/compute — tính password từ randomID + môn học
    // body: { randomID, subjects: ["excel","word"], studentName?, phone? }
    if (path === "/api/license/compute" && request.method === "POST") {
        try {
            const body = await request.json();
            const randomID = (body.randomID || "").trim();
            const subjects = Array.isArray(body.subjects) ? body.subjects : [];
            if (!randomID) return json({ success: false, msg: "Thiếu mã ID học viên gửi" });
            if (subjects.length === 0) return json({ success: false, msg: "Chưa chọn môn học nào" });

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
                        studentName: (body.studentName || "").trim(),
                        phone: (body.phone || "").trim(),
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

            return json({ success: true, mac, results });
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

    return json({ success: false, msg: "License API not found" }, 404);
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
}