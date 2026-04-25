export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Luyện Thi Thực Chiến Hải Phòng</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
            :root { 
                --primary: #FF6600; 
                --bg: #080808; 
                --card: #121212;
                --text: #ffffff;
                --border: rgba(255, 255, 255, 0.08);
            }
            * { box-sizing: border-box; transition: all 0.25s ease; }
            body { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                background: var(--bg); color: var(--text); 
                margin: 0; line-height: 1.6; overflow-x: hidden;
            }

            /* Nút liên hệ nổi bên phải - Tinh tế & Nhỏ gọn hơn */
            .side-social {
                position: fixed; right: 20px; top: 50%; transform: translateY(-50%);
                display: flex; flex-direction: column; gap: 12px; z-index: 9999;
            }
            .social-btn {
                width: 48px; height: 48px; border-radius: 12px;
                display: flex; align-items: center; justify-content: center;
                background: rgba(20, 20, 20, 0.8); backdrop-filter: blur(10px);
                border: 1px solid var(--border);
            }
            .social-btn img { width: 24px; height: 24px; opacity: 0.8; }
            .social-btn:hover { border-color: var(--primary); transform: translateX(-5px); background: #000; }
            .social-btn:hover img { opacity: 1; }

            /* Header tối giản */
            header { 
                padding: 15px 40px; display: flex; justify-content: flex-end; gap: 15px;
                position: sticky; top: 0; background: rgba(8, 8, 8, 0.9); backdrop-filter: blur(15px); z-index: 1000;
                border-bottom: 1px solid var(--border);
            }
            .btn-nav { padding: 10px 22px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.8rem; }
            .btn-trial { border: 1px solid var(--border); color: #aaa; }
            .btn-login { background: var(--primary); color: white; }

            /* Hero - Logo kích thước chuẩn Professional */
            .hero { text-align: center; padding: 80px 20px 60px; }
            .logo-main { width: 260px; filter: drop-shadow(0 0 30px rgba(255,102,0,0.1)); margin-bottom: 25px; }
            .hero h1 { font-size: 3.5rem; font-weight: 800; letter-spacing: -2px; margin: 0; line-height: 1.2; }
            .hero p { color: #666; font-size: 1.2rem; margin: 15px 0 40px; font-weight: 400; }

            /* Search Box */
            .search-container { max-width: 600px; margin: 0 auto 80px; }
            .search-box { 
                width: 100%; padding: 18px 28px; border-radius: 12px; border: 1px solid var(--border);
                background: #111; color: white; font-size: 1rem; outline: none;
            }
            .search-box:focus { border-color: var(--primary); }

            /* Container & Cards */
            .container { max-width: 1100px; margin: 0 auto; padding: 0 20px 100px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .card { 
                background: var(--card); padding: 40px 30px; border-radius: 20px;
                border: 1px solid var(--border);
            }
            .card:hover { border-color: var(--primary); transform: translateY(-5px); }
            .card h3 { font-size: 1.2rem; margin-bottom: 15px; color: #fff; display: flex; align-items: center; gap: 10px; }
            .card h3::before { content: ''; width: 3px; height: 18px; background: var(--primary); }
            .badge { background: rgba(255,102,0,0.15); color: var(--primary); font-size: 0.65rem; padding: 3px 8px; border-radius: 4px; font-weight: 700; }

            /* Footer - Chỉ Hải Phòng & Email chuẩn */
            footer { background: #050505; padding: 80px 40px 30px; border-top: 1px solid var(--border); }
            .footer-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr 1.2fr; gap: 50px; }
            .footer-brand { color: var(--primary); font-size: 1.5rem; font-weight: 800; margin-bottom: 20px; }
            .footer-info p { color: #666; font-size: 0.9rem; margin-bottom: 10px; line-height: 1.6; }
            .footer-info strong { color: #eee; font-weight: 600; }
            .map-box { border-radius: 15px; overflow: hidden; height: 260px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); }

            @media (max-width: 900px) { 
                .grid, .footer-grid { grid-template-columns: 1fr; } 
                .hero h1 { font-size: 2.5rem; }
            }
        </style>
    </head>
    <body>

    <div class="side-social">
        <a href="https://zalo.me/0912888360" class="social-btn" title="Zalo hỗ trợ"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo"></a>
        <a href="#" class="social-btn" title="Messenger"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="Messenger"></a>
        <a href="#" class="social-btn" title="Facebook"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook"></a>
    </div>

    <header>
        <a href="#" class="btn-nav btn-trial">Học thử</a>
        <a href="#" class="btn-nav btn-login">Đăng nhập</a>
    </header>

    <section class="hero">
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-main" alt="MOS360">
        <h1>Chuẩn đầu ra sinh viên</h1>
        <p>Hệ thống luyện thi MOS 1000 Công nghệ cao tại Hải Phòng</p>
        <div class="search-container">
            <input type="text" class="search-box" placeholder="Hỏi AI hoặc tìm tài liệu ôn thi...">
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h3>Thi Thật 100% <span class="badge">CAM KẾT</span></h3>
                <p>Mô phỏng sát đề thi quốc tế, xóa tan nỗi lo bỡ ngỡ khi vào phòng thi thật.</p>
            </div>
            <div class="card">
                <h3>Công Nghệ AI 2026</h3>
                <p>Hỗ trợ giải đáp kiến thức và sửa lỗi thực hành tin học văn phòng siêu tốc.</p>
            </div>
            <div class="card">
                <h3>Hỗ Trợ Trọn Đời</h3>
                <p>Đồng hành cùng học viên qua Zalo/Teamview cho đến khi đạt chứng chỉ.</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-grid">
            <div class="footer-info">
                <div class="footer-brand">MOS360.VN</div>
                <p>Đơn vị đào tạo tin học quốc tế uy tín số 1 tại Hải Phòng.</p>
                <p style="margin-top: 25px;"><strong>Hotline/Zalo:</strong></p>
                <p style="font-size: 1.5rem; color: var(--primary); font-weight: 800; margin: 0;">0912.888.360</p>
            </div>
            
            <div class="footer-info">
                <p><strong>Cơ sở duy nhất:</strong><br>Số 57 Lê Văn Thuyết A, Phường An Biên, Quận Lê Chân, TP. Hải Phòng</p>
                <p style="margin-top: 25px;"><strong>Email:</strong><br>mos360.vn@gmail.com</p>
            </div>

            <div class="map-box">
                <iframe src="http://googleusercontent.com/maps.google.com/8" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
        <div style="text-align: center; color: #333; font-size: 0.7rem; margin-top: 50px; font-weight: 600; letter-spacing: 1px;">
            MOS360 — DẪN ĐẦU CÔNG NGHỆ LUYỆN THI © 2026
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
