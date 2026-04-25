export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - AI Learning Platform</title>
        <style>
            :root { --primary: #FF6600; --bg: #0a0a0a; --card: #161616; --text: #e0e0e0; --ai-purple: #7000ff; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.6; }

            /* Header mượt mà với 2 nút chức năng */
            header { 
                padding: 15px 30px; 
                background: rgba(10, 10, 10, 0.9); 
                backdrop-filter: blur(15px); 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                border-bottom: 1px solid #222; 
                position: sticky; top: 0; z-index: 1000;
            }
            .logo-img { height: 50px; width: auto; }
            
            .nav-auth { display: flex; gap: 12px; }
            .btn { padding: 8px 18px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: 0.3s; text-decoration: none; border: none; }
            .btn-trial { background: transparent; color: var(--primary); border: 1px solid var(--primary); }
            .btn-trial:hover { background: rgba(255,102,0,0.1); }
            .btn-login { background: var(--primary); color: white; }
            .btn-login:hover { background: #e65c00; box-shadow: 0 4px 15px rgba(255,102,0,0.3); }

            /* Hero Section */
            .hero { text-align: center; padding: 60px 20px 20px; }
            .hero h1 { font-size: 2.5rem; margin: 0; background: linear-gradient(45deg, #fff, var(--primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .hero p { color: #888; font-size: 1.1rem; margin-top: 10px; }

            /* Container chính */
            .container { max-width: 1000px; margin: 0 auto; padding: 20px; }

            /* Search box tinh tế */
            .search-section { margin-bottom: 50px; }
            .search-box { width: 100%; padding: 16px 25px; border-radius: 12px; border: 1px solid #333; background: #161616; color: white; font-size: 1rem; outline: none; }
            .search-box:focus { border-color: var(--primary); box-shadow: 0 0 15px rgba(255,102,0,0.1); }

            /* Dashboard mô phỏng theo loại tài khoản */
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
            .card { background: var(--card); padding: 25px; border-radius: 16px; border: 1px solid #222; position: relative; }
            .card h3 { margin: 0 0 10px; font-size: 1.2rem; color: #fff; }
            .card p { color: #888; font-size: 0.9rem; }
            .badge { font-size: 0.7rem; padding: 3px 8px; border-radius: 5px; font-weight: bold; margin-bottom: 10px; display: inline-block; }
            .badge-admin { background: #331a00; color: #ff9900; }
            .badge-user { background: #1a0033; color: #b366ff; }

            /* Floating AI */
            .ai-float { position: fixed; bottom: 30px; right: 30px; width: 55px; height: 55px; background: var(--ai-purple); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 8px 20px rgba(112,0,255,0.3); z-index: 1000; }
        </style>
    </head>
    <body>

    <header>
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-img" alt="MOS360">
        <div class="nav-auth">
            <a href="#" class="btn btn-trial">Học thử</a>
            <a href="#" class="btn btn-login">Đăng nhập</a>
        </div>
    </header>

    <div class="hero">
        <h1>Hệ Thống Luyện Thi Thông Minh</h1>
        <p>Luyện thi MOS 1000 — Trải nghiệm thực chiến cùng AI Assistant</p>
    </div>

    <div class="container">
        <div class="search-section">
            <input type="text" class="search-box" placeholder="Tìm kiếm tài liệu hoặc hỏi trợ lý AI...">
        </div>

        <div class="grid">
            <div class="card" style="border-style: dashed;">
                <span class="badge badge-admin">QUẢN TRỊ VIÊN</span>
                <h3>Chế độ chỉnh sửa nhanh</h3>
                <p>Cập nhật 429 link tài liệu, thay đổi logo, hoặc upload hình ảnh trực tiếp ngay trên giao diện này.</p>
            </div>

            <div class="card">
                <span class="badge badge-user">HỌC VIÊN</span>
                <h3>Kho tài liệu cá nhân</h3>
                <p>Tải tài liệu ôn thi, truy cập phần mềm thi thử và sử dụng AI Assistant để giải đáp thắc mắc.</p>
            </div>
        </div>
    </div>

    <div class="ai-float">✨</div>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
