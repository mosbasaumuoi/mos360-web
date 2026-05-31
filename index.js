/* =========================
   MOS360 V2026
   BASELINE CONTRACT LOCKED
   ========================= */

import IC3_LEVEL1 from "./questions/ic3-level1.js";
import IC3_LEVEL2 from "./questions/ic3-level2.js";
import IC3_LEVEL3 from "./questions/ic3-level3.js";
import GENERATIVE_AI from "./questions/generative-ai.js";

const CONFIG = {
    TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
    LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
    SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv",
    SHEET_EDIT_URL: "https://docs.google.com/spreadsheets/d/17spoqBAGtinFHQSTGbaDMapFH4nWGS0RHGGhCB5WzqI/edit?gid=0#gid=0",
    STUDENT_SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjb4deEYb7i_AMpimoccuyElyPF01QfQGEue2nQNrlRjU4xZlz3tH1qJt3jPUN8gqRHiHJQqWJBo9E/pub?output=tsv",

    SOCIALS: {
        ZALO: "https://zalo.me/0912888360",
        FACEBOOK: "https://facebook.com/mos360.vn",
        MESSENGER: "https://m.me/mos360.vn",
        YOUTUBE: "https://youtube.com/@mos360_vn",
        TIKTOK: "https://tiktok.com/@mos360.vn"
    },

    ADMIN: {
        USER: "admin@mos360",
        PASS: "Mos360"
    }
};

/* ========================
   QUESTION BANK V2
   ========================= */

const COURSE_MAP = {
    "IC3 GS6": [
        ...IC3_LEVEL1,
        ...IC3_LEVEL2,
        ...IC3_LEVEL3
    ],

    "GENERATIVE AI": [
        ...GENERATIVE_AI
    ]
};

/* =========================
   EXAM CONTRACT V21
   ========================= */

const EXAM_CONFIG = {
    QUESTION_COUNT: 45,
    EXAM_DURATION: 50,
    PASS_SCORE: 700,
    MAX_SCORE: 1000,

    TRIAL_DURATION: 10
};

const DEVICE_CONFIG = {
    MAX_DEVICES: 3
};

const IMAGE_BASE_URL = "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/images/";
const IMAGE_MAP = {
    // IC3 LEVEL 1
    "ic3_lv1_q05":  "ic3-level1/ic3_lv1_q05_hardware.svg",
    "ic3_lv1_q12":  "ic3-level1/ic3_lv1_q12_operating_system.svg",
    "ic3_lv1_q18":  "ic3-level1/ic3_lv1_q18_hardware.svg",
    "ic3_lv1_q25":  "ic3-level1/ic3_lv1_q25_software.svg",
    "ic3_lv1_q33":  "ic3-level1/ic3_lv1_q33_network.svg",
    "ic3_lv1_q45":  "ic3-level1/ic3_lv1_q45_security.svg",
    "ic3_lv1_q52":  "ic3-level1/ic3_lv1_q52_data.svg",
    "ic3_lv1_q60":  "ic3-level1/ic3_lv1_q60_digital_citizenship.svg",
    "ic3_lv1_q68":  "ic3-level1/ic3_lv1_q68_software.svg",
    "ic3_lv1_q77":  "ic3-level1/ic3_lv1_q77_security.svg",
    // IC3 LEVEL 2
    "ic3_lv2_q08":  "ic3-level2/ic3_lv2_q08_hardware.svg",
    "ic3_lv2_q15":  "ic3-level2/ic3_lv2_q15_software.svg",
    "ic3_lv2_q24":  "ic3-level2/ic3_lv2_q24_network.svg",
    "ic3_lv2_q31":  "ic3-level2/ic3_lv2_q31_security.svg",
    "ic3_lv2_q42":  "ic3-level2/ic3_lv2_q42_data.svg",
    "ic3_lv2_q53":  "ic3-level2/ic3_lv2_q53_software.svg",
    "ic3_lv2_q61":  "ic3-level2/ic3_lv2_q61_security.svg",
    "ic3_lv2_q69":  "ic3-level2/ic3_lv2_q69_hardware.svg",
    "ic3_lv2_q74":  "ic3-level2/ic3_lv2_q74_network.svg",
    "ic3_lv2_q80":  "ic3-level2/ic3_lv2_q80_data.svg",
    // IC3 LEVEL 3
    "ic3_lv3_q35":  "ic3-level3/ic3_lv3_q35_iot.svg",
    "ic3_lv3_q41":  "ic3-level3/ic3_lv3_q41_network.svg",
    "ic3_lv3_q43":  "ic3-level3/ic3_lv3_q43_network.svg",
    "ic3_lv3_q46":  "ic3-level3/ic3_lv3_q46_cloud.svg",
    "ic3_lv3_q48":  "ic3-level3/ic3_lv3_q48_cloud.svg",
    "ic3_lv3_q52":  "ic3-level3/ic3_lv3_q52_security.svg",
    "ic3_lv3_q59":  "ic3-level3/ic3_lv3_q59_network.svg",
    "ic3_lv3_q66":  "ic3-level3/ic3_lv3_q66_security.svg",
    "ic3_lv3_q75":  "ic3-level3/ic3_lv3_q75_tech.svg",
    "ic3_lv3_q82":  "ic3-level3/ic3_lv3_q82_ai.svg",
};

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // ===== FIX 3: API xác thực – chuẩn hóa SĐT và tên khóa trước khi so khớp =====
        if (path === "/api/verify-code") {
    const rawPhone = url.searchParams.get("phone") || "";
    const rawCourse = url.searchParams.get("course") || "";
    const deviceId = url.searchParams.get("deviceId") || "";

    function normalizePhone(raw) {
        let p = raw.trim();
        if (p.startsWith("+84")) p = "0" + p.slice(3);
        else if (p.startsWith("84") && p.length >= 11) p = "0" + p.slice(2);
        return p;
    }

    const phone = normalizePhone(rawPhone);
    const course = rawCourse.replace(/\s+/g, " ").trim().toLowerCase();

    if (!phone || !course || !deviceId) {
        return new Response(JSON.stringify({ success: false, msg: "Thiếu thông tin tra cứu!" }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        // 1. Xác thực học viên từ sheet
        const resp = await fetch(CONFIG.STUDENT_SHEET_URL + "&v=" + Date.now());
        const tsv = await resp.text();
        const rows = tsv.split("\n");
        const courseIdx = 0, phoneIdx = 1, expireIdx = 3;

        let isValid = false;
        let reason = "Không tìm thấy thông tin đăng ký. Vui lòng kiểm tra lại SĐT và khóa học!";
        let expireStr = "";

        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split("\t");
            if (cols.length < 3) continue;

            const sheetPhone = normalizePhone((cols[phoneIdx] || "").trim());
            const sheetCourse = (cols[courseIdx] || "").replace(/\s+/g, " ").trim().toLowerCase();
            expireStr = (cols[expireIdx] || "").trim();

            if (sheetPhone === phone && (sheetCourse === course || sheetCourse.includes(course) || course.includes(sheetCourse))) {
                if (expireStr) {
                    const parts = expireStr.includes("/") ? expireStr.split("/") : expireStr.split("-");
                    let year = parseInt(parts[2]); if (year < 100) year += 2000;
                    const expireDate = expireStr.includes("/")
                        ? new Date(year, parseInt(parts[1]) - 1, parseInt(parts[0]), 23, 59, 59)
                        : new Date(year, parseInt(parts[1]) - 1, parseInt(parts[2]), 23, 59, 59);
                    if (new Date() > expireDate) {
                        reason = "Tài khoản đã hết hạn. Vui lòng liên hệ MOS360 để gia hạn!";
                        break;
                    }
                }
                isValid = true;
                break;
            }
        }

        if (!isValid) {
            return new Response(JSON.stringify({ success: false, msg: reason }), {
                headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
            });
        }

        // 2. Kiểm tra giới hạn thiết bị qua KV
        const kvKey = phone + "_" + course.replace(/\s+/g, "_");
        const stored = await env.MOS360_USERS_KV.get(kvKey);
        let devices = stored ? JSON.parse(stored) : [];

        if (devices.includes(deviceId)) {
            // Thiết bị đã đăng ký trước đó → cho qua
            return new Response(JSON.stringify({ success: true, msg: "Kích hoạt thành công!" }), {
                headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
            });
        }

        if (devices.length >= DEVICE_CONFIG.MAX_DEVICES) {
            return new Response(JSON.stringify({
                success: false,
                msg: "Tài khoản này đã đăng nhập trên " + DEVICE_CONFIG.MAX_DEVICES + " thiết bị. Vui lòng liên hệ MOS360 để được hỗ trợ!"
            }), {
                headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
            });
        }

        // Thêm thiết bị mới
        devices.push(deviceId);
        await env.MOS360_USERS_KV.put(kvKey, JSON.stringify(devices));

        return new Response(JSON.stringify({ success: true, msg: "Kích hoạt thành công!", expire: expireStr }), {
            headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
        });

             } catch (err) {
                 return new Response(JSON.stringify({ success: false, msg: "Lỗi kết nối máy chủ dữ liệu!" }), {
                     headers: { "Content-Type": "application/json" }
                 });
             }
         }

        if (path === "/generative-ai") {
            return new Response(this.getQuizEnginePage("GENERATIVE AI"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/ic3-test") {
            return new Response(this.getQuizEnginePage("IC3 GS6"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }

        // ===== FIX 1: Tải ảnh Bảng Vàng – dùng SHEET_URL pub TSV (v1 logic) =====
        let studentData = "";
        try {
            const resp = await fetch(CONFIG.SHEET_URL + "&v=" + Date.now());
            const tsv = await resp.text();
            const rows = tsv.split("\n").slice(1);
            let htmlContent = "";
            rows.forEach(row => {
                const cols = row.split("\t");
                // Cột 1 (index 0) = tên khóa học / link ảnh chứng chỉ
                const link = cols[0]?.replace(/\r/g, "").trim();
                if (link && link.startsWith("http")) {
                    let finalLink = link;
                    // Chuyển đổi link Google Drive sang link trực tiếp (lh3.googleusercontent)
                    if (link.includes("drive.google.com")) {
                        const match = link.match(/[-\w]{25,}/);
                        if (match) finalLink = "https://lh3.googleusercontent.com/d/" + match[0];
                    }
                    htmlContent += `<div class="student-item"><img src="${finalLink}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`;
                }
            });
            // Nhân 3 lần để hiệu ứng cuộn không bị hết nội dung
            studentData = htmlContent
                ? htmlContent + htmlContent + htmlContent
                : "<div style='color:#64748b;padding:20px;'>Đang cập nhật bảng vàng...</div>";
        } catch (e) {
            studentData = "<div style='color:#64748b;padding:20px;'>Hệ thống đang đồng bộ dữ liệu...</div>";
        }

        let content = "";
        if (path === "/courses") content = this.getCoursesUI();
        else if (path === "/login") content = this.getLoginUI();
        else if (path === "/library") content = this.getLibraryUI();
        else content = this.getHomeUI(studentData);

        return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    },

    layout(content) {
        return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #06070d; --card: #111422; --text: #fff; --border: rgba(255,255,255,0.06); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(6,7,13,0.9); backdrop-filter: blur(12px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.3rem; }
        .brand img { height: 36px; margin-right: 10px; }
        nav { display: flex; align-items: center; }
        nav a { color: #94a3b8; text-decoration: none; font-weight: 700; margin-left: 20px; font-size: 0.85rem; transition: color 0.2s; }
        nav a:hover { color: #fff; }
        .admin-only-btn { display: none; background: rgba(255,215,0,0.1); color: #FFD700 !important; border: 1px solid #FFD700; padding: 6px 12px; border-radius: 6px; font-weight: 800; }

        .hero-banner { position: relative; width: 100%; min-height: 340px; background: linear-gradient(135deg, #090e1a 0%, #151d30 100%); overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; border-bottom: 1px solid var(--border); }
        .hero-content { position: relative; z-index: 2; max-width: 800px; }
        .hero-content h1 { font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 15px; }
        .hero-content h1 span { background: linear-gradient(to right, #FF5722, #ff8a65); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-content p { color: #94a3b8; font-size: 1rem; margin-bottom: 25px; line-height: 1.6; }

        .stats-bar { display: flex; justify-content: center; gap: 40px; padding: 25px 5%; text-align: center; background: rgba(255,255,255,0.01); border-bottom: 1px solid var(--border); }
        .stat-item h2 { color: var(--primary); font-size: 2rem; font-weight: 800; }
        .stat-item p { color: #64748b; font-size: 0.8rem; font-weight: 600; }

        .main-container { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: 360px 1fr; gap: 30px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }

        .featured-highlights-box { background: #111422; border: 1px solid var(--border); border-radius: 24px; padding: 35px 25px; box-shadow: 0 12px 40px rgba(0,0,0,0.3); position: relative; overflow: hidden; }
        .featured-highlights-box::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(to bottom, #FF5722, #ff9100); }
        .featured-main-title { font-size: 1.85rem; font-weight: 800; color: #fff; line-height: 1.25; letter-spacing: -0.5px; margin-top: 5px; }
        .featured-main-title span { color: #FF5722; display: block; font-size: 2.15rem; margin-top: 5px; text-shadow: 0 0 15px rgba(255,87,34,0.2); }
        .highlight-list { list-style: none; margin: 30px 0; display: flex; flex-direction: column; gap: 16px; }
        .highlight-list li { display: flex; align-items: center; gap: 12px; font-size: 1.05rem; font-weight: 700; color: #cbd5e1; }
        .highlight-list li::before { content: "✓"; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: rgba(255,87,34,0.15); color: #FF5722; border-radius: 50%; font-size: 11px; font-weight: 900; }

        /* FIX 1: Bảng Vàng - carousel cuộn mượt */
        #bang-vang-container { height: 420px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.2); border-radius: 16px; }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 60s linear infinite; width: max-content; }
        .carousel-track:hover { animation-play-state: paused; }
        .student-item { flex: 0 0 auto; width: 280px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }

        /* FIX 2: Icon Zalo SVG chuẩn thương hiệu – nền xanh tròn, chữ Z trắng sắc nét */
        .social-sticky-bar { position: fixed; right: 25px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 9999; }
        .social-sticky-item { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.4); text-decoration: none; }
        .social-sticky-item:hover { transform: scale(1.15); }
        .social-sticky-item svg { width: 48px; height: 48px; }
        .s-zalo { box-shadow: 0 4px 14px rgba(0,104,255,0.5); }
        .s-zalo svg {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              overflow: hidden;
          }
        .s-fb { background: #1877F2; box-shadow: 0 4px 14px rgba(24,119,242,0.4); }
        .s-fb svg, .s-mess svg, .s-yt svg, .s-tt svg { width: 26px; height: 26px; fill: white; }
        .s-mess { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); box-shadow: 0 4px 14px rgba(214,36,159,0.4); }
        .s-yt { background: #FF0000; box-shadow: 0 4px 14px rgba(255,0,0,0.4); }
        .s-tt { background: #000; border: 1px solid rgba(255,255,255,0.15); }

        .course-block-title { display: flex; align-items: center; gap: 12px; margin: 40px 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid var(--border); color: #fff; }
        .course-block-title svg { width: 28px; height: 28px; fill: var(--primary); }
        .course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .price-tag { font-size: 1.3rem; font-weight: 800; color: #00f2ff; margin: 15px 0; display: flex; align-items: center; gap: 8px; }
        .price-tag span { font-size: 0.85rem; color: #64748b; text-decoration: line-through; font-weight: normal; }
        .course-btn-group { display: flex; flex-direction: column; gap: 8px; margin-top: 15px; }

        .btn-action { background: linear-gradient(135deg, #FF5722, #ff784e); color: white; border: none; padding: 12px; border-radius: 25px; font-weight: 800; cursor: pointer; width: 100%; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 12px rgba(255,87,34,0.2); transition: transform 0.15s; }
        .btn-sub { padding: 10px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #cbd5e1; cursor: pointer; text-decoration: none; text-align: center; transition: all 0.2s; }
        .btn-sub:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .btn-trial { background: rgba(0,242,255,0.08); color: #00f2ff; border: 1px solid rgba(0,242,255,0.2); }
        .btn-confirm { display:none; margin-top:12px; padding:12px 30px; background:linear-gradient(135deg,#00f2ff,#00a2ff); color:#000; border:none; border-radius:10px; font-weight:800; font-size:0.95rem; cursor:pointer; width:100%; }
        .btn-confirm.visible { display:block; }

        footer { padding: 40px 5%; background: #030408; border-top: 1px solid var(--border); margin-top: 40px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 30px; }

        @media (max-width: 768px) {
            header { padding: 12px 4%; flex-direction: column; gap: 8px; text-align: center; }
            nav { width: 100%; justify-content: center; flex-wrap: wrap; gap: 6px; }
            nav a { margin: 3px 6px; font-size: 0.78rem; }
            .hero-content h1 { font-size: 1.7rem; }
            .stats-bar { gap: 15px; flex-wrap: wrap; }
            .main-container { grid-template-columns: 1fr; gap: 20px; padding: 0 4%; }
            .footer-grid { grid-template-columns: 1fr; }
            .social-sticky-bar { position: relative; top: 0; transform: none; right: 0; flex-direction: row; justify-content: center; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 12px; margin: 10px 4%; gap: 15px; }
        }
    </style>
    </head><body>

    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
        <nav>
            <a href="/">TRANG CHỦ</a>
            <a href="/courses">KHÓA HỌC</a>
            <a href="/library">KHO MOS</a>
            <a href="${CONFIG.SHEET_EDIT_URL}" target="_blank" class="admin-only-btn" id="adminPanelBtn">[QUẢN LÝ HỌC VIÊN]</a>
            <a href="/login" id="navLoginLink" style="color:var(--primary)">ĐĂNG NHẬP</a>
        </nav>
    </header>

    <nav style="background:rgba(0,242,255,0.03); padding:12px 5%; font-size:0.8rem; border-bottom:1px solid var(--border); display:flex; gap:15px; overflow-x:auto; white-space:nowrap; -webkit-overflow-scrolling:touch;">
        <span style="color:#64748b; font-weight:bold;">🎯 Lối tắt phòng thi:</span>
        <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold;">✨ Luyện thi GENERATIVE AI</a>
        <a href="/ic3-test" style="color:#FFD700; text-decoration:none; font-weight:bold;">🌍 Luyện thi IC3 GS6 Tổng hợp</a>
    </nav>

    <!-- FIX 2: Icon Zalo SVG logo chuẩn thương hiệu chính thức -->
    <div class="social-sticky-bar" id="stickySocialBar">
        <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="social-sticky-item s-zalo" title="Zalo">
            <!-- SVG Zalo logo chính thức: nền xanh tròn bo góc, chữ Zalo trắng -->
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="12" fill="#0068FF"/>
                <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.5">Zalo</text>
            </svg>
        </a>
        <a href="${CONFIG.SOCIALS.FACEBOOK}" target="_blank" class="social-sticky-item s-fb" title="Facebook">
            <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.MESSENGER}" target="_blank" class="social-sticky-item s-mess" title="Messenger">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.36 2 2 6.13 2 11.43c0 2.99 1.45 5.63 3.73 7.37.19.15.31.38.31.62l-.07 1.94c-.02.51.52.88.96.63l2.15-1.21c.18-.1.39-.13.59-.08 1.02.28 2.1.43 3.33.43 5.64 0 10-4.13 10-9.43S17.64 2 12 2zm1.02 12.35l-2.42-2.58-4.73 2.58 5.2-5.53 2.47 2.58 4.68-2.58-5.2 5.53z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.YOUTUBE}" target="_blank" class="social-sticky-item s-yt" title="Youtube">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.503 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.TIKTOK}" target="_blank" class="social-sticky-item s-tt" title="Tiktok">
            <svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.16 8.16 0 004.77 1.52V7.09a4.85 4.85 0 01-1-.4z" fill="white"/></svg>
        </a>
    </div>

    <main id="mainWebBody">${content}</main>

    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p><p>📞 Hotline: 0912.888.360</p></div>
            <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
            <div style="height:160px; border-radius:15px; overflow:hidden;">
                <iframe src="https://maps.google.com/maps?q=Hai%20Phong&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>

    <script>
        // FIX 4: Admin đa thiết bị – KHÔNG thu hồi session cũ, chỉ thêm session mới
        function applyAdminSession() {
            var isAdmin = localStorage.getItem('mos360_admin_session') === 'active';
            if (isAdmin) {
                document.getElementById('adminPanelBtn').style.display = 'inline-block';
                var logLink = document.getElementById('navLoginLink');
                if (logLink) {
                    logLink.textContent = "ĐĂNG XUẤT ADMIN"; logLink.href = "#";
                    logLink.onclick = function(e) {
                        e.preventDefault();
                        // Chỉ xóa session trên thiết bị này, không ảnh hưởng thiết bị khác
                        localStorage.removeItem('mos360_admin_session');
                        window.location.href = "/";
                    };
                }
            }
        }
        applyAdminSession();

        function adjustLayoutMobile() {
            if (window.innerWidth <= 768) {
                var bar = document.getElementById('stickySocialBar');
                var main = document.getElementById('mainWebBody');
                if (bar && main && bar.parentNode !== main) main.appendChild(bar);
            }
        }
        window.addEventListener('resize', adjustLayoutMobile);
        window.addEventListener('DOMContentLoaded', adjustLayoutMobile);
    </script>
    </body></html>`;
    },

    getHomeUI(studentData) {
        return `
      <div class="hero-banner">
          <div class="hero-content">
              <h1>HỆ THỐNG LUYỆN THI <span>CHỨNG CHỈ QUỐC TẾ</span> CHUYÊN NGHIỆP</h1>
              <p>Học trực quan, luyện đề thực chiến bám sát kho đề thi Certiport thực tế. Cam kết chuẩn đầu ra tối ưu cho học viên và người đi làm.</p>
              <div style="max-width:240px; margin:0 auto;"><a href="/courses" class="btn-action">XEM KHÓA HỌC NGAY</a></div>
          </div>
      </div>

      <div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
          <div class="stat-item"><h2>1.200+</h2><p>Học viên nhận chứng chỉ</p></div>
          <div class="stat-item"><h2>600+</h2><p>Truy cập học trực tuyến</p></div>
      </div>

      <div class="main-container">
          <div class="featured-highlights-box">
              <div class="featured-main-title">
                  Xóa tan nỗi lo
                  <span>CHUẨN ĐẦU RA</span>
                  cho sinh viên
              </div>
              <ul class="highlight-list">
                  <li>Học thật, tiến bộ thật</li>
                  <li>Thi thật 100%</li>
                  <li>Đồng hành trọn đời</li>
              </ul>
              <div style="background:rgba(255,87,34,0.06); padding:12px; border-radius:12px; border:1px dashed rgba(255,87,34,0.3); font-size:0.8rem; line-height:1.4; color:#ffaa80; margin-bottom:20px; text-align:center; font-weight:bold;">
                  🎁 Gói combo siêu lời đăng ký 2 khóa tặng ngay 1 khóa bất kỳ!
              </div>
              <button class="btn-action" onclick="location.href=&apos;/courses&apos;">XEM KHÓA HỌC</button>
          </div>

          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 style="margin-bottom:15px; font-size:1rem; letter-spacing:0.5px;">🏆 BẢNG VÀNG CHỨNG CHỈ QUỐC TẾ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">${studentData}</div>
                  </div>
              </div>
          </div>
      </div>`;
    },

    getCoursesUI() {
        return `<div style="max-width:1200px; margin:30px auto; padding:0 15px;">
        <h2 style="color:var(--primary); text-align:center; margin-bottom:10px; font-weight:800; font-size:1.8rem;">LỘ TRÌNH LUYỆN THI CHỨNG CHỈ QUỐC TẾ</h2>
        <p style="text-align:center; color:#888; margin-bottom:30px; font-size:0.9rem;">Học và ôn thi trực tuyến tương tác cao, bám sát cấu trúc hành trình Certiport.</p>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M22 18H2V4h20v14zm-11 2h2v2h-2v-2zm-9-4h18V6H2v10z"/></svg>
            <h2>LỚP KHÓA HỌC LUYỆN THI MOS OFFICE 2019</h2>
        </div>
        <div class="course-grid">
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS WORD 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-W19" onclick="triggerRemoteVerification(&apos;MOS WORD 2019&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS EXCEL 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-E19" onclick="triggerRemoteVerification(&apos;MOS EXCEL 2019&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS PPT 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-P19" onclick="triggerRemoteVerification(&apos;MOS PPT 2019&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <h2>LỚP KHÓA HỌC LUYỆN THI MOS OFFICE 365</h2>
        </div>
        <div class="course-grid">
            <div class="section-card">
                <span style="background:rgba(0,242,255,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS WORD 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-W365" onclick="triggerRemoteVerification(&apos;MOS WORD 365&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(0,242,255,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS EXCEL 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-E365" onclick="triggerRemoteVerification(&apos;MOS EXCEL 365&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(0,242,255,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS PPT 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-P365" onclick="triggerRemoteVerification(&apos;MOS PPT 365&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>
            <h2>PHÒNG THI THỬ ĐẶC BIỆT CHUYÊN SÂU</h2>
        </div>
        <div class="course-grid">
            <div class="section-card" style="border-color:#FFD700; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255,215,0,0.1); color:#FFD700; padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">IC3 GS6</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.2rem; color:#FFD700;">Luyện thi IC3 GS6</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.5;">Phòng ôn luyện bao gồm cả chế độ luyện tập tự do và thi thử tính giờ thực tế.</p>
                    <div class="price-tag">200.000đ <span>450.000đ</span></div>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,#FFD700,#cca400); color:#000;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-IC3" onclick="triggerRemoteVerification(&apos;IC3 GS6&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess(&apos;/ic3-test&apos;,&apos;IC3 GS6&apos;)">🎯 VÀO PHÒNG ÔN LUYỆN THI THỬ</button>
                </div>
            </div>
            <div class="section-card" style="border-color:var(--cyan); display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0,242,255,0.1); color:var(--cyan); padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">AI DIGITAL</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.2rem; color:var(--cyan);">Luyện thi GENERATIVE AI</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.5;">Bộ ngân hàng 45 câu xáo trộn ngẫu nhiên đạt tiêu chuẩn từ đề thi quốc tế.</p>
                    <div class="price-tag">200.000đ <span>400.000đ</span></div>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,#00f2ff,#00a2ff); color:#000;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-AI" onclick="triggerRemoteVerification(&apos;GENERATIVE AI&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess(&apos;/generative-ai&apos;,&apos;GENERATIVE AI&apos;)">🎯 VÀO PHÒNG ÔN LUYỆN THI THỬ</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        const cList = ["MOS WORD 2019","MOS EXCEL 2019","MOS PPT 2019","MOS WORD 365","MOS EXCEL 365","MOS PPT 365","IC3 GS6","GENERATIVE AI"];
        const idMap = {
            "MOS WORD 2019":"btn-auth-W19","MOS EXCEL 2019":"btn-auth-E19","MOS PPT 2019":"btn-auth-P19",
            "MOS WORD 365":"btn-auth-W365","MOS EXCEL 365":"btn-auth-E365","MOS PPT 365":"btn-auth-P365",
            "IC3 GS6":"btn-auth-IC3","GENERATIVE AI":"btn-auth-AI"
        };
        function checkState() {
            cList.forEach(c => {
                if (localStorage.getItem('course_auth_' + c) === 'verified') {
                    var el = document.getElementById(idMap[c]);
                    if (el) { el.innerHTML = "✅ FULL QUYỀN HỌC VIÊN"; el.style.color = "#00f2ff"; }
                }
            });
        }
        // FIX 3: Chuẩn hóa SĐT phía client trước khi gửi lên API
        function normalizePhone(raw) {
             let p = raw.trim();
             if (p.startsWith("+84")) p = "0" + p.slice(3);
             else if (p.startsWith("84") && p.length >= 11) p = "0" + p.slice(2);
             return p;
         }
        function getOrCreateDeviceId() {
    var id = localStorage.getItem('mos360_device_id');
    if (!id) {
        id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem('mos360_device_id', id);
    }
    return id;
}

async function triggerRemoteVerification(courseName) {
    var rawPhone = prompt("Nhập số điện thoại đăng ký [" + courseName + "] của bạn:");
    if (!rawPhone) return;

    var phone = normalizePhone(rawPhone);
    var deviceId = getOrCreateDeviceId();

    try {
        var res = await fetch("/api/verify-code?phone=" + encodeURIComponent(phone) + "&course=" + encodeURIComponent(courseName) + "&deviceId=" + encodeURIComponent(deviceId));
        var data = await res.json();
        if (data.success) {
            alert("🎉 Xác thực thành công [" + courseName + "]! Hệ thống mở khóa toàn bộ quyền Ôn Tập & Thi Thử.");
            localStorage.setItem('course_auth_' + courseName, 'verified');
            if (data.expire) localStorage.setItem('course_expire_' + courseName, data.expire);
            checkState();
        } else {
            alert("❌ Không thành công: " + data.msg);
        }
          } catch(e) {
              alert("Lỗi kết nối hệ thống!");
          }
      }
        function startTrialAccess(targetUrl, courseName) {
            sessionStorage.setItem('mos360_active_course_context', courseName);
            window.location.href = targetUrl;
        }
        window.onload = checkState;
    </script>`;
    },

    getLoginUI() {
        return `
    <div class="section-card" style="max-width:420px; margin:60px auto; padding:35px 25px;">
        <h2 style="text-align:center; color:var(--primary); margin-bottom:5px;">ĐĂNG NHẬP ADMIN</h2>
        <p style="text-align:center; color:#64748b; font-size:0.85rem; margin-bottom:25px;">Chức năng bảo mật phân tầng dành riêng cho quản trị viên</p>
        <div style="margin-bottom:15px;">
            <label style="font-size:0.8rem; color:#94a3b8; font-weight:bold; display:block; margin-bottom:5px;">TÀI KHOẢN ADMIN</label>
            <input type="text" id="admUser" placeholder="admin@mos360" style="width:100%; padding:14px; background:#090b11; border:1px solid #282f44; color:#fff; border-radius:10px; font-weight:bold;">
        </div>
        <div style="margin-bottom:25px;">
            <label style="font-size:0.8rem; color:#94a3b8; font-weight:bold; display:block; margin-bottom:5px;">MẬT KHẨU</label>
            <input type="password" id="admPass" placeholder="••••••••" style="width:100%; padding:14px; background:#090b11; border:1px solid #282f44; color:#fff; border-radius:10px; font-weight:bold;">
        </div>
        <!-- FIX 4: Đăng nhập admin chỉ set localStorage, không thu hồi session thiết bị khác -->
        <button class="btn-action" onclick="handleAdminLoginGate()">XÁC THỰC QUYỀN TRUY CẬP</button>
    </div>
    <script>
        function handleAdminLoginGate() {
            var u = document.getElementById('admUser').value.trim();
            var p = document.getElementById('admPass').value.trim();
            if (u === "admin@mos360" && p === "Mos360") {
                // FIX 4: localStorage là per-device – mỗi thiết bị lưu riêng, không xung đột
                localStorage.setItem('mos360_admin_session', 'active');
                alert("Đăng nhập Admin thành công! Nút [QUẢN LÝ HỌC VIÊN] đã được mở trên thiết bị này.");
                window.location.href = "/";
            } else { alert("Tài khoản hoặc mật khẩu quản lý không đúng!"); }
        }
    </script>`;
    },

    getLibraryUI() {
        return `<div class="section-card" style="max-width:800px; margin:50px auto; text-align:center;"><h2>📚 Kho Thư Viện Đề Thi MOS & IC3</h2><p style="color:#64748b; margin-top:15px;">Dữ liệu tài nguyên thư viện đang đồng bộ...</p></div>`;
    },

    // FIX 5: Phòng ôn luyện với phản hồi đúng/sai ngay lập tức + hộp giải thích
    getQuizEnginePage(courseType) {
        /* =========================
       QUESTION BANK V2
       ========================= */

        const questionBank =
            COURSE_MAP[courseType] || [];

        if (!questionBank.length) {

            return `
  <!DOCTYPE html>
  <html>
  <body style="
      background:#08090e;
      color:white;
      font-family:sans-serif;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      text-align:center;
  ">
      <div>
          <h2>⚠ Không tìm thấy Question Bank</h2>
          <p>${courseType}</p>
          <a href="/courses">Quay lại</a>
      </div>
  </body>
  </html>
  `;
        }

       const hasLevels = courseType === "IC3 GS6";
       const levelBoxStyle = hasLevels ? "" : "display:none;";
       const modeBoxStyle = hasLevels ? "display:none;" : "";
       
       const bankJSON = JSON.stringify(
            questionBank.map(item => ({
                q: item.question,
                o: item.options || [],
                o_left: item.left || [],
                o_right: item.right || [],
                c: item.answer,
                e: item.explanation || "",
                t: item.type || "single",
                lv: item.level || "",
                img: item.image_key && IMAGE_MAP[item.image_key] ? IMAGE_BASE_URL + IMAGE_MAP[item.image_key] : ""
            }))
        );

        return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Phòng Luyện Thi: ${courseType}</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', -apple-system, sans-serif; }
        body { background: #08090e; color: #e2e8f0; padding: 15px; }
        .container { max-width: 1200px; margin: 0 auto; background: #121522; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); overflow: hidden; }
        header { background: #171b2a; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .timer-box { border: 2px solid #00f2ff; padding: 6px 14px; border-radius: 8px; font-size: 16px; font-weight: 800; color: #00f2ff; }

        .mode-selection-overlay { position: absolute; inset: 0; background: #0c0e17; z-index: 999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; border-radius: 12px; }
        .mode-btn { width: 100%; max-width: 380px; padding: 16px; margin: 8px 0; border: 2px solid #282f44; background: #161927; color: white; border-radius: 12px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; text-align: left; }
        .mode-btn:hover { border-color: #00f2ff; background: rgba(0,242,255,0.04); }
        .lock-badge { font-size: 0.75rem; display: block; margin-top: 4px; font-weight: normal; }

        .quiz-layout { display: grid; grid-template-columns: 1fr 280px; gap: 20px; padding: 20px; }
        .main-quiz { background: #161927; padding: 20px; border-radius: 12px; min-height: 440px; display: flex; flex-direction: column; position: relative; }

        .question-box { font-size: 1.05rem; font-weight: 700; line-height: 1.5; margin-bottom: 20px; color: #fff; }
        .option { display: flex; align-items: flex-start; padding: 14px 16px; background: #1e2235; border: 2px solid #29304a; border-radius: 10px; cursor: pointer; margin-bottom: 10px; font-size: 0.95rem; font-weight: 600; transition: all 0.15s; gap: 10px; }
        .option.selected { border-color: #00f2ff; background: rgba(0,242,255,0.04); color: #00f2ff; }
        /* FIX 5: Màu phản hồi đúng/sai ngay lập tức cho chế độ ôn luyện */
        .option.correct-ans { border-color: #22c55e !important; background: rgba(34,197,94,0.12) !important; color: #22c55e !important; }
        .option.wrong-ans { border-color: #ef4444 !important; background: rgba(239,68,68,0.1) !important; color: #ef4444 !important; }
        .option.show-correct { border-color: #22c55e !important; background: rgba(34,197,94,0.06) !important; color: #86efac !important; }
        /* FIX 5: Hộp giải thích trượt xuống */
        .explanation-box { background: rgba(0,242,255,0.06); border: 1px solid rgba(0,242,255,0.2); border-radius: 10px; padding: 14px 16px; margin-top: 12px; font-size: 0.88rem; line-height: 1.6; color: #94a3b8; display: none; animation: slideDown 0.25s ease; }
        .explanation-box.visible { display: block; }
        .explanation-box strong { color: #00f2ff; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

        .right-sidebar { background: #161927; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; overflow-y: auto; max-height: 350px; }
        .nav-item { height: 36px; background: #1e2235; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border-radius: 6px; cursor: pointer; color: #94a3b8; }
        .nav-item.current { border: 1px solid #00f2ff; color: #00f2ff; background: rgba(0,242,255,0.05); }
        .nav-item.answered { background: #384260; color: #fff; }
        .nav-item.correct-nav { background: #166534; color: #86efac; }
        .nav-item.wrong-nav { background: #7f1d1d; color: #fca5a5; }

        .control-btns { display: flex; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 20px; }
        .btn-ctrl { padding: 12px 18px; background: #23293f; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.85rem; }
        .btn-submit { background: #16a34a; font-weight: 800; }

        .result-overlay { position: absolute; inset: 0; background: #0c0e17; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; z-index: 1000; display: none; border-radius: 12px; }

        /* ===== NÚT XÁC NHẬN ĐÁP ÁN - Thiết kế lại ===== */
        .btn-confirm-wrap { display:none; margin-top:14px; }
        .btn-confirm-wrap.visible { display:flex; justify-content:center; }
        .btn-confirm {
            padding: 11px 36px;
            background: linear-gradient(135deg, #00f2ff, #00a2ff);
            color: #000;
            border: none;
            border-radius: 25px;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
            letter-spacing: 0.3px;
            box-shadow: 0 4px 15px rgba(0,242,255,0.3);
            transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-confirm:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,242,255,0.4); }

        /* ===== ẢNH MINH HỌA ===== */
        .question-image-wrap { width:100%; max-height:200px; border-radius:12px; overflow:hidden; margin-bottom:14px; display:none; justify-content:center; }
        .question-image-wrap img { max-width:100%; max-height:200px; object-fit:contain; border-radius:12px; }

        /* ===== MATCHING ===== */
        .matching-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px; }
        .matching-left-item { background:#1e2235; border:2px solid #29304a; border-radius:8px; padding:11px 13px; font-size:0.86rem; font-weight:600; color:#e2e8f0; display:flex; align-items:center; gap:8px; min-height:48px; }
        .matching-dot { width:6px; height:6px; border-radius:50%; background:#00f2ff; flex-shrink:0; }
        .drop-zone { background:#161927; border:2px dashed #384260; border-radius:8px; padding:11px 13px; font-size:0.86rem; font-weight:600; color:#64748b; min-height:48px; display:flex; align-items:center; justify-content:center; transition:all 0.15s; cursor:pointer; }
        .drop-zone.drag-over { border-color:#00f2ff; background:rgba(0,242,255,0.05); }
        .drop-zone.filled { border-style:solid; border-color:#00f2ff; background:rgba(0,242,255,0.04); color:#e2e8f0; justify-content:flex-start; }
        .drop-zone.correct-match { border-color:#22c55e !important; background:rgba(34,197,94,0.12) !important; color:#22c55e !important; }
        .drop-zone.wrong-match { border-color:#ef4444 !important; background:rgba(239,68,68,0.1) !important; color:#ef4444 !important; }
        .answer-bank { display:flex; flex-wrap:wrap; gap:8px; margin-top:4px; }
        .bank-item { background:#23293f; border:2px solid #384260; border-radius:8px; padding:9px 13px; font-size:0.84rem; font-weight:600; color:#e2e8f0; cursor:grab; user-select:none; transition:all 0.15s; }
        .bank-item:hover { border-color:#00f2ff; }
        .bank-item.dragging { opacity:0.4; }
        .matching-col-label { font-size:11px; color:#94a3b8; font-weight:800; margin-bottom:7px; letter-spacing:0.5px; }

        /* ===== DRAGDROP (fill-in-blank) ===== */
        .sentence-box { background:#161927; border:1px solid #29304a; border-radius:10px; padding:16px; font-size:1rem; font-weight:600; color:#e2e8f0; line-height:2.6; margin-bottom:12px; }
        .inline-drop { display:inline-flex; align-items:center; justify-content:center; min-width:110px; height:32px; background:#1e2235; border:2px dashed #384260; border-radius:6px; padding:0 10px; margin:0 5px; color:#64748b; font-size:0.84rem; vertical-align:middle; cursor:pointer; transition:all 0.15s; }
        .inline-drop.drag-over { border-color:#00f2ff; background:rgba(0,242,255,0.08); }
        .inline-drop.filled { border-style:solid; border-color:#00f2ff; background:rgba(0,242,255,0.06); color:#00f2ff; }
        .inline-drop.correct-fill { border-color:#22c55e !important; background:rgba(34,197,94,0.12) !important; color:#22c55e !important; }
        .inline-drop.wrong-fill { border-color:#ef4444 !important; background:rgba(239,68,68,0.1) !important; color:#ef4444 !important; }

        /* ===== SORT ORDER ===== */
        .sort-list { display:flex; flex-direction:column; gap:8px; margin-bottom:12px; }
        .sort-item { background:#1e2235; border:2px solid #29304a; border-radius:8px; padding:12px 15px; font-size:0.9rem; font-weight:600; color:#e2e8f0; display:flex; align-items:center; gap:12px; cursor:grab; user-select:none; transition:border-color 0.15s; }
        .sort-item:hover { border-color:#384260; }
        .sort-item.drag-over-sort { border-color:#00f2ff; background:rgba(0,242,255,0.04); }
        .sort-item.correct-sort { border-color:#22c55e !important; background:rgba(34,197,94,0.08) !important; }
        .sort-item.wrong-sort { border-color:#ef4444 !important; background:rgba(239,68,68,0.06) !important; }
        .sort-handle { color:#384260; font-size:1.1rem; flex-shrink:0; }
        .sort-num { background:#23293f; color:#00f2ff; font-weight:800; font-size:0.75rem; padding:3px 8px; border-radius:4px; min-width:24px; text-align:center; flex-shrink:0; }

        /* ===== IMAGE SELECT ===== */
        .img-select-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
        .img-opt { background:#161927; border:2px solid #29304a; border-radius:10px; padding:12px; cursor:pointer; transition:all 0.15s; text-align:center; }
        .img-opt:hover { border-color:#384260; }
        .img-opt.selected { border-color:#00f2ff; background:rgba(0,242,255,0.05); }
        .img-opt.correct-img { border-color:#22c55e !important; background:rgba(34,197,94,0.1) !important; }
        .img-opt.wrong-img { border-color:#ef4444 !important; background:rgba(239,68,68,0.08) !important; }
        .img-opt img { width:100%; aspect-ratio:4/3; object-fit:contain; border-radius:6px; margin-bottom:7px; background:#1e2235; }
        .img-opt-label { font-size:0.8rem; font-weight:700; color:#94a3b8; }

        /* ===== ÔN CÂU SAI - Banner ===== */
        .retry-banner { background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); border-radius:10px; padding:10px 16px; margin-bottom:14px; font-size:0.85rem; font-weight:700; color:#fca5a5; display:none; }
        .retry-banner.visible { display:block; }

        /* ===== THÔNG BÁO HẾT HẠN ===== */
        .expire-banner { background:rgba(255,87,34,0.1); border:1px solid rgba(255,87,34,0.3); border-radius:12px; padding:12px 16px; margin:10px 20px; font-size:0.85rem; font-weight:700; color:#ffaa80; display:none; align-items:center; gap:10px; }
        .expire-banner.visible { display:flex; }

        /* ===== MOBILE TOUCH cho drag-drop ===== */
        @media (max-width: 768px) {
            .matching-grid { grid-template-columns:1fr; }
            .img-select-grid { grid-template-columns:1fr 1fr; gap:8px; }
            .bank-item { padding:8px 12px; font-size:0.82rem; }
            .sort-item { padding:10px 12px; font-size:0.86rem; }
        }

        @media (max-width: 768px) {
            header { flex-direction: column; gap: 8px; text-align: center; padding: 12px; }
            .quiz-layout { grid-template-columns: 1fr; gap: 15px; padding: 10px; }
            .right-sidebar { order: 2; }
            .nav-grid { grid-template-columns: repeat(9, 1fr); max-height: none; }
            .control-btns { flex-wrap: wrap; }
            .btn-ctrl { flex: 1 1 40%; text-align: center; }
            .btn-submit { flex: 1 1 100%; order: -1; }
        }
    </style></head><body>
    <div class="container">
        <header>
            <div>
                <h3 style="color:#fff;">🎯 Phòng Ôn Luyện & Sát Hạch: ${courseType}</h3>
                <p style="color:#64748b; font-size:0.75rem; margin-top:2px;">Tiêu chuẩn đạt: ${EXAM_CONFIG.PASS_SCORE} / ${EXAM_CONFIG.MAX_SCORE} điểm | ${EXAM_CONFIG.QUESTION_COUNT} Câu hỏi
                </p>
            </div>
            <div class="timer-box" id="timerContainer">⏱️ <span id="clock">00:00</span></div>
        </header>
        <div class="expire-banner" id="expireBanner">
            ⚠️ <span id="expireMsg"></span>
            <a href="https://zalo.me/0912888360" target="_blank" style="color:#FF5722; margin-left:8px; font-weight:800; text-decoration:none;">Gia hạn ngay →</a>
        </div>
        <div class="quiz-layout">
            <div class="main-quiz">

                <!-- Bước 1: Chọn Level (chỉ IC3 GS6) -->
               <div class="mode-selection-overlay" id="levelSelectBox" style="${levelBoxStyle}">
                   <h2 style="color:#fff; margin-bottom:6px;">CHỌN CẤP ĐỘ ÔN LUYỆN</h2>
                   <p style="font-size:0.85rem; margin-bottom:20px; color:#94a3b8;">IC3 GS6 gồm 3 cấp độ từ cơ bản đến nâng cao</p>
                   <button class="mode-btn" onclick="selectLevel(&apos;ALL&apos;)">
                       🌐 Tất cả các cấp độ
                       <span class="lock-badge" style="color:#94a3b8;">Trộn ngẫu nhiên từ Level 1 + 2 + 3</span>
                   </button>
                   <button class="mode-btn" onclick="selectLevel(&apos;IC3_LEVEL1&apos;)">
                       🟢 Level 1 – Cơ bản
                       <span class="lock-badge" style="color:#94a3b8;">Kiến thức nền tảng máy tính & mạng</span>
                   </button>
                   <button class="mode-btn" onclick="selectLevel(&apos;IC3_LEVEL2&apos;)">
                       🟡 Level 2 – Trung cấp
                       <span class="lock-badge" style="color:#94a3b8;">Ứng dụng văn phòng & internet</span>
                   </button>
                   <button class="mode-btn" onclick="selectLevel(&apos;IC3_LEVEL3&apos;)">
                       🔴 Level 3 – Nâng cao
                       <span class="lock-badge" style="color:#94a3b8;">Bảo mật, đám mây & kỹ năng số</span>
                   </button>
                   <a href="/courses" style="color:#64748b; font-size:0.8rem; margin-top:15px; text-decoration:none;">← Quay lại danh mục khóa học</a>
               </div>
               
               <!-- Bước 2: Chọn Mode -->
               <div class="mode-selection-overlay" id="modeSelectBox" style="${modeBoxStyle}">
                   <h2 style="color:#fff; margin-bottom:6px;">CHỌN CHẾ ĐỘ HỌC TẬP</h2>
                   <p style="font-size:0.85rem; margin-bottom:20px; font-weight:bold;" id="modeWelcomeTxt">Đang kiểm tra quyền truy cập...</p>
                   <button class="mode-btn" onclick="launchEngine(&apos;practice&apos;)">
                       📖 Chế độ Ôn luyện tự do
                       <span class="lock-badge" id="lock-practice"> </span>
                   </button>
                   <button class="mode-btn" onclick="launchEngine(&apos;exam&apos;)">
                       ⏱️ Chế độ Thi thử thực chiến
                       <span class="lock-badge" id="lock-exam"> </span>
                   </button>
                   <button class="mode-btn" id="btnRetryFromExam" onclick="launchRetryFromExam()" style="display:none; border-color:rgba(239,68,68,0.4); background:rgba(239,68,68,0.05);">
                       🔁 Ôn câu sai từ lần thi trước
                       <span class="lock-badge" id="lock-retry-exam" style="color:#fca5a5;"> </span>
                   </button>
                   ${hasLevels
                       ? '<button onclick="document.getElementById(\'modeSelectBox\').style.display=\'none\'; document.getElementById(\'levelSelectBox\').style.display=\'flex\';" style="color:#64748b; font-size:0.8rem; margin-top:15px; background:none; border:none; cursor:pointer;">← Chọn lại cấp độ</button>'
                       : '<a href="/courses" style="color:#64748b; font-size:0.8rem; margin-top:15px; text-decoration:none;">← Quay lại danh mục khóa học</a>'
                   }
               </div>

                <div class="result-overlay" id="resBox">
                    <h2 style="color:#00f2ff; font-weight:800;">KẾT QUẢ SÁT HẠCH</h2>
                    <div style="font-size:42px; font-weight:800; margin:15px 0;" id="resScore">0 / 1000</div>
                    <p style="margin-bottom:25px; color:#cbd5e1; font-size:0.95rem; max-width:420px; line-height:1.5;" id="resText"></p>
                    <button onclick="location.href=&apos;/courses&apos;" style="padding:12px 35px; background:linear-gradient(135deg,#FF5722,#ff784e); border:none; color:#fff; font-weight:800; border-radius:25px; cursor:pointer; margin-bottom:12px;">QUAY LẠI TRANG KHÓA HỌC</button>
                    <button onclick="retryWrongAnswers()" id="btnRetryWrong" style="padding:10px 25px; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.4); color:#fca5a5; font-weight:700; border-radius:20px; cursor:pointer; margin-bottom:8px;">🔁 ÔN LẠI CÁC CÂU SAI</button>
                    <button onclick="restartQuiz()" style="padding:10px 25px; background:#1e2235; border:1px solid #282f44; color:#94a3b8; font-weight:700; border-radius:20px; cursor:pointer;">LÀM LẠI BÀI THI</button>
                </div>

                <div style="font-size:11px; color:#00f2ff; font-weight:800; letter-spacing:0.5px; margin-bottom:10px;">
                CÂU HỎI: <span id="lblIdx">1</span> / <span id="lblTotal">${EXAM_CONFIG.QUESTION_COUNT}</span>
                </div>
                <div class="retry-banner" id="retryBanner">🔁 Chế độ ÔN CÂU SAI — Chỉ hiện các câu bạn đã trả lời sai</div>
                <div class="question-image-wrap" id="questionImageWrap"></div>
                <div class="question-box" id="lblText">Đang tải...</div>
                <div id="optsArea"></div>
                <div class="btn-confirm-wrap" id="btnConfirmWrap">
                    <button class="btn-confirm" id="btnConfirm" onclick="confirmAnswer()">✅ XÁC NHẬN ĐÁP ÁN</button>
                </div>
                <div class="explanation-box" id="explanationBox"><strong>💡 Giải thích:</strong> <span id="explanationText"></span></div>

                <div class="control-btns">
                    <button class="btn-ctrl" onclick="go(-1)">← TRƯỚC</button>
                    <button class="btn-ctrl btn-submit" id="btnSubmit" onclick="submitExamNow()">NỘP BÀI CHẤM ĐIỂM</button>
                    <button class="btn-ctrl" onclick="go(1)">TIẾP THEO →</button>
                </div>
            </div>

            <div class="right-sidebar">
                <h4 style="margin-bottom:8px; font-size:12px; color:#94a3b8;">DANH SÁCH CÂU HỎI</h4>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                    <button id="navPagePrev" onclick="changeNavPage(-1)" style="background:#1e2235; border:1px solid #29304a; color:#94a3b8; border-radius:6px; padding:4px 10px; cursor:pointer; font-size:12px; font-weight:800;">&#9664;</button>
                    <span id="navPageLabel" style="font-size:11px; color:#64748b; font-weight:700;">1–10</span>
                    <button id="navPageNext" onclick="changeNavPage(1)" style="background:#1e2235; border:1px solid #29304a; color:#94a3b8; border-radius:6px; padding:4px 10px; cursor:pointer; font-size:12px; font-weight:800;">&#9654;</button>
                </div>
                <div class="nav-grid" id="gridArea"></div>
                <div style="margin-top:12px; font-size:11px; color:#64748b; line-height:1.6;">
                    <span style="color:#22c55e;">■</span> Đúng &nbsp;
                    <span style="color:#ef4444;">■</span> Sai &nbsp;
                    <span style="color:#384260;">■</span> Đã chọn
                </div>
            </div>
        </div>
    </div>

    <script>
    var qCount = ${EXAM_CONFIG.QUESTION_COUNT};
    var fullBank = ${bankJSON};
    var list = [];
    var cur = 0;
    var userAns = [];
    var isDone = false;
    var mode = "";
    var selectedLevel = "ALL";
    var isVerified = localStorage.getItem('course_auth_${courseType}') === 'verified';
    var hasLevels = ${hasLevels};
    var confirmedList = [];
    var matchingState = {};
    var dragdropState = {};
    var sortState = {};
    var isRetryMode = false;
    var navPage = 0; // trang hiện tại của sidebar (10 câu/trang)
    var NAV_PAGE_SIZE = 10;

    // ===== SHUFFLE =====
    function shuffleArray(arr) {
        var clone = arr.slice();
        for (var i = clone.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = clone[i]; clone[i] = clone[j]; clone[j] = temp;
        }
        return clone;
    }

    // ===== LEVEL & MODE =====
    function selectLevel(lv) {
        selectedLevel = lv;
        document.getElementById('levelSelectBox').style.display = 'none';
        document.getElementById('modeSelectBox').style.display = 'flex';
        verifyModeMenu();
    }

    function verifyModeMenu() {
        if (isVerified) {
            document.getElementById('modeWelcomeTxt').textContent = "✅ Quyền học viên hợp lệ – Mở khóa đầy đủ tính năng!";
            document.getElementById('modeWelcomeTxt').style.color = "#22c55e";
            document.getElementById('lock-practice').textContent = "🔓 Ôn tập tự do – Xem giải thích ngay, không giới hạn thời gian";
            document.getElementById('lock-practice').style.color = "#00f2ff";
            document.getElementById('lock-exam').textContent = "🔓 Thi thử thực chiến – 50 phút, tính điểm chuẩn Certiport";
            document.getElementById('lock-exam').style.color = "#00f2ff";
        } else {
            document.getElementById('modeWelcomeTxt').textContent = "⚠️ Chưa đăng nhập – Trải nghiệm dùng thử 10 phút";
            document.getElementById('modeWelcomeTxt').style.color = "#FF5722";
            document.getElementById('lock-practice').textContent = "⏱️ Ôn luyện dùng thử – Giới hạn 10 phút, có giải thích";
            document.getElementById('lock-practice').style.color = "#ffaa80";
            document.getElementById('lock-exam').textContent = "⏱️ Thi thử dùng thử – Giới hạn 10 phút";
            document.getElementById('lock-exam').style.color = "#ffaa80";
        }
        // Hiện nút ôn câu sai từ lần thi nếu có data
        var examWrong = localStorage.getItem('mos360_exam_wrong_${courseType}');
        var btnRetryExam = document.getElementById('btnRetryFromExam');
        if (btnRetryExam && examWrong) {
            var count = JSON.parse(examWrong).length;
            btnRetryExam.style.display = 'block';
            document.getElementById('lock-retry-exam').textContent = count + " câu sai từ lần thi gần nhất";
        }
    }

    function launchEngine(chosenMode) {
        mode = chosenMode;
        isRetryMode = false;
        document.getElementById('modeSelectBox').style.display = "none";
        document.getElementById('btnSubmit').style.display = mode === 'exam' ? 'inline-block' : 'none';
        document.getElementById('retryBanner').classList.remove('visible');

        var filtered = selectedLevel === 'ALL' ? fullBank : fullBank.filter(function(b) { return b.lv === selectedLevel; });
        var selected;
        if (mode === 'practice') {
            // Ôn luyện: giữ đúng thứ tự gốc, lấy toàn bộ câu
            selected = filtered.slice();
        } else {
            // Thi thử: shuffle + giới hạn 45 câu
            selected = shuffleArray(filtered).slice(0, Math.min(${EXAM_CONFIG.QUESTION_COUNT}, filtered.length));
        }
        buildList(selected);
        initQuiz();
    }

    function buildList(selected) {
        list = [];
        for (var i = 0; i < selected.length; i++) {
            var b = selected[i];
            list.push({ q: "[Câu " + (i+1) + "] " + b.q, options: b.o ? b.o.slice() : [], o_right: b.o_right || [], c: b.c, e: b.e, t: b.t, img: b.img || "" });
        }
        qCount = list.length;
        userAns = list.map(function(q) { return Array.isArray(q.c) ? [] : null; });
        confirmedList = new Array(list.length).fill(false);
        matchingState = {};
        dragdropState = {};
        sortState = {};
    }

    // ===== ÔN CÂU SAI =====
    function retryWrongAnswers() {
        var wrongItems = [];
        for (var i = 0; i < list.length; i++) {
            if (!isCorrectAnswer(i)) wrongItems.push(fullBank.find(function(b) { return b.q === list[i].q.replace(/^\[Câu \d+\] /, ''); }) || list[i]);
        }
        if (wrongItems.length === 0) { alert("🎉 Tuyệt vời! Bạn không có câu nào sai!"); return; }
        isRetryMode = true;
        document.getElementById('resBox').style.display = "none";
        document.getElementById('retryBanner').classList.add('visible');
        document.getElementById('btnSubmit').style.display = mode === 'exam' ? 'inline-block' : 'none';
        buildList(wrongItems);
        cur = 0; isDone = false;
        initQuiz();
    }

    // ===== SIDEBAR PAGINATION =====
    function renderNavGrid() {
        var g = document.getElementById('gridArea');
        g.innerHTML = '';
        var totalPages = Math.ceil(qCount / NAV_PAGE_SIZE);
        var start = navPage * NAV_PAGE_SIZE;
        var end = Math.min(start + NAV_PAGE_SIZE, qCount);

        for (var i = start; i < end; i++) {
            var d = document.createElement('div');
            var cls = 'nav-item';
            if (i === cur) cls += ' current';
            else if (confirmedList[i]) cls += isCorrectAnswer(i) ? ' correct-nav' : ' wrong-nav';
            else if (isAnswered(i)) cls += ' answered';
            d.className = cls;
            d.id = 'ni-' + i;
            d.textContent = i + 1;
            (function(idx){ d.onclick = function() { cur = idx; renderQ(); }; })(i);
            g.appendChild(d);
        }

        // Cập nhật label trang
        var label = document.getElementById('navPageLabel');
        if (label) label.textContent = (start+1) + '–' + end + ' / ' + qCount;

        // Ẩn/hiện nút prev/next
        var prev = document.getElementById('navPagePrev');
        var next = document.getElementById('navPageNext');
        if (prev) prev.style.opacity = navPage === 0 ? '0.3' : '1';
        if (next) next.style.opacity = navPage >= totalPages - 1 ? '0.3' : '1';
    }

    function changeNavPage(dir) {
        var totalPages = Math.ceil(qCount / NAV_PAGE_SIZE);
        navPage = Math.max(0, Math.min(totalPages - 1, navPage + dir));
        renderNavGrid();
    }

    function syncNavPageToCur() {
        var targetPage = Math.floor(cur / NAV_PAGE_SIZE);
        if (targetPage !== navPage) { navPage = targetPage; }
        renderNavGrid();
    }

    function initQuiz() {
        navPage = 0;
        renderNavGrid();
        cur = 0; isDone = false;
        renderQ();
        checkExpireBanner();

        var mins = isVerified ? (mode === 'exam' ? 50 : 0) : 10;
        if (mins > 0) {
            startTimer(mins);
        } else {
            document.getElementById('timerContainer').innerHTML = "📖 Ôn luyện tự do";
            document.getElementById('timerContainer').style.border = "2px solid #22c55e";
            document.getElementById('timerContainer').style.color = "#22c55e";
        }
    }

    // ===== CROSS-MODE: ÔN CÂU SAI TỪ LẦN THI =====
    function launchRetryFromExam() {
        var raw = localStorage.getItem('mos360_exam_wrong_${courseType}');
        if (!raw) return;
        var wrongTexts = JSON.parse(raw);
        var wrongItems = wrongTexts.map(function(txt) {
            return fullBank.find(function(b) { return b.q === txt; });
        }).filter(Boolean);
        if (wrongItems.length === 0) { alert("Không tìm thấy câu hỏi trong ngân hàng!"); return; }
        mode = 'practice';
        isRetryMode = true;
        document.getElementById('modeSelectBox').style.display = "none";
        document.getElementById('btnSubmit').style.display = 'none';
        document.getElementById('retryBanner').classList.add('visible');
        buildList(wrongItems);
        initQuiz();
    }

    // ===== THÔNG BÁO HẾT HẠN =====
    function checkExpireBanner() {
        var expireRaw = localStorage.getItem('course_expire_${courseType}');
        if (!expireRaw || !isVerified) return;
        try {
            var expireDate = new Date(expireRaw);
            var now = new Date();
            var diffDays = Math.ceil((expireDate - now) / (1000 * 60 * 60 * 24));
            var banner = document.getElementById('expireBanner');
            var msg = document.getElementById('expireMsg');
            if (diffDays <= 0) {
                msg.textContent = "Tài khoản của bạn đã hết hạn!";
                banner.classList.add('visible');
            } else if (diffDays <= 7) {
                msg.textContent = "Tài khoản sắp hết hạn trong " + diffDays + " ngày.";
                banner.classList.add('visible');
            }
        } catch(e) {}
    }

    // ===== ANSWER HELPERS =====
    function isConfirmed(idx) { return confirmedList[idx] === true; }

    function isAnswered(idx) {
        var q = list[idx];
        if (q.t === 'matching') { var s = matchingState[idx]; return s && s.dropData.every(function(d) { return d !== null; }); }
        if (q.t === 'dragdrop') { var s2 = dragdropState[idx]; return s2 && s2.every(function(d) { return d !== null; }); }
        if (q.t === 'sort-order') return true;
        var a = userAns[idx];
        return Array.isArray(a) ? a.length > 0 : a !== null;
    }

    function isCorrectAnswer(idx) {
        var q = list[idx];
        if (q.t === 'matching') {
            var s = matchingState[idx];
            if (!s) return false;
            var keys = Object.keys(q.c);
            return keys.every(function(k, i) { return s.dropData[i] === q.c[k]; });
        }
        if (q.t === 'dragdrop') {
            var s2 = dragdropState[idx];
            if (!s2) return false;
            return Array.isArray(q.c) && q.c.every(function(ans, i) { return s2[i] === ans; });
        }
        if (q.t === 'sort-order') {
            var s3 = sortState[idx];
            if (!s3) return false;
            return Array.isArray(q.c) && q.c.every(function(ans, i) { return s3[i] === ans; });
        }
        if (Array.isArray(q.c)) {
            var a = userAns[idx];
            if (!Array.isArray(a) || a.length !== q.c.length) return false;
            var sc = q.c.slice().sort(), sa = a.slice().sort();
            for (var i = 0; i < sc.length; i++) { if (sc[i] !== sa[i]) return false; }
            return true;
        }
        return userAns[idx] === q.c;
    }

    // ===== CONFIRM =====
    function confirmAnswer() {
        if (!isAnswered(cur)) return;
        confirmedList[cur] = true;
        var ni = document.getElementById('ni-' + cur);
        ni.classList.remove('answered');
        ni.classList.add(isCorrectAnswer(cur) ? 'correct-nav' : 'wrong-nav');
        renderQ();
    }

    function updateConfirmBtn() {
        var wrap = document.getElementById('btnConfirmWrap');
        var confirmed = isConfirmed(cur);
        if (!isDone && !confirmed && isAnswered(cur)) {
            wrap.classList.add('visible');
        } else {
            wrap.classList.remove('visible');
        }
    }

    // ===== RENDER MAIN =====
    function renderQ() {
        var q = list[cur];
        document.getElementById('lblIdx').textContent = cur + 1;
        if (document.getElementById('lblTotal')) document.getElementById('lblTotal').textContent = qCount;
        document.getElementById('lblText').textContent = q.q;
        var area = document.getElementById('optsArea');
        area.innerHTML = '';
        var expBox = document.getElementById('explanationBox');
        expBox.classList.remove('visible');

        // Ảnh minh họa
        // Ảnh minh họa
         var imgWrap = document.getElementById('questionImageWrap');
         
         if (q.img) {
             imgWrap.innerHTML =
  '<img src="' + q.img +
  '" alt="Minh họa" loading="lazy" onerror="this.parentElement.style.display=\\'none\\'">';
         
             imgWrap.style.display = 'flex';
         
         } else {
             imgWrap.innerHTML = '';
             imgWrap.style.display = 'none';
         }

        var confirmed = isConfirmed(cur);

        if (q.t === 'matching') { renderMatching(q, area, confirmed); }
        else if (q.t === 'dragdrop') { renderDragdrop(q, area, confirmed); }
        else if (q.t === 'sort-order') { renderSortOrder(q, area, confirmed); }
        else if (q.t === 'image-select') { renderImageSelect(q, area, confirmed); }
        else { renderSingleMultiple(q, area, confirmed); }

        updateConfirmBtn();

        if (confirmed && mode === 'practice') {
            document.getElementById('explanationText').textContent = q.e;
            expBox.classList.add('visible');
        }

        syncNavPageToCur();
    }

    // ===== SINGLE / MULTIPLE =====
    function renderSingleMultiple(q, area, confirmed) {
        var isMultiple = Array.isArray(q.c);
        if (isMultiple) {
            var hint = document.createElement('div');
            hint.style.cssText = "font-size:0.8rem;color:#f59e0b;margin-bottom:10px;font-weight:bold;";
            hint.textContent = "⚠️ Chọn " + q.c.length + " đáp án đúng";
            area.appendChild(hint);
        }
        for (var i = 0; i < q.options.length; i++) {
            var div = document.createElement('div');
            var isSelected = isMultiple ? userAns[cur].indexOf(i) >= 0 : userAns[cur] === i;
            var isCorrectOpt = isMultiple ? q.c.indexOf(i) >= 0 : q.c === i;
            var cls = 'option';
            if (confirmed && mode === 'practice') {
                if (isSelected && isCorrectOpt) cls += ' correct-ans';
                else if (isSelected && !isCorrectOpt) cls += ' wrong-ans';
                else if (!isSelected && isCorrectOpt) cls += ' show-correct';
            } else if (isSelected) { cls += ' selected'; }
            div.className = cls;
            div.innerHTML = '<span style="min-width:22px;font-weight:900;color:#64748b;">' + String.fromCharCode(65+i) + '.</span>' + q.options[i];
            if (!isDone && !confirmed) {
                (function(optIdx){
                    div.onclick = function() {
                        if (isMultiple) {
                            var idx2 = userAns[cur].indexOf(optIdx);
                            if (idx2 >= 0) userAns[cur].splice(idx2, 1); else userAns[cur].push(optIdx);
                        } else { userAns[cur] = optIdx; }
                        renderQ();
                    };
                })(i);
            }
            area.appendChild(div);
        }
    }

    // ===== IMAGE SELECT =====
    function renderImageSelect(q, area, confirmed) {
        var grid = document.createElement('div');
        grid.className = 'img-select-grid';
        q.options.forEach(function(opt, i) {
            var cell = document.createElement('div');
            var isSelected = userAns[cur] === i;
            var isCorrectOpt = q.c === i;
            var cls = 'img-opt';
            if (confirmed && mode === 'practice') {
                if (isSelected && isCorrectOpt) cls += ' correct-img';
                else if (isSelected && !isCorrectOpt) cls += ' wrong-img';
                else if (!isSelected && isCorrectOpt) cls += ' correct-img';
            } else if (isSelected) { cls += ' selected'; }
            cell.className = cls;
            cell.innerHTML =
             '<img src="' + (opt.img || '') +
             '" onerror="this.style.height=\'80px\';this.style.background=\'#1e2235\'">' +
             '<div class="img-opt-label">' +
             String.fromCharCode(65 + i) + '. ' +
             (opt.label || opt) +
             '</div>';
            if (!isDone && !confirmed) {
                (function(optIdx){ cell.onclick = function() { userAns[cur] = optIdx; renderQ(); }; })(i);
            }
            grid.appendChild(cell);
        });
        area.appendChild(grid);
    }

    // ===== MATCHING =====
    function renderMatching(q, area, confirmed) {
        var leftKeys = Object.keys(q.c);
        var rightTexts = q.o_right && q.o_right.length ? q.o_right : q.options;
        if (!matchingState[cur]) matchingState[cur] = { dropData: new Array(leftKeys.length).fill(null) };
        var state = matchingState[cur];

        if (!confirmed) {
            var hint = document.createElement('div');
            hint.style.cssText = "font-size:0.8rem;color:#f59e0b;font-weight:bold;margin-bottom:12px;";
            hint.textContent = "Kéo thả hoặc nhấn chọn để ghép cặp";
            area.appendChild(hint);
        }

        var grid = document.createElement('div');
        grid.className = 'matching-grid';
        var leftCol = document.createElement('div');
        var lLabel = document.createElement('div'); lLabel.className = 'matching-col-label'; lLabel.textContent = 'KHÁI NIỆM';
        leftCol.appendChild(lLabel);
        leftKeys.forEach(function(key) {
            var el = document.createElement('div'); el.className = 'matching-left-item';
            el.innerHTML = '<span class="matching-dot"></span>' + key;
            leftCol.appendChild(el);
        });

        var rightCol = document.createElement('div');
        var rLabel = document.createElement('div'); rLabel.className = 'matching-col-label'; rLabel.textContent = confirmed ? 'KẾT QUẢ' : 'KÉO ĐÁP ÁN VÀO ĐÂY';
        rightCol.appendChild(rLabel);

        leftKeys.forEach(function(key, idx) {
            var zone = document.createElement('div');
            var droppedVal = state.dropData[idx];
            var correctVal = q.c[key];
            zone.className = 'drop-zone' + (droppedVal !== null ? ' filled' : '');
            if (droppedVal !== null && confirmed) zone.classList.add(droppedVal === correctVal ? 'correct-match' : 'wrong-match');
            zone.dataset.idx = idx;
            zone.textContent = droppedVal !== null ? rightTexts[droppedVal] : 'Thả vào đây';

            if (!confirmed) {
                zone.addEventListener('dragover', function(e) { e.preventDefault(); zone.classList.add('drag-over'); });
                zone.addEventListener('dragleave', function() { zone.classList.remove('drag-over'); });
                zone.addEventListener('drop', function(e) {
                    e.preventDefault(); zone.classList.remove('drag-over');
                    var val = parseInt(e.dataTransfer.getData('text/plain'));
                    var old = state.dropData[idx];
                    if (old !== null) { var ob = area.querySelector('.bank-item[data-val="'+old+'"]'); if (ob) ob.style.display = ''; }
                    state.dropData.forEach(function(v,i2){ if (v===val && i2!==idx) state.dropData[i2]=null; });
                    state.dropData[idx] = val;
                    var bi = area.querySelector('.bank-item[data-val="'+val+'"]'); if (bi) bi.style.display='none';
                    renderQ();
                });
                // Mobile tap-to-select
                zone.addEventListener('click', function() {
                    if (window._matchTapSel !== undefined) {
                        var val = window._matchTapSel;
                        var old = state.dropData[idx];
                        if (old !== null) { var ob = area.querySelector('.bank-item[data-val="'+old+'"]'); if(ob) ob.style.display=''; }
                        state.dropData.forEach(function(v,i2){ if(v===val&&i2!==idx) state.dropData[i2]=null; });
                        state.dropData[idx] = val;
                        var bi = area.querySelector('.bank-item[data-val="'+val+'"]'); if(bi) bi.style.display='none';
                        window._matchTapSel = undefined;
                        renderQ();
                    } else if (droppedVal !== null) {
                        var ob2 = area.querySelector('.bank-item[data-val="'+droppedVal+'"]'); if(ob2) ob2.style.display='';
                        state.dropData[idx] = null; renderQ();
                    }
                });
            }
            rightCol.appendChild(zone);
        });

        grid.appendChild(leftCol); grid.appendChild(rightCol); area.appendChild(grid);

        if (!confirmed) {
            var blabel = document.createElement('div'); blabel.className = 'matching-col-label'; blabel.textContent = 'NGÂN HÀNG ĐÁP ÁN';
            area.appendChild(blabel);
            var bank = document.createElement('div'); bank.className = 'answer-bank';
            rightTexts.forEach(function(text, val) {
                var item = document.createElement('div'); item.className = 'bank-item'; item.draggable = true; item.dataset.val = val; item.textContent = text;
                if (state.dropData.indexOf(val) >= 0) item.style.display = 'none';
                item.addEventListener('dragstart', function(e) { e.dataTransfer.setData('text/plain', val); item.classList.add('dragging'); });
                item.addEventListener('dragend', function() { item.classList.remove('dragging'); });
                // Mobile tap
                item.addEventListener('click', function() {
                    document.querySelectorAll('.bank-item').forEach(function(b){ b.style.outline=''; });
                    if (window._matchTapSel === val) { window._matchTapSel = undefined; }
                    else { window._matchTapSel = val; item.style.outline='2px solid #00f2ff'; }
                });
                bank.appendChild(item);
            });
            area.appendChild(bank);
        }
    }

    // ===== DRAGDROP (fill-in-blank) =====
    function renderDragdrop(q, area, confirmed) {
        var blanks = Array.isArray(q.c) ? q.c.length : 1;
        if (!dragdropState[cur]) dragdropState[cur] = new Array(blanks).fill(null);
        var state = dragdropState[cur];
        var words = q.options.slice();

        if (!confirmed) {
            var hint = document.createElement('div');
            hint.style.cssText = "font-size:0.8rem;color:#f59e0b;font-weight:bold;margin-bottom:10px;";
            hint.textContent = "Kéo từ ngân hàng vào ô trống trong câu";
            area.appendChild(hint);
        }

        // Build sentence with inline drops
        var sentBox = document.createElement('div'); sentBox.className = 'sentence-box';
        var parts = q.q.replace(/^\[Câu \d+\] /, '').split('___');
        parts.forEach(function(part, pi) {
            sentBox.appendChild(document.createTextNode(part));
            if (pi < blanks) {
                var zone = document.createElement('span'); zone.className = 'inline-drop' + (state[pi] !== null ? ' filled' : '');
                var correctVal = Array.isArray(q.c) ? q.c[pi] : q.c;
                if (state[pi] !== null && confirmed) zone.classList.add(state[pi] === correctVal ? 'correct-fill' : 'wrong-fill');
                zone.dataset.idx = pi;
                zone.textContent = state[pi] !== null ? words[state[pi]] : 'thả vào đây';
                if (!confirmed) {
                    zone.addEventListener('dragover', function(e) { e.preventDefault(); zone.classList.add('drag-over'); });
                    zone.addEventListener('dragleave', function() { zone.classList.remove('drag-over'); });
                    zone.addEventListener('drop', function(e) {
                        e.preventDefault(); zone.classList.remove('drag-over');
                        var val = parseInt(e.dataTransfer.getData('text/plain'));
                        var old = state[pi];
                        if (old !== null) { var ob = area.querySelector('.bank-item[data-val="'+old+'"]'); if(ob) ob.style.display=''; }
                        state.forEach(function(v,i2){ if(v===val&&i2!==pi) state[i2]=null; });
                        state[pi] = val;
                        var bi = area.querySelector('.bank-item[data-val="'+val+'"]'); if(bi) bi.style.display='none';
                        dragdropState[cur] = state; renderQ();
                    });
                    // Mobile tap
                    zone.addEventListener('click', function() {
                        if (window._ddTapSel !== undefined) {
                            var val = window._ddTapSel;
                            var old = state[pi];
                            if(old!==null){var ob=area.querySelector('.bank-item[data-val="'+old+'"]');if(ob)ob.style.display='';}
                            state.forEach(function(v,i2){if(v===val&&i2!==pi)state[i2]=null;});
                            state[pi]=val;
                            var bi=area.querySelector('.bank-item[data-val="'+val+'"]');if(bi)bi.style.display='none';
                            window._ddTapSel=undefined; dragdropState[cur]=state; renderQ();
                        } else if (state[pi]!==null) {
                            var ob2=area.querySelector('.bank-item[data-val="'+state[pi]+'"]');if(ob2)ob2.style.display='';
                            state[pi]=null; dragdropState[cur]=state; renderQ();
                        }
                    });
                }
                sentBox.appendChild(zone);
            }
        });
        area.appendChild(sentBox);

        if (!confirmed) {
            var blabel = document.createElement('div'); blabel.className = 'matching-col-label'; blabel.textContent = 'NGÂN HÀNG TỪ — KÉO VÀO Ô TRỐNG';
            area.appendChild(blabel);
            var bank = document.createElement('div'); bank.className = 'answer-bank';
            words.forEach(function(word, val) {
                var item = document.createElement('div'); item.className = 'bank-item'; item.draggable = true; item.dataset.val = val; item.textContent = word;
                if (state.indexOf(val) >= 0) item.style.display = 'none';
                item.addEventListener('dragstart', function(e) { e.dataTransfer.setData('text/plain', val); item.classList.add('dragging'); });
                item.addEventListener('dragend', function() { item.classList.remove('dragging'); });
                item.addEventListener('click', function() {
                    document.querySelectorAll('.bank-item').forEach(function(b){b.style.outline='';});
                    if(window._ddTapSel===val){window._ddTapSel=undefined;}
                    else{window._ddTapSel=val;item.style.outline='2px solid #00f2ff';}
                });
                bank.appendChild(item);
            });
            area.appendChild(bank);
        }
    }

    // ===== SORT ORDER =====
    function renderSortOrder(q, area, confirmed) {
        var items = q.options.slice();
        if (!sortState[cur]) {
            var init = items.map(function(_,i){return i;});
            sortState[cur] = shuffleArray(init);
        }
        var state = sortState[cur];

        if (!confirmed) {
            var hint = document.createElement('div');
            hint.style.cssText = "font-size:0.8rem;color:#f59e0b;font-weight:bold;margin-bottom:10px;";
            hint.textContent = "Kéo để sắp xếp từ trên xuống dưới theo thứ tự đúng";
            area.appendChild(hint);
        }

        var sortList = document.createElement('div'); sortList.className = 'sort-list'; sortList.id = 'sortListEl';
        var dragSrc = null;

        state.forEach(function(optIdx, pos) {
            var item = document.createElement('div');
            var correctPos = Array.isArray(q.c) ? q.c.indexOf(optIdx) : -1;
            var cls = 'sort-item';
            if (confirmed && mode === 'practice') {
                cls += (pos === correctPos) ? ' correct-sort' : ' wrong-sort';
            }
            item.className = cls;
            item.draggable = !confirmed;
            item.dataset.pos = pos;
            item.innerHTML = '<span class="sort-handle">⠿</span><span class="sort-num">' + (pos+1) + '</span>' + items[optIdx];

            if (!confirmed) {
                item.addEventListener('dragstart', function() { dragSrc = pos; setTimeout(function(){item.style.opacity='0.4';},0); });
                item.addEventListener('dragend', function() { item.style.opacity='1'; dragSrc=null; refreshSortNums(); });
                item.addEventListener('dragover', function(e) {
                    e.preventDefault(); item.classList.add('drag-over-sort');
                    if (dragSrc !== null && dragSrc !== pos) {
                        var tmp = state[dragSrc]; state[dragSrc]=state[pos]; state[pos]=tmp;
                        dragSrc=pos; sortState[cur]=state; renderQ();
                    }
                });
                item.addEventListener('dragleave', function() { item.classList.remove('drag-over-sort'); });
            }
            sortList.appendChild(item);
        });
        area.appendChild(sortList);
    }

    function refreshSortNums() {
        document.querySelectorAll('.sort-item').forEach(function(el, i) {
            var numEl = el.querySelector('.sort-num'); if(numEl) numEl.textContent = i+1;
        });
    }

    // ===== TIMER =====
    function go(d) { cur = Math.max(0, Math.min(qCount-1, cur + d)); renderQ(); }

    function startTimer(m) {
        var sec = m * 60;
        var t = setInterval(function() {
            if (isDone) { clearInterval(t); return; }
            sec--;
            var mins = Math.floor(sec / 60), s = sec % 60;
            document.getElementById('clock').textContent = (mins<10?'0':'')+mins+':'+(s<10?'0':'')+s;
            if (sec <= 0) { clearInterval(t); alert("Hết thời gian làm bài!"); submitExamNow(); }
        }, 1000);
    }

    // ===== SUBMIT =====
    function submitExamNow() {
        if (isDone) return;
        if (mode === 'exam' && isVerified) {
            var answeredCount = 0;
            for(var i=0;i<qCount;i++){if(isAnswered(i))answeredCount++;}
            if (!confirm("Bạn đã trả lời " + answeredCount + "/" + qCount + " câu. Xác nhận nộp bài?")) return;
        }
        isDone = true;
        var rights = 0;
        var wrongOriginalTexts = [];
        for (var i = 0; i < qCount; i++) {
            if (isCorrectAnswer(i)) { rights++; }
            else { wrongOriginalTexts.push(list[i].q.replace(/^\[Câu \d+\] /, '')); }
        }
        // Lưu câu sai để cross-mode (exam → practice)
        if (mode === 'exam' && wrongOriginalTexts.length > 0) {
            localStorage.setItem('mos360_exam_wrong_${courseType}', JSON.stringify(wrongOriginalTexts));
        }

        var score = Math.round((rights / qCount) * 1000);
        document.getElementById('resScore').textContent = score + "/${EXAM_CONFIG.MAX_SCORE} điểm";

        // Nút ôn câu sai: chỉ hiện ở practice
        var btnRetry = document.getElementById('btnRetryWrong');
        if (btnRetry) {
            btnRetry.style.display = (mode === 'practice' && rights < qCount) ? 'inline-block' : 'none';
        }

        if (score >= ${EXAM_CONFIG.PASS_SCORE}) {
            document.getElementById('resScore').style.color = "#22c55e";
            document.getElementById('resText').innerHTML = "🎉 XUẤT SẮC ĐẠT CHUẨN! Bạn trả lời đúng " + rights + "/" + qCount + " câu, đạt " + score + "/${EXAM_CONFIG.MAX_SCORE} điểm.";
        } else {
            document.getElementById('resScore').style.color = "#FF5722";
            var hint = mode === 'practice' ? " Hãy ôn lại các câu sai!" : " Hãy vào chế độ Ôn luyện để ôn câu sai!";
            document.getElementById('resText').innerHTML = "⚠️ CHƯA ĐẠT CHUẨN. Bạn đạt " + score + "/${EXAM_CONFIG.MAX_SCORE} điểm, cần đạt ${EXAM_CONFIG.PASS_SCORE} điểm." + hint;
        }
        document.getElementById('resBox').style.display = "flex";
    }

    function restartQuiz() {
        isRetryMode = false;
        document.getElementById('retryBanner').classList.remove('visible');
        document.getElementById('resBox').style.display = "none";
        document.getElementById('btnConfirmWrap').classList.remove('visible');
        isDone = false;
        navPage = 0;
        var filtered = selectedLevel === 'ALL' ? fullBank : fullBank.filter(function(b) { return b.lv === selectedLevel; });
        var selected;
        if (mode === 'practice') {
            selected = filtered.slice();
        } else {
            selected = shuffleArray(filtered).slice(0, Math.min(${EXAM_CONFIG.QUESTION_COUNT}, filtered.length));
        }
        buildList(selected);
        initQuiz();
    }

    window.onload = function() {
        if (!hasLevels) { selectedLevel = 'ALL'; verifyModeMenu(); }
    };
    </script>
    </body></html>`;
    }
};
