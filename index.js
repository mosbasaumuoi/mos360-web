const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // --- BẢO VỆ LINK RÚT GỌN (TRẢ LẠI QUYỀN CHO SERVER GỐC) ---
    // Nếu đường dẫn không phải là trang chủ, hãy để Server gốc xử lý (Fix lỗi 522)
    if (path !== "/" && path !== "/index.html") {
      return fetch(request);
    }

    // Lấy cookie người dùng
    const cookie = request.headers.get("Cookie") || "";
    const userName = cookie.match(/user=([^;]+)/) ? decodeURIComponent(cookie.match(/user=([^;]+)/)[1]) : null;

    // Lấy dữ liệu Bảng Vàng
    let studentItems = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      studentItems = tsv.split("\n").slice(1).map(row => {
        const link = row.split("\t")[0]?.trim();
        return (link && link.startsWith("http")) ? `<div class="st-item"><img src="${link}"></div>` : "";
      }).join("");
      studentItems += studentItems; // Chạy lặp lại
    } catch (e) { studentItems = "<div>Đang nạp dữ liệu...</div>"; }

    return new Response(this.layout(studentItems, userName), { 
      headers: { "Content-Type": "text/html;charset=UTF-8" } 
    });
  },

  layout(studentData, userName) {
    const loginBtn = userName ? `Chào, ${userName}` : "Đăng nhập";
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      :root { --primary: #FF5722; --bg: #000; --card: #111; --border: rgba(255,255,255,0.1); }
      * { box-sizing: border-box; }
      body { font-family: sans-serif; background: var(--bg); color: #fff; margin: 0; overflow-x: hidden; }
      
      header { padding: 10px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); background: #000; position: sticky; top: 0; z-index: 9999; }
      .logo img { height: 35px; }
      .nav a { color: #888; text-decoration: none; margin-left: 20px; font-weight: bold; font-size: 0.9rem; }
      .login-btn { background: var(--primary); color: #fff !important; padding: 8px 16px; border-radius: 20px; }

      /* SIDEBAR - Fix logo TikTok không bị nền xám */
      .sidebar { position: fixed; right: 15px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 1000; }
      .s-icon { width: 40px; height: 40px; background: #222; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); overflow: hidden; }
      .s-icon.tk-fix { background: transparent !important; border: none; }
      .s-icon img { width: 22px; filter: brightness(0) invert(1); } /* Chuyển icon sang trắng */

      /* GRID LAYOUT - Fix vỡ màn hình */
      .stats-row { display: flex; justify-content: center; gap: 40px; padding: 30px; text-align: center; }
      .stats-row h2 { color: var(--primary); margin: 0; }
      
      .main-content { display: grid; grid-template-columns: 320px 1fr; gap: 20px; padding: 0 5%; max-width: 1400px; margin: 0 auto; }
      .card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 20px; }

      /* BẢNG VÀNG - KHÓA CHẾT KHUNG (Fix ảnh khổng lồ) */
      .golden-board { overflow: hidden; border: 2px solid #333; position: relative; }
      .slider-container { overflow: hidden; width: 100%; position: relative; }
      .slider-track { display: flex; gap: 15px; animation: scroll 40s linear infinite; }
      .st-item img { height: 260px; width: auto; border-radius: 8px; object-fit: contain; }

      /* MOBILE */
      @media (max-width: 850px) {
        .main-content { grid-template-columns: 1fr; }
        .sidebar { bottom: 20px; top: auto; right: 20px; transform: none; flex-direction: row; }
      }

      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo"><img src="${CONFIG.LOGO_URL}"></a>
      <nav class="nav">
        <a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a>
        <a href="/login" class="login-btn">${loginBtn}</a>
      </nav>
    </header>

    <div class="sidebar">
      <a href="#" class="s-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
      <a href="#" class="s-icon tk-fix"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>

    <div class="stats-row">
      <div><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
      <div><h2>1,000+</h2><p>Học viên đăng ký</p></div>
      <div><h2>600+</h2><p>Truy cập thường xuyên</p></div>
    </div>

    <div class="main-content">
      <div class="col-left">
        <div class="card">
          <h3>🎡 Vòng Quay May Mắn</h3>
          <div style="height:150px; background:conic-gradient(red, yellow, blue, red); border-radius:50%; margin: 20px auto; width:150px;"></div>
          <button style="width:100%; background:var(--primary); border:none; color:#fff; padding:10px; border-radius:10px; font-weight:bold;">QUAY NGAY</button>
        </div>
      </div>
      <div class="col-right">
        <div class="card golden-board">
          <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
          <div class="slider-container"><div class="slider-track">${studentData}</div></div>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 40px 5%;">
      <div class="card"><h3>Thi Thật 100%</h3><p>Mô phỏng sát đề quốc tế.</p></div>
      <div class="card" style="border-left: 4px solid var(--primary);"><h3>AI Trợ Lý 24/7 ✨</h3><p>Giải đáp tin học tức thì.</p></div>
      <div class="card"><h3>Hỗ Trợ Trọn Đời</h3><p>Đồng hành cùng học viên.</p></div>
    </div>
    </body></html>`;
  }
};
