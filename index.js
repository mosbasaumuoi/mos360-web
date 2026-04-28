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
    } catch (e) { studentItems = "<div>Đang kết nối dữ liệu...</div>"; }

    // ĐIỀU HƯỚNG TRANG (KHÔNG BỎ SÓT)
    let bodyContent = "";
    if (path === "/courses") bodyContent = this.getCoursesUI();
    else if (path === "/library") bodyContent = this.getLibraryUI();
    else if (path === "/login") return new Response(this.getLoginUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    else bodyContent = this.getHomeUI(studentItems, userName);

    return new Response(this.layout(bodyContent, userName), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  // --- TRANG CHỦ ---
  getHomeUI(studentData, userName) {
    return `
      <div class="stats-row">
        <div class="s-box"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="s-box"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="s-box"><h2>600+</h2><p>Truy cập</p></div>
      </div>
      <div class="main-layout">
        <aside class="left-side">
          <div class="card">
            <h3>🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-box">
              <div class="wheel-arrow"></div>
              <div class="wheel-body"><div class="w-txt t1">50k</div><div class="w-txt t2">50%</div><div class="w-txt t3">100k</div><div class="w-txt t4">80%</div></div>
              <div class="wheel-btn">QUAY</div>
            </div>
            <div class="promo-box">
              <span class="badge">🎁 ƯU ĐÃI</span>
              <p>Combo 3 môn tính tiền 2 (Chỉ 800k).</p>
            </div>
          </div>
        </aside>
        <section class="right-side">
          <div class="card golden-board">
            <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
            <div class="slider-wrapper"><div class="slider-track">${studentData}</div></div>
          </div>
        </section>
      </div>
      ${userName ? `
      <div class="student-zone card">
        <h3>🎓 Cổng Học Viên: ${userName}</h3>
        <div class="btn-group">
          <button class="cta-btn" style="background:#00c2cb">ĐĂNG KÝ HỌC OFFLINE</button>
          <button class="cta-btn">ĐĂNG KÝ THI MOS QUỐC TẾ</button>
        </div>
      </div>` : ''}
      <div class="services-grid">
        <div class="svc-item"><h3>Thi Thật 100%</h3><p>Mô phỏng sát đề Certiport.</p></div>
        <div class="svc-item" style="border-color:var(--cyan)"><h3>AI Trợ lý</h3><p>Giải đáp tin học 24/7.</p></div>
        <div class="svc-item"><h3>Đồng Hành</h3><p>Hỗ trợ luận văn trọn đời.</p></div>
      </div>`;
  },

  // --- GIỮ LẠI TRANG CŨ ---
  getCoursesUI() { return `<div class="card" style="margin:20px;"><h2>Hệ thống khóa học MOS 2019/365</h2><p>Danh sách đang được nạp...</p></div>`; },
  getLibraryUI() { return `<div class="card" style="margin:20px;"><h2>📚 Thư viện tài liệu thi MOS</h2><p>Dữ liệu đang nạp...</p></div>`; },
  getLoginUI() { return `<html><body style="background:#000;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
    <div style="background:#111;padding:40px;border-radius:20px;border:1px solid #333;text-align:center;">
      <h2>ĐĂNG NHẬP MOS360</h2>
      <input id="u" placeholder="Tên học viên" style="display:block;width:100%;margin:20px 0;padding:10px;background:#222;border:1px solid #444;color:#fff;">
      <button onclick="document.cookie='user='+document.getElementById('u').value+';path=/';location.href='/'" style="width:100%;padding:10px;background:#FF5722;border:none;color:#fff;font-weight:bold;cursor:pointer;">VÀO HỌC NGAY</button>
    </div></body></html>`; },

  // --- LAYOUT CHUẨN RESPONSIVE & SIDEBAR TIKTOK ---
  layout(content, userName) {
    const loginLabel = userName ? `Chào, ${userName}` : "Đăng nhập";
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet">
    <style>
      :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.1); --cyan: #00f2ff; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
      
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: #000; border-bottom: 1px solid var(--border); position: sticky; top:0; z-index:1000; }
      .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
      .logo img { height: 35px; }
      .logo span { font-weight: 800; color: var(--primary); font-size: 1.3rem; }
      
      .nav { display: flex; align-items: center; gap: 15px; }
      .nav a { color: #888; text-decoration: none; font-weight: 700; font-size: 0.85rem; }
      .login-btn { background: var(--primary); color: #fff !important; padding: 8px 15px; border-radius: 8px; }

      .sidebar { position: fixed; right: 15px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 2000; }
      .s-link { width: 40px; height: 40px; background: #1a1a1a; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
      .tk-fix { background: transparent !important; }
      .tk-fix img { filter: brightness(0) invert(1); width: 20px; }

      .stats-row { display: flex; justify-content: center; gap: 40px; padding: 30px 5%; text-align: center; }
      .main-layout { display: grid; grid-template-columns: 350px 1fr; gap: 20px; max-width: 1300px; margin: 0 auto; padding: 0 5%; }
      
      /* MOBILE RESPONSIVE */
      @media (max-width: 900px) {
        .main-layout { grid-template-columns: 1fr; }
        .sidebar { bottom: 20px; top: auto; right: 20px; transform: none; flex-direction: row; }
        .stats-row { gap: 15px; }
        .stats-row h2 { font-size: 1.4rem; }
      }

      .card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 20px; }
      
      /* FIX BẢNG VÀNG KHÔNG TRÀN CẠNH */
      .slider-wrapper { overflow: hidden; border-radius: 15px; background: #000; padding: 15px 0; border: 2px solid #333; width: 100%; position: relative; }
      .slider-track { display: flex; gap: 15px; animation: scroll 30s linear infinite; }
      .st-item img { height: 280px; border-radius: 10px; object-fit: contain; }

      .wheel-box { position: relative; width: 180px; height: 180px; margin: 0 auto 15px; }
      .wheel-body { width: 100%; height: 100%; border-radius: 50%; border: 4px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: rotate 10s linear infinite; }
      .wheel-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 45px; height: 45px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; border: 3px solid #fff; color:#000; font-size:0.7rem; }

      .promo-box { margin-top: 10px; padding: 10px; border: 1px dashed var(--primary); border-radius: 8px; font-size:0.8rem; }
      .btn-group { display: flex; gap: 10px; margin-top: 15px; }
      .cta-btn { flex: 1; padding: 10px; border-radius: 10px; border: none; color: #fff; font-weight: bold; background: var(--primary); cursor: pointer; }

      .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1300px; margin: 30px auto; padding: 0 5%; }
      .svc-item { background: var(--card); padding: 20px; border-radius: 15px; border-left: 4px solid var(--primary); }

      footer { padding: 40px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 40px; }
      .f-flex { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; max-width: 1300px; margin: 0 auto; }
      
      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo"><img src="${CONFIG.LOGO_URL}"> <span>MOS360</span></a>
      <nav class="nav">
        <a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a>
        <a href="/login" class="login-btn">${loginLabel}</a>
      </nav>
    </header>
    <div class="sidebar">
      <a href="#" class="s-link"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
      <a href="#" class="s-link"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
      <a href="#" class="s-link tk-fix"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>
    <main>${content}</main>
    <footer>
      <div class="f-flex">
        <div><h3>MOS360.VN</h3><p>Hotline: 0912.888.360</p><p>57 Lê Văn Thuyết A, Hải Phòng</p></div>
        <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>Sáng: 08:00 – 11:30</p><p>Chiều: 13:30 – 17:00</p></div>
        <div style="height: 100px; background: #111; border-radius: 10px;"></div>
      </div>
    </footer>
    </body></html>`;
  }
};
