export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Chuẩn Đầu Ra Sinh Viên</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { 
                --primary: #FF6600; 
                --bg: #080808; 
                --card: #111111;
                --text: #ffffff;
                --border: rgba(255, 255, 255, 0.08);
            }
            * { box-sizing: border-box; transition: all 0.25s ease; }
            body { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                background: var(--bg); color: var(--text); 
                margin: 0; line-height: 1.6;
            }

            /* Header cố định chuẩn UI hiện đại */
            header { 
                padding: 12px 60px; display: flex; justify-content: space-between; align-items: center;
                position: sticky; top: 0; background: rgba(8, 8, 8, 0.95); backdrop-filter: blur(15px); z-index: 1000;
                border-bottom: 1px solid var(--border);
            }
            .logo-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
            .logo-img { width: 45px; height: auto; }
            .brand-name { color: white; font-size: 1.4rem; font-weight: 800; letter-spacing: -0.5px; }
            
            .nav-btns { display: flex; gap: 12px; }
            .btn-nav { padding: 10px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.85rem; }
            .btn-trial { border: 1px solid var(--border); color: #aaa; }
            .btn-login { background: var(--primary); color: white; }

            /* Hero Section với Slogan mới */
            .hero { text-align: center; padding: 120px 20px 80px; }
            .hero h1 { font-size: 4.2rem; font-weight: 800; letter-spacing: -3px; margin: 0; line-height: 1.1; }
            .hero .sub-slogan { font-size: 1.5rem; color: #888; margin: 20px 0 40px; font-weight: 400; letter-spacing: 0px; }

            /* Side Social nổi bên phải */
            .side-social {
                position: fixed; right: 20px; top: 50%; transform: translateY(-50%);
                display: flex; flex-direction: column; gap: 10px; z-index: 9999;
            }
            .social-btn {
                width: 50px; height: 50px; border-radius: 12px;
                display: flex; align-items: center; justify-content: center;
                background: #181818; border: 1px solid var(--border);
            }
            .social-btn img { width: 24px; height: 24px; }
            .social-btn:hover { border-color: var(--primary); transform: translateX(-5px); }

            /* Search Box */
            .search-container { max-width: 650px; margin: 0 auto 100px; }
            .search-box { 
                width: 100%; padding: 22px 30px; border-radius: 100px; border: 1px solid var(--border);
                background: #121212; color: white; font-size: 1.05rem; outline: none;
            }
            .search-box:focus { border-color: var(--primary); }

            /* Content Grid */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 40px 120px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
            .card { 
                background: var(--card); padding: 45px 35px; border-radius: 24px;
                border: 1px solid var(--border);
            }
            .card:hover { border-color: var(--primary); transform: translateY(-10px); }
            .card h3 { font-size: 1.3rem; margin-bottom: 15px; color: #fff; }
            .badge { background: rgba(255,102,0,0.2); color: var(--primary); font-size: 0.7rem; padding: 4px 10px; border-radius: 6px; font-weight: 700; }

            /* Footer */
            footer { background: #050505; padding: 80px 60px 40px; border-top: 1px solid var(--border); }
            .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr 1.2fr; gap: 60px; }
            .footer-h2 { color: var(--primary); font-size: 1.8rem; font-weight: 800; margin-bottom: 20px; }
            .footer-info p { color: #666; font-size: 0.95rem; margin-bottom: 12px; }
            .map-box { border-radius: 20px; overflow: hidden; height: 300px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); }

            @media (max-width: 1000px) { 
                header { padding: 10px 20px; }
                .grid, .footer-grid { grid-template-columns: 1fr; } 
                .hero h1 { font-size: 2.8rem; }
            }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="logo-brand">
            <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-img" alt="MOS360">
            <span class="brand-name">MOS360</span>
        </a>
        <div class="nav-btns">
            <a href="#" class="btn-nav btn-trial">Học thử</a>
            <a href="#" class="btn-nav btn-login">Đăng nhập</a>
        </div>
    </header>

    <div class="side-social">
        <a href="https://zalo.me/0912888360" class="social-btn"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo"></a>
        <a href="#" class="social-btn"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="Messenger"></a>
        <a href="#" class="social-btn"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="FB"></a>
    </div>

    <section class="hero">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p class="sub-slogan">Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
        <div class="search-container">
            <input type="text" class="search-box" placeholder="Hỏi AI Assistant hoặc tìm tài liệu...">
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h3>Thi Thật 100% <span class="badge">CAM KẾT</span></h3>
                <p>Mô phỏng sát đề thi quốc tế, làm quen áp lực và giao diện thực tế trước khi thi chính thức.</p>
            </div>
            <div class="card">
                <h3>Công Nghệ AI 2026</h3>
                <p>Trợ lý AI hỗ trợ giải đáp và sửa lỗi thực hành Excel/Word ngay lập tức 24/7.</p>
            </div>
            <div class="card">
                <h3>Cộng Đồng Thực Chiến</h3>
                <p>Hỗ trợ giải đáp qua Zalo/Teamview tận tâm cho đến khi bạn cầm chứng chỉ trên tay.</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-grid">
            <div class="footer-info">
                <div class="footer-h2">MOS360.VN</div>
                <p>Hệ thống đào tạo tin học quốc tế uy tín số 1 Hải Phòng.</p>
                <p style="margin-top: 30px;"><strong>Hotline/Zalo:</strong></p>
                <p style="font-size: 1.8rem; color: var(--primary); font-weight: 800; margin: 0;">0912.888.360</p>
            </div>
            <div class="footer-info">
                <p><strong>Địa chỉ tại Hải Phòng:</strong><br>Số 57 Lê Văn Thuyết A, P. An Biên, Q. Lê Chân, TP. Hải Phòng</p>
                <p style="margin-top: 25px;"><strong>Email liên hệ:</strong><br>mos360.vn@gmail.com</p>
            </div>
            <div class="map-box">
                <iframe src="http://googleusercontent.com/maps.google.com/9" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
        <div style="text-align: center; color: #333; font-size: 0.75rem; margin-top: 60px; font-weight: 600; letter-spacing: 1px;">
            MOS360 — DẪN ĐẦU CÔNG NGHỆ LUYỆN THI © 2026
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
