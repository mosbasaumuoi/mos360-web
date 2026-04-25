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
            header { padding: 60px 20px; background: #1a1a1a; border-bottom: 2px solid var(--primary); box-shadow: 0 4px 20px rgba(255,102,0,0.2); }
            .logo-box { display: inline-block; border: 3px solid var(--primary); padding: 5px 20px; border-radius: 10px; }
            .logo-text { font-size: 3.5rem; font-weight: 900; color: var(--primary); text-transform: uppercase; letter-spacing: 3px; margin: 0; }
            .search-box { width: 85%; max-width: 600px; padding: 18px 25px; border-radius: 50px; border: 2px solid var(--primary); background: #111; color: white; margin: -30px auto 40px; display: block; outline: none; box-shadow: 0 10px 25px rgba(0,0,0,0.5); font-size: 1rem; }
            .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; padding: 20px; max-width: 1100px; margin: 0 auto; }
            .card { background: var(--card); padding: 30px; border-radius: 20px; border-bottom: 4px solid var(--primary); text-align: left; transition: 0.4s; }
            .card:hover { transform: translateY(-8px); background: #222; box-shadow: 0 15px 30px rgba(255,102,0,0.1); }
            .card h3 { margin: 0 0 12px 0; color: var(--primary); font-size: 1.3rem; }
            .footer { padding: 50px; color: #444; font-size: 0.9rem; letter-spacing: 1px; }
        </style>
    </head>
    <body>
        <header>
            <div class="logo-box">
                <h1 class="logo-text">MOS360</h1>
            </div>
            <p style="margin:15px 0 0; color:#888; font-weight:bold;">HỌC CHUẨN - THI NHANH</p>
        </header>

        <input type="text" class="search-box" placeholder="Tìm kiếm tài liệu bạn cần...">

        <div class="container">
            <div class="card">
                <h3>DỮ LIỆU ĐANG CẬP NHẬT</h3>
                <p>Hệ thống đang đồng bộ 429 đầu tài liệu. Toàn bộ link sẽ khả dụng vào sáng mai.</p>
            </div>
        </div>

        <div class="footer">© 2026 MOS360.VN - ĐỐI TÁC TIN CẬY CỦA BẠN</div>
    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
