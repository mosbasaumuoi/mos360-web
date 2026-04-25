export default {
  async fetch(request, env) {
    // Đây là mã Logo "logo vien.png" của bạn đã được chuyển đổi
    const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABICAIAAABySlsfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AMCFB0XzS0S6AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAebVRYdFNvZnR3YXJlAEdOU0lNUCAyLjEwLjMwIChmbGF0cGFrKclH6AAAABp0RVh0VGl0bGUATU9TMzYwIExvZ28gVmluZyBDYW0AAAAA"; 

    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Hệ thống tài liệu</title>
        <style>
            :root { --primary: #FF6600; --bg: #0d0d0d; --card: #1a1a1a; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: var(--bg); color: white; margin: 0; padding: 0; text-align: center; }
            header { padding: 40px 20px; background: #1a1a1a; border-bottom: 1px solid #333; }
            .logo-img { height: 80px; margin-bottom: 10px; }
            .search-box { width: 85%; max-width: 600px; padding: 15px 25px; border-radius: 30px; border: 2px solid var(--primary); background: transparent; color: white; margin: 30px auto; display: block; outline: none; }
            .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 20px; max-width: 1100px; margin: 0 auto; }
            .card { background: var(--card); padding: 25px; border-radius: 12px; border-left: 5px solid var(--primary); text-align: left; transition: 0.3s; }
            .card:hover { background: #222; transform: translateY(-3px); }
            .card h3 { color: var(--primary); margin: 0 0 10px 0; font-size: 1.2rem; }
            .footer { padding: 40px; color: #555; font-size: 0.8rem; }
        </style>
    </head>
    <body>
        <header>
            <h1 style="color:var(--primary); margin:0;">MOS360</h1>
            <p style="color:#888; margin:5px 0 0 0;">Hệ thống tài liệu - Học chuẩn, thi nhanh</p>
        </header>

        <input type="text" class="search-box" placeholder="Tìm nhanh tài liệu (Office, Win, Mac)...">

        <div class="container">
            <div class="card">
                <h3>Đang kết nối kho dữ liệu...</h3>
                <p>Sáng mai khi bạn nạp đủ 429 link, danh sách sẽ tự động hiển thị tại đây.</p>
            </div>
        </div>

        <div class="footer">© 2026 MOS360.vn</div>
    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
