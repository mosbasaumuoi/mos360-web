const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const path = url.pathname;

    // --- BỨC TƯỜNG BẢO VỆ DOMAIN PHỤ ---
    // Nếu là domain go.mos360.vn HOẶC không phải trang chủ mos360.vn -> THOÁT NGAY
    if (hostname.includes("go.") || (path !== "/" && path !== "/index.html")) {
      return fetch(request); 
    }

    // --- CHỈ XỬ LÝ TRANG CHỦ MOS360.VN ---
    const cookie = request.headers.get("Cookie") || "";
    const userName = cookie.match(/user=([^;]+)/) ? decodeURIComponent(cookie.match(/user=([^;]+)/)[1]) : null;

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

    return new Response(this.layout(studentItems, userName), { 
      headers: { "Content-Type": "text/html;charset=UTF-8" } 
    });
  },

  layout(studentData, userName) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      :root { --primary: #FF5722; --bg: #000; --card: #111; }
      body { font-family: sans-serif; background: var(--bg); color: #fff; margin: 0; overflow-x: hidden; }
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; }
      .logo img { height: 35px; }
      .login-btn { background: var(--primary); color: #fff; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: bold; }

      .sidebar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; }
      .s-icon { width: 40px; height: 40px; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center; }
      .tk img { filter: brightness(0) invert(1); width: 22px; }

      .main-grid { display: grid; grid-template-columns: 320px 1fr; gap: 20px; padding: 20px 5%; max-width: 1300px; margin: 0 auto; }
      @media (max-width: 800px) { .main-grid { grid-template-columns: 1fr; } .sidebar { bottom: 20px; top: auto; flex-direction: row; right: 20px; transform: none; } }

      .card { background: var(--card); padding: 20px; border-radius: 20px; border: 1px solid #333; }
      .slider-box { overflow: hidden; width: 100%; border-radius: 12px; }
      .slider-track { display: flex; gap: 10px; animation: scroll 40s linear infinite; }
      .st-item img { height: 250px; object-fit: contain; }

      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    </style>
    </head><body>
    <header>
      <a href="/" class="logo"><img src="${CONFIG.LOGO_URL}"></a>
      <a href="/login" class="login-btn">${userName ? 'Chào, '+userName : 'Đăng nhập'}</a>
    </header>
    <div class="sidebar">
      <a href="#" class="s-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" width="20"></a>
      <a href="#" class="s-icon tk"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>
    <main class="main-grid">
      <div class="card"><h3>🎡 Vòng Quay</h3><div style="height:150px; width:150px; border-radius:50%; background:conic-gradient(red, orange, red); margin: 20px auto;"></div></div>
      <div class="card"><h3>🏆 Bảng Vàng</h3><div class="slider-box"><div class="slider-track">${studentData}</div></div></div>
    </main>
    </body></html>`;
  }
};
