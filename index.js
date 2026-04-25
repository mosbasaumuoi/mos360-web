export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Chuẩn Đầu Ra Cho Sinh Viên</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
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
                margin: 0; line-height: 1.6;
            }

            /* Header cố định - Logo bên trái */
            header { 
                padding: 12px 50px; display: flex; justify-content: space-between; align-items: center;
                position: sticky; top: 0; background: rgba(8, 8, 8, 0.95); backdrop-filter: blur(15px); z-index: 1000;
                border-bottom: 1px solid var(--border);
            }
            .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
            .brand img { width: 42px; height: auto; }
            .brand span { color: white; font-size: 1.3rem; font-weight: 800; letter-spacing: -0.5px; }
            
            .nav-actions { display: flex; gap: 12px; }
            .btn { padding: 9px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.85rem; }
            .btn-trial { border: 1px solid var(--border); color: #bbb; }
            .btn-login { background: var(--primary); color: white; }

            /* Hero Section - Slogan chuẩn */
            .hero { text-align: center; padding: 110px 20px 70px; }
            .hero h1 { font-size: 4rem; font-weight: 800; letter-spacing: -3px; margin: 0; line-height: 1.1; }
            .hero .tagline { font-size: 1.4rem; color: #777; margin: 20px 0 45px; font-weight: 400; }

            /* Side Social (Zalo, FB, Messenger) */
            .side-contact {
                position: fixed; right: 20px; top: 55%; transform: translateY(-50%);
                display: flex; flex-direction: column; gap: 12px; z-index: 9999;
            }
            .social-icon {
                width: 50px; height: 50px; border-radius: 14px;
                display: flex; align-items: center; justify-content: center;
                background: #1a1a1a; border: 1px solid var(--border);
            }
            .social-icon img { width: 26px; height: 26px; }
            .social-icon:hover { border-color: var(--primary); transform: translateX(-5px); background: #000; }

            /* Search Box */
            .search-box-wrap { max-width: 620px; margin: 0 auto 90px; }
            .search-input { 
                width: 100%; padding: 20px 30px; border-radius: 12px; border: 1px solid var(--border);
                background: #111; color: white; font-size: 1rem; outline: none;
            }
            .search-input:focus { border-color: var(--primary); }

            /* Feature Cards */
            .container { max-width: 1150px; margin: 0 auto; padding: 0 30px 100px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
            .card { 
                background: var(--card); padding: 45px 35px; border-radius: 24px;
                border: 1px solid var(--border); text-align: left;
            }
            .card:hover { border-color: var(--primary); transform: translateY(-8px); }
            .card h3 { font-size: 1.25rem; margin-bottom: 15px; color: #fff; display: flex; align-items: center; gap: 10px; }
            .card h3::before { content: ''; width: 3px; height: 20px; background: var(--primary); border-radius: 2px; }
            .card p { color: #666; font-size: 0.95rem; margin: 0; }
            .badge { background: rgba(255,102,0,0.1); color: var(--primary); font-size: 0.65rem; padding: 3px 8px; border-radius: 5px; font-weight: 700; }

            /* Footer - Thông tin chuẩn Hải Phòng */
            footer { background: #050505; padding: 80px 50px 30px; border-top: 1px solid var(--border); }
            .f-grid { max-width: 1150px; margin: 0 auto; display: grid; grid-template-columns: 1.3fr 1fr 1.2fr; gap: 60px; }
            .f-brand { color: var(--primary); font-size: 1.8rem; font-weight: 800; margin-bottom: 20px; }
            .f-text p { color: #666; font-size: 0.9rem; margin-bottom: 10px; }
            .f-text strong { color: #eee; }
            .map-container { border-radius: 18px; overflow: hidden; height: 280px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); }

            @media (max-width: 900px) { 
                .grid, .f-grid { grid-template-columns: 1fr; } 
                .hero h1 { font-size: 2.6rem; }
                header { padding: 12px 25px; }
            }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand">
            <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" alt="MOS360">
            <span>MOS360</span>
        </a>
        <div class="nav-actions">
            <a href="#" class="btn btn-trial">Học thử</a>
            <a href="#" class="btn btn-login">Đăng nhập</a>
        </div>
    </header>

    <div class="side-contact">
        <a href="https://zalo.me/0912888360" class="social-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo"></a>
        <a href="#" class="social-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="Messenger"></a>
        <a href="#" class="social-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="FB"></a>
    </div>

    <section class="hero">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p class="tagline">Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
        <div class="search-box-wrap">
            <input type="text" class="search-input" placeholder="Tìm tài liệu ôn thi hoặc hỏi AI Assistant...">
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h3>Thi Thật 100% <span class="badge">CAM KẾT</span></h3>
                <p>Học viên thực hành trên phần mềm mô phỏng sát 100% giao diện và đề thi quốc tế tại Certiport.</p>
            </div>
            <div class="card">
                <h3>AI Assistant 24/7</h3>
                <p>Hệ thống trí tuệ nhân tạo hỗ trợ giải đáp kiến thức và sửa lỗi thực hành ngay lập tức.</p>
            </div>
            <div class="card">
                <h3>Đồng Hành Trọn Đời</h3>
                <p>Hỗ trợ định dạng luận văn, đồ án và kỹ năng văn phòng chuyên sâu từ đội ngũ chuyên gia.</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="f-grid">
            <div class="f-text">
                <div class="f-brand">MOS360.VN</div>
                <p>Nền tảng đào tạo tin học quốc tế thực chiến hàng đầu.</p>
                <p style="margin-top: 30px;"><strong>Hotline/Zalo:</strong></p>
                <p style="font-size: 1.7rem; color: var(--primary); font-weight: 800; margin: 0;">0912.888.360</p>
            </div>
            <div class="f-text">
                <p><strong>Cơ sở Hải Phòng:</strong><br>Số 57 Lê Văn Thuyết A, Phường An Biên, TP. Hải Phòng</p>
                <p style="margin-top: 25px;"><strong>Email:</strong><br>mos360.vn@gmail.com</p>
            </div>
            <div class="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.113115812733!2d105.79155707596956!3d21.028154487796932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab45778a870d%3A0xe5f80b2a95e7952a!2zTmFtIFRydW5nIFnDqm4sIEMhuqd1IEdp4bqleSwgSGFub2k!5e0!3m2!1svi!2svn!4v17156712345670" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
        <div style="text-align: center; color: #333; font-size: 0.75rem; margin-top: 60px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">
            MOS360 — CÔNG NGHỆ DẪN ĐẦU KỶ NGUYÊN LUYỆN THI © 2026
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
