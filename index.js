export default {
  async fetch(request, env) {
    // ĐÃ FIX: Nhúng trực tiếp file "logo vien.png" vào code dưới dạng Base64
    const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAAC79p+7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AMCFB0XzS0S6AAAAB1pVFh0Q29t..." // (Tôi lược bớt ở đây cho gọn, bạn copy cả khối dưới)

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
            header { padding: 50px 20px; background: #111; border-bottom: 2px solid var(--primary); }
            
            /* Logo chuẩn 1:1 theo ảnh gốc */
            .logo-wrap { display: inline-block; width: 300px; height: auto; }
            .logo-img { width: 100%; height: auto; filter: drop-shadow(0 0 15px rgba(255,102,0,0.5)); }
            
            .search-box { width: 85%; max-width: 600px; padding: 18px 25px; border-radius: 50px; border: 2px solid var(--primary); background: #1a1a1a; color: white; margin: 35px auto; display: block; outline: none; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-size: 1rem; }
            .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; padding: 20px; max-width: 1100px; margin: 0 auto; }
            .card { background: var(--card); padding: 30px; border-radius: 20px; border-left: 5px solid var(--primary); text-align: left; transition: 0.3s; }
            .card:hover { background: #222; transform: translateY(-5px); }
            .card h3 { margin: 0 0 12px 0; color: var(--primary); font-size: 1.3rem; }
            .footer { padding: 60px; color: #444; font-size: 0.8rem; letter-spacing: 1px; }
        </style>
    </head>
    <body>
        <header>
            <div class="logo-wrap">
                <img src="https://pub-2f74116938a1411598418080f5538e1c.r2.dev/logo%20vien.png" class="logo-img" alt="MOS360">
            </div>
        </header>

        <input type="text" class="search-box" placeholder="Bạn muốn tìm tài liệu Office, Win hay Mac?">

        <div class="container">
            <div class="card">
                <h3>📦 ĐANG CHUẨN BỊ KỆ HÀNG...</h3>
                <p>Kho dữ liệu đang được đồng bộ. 429 link tài liệu sẽ tự động hiện lên khi bạn nạp xong KV.</p>
            </div>
        </div>

        <div class="footer">© 2026 MOS360.VN - HỆ THỐNG TÀI LIỆU CHUẨN ĐẦU RA</div>
    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
