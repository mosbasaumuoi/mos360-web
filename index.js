const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Lấy dữ liệu Bảng Vàng
    let studentItems = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) {
          studentItems += `<div class="st-item"><img src="${link}"></div>`;
        }
      });
      studentItems += studentItems; 
    } catch (e) { studentItems = "<div>Dữ liệu đang nạp...</div>"; }

    let content = "";
    if (path === "/hocvien") {
      content = this.getStudentUI();
    } else {
      content = this.getHomeUI(studentItems);
    }

    return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  // --- TRANG CHỦ: TÁCH RIÊNG CÁC KHỐI ---
  getHomeUI(studentData) {
    return `
      <div class="stats-row">
        <div class="s-box"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="s-box"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="s-box"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>

      <div class="main-layout">
        <aside class="left-side">
          <div class="card wheel-card">
            <h3>🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-container">
              <div class="wheel-arrow"></div>
              <div class="wheel-body">
                <div class="w-segment s1">GIẢM 50k</div>
                <div class="w-segment s2">GIẢM 50%</div>
                <div class="w-segment s3">GIẢM 100k</div>
                <div class="w-segment s4">GIẢM 80%</div>
              </div>
              <div class="wheel-btn">QUAY</div>
            </div>
            <button class="cta-btn" onclick="location.href='/hocvien'">XEM KHÓA HỌC</button>
            
            <div class="promo-box">
              <span class="badge">ƯU ĐÃI</span>
              <p>Đăng ký Combo 3 môn tính tiền 2 môn (Chỉ 800k). Đăng ký ngay để nhận quà!</p>
            </div>
          </div>
        </aside>

        <section class="right-side">
          <div class="card golden-board">
            <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
            <div class="slider-wrapper">
              <div class="slider-track">${studentData}</div>
            </div>
          </div>
        </section>
      </div>

      <div class="services-grid">
        <div class="svc-item"><h3>Thi Thật 100%</h3><p>Mô phỏng sát đề thi quốc tế Certiport.</p></div>
        <div class="svc-item" style="border-color:var(--cyan)"><h3>Trợ lý AI 24/7 ✨</h3><p>Giải đáp tin học qua khung Chat AI.</p></div>
        <div class="svc-item"><h3>Đồng Hành Trọn Đời</h3><p>Hỗ trợ luận văn, đồ án chuyên nghiệp.</p></div>
      </div>`;
  },

  getStudentUI() {
    return `
      <div class="card student-portal" style="max-width:600px; margin:50px auto; text-align:center;">
        <h2 style="color:var(--primary)">Cổng Học Viên MOS360</h2>
        <div style="margin-top:30px; display:flex; flex-direction:column; gap:15px;">
           <button class="cta-btn" style="background:#00c2cb">ĐĂNG KÝ HỌC OFFLINE HẢI PHÒNG</button>
           <button class="cta-btn">ĐĂNG KÝ THI MOS QUỐC TẾ</button>
           <button class="cta-btn" style="background:#333" onclick="location.href='/'">QUAY LẠI TRANG CHỦ</button>
        </div>
      </div>`;
  },

  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet">
    <style>
      :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
      
      /* Header & Logo */
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); position: sticky; top:0; background: rgba(8,8,8,0.9); z-index: 1000; }
      .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
      .logo img { height: 38px; }
      .logo span { font-weight: 800; color: var(--primary); font-size: 1.4rem; }
      .nav a { color: #888; text-decoration: none; margin-left: 20px; font-weight: 700; font-size: 0.9rem; }
      .nav a:hover { color: var(--primary); }

      /* SOCIAL SIDEBAR (FIX TIKTOK) */
      .sidebar-links { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 2000; }
      .link-circle { width: 44px; height: 44px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; cursor: pointer; }
      .link-circle img { width: 20px; }
      .link-circle:hover { background: var(--primary); border-color: var(--primary); transform: scale(1.1); }
      .tk-link { background: transparent !important; } /* Xóa nền Tiktok */
      .tk-link img { filter: brightness(0) invert(1); } /* Làm icon Tiktok trắng */

      /* Thống kê ngang */
      .stats-row { display: flex; justify-content: center; gap: 80px; padding: 40px 0; border-bottom: 1px solid var(--border); }
      .s-box h2 { color: var(--primary); font-size: 2.8rem; margin-bottom: 5px; }
      .s-box p { color: #888; font-weight: 700; font-size: 0.9rem; }

      /* Main Grid */
      .main-layout { display: grid; grid-template-columns: 380px 1fr; gap: 30px; max-width: 1400px; margin: 30px auto; padding: 0 5%; }
      .card { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 25px; position: relative; }
      .card h3 { font-size: 1.1rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }

      /* Vòng quay & Khuyến mại */
      .wheel-container { position: relative; width: 200px; height: 200px; margin: 0 auto 20px; }
      .wheel-arrow { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 18px solid var(--primary); z-index: 10; }
      .wheel-body { width: 100%; height: 100%; border-radius: 50%; border: 5px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: rotate 10s linear infinite; }
      .w-segment { position: absolute; width: 100%; height: 100%; top:0; left:0; display: flex; justify-content: center; padding-top: 30px; font-weight: 800; font-size: 0.65rem; }
      .s1{transform:rotate(45deg)}.s2{transform:rotate(135deg)}.s3{transform:rotate(225deg)}.s4{transform:rotate(315deg)}
      .wheel-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 55px; height: 55px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.7rem; border: 3px solid #fff; }
      
      .promo-box { margin-top: 20px; padding: 15px; border: 1px dashed var(--primary); border-radius: 12px; background: rgba(255,87,34,0.05); position: relative; }
      .promo-box p { font-size: 0.85rem; color: #ccc; line-height: 1.4; }
      .badge { position: absolute; top: -10px; left: 15px; background: var(--primary); padding: 2px 10px; border-radius: 10px; font-size: 0.7rem; font-weight: 800; }

      /* BẢNG VÀNG CHUẨN KHUNG ĐỎ */
      .slider-wrapper { overflow: hidden; border-radius: 15px; background: #000; padding: 20px 0; border: 2px solid #333; }
      .slider-track { display: flex; gap: 20px; animation: scroll 40s linear infinite; }
      .st-item img { height: 320px; border-radius: 10px; object-fit: contain; }
      
      /* Services */
      .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1400px; margin: 40px auto; padding: 0 5%; }
      .svc-item { background: var(--card); padding: 30px; border-radius: 20px; border-left: 5px solid var(--primary); }
      .svc-item h3 { margin-bottom: 10px; font-size: 1.2rem; }
      .svc-item p { color: #888; font-size: 0.95rem; }

      .cta-btn { background: var(--primary); color: #fff; border: none; padding: 12px; border-radius: 12px; font-weight: 800; cursor: pointer; width: 100%; transition: 0.3s; margin-top: 10px; }
      
      /* FOOTER CHUẨN VỊ TRÍ & GIỜ MỞ CỬA */
      footer { padding: 60px 5% 40px; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
      .footer-flex { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 40px; }
      .time-card { background: #111; padding: 20px; border-radius: 15px; border: 1px solid #222; }
      .time-card p { font-size: 0.9rem; margin-top: 5px; color: #aaa; }
      .map-box { border-radius: 15px; overflow: hidden; height: 180px; border: 1px solid var(--border); filter: grayscale(1); transition: 0.5s; }
      .map-box:hover { filter: grayscale(0); border-color: var(--primary); }

      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo"><img src="${CONFIG.LOGO_URL}"> <span>MOS360</span></a>
      <div class="nav"><a href="/">Trang Chủ</a><a href="/hocvien">Học Viên</a></div>
    </header>

    <div class="sidebar-links">
      <a href="https://zalo.me/0912888360" class="link-circle"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
      <a href="https://facebook.com/MOS360.EDU" class="link-circle"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
      <a href="https://m.me/MOS360.EDU" class="link-circle"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"></a>
      <a href="https://youtube.com/@mos360_vn" class="link-circle"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
      <a href="https://tiktok.com/@mos360.vn" class="link-circle tk-link"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>

    <main>${content}</main>

    <footer>
      <div class="footer-flex">
        <div>
          <h2 style="color:var(--primary); margin-bottom:10px;">MOS360.VN</h2>
          <p>Hotline: 0912.888.360</p>
          <p>Địa chỉ: 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
        </div>
        <div class="time-card">
          <h4 style="color:var(--cyan)">🕒 GIỜ MỞ CỬA</h4>
          <p>• Sáng: 08:00 – 11:30</p>
          <p>• Chiều: 13:30 – 17:00</p>
          <p style="font-size:0.75rem; color:var(--primary); margin-top:10px;">* Hỗ trợ trực tuyến 24/7</p>
        </div>
        <div class="map-box">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.641656832442!2d106.6775191!3d20.8461741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af93683a303%3A0x6771746771746771!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZw!5e0!3m2!1svi!2s!4v1700000000000" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    </footer>
    </body></html>`;
  }
};
