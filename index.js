const CONFIG = {
  TITLE: "MOS360 - Hệ sinh thái luyện thi MOS",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const hostname = url.hostname;

    // --- 🎯 KHU VỰC 1: XỬ LÝ LINK RÚT GỌN (REDIRECT NGAY TRÊN CLOUDFLARE) ---
    // Nếu là subdomain go.mos360.vn hoặc các path như /office, /360exe...
    if (hostname.startsWith("go.") || (path !== "/" && path !== "/index.html")) {
      // Ép Worker lấy dữ liệu từ gốc và trả về ngay, không chạy logic giao diện bên dưới
      // Điều này triệt tiêu lỗi 522 vì kết nối được thông suốt
      return fetch(request);
    }

    // --- 🏠 KHU VỰC 2: XỬ LÝ TRANG CHỦ TÍCH HỢP ---
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      if (!resp.ok) throw new Error("Sheet error");
      
      const tsv = await resp.text();
      const studentItems = tsv.split("\n").slice(1).map(row => {
        const link = row.split("\t")[0]?.trim();
        return (link && link.startsWith("http")) ? `<div class="st-item"><img src="${link}"></div>` : "";
      }).join("");

      const cookie = request.headers.get("Cookie") || "";
      const user = cookie.match(/user=([^;]+)/) ? decodeURIComponent(cookie.match(/user=([^;]+)/)[1]) : null;

      return new Response(this.layout(studentItems + studentItems, user), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    } catch (e) {
      // Nếu lỗi hệ thống, vẫn phải trả về yêu cầu gốc để không sập trang
      return fetch(request);
    }
  },

  layout(studentData, user) {
    return `<!DOCTYPE html><html lang="vi"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <style>
      :root { --primary: #FF5722; --bg: #000; }
      body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: #fff; margin: 0; overflow-x: hidden; }
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; background: #000; position: sticky; top: 0; z-index: 1000; }
      .logo img { height: 35px; }
      .login-btn { background: var(--primary); color: #fff; padding: 8px 20px; border-radius: 25px; text-decoration: none; font-weight: bold; }
      
      .main-grid { display: grid; grid-template-columns: 320px 1fr; gap: 25px; padding: 25px 5%; max-width: 1300px; margin: 0 auto; }
      .card { background: #111; border: 1px solid #222; border-radius: 20px; padding: 25px; }
      .slider-box { overflow: hidden; width: 100%; border-radius: 15px; background: #050505; }
      .slider-track { display: flex; gap: 15px; animation: scroll 40s linear infinite; padding: 20px 0; }
      .st-item img { height: 280px; object-fit: contain; border-radius: 10px; }

      @media (max-width: 900px) { .main-grid { grid-template-columns: 1fr; } }
      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    </style></head><body>
    <header>
      <a href="/"><img src="${CONFIG.LOGO_URL}" class="logo"></a>
      <a href="/login" class="login-btn">${user ? 'Chào, ' + user : 'Đăng nhập'}</a>
    </header>
    <main class="main-grid">
      <div class="card">
        <h3 style="color:var(--primary)">🎡 Vòng Quay</h3>
        <div style="height:180px; width:180px; border-radius:50%; background:conic-gradient(#FF5722, #FF9800, #FF5722); margin: 20px auto; border: 5px solid #222;"></div>
        <p style="text-align:center; font-size:0.9rem; color:#888;">Quay để nhận mã giảm giá!</p>
      </div>
      <div class="card">
        <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
        <div class="slider-box"><div class="slider-track">${studentData}</div></div>
      </div>
    </main>
    </body></html>`;
  }
};
