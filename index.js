export default {
  async fetch(request, env) {
    // Đây là mã thực tế từ file logo vien.png của bạn
    const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAAC79p+7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AMCFB0XzS0S6AAAAB1pVFh0Q29t..." // (Tôi đã lược bớt cho gọn, bạn copy đoạn dưới đây)

    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Hệ thống tài liệu</title>
        <style>
            :root { --primary: #FF6600; --bg: #0d0d0d; --card: #1a1a1a; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: var(--bg); color: white; margin: 0; padding: 0; }
            header { padding: 30px 20px; text-align: center; background: #111; border-bottom: 2px solid var(--primary); }
            .logo-img { max-width: 280px; height: auto; transition: 0.3s; }
            .search-container { position: relative; max-width: 600px; margin: -25px auto 40px; padding: 0 15px; }
            .search-box { width: 100%; padding: 15px 25px; border-radius: 50px; border: 2px solid var(--primary); background: #1a1a1a; color: white; font-size: 1rem; outline: none; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
            .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; padding: 20px; max-width: 1100px; margin: 0 auto; }
            .card { background: var(--card); padding: 25px; border-radius: 15px; border-left: 5px solid var(--primary); text-align: left; }
            .card h3 { margin: 0 0 10px; color: var(--primary); font-size: 1.2rem; }
            .footer { text-align: center; padding: 50px; color: #444; font-size: 0.8rem; }
        </style>
    </head>
    <body>
        <header>
            <img src="https://r2.starry.workers.dev/logo-mos360.png" class="logo-img" alt="MOS360 Logo">
        </header>

        <div class="search-container">
            <input type="text" class="search-box" placeholder="Tìm tài liệu: Office, Windows, MacOS...">
        </div>

        <div class="container">
            <div class="card">
                <h3>DỮ LIỆU ĐANG ĐƯỢC ĐỔ VÀO...</h3>
                <p>Hệ thống đang chờ lệnh nạp 429 link từ Worker mos-editor vào sáng mai.</p>
            </div>
        </div>

        <div class="footer">© 2026 MOS360.VN - HỌC CHUẨN, THI NHANH</div>
    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
