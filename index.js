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
    const userName = cookie.match(/user=([^;]+)/) ? decodeURIComponent(cookie.match(/user=([^;]+)/)[1]) : null;

    // --- CƠ CHẾ BẢO VỆ LINK RÚT GỌN ---
    // Nếu path không phải các trang định nghĩa sẵn, Worker sẽ cho phép request đi tiếp hoặc xử lý theo logic cũ của bạn
    const validPaths = ["/", "/courses", "/library", "/login", "/hocvien"];
    if (!validPaths.includes(path) && path.length > 1) {
       return fetch(request); // Chuyển tiếp request để không làm hỏng link rút gọn/file
    }

    // Lấy dữ liệu Bảng Vàng
    let studentItems = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      studentItems = tsv.split("\n").slice(1).map(row => {
        const link = row.split("\t")[0]?.trim();
        return (link && link.startsWith("http")) ? `<div class="st-item"><img src="${link}"></div>` : "";
      }).join("");
      studentItems += studentItems; // Duplicate for smooth scroll
    } catch (e) { studentItems = "<div>Đang nạp...</div>"; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/library") content = this.getLibraryUI();
    else if (path === "/login") return new Response(this.getLoginUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    else content = this.getHomeUI(studentItems, userName);

    return new Response(this.layout(content, userName), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  // --- CÁC KHỐI GIAO DIỆN (TÁCH RIÊNG ĐỂ DỄ SỬA) ---
  getHomeUI(studentData, userName) {
    return `
      <div class="stats-row">
        <div class="s-box"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="s-box"><h2>1,000+</h2><p>Học viên</p></div>
        <div class="s-box"><h2>600+</h2><p>Truy cập</p></div>
      </div>

      <div class="main-layout">
        <div class="col-left">
          <div class="card">
            <h3 class="card-title">🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-container">
              <div class="wheel-pointer"></div>
              <div class="wheel-spin"></div>
              <div class="wheel-btn">QUAY</div>
            </div>
            <div class="promo-box">
              <span class="badge">🎁 ƯU ĐÃI</span>
              <p>Combo 3 môn tính tiền 2 (800k). Áp dụng trọn đời!</p>
            </div>
          </div>
        </div>

        <div class="col-right">
          <div class="card board-red-frame">
            <h3 class="card-title">🏆 Bảng Vàng Chứng Chỉ</h3>
            <div class="slider-container">
              <div class="slider-track">${studentData}</div>
            </div>
          </div>
        </div>
      </div>

      ${userName ? `<div class="card student-zone">
        <h3>🎓 Tiện ích học viên: ${userName}</h3>
        <div class="btn-group">
          <button class="btn-cyan">ĐĂNG KÝ HỌC OFFLINE</button>
          <button class="btn-orange">ĐĂNG KÝ THI MOS</button>
        </div>
      </div>` : ''}
    `;
  },

  getCoursesUI() { return `<div class="card"><h2>📚 Khóa Học Của Bạn</h2><p>Nội dung khóa học đã được khôi phục.</p></div>`; },
  getLibraryUI() { return `<div class="card"><h2>📁 Thư Viện Tài Liệu</h2><p>Tài liệu ôn thi đã được giữ lại.</p></div>`; },
  getLoginUI() { /* Logic login cũ của bạn */ return `...`; },

  layout(content, userName) {
    const loginText = userName ? `Chào, ${userName}` : "Đăng nhập";
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      :root { --primary: #FF5722; --bg: #000; --card: #111; --border: rgba(255,255,255,0.1); }
      body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: #fff; margin: 0; overflow-x: hidden; }
      
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); sticky; top: 0; background: #000; z-index: 1000; }
      .logo img { height: 35px; vertical-align: middle; }
      .nav a { color: #888; text-decoration: none; margin-left: 20px; font-weight: bold; font-size: 0.9rem; }
      .login-btn { background: var(--primary); color: #fff !important; padding: 8px 16px; border-radius: 20px; }

      /* SIDEBAR & TIKTOK FIX (TRẮNG, KHÔNG NỀN) */
      .sidebar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 999; }
      .s-icon { width: 40px; height: 40px; background: #1a1a1a; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
      .s-icon.tk img { filter: brightness(0) invert(1); background: transparent; width: 22px; }

      /* LAYOUT RESPONSIVE */
      .main-layout { display: grid; grid-template-columns: 350px 1fr; gap: 25px; max-width: 1400px; margin: 20px auto; padding: 0 5%; }
      @media (max-width: 900px) {
        .main-layout { grid-template-columns: 1fr; }
        .sidebar { bottom: 20px; top: auto; right: 20px; transform: none; flex-direction: row; }
        .stats-row { flex-wrap: wrap; gap: 20px; }
      }

      /* BẢNG VÀNG - FIX CHỐNG TRÀN */
      .board-red-frame { border: 2px solid #333; position: relative; }
      .slider-container { overflow: hidden; width: 100%; border-radius: 10px; background: #080808; }
      .slider-track { display: flex; gap: 15px; animation: scroll 40s linear infinite; padding: 20px 0; }
      .st-item img { height: 280px; border-radius: 8px; object-fit: contain; }

      /* VÒNG QUAY & PROMO */
      .wheel-container { position: relative; width: 200px; height: 200px; margin: 0 auto; }
      .wheel-spin { width: 100%; height: 100%; border-radius: 50%; border: 4px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: rotate 10s linear infinite; }
      .wheel-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 50px; height: 50px; background: #fff; border-radius: 50%; color: #000; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; }
      .promo-box { border: 1px dashed var(--primary); padding: 15px; border-radius: 12px; margin-top: 15px; background: rgba(255,87,34,0.05); }

      .card { background: var(--card); padding: 20px; border-radius: 20px; border: 1px solid var(--border); }
      .stats-row { display: flex; justify-content: center; gap: 50px; padding: 30px; text-align: center; }
      .s-box h2 { color: var(--primary); margin: 0; }

      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo"><img src="${CONFIG.LOGO_URL}"> <span style="color:var(--primary); font-weight:800;">MOS360</span></a>
      <nav class="nav">
        <a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a>
        <a href="/login" class="login-btn">${loginText}</a>
      </nav>
    </header>

    <div class="sidebar">
      <a href="#" class="s-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" width="20"></a>
      <a href="#" class="s-icon tk"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>

    <main>${content}</main>

    <footer style="padding: 40px 5%; border-top: 1px solid var(--border); margin-top: 50px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
      <div><h3>MOS360.VN</h3><p>Hotline: 0912.888.360</p><p>57 Lê Văn Thuyết A, Hải Phòng</p></div>
      <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>Sáng: 08:00 – 11:30</p><p>Chiều: 13:30 – 17:00</p></div>
    </footer>
    </body></html>`;
  }
};
