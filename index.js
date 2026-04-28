const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cookie = request.headers.get("Cookie") || "";
    const userMatch = cookie.match(/user=([^;]+)/);
    const userName = userMatch ? decodeURIComponent(userMatch[1]) : null;

    // 1. Lấy dữ liệu Bảng Vàng (Giữ nguyên logic nạp data của bạn)
    let studentItems = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) {
          studentItems += `<div class="st-item"><img src="${link}" loading="lazy"></div>`;
        }
      });
      studentItems += studentItems; // Nhân đôi để tạo hiệu ứng chạy vô tận
    } catch (e) { studentItems = "<div>Đang nạp dữ liệu...</div>"; }

    // 2. Điều hướng không làm mất trang cũ
    let bodyContent = "";
    if (path === "/courses") bodyContent = `<div class="card page-content"><h2>📚 Danh sách Khóa học</h2><p>Nội dung khóa học của bạn ở đây...</p></div>`;
    else if (path === "/library") bodyContent = `<div class="card page-content"><h2>📁 Thư viện tài liệu</h2><p>Dữ liệu tài liệu ở đây...</p></div>`;
    else bodyContent = this.getHomeUI(studentItems, userName);

    return new Response(this.layout(bodyContent, userName), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  getHomeUI(studentData, userName) {
    return `
      <div class="stats-container">
        <div class="stat-item"><strong>100%</strong><span>Đỗ ngay lần đầu</span></div>
        <div class="stat-item"><strong>1,000+</strong><span>Học viên đăng ký</span></div>
        <div class="stat-item"><strong>600+</strong><span>Truy cập</span></div>
      </div>

      <div class="grid-main">
        <div class="col-left">
          <div class="card wheel-card">
            <h3>🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-wrapper">
              <div class="wheel-pointer"></div>
              <div class="wheel-spin"></div>
              <div class="wheel-center">QUAY</div>
            </div>
            <div class="promo-box">
              <span class="promo-tag">ƯU ĐÃI</span>
              <p>Combo 3 môn tính tiền 2 (800k). Áp dụng trọn đời!</p>
            </div>
          </div>
        </div>

        <div class="col-right">
          <div class="card board-card">
            <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
            <div class="golden-slider">
              <div class="slider-track">${studentData}</div>
            </div>
          </div>
        </div>
      </div>

      ${userName ? `
      <div class="card student-portal">
        <h3>🎓 Tiện ích học viên: ${userName}</h3>
        <div class="portal-btns">
          <button class="btn-cyan">ĐĂNG KÝ HỌC OFFLINE</button>
          <button class="btn-orange">ĐĂNG KÝ THI MOS</button>
        </div>
      </div>` : ''}

      <div class="services-row">
        <div class="svc-card"><h4>Thi Thật 100%</h4><p>Sát đề Certiport.</p></div>
        <div class="svc-card active"><h4>Trợ lý AI 24/7</h4><p>Giải đáp kiến thức tin học.</p></div>
        <div class="svc-card"><h4>Đồng Hành</h4><p>Hỗ trợ luận văn trọn đời.</p></div>
      </div>`;
  },

  layout(content, userName) {
    const btnText = userName ? `Chào, ${userName}` : "Đăng nhập";
    return `<!DOCTYPE html><html lang="vi"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;800&display=swap" rel="stylesheet">
    <style>
      :root { --primary: #FF5722; --bg: #000; --card: #111; --border: rgba(255,255,255,0.1); }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: #fff; line-height: 1.5; }

      /* Header */
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); position: sticky; top:0; background: rgba(0,0,0,0.9); z-index: 100; }
      .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--primary); font-weight: 800; font-size: 1.2rem; }
      .logo img { height: 32px; }
      .nav { display: flex; gap: 15px; align-items: center; }
      .nav a { color: #aaa; text-decoration: none; font-size: 0.85rem; font-weight: 600; }
      .btn-login { background: var(--primary); color: #fff !important; padding: 8px 16px; border-radius: 20px; }

      /* Sidebar & TikTok Fix */
      .sidebar-social { position: fixed; right: 15px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 1000; }
      .social-link { width: 42px; height: 42px; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
      .social-link img { width: 22px; }
      .tk-fix { background: transparent !important; border: 1px solid var(--border); }
      .tk-fix img { filter: brightness(0) invert(1); } /* Biến logo TikTok thành màu trắng */

      /* Layout */
      .stats-container { display: flex; justify-content: center; gap: 30px; padding: 40px 5%; text-align: center; }
      .stat-item strong { display: block; font-size: 1.8rem; color: var(--primary); }
      .stat-item span { font-size: 0.8rem; color: #888; }

      .grid-main { display: grid; grid-template-columns: 320px 1fr; gap: 20px; max-width: 1200px; margin: 0 auto; padding: 0 5%; }
      .card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 20px; }
      
      /* Bảng Vàng Fix Khung */
      .golden-slider { overflow: hidden; width: 100%; position: relative; border-radius: 15px; background: #080808; border: 1px solid #333; }
      .slider-track { display: flex; gap: 15px; animation: slide 40s linear infinite; padding: 20px 0; }
      .st-item img { height: 250px; border-radius: 10px; object-fit: contain; border: 1px solid #222; }

      /* Vòng quay */
      .wheel-wrapper { position: relative; width: 180px; height: 180px; margin: 0 auto 20px; }
      .wheel-spin { width: 100%; height: 100%; border-radius: 50%; border: 4px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); }
      .wheel-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 50px; height: 50px; background: #fff; border-radius: 50%; color: #000; font-size: 0.6rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }

      .promo-box { border: 1px dashed var(--primary); padding: 12px; border-radius: 12px; background: rgba(255,87,34,0.05); text-align: center; }
      .promo-tag { background: var(--primary); font-size: 0.65rem; padding: 2px 8px; border-radius: 4px; }

      /* Mobile Fix */
      @media (max-width: 800px) {
        .grid-main { grid-template-columns: 1fr; }
        .stats-container { gap: 15px; flex-wrap: wrap; }
        .sidebar-social { bottom: 20px; top: auto; right: 20px; transform: none; flex-direction: row; }
      }

      footer { padding: 40px 5%; border-top: 1px solid var(--border); margin-top: 40px; }
      .f-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; }

      @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
      <nav class="nav">
        <a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a>
        <a href="/login" class="btn-login">${btnText}</a>
      </nav>
    </header>

    <div class="sidebar-social">
      <a href="#" class="social-link"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
      <a href="#" class="social-link"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
      <a href="#" class="social-link tk-fix"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>

    <main>${content}</main>

    <footer>
      <div class="f-grid">
        <div><h4>MOS360.VN</h4><p>Hotline: 0912.888.360</p><p>57 Lê Văn Thuyết A, Hải Phòng</p></div>
        <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>Sáng: 08:00 – 11:30</p><p>Chiều: 13:30 – 17:00</p></div>
        <div style="background:#111; height:120px; border-radius:10px; border:1px solid #333;"></div>
      </div>
    </footer>
    </body></html>`;
  }
};
