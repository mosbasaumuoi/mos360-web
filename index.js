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
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
        header { padding: 10px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.9); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.2rem; }
        .brand img { height: 35px; margin-right: 10px; }
        nav a { color: #888; text-decoration: none; font-weight: 700; margin-left: 20px; font-size: 0.8rem; }
        .stats-bar { display: flex; justify-content: center; gap: 30px; padding: 25px; text-align: center; }
        .stat-item h2 { color: var(--primary); font-size: 2rem; }
        .main-container { max-width: 1400px; margin: 0 auto; padding: 0 5%; display: grid; grid-template-columns: 320px 1fr; gap: 25px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 28px; padding: 25px; }
        #bang-vang-container { height: 450px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.4); border-radius: 20px; }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 100s linear infinite; }
        .student-item { flex: 0 0 auto; width: 320px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 40px; }
        .btn-action { background: var(--primary); color: white; border: none; padding: 12px; border-radius: 30px; font-weight: 800; cursor: pointer; width: 100%; text-decoration:none; display:block; text-align:center; }
        
        /* CÁC NÚT MẠNG XÃ HỘI BIỂU TƯỢNG (ICON) CỐ ĐỊNH BÊN PHẢI */
        .social-sticky-bar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
        .social-sticky-item { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.6); }
        .social-sticky-item svg { width: 24px; height: 24px; fill: currentColor; }
        .social-sticky-item:hover { transform: scale(1.18) translateX(-4px); }
        .s-zalo { background: #0084FF; } 
        .s-fb { background: #1877F2; } 
        .s-mess { background: linear-gradient(135deg, #00C6FF, #0072FF, #00F2FE); } 
        .s-yt { background: #FF0000; } 
        .s-tt { background: #111111; color: #FFFFFF; border: 1px solid rgba(255,255,255,0.15); }

        /* CSS PHÂN KHỐI KHÓA HỌC */
        .course-block-title { display: flex; align-items: center; gap: 12px; margin: 35px 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid var(--border); color: #fff; }
        .course-block-title svg { width: 28px; height: 28px; fill: var(--primary); }
        .course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 40px; }
        .price-tag { font-size: 1.3rem; font-weight: 800; color: #00f2ff; margin: 15px 0; display: flex; align-items: center; gap: 5px; }
        .price-tag span { font-size: 0.8rem; color: #888; text-decoration: line-through; font-weight: normal; }

        @media (max-width: 800px) { .main-container, .footer-grid { grid-template-columns: 1fr; } .social-sticky-bar { right: 10px; } .social-sticky-item { width: 42px; height: 42px; } .social-sticky-item svg { width: 20px; height: 20px; } }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="` + CONFIG.LOGO_URL + `"> MOS360</a>
        <nav><a href="/">TRANG CHỦ</a><a href="/courses">KHÓA HỌC</a><a href="/library">KHO MOS</a><a href="/login" style="color:var(--primary)">ĐĂNG NHẬP</a></nav>
    </header>
    <nav style="background: rgba(255,255,255,0.03); padding: 8px 5%; font-size: 0.8rem; border-bottom: 1px solid var(--border); display:flex; gap:15px; overflow-x: auto;">
        <span style="color:#666; flex-shrink: 0;">🎯 Chuyên mục HOT:</span>
        <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold; margin:0;">✨ Trắc nghiệm Generative AI</a>
        <a href="/ic3-test" style="color:#FFD700; text-decoration:none; font-weight:bold; margin:0;">🌍 [MỚI] Luyện Đề IC3 GS6 Tổng Hợp (Level 1/2/3)</a>
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

    <main>` + content + `</main>
    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p><p>📞 Hotline: 0912.888.360</p></div>
            <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
            <div style="height:180px; border-radius:15px; overflow:hidden;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.665792945241!2d106.6791653!3d20.8431818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af99d2557e9%3A0x679c2980c6c7478d!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZw!5e0!3m2!1svi!2s!4v1714368000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    </body></html>`;
  },

  getHomeUI(studentData) {
    return `<div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
          <div class="stat-item"><h2>1.000+</h2><p>Học viên đã nhận chứng chỉ</p></div>
          <div class="stat-item"><h2>500+</h2><p>Truy cập thường xuyên</p></div>
      </div>
      <div class="main-container">
          <div class="left-col" style="background:var(--card); padding:20px; border-radius:20px; border:1px solid var(--border);">
              <h3 style="color:var(--primary); margin-bottom:15px;">Khóa học nổi bật</h3>
              <p style="font-size:0.9rem; line-height:1.6; color:#aaa;">Học và ôn thi trực quan bám sát cấu trúc đề thi quốc tế thực tế.</p>
              <button class="btn-action" style="margin-top:20px;" onclick="location.href='/courses'">XEM KHÓA HỌC</button>
          </div>
          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 class="bv-title">🏆 Bảng Vàng Chứng Chỉ</h3>
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
        <p style="text-align: center; color: #888; margin-bottom: 20px; font-size: 0.95rem;">Cam kết chuẩn đầu ra Certiport - Học trực tuyến tương tác cao.</p>
        
        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 4h16v12H4V4z"/></svg>
            <h2>KHỐI LUYỆN THI MOS OFFICE 2019</h2>
        </div>
        <div class="course-grid">
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.25rem;">Luyện thi MOS Word 2019</h3>
                    <p style="color:#aaa; font-size:0.85rem; line-height:1.6;">Làm chủ kỹ năng soạn thảo, định dạng văn bản nâng cao, thiết kế báo cáo, hợp đồng chuẩn quốc tế.</p>
                    <div class="price-tag">400.000đ <span>600.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.25rem;">Luyện thi MOS Excel 2019</h3>
                    <p style="color:#aaa; font-size:0.85rem; line-height:1.6;">Thành thạo hàm xử lý dữ liệu, định dạng bảng tính toán, biểu đồ trực quan phục vụ công việc thực tế.</p>
                    <div class="price-tag">400.000đ <span>600.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0, 242, 255, 0.1); color:var(--cyan); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.25rem;">Luyện thi MOS PowerPoint 2019</h3>
                    <p style="color:#aaa; font-size:0.85rem; line-height:1.6;">Tư duy thiết kế Slide thuyết trình chuyên nghiệp, hiệu ứng chuyển động mượt mà bứt phá mọi bài báo cáo.</p>
                    <div class="price-tag">400.000đ <span>600.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/></svg>
            <h2>KHỐI LUYỆN THI MOS OFFICE 365</h2>
        </div>
        <div class="course-grid">
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255, 87, 34, 0.1); color:var(--primary); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.25rem;">Luyện thi MOS Word 365</h3>
                    <p style="color:#aaa; font-size:0.85rem; line-height:1.6;">Tiếp cận các tính năng cộng tác thời gian thực, AI hỗ trợ soạn thảo và định dạng văn bản Office đám mây mới nhất.</p>
                    <div class="price-tag">400.000đ <span>650.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255, 87, 34, 0.1); color:var(--primary); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.25rem;">Luyện thi MOS Excel 365</h3>
                    <p style="color:#aaa; font-size:0.85rem; line-height:1.6;">Ứng dụng mảng động (Dynamic Arrays), các hàm xử lý dữ liệu mới hiệu năng cao chỉ có trên phiên bản 365.</p>
                    <div class="price-tag">400.000đ <span>650.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
            <div class="section-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255, 87, 34, 0.1); color:var(--primary); padding:5px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                    <h3 style="margin:15px 0 10px 0; font-size:1.25rem;">Luyện thi MOS PowerPoint 365</h3>
                    <p style="color:#aaa; font-size:0.85rem; line-height:1.6;">Khai thác tính năng biến đổi Morph đặc thù, chèn vật thể 3D, Zoom Slide tạo hiệu ứng chuyển động điện ảnh siêu đỉnh.</p>
                    <div class="price-tag">400.000đ <span>650.000đ</span></div>
                </div>
                <a href="` + CONFIG.SOCIALS.ZALO + `" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
            </div>
        </div>

        <div style="margin-top: 40px; display:grid; grid-template-columns: 1fr 1fr; gap:25px;">
            <div class="section-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="color:#FFD700;">🌍 Phòng ôn đề thi thử IC3 GS6</h3>
                    <p style="font-size:0.8rem; color:#aaa; margin-top:5px;">Hệ thống trắc nghiệm mô phỏng cấu trúc Certiport chuẩn quốc tế cả 3 Level.</p>
                </div>
                <button class="btn-action" style="width:140px; background:#FFD700; color:#000;" onclick="location.href='/ic3-test'">VÀO LUYỆN</button>
            </div>
            <div class="section-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="color:var(--cyan);">✨ Công nghệ Generative AI</h3>
                    <p style="font-size:0.8rem; color:#aaa; margin-top:5px;">Luyện tập kiến thức nền tảng để đón đầu kỷ nguyên Trí tuệ nhân tạo tạo sinh.</p>
                </div>
                <button class="btn-action" style="width:140px; background:var(--cyan); color:#000;" onclick="location.href='/generative-ai'">VÀO THỬ SỨC</button>
            </div>
        </div>
    </div>`;
  },
  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto; text-align:center;"><h2>Đăng Nhập</h2><input type="password" placeholder="Mật khẩu" style="width:100%; padding:15px; margin:20px 0; background:#000; border:1px solid #333; color:#fff; border-radius:10px;"><button class="btn-action">VÀO HỆ THỐNG</button></div>`; },
  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:50px auto; text-align:center;"><h2>📚 Kho Tài Liệu MOS & IC3</h2><p>Nội dung đang được cập nhật...</p></div>`; },
  
  getGenerativeAIUI() { 
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOS360 - Trắc nghiệm Generative AI</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
        body { background-color: #0b0c10; color: #c5c6c7; padding: 20px; }
        .ai-wrap { max-width: 850px; margin: 30px auto; background: #1f2833; border-radius: 16px; border: 1px solid #45f3ff; box-shadow: 0 0 20px rgba(69,243,255,0.2); padding: 30px; }
        h1 { color: #45f3ff; font-size: 24px; text-align: center; margin-bottom: 25px; font-weight: 800; text-transform: uppercase; }
        .q-text { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 20px; line-height: 1.5; }
        .opts-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; }
        .opt-item { padding: 14px 18px; background: #0b0c10; border: 2px solid #2f3e46; border-radius: 8px; cursor: pointer; color: #cbd5e1; font-size: 14.5px; transition: 0.2s; }
        .opt-item:hover:not(.locked) { border-color: #45f3ff; background: #151a22; }
        .opt-item.picked { border-color: #45f3ff; background: rgba(69,243,255,0.05); }
        .opt-item.right { border-color: #2ecc71; background: rgba(46,204,113,0.1); color: #2ecc71; font-weight: bold; }
        .opt-item.wrong { border-color: #e74c3c; background: rgba(231,76,60,0.1); color: #e74c3c; }
        .explain-box { padding: 15px; background: rgba(69,243,255,0.08); border-left: 4px solid #45f3ff; border-radius: 4px; margin-bottom: 25px; display: none; font-size: 14px; color: #cbd5e1; }
        .nav-ctrls { display: flex; justify-content: space-between; align-items: center; }
        .ai-btn { padding: 10px 22px; background: #45f3ff; color: #0b0c10; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 13.5px; }
        .ai-btn:disabled { opacity: 0.2; cursor: not-allowed; }
    </style>
</head>
<body>
    <div class="ai-wrap">
        <h1>✨ Trắc Nghiệm Kiến Thức Generative AI</h1>
        <div style="text-align:center; margin-bottom: 15px; font-weight: bold; color:#45f3ff;">Câu <span id="ai-idx">1</span> / 5</div>
        <div class="q-text" id="ai-q-text">Đang nạp câu hỏi...</div>
        <div class="opts-list" id="ai-opts-block"></div>
        <div class="explain-box" id="ai-explain-box"></div>
        <div class="nav-ctrls">
            <button class="ai-btn" id="ai-btn-prev" onclick="moveQ(-1)" disabled>← Câu trước</button>
            <a href="/" style="color:#888; text-decoration:none; font-size:12px; font-weight:bold;">QUAY VỀ TRANG CHỦ</a>
            <button class="ai-btn" id="ai-btn-next" onclick="moveQ(1)">Câu tiếp theo →</button>
        </div>
    </div>
    <script>
        var aiQuestions = [
            { q: "Mô hình ngôn ngữ lớn (LLM) hoạt động dựa trên cơ chế cốt lõi nào sau đây?", ans: ["Dự đoán từ tiếp theo có khả năng xảy ra nhất dựa trên ngữ cảnh", "Tra cứu trực tiếp câu trả lời chính xác có sẵn trong ổ cứng", "Sử dụng các quy tắc ngữ pháp cứng nhắc do lập trình viên định nghĩa", "Tự suy luận logic độc lập như bộ não con người không cần dữ liệu"], right: 0, exp: "LLM hoạt động dựa trên xác suất, phân tích ngữ cảnh trước để đưa ra từ tiếp theo phù hợp nhất trong chuỗi." },
            { q: "Thuật ngữ 'Hallucination' (Ảo tưởng/Bịa chuyện) trong Generative AI chỉ hiện tượng gì?", ans: ["Hệ thống bị sập do quá tải yêu cầu đồng thời", "AI tạo ra câu trả lời có tính chính xác tuyệt đối", "AI tự tin khẳng định một thông tin sai lệch, bịa đặt như thể là sự thật", "AI từ chối trả lời vì câu hỏi vi phạm chính sách an toàn"], right: 2, exp: "Hallucination là điểm hạn chế của AI tạo sinh khi nó tự tạo thông tin không có cơ sở nhưng văn phong cực kỳ thuyết phục." },
            { q: "Kỹ thuật viết câu lệnh hiệu quả để AI cho ra kết quả tối ưu nhất được gọi là gì?", ans: ["Software Engineering", "Prompt Engineering", "Data Crawling", "Model Training"], right: 1, exp: "Prompt Engineering là kỹ thuật thiết kế, tinh chỉnh câu lệnh để giao tiếp và khai thác AI tối ưu nhất." },
            { q: "Để AI không bịa đặt thông tin và trả lời bám sát vào tài liệu riêng của công ty, người ta thường dùng giải pháp nào?", ans: ["Xóa bỏ hoàn toàn mô hình cũ và huấn luyện lại từ đầu", "Sử dụng RAG (Retrieval-Augmented Generation) để tra cứu dữ liệu trước khi trả lời", "Tăng độ dài của câu lệnh lên gấp nhiều lần", "Tắt tính năng bảo mật hệ thống"], right: 1, exp: "RAG giúp cung cấp thêm một kho tri thức đáng tin cậy bên ngoài làm căn cứ cho AI tổng hợp câu trả lời chính xác." },
            { q: "Deepfake - một sản phẩm của Generative AI thường sử dụng loại mạng kiến trúc nào để cắt ghép khuôn mặt, giọng nói?", ans: ["Mạng GAN (Generative Adversarial Networks)", "Mạng cảm biến diện rộng", "Hệ thống quản trị SQL", "Thuật toán tìm kiếm nhị phân"], right: 0, exp: "GAN gồm 2 mạng đối nghịch (mạng tạo sinh và mạng phân biệt) giúp tối ưu hóa sản phẩm Deepfake giống thật nhất." }
        ];
        var curAiQ = 0;
        var savedAnswers = new Array(aiQuestions.length).fill(null);

        function renderAiQuestion() {
            var item = aiQuestions[curAiQ];
            document.getElementById("ai-idx").textContent = curAiQ + 1;
            document.getElementById("ai-q-text").textContent = item.q;
            var box = document.getElementById("ai-opts-block");
            box.innerHTML = "";
            
            var chosen = savedAnswers[curAiQ];
            item.ans.forEach(function(opt, i) {
                var div = document.createElement("div");
                div.className = "opt-item";
                div.textContent = opt;
                
                if(chosen !== null) {
                    div.classList.add("locked");
                    if(i === item.right) div.classList.add("right");
                    else if(i === chosen) div.classList.add("wrong");
                } else {
                    div.onclick = function() {
                        savedAnswers[curAiQ] = i;
                        renderAiQuestion();
                    };
                }
                box.appendChild(div);
            });

            var expBox = document.getElementById("ai-explain-box");
            if(chosen !== null) {
                expBox.style.display = "block";
                expBox.innerHTML = "<b>Giải thích:</b> " + item.exp;
            } else {
                expBox.style.display = "none";
            }
            document.getElementById("ai-btn-prev").disabled = (curAiQ === 0);
            document.getElementById("ai-btn-next").disabled = (curAiQ === aiQuestions.length - 1);
        }

        function moveQ(dir) {
            curAiQ += dir;
            renderAiQuestion();
        }
        window.onload = function() { renderAiQuestion(); };
    </script>
</body>
</html>`;
  },

  getIC3QuizUI() {
    let htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MOS360 - Phòng Thi Thử Quốc Tế IC3 GS6</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #090a0f; color: #f1f5f9; line-height: 1.6; padding: 20px; }
        .container { max-width: 1260px; margin: 0 auto; background-color: #121520; border-radius: 18px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6); overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
        
        .level-bar { background-color: #181d2a; padding: 15px 25px; display: flex; gap: 14px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); overflow-x: auto; }
        .level-bar span { color: #94a3b8; font-weight: 600; font-size: 14px; margin-right: 8px; flex-shrink: 0; }
        .lvl-btn { padding: 8px 18px; background-color: #22293a; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .lvl-btn:hover { background-color: #2d364d; color: #fff; }
        .lvl-btn.active { background-color: #FF5722; color: white; border-color: #FF5722; box-shadow: 0 0 12px rgba(255,87,34,0.3); }

        .mode-bar { background-color: #141824; padding: 12px 25px; display: flex; gap: 12px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .mode-btn { padding: 6px 16px; background-color: #1d2333; color: #94a3b8; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; font-weight: 700; font-size: 12.5px; cursor: pointer; transition: all 0.2s; }
        .mode-btn:hover { color: #fff; background-color: #252d42; }
        .mode-btn.active { background-color: rgba(0, 242, 255, 0.12); color: #00f2ff; border-color: #00f2ff; box-shadow: 0 0 10px rgba(0,242,255,0.15); }

        header { background: linear-gradient(135deg, #131722, #1f2637); color: white; padding: 22px 30px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
        header h1 { font-size: 21px; margin-bottom: 4px; font-weight: 800; color: #fff; letter-spacing: 0.5px; }
        header p { font-size: 13px; color: #94a3b8; }
        
        .timer-box { background: rgba(255, 87, 34, 0.08); border: 2px solid #FF5722; padding: 10px 18px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 19px; font-weight: 800; color: #ff784e; box-shadow: 0 0 15px rgba(255,87,34,0.1); }
        .timer-box.freeze { border-color: #4b5563; background: rgba(156, 163, 175, 0.05); color: #9ca3af; box-shadow: none; }

        .quiz-layout { display: grid; grid-template-columns: 1fr 340px; gap: 20px; padding: 25px; }
        @media (max-width: 992px) { .quiz-layout { grid-template-columns: 1fr; } }
        
        .main-quiz { background-color: #171b26; border: 1px solid rgba(255,255,255,0.05); border-radius: 14px; padding: 25px; display: flex; flex-direction: column; min-height: 500px; position: relative; }
        .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .question-number { font-size: 13px; font-weight: 700; color: #00f2ff; background-color: rgba(0,242,255,0.1); padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(0,242,255,0.2); }
        .score-display { font-size: 13px; font-weight: 600; color: #94a3b8; }
        
        .question-text { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 24px; line-height: 1.6; white-space: pre-line; }
        .options-container { display: flex; flex-direction: column; gap: 12px; }
        
        .option { display: flex; align-items: center; padding: 15px 20px; background-color: #1e2333; border: 2px solid #282f44; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; }
        .option:hover:not(.disabled) { background-color: #252c40; border-color: #3b4563; }
        .option.selected { background-color: rgba(0,242,255,0.05); border-color: #00f2ff; }
        .option.correct { background-color: rgba(22,163,74,0.15); border-color: #16a34a; }
        .option.incorrect { background-color: rgba(220,38,38,0.15); border-color: #dc2626; }
        .option.disabled { cursor: not-allowed; }
        
        .option-label { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background-color: #171b26; border: 1px solid #3b4563; border-radius: 50%; margin-right: 15px; font-weight: 700; font-size: 13px; color: #94a3b8; flex-shrink: 0; }
        .option.selected .option-label { background-color: #00f2ff; color: #000; border-color: #00f2ff; }
        .option.correct .option-label { background-color: #16a34a; color: white; border-color: #16a34a; }
        .option.incorrect .option-label { background-color: #dc2626; color: white; border-color: #dc2626; }
        .option-text { font-size: 14.5px; color: #cbd5e1; }

        .action-buttons { display: flex; justify-content: space-between; margin-top: auto; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.05); gap: 15px; }
        .btn { padding: 12px 24px; font-size: 13.5px; font-weight: 700; border-radius: 8px; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-prev { background-color: #1e2333; color: #94a3b8; border: 1px solid #282f44; }
        .btn-prev:hover:not(:disabled) { background-color: #252c40; color: #fff; }
        .btn-next { background-color: #22293a; color: white; border: 1px solid #3b4563; }
        .btn-next:hover:not(:disabled) { background-color: #2d364d; }
        .btn:disabled { opacity: 0.2; cursor: not-allowed; }

        .sidebar { background-color: #171b26; border: 1px solid rgba(255,255,255,0.05); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; height: 580px; }
        .sidebar-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; overflow-y: auto; padding-right: 5px; flex-grow: 1; margin-bottom: 15px; }
        .nav-item { display: flex; align-items: center; justify-content: center; height: 38px; background-color: #1e2333; border: 1px solid #282f44; border-radius: 6px; font-size: 13px; font-weight: 700; color: #94a3b8; cursor: pointer; }
        .nav-item:hover { border-color: #3b4563; color: #fff; }
        .nav-item.current { border: 2px solid #00f2ff; color: #00f2ff; background-color: #171b26; }
        .nav-item.answered { background-color: #2a354d; border-color: #4c5d85; color: #fff; }
        .nav-item.correct { background-color: rgba(22,163,74,0.2); border-color: #16a34a; color: #4ade80; }
        .nav-item.incorrect { background-color: rgba(220,38,38,0.2); border-color: #dc2626; color: #f87171; }

        .btn-submit-exam { width: 100%; background: linear-gradient(135deg, #00f2ff, #00a2ff); color: #000; font-weight: 800; padding: 12px; border-radius: 8px; border: none; cursor: pointer; margin-bottom: 15px; font-size: 14px; letter-spacing: 0.5px; transition: all 0.2s; box-shadow: 0 4px 15px rgba(0,242,255,0.2); }
        .btn-submit-exam:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,242,255,0.3); }
        .btn-submit-exam:disabled { background: #22293a; color: #4b5563; box-shadow: none; cursor: not-allowed; opacity: 0.5; }
        
        .stats-summary { padding: 15px; background-color: #1e2333; border-radius: 8px; border: 1px solid #282f44; }
        .stat-line { display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px; color: #94a3b8; }
        .progress-container { margin-bottom: 20px; background-color: #1e2333; height: 6px; border-radius: 4px; overflow: hidden; }
        .progress-bar { background: #FF5722; height: 100%; width: 0%; transition: width 0.3s ease; }

        .result-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(13,16,26,0.96); z-index: 100; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; display: none; }
        .result-overlay.show { display: flex; animation: fadeIn 0.4s ease-out; }
        .result-score { font-size: 64px; font-weight: 800; margin: 15px 0; letter-spacing: 1px; }
        .status-badge { padding: 8px 24px; border-radius: 30px; font-weight: 800; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        .badge-pass { background: rgba(0, 242, 255, 0.15); color: #00f2ff; border: 2px solid #00f2ff; box-shadow: 0 0 20px rgba(0,242,255,0.2); }
        .badge-fail { background: rgba(220, 38, 38, 0.15); color: #ff5252; border: 2px solid #dc2626; box-shadow: 0 0 20px rgba(220,38,38,0.2); }
        .btn-restart { background: #FF5722; color: white; padding: 12px 30px; font-weight: 700; border-radius: 8px; border: none; cursor: pointer; transition: 0.2s; font-size: 14px; }
        .btn-restart:hover { background: #e64a19; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="level-bar">
            <span>Chọn Đề Thi Thử:</span>
            <button class="lvl-btn active" id="btn-lvl1" onclick="switchLevel(1)">IC3 GS6 Level 1</button>
            <button class="lvl-btn" id="btn-lvl2" onclick="switchLevel(2)">IC3 GS6 Level 2</button>
            <button class="lvl-btn" id="btn-lvl3" onclick="switchLevel(3)">IC3 GS6 Level 3</button>
        </div>
        
        <div class="mode-bar">
            <span>Chế độ học tập:</span>
            <button class="mode-btn active" id="btn-mode-practice" onclick="switchMode('practice')">📘 Ôn Luyện (Hiện giải thích ngay)</button>
            <button class="mode-btn" id="btn-mode-exam" onclick="switchMode('exam')">⏱️ Thi Thực Chiến (Ẩn kết quả)</button>
        </div>

        <header>
            <div>
                <h1 id="header-title">IC3 GS6 Level 1 - 🌍 Công nghệ số cốt lõi</h1>
                <p id="header-desc">Đề mô phỏng chuẩn Certiport: 45 Câu hỏi | 50 Phút | Điểm Đạt: 700/1000</p>
            </div>
            <div class="timer-box" id="timer-box">
                <span id="timer-icon">⏱️</span>
                <span id="countdown-timer">50:00</span>
            </div>
        </header>

        <div class="quiz-layout">
            <div class="main-quiz">
                <div class="result-overlay" id="result-overlay">
                    <h2 id="result-title">Kết Quả Bài Thi Thử</h2>
                    <div class="result-score" id="final-score-display">0</div>
                    <div class="status-badge" id="status-badge">PASS</div>
                    <p id="result-summary" style="color: #94a3b8; max-width: 500px; margin-bottom: 30px; font-size: 14.5px;"></p>
                    <button class="btn-restart" onclick="restartExam()">Làm Đề Mới (Đảo Câu Hỏi)</button>
                </div>

                <div class="progress-container"><div class="progress-bar" id="progress-bar"></div></div>
                <div class="quiz-header">
                    <span class="question-number">Câu hỏi <span id="q-num">1</span>/45</span>
                    <span class="score-display" id="live-score-box" style="display:none;">Đúng: <span id="score-correct" style="color:#4ade80;">0</span> | Sai: <span id="score-incorrect" style="color:#f87171;">0</span></span>
                    <span class="score-display" id="exam-mode-badge" style="color: #00f2ff; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Chế độ: Ôn luyện tự do</span>
                </div>
                <div class="question-box">
                    <div class="question-text" id="question-text">Đang nạp dữ liệu...</div>
                    <div class="options-container" id="options-container"></div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-prev" id="btn-prev" onclick="changeQuestion(-1)" disabled>← Câu trước</button>
                    <a href="/" style="color:#666; text-decoration:none; display:flex; align-items:center; font-size:12px; font-weight:bold;">THOÁT PHÒNG THI</a>
                    <button class="btn btn-next" id="btn-next" onclick="changeQuestion(1)">Câu tiếp theo →</button>
                </div>
            </div>
            <div class="sidebar">
                <button class="btn-submit-exam" id="btn-submit-exam" onclick="confirmSubmitExam()">NỘP BÀI THI & CHẤM ĐIỂM</button>
                <div class="sidebar-title">Bảng Tiến Độ</div>
                <div class="nav-grid" id="nav-grid"></div>
                <div class="stats-summary">
                    <div class="stat-line"><span>Đã chọn:</span><span id="stat-answered">0/45</span></div>
                    <div class="stat-line"><span>Mục tiêu Pass:</span><span style="color:#00f2ff; font-weight:bold;">700 Điểm</span></div>
                </div>
            </div>
        </div>
    </div>`;

    let scriptContent = `<script>
        var database = {
            1: [
                { text: "[DẠNG GHÉP NỐI ĐÃ CHUYỂN ĐỔI]\\nHãy chọn cặp ghép ĐÚNG khi nói về mục đích cốt lõi của các ứng dụng phần mềm:", options: ["Phần mềm xử lý văn bản - Tính toán và hiển thị dữ liệu số dạng biểu đồ", "Ứng dụng bảng tính - Nhập, chỉnh sửa, định dạng tài liệu văn bản", "Trình duyệt web - Truy cập thông tin trên internet và thế giới trực tuyến", "Hệ thống quản lý cơ sở dữ liệu - Tạo các bài thuyết trình điện tử đa phương tiện"], correct: 2 },
                { text: "Máy tính để bàn sử dụng phần cứng nào để lưu trữ dữ liệu lâu dài (ngay cả khi tắt máy)?", options: ["Ổ đĩa cứng (HDD/SSD)", "Bộ xử lý trung tâm (CPU)", "Bộ nhớ tạm thời (RAM)", "Bo mạch chủ (Motherboard)"], correct: 0 },
                { text: "Bốn thông tin nào sau đây được coi là thông tin nhận dạng cá nhân cần bảo mật nghiêm ngặt (PII)?", options: ["Số căn cước công dân, Số điện thoại, Địa chỉ nhà, Ngày sinh", "Lịch sử duyệt web, Tên trình duyệt, Độ phân giải màn hình", "Nhãn hiệu máy tính, Dung lượng ổ cứng, Tên nhà mạng", "Tốc độ CPU, Phiên bản Windows, Danh sách phần mềm đã cài"], correct: 0 },
                { text: "Khi bạn gửi một email và điền các địa chỉ liên hệ vào dòng CC (Carbon Copy), điều gì sẽ xảy ra?", options: ["Người nhận ở dòng To không thể xem danh sách CC.", "Tất cả người nhận (To và CC) đều nhìn thấy công khai địa chỉ của nhau.", "Email sẽ chuyển thành dạng ẩn danh hoàn toàn đối với mọi người.", "Người ở dòng CC có quyền thu hồi thư đã gửi từ hòm thư người khác."], correct: 1 },
                { text: "Hành vi nào dưới đây được phân loại chính xác là hành vi bắt nạt trên mạng (Cyberbullying)?", options: ["Hủy kết bạn sau khi tranh luận trên một diễn đàn mở", "Báo cáo nội dung vi phạm tiêu chuẩn cộng đồng của nền tảng", "Tạo nhóm, trang web hoặc đăng tải ảnh/video cắt ghép nhằm xúc phạm danh dự người khác", "Tắt thông báo trò chuyện từ một nhóm quá phiền phức"], correct: 2 },
                { text: "Hệ điều hành (Operating System) nằm ở phân loại nào trong hệ thống máy tính?", options: ["Phần cứng (Hardware)", "Phần mềm hệ thống (System Software)", "Phần mềm ứng dụng (Application Software)", "Thiết bị ngoại vi (Peripheral)"], correct: 1 },
                { text: "Tùy chọn nào sau đây giúp xóa toàn bộ dữ liệu cá nhân một cách triệt để trước khi thanh lý thiết bị cũ?", options: ["Tắt nguồn thiết bị", "Xóa các thư mục ngoài Desktop", "Khôi phục cài đặt gốc và xóa sạch dữ liệu (Factory Reset)", "Gỡ cài đặt các ứng dụng mạng xã hội"], correct: 2 },
                { text: "Loại phần mềm nào phân phối miễn phí hoàn toàn nhưng người dùng không được xem hoặc sửa đổi mã nguồn?", options: ["Phần mềm nguồn mở (Open Source)", "Phần mềm thương mại mã nguồn đóng miễn phí (Freeware)", "Phần mềm miền công cộng (Public Domain)", "Phần mềm chia sẻ dùng thử hạn chế (Shareware)"], correct: 1 },
                { text: "Trong Windows, mục cài đặt nào cho phép bạn thay đổi hình nền và màu sắc chủ đề giao diện hệ thống?", options: ["Settings -> Personalization", "Settings -> System -> Display", "Control Panel -> Hardware", "Task Manager -> Performance"], correct: 0 },
                { text: "Bộ nhớ RAM của máy tính có đặc tính kỹ thuật cốt lõi nào sau đây?", options: ["Lưu trữ vĩnh viễn dữ liệu", "Dữ liệu bị xóa sạch hoàn toàn khi ngắt nguồn điện hoặc tắt máy (Bộ nhớ tạm thời)", "Dung lượng luôn lớn hơn ổ đĩa cứng", "Xử lý trực tiếp các tác vụ đồ họa 3D phức tạp thay cho GPU"], correct: 1 }
            ],
            2: [
                { text: "Nhiều hàng hóa và dịch vụ được bán trực tuyến. Ba tùy chọn nào sau đây thuộc nhóm Dịch vụ số kỹ thuật số (Digital Services)?", options: ["Lưu trữ đám mây (Cloud storage), Hỗ trợ máy tính từ xa, Ứng dụng trực tuyến", "Tai nghe không dây, Điện thoại thông minh, Chuột cơ lắp rời", "Bàn phím không dây, Bo mạch chủ, Ổ cứng di động USB", "Cáp mạng internet, Màn hình LED, Nguồn máy tính"], correct: 0 },
                { text: "Loại tài khoản nào được yêu cầu bắt buộc để có thể đăng câu hỏi hoặc bình luận trong diễn đàn cộng đồng của Microsoft?", options: ["Domain Account", "Windows Local Account", "Microsoft Account", "Azure Active Directory Account"], correct: 2 },
                { text: "Tùy chọn nào sau đây mô tả đúng nhất về đặc tính dịch vụ đời sống (ví dụ cắt tóc, sửa ống nước) phân biệt với hàng hóa?", options: ["Là sản phẩm phi vật chất, không thể lưu kho hoặc cầm nắm vật lý trực tiếp", "Là sản phẩm có thể sản xuất hàng loạt lưu kho số lượng lớn", "Là sản phẩm có hạn sử dụng vĩnh viễn không suy giảm", "Là sản phẩm tự động tái tạo không tốn chi phí vận hành"], correct: 0 },
                { text: "Khi cô Wilkins nhập một bảng tính, cô nhận thấy khi cô nhập chữ cái 'Y', từ 'Yes' tự động xuất hiện. Tính năng nào xử lý việc này?", options: ["Tự khớp (AutoFit)", "Tự định dạng (AutoFormat)", "Tự động hoàn tất (AutoComplete)", "Tự động điền (AutoFill)"], correct: 2 },
                { text: "Trong một cuộc họp video trực tuyến, hành động nào thể hiện sự tôn trọng quyền phát biểu của mọi người?", options: ["Cứ ngắt lời bất cứ khi nào nghĩ ra ý mới", "Sử dụng tính năng Giơ tay phát biểu (Raise Hand)", "Bật nhạc nền to trong phòng khi đang bật mic", "Rời khỏi máy tính đi làm việc riêng không tắt cam"], correct: 1 }
            ],
            3: [
                { text: "Để một ứng dụng phần mềm có thể ra lệnh và hoạt động nhịp nhàng trên thiết bị, phần cứng và phần mềm của máy tính phải hiểu chung điểm gì?", options: ["Chương trình đặc biệt (Special Program)", "Ngôn ngữ nhị phân (Binary Language gồm các chuỗi 0 và 1)", "Mã bổ sung (Supplemental Code)", "Giao thức mạng LAN nội bộ"], correct: 1 },
                { text: "Định dạng tập tin Video kỹ thuật số nào phổ biến nhất và được hỗ trợ bởi hầu hết các trình duyệt và thiết bị hiện nay?", options: ["AVI", "MP4", "WMV", "FLV"], correct: 1 },
                { text: "Chuỗi lập luận: 'Nếu sinh viên không dùng bộ tài liệu này, họ sẽ trượt đại học' dựa vào uy tín một chuyên gia giấu tên vi phạm các lỗi ngụy biến nào? (Chọn phương án đúng nhất)", options: ["Tấn công cá nhân (Ad hominem)", "Song đề sai (False Dilemma) & Lợi dụng người nổi tiếng (Appeal to Authority)", "Vin vào truyền thống (Appeal to Tradition)", "Khái quát hóa vội vã"], correct: 1 },
                { text: "Bạn muốn đưa trình duyệt Google Chrome về lại trạng thái cấu hình sạch sẽ ban đầu của nhà sản xuất. Bạn chọn mục nào trong Settings?", options: ["Default browser (Trình duyệt mặc định)", "On startup (Khi khởi động)", "Reset and clean up (Đặt lại và dọn dẹp)", "Appearance (Hình thức hiển thị)"], correct: 2 }
            ]
        };

        function fillQuestionBank() {
            var topics = {
                1: ["Lưu trữ đám mây", "Mạng Wifi bảo mật", "Bảo vệ thông tin PII", "Hệ điều hành Windows", "Sử dụng phím tắt", "Thiết bị ngoại vi", "Quét virus", "Trình duyệt web", "Email lừa đảo Phishing", "Sao lưu dữ liệu Drive"],
                2: ["Hàm tính toán Excel SUM/AVERAGE", "Định dạng bảng văn bản Word", "Hiệu ứng Slide PowerPoint", "Chia sẻ file Google Drive", "Lịch trực tuyến Outlook", "Bản quyền số sáng tạo", "Cộng tác tài liệu số", "Thiết kế biểu đồ", "Bộ lọc thư rác"],
                3: ["Ngụy biến logic", "Học máy trí tuệ nhân tạo AI", "Tái chế rác điện tử", "Mật khẩu mạnh bảo mật 2 lớp", "Mã hóa HTTPS", "Điện toán đám mây Cloud", "Quyền sở hữu trí tuệ", "Lừa đảo qua mạng xã hội", "Làm việc từ xa an toàn"]
            };
            for(var lvl = 1; lvl <= 3; lvl++) {
                var id = database[lvl].length;
                while(database[lvl].length < 45) {
                    id++;
                    var topic = topics[lvl][id % topics[lvl].length];
                    database[lvl].push({
                        text: "Câu hỏi thực chiến [Hệ thống bổ trợ kiến thức " + id + "]\\nLiên quan đến chuyên đề kiến thức cốt lõi về: " + topic + ". Hãy chọn khẳng định đúng đắn và an toàn nhất?",
                        options: [
                            "Tuân thủ nghiêm ngặt quy định bảo mật, tiêu chuẩn quốc tế và hướng dẫn của nhà sản xuất.",
                            "Bỏ qua các thông báo cảnh báo và thực hiện thao tác nhanh chóng.",
                            "Chia sẻ công khai toàn bộ tài nguyên lên mạng xã hội không mã hóa.",
                            "Sử dụng phần mềm bẻ khóa không rõ nguồn gốc để tiết kiệm chi phí."
                        ],
                        correct: 0
                    });
                }
            }
        }
        fillQuestionBank();

        var currentLevel = 1;
        var currentMode = 'practice'; 
        var questions = [];    
        var currentQuestion = 0;
        var userChoices = []; 
        var examSubmitted = false;
        var timerInterval = null;
        var timeRemaining = 50 * 60; 

        function shuffleArray(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            var newArray = JSON.parse(JSON.stringify(array)); 
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = newArray[currentIndex];
                newArray[currentIndex] = newArray[randomIndex];
                newArray[randomIndex] = temporaryValue;
            }
            return newArray;
        }

        function startTimer() {
            if(timerInterval) clearInterval(timerInterval);
            if (currentMode === 'practice') {
                document.getElementById('countdown-timer').textContent = "VÔ HẠN";
                document.getElementById('timer-box').classList.add('freeze');
                return;
            }
            document.getElementById('timer-box').classList.remove('freeze');
            timeRemaining = 50 * 60; 
            updateTimerDisplay();
            timerInterval = setInterval(function() {
                timeRemaining--;
                updateTimerDisplay();
                if(timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    alert("Đã hết thời gian làm bài 50 phút! Hệ thống đang tự động nộp bài của bạn.");
                    submitExam();
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = timeRemaining % 60;
            document.getElementById('countdown-timer').textContent = 
                (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        }

        function switchMode(mode) {
            if (currentMode === mode) return;
            if (!examSubmitted && userChoices.filter(function(c) { return c !== null; }).length > 0) {
                if (!confirm("Thay đổi chế độ học tập sẽ làm mới và thiết lập lại tiến độ câu hỏi hiện tại. Bạn có đồng ý?")) return;
            }
            currentMode = mode;
            document.querySelectorAll('.mode-btn').forEach(function(btn) { btn.classList.remove('active'); });
            if (mode === 'practice') {
                document.getElementById('btn-mode-practice').classList.add('active');
                document.getElementById('btn-submit-exam').disabled = true;
            } else {
                document.getElementById('btn-mode-exam').classList.add('active');
                document.getElementById('btn-submit-exam').disabled = false;
            }
            resetQuizData();
        }

        function switchLevel(lvl) {
            if(!examSubmitted && userChoices.filter(function(c) { return c !== null; }).length > 0) {
                if(!confirm("Bạn đang làm dở bộ câu hỏi của Level này. Chuyển sang Level khác sẽ hủy kết quả hiện tại. Bạn có chắc chắn?")) return;
            }
            currentLevel = lvl;
            document.querySelectorAll('.lvl-btn').forEach(function(btn) { btn.classList.remove('active'); });
            if(lvl === 1) {
                document.getElementById('btn-lvl1').classList.add('active');
                document.getElementById('header-title').textContent = "IC3 GS6 Level 1 - 🌍 Công nghệ số cốt lõi";
            } else if(lvl === 2) {
                document.getElementById('btn-lvl2').classList.add('active');
                document.getElementById('header-title').textContent = "IC3 GS6 Level 2 - 💻 Sáng tạo nội dung số";
            } else {
                document.getElementById('btn-lvl3').classList.add('active');
                document.getElementById('header-title').textContent = "IC3 GS6 Level 3 - 🚀 Tư duy số & Đời sống trực tuyến";
            }
            resetQuizData();
        }

        function resetQuizData() {
            var fullBank = database[currentLevel];
            var shuffledBank = shuffleArray(fullBank);
            questions = shuffledBank.slice(0, 45);
            
            currentQuestion = 0;
            userChoices = new Array(questions.length).fill(null);
            examSubmitted = false;
            
            document.getElementById('result-overlay').classList.remove('show');
            document.getElementById('live-score-box').style.display = 'none';
            
            var badge = document.getElementById('exam-mode-badge');
            if (currentMode === 'practice') {
                badge.textContent = "Chế độ: Ôn luyện tự do";
                badge.style.color = "#00f2ff";
                document.getElementById('btn-submit-exam').disabled = true;
            } else {
                badge.textContent = "Thực chiến: Ẩn kết quả";
                badge.style.color = "#64748b";
                document.getElementById('btn-submit-exam').disabled = false;
            }
            
            createNavigationButtons();
            startTimer();
            updateQuestion();
        }

        function createNavigationButtons() {
            var navGrid = document.getElementById('nav-grid');
            navGrid.innerHTML = '';
            for (var i = 0; i < questions.length; i++) {
                var btn = document.createElement('div');
                btn.className = 'nav-item';
                btn.textContent = i + 1;
                btn.id = 'nav-item-' + i;
                btn.onclick = (function(index) { return function() { jumpToQuestion(index); }; })(i);
                navGrid.appendChild(btn);
            }
        }

        function updateQuestion() {
            var currentQ = questions[currentQuestion];
            document.getElementById('q-num').textContent = currentQuestion + 1;
            document.getElementById('question-text').textContent = currentQ.text;

            var optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';
            var chosenIdx = userChoices[currentQuestion];

            currentQ.options.forEach(function(option, index) {
                var optDiv = document.createElement('div');
                optDiv.className = 'option';
                optDiv.id = 'option-' + index;
                
                var labelText = String.fromCharCode(65 + index);
                optDiv.innerHTML = '<div class="option-label">' + labelText + '</div><div class="option-text">' + option + '</div>';

                if (currentMode === 'practice') {
                    if (chosenIdx !== null) {
                        optDiv.classList.add('disabled');
                        if (index === currentQ.correct) {
                            optDiv.classList.add('correct');
                        } else if (chosenIdx === index) {
                            optDiv.classList.add('incorrect');
                        }
                    } else {
                        optDiv.onclick = function() {
                            userChoices[currentQuestion] = index;
                            var navItem = document.getElementById('nav-item-' + currentQuestion);
                            if(navItem) {
                                if(index === currentQ.correct) navItem.classList.add('correct');
                                else navItem.classList.add('incorrect');
                            }
                            updateQuestion();
                        };
                    }
                } else {
                    if (!examSubmitted) {
                        if (chosenIdx === index) optDiv.classList.add('selected');
                        optDiv.onclick = function() {
                            userChoices[currentQuestion] = index;
                            document.querySelectorAll('.options-container .option').forEach(function(o, idx) {
                                if (idx === index) o.classList.add('selected');
                                else o.classList.remove('selected');
                            });
                            var navItem = document.getElementById('nav-item-' + currentQuestion);
                            if(navItem) navItem.classList.add('answered');
                            updateStats();
                        };
                    } else {
                        optDiv.classList.add('disabled');
                        if (index === currentQ.correct) {
                            optDiv.classList.add('correct');
                        } else if (chosenIdx === index && chosenIdx !== currentQ.correct) {
                            optDiv.classList.add('incorrect');
                        }
                    }
                }
                optionsContainer.appendChild(optDiv);
            });

            document.getElementById('btn-prev').disabled = (currentQuestion === 0);
            document.getElementById('btn-next').disabled = (currentQuestion === questions.length - 1);

            for (var i = 0; i < questions.length; i++) {
                var navItem = document.getElementById('nav-item-' + i);
                if (navItem) {
                    navItem.classList.remove('current');
                    if (i === currentQuestion) navItem.classList.add('current');
                    
                    if (currentMode === 'practice') {
                        if (userChoices[i] !== null) {
                            navItem.classList.remove('answered');
                            if (userChoices[i] === questions[i].correct) navItem.classList.add('correct');
                            else navItem.classList.add('incorrect');
                        }
                    } else if (examSubmitted) {
                        navItem.classList.remove('answered', 'correct', 'incorrect');
                        if (userChoices[i] === questions[i].correct) navItem.classList.add('correct');
                        else navItem.classList.add('incorrect');
                    }
                }
            }

            var progress = ((currentQuestion + 1) / questions.length) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';
            updateStats();
        }

        function changeQuestion(direction) {
            var nextQ = currentQuestion + direction;
            if (nextQ >= 0 && nextQ < questions.length) {
                currentQuestion = nextQ;
                updateQuestion();
            }
        }

        function jumpToQuestion(index) {
            currentQuestion = index;
            updateQuestion();
        }

        function updateStats() {
            var answeredCount = userChoices.filter(function(ans) { return ans !== null; }).length;
            document.getElementById('stat-answered').textContent = answeredCount + '/' + questions.length;
        }

        function confirmSubmitExam() {
            if(currentMode === 'practice') return;
            var answeredCount = userChoices.filter(function(ans) { return ans !== null; }).length;
            var unAnswered = questions.length - answeredCount;
            var msg = "Bạn có chắc chắn muốn nộp bài thi thử không?";
            if(unAnswered > 0) {
                msg = "Cảnh báo: Bạn còn " + unAnswered + " câu chưa hoàn tất. Bạn vẫn muốn nộp bài thi chứ?";
            }
            if(confirm(msg)) {
                submitExam();
            }
        }

        function submitExam() {
            if(examSubmitted) return;
            examSubmitted = true;
            clearInterval(timerInterval);

            var correctCount = 0;
            for(var i=0; i<questions.length; i++) {
                if(userChoices[i] === questions[i].correct) {
                    correctCount++;
                }
            }

            var finalScore = Math.round((correctCount / questions.length) * 1000);
            var isPass = finalScore >= 700;

            document.getElementById('live-score-box').style.display = 'inline';
            document.getElementById('exam-mode-badge').style.display = 'none';
            document.getElementById('score-correct').textContent = correctCount;
            document.getElementById('score-incorrect').textContent = questions.length - correctCount;

            var overlay = document.getElementById('result-overlay');
            var scoreDisplay = document.getElementById('final-score-display');
            var badge = document.getElementById('status-badge');
            var summary = document.getElementById('result-summary');

            scoreDisplay.textContent = finalScore + " / 1000";
            if(isPass) {
                scoreDisplay.style.color = "#00f2ff";
                badge.textContent = "THI ĐẠT (PASS)";
                badge.className = "status-badge badge-pass";
                summary.innerHTML = "🎉 Xin chúc mừng! Bạn đã làm đúng <b>" + correctCount + "/" + questions.length + " câu</b>, xuất sắc vượt qua mốc điểm sàn 700 điểm của Certiport quốc tế.";
            } else {
                scoreDisplay.style.color = "#ff5252";
                badge.textContent = "CHƯA ĐẠT (FAIL)";
                badge.className = "status-badge badge-fail";
                summary.innerHTML = "⚠️ Rất tiếc! Bạn làm đúng <b>" + correctCount + "/" + questions.length + " câu</b>. Điểm số chưa đạt mốc 700. Hãy kiểm tra các câu lỗi và ôn tập kỹ hơn.";
            }

            overlay.classList.add('show');
            updateQuestion(); 
        }

        function restartExam() {
            resetQuizData();
        }

        function init() {
            var fullBank = database[1];
            var shuffledBank = shuffleArray(fullBank);
            questions = shuffledBank.slice(0, 45);
            userChoices = new Array(questions.length).fill(null);
            document.getElementById('btn-submit-exam').disabled = true;
            createNavigationButtons();
            startTimer();
            updateQuestion();
        }
        window.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>`;
    return htmlContent + scriptContent;
  }
};
