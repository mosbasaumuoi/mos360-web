// ============================================================
// MOS360 VIDEO LIBRARY API — Video giải đề Test (MOS 2019 / MOS 365)
// ============================================================
// Yêu cầu bảo mật:
//   1. Học viên phải đăng nhập (Họ và Tên + SĐT) trước khi xem video.
//      Tài khoản được đối chiếu với danh sách "DSVIP" trong Google Sheet
//      đăng ký (qua Apps Script, action "vipCheck") — danh sách học viên
//      được trung tâm chủ động cấp quyền xem thư viện, KHÔNG liên quan
//      danh mục cấp mật khẩu phần mềm MOS (pwd_index:* trong KV).
//   2. Đăng nhập thành công → server set 1 cookie HttpOnly đã ký (HMAC),
//      hết hạn sau SESSION_TTL_MS. Cookie này KHÔNG chứa mật khẩu, chỉ
//      chứa họ tên + số điện thoại đã chuẩn hoá + thời hạn.
//   3. URL video (m3u8/ts) KHÔNG bao giờ nằm sẵn trong HTML/JS gửi về
//      trình duyệt. Học viên bấm "Xem" → JS gọi API (kèm cookie) → server
//      xác nhận đã đăng nhập → sinh 1 token ký HMAC, gắn thời hạn ngắn
//      (STREAM_TTL_MS) → trả về đường dẫn dạng:
//          /api/video-library/hls/{token}/output.m3u8
//      Token nằm ngay trong PATH (không phải query) để khi trình duyệt/
//      hls.js tự resolve các segment .ts (đường dẫn tương đối trong file
//      .m3u8) thì token vẫn được giữ nguyên trong URL.
//   4. Nếu học viên copy URL này gửi cho người khác, sau khi token hết
//      hạn (vài phút) mọi request tới sẽ bị từ chối (403). Để việc xem
//      video liên tục không bị gián đoạn, phía client sẽ tự động xin
//      token mới định kỳ (trước khi token cũ hết hạn) — xem pages/library.js
// ============================================================

// ⚠️ Đổi chuỗi này thành 1 secret riêng khi triển khai thật (giữ bí mật,
// không public repo công khai). Dùng để ký cookie phiên đăng nhập VÀ
// token stream video.
const VIDEO_SECRET = "M0s360V!d30Libr@ry_S3cr3t_2026#HP";

// Apps Script (v9) bind vào file Sheet "MOS360_DANG_KY" — cùng URL đang
// được api/register-api.js dùng để ghi DKHOC/DKTHI/DKOFFLINE. Endpoint
// GET ?action=vipCheck đọc tab "DSVIP" và chỉ trả về true/false đã khớp
// Họ và tên + SĐT hay chưa (không bao giờ trả cả danh sách DSVIP ra ngoài).
const VIP_CHECK_URL = "https://script.google.com/macros/s/AKfycbweC3d-SKm29ltW6Y13hWqYuw8Q-4X23QEbF0AhQL_IfA2YiWYzVkIOyV4n-sxApEpcMA/exec";

const SESSION_COOKIE_NAME = "mv_sess";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;   // 12 giờ — thời gian đăng nhập còn hiệu lực
const STREAM_TTL_MS = 8 * 60 * 1000;          // 8 phút — thời hạn 1 URL stream (chống copy link)

// ───────────────────────── Danh mục Video (khớp cấu trúc thư mục R2) ─────
// R2 bucket "my-videos" (binding MOS360_VIDEOS_R2), mỗi thư mục chứa
// output.m3u8 + output0.ts, output1.ts, ... (HLS).
const VIDEO_CATALOG = [
    // ── MOS 2019 ──
    { id: "mos2019-word-test1", group: "MOS2019", groupLabel: "MOS 2019", subject: "word", subjectLabel: "Word", title: "Giải đề MOS-WORD-2019-TEST1", r2Prefix: "MOS2019/WORD2019-TEST1" },
    { id: "mos2019-word-test2", group: "MOS2019", groupLabel: "MOS 2019", subject: "word", subjectLabel: "Word", title: "Giải đề MOS-WORD-2019-TEST2", r2Prefix: "MOS2019/WORD2019-TEST2" },
    { id: "mos2019-word-test3", group: "MOS2019", groupLabel: "MOS 2019", subject: "word", subjectLabel: "Word", title: "Giải đề MOS-WORD-2019-TEST3", r2Prefix: "MOS2019/WORD2019-TEST3" },
    { id: "mos2019-excel-test1", group: "MOS2019", groupLabel: "MOS 2019", subject: "excel", subjectLabel: "Excel", title: "Giải đề MOS-EXCEL-2019-TEST1", r2Prefix: "MOS2019/EXCEL2019-TEST1" },
    { id: "mos2019-excel-test2", group: "MOS2019", groupLabel: "MOS 2019", subject: "excel", subjectLabel: "Excel", title: "Giải đề MOS-EXCEL-2019-TEST2", r2Prefix: "MOS2019/EXCEL2019-TEST2" },
    { id: "mos2019-ppt-test1", group: "MOS2019", groupLabel: "MOS 2019", subject: "ppt", subjectLabel: "PowerPoint", title: "Giải đề MOS-PPT-2019-TEST1", r2Prefix: "MOS2019/PPT2019-TEST1" },
    { id: "mos2019-ppt-test2", group: "MOS2019", groupLabel: "MOS 2019", subject: "ppt", subjectLabel: "PowerPoint", title: "Giải đề MOS-PPT-2019-TEST2", r2Prefix: "MOS2019/PPT2019-TEST2" },

    // ── MOS 365 ──
    { id: "mos365-word-test1", group: "MOS365", groupLabel: "MOS 365", subject: "word", subjectLabel: "Word", title: "Giải đề MOS-WORD-365-TEST1", r2Prefix: "MOS365/WORD365-TEST1" },
    { id: "mos365-word-test2", group: "MOS365", groupLabel: "MOS 365", subject: "word", subjectLabel: "Word", title: "Giải đề MOS-WORD-365-TEST2", r2Prefix: "MOS365/WORD365-TEST2" },
    { id: "mos365-excel-test1", group: "MOS365", groupLabel: "MOS 365", subject: "excel", subjectLabel: "Excel", title: "Giải đề MOS-EXCEL-365-TEST1", r2Prefix: "MOS365/EXCEL365-TEST1" },
    { id: "mos365-excel-test2", group: "MOS365", groupLabel: "MOS 365", subject: "excel", subjectLabel: "Excel", title: "Giải đề MOS-EXCEL-365-TEST2", r2Prefix: "MOS365/EXCEL365-TEST2" },
    { id: "mos365-ppt-test1", group: "MOS365", groupLabel: "MOS 365", subject: "ppt", subjectLabel: "PowerPoint", title: "Giải đề MOS-PPT-365-TEST1", r2Prefix: "MOS365/PPT365-TEST1" },
    { id: "mos365-ppt-test2", group: "MOS365", groupLabel: "MOS 365", subject: "ppt", subjectLabel: "PowerPoint", title: "Giải đề MOS-PPT-365-TEST2", r2Prefix: "MOS365/PPT365-TEST2" }
];

const VIDEO_BY_ID = Object.fromEntries(VIDEO_CATALOG.map(v => [v.id, v]));
// Set các r2Prefix hợp lệ — dùng để double-check khi giải mã token (phòng token
// bị chế lại prefix khác không có trong danh mục).
const VALID_PREFIXES = new Set(VIDEO_CATALOG.map(v => v.r2Prefix));

// Chỉ cho phép tên file khớp đúng mẫu HLS output — chặn path traversal
// (vd "../../secret") hay truy cập file khác ngoài m3u8/ts.
const FILENAME_RE = /^output(\d+)?\.(m3u8|ts)$/;

// ───────────────────────── Base64URL + HMAC (Web Crypto) ─────────────────

function b64urlEncode(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) str += "=";
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
}

function bufToHex(buf) {
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function hmacSignHex(data, secret) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(data));
    return bufToHex(sigBuf);
}

function timingSafeEqualStr(a, b) {
    if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

async function makeSignedToken(payloadObj, secret) {
    const payloadB64 = b64urlEncode(JSON.stringify(payloadObj));
    const sig = await hmacSignHex(payloadB64, secret);
    return payloadB64 + "." + sig;
}

async function verifySignedToken(token, secret) {
    if (!token || typeof token !== "string") return null;
    const dotIdx = token.indexOf(".");
    if (dotIdx < 0) return null;
    const payloadB64 = token.slice(0, dotIdx);
    const sig = token.slice(dotIdx + 1);
    const expectedSig = await hmacSignHex(payloadB64, secret);
    if (!timingSafeEqualStr(sig, expectedSig)) return null;
    try {
        return JSON.parse(b64urlDecode(payloadB64));
    } catch (e) {
        return null;
    }
}

// ───────────────────────── Chuẩn hoá tên / SĐT ─────────────────────────

function normalizeName(raw) {
    return (raw || "").toString().trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizePhone(raw) {
    let p = (raw || "").toString().replace(/\D/g, "");
    if (p.startsWith("84") && p.length > 9) p = "0" + p.slice(2);
    if (p.length === 9 && !p.startsWith("0")) p = "0" + p;
    return p;
}

// ───────────────────────── Tra cứu học viên trong danh sách DSVIP ─────────
// TRƯỚC: quét toàn bộ "pwd_index:*" trong KV (danh mục học viên ĐÃ ĐƯỢC
// CẤP MẬT KHẨU PHẦN MỀM MOS) — sai đối tượng, vì có mật khẩu MOS không
// đồng nghĩa được xem thư viện video.
// NAY: gọi sang Apps Script (tab "DSVIP" trong Sheet đăng ký), khớp CẢ Họ
// và tên VÀ SĐT đã chuẩn hoá — đúng danh sách trung tâm chủ động cấp
// quyền xem thư viện, không liên quan license phần mềm MOS.
async function findLicensedStudent(env, inputName, inputPhone) {
    const normName = normalizeName(inputName);
    const normPhone = normalizePhone(inputPhone);
    if (!normName || !normPhone) return null;

    try {
        const url = `${VIP_CHECK_URL}?action=vipCheck&phone=${encodeURIComponent(normPhone)}&name=${encodeURIComponent(inputName.trim())}`;
        const resp = await fetch(url);
        if (!resp.ok) return null;
        const data = await resp.json();
        if (data && data.ok && data.matched) {
            return { studentName: data.hoTen || inputName.trim(), phone: normPhone };
        }
        return null;
    } catch (e) {
        return null;
    }
}

// ───────────────────────── Cookie helpers ─────────────────────────

function getCookie(request, name) {
    const header = request.headers.get("Cookie") || "";
    const parts = header.split(";");
    for (const part of parts) {
        const idx = part.indexOf("=");
        if (idx < 0) continue;
        const k = part.slice(0, idx).trim();
        if (k === name) return decodeURIComponent(part.slice(idx + 1).trim());
    }
    return null;
}

async function getValidSession(request, env) {
    const raw = getCookie(request, SESSION_COOKIE_NAME);
    if (!raw) return null;
    const payload = await verifySignedToken(raw, VIDEO_SECRET);
    if (!payload || typeof payload.e !== "number" || Date.now() > payload.e) return null;
    return payload; // { n: studentName, ph: normalizedPhone, e: expiry }
}

function json(data, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extraHeaders }
    });
}

function buildSessionCookie(token, maxAgeSec) {
    return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAgeSec}; HttpOnly; Secure; SameSite=Lax`;
}

function clearSessionCookie() {
    return `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

// ───────────────────────── API Handler (login / logout / me / catalog / stream-token) ─

export async function handleVideoLibraryAPI(path, request, env) {
    // POST /api/video-library/login — body: { name, password } (password = SĐT)
    if (path === "/api/video-library/login" && request.method === "POST") {
        try {
            const body = await request.json();
            const name = (body.name || "").toString().trim();
            const password = (body.password || "").toString().trim();
            if (!name || !password) {
                return json({ success: false, msg: "Vui lòng nhập đầy đủ Họ tên và mật khẩu" });
            }

            const info = await findLicensedStudent(env, name, password);
            if (!info) {
                return json({ success: false, msg: "Sai thông tin đăng nhập. Vui lòng kiểm tra lại Họ tên và mật khẩu." }, 401);
            }

            const payload = {
                n: info.studentName || name,
                ph: normalizePhone(password),
                e: Date.now() + SESSION_TTL_MS
            };
            const token = await makeSignedToken(payload, VIDEO_SECRET);

            return json(
                { success: true, name: payload.n },
                200,
                { "Set-Cookie": buildSessionCookie(token, Math.floor(SESSION_TTL_MS / 1000)) }
            );
        } catch (e) {
            return json({ success: false, msg: e.message || "Có lỗi xảy ra, vui lòng thử lại" });
        }
    }

    // POST /api/video-library/logout
    if (path === "/api/video-library/logout" && request.method === "POST") {
        return json({ success: true }, 200, { "Set-Cookie": clearSessionCookie() });
    }

    // GET /api/video-library/me — kiểm tra trạng thái đăng nhập hiện tại
    if (path === "/api/video-library/me" && request.method === "GET") {
        const session = await getValidSession(request, env);
        return json({ success: true, loggedIn: !!session, name: session ? session.n : null });
    }

    // GET /api/video-library/catalog — danh mục video (công khai, chỉ tên/tiêu đề,
    // KHÔNG chứa URL thật)
    if (path === "/api/video-library/catalog" && request.method === "GET") {
        const catalog = VIDEO_CATALOG.map(v => ({
            id: v.id, group: v.group, groupLabel: v.groupLabel,
            subject: v.subject, subjectLabel: v.subjectLabel, title: v.title
        }));
        return json({ success: true, catalog });
    }

    // POST /api/video-library/stream-token — body: { id }. Bắt buộc đã đăng nhập.
    // Trả về đường dẫn m3u8 có gắn token ngắn hạn.
    if (path === "/api/video-library/stream-token" && request.method === "POST") {
        const session = await getValidSession(request, env);
        if (!session) {
            return json({ success: false, msg: "Bạn cần đăng nhập để xem video này", needLogin: true }, 401);
        }
        try {
            const body = await request.json();
            const videoId = (body.id || "").toString();
            const video = VIDEO_BY_ID[videoId];
            if (!video) return json({ success: false, msg: "Không tìm thấy video" }, 404);

            const tokenPayload = { p: video.r2Prefix, e: Date.now() + STREAM_TTL_MS };
            const token = await makeSignedToken(tokenPayload, VIDEO_SECRET);

            return json({
                success: true,
                url: `/api/video-library/hls/${token}/output.m3u8`,
                expiresInSec: Math.floor(STREAM_TTL_MS / 1000)
            });
        } catch (e) {
            return json({ success: false, msg: e.message || "Có lỗi xảy ra" });
        }
    }

    return json({ success: false, msg: "Video Library API not found" }, 404);
}

// ───────────────────────── HLS Streaming Proxy (R2) ─────────────────────
// GET /api/video-library/hls/{token}/{filename}
// filename: output.m3u8 | output0.ts | output1.ts | ...
export async function handleVideoStream(path, request, env) {
    const parts = path.split("/").filter(Boolean); // ["api","video-library","hls",token,filename]
    if (parts.length !== 5) return new Response("Not found", { status: 404 });
    const token = parts[3];
    const filename = parts[4];

    if (!FILENAME_RE.test(filename)) {
        return new Response("Invalid file", { status: 400 });
    }

    const payload = await verifySignedToken(token, VIDEO_SECRET);
    if (!payload || typeof payload.e !== "number" || typeof payload.p !== "string") {
        return new Response("Link không hợp lệ", { status: 403 });
    }
    if (!VALID_PREFIXES.has(payload.p)) {
        return new Response("Không tìm thấy nội dung", { status: 404 });
    }

    // Token còn hạn (vài phút kể từ lúc cấp) → cho qua ngay, không cần tra cookie.
    // Token đã hết hạn → CHỈ cho qua nếu request này vẫn mang theo cookie phiên
    // đăng nhập hợp lệ (tức vẫn là chính trình duyệt đã đăng nhập, không phải
    // link bị copy sang máy/trình duyệt khác). Nhờ vậy:
    //   - Người đang xem hợp lệ: xem liên tục không bị giật/gián đoạn dù video
    //     dài bao lâu, vì cookie luôn được trình duyệt tự động gửi kèm.
    //   - Link bị copy gửi người khác: người đó không có cookie này → sau khi
    //     token hết hạn (vài phút) sẽ bị chặn ngay, đúng yêu cầu chống chia sẻ.
    if (Date.now() > payload.e) {
        const session = await getValidSession(request, env);
        if (!session) {
            return new Response("Link đã hết hạn. Vui lòng tải lại trang để xem tiếp.", { status: 403 });
        }
    }

    const r2Key = `${payload.p}/${filename}`;

    // Trước đây header quảng cáo "Accept-Ranges: bytes" nhưng luôn trả về
    // TOÀN BỘ file (status 200), bỏ qua header Range trình duyệt gửi lên.
    // hls.js (desktop/Android Chrome) thường vẫn "bỏ qua" được, nhưng HLS
    // gốc trên Safari/iOS rất khắt khe với việc này → gây phát 1 đoạn rồi
    // dừng, hoặc bị coi là live (không tua được). Nay parse Range thật và
    // trả 206 Partial Content đúng chuẩn khi có yêu cầu.
    const rangeHeader = request.headers.get("Range") || request.headers.get("range");
    let r2Range;
    let requestedRange = null;
    if (rangeHeader) {
        const m = /^bytes=(\d+)-(\d*)$/.exec(rangeHeader.trim());
        if (m) {
            const start = parseInt(m[1], 10);
            const end = m[2] ? parseInt(m[2], 10) : undefined;
            r2Range = end !== undefined ? { offset: start, length: end - start + 1 } : { offset: start };
            requestedRange = { start, end };
        }
    }

    const object = r2Range
        ? await env.MOS360_VIDEOS_R2.get(r2Key, { range: r2Range })
        : await env.MOS360_VIDEOS_R2.get(r2Key);
    if (!object) return new Response("Không tìm thấy file", { status: 404 });

    const isPlaylist = filename.endsWith(".m3u8");
    const headers = new Headers();
    headers.set("Content-Type", isPlaylist ? "application/vnd.apple.mpegurl" : "video/mp2t");
    headers.set("Cache-Control", "no-store");
    headers.set("Accept-Ranges", "bytes");
    if (object.httpEtag) headers.set("ETag", object.httpEtag);

    const totalSize = object.size; // R2Object.size = kích thước TOÀN BỘ file (kể cả khi get theo range)

    if (object.range) {
        // R2 đã trả đúng đoạn được yêu cầu — object.range = {offset, length}
        const start = object.range.offset;
        const length = object.range.length;
        const end = start + length - 1;
        headers.set("Content-Range", `bytes ${start}-${end}/${totalSize}`);
        headers.set("Content-Length", String(length));
        return new Response(object.body, { status: 206, headers });
    }

    headers.set("Content-Length", String(totalSize));
    return new Response(object.body, { status: 200, headers });
}