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
            * { box-sizing: border-box; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
            body { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                background: var(--bg); color: var(--text); 
                margin: 0; line-height: 1.6; overflow-x: hidden;
            }

            /* Header cố định - Logo & Tên bên trái */
            header { 
                padding: 12px 50px; display: flex; justify-content: space-between; align-items: center;
                position: sticky; top: 0; background: rgba(8, 8, 8, 0.95); backdrop-filter: blur(15px); z-index: 1000;
                border-bottom: 1px solid var(--border);
            }
            .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
            .brand img { width: 42px; height: auto; }
            .brand span { color: white; font-size: 1.4rem; font-weight: 800; letter-spacing: -0.5px; }
            
            .nav-actions { display: flex; gap: 12px; }
            .btn { padding: 10px 22px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.85rem; }
            .btn-trial { border: 1px solid var(--border); color: #bbb; }
            .btn-login { background: var(--primary); color: white; }

            /* Hero Section */
            .hero { text-align: center; padding: 100px 20px 60px; }
            .hero h1 { font-size: 4.2rem; font-weight: 800; letter-spacing: -3px; margin: 0; line-height: 1.1; background: linear-gradient(to bottom, #fff 60%, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .hero .tagline { font-size: 1.5rem; color: #777; margin: 25px 0 45px; font-weight: 400; }

            /* Nút liên hệ nổi bên phải */
            .side-contact {
                position: fixed; right: 20px; top: 55%; transform: translateY(-50%);
                display: flex; flex-direction: column; gap: 12px; z-index: 9999;
            }
            .social-icon {
                width: 52px; height: 52px; border-radius: 14px;
                display: flex; align-items: center; justify-content: center;
                background: #1a1a1a; border: 1px solid var(--border);
            }
            .social-icon img { width: 28px; height: 28px; }
            .social-icon:hover { border-color: var(--primary); transform: translateX(-8px); background: #000; }

            /* Search Box Modern */
            .search-box-wrap { max-width: 650px; margin: 0 auto 90px; }
            .search-input { 
                width: 100%; padding: 22px 32px; border-radius: 100px; border: 1px solid var(--border);
                background: rgba(255,255,255,0.03); color: white; font-size: 1.05rem; outline: none;
            }
            .search-input:focus { border-color: var(--primary); }

            /* Feature Cards */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 40px 100px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
            .card { 
                background: var(--card); padding: 45px 35px; border-radius: 28px;
                border: 1px solid var(--border); text-align: left;
            }
            .card:hover { border-color: var(--primary); transform: translateY(-10px); }
            .card h3 { font-size: 1.35rem; margin-bottom: 18px; color: #fff; display: flex; align-items: center; gap: 12px; }
            .card h3::before { content: ''; width: 4px; height: 22px; background: var(--primary); border-radius: 10px; }
            .card p { color: #888; font-size: 0.95rem; line-height: 1.7; }
            .badge { background: rgba(255,102,0,0.15); color: var(--primary); font-size: 0.7rem; padding: 4px 10px; border-radius: 6px; font-weight: 800; }

            /* Footer & Map */
            footer { background: #050505; padding: 80px 60px 40px; border-top: 1px solid var(--border); }
            .f-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.3fr 1fr 1.2fr; gap: 60px; }
            .f-brand { color: var(--primary); font-size: 2rem; font-weight: 800; margin-bottom: 25px; }
            .f-text p { color: #777; font-size: 1rem; margin-bottom: 12px; }
            
            .map-container { 
                border-radius: 24px; overflow: hidden; height: 320px; 
                border: 1px solid var(--border); 
                filter: grayscale(1) invert(0.92) contrast(1.1); 
            }
            .map-container:hover { filter: none; }

            @media (max-width: 1000px) { 
                .grid, .f-grid { grid-template-columns: 1fr; } 
                .hero h1 { font-size: 2.8rem; }
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
            <input type="text" class="search-input" placeholder="Tìm tài liệu hoặc hỏi AI Assistant...">
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h3>Thi Thật 100% <span class="badge">CAM KẾT</span></h3>
                <p>Thực hành trực tiếp trên phần mềm mô phỏng sát 100% đề thi quốc tế. Tự tin tuyệt đối khi bước vào phòng thi thật.</p>
            </div>
            <div class="card">
                <h3>AI Assistant 24/7</h3>
                <p>Hệ thống trí tuệ nhân tạo hỗ trợ tìm kiếm tài liệu thông minh và giải đáp mọi thắc mắc về kiến thức tin học ngay lập tức.</p>
            </div>
            <div class="card">
                <h3>Đồng Hành Trọn Đời</h3>
                <p>Cung cấp tài liệu và hỗ trợ kỹ năng chuyên sâu, giúp bạn làm chủ mọi luận văn và tác vụ văn phòng thực tế.</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="f-grid">
            <div class="f-text">
                <div class="f-brand">MOS360.VN</div>
                <p>Hệ thống đào tạo tin học quốc tế uy tín tại Hải Phòng.</p>
                <p style="margin-top: 35px;"><strong>Hotline/Zalo:</strong></p>
                <p style="font-size: 1.8rem; color: var(--primary); font-weight: 800; margin: 0;">0912.888.360</p>
            </div>
            
            <div class="f-text">
                <p><strong>Cơ sở Hải Phòng:</strong><br>Số 57 Lê Văn Thuyết A, P. An Biên, TP. Hải Phòng</p>
                <p style="margin-top: 30px;"><strong>Email:</strong><br>mos360.vn@gmail.com</p>
            </div>

            <div class="map-container">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.468249629631!2d106.6784869!3d20.8525704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af937c95e1b%3A0xc3c97e5564998797!2zNTcgTMOqIFbEg24gVGh1eeG6v3QgQSwgQW4gQmnDqm4sIEzDqiBDaMOibiwgSOG6o2kgUGjDsm5n!5e0!3m2!1svi!2s!4v1711800000000!5m2!1svi!2s" 
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            </div>
        </div>
        
        <div style="text-align: center; color: #444; font-size: 0.8rem; margin-top: 80px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
            MOS360 - ĐỒNG HÀNH TRỌN ĐỜI
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
