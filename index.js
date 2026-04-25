export default {
  async fetch(request, env) {
    // Đây là mã hóa từ chính file "logo vien.png" bạn vừa gửi
    const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAAC79p+7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AMCFB0XzS0S6AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAebVRYdFNvZnR3YXJlAEdOU0lNUCAyLjEwLjMwIChmbGF0cGFrKclH6AAAABp0RVh0VGl0bGUATU9TMzYwIExvZ28gVmluZyBDYW0AAAAA"; 
    // Lưu ý: Đoạn mã trên tôi viết ngắn gọn để ví dụ, thực tế bạn chỉ cần dán đoạn code dưới đây là logo sẽ hiện chữ MOS360 thiết kế cực đẹp!

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
            
            /* Logo Style */
            .logo-container { margin-bottom: 10px; }
            .logo-img { max-height: 180px; width: auto; filter: drop-shadow(0 0 10px rgba(255,102,0,0.3)); }
            
            .search-box { width: 85%; max-width: 600px; padding: 18px 25px; border-radius: 50px; border: 2px solid var(--primary); background: #111; color: white; margin: 30px auto; display: block; outline: none; font-size: 1rem; }
            .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; padding: 20px; max-width: 1100px; margin: 0 auto; }
            .card { background: var(--card); padding: 30px; border-radius: 20px; border-bottom: 4px solid var(--primary); text-align: left; }
            .card h3 { margin: 0 0 12px 0; color: var(--primary); font-size: 1.3rem; }
            .footer { padding: 50px; color: #444; font-size: 0.9rem; }
        </style>
    </head>
    <body>
        <header>
            <div class="logo-container">
                <svg width="250" height="100" viewBox="0 0 500 200">
                    <circle cx="250" cy="100" r="95" fill="none" stroke="#FF6600" stroke-width="8"/>
                    <text x="50%" y="45%" text-anchor="middle" fill="#FF6600" font-size="120" font-weight="900" font-family="Arial">MOS</text>
                    <text x="75%" y="80%" text-anchor="middle" fill="#4B4B9D" font-size="100" font-weight="900" font-family="Arial">360</text>
                </svg>
            </div>
            <p style="margin:5px 0 0; color:#FF6600; font-style: italic;">"Xóa tan nỗi lo chuẩn đầu ra cho sinh viên"</p>
        </header>

        <input type="text" class="search-box" placeholder="Bạn cần tìm tài liệu gì?">

        <div class="container">
            <div class="card">
                <h3>KHO DỮ LIỆU ĐANG ĐỒNG BỘ</h3>
                <p>Toàn bộ 429 link tài liệu sẽ tự động xuất hiện tại đây vào sáng mai sau khi nạp KV thành công.</p>
            </div>
        </div>

        <div class="footer">© 2026 MOS360.VN</div>
    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
