const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // --- KHU VỰC BẢO VỆ LINK RÚT GỌN (TUYỆT ĐỐI) ---
    // 1. Nếu truy cập qua subdomain 'go.' -> Chuyển hướng về Hosting xử lý ngay
    // 2. Nếu là các đường dẫn link rút gọn (không phải trang chủ) -> Chuyển hướng ngay
    if (url.hostname.includes("go.") || (url.pathname !== "/" && url.pathname !== "/index.html")) {
      return fetch(request); 
    }

    // --- CHỈ XỬ LÝ GIAO DIỆN TRANG CHỦ TẠI ĐÂY ---
    try {
      const response = await fetch(CONFIG.SHEET_URL);
      const data = await response.text();
      const rows = data.split('\n').slice(1);
      
      let studentItems = rows.map(row => {
        const cols = row.split('\t');
        if (cols[0] && cols[0].startsWith('http')) {
          return `<div class="st-item"><img src="${cols[0].trim()}" loading="lazy"></div>`;
        }
        return '';
      }).join('');

      const cookie = request.headers.get("Cookie") || "";
      const user = cookie.match(/user=([^;]+)/) ? decodeURIComponent(cookie.match(/user=([^;]+)/)[1]) : null;

      return new Response(this.layout(studentItems + studentItems, user), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    } catch (e) {
      // Nếu có lỗi kỹ thuật khi lấy Bảng Vàng, trả về trang gốc thay vì hiện lỗi 522
      return fetch(request);
    }
  },

  layout(studentData, user) {
    return `<!DOCTYPE html><html lang="vi"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      :root { --primary: #FF5722; --bg: #000; --card: #111; }
      body { font-family: 'Segoe UI', Tahoma, sans-serif; background: var(--bg); color: #fff; margin: 0; overflow-x: hidden; }
      header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; background: #000; position: sticky; top:0; z-index: 1000; }
      .logo img { height: 35px; }
      .login-btn { background: var(--primary); color: #fff; padding: 8px 20px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 0.85rem; }
      
      /* SIDEBAR & TIKTOK FIX */
      .sidebar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 1000; }
      .s-icon { width: 45px; height: 45px; border-radius: 50%; background: #1a1a1a; display: flex; align-items: center; justify-content: center; border: 1px solid #333; }
      .tk img { filter: brightness(0) invert(1); width: 22px; }

      /* BẢNG VÀNG: KHÓA KHUNG CHỐNG VỠ */
      .main-grid { display: grid; grid-template-columns: 320px 1fr; gap: 25px; padding: 25px 5%; max-width: 1300px; margin: 0 auto; }
      .card { background: var(--card); border: 1px solid #222; border-radius: 20px; padding: 25px; }
      .slider-box { overflow: hidden; width: 100%; border-radius: 15px; position: relative; background: #050505; }
      .slider-track { display: flex; gap: 15px; animation: scroll 40s linear infinite; padding: 20px 0; }
      .st-item img { height: 280px; width: auto; object-fit: contain; border-radius: 10px; }

      @media (max-width: 900px) {
        .main-grid { grid-template-columns: 1fr; }
        .sidebar { bottom: 20px; top: auto; right: 20px; transform: none; flex-direction: row; }
      }

      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    </style></head><body>
    <header>
      <a href="/"><img src="${CONFIG.LOGO_URL}" class="logo"></a>
      <a href="/login" class="login-btn">${user ? 'Chào, ' + user : 'Đăng nhập'}</a>
    </header>

    <div class="sidebar">
      <a href="https://zalo.me/yourid" class="s-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" width="22"></a>
      <a href="https://tiktok.com/@yourid" class="s-icon tk"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"></a>
    </div>

    <main class="main-grid">
      <div class="card">
        <h3 style="color:var(--primary)">🎡 Vòng Quay</h3>
        <div style="height:180px; width:180px; border-radius:50%; background:conic-gradient(#ff5722, #ff9800, #ff5722); margin: 20px auto; border: 5px solid #222; box-shadow: 0 0 20px rgba(255,87,34,0.2);"></div>
        <p style="text-align:center; font-size:0.9rem; color:#888;">Quay ngay nhận quà khủng!</p>
      </div>
      <div class="card">
        <h3>🏆 Bảng Vàng Chứng Chỉ</h3>
        <div class="slider-box"><div class="slider-track">${studentData}</div></div>
      </div>
    </main>
    </body></html>`;
  }
};
