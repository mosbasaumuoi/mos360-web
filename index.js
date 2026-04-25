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
            header { padding: 40px 20px; background: #111; border-bottom: 2px solid var(--primary); }
            
            /* Logo chuẩn: Hiển thị nguyên bản từ file ảnh GitHub của bạn */
            .logo-img { 
                max-width: 250px; 
                height: auto; 
                display: block; 
                margin: 0 auto;
                /* Tạo hiệu ứng sáng nhẹ cho logo trên nền đen */
                filter: drop-shadow(0 0 8px rgba(255,102,0,0.2)); 
            }
            
            .search-box { width: 85%; max-width: 600px; padding: 18px 25px; border-radius: 50px; border: 2px solid var(--primary); background: #1a1a1a; color: white; margin: 30px auto; display: block; outline: none; font-size: 1rem; }
            .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; padding: 20px; max-width: 1100px; margin: 0 auto; }
            .card { background: var(--card); padding: 30px; border-radius: 20px; border-bottom: 4px solid var(--primary); text-align: left; }
            .card h3 { margin: 0 0 12px 0; color: var(--primary); }
            .footer { padding: 50px; color: #444; font-size: 0.8rem; }
        </style>
    </head>
    <body>
        <header>
            <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-img" alt="MOS360 Logo">
        </header>

        <input type="text" class="search-box" placeholder="Bạn cần tìm tài liệu gì?">

        <div class="container">
            <div class="card">
                <h3>📦 HỆ THỐNG ĐÃ SẴN SÀNG</h3>
                <p>Giao diện đã chuẩn hóa 100%. Sáng mai chúng ta chỉ việc nạp 429 link vào KV là hoàn tất.</p>
            </div>
        </div>

        <div class="footer">© 2026 MOS360.VN</div>
    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
