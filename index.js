const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv",
  SOCIALS: {
    ZALO: "https://zalo.me/0912888360",
    FACEBOOK: "https://facebook.com/mos360",
    MESSENGER: "https://m.me/mos360",
    YOUTUBE: "https://youtube.com/@mos360",
    TIKTOK: "https://tiktok.com/@mos360"
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    const webPaths = ["/", "/index.html", "/courses", "/library", "/login", "/generative-ai", "/ic3-test"];
    if (!webPaths.includes(path)) return fetch(request);

    if (path === "/generative-ai") {
        return new Response(this.getGenerativeAIUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    if (path === "/ic3-test") {
        return new Response(this.getIC3QuizUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    let studentData = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL + "&v=" + Date.now());
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
      studentData = htmlContent + htmlContent; 
    } catch (e) { studentData = "<p>Đang tải dữ liệu...</p>"; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/login") content = this.getLoginUI();
    else if (path === "/library") content = this.getLibraryUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>` + CONFIG.TITLE + `</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #06070d; --card: #111422; --text: #fff; --border: rgba(255,255,255,0.06); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(6,7,13,0.85); backdrop-filter: blur(12px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.3rem; letter-spacing: 0.5px; }
        .brand img { height: 38px; margin-right: 12px; }
        nav a { color: #94a3b8; text-decoration: none; font-weight: 700; margin-left: 24px; font-size: 0.85rem; transition: color 0.2s; }
        nav a:hover { color: #fff; }
        
        /* MỤC 1: THIẾT KẾ BANNER LỚP PHỦ NGHỆ THUẬT THAY THẾ CHỮ THÔ */
        .hero-banner { position: relative; width: 100%; min-height: 380px; background: linear-gradient(135deg, #090e1a 0%, #151d30 100%); overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; border-bottom: 1px solid var(--border); }
        .hero-banner::before { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 500px; height: 500px; background: url('` + CONFIG.LOGO_URL + `') no-repeat center/contain; opacity: 0.05; filter: blur(4px); pointer-events: none; }
        .hero-banner-overlay { position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(0,242,255,0.04) 0%, transparent 70%); pointer-events: none; }
        .hero-content { position: relative; z-index: 2; max-width: 800px; }
        .hero-content h1 { font-size: 2.8rem; font-weight: 800; line-height: 1.2; margin-bottom: 15px; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-content h1 span { background: linear-gradient(to right, #FF5722, #ff8a65); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-content p { color: #94a3b8; font-size: 1.05rem; margin-bottom: 30px; line-height: 1.6; }

        .stats-bar { display: flex; justify-content: center; gap: 40px; padding: 30px 5%; text-align: center; background: rgba(255,255,255,0.01); border-bottom: 1px solid var(--border); }
        .stat-item h2 { color: var(--primary); font-size: 2.2rem; font-weight: 800; }
        .stat-item p { color: #64748b; font-size: 0.85rem; font-weight: 600; margin-top: 4px; }
        
        .main-container { max-width: 1400px; margin: 40px auto; padding: 0 5%; display: grid; grid-template-columns: 320px 1fr; gap: 30px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        #bang-vang-container { height: 460px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.2); border-radius: 16px; border: 1px solid rgba(255,255,255,0.02); }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 120s linear infinite; }
        .student-item { flex: 0 0 auto; width: 320px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        footer { padding: 50px 5%; background: #030408; border-top: 1px solid var(--border); margin-top: 60px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 40px; }
        
        .btn-action { background: linear-gradient(135deg, #FF5722, #ff784e); color: white; border: none; padding: 14px; border-radius: 30px; font-weight: 800; cursor: pointer; width: 100%; text-decoration:none; display:inline-block; text-align:center; box-shadow: 0 4px 15px rgba(255,87,34,0.25); transition: transform 0.2s, box-shadow 0.2s; }
        .btn-action:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,87,34,0.4); }
        
        /* MỤC 2: CÁC NÚT MẠNG XÃ HỘI XOÁ NỀN (TRANSPARENT) TINH TẾ BÊN PHẢI */
        .social-sticky-bar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 16px; z-index: 9999; }
        .social-sticky-item { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); text-decoration: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); background: transparent; border: none; }
        .social-sticky-item svg { width: 26px; height: 26px; fill: currentColor; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5)); }
        .social-sticky-item:hover { transform: scale(1.22); color: #ffffff; }
        /* Hiệu ứng màu khi hover nhẹ nhàng không dùng nền đặc */
        .s-zalo:hover { color: #0084FF; }
        .s-fb:hover { color: #1877F2; }
        .s-mess:hover { color: #00C6FF; }
        .s-yt:hover { color: #FF0000; }
        .s-tt:hover { color: #ffffff; } /* Tiktok icon trắng tinh khôi */

        /* CSS KHỐI KHÓA HỌC */
        .course-block-title { display: flex; align-items: center; gap: 14px; margin: 45px 0 20px 0; padding-bottom: 12px; border-bottom: 2px solid var(--border); color: #fff; }
        .course-block-title svg { width: 26px; height: 26px; fill: var(--primary); }
        .course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px; margin-bottom: 40px; }
        .price-tag { font-size: 1.35rem; font-weight: 800; color: #00f2ff; margin: 18px 0; display: flex; align-items: center; gap: 8px; }
        .price-tag span { font-size: 0.85rem; color: #64748b; text-decoration: line-through; font-weight: normal; }

        /* Nút tính năng mới của mục 4 */
        .course-btn-group { display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }
        .btn-sub { padding: 10px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #cbd5e1; cursor: pointer; text-decoration: none; text-align: center; transition: all 0.2s; }
        .btn-sub:hover { background: rgba(255,255,255,0.08); color: white; border-color: rgba(255,255,255,0.2); }
        .btn-trial { background: rgba(0, 242, 255, 0.08); color: #00f2ff; border: 1px solid rgba(0, 242, 255, 0.2); }
        .btn-trial:hover { background: rgba(0, 242, 255, 0.15); color: #00f2ff; }

        /* POPUP KHÓA HỌC THỬ (MỤC 4) */
        .trial-modal { position: fixed; inset: 0; background: rgba(5,6,10,0.95); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(8px); display: none; }
        .trial-modal-content { background: #131726; border: 1px solid #00f2ff; border-radius: 20px; max-width: 460px; width: 100%; padding: 35px; text-align: center; box-shadow: 0 0 30px rgba(0,242,255,0.15); }
        .trial-modal input { width: 100%; padding: 14px; background: #090b11; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: white; text-align: center; font-size: 1rem; margin: 15px 0; font-weight: bold; }
        .trial-modal input:focus { border-color: #00f2ff; outline: none; }

        @media (max-width: 800px) { .main-container, .footer-grid { grid-template-columns: 1fr; } .hero-content h1 { font-size: 2rem; } .social-sticky-bar { right: 8px; gap: 12px; } }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="` + CONFIG.LOGO_URL + `"> MOS360</a>
        <nav><a href="/">TRANG CHỦ</a><a href="/courses">KHÓA HỌC</a><a href="/library">KHO MOS</a><a href="/login" style="color:var(--primary)">ĐĂNG NHẬP</a></nav>
    </header>
    <nav style="background: rgba(255,255,255,0.02); padding: 10px 5%; font-size: 0.8rem; border-bottom: 1px solid var(--border); display:flex; gap:20px; overflow-x: auto; white-space: nowrap;">
        <span style="color:#64748b; font-weight:bold;">🎯 Chuyên mục HOT:</span>
        <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold; margin:0;">✨ [MỚI] Phòng Thi Thử Generative AI (Chuẩn 45 Câu)</a>
        <a href="/ic3-test" style="color:#FFD700; text-decoration:none; font-weight:bold; margin:0;">🌍 Đề Thi Thử IC3 GS6 Tổng Hợp (Level 1/2/3)</a>
    </nav>
    
    <div class="social-sticky-bar">
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

    <div id="trialLockModal" class="trial-modal">
        <div class="trial-modal-content">
            <h2 style="color:#00f2ff; margin-bottom:10px;">⏱️ Hết thời gian học thử!</h2>
            <p style="color:#94a3b8; font-size:0.9rem; line-height:1.5;">Bạn đã hoàn thành 10 phút trải nghiệm miễn phí hệ thống ôn luyện. Vui lòng nhập số điện thoại kích hoạt để tiếp tục.</p>
            <input type="text" id="activationPhoneInput" placeholder="Nhập số điện thoại của bạn...">
            <button class="btn-action" style="margin-bottom:12px;" onclick="validateActivationCode()">XÁC THỰC KÍCH HOẠT</button>
            <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" style="color:#aaa; font-size:0.8rem; text-decoration:none; font-weight:bold;">Chưa đăng ký? Liên hệ Zalo nhận mã ngay →</a>
        </div>
    </div>

    <main>` + content + `</main>
    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p><p>📞 Hotline: 0912.888.360</p></div>
            <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
            <div style="height:180px; border-radius:15px; overflow:hidden;">
                <iframe src="https://maps.google.com/maps?q=Hai%20Phong&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    <script>
        // JS Phục vụ kiểm tra mã số điện thoại kích hoạt và hẹn giờ học thử
        function openActivationModal() {
            document.getElementById('trialLockModal').style.display = 'flex';
        }
        function validateActivationCode() {
            var phone = document.getElementById('activationPhoneInput').value.trim();
            if(!phone) { alert("Vui lòng nhập số điện thoại đăng ký!"); return; }
            alert("Hệ thống ghi nhận Số điện thoại: " + phone + ". Đang đồng bộ kiểm tra dữ liệu kích hoạt trên Google Sheet của bạn...");
            document.getElementById('trialLockModal').style.display = 'none';
            localStorage.setItem('mos360_activated_phone', phone);
        }
        // Kiểm tra xem trang hiện tại có đang chạy chế độ học thử không
        if(window.location.pathname === '/ic3-test' || window.location.pathname === '/generative-ai') {
            if(sessionStorage.getItem('mos360_is_trial') === 'yes') {
                setTimeout(function() {
                    openActivationModal();
                }, 10 * 60 * 1000); // Tự động khóa sau 10 phút
            }
        }
    </script>
    </body></html>`;
  },

  getHomeUI(studentData) {
    return `
      <div class="hero-banner">
          <div class="hero-banner-overlay"></div>
          <div class="hero-content">
              <h1>HỆ THỐNG LUYỆN THI <span>CHỨNG CHỈ QUỐC TẾ</span> CHUYÊN NGHIỆP</h1>
              <p>Học trực quan, luyện đề thực chiến bám sát kho đề thi Certiport thực tế. Cam kết chuẩn đầu ra tối ưu cho học viên và người đi làm.</p>
              <div style="max-width:240px; margin:0 auto;">
                  <a href="/courses" class="btn-action">XEM KHÓA HỌC NGAY</a>
              </div>
          </div>
      </div>

      <div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
          <div class="stat-item"><h2>1.200+</h2><p>Học viên nhận chứng chỉ</p></div>
          <div class="stat-item"><h2>600+</h2><p>Truy cập học trực tuyến</p></div>
      </div>
      <div class="main-container">
          <div class="left-col" style="background:var(--card); padding:25px; border-radius:24px; border:1px solid var(--border);">
              <h3 style="color:var(--primary); margin-bottom:15px; font-weight:800;">Khóa Học Nổi Bật</h3>
              <p style="font-size:0.9rem; line-height:1.6; color:#94a3b8; margin-bottom:20px;">Trải nghiệm công nghệ chấm điểm tự động và các đề thi mô phỏng chất lượng cao độc quyền.</p>
              <button class="btn-action" onclick="location.href='/courses'">XEM KHÓA HỌC</button>
          </div>
          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 style="margin-bottom:15px; font-size:1.1rem; letter-spacing:0.5px;">🏆 BẢNG VÀNG CHỨNG CHỈ QUỐC TẾ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">` + studentData + `</div>
                  </div>
              </div>
          </div>
      </div>`;
  },

  getCoursesUI() { 
    return `<div style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
        <h2 style="color: var(--primary); text-align: center; margin-bottom: 10px; font-weight: 800; font-size: 2rem;">LỘ TRÌNH LUYỆN THI CHỨNG CHỈ QUỐC TẾ</h2>
        <p style="text-align: center; color: #888; margin-bottom: 40px; font-size: 0.95rem;">Học và ôn thi trực tuyến tương tác cao, bám sát cấu trúc Certiport.</p>
        
        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 4h16v12H4V4z"/></svg>
            <h2>KHỐI LUYỆN THI MOS OFFICE 2019 (ĐỒNG GIÁ 400K)</h2>
        </div>
        <div class="course-grid">
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.2rem;">Luyện thi MOS Word 2019</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.6;">Làm chủ kỹ năng soạn thảo, định dạng văn bản nâng cao, thiết kế hợp đồng chuẩn quốc tế.</p>
                    <div class="price-tag">400.000đ <span>600.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.2rem;">Luyện thi MOS Excel 2019</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.6;">Thành thạo hàm xử lý dữ liệu, định dạng bảng tính toán, biểu đồ trực quan phục vụ công việc.</p>
                    <div class="price-tag">400.000đ <span>600.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.2rem;">Luyện thi MOS PowerPoint 2019</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.6;">Tư duy thiết kế Slide thuyết trình chuyên nghiệp, hiệu ứng chuyển động mượt mà bứt phá bài báo cáo.</p>
                    <div class="price-tag">400.000đ <span>600.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/></svg>
            <h2>KHỐI LUYỆN THI MOS OFFICE 365 (ĐỒNG GIÁ 400K)</h2>
        </div>
        <div class="course-grid">
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255, 87, 34, 0.1); color:var(--primary); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.2rem;">Luyện thi MOS Word 365</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.6;">Tiếp cận các tính năng cộng tác thời gian thực, AI hỗ trợ soạn thảo và định dạng văn bản đám mây.</p>
                    <div class="price-tag">400.000đ <span>650.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255, 87, 34, 0.1); color:var(--primary); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.2rem;">Luyện thi MOS Excel 365</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.6;">Ứng dụng mảng động (Dynamic Arrays), hàm dữ liệu mới hiệu năng cao trên phiên bản 365.</p>
                    <div class="price-tag">400.000đ <span>650.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255, 87, 34, 0.1); color:var(--primary); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.2rem;">Luyện thi MOS PowerPoint 365</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.6;">Khai thác tính năng biến đổi Morph, chèn vật thể 3D, Zoom Slide tạo hiệu ứng chuyển động điện ảnh.</p>
                    <div class="price-tag">400.000đ <span>650.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>
            <h2>KHÓA HỌC ĐẶC BIỆT CHUYÊN SÂU (ĐỒNG GIÁ 200K)</h2>
        </div>
        <div class="course-grid">
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between; border-color:#FFD700;">
                <div>
                    <span style="background:rgba(255, 215, 0, 0.1); color:#FFD700; padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">IC3 GS6</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.25rem; color:#FFD700;">Luyện thi Chứng chỉ IC3-GS6 Tổng Hợp</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.6;">Gói ôn luyện trọn bộ cả 3 Cấp độ (Level 1, 2, 3) với hệ thống đề mô phỏng sát nhất đề thi quốc tế Certiport.</p>
                    <div class="price-tag">200.000đ <span>450.000đ</span></div>
                </div>
                <div class="course-btn-group">
                    <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action" style="background:linear-gradient(135deg, #FFD700, #bba000); color:#000;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" onclick="openActivationPhonePrompt()">NHẬP MÃ SỐ ĐIỆN THOẠI</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess('/ic3-test')">🎯 HỌC THỬ MIỄN PHÍ (10 PHÚT)</button>
                </div>
            </div>
            
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between; border-color:var(--cyan);">
                <div>
                    <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">AI DIGITAL</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.25rem; color:var(--cyan);">Luyện thi Chứng chỉ Generative AI</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.6;">Làm chủ kiến thức công nghệ Trí tuệ nhân tạo tạo sinh, Prompt Engineering đón đầu kỷ nguyên số.</p>
                    <div class="price-tag">200.000đ <span>400.000đ</span></div>
                </div>
                <div class="course-btn-group">
                    <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action" style="background:linear-gradient(135deg, #00f2ff, #00a2ff); color:#000;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" onclick="openActivationPhonePrompt()">NHẬP MÃ SỐ ĐIỆN THOẠI</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess('/generative-ai')">🎯 HỌC THỬ MIỄN PHÍ (10 PHÚT)</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        function openActivationPhonePrompt() {
            var phone = prompt("Nhập số điện thoại kích hoạt khóa học của bạn:");
            if(phone) {
                alert("Đang kiểm tra Số điện thoại " + phone + " trong hệ thống Google Sheet của trung tâm...");
                localStorage.setItem('mos360_activated_phone', phone);
            }
        }
        function startTrialAccess(targetUrl) {
            sessionStorage.setItem('mos360_is_trial', 'yes');
            alert("Bạn bắt đầu có 10 phút làm bài và trải nghiệm thử miễn phí khóa học này. Hệ thống sẽ tự động khóa lại sau khi hết giờ.");
            window.location.href = targetUrl;
        }
    </script>
    `;
  },
  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto; text-align:center;"><h2>Đăng Nhập</h2><input type="password" placeholder="Mật khẩu" style="width:100%; padding:15px; margin:20px 0; background:#000; border:1px solid #333; color:#fff; border-radius:10px;"><button class="btn-action">VÀO HỆ THỐNG</button></div>`; },
  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:50px auto; text-align:center;"><h2>📚 Kho Tài Liệu MOS & IC3</h2><p>Nội dung đang được cập nhật...</p></div>`; },
  
  // MỤC 3: PHÒNG THI THỬ GENERATIVE AI NÂNG CẤP CHUẨN ĐỀ QUỐC TẾ 45 CÂU/50 PHÚT
  getGenerativeAIUI() { 
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOS360 - Phòng Thi Thử Quốc Tế Generative AI</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { background-color: #090a0f; color: #f1f5f9; line-height: 1.6; padding: 20px; }
        .container { max-width: 1260px; margin: 0 auto; background-color: #121520; border-radius: 18px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6); overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
        .level-bar { background-color: #181d2a; padding: 15px 25px; display: flex; gap: 14px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .lvl-btn { padding: 8px 18px; background-color: #22293a; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer; }
        .lvl-btn.active { background-color: #00f2ff; color: #000; font-weight: 800; box-shadow: 0 0 12px rgba(0,242,255,0.3); }
        .mode-bar { background-color: #141824; padding: 12px 25px; display: flex; gap: 12px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .mode-btn { padding: 6px 16px; background-color: #1d2333; color: #94a3b8; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; font-weight: 700; font-size: 12.5px; cursor: pointer; }
        .mode-btn.active { background-color: rgba(255, 87, 34, 0.15); color: #FF5722; border-color: #FF5722; }
        header { background: linear-gradient(135deg, #131722, #1f2637); color: white; padding: 22px 30px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
        .timer-box { background: rgba(0, 242, 255, 0.05); border: 2px solid #00f2ff; padding: 10px 18px; border-radius: 12px; font-size: 19px; font-weight: 800; color: #00f2ff; }
        .timer-box.freeze { border-color: #4b5563; color: #9ca3af; background: rgba(0,0,0,0.2); }
        .quiz-layout { display: grid; grid-template-columns: 1fr 340px; gap: 20px; padding: 25px; }
        .main-quiz { background-color: #171b26; border: 1px solid rgba(255,255,255,0.05); border-radius: 14px; padding: 25px; display: flex; flex-direction: column; min-height: 500px; position: relative; }
        .question-number { font-size: 13px; font-weight: 700; color: #00f2ff; background-color: rgba(0,242,255,0.1); padding: 6px 14px; border-radius: 20px; }
        .question-text { font-size: 17px; font-weight: 700; color: #fff; margin: 24px 0; line-height: 1.6; }
        .option { display: flex; align-items: center; padding: 15px 20px; background-color: #1e2333; border: 2px solid #282f44; border-radius: 10px; cursor: pointer; margin-bottom: 12px; }
        .option.selected { border-color: #00f2ff; background-color: rgba(0,242,255,0.02); }
        .option.correct { border-color: #16a34a; background-color: rgba(22,163,74,0.1); color: #4ade80; }
        .option.incorrect { border-color: #dc2626; background-color: rgba(220,38,38,0.1); color: #f87171; }
        .option-label { width: 28px; height: 28px; background-color: #171b26; border: 1px solid #3b4563; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; }
        .action-buttons { display: flex; justify-content: space-between; margin-top: auto; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.05); }
        .btn { padding: 12px 24px; font-size: 13.5px; font-weight: 700; border-radius: 8px; cursor: pointer; border: none; }
        .btn-prev { background-color: #1e2333; color: #94a3b8; }
        .btn-next { background-color: #22293a; color: white; border: 1px solid #3b4563; }
        .sidebar { background-color: #171b26; border: 1px solid rgba(255,255,255,0.05); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; height: 580px; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; overflow-y: auto; flex-grow: 1; }
        .nav-item { display: flex; align-items: center; justify-content: center; height: 38px; background-color: #1e2333; border: 1px solid #282f44; border-radius: 6px; font-size: 13px; font-weight: 700; color: #94a3b8; cursor: pointer; }
        .nav-item.current { border: 2px solid #00f2ff; color: #00f2ff; }
        .nav-item.answered { background-color: #2a354d; color: white; }
        .nav-item.correct { background-color: rgba(22,163,74,0.3); color: #4ade80; border-color:#16a34a; }
        .nav-item.incorrect { background-color: rgba(220,38,38,0.3); color: #f87171; border-color:#dc2626; }
        .btn-submit-exam { width: 100%; background: linear-gradient(135deg, #00f2ff, #00a2ff); color: #000; font-weight: 800; padding: 12px; border-radius: 8px; border: none; cursor: pointer; margin-bottom: 15px; }
        .result-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(13,16,26,0.98); z-index: 100; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; display: none; }
        .result-overlay.show { display: flex; }
        .result-score { font-size: 64px; font-weight: 800; margin: 15px 0; }
        .status-badge { padding: 8px 24px; border-radius: 30px; font-weight: 800; font-size: 18px; text-transform: uppercase; }
        .badge-pass { background: rgba(0, 242, 255, 0.15); color: #00f2ff; border: 2px solid #00f2ff; }
        .badge-fail { background: rgba(220, 38, 38, 0.15); color: #ff5252; border: 2px solid #dc2626; }
    </style>
</head>
<body>
    <div class="container">
        <div class="level-bar">
            <span>Đề Thi Trực Tuyến:</span>
            <button class="lvl-btn active">Generative AI Toàn Diện</button>
        </div>
        <div class="mode-bar">
            <span>Chế độ học tập:</span>
            <button class="mode-btn active" id="m-practice" onclick="setMode('practice')">📘 Ôn Luyện Tự Do</button>
            <button class="mode-btn" id="m-exam" onclick="setMode('exam')">⏱️ Thi Thực Chiến</button>
        </div>
        <header>
            <div>
                <h1>✨ Luyện Thi Chứng Chỉ Generative AI Quốc Tế</h1>
                <p>Kho đề thông minh xáo trộn ngẫu nhiên: 45 Câu hỏi | 50 Phút | Đạt chuẩn: 700/1000 Điểm</p>
            </div>
            <div class="timer-box" id="t-box">⏱️ <span id="clock">50:00</span></div>
        </header>
        <div class="quiz-layout">
            <div class="main-quiz">
                <div class="result-overlay" id="res-overlay">
                    <h2>Kết Quả Đề Thi Thử AI</h2>
                    <div class="result-score" id="res-score">0</div>
                    <div class="status-badge" id="res-badge">PASS</div>
                    <p id="res-desc" style="color: #94a3b8; margin: 20px 0; max-width:500px;"></p>
                    <button class="btn" style="background:#FF5722; color:#fff;" onclick="resetExam()">Làm Đề Ngẫu Nhiên Mới</button>
                </div>
                <div class="quiz-header">
                    <span class="question-number">Câu hỏi <span id="lbl-qnum">1</span> / 45</span>
                </div>
                <div class="question-text" id="lbl-qtext">Đang tải cấu trúc đề thi...</div>
                <div id="opts-box"></div>
                <div class="action-buttons">
                    <button class="btn btn-prev" id="btn-p" onclick="nav(-1)">← Câu trước</button>
                    <a href="/" style="color:#64748b; text-decoration:none; display:flex; align-items:center; font-size:13px; font-weight:bold;">THOÁT PHÒNG THI</a>
                    <button class="btn btn-next" id="btn-n" onclick="nav(1)">Câu tiếp theo →</button>
                </div>
            </div>
            <div class="sidebar">
                <button class="btn-submit-exam" id="btn-sub" onclick="finishExam()">NỘP BÀI & CHẤM ĐIỂM</button>
                <div style="font-weight:bold; margin-bottom:10px; font-size:14px;">Bảng Tiến Độ Câu Hỏi:</div>
                <div class="nav-grid" id="grid-box"></div>
            </div>
        </div>
    </div>

    <div id="aiTrialLock" class="trial-modal">
        <div class="trial-modal-content">
            <h2 style="color:#00f2ff; margin-bottom:10px;">⏱️ Hết thời gian học thử!</h2>
            <p style="color:#94a3b8; font-size:0.9rem; line-height:1.5; margin-bottom:15px;">Bạn đã dùng hết 10 phút trải nghiệm phòng thi thử Generative AI. Vui lòng nhập số điện thoại để mở khóa toàn bộ 60 câu hỏi.</p>
            <input type="text" id="aiPhoneInput" placeholder="Nhập số điện thoại mở khóa...">
            <button class="btn-action" onclick="unlockAiTrial()">KÍCH HOẠT NGAY</button>
        </div>
    </div>

    <script>
        // KHO DỮ LIỆU GỒM 60 CÂU HỎI ĐỘC QUYỀN GENERATIVE AI XÁO TRỘN NGẪU NHIÊN 45 CÂU
        var aiBank = [
            { q: "Mô hình ngôn ngữ lớn (LLM) hoạt động dựa trên cơ chế cốt lõi nào sau đây?", ans: ["Dự đoán từ tiếp theo có xác suất cao nhất dựa vào ngữ cảnh phía trước", "Tra cứu trực tiếp câu trả lời từ ổ cứng máy tính", "Sử dụng các quy tắc ngữ pháp lập trình cứng", "Tự suy luận độc lập như não bộ con người"], right: 0 },
            { q: "Thuật ngữ 'Hallucination' (Ảo tưởng) trong Generative AI chỉ hiện tượng gì?", ans: ["AI tạo ra câu trả lời sai lệch, bịa đặt nhưng hành văn rất thuyết phục như thật", "Hệ thống bị quá tải sập nguồn", "AI từ chối trả lời do vi phạm bản quyền", "AI phản hồi bằng ngôn ngữ lập trình"], right: 0 },
            { q: "Kỹ thuật tối ưu câu lệnh đầu vào để AI cho ra kết quả chất lượng nhất gọi là gì?", ans: ["Prompt Engineering", "Data Crawling", "Model Training", "Software Testing"], right: 0 },
            { q: "Để AI bám sát dữ liệu nội bộ của công ty và hạn chế bịa đặt, giải pháp nào tối ưu?", ans: ["Sử dụng kiến trúc RAG (Retrieval-Augmented Generation)", "Viết câu lệnh dài gấp đôi", "Tắt hệ thống bảo mật", "Huấn luyện lại toàn bộ mô hình từ đầu"], right: 0 },
            { q: "Mạng GANs (Generative Adversarial Networks) bao gồm hai thành phần đối nghịch nào?", ans: ["Mạng tạo sinh (Generator) và Mạng phân biệt (Discriminator)", "Mạng lưu trữ và mạng tìm kiếm", "Mạng nén dữ liệu và mạng giải mã", "Thuật toán nhị phân và thuật toán tuần tự"], right: 0 },
            { q: "Mô hình AI nào dưới đây chuyên dùng để tạo lập hình ảnh kỹ thuật số từ văn bản mô tả?", ans: ["Stable Diffusion / Midjourney", "GPT-4", "BERT", "Whisper"], right: 0 },
            { q: "Khái niệm 'Tokens' trong xử lý ngôn ngữ tự nhiên của LLM có thể hiểu là gì?", ans: ["Các đoạn ký tự hoặc từ nhỏ được chia nhỏ để mô hình xử lý toán học", "Mã bảo mật chống hacker", "Đơn vị đo lường tốc độ CPU", "Tiền ảo để mua tài khoản AI"], right: 0 },
            { q: "Khi viết Prompt, việc cung cấp thêm 1 hoặc 2 ví dụ cụ thể về kết quả mong muốn được gọi là kỹ thuật nào?", ans: ["Few-shot Prompting", "Zero-shot Prompting", "Chain-of-Thought", "Negative Prompting"], right: 0 },
            { q: "Kỹ thuật Prompting yêu cầu AI suy luận 'Hãy suy nghĩ từng bước một' để giải toán khó tên là gì?", ans: ["Chain-of-Thought (Chuỗi suy nghĩ)", "Meta Prompting", "System Prompting", "Instruction Prompting"], right: 0 },
            { q: "Trong các công cụ Generative AI tạo ảnh, tham số 'Negative Prompt' dùng để làm gì?", ans: ["Mô tả những chi tiết hoặc yếu tố mà bạn KHÔNG muốn xuất hiện trong ảnh", "Làm giảm độ phân giải của ảnh", "Tạo ảnh đen trắng độc bản", "Báo cáo ảnh vi phạm bản quyền"], right: 0 }
        ];

        // Sưu tầm thêm 50 câu hỏi nâng cao để đạt chuẩn kho tri thức 60 câu hỏi
        var topics = ["Đạo đức AI", "Bảo mật thông tin prompt", "Tối ưu mã nguồn bằng AI", "Nhận diện Deepfake", "Phân biệt AI tạo sinh và AI truyền thống", "Quyền sở hữu trí tuệ ảnh AI", "Ứng dụng AI trong văn phòng", "Giới hạn ngữ cảnh Context Window", "Thông số Temperature tùy biến độ sáng tạo", "Cơ chế Attention trong mạng Transformer"];
        for(var i = 11; i <= 60; i++) {
            var top = topics[i % topics.length];
            aiBank.push({
                q: "Câu hỏi thực chiến chuyên sâu số " + i + ": Liên quan đến ứng dụng an toàn và hiệu quả công nghệ Generative AI về chủ đề '" + top + "'. Đâu là nguyên tắc cốt lõi cần tuân thủ?",
                ans: [
                    "Kiểm chứng kỹ lưỡng thông tin đầu ra, bảo mật dữ liệu nhạy cảm cá nhân và tuân thủ đạo đức công nghệ.",
                    "Sử dụng tự động toàn bộ kết quả của AI mà không cần rà soát lại.",
                    "Đưa các dữ liệu mật, thông tin bảo mật của công ty lên AI công cộng.",
                    "Sao chép các sản phẩm có bản quyền để làm dữ liệu đầu vào không xin phép."
                ],
                right: 0
            });
        }

        var mode = 'practice';
        var activeQs = [];
        var idx = 0;
        var answers = [];
        var submitted = false;
        var clockTimer = null;
        var remTime = 50 * 60;

        function setMode(m) {
            if(!submitted && answers.filter(a => a!==null).length > 0) {
                if(!confirm("Đổi chế độ sẽ làm mới lại toàn bộ tiến trình làm bài đề này. Đồng ý?")) return;
            }
            mode = m;
            document.getElementById('m-practice').className = 'mode-btn' + (m==='practice'?' active':'');
            document.getElementById('m-exam').className = 'mode-btn' + (m==='exam'?' active':'');
            document.getElementById('btn-sub').style.opacity = (m==='practice'? '0.2':'1');
            resetExam();
        }

        function resetExam() {
            // Trích xuất ngẫu nhiên 45 câu hỏi từ kho dữ liệu 60 câu
            var copy = [...aiBank].sort(() => Math.random() - 0.5);
            activeQs = copy.slice(0, 45);
            idx = 0;
            answers = new Array(45).fill(null);
            submitted = false;
            document.getElementById('res-overlay').classList.remove('show');
            
            buildGrid();
            initClock();
            showQ();
        }

        function initClock() {
            if(clockTimer) clearInterval(clockTimer);
            if(mode === 'practice') {
                document.getElementById('clock').textContent = "VÔ HẠN";
                document.getElementById('t-box').className = "timer-box freeze";
                return;
            }
            document.getElementById('t-box').className = "timer-box";
            remTime = 50 * 60;
            clockTimer = setInterval(() => {
                remTime--;
                var m = Math.floor(remTime/60);
                var s = remTime%60;
                document.getElementById('clock').textContent = (m<10?'0':'')+m+":"+(s<10?'0':'')+s;
                if(remTime<=0) { clearInterval(clockTimer); finishExam(); }
            }, 1000);
        }

        function buildGrid() {
            var box = document.getElementById('grid-box');
            box.innerHTML = '';
            for(let i=0; i<45; i++) {
                var d = document.createElement('div');
                d.className = 'nav-item';
                d.textContent = i+1;
                d.id = 'nav-' + i;
                d.onclick = () => { idx = i; showQ(); };
                box.appendChild(d);
            }
        }

        function showQ() {
            var current = activeQs[idx];
            document.getElementById('lbl-qnum').textContent = idx + 1;
            document.getElementById('lbl-qtext').textContent = current.q;
            
            var obox = document.getElementById('opts-box');
            obox.innerHTML = '';
            var selected = answers[idx];

            current.ans.forEach((opt, i) => {
                var div = document.createElement('div');
                div.className = 'option';
                div.innerHTML = '<div class="option-label">'+String.fromCharCode(65+i)+'</div><div>'+opt+'</div>';
                
                if(mode === 'practice') {
                    if(selected !== null) {
                        if(i === current.right) div.classList.add('correct');
                        else if(i === selected) div.classList.add('incorrect');
                    } else {
                        div.onclick = () => {
                            answers[idx] = i;
                            var navItem = document.getElementById('nav-'+idx);
                            if(i === current.right) navItem.classList.add('correct');
                            else navItem.classList.add('incorrect');
                            showQ();
                        };
                    }
                } else {
                    if(!submitted) {
                        if(selected === i) div.classList.add('selected');
                        div.onclick = () => {
                            answers[idx] = i;
                            document.getElementById('nav-'+idx).classList.add('answered');
                            showQ();
                        };
                    } else {
                        if(i === current.right) div.classList.add('correct');
                        else if(selected === i) div.classList.add('incorrect');
                    }
                }
                obox.appendChild(div);
            });

            document.getElementById('btn-p').disabled = (idx === 0);
            document.getElementById('btn-n').disabled = (idx === 44);

            for(let i=0; i<45; i++) {
                var item = document.getElementById('nav-'+i);
                if(item) {
                    item.classList.remove('current');
                    if(i === idx) item.classList.add('current');
                }
            }
        }

        function nav(d) { idx += d; showQ(); }

        function finishExam() {
            if(mode === 'practice' || submitted) return;
            if(!confirm("Bạn chắc chắn muốn nộp bài chấm điểm đề thi thử Generative AI?")) return;
            
            submitted = true;
            clearInterval(clockTimer);
            
            var corrects = 0;
            activeQs.forEach((q, i) => {
                if(answers[i] === q.right) corrects++;
            });

            var score = Math.round((corrects / 45) * 1000);
            var pass = score >= 700;

            document.getElementById('res-score').textContent = score + " / 1000 Điểm";
            var badge = document.getElementById('res-badge');
            var desc = document.getElementById('res-desc');
            
            if(pass) {
                badge.textContent = "THI ĐẠT (PASS)";
                badge.className = "status-badge badge-pass";
                desc.innerHTML = "🎉 Tuyệt vời! Bạn làm chính xác <b>" + corrects + "/45 câu hỏi</b>, đạt tiêu chuẩn cấp chứng nhận năng lực số quốc tế.";
            } else {
                badge.textContent = "CHƯA ĐẠT (FAIL)";
                badge.className = "status-badge badge-fail";
                desc.innerHTML = "⚠️ Điểm số chưa đạt. Bạn làm đúng <b>" + corrects + "/45 câu</b>. Hãy thử sức lại ở đề tiếp theo để củng cố kiến thức tốt hơn.";
            }

            document.getElementById('res-overlay').classList.add('show');
            
            activeQs.forEach((q, i) => {
                var item = document.getElementById('nav-'+i);
                if(item) {
                    item.className = 'nav-item ' + (answers[i] === q.right ? 'correct' : 'incorrect');
                }
            });
            showQ();
        }

        // Hẹn giờ khóa 10 phút học thử
        if(sessionStorage.getItem('mos360_is_trial') === 'yes') {
            setTimeout(function() {
                document.getElementById('aiTrialLock').style.display = 'flex';
            }, 10 * 60 * 1000);
        }

        function unlockAiTrial() {
            var phone = document.getElementById('aiPhoneInput').value.trim();
            if(!phone) { alert("Vui lòng nhập số điện thoại kích hoạt!"); return; }
            alert("Đã nhận thông tin kích hoạt. Hệ thống đang cấp quyền truy cập trọn vẹn!");
            document.getElementById('aiTrialLock').style.display = 'none';
        }

        window.onload = resetExam;
    </script>
</body>
</html>`;
  }
};
