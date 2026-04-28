const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. CƠ CHẾ NHƯỜNG ĐƯỜNG (Để bảo vệ link rút gọn và Hosting)
    // Chỉ xử lý các path trang chính, còn lại nhả về cho hosting xử lý
    const webPaths = ["/", "/index.html", "/courses", "/library", "/login"];
    if (!webPaths.includes(path)) {
      return fetch(request);
    }

    // 2. LẤY DỮ LIỆU BẢNG VÀNG (Nội dung chốt ngày hôm qua)
    let studentData = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) {
          htmlContent += `<div class="student-item"><img src="${link}" onerror="this.src='https://via.placeholder.com/520x360?text=MOS360'"></div>`;
        }
      });
      studentData = htmlContent + htmlContent; 
    } catch (e) {
      studentData = "<p>Đang nạp dữ liệu...</p>";
    }

    // 3. ĐIỀU HƯỚNG NỘI DUNG (Bố cục hôm nay)
    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/library") content = this.getLibraryUI();
    else if (path === "/login") content = this.getLoginUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  },

  // NỘI DUNG TRANG CHỦ (Kết hợp Vòng quay + Bảng vàng to)
  getHomeUI(studentData) {
    return `
      <section class="hero">
          <h1>Chuẩn đầu ra cho sinh viên</h1>
          <p style="color:#888;">Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
      </section>

      <div class="main-container">
          <div class="section-card">
              <h3 style="color:var(--primary); margin-bottom:20px;">🎡 Vòng Quay May Mắn</h3>
              <div class="wheel-box">
                  <div class="wheel-pointer"></div>
                  <div class="wheel-circle">
                      <div class="wheel-label-container">
                          <div class="wheel-label l1"><b>GIẢM 50K</b></div>
                          <div class="wheel-label l2"><b>GIẢM 50%</b></div>
                          <div class="wheel-label l3"><b>GIẢM 100K</b></div>
                          <div class="wheel-label l4"><b>GIẢM 80%</b></div>
                      </div>
                  </div>
                  <div class="wheel-center">QUAY</div>
              </div>
              <button class="btn-action">NHẬN QUÀ NGAY</button>
          </div>

          <div class="section-card" style="text-align:left;">
              <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
              <div class="carousel-viewport">
                  <div class="carousel-track">${studentData}</div>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card"><h3>Thi Thật 100%</h3><p>Hệ thống mô phỏng sát đề quốc tế.</p></div>
          <div class="service-card ai-chat-card">
              <h3 style="color:var(--cyan);">AI Assistant 24/7 ✨</h3>
              <div class="chat-input-box"><input type="text" placeholder="Hỏi hàm Excel..."><button>GỬI</button></div>
          </div>
          <div class="service-card"><h3>Đồng Hành</h3><p>Hỗ trợ luận văn trọn đời.</p></div>
      </div>`;
  },

  getCoursesUI() {
    return `<div class="section-card" style="max-width:1000px; margin:40px auto;">
      <h2>Hệ Thống Khóa Học</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:20px; text-align:left;">
        <div style="background:#1a1a1a; padding:20px; border-radius:15px;"><h4>Nhóm 2019</h4><p>Word, Excel, PowerPoint</p></div>
        <div style="background:#1a1a1a; padding:20px; border-radius:15px;"><h4>Nhóm 365</h4><p>Word, Excel, PowerPoint</p></div>
      </div>
    </div>`;
  },

  getLibraryUI() {
    return `<div class="section-card" style="max-width:800px; margin:40px auto;"><h2>📚 Thư Viện Tài Liệu</h2><p>Dữ liệu đang được đồng bộ...</p></div>`;
  },

  getLoginUI() {
    return `<div class="section-card" style="max-width:400px; margin:40px auto;">
      <h2>Đăng Nhập</h2>
      <input type="text" placeholder="Tài khoản" style="width:100%; padding:10px; margin-top:20px; border-radius:8px; border:none;">
      <button class="btn-action">Vào hệ thống</button>
    </div>`;
  },

  layout(content) {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.95); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 1.4rem; }
        .brand img { width: 40px; }
        nav { display: flex; gap: 20px; align-items: center; }
        nav a { color: #888; text-decoration: none; font-weight: 700; font-size: 0.9rem; }
        nav a:hover { color: var(--primary); }

        .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
        .social-item { width: 45px; height: 45px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: 0.3s; }
        .social-item:hover { border-color: var(--primary); transform: scale(1.1); }
        .social-item img, .social-item svg { width: 22px; height: 22px; }

        .hero { text-align: center; padding: 60px 20px 30px; }
        .main-container { max-width: 1400px; margin: 0 auto; padding: 0 5%; display: grid; grid-template-columns: 420px 1fr; gap: 30px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 30px; text-align: center; overflow: hidden; }

        /* VÒNG QUAY */
        .wheel-box { position: relative; width: 300px; height: 300px; margin: 0 auto 20px; }
        .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 8px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 20s linear infinite; position: relative; }
        .wheel-pointer { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); border-top: 20px solid #FFD700; border-left: 10px solid transparent; border-right: 10px solid transparent; z-index: 10; }
        .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 60px; height: 60px; background: #fff; border-radius: 50%; color: #000; display: flex; align-items: center; justify-content: center; font-weight: 900; z-index: 20; }
        .wheel-label { position: absolute; top:0; left:0; width:100%; height:100%; display:flex; justify-content:center; align-items:flex-start; padding-top:35px; }
        .l1{transform:rotate(45deg)} .l2{transform:rotate(135deg)} .l3{transform:rotate(225deg)} .l4{transform:rotate(315deg)}

        /* BẢNG VÀNG */
        .carousel-viewport { width: 100%; overflow: hidden; margin-top: 15px; }
        .carousel-track { display: flex; gap: 20px; animation: scroll 45s linear infinite; }
        .student-item img { height: 360px; border-radius: 15px; border: 1px solid var(--border); object-fit: contain; }

        .services-grid { max-width: 1400px; margin: 40px auto; padding: 0 5%; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .service-card { background: var(--card); padding: 30px; border-radius: 25px; border-left: 4px solid var(--primary); }
        .ai-chat-card { border: 1px solid var(--cyan); border-left: 4px solid var(--cyan); }
        .chat-input-box { display: flex; background: #000; border-radius: 10px; margin-top: 10px; padding: 5px; }
        .chat-input-box input { flex:1; background:transparent; border:none; color:white; padding:10px; outline:none; }
        .chat-input-box button { background:var(--cyan); border:none; padding:10px; border-radius:8px; font-weight:800; cursor:pointer; }

        .btn-action { background: var(--primary); color: white; border: none; padding: 15px; border-radius: 50px; font-weight: 800; width: 100%; cursor: pointer; margin-top: 10px; }

        footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 900px) { .main-container { grid-template-columns: 1fr; } .side-social { display:none; } }
    </style>
</head>
<body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> <span>MOS360</span></a>
        <nav>
            <a href="/">Trang Chủ</a>
            <a href="/courses">Khóa Học</a>
            <a href="/library">Tài Liệu</a>
            <a href="/login" style="color:var(--primary)">Đăng Nhập</a>
        </nav>
    </header>

    <div class="side-social">
        <a href="https://zalo.me/0912888360" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="https://www.facebook.com/MOS360.EDU" target="_blank" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="https://www.tiktok.com/@mos360.vn" target="_blank" class="social-item"><svg viewBox="0 0 24 24" fill="white" style="width:20px"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.12-.91.38-1.57 1.23-1.73 2.19-.11.64-.03 1.3.18 1.91.43 1.13 1.53 1.95 2.73 2.11 1.19.16 2.45-.19 3.33-1.01.62-.57.97-1.38 1-2.22.04-4.52-.01-9.04.01-13.56z"/></svg></a>
    </div>

    <main>${content}</main>

    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>Hotline: 0912.888.360</p><p>57 Lê Văn Thuyết A, Hải Phòng</p></div>
            <div style="font-size:0.9rem;">
                <h4 style="color:var(--cyan)">🕒 GIỜ LÀM VIỆC</h4>
                <p>Sáng: 08:00 – 11:30</p>
                <p>Chiều: 13:30 – 17:00</p>
                <p>Nghỉ Chủ Nhật và ngày lễ</p>
            </div>
            <div style="border-radius:15px; overflow:hidden; height:150px; filter:grayscale(1);"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.324147313386!2d106.6713!3d20.858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDUxJzI4LjgiTiAxMDbCsDQwJzE2LjciRQ!5e0!3m2!1svi!2s!4v1620000000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;"></iframe></div>
        </div>
    </footer>
</body>
</html>`;
  }
};
