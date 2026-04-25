export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Hệ thống tài liệu</title>
        <style>
            :root { --primary: #FF6600; --bg: #0d0d0d; --card: #1a1a1a; }
            body { font-family: 'Arial', sans-serif; background: var(--bg); color: white; margin: 0; padding: 0; text-align: center; }
            header { padding: 30px 20px; background: #111; border-bottom: 2px solid var(--primary); }
            
            /* Logo chuẩn từ link GitHub bạn vừa gửi */
            .logo-img { max-height: 200px; width: auto; display: block; margin: 0 auto; filter: drop-shadow(0 0 10px rgba(255,102,0,0.3)); }
            
            .search-box { width: 85%; max-width: 600px; padding: 18px 25px; border-radius: 50px; border: 2px solid var(--primary); background: #1a1a1a; color: white; margin: 30px auto; display: block; outline: none; font-size: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; padding: 20px; max-width: 1100px; margin: 0 auto; }
            .card { background: var(--card); padding: 30px; border-radius: 15px; border-left: 5px solid var(--primary); text-align: left; transition: 0.3s; }
            .card:hover { transform: translateY(-5px); background: #222; }
            .card h3 { margin: 0 0 10px; color: var(--primary); font-size: 1.2rem; }
            .footer { padding: 40px; color: #444; font-size: 0.8rem; }
        </style>
    </head>
    <body>
        <header>
            <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-img" alt="MOS360 Logo">
        </header>

        <input type="text" class="search-box" placeholder="Tìm tài liệu (Office, Windows, MacOS)...">

        <div class="container">
            <div class="card">
                <h3>📦 ĐANG CHỜ DỮ LIỆU...</h3>
                <p>Giao diện đã chuẩn. Sáng mai nạp 429 link tài liệu vào hệ thống là hoàn tất.</p>
            </div>
        </div>

        <div class="footer">© 2026 MOS360.VN - HỌC CHUẨN, THI NHANH</div>
    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
