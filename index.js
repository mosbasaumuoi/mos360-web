export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Luyện Thi Thực Chiến 1000/1000</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
            :root { 
                --primary: #FF6600; 
                --bg: #030303; 
                --card: rgba(23, 23, 23, 0.7);
                --text: #ffffff;
                --glass: rgba(255, 255, 255, 0.05);
            }
            * { box-sizing: border-box; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            body { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                background: var(--bg); color: var(--text); 
                margin: 0; line-height: 1.6;
            }

            /* Nút liên hệ nổi bên phải - Tinh chỉnh 3 nút chính */
            .side-social {
                position: fixed; right: 25px; bottom: 50%; transform: translateY(50%);
                display: flex; flex-direction: column; gap: 15px; z-index: 9999;
            }
            .social-btn {
                width: 50px; height: 50px; border-radius: 15px;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
                backdrop-filter: blur(5px);
            }
            .social-btn img { width: 28px; height: 28px; }
            .btn-zalo { background: #0068ff; }
            .btn-ms { background: linear-gradient(135deg, #0084FF, #A033FF); }
            .btn-fb { background: #1877f2; }
            .social-btn:hover { transform: scale(1.15) translateX(-8px); border-color: var(--primary); }

            /* Header mượt mà */
            header { 
                padding: 20px 60px; display: flex; justify-content: flex-end; gap: 15px;
                position: sticky; top: 0; background: rgba(3, 3, 3, 0.85); backdrop-filter: blur(20px); z-index: 1000;
                border-bottom: 1px solid rgba(255,255,255,0.03);
            }
            .btn-nav { padding: 10px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.85rem; }
            .btn-trial { border: 1px solid rgba(255,255,255,0.2); color: #fff; }
            .btn-login { background: var(--primary); color: white; box-shadow: 0 8px 20px rgba(255,102,0,0.3); }
            .btn-login:hover { background: #e65c00; }

            /* Hero Section - Logo To & Rõ */
            .hero { text-align: center; padding: 120px 20px 80px; }
            .logo-main { width: 380px; filter: drop-shadow(0 0 50px rgba(255,102,0,0.25)); margin-bottom: 40px; }
            .hero h1 { font-size: 4.5rem; font-weight: 800; letter-spacing: -4px; margin: 0; line-height: 1.1; background: linear-gradient(to bottom, #fff, #999); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .hero p { color: #888; font-size: 1.3rem; margin: 25px 0 50px; font-weight: 300; }

            /* Search Box Modern */
            .search-container { max-width: 650px; margin: 0 auto 100px; }
            .search-box { 
                width: 100%; padding: 22px 35px; border-radius: 100px; border: 1px solid #222;
                background: rgba(255,255,255,0.03); color: white; font-size: 1.1rem; outline: none;
            }
            .search-box:focus { border-color: var(--primary); background: rgba(255,255,255,0.07); }

            /* Grid Cam kết */
            .container { max-width: 1300px; margin: 0 auto; padding: 0 40px 100px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
            .card { 
                background: var(--card); padding: 50px 40px; border-radius: 35px;
                border: 1px solid rgba(255,255,255,0.05); position: relative;
            }
            .card:hover { border-color: var(--primary); transform: translateY(-12px); background: rgba(30, 30, 30, 0.4); }
            .card h3 { font-size: 1.5rem; margin-bottom: 20px; color: #fff; display: flex; align-items: center; gap: 12px; }
            .card h3::before { content: ''; width: 4px; height: 25px; background: var(--primary); border-radius: 10px; }
            .card p { color: #777; font-size: 1rem; line-height: 1.7; }
            .badge { background: var(--primary); color: white; font-size: 0.7rem; padding: 4px 10px; border-radius: 8px; font-weight: 800; margin-left: 10px; text-transform: uppercase; }

            /* Footer chuyên nghiệp */
            footer { background: #000; padding: 100px 60px 40px; border-top: 1px solid #111; }
            .footer-grid { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 80px; }
            .footer-h2 { color: var(--primary); font-size: 2rem; font-weight: 800; margin-bottom: 30px; letter-spacing: -1px; }
            .footer-info p { color: #888; font-size: 1rem; margin-bottom: 15px; }
            .footer-info strong { color: #fff; font-weight: 600; }
            .map-box { border-radius: 30px; overflow: hidden; height: 320px; border: 1px solid #222; filter: grayscale(1) invert(0.92); }

            @media (max-width: 1000px) { .grid, .footer-grid { grid-template-columns: 1fr; } .hero h1 { font-size: 3rem; } .side-social { right: 10px; } }
        </style>
    </head>
    <body>

    <div class="side-social">
        <a href="https://zalo.me/0912888360" class="social-btn btn-zalo" title="Chat Zalo hỗ trợ">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo">
        </a>
        <a href="#" class="social-btn btn-ms" title="Messenger">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="Messenger">
        </a>
        <a href="#" class="social-btn btn-fb" title="Facebook Fanpage">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook">
        </a>
    </div>

    <header>
        <a href="#" class="btn-nav btn-trial">Học thử</a>
        <a href="#" class="btn-nav btn-login">Đăng nhập</a>
    </header>

    <section class="hero">
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-main" alt="MOS360">
        <h1>Chuẩn đầu ra sinh viên</h1>
        <p>Luyện thi MOS 1000/1000 — Hệ thống đào tạo thực chiến hàng đầu</p>
        <div class="search-container">
            <input type="text" class="search-box" placeholder="Hỏi AI Assistant hoặc tìm tài liệu ôn thi...">
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card" style="border-top: 4px solid var(--primary);">
                <h3>Trải Nghiệm Thi Thật <span class="badge">100%</span></h3>
                <p>Học viên được thực hành trên phần mềm mô phỏng sát 100% đề thi thực tế tại Certiport, giúp làm quen áp lực và giao diện quốc tế.</p>
            </div>
            <div class="card">
                <h3>Công Nghệ AI 2026</h3>
                <p>Nền tảng tích hợp trí tuệ nhân tạo hỗ trợ tìm kiếm tài liệu thông minh và sửa lỗi các hàm Excel, định dạng Word ngay lập tức.</p>
            </div>
            <div class="card">
                <h3>Cam Kết Trọn Đời</h3>
                <p>Không chỉ là chứng chỉ, chúng tôi cam kết đồng hành cùng học viên qua Zalo/Teamview cho đến khi bạn hoàn toàn làm chủ kỹ năng.</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-grid">
            <div class="footer-info">
                <div class="footer-h2">MOS360.VN</div>
                <p>Hệ thống đào tạo tin học quốc tế uy tín số 1 tại Hải Phòng.</p>
                <p style="margin-top: 30px;"><strong>Hotline/Zalo hỗ trợ:</strong></p>
                <p style="font-size: 1.8rem; color: var(--primary); font-weight: 800;">0912.888.360</p>
            </div>
            <div class="footer-info">
                <p><strong>Cơ sở Hải Phòng:</strong><br>Số 57 Lê Văn Thuyết A, P. An Biên, Q. Lê Chân, TP. Hải Phòng</p>
                <p><strong>Cơ sở Hà Nội:</strong><br>KĐT Nam Trung Yên, Cầu Giấy, Hà Nội</p>
                <p style="margin-top: 20px;"><strong>Email:</strong> manager@mos360.vn</p>
            </div>
            <div class="map-box">
                <iframe src="http://googleusercontent.com/maps.google.com/6" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
        <div style="text-align: center; color: #333; font-size: 0.75rem; margin-top: 80px; font-weight: 600; letter-spacing: 1px;">
            MOS360 — DẪN ĐẦU KỶ NGUYÊN LUYỆN THI CÔNG NGHỆ CAO © 2026
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
