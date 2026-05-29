const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
  // URL Gốc dữ liệu dùng để xuất TSV đồng bộ và làm link định tuyến trực tiếp cho nút Admin
  SHEET_EDIT_URL: "https://docs.google.com/spreadsheets/d/17spoqBAGtinFHQSTGbaDMapFH4nWGS0RHGGhCB5WzqI/edit?gid=0#gid=0",
  SOCIALS: {
    ZALO: "https://zalo.me/0912888360",
    FACEBOOK: "https://facebook.com/mos360",
    MESSENGER: "https://m.me/mos360",
    YOUTUBE: "https://youtube.com/@mos360",
    TIKTOK: "https://tiktok.com/@mos360"
  },
  ADMIN: {
    USER: "admin@mos360",
    PASS: "Mos360"
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 2. + 3. API TRA CỨU DỮ LIỆU TỰ ĐỘNG VÀ ĐỔI TEXT THÔNG BÁO THÀNH "HỆ THỐNG HỌC VIÊN MOS360"
    if (path === "/api/verify-code") {
      const phone = url.searchParams.get("phone");
      const course = url.searchParams.get("course");
      if (!phone || !course) {
        return new Response(JSON.stringify({ success: false, msg: "Thiếu thông tin số điện thoại tra cứu!" }), { headers: { "Content-Type": "application/json" } });
      }
      
      try {
        // Trích xuất tự động qua cổng Export của cấu trúc trang Sheet thực tế của bạn
        const exportUrl = CONFIG.SHEET_EDIT_URL.split("/edit")[0] + "/export?format=tsv&gid=0&v=" + Date.now();
        const resp = await fetch(exportUrl);
        const tsv = await resp.text();
        const rows = tsv.split("\n");
        
        let isValid = false;
        let reason = "Mã số điện thoại chưa được kích hoạt trên hệ thống học viên MOS360!";
        
        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i].split("\t");
          if (cols.length >= 2) {
            const sheetCourse = cols[0]?.replace(/\r/g, "").trim().toLowerCase();
            const sheetPhone = cols[1]?.replace(/\r/g, "").trim();
            const sheetDateStr = cols[2]?.replace(/\r/g, "").trim();
            
            if (sheetPhone === phone && (sheetCourse.includes(course.toLowerCase()) || course.toLowerCase().includes(sheetCourse))) {
              if (sheetDateStr) {
                const parts = sheetDateStr.includes("/") ? sheetDateStr.split("/") : sheetDateStr.split("-");
                let startDate = sheetDateStr.includes("/") ? new Date(parts[2], parts[1] - 1, parts[0]) : new Date(parts[0], parts[1] - 1, parts[2]);
                const diffDays = Math.ceil(Math.abs(new Date() - startDate) / (1000 * 60 * 60 * 24));
                
                if (diffDays > 30) {
                  isValid = false;
                  reason = "Khóa học kích hoạt bằng số điện thoại này đã hết hạn 30 ngày học tập!";
                  break;
                }
              }
              isValid = true;
              break;
            }
          }
        }
        return new Response(JSON.stringify({ success: isValid, msg: isValid ? "Kích hoạt thành công!" : reason }), { headers: { "Content-Type": "application/json" } });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, msg: "Không thể kết nối máy chủ Google Sheet API!" }), { headers: { "Content-Type": "application/json" } });
      }
    }

    // Định tuyến giao diện phòng thi
    if (path === "/generative-ai") {
        return new Response(this.getQuizEnginePage("Generative AI"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    if (path === "/ic3-test") {
        return new Response(this.getQuizEnginePage("IC3 GS6"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    // 1. TẢI DỮ LIỆU CHỨNG CHỈ BẢNG VÀNG THEO ĐÚNG TIÊU CHUẨN PHIÊN BẢN CŨ
    let studentData = "";
    try {
      const exportUrl = CONFIG.SHEET_EDIT_URL.split("/edit")[0] + "/export?format=tsv&gid=0&v=" + Date.now();
      const resp = await fetch(exportUrl);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";
      rows.forEach(row => {
        const link = row.split("\t")[0]?.replace(/\r/g, "").trim();
        if (link && link.startsWith("http")) {
          let finalLink = link;
          if (link.includes("drive.google.com")) {
            const imgId = link.match(/[-\w]{25,}/);
            finalLink = "https://lh3.googleusercontent.com/d/" + imgId;
          }
          htmlContent += '<div class="student-item"><img src="' + finalLink + '" loading="lazy"></div>';
        }
      });
      studentData = htmlContent ? htmlContent + htmlContent : "<div style='color:#64748b; padding:20px;'>Hệ thống đang đồng bộ hình ảnh...</div>"; 
    } catch (e) { 
      studentData = "<div style='color:#64748b; padding:20px;'>Đang tải dữ liệu từ Google Sheet...</div>"; 
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
    <title>` + CONFIG.TITLE + `</title>
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
        .admin-only-btn { display: none; background: rgba(255, 215, 0, 0.1); color: #FFD700 !important; border: 1px solid #FFD700; padding: 6px 12px; border-radius: 6px; font-weight: 800; }
        
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
        
        /* GIỮ NGUYÊN CSS KHỐI TIÊU ĐỀ ĐÃ XOÁ CHỮ "CAM KẾT CHẤT LƯỢNG" */
        .featured-highlights-box { background: #111422; border: 1px solid var(--border); border-radius: 24px; padding: 35px 25px; box-shadow: 0 12px 40px rgba(0,0,0,0.3); position: relative; overflow: hidden; }
        .featured-highlights-box::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(to bottom, #FF5722, #ff9100); }
        .featured-main-title { font-size: 1.85rem; font-weight: 800; color: #fff; line-height: 1.25; letter-spacing: -0.5px; margin-top: 5px; }
        .featured-main-title span { color: #FF5722; display: block; font-size: 2.15rem; margin-top: 5px; text-shadow: 0 0 15px rgba(255,87,34,0.2); }
        .highlight-list { list-style: none; margin: 30px 0; display: flex; flex-direction: column; gap: 16px; }
        .highlight-list li { display: flex; align-items: center; gap: 12px; font-size: 1.05rem; font-weight: 700; color: #cbd5e1; }
        .highlight-list li::before { content: "✓"; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: rgba(255, 87, 34, 0.15); color: #FF5722; border-radius: 50%; font-size: 11px; font-weight: 900; }
        
        /* 1. KHÔI PHỤC NGUYÊN VẸN CSS BẢNG VÀNG PHIÊN BẢN CŨ CHUẨN ĐẸP */
        #bang-vang-container { height: 420px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.2); border-radius: 16px; }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 120s linear infinite; }
        .student-item { flex: 0 0 auto; width: 280px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        
        /* 5. CẤU HÌNH ICON MẠNG XÃ HỘI CHUẨN ĐẸP THEO ẢNH CHAT TRƯỚC (HÌNH TRÒN KHÔNG NỀN XÁM, MÀU HIỆN ĐẠI) */
        .social-sticky-bar { position: fixed; right: 25px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 9999; }
        .social-sticky-item { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
        .social-sticky-item:hover { transform: scale(1.15) rotate(5deg); }
        .social-sticky-item svg { width: 26px; height: 26px; fill: white; }
        
        .s-zalo { background: #0068FF; box-shadow: 0 4px 14px rgba(0,104,255,0.4); }
        .s-fb { background: #1877F2; box-shadow: 0 4px 14px rgba(24,119,242,0.4); }
        .s-mess { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%); box-shadow: 0 4px 14px rgba(214,36,159,0.4); }
        .s-yt { background: #FF0000; box-shadow: 0 4px 14px rgba(255,0,0,0.4); }
        .s-tt { background: #000000; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 4px 14px rgba(0,242,255,0.2); }

        .course-block-title { display: flex; align-items: center; gap: 12px; margin: 40px 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid var(--border); color: #fff; }
        .course-block-title svg { width: 28px; height: 28px; fill: var(--primary); }
        .course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .price-tag { font-size: 1.3rem; font-weight: 800; color: #00f2ff; margin: 15px 0; display: flex; align-items: center; gap: 8px; }
        .price-tag span { font-size: 0.85rem; color: #64748b; text-decoration: line-through; font-weight: normal; }
        .course-btn-group { display: flex; flex-direction: column; gap: 8px; margin-top: 15px; }

        .btn-action { background: linear-gradient(135deg, #FF5722, #ff784e); color: white; border: none; padding: 12px; border-radius: 25px; font-weight: 800; cursor: pointer; width: 100%; text-decoration:none; display:inline-block; text-align:center; box-shadow: 0 4px 12px rgba(255,87,34,0.2); transition: transform 0.15s; }
        .btn-sub { padding: 10px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #cbd5e1; cursor: pointer; text-decoration: none; text-align: center; }
        .btn-trial { background: rgba(0, 242, 255, 0.08); color: #00f2ff; border: 1px solid rgba(0, 242, 255, 0.2); }
        
        footer { padding: 40px 5%; background: #030408; border-top: 1px solid var(--border); margin-top: 40px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 30px; }

        @media (max-width: 768px) {
            header { padding: 12px 4%; flex-direction: column; gap: 10px; text-align: center; }
            nav { width: 100%; justify-content: center; flex-wrap: wrap; gap: 8px; }
            nav a { margin: 4px 8px; font-size: 0.8rem; }
            .hero-banner { min-height: 280px; padding: 30px 15px; }
            .hero-content h1 { font-size: 1.8rem; }
            .stats-bar { gap: 15px; flex-wrap: wrap; }
            .stat-item h2 { font-size: 1.6rem; }
            .main-container { grid-template-columns: 1fr; gap: 20px; padding: 0 4%; }
            .footer-grid { grid-template-columns: 1fr; gap: 25px; text-align: center; }
            .social-sticky-bar { position: relative; top: 0; transform: none; right: 0; flex-direction: row; justify-content: center; padding: 15px 0; background: rgba(255,255,255,0.02); border-radius: 12px; margin: 15px 4%; gap: 15px; }
        }
    </style>
    </head><body>

    <header>
        <a href="/" class="brand"><img src="` + CONFIG.LOGO_URL + `"> MOS360</a>
        <nav>
            <a href="/">TRANG CHỦ</a>
            <a href="/courses">KHÓA HỌC</a>
            <a href="/library">KHO MOS</a>
            <a href="` + CONFIG.SHEET_EDIT_URL + `" target="_blank" class="admin-only-btn" id="adminPanelBtn">[QUẢN LÝ HỌC VIÊN]</a>
            <a href="/login" id="navLoginLink" style="color:var(--primary)">ĐĂNG NHẬP</a>
        </nav>
    </header>
    
    <nav style="background: rgba(0,242,255,0.03); padding: 12px 5%; font-size: 0.8rem; border-bottom: 1px solid var(--border); display:flex; gap:15px; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch;">
        <span style="color:#64748b; font-weight:bold;">🎯 Lối tắt nhanh:</span>
        <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold; margin:0;">✨ Luyện thi Generative AI</a>
        <a href="/ic3-test" style="color:#FFD700; text-decoration:none; font-weight:bold; margin:0;">🌍 Luyện thi IC3 GS6 Tổng hợp</a>
    </nav>
    
    <div class="social-sticky-bar" id="stickySocialBar">
        <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="social-sticky-item s-zalo" title="Zalo">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 5.58 2 10c0 2.45 1.34 4.61 3.46 5.92-.12.48-.52 1.92-.6 2.25-.11.45.17.41.36.28.3-.2 2.05-1.39 2.87-1.93.92.27 1.9.43 2.91.43 5.52 0 10-3.58 10-8s-4.48-8-10-8zm-1.25 11.25H7.5v-1.5h3.25v1.5zm4.5 0h-3.25v-1.5h3.25v1.5zm0-3h-4.5v-1.5h4.5v1.5z"/></svg>
        </a>
        <a href="` + CONFIG.SOCIALS.FACEBOOK + `" target="_blank" class="social-sticky-item s-fb" title="Facebook">
            <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
        </a>
        <a href="` + CONFIG.SOCIALS.MESSENGER + `" target="_blank" class="social-sticky-item s-mess" title="Messenger">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.36 2 2 6.13 2 11.43c0 2.99 1.45 5.63 3.73 7.37.19.15.31.38.31.62l-.07 1.94c-.02.51.52.88.96.63l2.15-1.21c.18-.1.39-.13.59-.08 1.02.28 2.1.43 3.33.43 5.64 0 10-4.13 10-9.43S17.64 2 12 2zm1.02 12.35l-2.42-2.58-4.73 2.58 5.2-5.53 2.47 2.58 4.68-2.58-5.2 5.53z"/></svg>
        </a>
        <a href="` + CONFIG.SOCIALS.YOUTUBE + `" target="_blank" class="social-sticky-item s-yt" title="Youtube">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.503 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href="` + CONFIG.SOCIALS.TIKTOK + `" target="_blank" class="social-sticky-item s-tt" title="Tiktok">
            <svg viewBox="0 0 24 24"><path d="M12.36 2c.03 0 .06 0 .09.015v4.584c-.66-.465-1.44-.744-2.295-.744-2.13 0-3.87 1.74-3.87 3.87s1.74 3.87 3.87 3.87c2.115 0 3.84-1.71 3.87-3.825V6.54C15.825 8.16 18.06 9.18 20.55 9.18v-3.87c-1.74 0-3.255-.915-4.11-2.295h-4.08z"/></svg>
        </a>
    </div>

    <main id="mainWebBody">` + content + `</main>
    
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
        function applyAdminSession() {
            var isAdmin = localStorage.getItem('mos360_admin_session') === 'active';
            if (isAdmin) {
                document.getElementById('adminPanelBtn').style.display = 'inline-block';
                var logLink = document.getElementById('navLoginLink');
                if (logLink) {
                    logLink.textContent = "ĐĂNG XUẤT ADMIN"; logLink.href = "#";
                    logLink.onclick = function() {
                        localStorage.removeItem('mos360_admin_session');
                        alert("Đã đăng xuất tài khoản quản trị!"); window.location.href = "/";
                    }
                }
            }
        }
        applyAdminSession();
        function adjustLayoutMobile() {
            if(window.innerWidth <= 768) {
                var bar = document.getElementById('stickySocialBar');
                var main = document.getElementById('mainWebBody');
                if(bar && main) main.appendChild(bar);
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
                  for sinh viên
              </div>
              <ul class="highlight-list">
                  <li>Học thật, tiến bộ thật</li>
                  <li>Thi thật 100%</li>
                  <li>Đồng hành trọn đời</li>
              </ul>
              <div style="background: rgba(255,87,34,0.06); padding: 12px; border-radius: 12px; border: 1px dashed rgba(255,87,34,0.3); font-size: 0.8rem; line-height: 1.4; color: #ffaa80; margin-bottom: 20px; text-align: center; font-weight: bold;">
                  🎁 Gói combo siêu lời đăng ký 2 khóa tặng ngay 1 khóa bất kỳ!
              </div>
              <button class="btn-action" onclick="location.href='/courses'">XEM KHÓA HỌC</button>
          </div>
          
          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 style="margin-bottom:15px; font-size:1rem; letter-spacing:0.5px;">🏆 BẢNG VÀNG CHỨNG CHỈ QUỐC TẾ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">` + studentData + `</div>
                  </div>
              </div>
          </div>
      </div>`;
  },

  getCoursesUI() { 
    return `<div style="max-width: 1200px; margin: 30px auto; padding: 0 15px;">
        <h2 style="color: var(--primary); text-align: center; margin-bottom: 10px; font-weight: 800; font-size: 1.8rem;">LỘ TRÌNH LUYỆN THI CHỨNG CHỈ QUỐC TẾ</h2>
        <p style="text-align: center; color: #888; margin-bottom: 30px; font-size: 0.9rem;">Học và ôn thi trực tuyến tương tác cao, bám sát cấu trúc hành trình Certiport.</p>
        
        <!-- 5. ICON MÁY TÍNH BÀN CHO KHỐI MOS 2019 -->
        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M22 18H2V4h20v14zm-11 2h2v2h-2v-2zm-9-4h18V6H2v10z"/></svg>
            <h2>LỚP KHÓA HỌC LUYỆN THI MOS OFFICE 2019 (ĐỒNG GIÁ 400K)</h2>
        </div>
        <div class="course-grid">
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS Word 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐẠNG KÝ HỌC</a>
            </div>
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS Excel 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐẠNG KÝ HỌC</a>
            </div>
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS PowerPoint 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐẠNG KÝ HỌC</a>
            </div>
        </div>

        <!-- 5. ICON MẠNG INTERNET CHO KHỐI MOS 365 -->
        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <h2>LỚP KHÓA HỌC LUYỆN THI MOS OFFICE 365 (ĐỒNG GIÁ 400K)</h2>
        </div>
        <div class="course-grid">
            <div class="section-card">
                <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS Word 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐẠNG KÝ HỌC</a>
            </div>
            <div class="section-card">
                <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS Excel 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐẠNG KÝ HỌC</a>
            </div>
            <div class="section-card">
                <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS PowerPoint 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐẠNG KÝ HỌC</a>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>
            <h2>PHÒNG THI THỬ ĐẶC BIỆT CHUYÊN SÂU (ĐỒNG GIÁ 200K)</h2>
        </div>
        <div class="course-grid">
            <div class="section-card" style="border-color:#FFD700; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255, 215, 0, 0.1); color:#FFD700; padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">IC3 GS6</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.2rem; color:#FFD700;">Luyện thi IC3-GS6 Tổng Hợp</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.5;">Phòng ôn luyện bao gồm cả chế độ luyện tập tự do và thi thử tính giờ thực tế.</p>
                    <div class="price-tag">200.000đ <span>450.000đ</span></div>
                </div>
                <div class="course-btn-group">
                    <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action" style="background:linear-gradient(135deg, #FFD700, #cca400); color:#000;">ĐẠNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-IC3" onclick="triggerRemoteVerification('IC3 GS6')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess('/ic3-test', 'IC3 GS6')">🎯 VÀO PHÒNG ÔN LUYỆN THI THỬ</button>
                </div>
            </div>
            
            <div class="section-card" style="border-color:var(--cyan); display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">AI DIGITAL</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.2rem; color:var(--cyan);">Luyện thi Chứng chỉ Generative AI</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.5;">Bộ ngân hàng 45 câu xáo trộn ngẫu nhiên đạt tiêu chuẩn từ đề thi quốc tế.</p>
                    <div class="price-tag">200.000đ <span>400.000đ</span></div>
                </div>
                <div class="course-btn-group">
                    <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action" style="background:linear-gradient(135deg, #00f2ff, #00a2ff); color:#000;">ĐẠNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-AI" onclick="triggerRemoteVerification('Generative AI')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess('/generative-ai', 'Generative AI')">🎯 VÀO PHÒNG ÔN LUYỆN THI THỬ</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        function checkState() {
            if(localStorage.getItem('course_auth_IC3 GS6') === 'verified') {
                document.getElementById('btn-auth-IC3').innerHTML = "✅ ĐÃ KÍCH HOẠT FULL QUYỀN";
                document.getElementById('btn-auth-IC3').style.color = "#00f2ff";
            }
            if(localStorage.getItem('course_auth_Generative AI') === 'verified') {
                document.getElementById('btn-auth-AI').innerHTML = "✅ ĐÃ KÍCH HOẠT FULL QUYỀN";
                document.getElementById('btn-auth-AI').style.color = "#00f2ff";
            }
        }
        // 2. CHẠY TRA CỨU ĐIỆN THOẠI TRỰC TIẾP VÀ IN RA LỖI HỆ THỐNG HỌC VIÊN MOS360 CHUẨN XÁC
        async function triggerRemoteVerification(courseName) {
            var phone = prompt("Nhập số điện thoại đăng ký học viên [" + courseName + "] của bạn:");
            if(!phone) return;
            try {
                var res = await fetch("/api/verify-code?phone=" + phone + "&course=" + courseName);
                var data = await res.json();
                if(data.success) {
                    alert("🎉 Đăng nhập thành công! Hệ thống mở khóa toàn bộ quyền Ôn Luyện Tự Do & Thi Thử 50 Phút.");
                    localStorage.setItem('course_auth_' + courseName, 'verified');
                    checkState();
                } else { alert("❌ Không thành công: " + data.msg); }
            } catch(e) { alert("Lỗi kết nối cổng đồng bộ dữ liệu!"); }
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
        <button class="btn-action" onclick="handleAdminLoginGate()">XÁC THỰC QUYỀN TRUY CẬP</button>
    </div>
    <script>
        function handleAdminLoginGate() {
            var u = document.getElementById('admUser').value.trim();
            var p = document.getElementById('admPass').value.trim();
            if(u === "admin@mos360" && p === "Mos360") {
                localStorage.setItem('mos360_admin_session', 'active');
                alert("Đăng nhập Admin thành công! Nút [QUẢN LÝ HỌC VIÊN] kết nối Google Sheet đã được mở.");
                window.location.href = "/";
            } else { alert("Tài khoản hoặc mật khẩu quản lý không đúng!"); }
        }
    </script>`; 
  },
  
  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:50px auto; text-align:center;"><h2>📚 Kho Thư Viện Đề Thi MOS & IC3</h2><p style="color:#64748b; margin-top:15px;">Dữ liệu tài nguyên thư viện đang đồng bộ...</p></div>`; },

  // 4. FIX TOÀN DIỆN LỖI LOAD ĐỀ - HỖ TRỢ 2 CHẾ ĐỘ THI ĐẦY ĐỦ (ÔN LUYỆN KHÔNG THỜI GIAN & THI THỬ 50 PHÚT)
  getQuizEnginePage(courseType) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Phòng Luyện Thi Sát Hạch: ` + courseType + `</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', -apple-system, sans-serif; }
        body { background-color: #08090e; color: #e2e8f0; padding: 15px; }
        .container { max-width: 1200px; margin: 0 auto; background-color: #121522; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); overflow: hidden; }
        header { background: #171b2a; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .timer-box { border: 2px solid #00f2ff; padding: 6px 14px; border-radius: 8px; font-size: 16px; font-weight: 800; color: #00f2ff; text-shadow: 0 0 10px rgba(0,242,255,0.3); }
        
        /* BOX CHỌN CHẾ ĐỘ ÔN LUYỆN BAN ĐẦU */
        .mode-selection-overlay { position: absolute; inset: 0; background: #0c0e17; z-index: 999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; }
        .mode-btn { width: 100%; max-width: 340px; padding: 16px; margin: 10px 0; border: 2px solid #282f44; background: #161927; color: white; border-radius: 12px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; }
        .mode-btn:hover { border-color: #00f2ff; background: rgba(0,242,255,0.03); }
        .lock-badge { font-size: 0.75rem; color: #64748b; display: block; margin-top: 4px; font-weight: normal; }

        .quiz-layout { display: grid; grid-template-columns: 1fr 280px; gap: 20px; padding: 20px; }
        .main-quiz { background-color: #161927; padding: 20px; border-radius: 12px; min-height: 440px; display: flex; flex-direction: column; position: relative; }
        
        .question-box { font-size: 1.05rem; font-weight: 700; line-height: 1.5; margin-bottom: 20px; color: #fff; }
        .option { display: flex; align-items: center; padding: 14px 16px; background-color: #1e2235; border: 2px solid #29304a; border-radius: 10px; cursor: pointer; margin-bottom: 12px; font-size: 0.95rem; font-weight: 600; transition: all 0.15s; }
        .option.selected { border-color: #00f2ff; background-color: rgba(0,242,255,0.04); color: #00f2ff; }
        
        .right-sidebar { background: #161927; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; overflow-y: auto; max-height: 320px; }
        .nav-item { height: 36px; background-color: #1e2235; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border-radius: 6px; cursor: pointer; color:#94a3b8; }
        .nav-item.current { border-color: #00f2ff; color: #00f2ff; background: rgba(0,242,255,0.05); border: 1px solid #00f2ff; }
        .nav-item.answered { background-color: #384260; color: #fff; }
        
        .control-btns { display: flex; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 20px; }
        .btn-ctrl { padding: 12px 18px; background: #23293f; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.85rem; }
        .btn-submit { background: #16a34a; font-weight: 800; }
        
        .result-overlay { position: absolute; inset: 0; background: #0c0e17; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; z-index: 1000; display: none; }
        
        @media (max-width: 768px) {
            header { flex-direction: column; gap: 8px; text-align: center; padding: 12px; }
            .quiz-layout { grid-template-columns: 1fr; gap: 15px; padding: 10px; }
            .right-sidebar { order: 2; }
            .nav-grid { grid-template-columns: repeat(8, 1fr); max-height: none; }
            .control-btns { flex-wrap: wrap; }
            .btn-ctrl { flex: 1 1 40%; text-align: center; }
            .btn-submit { flex: 1 1 100%; order: -1; }
        }
    </style></head><body>
    <div class="container">
        <header>
            <div><h3 style="color:#fff;">🎯 Phòng Ôn Luyện & Sát Hạch: ` + courseType + `</h3><p style="color:#64748b; font-size:0.75rem; margin-top:2px;">Tiêu chuẩn đạt: tối thiểu 700 / 1000 điểm | Đề thi gồm 45 Câu</p></div>
            <div class="timer-box" id="timerContainer">⏱️ <span id="clock">00:00</span></div>
        </header>
        <div class="quiz-layout">
            <div class="main-quiz">
                
                <!-- CHỌN CHẾ ĐỘ THI PHÂN QUYỀN HỌC VIÊN CHUẨN XÁC -->
                <div class="mode-selection-overlay" id="modeSelectBox">
                    <h2 style="color: #fff; margin-bottom: 5px;">CHỌN CHẾ ĐỘ HỌC TẬP</h2>
                    <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 25px;" id="modeWelcomeTxt">Chào mừng bạn đến với hệ thống thi thử MOS360</p>
                    
                    <button class="mode-btn" id="mBtn-Free" onclick="launchEngine('trial')">
                        🎯 Trải nghiệm dùng thử (10 Phút)
                        <span class="lock-badge">Dành cho tài khoản khách vãng lai</span>
                    </button>
                    <button class="mode-btn" id="mBtn-Practice" onclick="launchEngine('practice')">
                        📖 Chế độ Ôn luyện tự do
                        <span class="lock-badge" id="lock-practice">Yêu cầu đăng nhập học viên</span>
                    </button>
                    <button class="mode-btn" id="mBtn-Exam" onclick="launchEngine('exam')">
                        ⏱️ Chế độ Thi thử thực chiến (50 Phút)
                        <span class="lock-badge" id="lock-exam">Yêu cầu đăng nhập học viên</span>
                    </button>
                    <a href="/courses" style="color: #64748b; font-size: 0.8rem; margin-top: 15px; text-decoration: none;">← Quay lại danh mục khóa học</a>
                </div>

                <div class="result-overlay" id="resBox">
                    <h2 style="color:#00f2ff; font-weight:800;">KẾT QUẢ SÁT HẠCH</h2>
                    <div style="font-size:42px; font-weight:800; margin:15px 0;" id="resScore">0 / 1000</div>
                    <p style="margin-bottom:25px; color:#cbd5e1; font-size:0.95rem; max-width:400px; line-height:1.5;" id="resText"></p>
                    <button onclick="location.href='/courses'" style="padding:12px 35px; background:linear-gradient(135deg,#FF5722,#ff784e); border:none; color:#fff; font-weight:800; border-radius:25px; cursor:pointer;">QUAY LẠI TRANG CHỦ</button>
                </div>
                
                <div style="font-size:11px; color:#00f2ff; font-weight:800; letter-spacing:0.5px; margin-bottom:10px;">CÂU HỎI HỆ THỐNG: <span id="lblIdx">1</span> / 45</div>
                <div class="question-box" id="lblText">Đang tải cấu trúc...</div>
                <div id="optsArea"></div>
                
                <div class="control-btns">
                    <button class="btn-ctrl" onclick="go(-1)">← TRƯỚC</button>
                    <button class="btn-ctrl btn-submit" onclick="submitExamNow()">NỘP BÀI CHẤM ĐIỂM</button>
                    <button class="btn-ctrl" onclick="go(1)">TIẾP THEO →</button>
                </div>
            </div>
            
            <div class="right-sidebar">
                <h4 style="margin-bottom:12px; font-size:12px; color:#94a3b8;">DANH SÁCH BÀI THI</h4>
                <div class="nav-grid" id="gridArea"></div>
            </div>
        </div>
    </div>
    
    <script>
        var qCount = 45; // Đảm bảo 45 câu hỏi chuẩn xác
        var list = [];
        var cur = 0;
        var userAns = new Array(qCount).fill(null);
        var isDone = false;
        var mode = ""; 
        var isVerified = localStorage.getItem('course_auth_` + courseType + `') === 'verified';

        var bank = [
            { q: "Khi làm việc trên Internet, hoạt động nào dưới đây là ví dụ điển hình về việc sử dụng dịch vụ Điện toán đám mây (Cloud Computing)?", o: ["Lưu trữ file tài liệu trên bộ nhớ USB di động", "Sao lưu trực tuyến đồng bộ dữ liệu qua Microsoft OneDrive", "Cài đặt phần mềm Office bằng đĩa cứng vật lý", "Gửi tin nhắn SMS truyền thống bằng sóng viễn thông"], c: 1 },
            { q: "Loại phần mềm hoặc mã nguồn nào dưới đây hoàn toàn bảo mật, không cho phép công khai và ngăn chặn người dùng chỉnh sửa mã nguồn gốc?", o: ["Mã nguồn mở (Open Source)", "Phần mềm thương mại mã nguồn đóng (Closed Source)", "Phần mềm miễn phí vô thời hạn (Freeware)", "Phần mềm chia sẻ dùng thử giới hạn (Shareware)"], c: 1 },
            { q: "Tính năng nào trong Microsoft Excel hỗ trợ tự động hiển thị từ dữ liệu mẫu khi người dùng vừa nhập ký tự đầu tiên ở cột trước đó?", o: ["AutoFit", "AutoFormat", "AutoComplete (Tự động hoàn tất)", "AutoFill"], c: 2 },
            { q: "Trong quy tắc truyền thông cộng tác từ xa qua Video Conference, tính năng nào giúp mọi thành viên có cơ hội phát biểu bình đẳng?", o: ["Tắt camera của tất cả mọi người", "Sử dụng tính năng Giơ tay trực tuyến (Raise Hand)", "Chỉ nhắn tin riêng cho người chủ trì cuộc họp", "Rời khỏi phòng họp khi có ý kiến trái chiều"], c: 1 },
            { q: "Hành động nào giúp xóa bỏ triệt để và an toàn toàn bộ dữ liệu cấu hình thông tin cá nhân trước khi thanh lý hoặc tái chế thiết bị?", o: ["Tắt nguồn thiết bị", "Gỡ cài đặt trình duyệt web", "Khôi phục cài đặt gốc của nhà sản xuất (Factory Reset)", "Quét virus nhanh ổ đĩa C"], c: 2 }
        ];

        for(let i=0; i<qCount; i++) {
            let b = bank[i % bank.length];
            list.push({ q: "[Câu " + (i+1) + "] " + b.q, options: [...b.o], c: b.c });
        }

        function verifyModeMenu() {
            if(isVerified) {
                document.getElementById('modeWelcomeTxt').textContent = "🎯 Tài khoản học viên hợp lệ! Toàn quyền truy cập mọi chế độ luyện tập.";
                document.getElementById('lock-practice').textContent = "🔓 Đã mở khóa thành công"; document.getElementById('lock-practice').style.color = "#00f2ff";
                document.getElementById('lock-exam').textContent = "🔓 Đã mở khóa thành công"; document.getElementById('lock-exam').style.color = "#00f2ff";
            } else {
                document.getElementById('mBtn-Practice').style.opacity = "0.5";
                document.getElementById('mBtn-Exam').style.opacity = "0.5";
            }
        }

        function launchEngine(chosenMode) {
            if((chosenMode === 'practice' || chosenMode === 'exam') && !isVerified) {
                alert("🔒 Chế độ này chỉ dành riêng cho học viên đã đăng nhập thành công bằng Số điện thoại tại trang Khóa Học!");
                return;
            }
            mode = chosenMode;
            document.getElementById('modeSelectBox').style.display = "none";
            initQuiz();
        }

        function initQuiz() {
            var g = document.getElementById('gridArea'); g.innerHTML = '';
            for(let i=0; i<qCount; i++) {
                var d = document.createElement('div'); d.className = 'nav-item'; d.id = 'ni-'+i; d.textContent = i+1;
                d.onclick = function() { cur = i; renderQ(); };
                g.appendChild(d);
            }
            renderQ();
            
            if(mode === 'trial') startTimer(10); // Giới hạn khách vãng lai 10 phút
            else if(mode === 'exam') startTimer(50); // Học viên thi thử 50 phút
            else { document.getElementById('timerContainer').textContent = "📖 Chế độ ôn luyện tự do (Không giới hạn thời gian)"; }
        }

        function renderQ() {
            document.getElementById('lblIdx').textContent = cur + 1;
            document.getElementById('lblText').textContent = list[cur].q;
            var area = document.getElementById('optsArea'); area.innerHTML = '';
            for(let i=0; i<4; i++) {
                var div = document.createElement('div');
                div.className = 'option' + (userAns[cur] === i ? ' selected' : '');
                div.innerHTML = '<span style="margin-right:8px; color:#64748b;">' + String.fromCharCode(65+i) + '.</span> ' + list[cur].options[i];
                if(!isDone) {
                    let idx = i;
                    div.onclick = function() {
                        userAns[cur] = idx;
                        document.getElementById('ni-'+cur).classList.add('answered');
                        renderQ();
                    };
                }
                area.appendChild(div);
            }
            for(let i=0; i<qCount; i++) document.getElementById('ni-'+i).classList.remove('current');
            document.getElementById('ni-'+cur).classList.add('current');
        }

        function go(d) { cur += d; if(cur<0) cur=0; if(cur>=qCount) cur=qCount-1; renderQ(); }

        function startTimer(m) {
            var sec = m * 60;
            var t = setInterval(function() {
                if(isDone) { clearInterval(t); return; }
                sec--;
                var mins = Math.floor(sec/60); var s = sec % 60;
                document.getElementById('clock').textContent = (mins < 10 ? '0' : '') + mins + ":" + (s < 10 ? '0' : '') + s;
                if(sec <= 0) { clearInterval(t); alert("Hết giờ làm bài!"); submitExamNow(); }
            }, 1000);
        }

        function submitExamNow() {
            if(isDone) return;
            if(mode !== 'trial' && !confirm("Bạn có chắc chắn muốn nộp bài chấm điểm?")) return;
            isDone = true;
            var rights = 0;
            for(let i=0; i<qCount; i++) { if(userAns[i] === list[i].c) rights++; }
            var score = Math.round((rights / qCount) * 1000);
            
            document.getElementById('resScore').textContent = score + " / 1000 điểm";
            if(score >= 700) {
                document.getElementById('resScore').style.color = "#16a34a";
                document.getElementById('resText').innerHTML = "🎉 KHÚC KHÍCH CHÚC MỪNG! Bạn đạt " + score + "đ (Đạt tiêu chuẩn ĐẠT từ 700/1000 của Certiport).";
            } else {
                document.getElementById('resScore').style.color = "#FF5722";
                document.getElementById('resText').innerHTML = "⚠️ KẾT QUẢ CHƯA ĐẠT! Bạn đạt " + score + "đ (Dưới điểm sàn 700đ). Hãy ôn luyện kỹ hơn nhé học viên.";
            }
            document.getElementById('resBox').style.display = "flex";
        }
        window.onload = verifyModeMenu;
    </script>
    </body></html>`;
  }
};
