const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 🛑 QUAN TRỌNG: TRẢ LẠI LINK RÚT GỌN
    // Nếu không phải trang chủ hoặc các trang chính, hãy để hệ thống gốc tự xử lý
    const mainPaths = ["/", "/courses", "/library", "/login"];
    if (!mainPaths.includes(path)) {
      return fetch(request); 
    }

    // Logic lấy tên người dùng (giữ nguyên của bạn)
    const cookie = request.headers.get("Cookie") || "";
    const userMatch = cookie.match(/user=([^;]+)/);
    const userName = userMatch ? decodeURIComponent(userMatch[1]) : null;

    // Lấy dữ liệu Bảng Vàng (Bản fix ảnh không tràn)
    let studentItems = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      studentItems = tsv.split("\n").slice(1).map(row => {
        const link = row.split("\t")[0]?.trim();
        return (link && link.startsWith("http")) ? `<div class="st-item"><img src="${link}"></div>` : "";
      }).join("");
      studentItems += studentItems;
    } catch (e) { studentItems = ""; }

    let content = "";
    if (path === "/courses") content = this.getCoursesPage();
    else if (path === "/library") content = this.getLibraryPage();
    else content = this.getHomePage(studentItems, userName);

    return new Response(this.layout(content, userName), { 
      headers: { "Content-Type": "text/html;charset=UTF-8" } 
    });
  },

  getHomePage(studentData, userName) {
    return `
      <div class="stats-bar">
        <div><strong>100%</strong><p>Đỗ ngay lần đầu</p></div>
        <div><strong>1,000+</strong><p>Học viên đăng ký</p></div>
        <div><strong>600+</strong><p>Truy cập thường xuyên</p></div>
      </div>

      <div class="main-grid">
        <div class="card-left">
          <div class="card">
            <h3>🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-container"><div class="wheel-spin"></div><div class="wheel-txt">QUAY</div></div>
            <div class="promo">🎁 Combo 3 môn tính tiền 2 (800k)</div>
          </div>
        </div>

        <div class="card-right">
          <div class="card golden-board">
            <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
            <div class="slider-box"><div class="slider-track">${studentData}</div></div>
          </div>
        </div>
      </div>

      <div class="services">
        <div class="svc"><h3>Thi Thật 100%</h3><p>Mô phỏng Certiport.</p></div>
        <div class="svc"><h3>AI Trợ Lý 24/7 ✨</h3><p>Giải đáp kiến thức Excel.</p></div>
        <div class="svc"><h3>Đồng Hành</h3><p>Hỗ trợ luận văn trọn đời.</p></div>
      </div>
      
      ${userName ? `<div class="card admin-box"><h3>Chào ${userName}!</h3><div class="btn-group"><button>ĐĂNG KÝ HỌC</button><button>ĐĂNG KÝ THI</button></div></div>` : ""}
    `;
  },

  getCoursesPage() { return `<div class="card"><h2>Khóa Học MOS</h2><p>Tài liệu Word/Excel 2019 và 365.</p></div>`; },
  getLibraryPage() { return `<div class="card"><h2>Tài Liệu</h2><p>File thực hành khôi phục.</p></div>`; },

  layout(content, userName) {
    const btnLabel = userName ? `Chào, ${userName}` : "Đăng nhập";
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      :root { --primary: #FF5722; --bg: #000; --card: #111; }
      body { font-family: sans-serif; background: var(--bg); color: #fff; margin: 0; }
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; sticky; top:0; background:#000; z-index:100; }
      .logo img { height: 35px; }
      .nav a { color: #888; text-decoration: none; margin-left: 20px; font-weight: bold; }
      .login-btn { background: var(--primary); color: #fff !important; padding: 8px 16px; border-radius: 20px; }

      /* SIDEBAR & TIKTOK FIX */
      .sidebar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; }
      .s-icon { width: 40px; height: 40px; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center; }
      .tk img { filter: brightness(0) invert(1); width: 22px; } /* Làm TikTok thành màu trắng */

      /* BẢNG VÀNG: FIX TRÀN */
      .slider-box { overflow: hidden; border: 1px solid #333; border-radius: 15px; width: 100%; position: relative; }
      .slider-track { display: flex; gap: 10px; animation: scroll 40s linear infinite; }
      .st-item img { height: 250px; border-radius: 8px; object-fit: contain; }

      /* MOBILE FIX */
      .main-grid { display: grid; grid-template-columns: 320px 1fr; gap: 20px; padding: 20px 5%; }
      @media (max-width: 800px) {
        .main-grid { grid-template-columns: 1fr; }
        .sidebar { bottom: 20px; top: auto; right: 20px; transform: none; flex-direction: row; }
      }

      .card { background: var(--card); padding: 20px; border-radius: 20px; border: 1px solid #222; }
      .stats-bar { display: flex; justify-content: center; gap: 40px; padding: 30px; text-align: center; }
      .stats-bar strong { color: var(--primary); font-size: 1.8rem; }
      .btn-group button { background: var(--primary); border: none; color: #fff; padding: 10px; border-radius: 8px; margin: 5px; width: 150px; cursor: pointer; }

      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo"><img src="${CONFIG.LOGO_URL}"></a>
      <nav class="nav"><a href="/">Trang Chủ</a><a href="/courses">Khóa Học</a><a href="/library">Tài Liệu</a><a href="/login" class="login-btn">${btnLabel}</a></nav>
    </header>
    <div class="sidebar">
      <a href="#" class="s-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" width="20"></a>
      <a href="#" class="s-icon tk"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>
    <main>${content}</main>
    </body></html>`;
  }
};
