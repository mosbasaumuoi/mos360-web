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
            header { padding: 40px 20px; background: #1a1a1a; border-bottom: 2px solid var(--primary); }
            .logo-text { font-size: 3rem; font-weight: bold; color: var(--primary); text-transform: uppercase; letter-spacing: 2px; }
            .search-box { width: 85%; max-width: 600px; padding: 15px 25px; border-radius: 30px; border: 2px solid var(--primary); background: transparent; color: white; margin: 30px auto; display: block; outline: none; }
            .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 20px; max-width: 1100px; margin: 0 auto; }
            .card { background: var(--card); padding: 20px; border-radius: 12px; border-left: 5px solid var(--primary); text-align: left; transition: 0.3s; }
            .card:hover { transform: translateY(-5px); background: #252525; }
            .card h3 { margin: 0 0 10px 0; color: var(--primary); }
            .footer { padding: 30px; color: #555; font-size: 0.8rem; }
        </style>
    </head>
    <body>
        <header>
            <div class="logo-text">MOS360</div>
            <p style="margin:5px 0 0; color:#888;">Học chuẩn, thi nhanh - Tài liệu độc quyền</p>
        </header>

        <input type="text" class="search-box" placeholder="Tìm kiếm: Office, Windows, Key...">

        <div class="container">
            <div class="card">
                <h3>SẴN SÀNG CHO SÁNG MAI</h3>
                <p>Hệ thống đang đợi bạn nạp 429 link vào kho dữ liệu KV. Sau khi nạp, tài liệu sẽ tự động hiện ở đây.</p>
            </div>
        </div>

        <div class="footer">© 2026 MOS360.vn</div>
    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
