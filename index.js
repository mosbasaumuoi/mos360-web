const CONFIG = {
  TITLE: "MOS360 - Hệ sinh thái luyện thi MOS",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // --- 🎯 PHÂN LOẠI 1: XỬ LÝ LINK RÚT GỌN (CHỐNG LỖI 522) ---
    // Nếu đường dẫn không phải là trang chủ (ví dụ /office, /360exe)
    // Hoặc nếu truy cập từ subdomain go.mos360.vn
    if (path !== "/" && path !== "/index.html" || url.hostname.includes("go.")) {
      // Worker sẽ chỉ đóng vai trò "đẩy yêu cầu đi" mà không can thiệp nội dung
      // Điều này giúp giữ nguyên tính năng rút gọn của hosting cũ nhưng chạy qua mây cam Cloudflare
      return fetch(request);
    }

    // --- 🏠 PHÂN LOẠI 2: GIAO DIỆN WEB TÍCH HỢP (CHỈ TRANG CHỦ) ---
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      
      // Xử lý dữ liệu Bảng Vàng từ Google Sheet
      const studentItems = tsv.split("\n").slice(1).map(row => {
        const link = row.split("\t")[0]?.trim();
        return (link && link.startsWith("http")) ? `<div class="st-item"><img src="${link}" loading="lazy"></div>` : "";
      }).join("");

      // Kiểm tra Login (Cookie)
      const cookie = request.headers.get("Cookie") || "";
      const user = cookie.match(/user=([^;]+)/) ? decodeURIComponent(cookie.match(/user=([^;]+)/)[1]) : null;

      return new Response(this.layout(studentItems + studentItems, user), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    } catch (e) {
      // Nếu Google Sheet lỗi, vẫn phải fetch(request) để hiện trang chủ mặc định từ hosting
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
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; background:rgba(0,0,0,0.8); backdrop-filter:blur(10px); position: sticky; top:0; z-index:1000; }
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
        <h3 style="color:var(--primary)">🎡 Vòng Quay May Mắn</h3>
        <div style="height:180px; width:180px; border-radius:50%; background:conic-gradient(#FF5722, #FF9800, #FF5722); margin: 20px auto; border: 5px solid #222; box-shadow: 0 0 20px rgba(255,87,34,0.3);"></div>
        <p style="text-align:center; color:#888;">Quay ngay để nhận mã giảm giá luyện thi!</p>
      </div>
      <div class="card">
        <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
        <div class="slider-box"><div class="slider-track">${studentData}</div></div>
      </div>
    </main>
    </body></html>`;
  }
};
