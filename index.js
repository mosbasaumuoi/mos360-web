const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // --- BẢO VỆ LINK RÚT GỌN (CHỈ CAN THIỆP TRANG ĐỊNH NGHĨA) ---
    const knownPaths = ["/", "/courses", "/library", "/login"];
    if (!knownPaths.includes(path)) {
      return fetch(request);
    }

    const cookie = request.headers.get("Cookie") || "";
    const userMatch = cookie.match(/user=([^;]+)/);
    // Phân biệt Quản trị và Học viên dựa trên tên hoặc cookie (Logic của bạn)
    let userDisplay = userMatch ? decodeURIComponent(userMatch[1]) : null;
    let roleLabel = "";
    if (userDisplay) {
      roleLabel = (userDisplay.toLowerCase() === "admin" || userDisplay === "Quản trị") ? "Quản trị" : userDisplay;
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
      studentItems += studentItems;
    } catch (e) { studentItems = "<div>Đang kết nối...</div>"; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/library") content = this.getLibraryUI();
    else content = this.getHomeUI(studentItems, roleLabel);

    return new Response(this.layout(content, roleLabel), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  getHomeUI(studentData, roleLabel) {
    return `
      <div class="stats-row">
        <div class="s-box"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="s-box"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="s-box"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>

      <div class="main-layout">
        <aside class="left-side">
          <div class="card">
            <h3>🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-box">
              <div class="wheel-body"><div class="w-txt t1">GIẢM 50k</div><div class="w-txt t2">GIẢM 50%</div><div class="w-txt t3">GIẢM 100k</div><div class="w-txt t4">GIẢM 80%</div></div>
              <div class="wheel-btn">QUAY</div>
            </div>
            <div class="promo-box">
              <span class="badge">🎁 ƯU ĐÃI</span>
              <p>Combo 3 môn tính tiền 2 (Chỉ 800k). Đăng ký ngay hôm nay!</p>
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

      ${roleLabel ? `
      <div class="card student-portal">
        <h3>🎓 Cổng ${roleLabel}: Chào ${roleLabel}</h3>
        <div class="btn-group">
          <button class="btn-cyan">ĐĂNG KÝ HỌC OFFLINE TẠI LỚP</button>
          <button class="btn-orange">ĐĂNG KÝ THI MOS QUỐC TẾ</button>
        </div>
      </div>` : ""}

      <div class="services-grid">
        <div class="svc-item"><h3>Thi Thật 100%</h3><p>Mô phỏng sát đề Certiport quốc tế.</p></div>
        <div class="svc-item ai-glow"><h3>AI Trợ Lý 24/7 ✨</h3><p>Giải đáp tin học & kiến thức Excel tức thì.</p></div>
        <div class="svc-item"><h3>Đồng Hành</h3><p>Hỗ trợ đồ án, luận văn trọn đời cho học viên.</p></div>
      </div>
    `;
  },

  getCoursesUI() {
    return `<div class="card course-page">
      <h2>Hệ Thống Khóa Học MOS</h2>
      <div class="course-flex">
        <div class="c-col"><h4>Nhóm 2019</h4><label><input type="checkbox"> Word 2019</label><label><input type="checkbox"> Excel 2019</label></div>
        <div class="c-col"><h4>Nhóm 365</h4><label><input type="checkbox"> Word 365</label><label><input type="checkbox"> Excel 365</label></div>
      </div>
    </div>`;
  },

  getLibraryUI() {
    return `<div class="card library-page"><h2>📚 Thư Viện Tài Liệu</h2><p>Tài liệu ôn tập và File thực hành đã được khôi phục.</p></div>`;
  },

  layout(content, roleLabel) {
    const loginLabel = roleLabel ? `Chào, ${roleLabel}` : "Đăng nhập";
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <style>
      :root { --primary: #FF5722; --bg: #000; --card: #111; --border: rgba(255,255,255,0.1); --cyan: #00f2ff; }
      body { font-family: sans-serif; background: var(--bg); color: #fff; margin: 0; overflow-x: hidden; }
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); position: sticky; top:0; background:#000; z-index:1000; }
      .logo img { height: 35px; }
      .nav { display: flex; gap: 20px; align-items: center; }
      .nav a { color: #888; text-decoration: none; font-weight: bold; font-size: 0.9rem; }
      .login-btn { background: var(--primary); color: #fff !important; padding: 8px 20px; border-radius: 20px; }

      /* SIDEBAR TIKTOK */
      .sidebar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 1000; }
      .s-icon { width: 42px; height: 42px; background: #222; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
      .tk-fix { background: transparent !important; }
      .tk-fix img { filter: brightness(0) invert(1); width: 22px; }

      /* BẢNG VÀNG KHÔNG TRÀN */
      .slider-wrapper { overflow: hidden; border: 2px solid #333; border-radius: 15px; width: 100%; position: relative; }
      .slider-track { display: flex; gap: 15px; animation: scroll 40s linear infinite; padding: 20px 0; }
      .st-item img { height: 280px; border-radius: 10px; object-fit: contain; }

      /* MOBILE & LAYOUT */
      .main-layout { display: grid; grid-template-columns: 350px 1fr; gap: 25px; max-width: 1300px; margin: 20px auto; padding: 0 5%; }
      @media (max-width: 900px) {
        .main-layout { grid-template-columns: 1fr; }
        .sidebar { bottom: 20px; top: auto; right: 20px; transform: none; flex-direction: row; }
      }

      .card { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 25px; }
      .stats-row { display: flex; justify-content: center; gap: 50px; padding: 40px 5%; text-align: center; }
      .s-box h2 { color: var(--primary); font-size: 2.2rem; }
      .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 40px 5%; }
      .svc-item { background: var(--card); padding: 20px; border-radius: 15px; border-left: 4px solid var(--primary); }
      
      .wheel-box { position: relative; width: 180px; height: 180px; margin: 0 auto 20px; }
      .wheel-body { width: 100%; height: 100%; border-radius: 50%; border: 4px solid #FFD700; animation: rotate 10s linear infinite; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); }
      .wheel-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 50px; height: 50px; background: #fff; border-radius: 50%; color: #000; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; }

      footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
      .f-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }

      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo"><img src="${CONFIG.LOGO_URL}"></a>
      <nav class="nav">
        <a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a>
        <a href="/login" class="login-btn">${loginLabel}</a>
      </nav>
    </header>

    <div class="sidebar">
      <a href="#" class="s-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" width="20"></a>
      <a href="#" class="s-icon tk-fix"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>

    <main>${content}</main>

    <footer>
      <div class="f-grid">
        <div><h3>MOS360.VN</h3><p>Hotline: 0912.888.360</p><p>57 Lê Văn Thuyết A, Hải Phòng</p></div>
        <div style="border-left: 2px solid var(--primary); padding-left: 15px;">
          <h4 style="color:var(--cyan)">🕒 GIỜ LÀM VIỆC</h4>
          <p>Sáng: 08:00 – 11:30 | Chiều: 13:30 – 17:00</p>
          <p style="font-size: 0.8rem; color: #666;">Hỗ trợ kỹ thuật 24/7 qua Zalo</p>
        </div>
        <div style="background:#111; height:120px; border-radius:10px;">
          <iframe src="about:blank" style="width:100%;height:100%;border:0;filter:invert(1);"></iframe>
        </div>
      </div>
    </footer>
    </body></html>`;
  }
};
