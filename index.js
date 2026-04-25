export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Hệ Thống Luyện Thi Top 1</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }

            /* HEADER */
            header { padding: 15px 50px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.9); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 1.4rem; }
            .brand img { width: 40px; }

            /* SIDE SOCIAL */
            .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
            .social-item { width: 45px; height: 45px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 12px; display: flex; align-items: center; justify-content: center; text-decoration: none; }
            .social-item svg, .social-item img { width: 22px; height: 22px; }

            /* HERO */
            .hero { text-align: center; padding: 60px 20px 20px; }
            .hero h1 { font-size: 3rem; font-weight: 800; background: linear-gradient(to bottom, #fff, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

            /* LAYOUT */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
            .main-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 40px; text-align: center; overflow: hidden; }

            /* VÒNG QUAY - FIX CHỮ VÀO GIỮA TUYỆT ĐỐI */
            .wheel-wrapper { position: relative; width: 300px; height: 300px; margin: 20px auto; }
            .wheel-pointer { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #FFD700; z-index: 10; }
            .wheel-circle { 
                width: 100%; height: 100%; border-radius: 50%; border: 8px solid #FFD700;
                background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg);
                position: relative; animation: spin 15s linear infinite;
            }
            .wheel-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 70px; height: 70px; background: white; border-radius: 50%; z-index: 15; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #000; box-shadow: 0 0 20px rgba(0,0,0,0.5); }

            /* LOGIC CĂN CHỮ CHUẨN NAN QUẠT */
            .wheel-item { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
            .wheel-item b {
                position: absolute; top: 50%; left: 50%; width: 50%;
                transform-origin: left center;
                text-align: center;
                padding-left: 55px; /* Đẩy chữ vào giữa nan */
                font-size: 0.8rem; font-weight: 900; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            }
            .it1 b { transform: rotate(-45deg) translateY(-50%); }
            .it2 b { transform: rotate(-135deg) translateY(-50%); }
            .it3 b { transform: rotate(-225deg) translateY(-50%); }
            .it4 b { transform: rotate(-315deg) translateY(-50%); }

            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            /* BẢNG VÀNG CHẠY ẢNH (CAROUSEL) */
            .hall-of-fame { overflow: hidden; position: relative; margin-top: 25px; height: 120px; }
            .slide-track { display: flex; gap: 20px; width: calc(150px * 10); animation: scroll 20s linear infinite; }
            .slide-track:hover { animation-play-state: paused; }
            .student-card { width: 100px; flex-shrink: 0; text-align: center; }
            .student-card img { width: 70px; height: 70px; border-radius: 50%; border: 3px solid #FFD700; object-fit: cover; }
            .student-card b { display: block; color: #FFD700; font-size: 0.7rem; margin-top: 5px; }

            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

            .btn-cta { background: #E64A19; color: white; border: none; padding: 18px; border-radius: 100px; font-weight: 800; width: 100%; cursor: pointer; margin-top: 20px; text-transform: uppercase; }

            /* 3 MẢNG CHÍNH */
            .services { max-width: 1200px; margin: 50px auto; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .service-card { background: var(--card); padding: 30px; border-radius: 24px; border: 1px solid var(--border); }
            .service-card h3 { margin-bottom: 10px; font-size: 1.2rem; }
            .service-card p { color: #777; font-size: 0.9rem; }

            footer { padding: 60px 40px; background: #050505; border-top: 1px solid var(--border); }
            .f-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 40px; }
            .map-box { border-radius: 20px; overflow: hidden; height: 230px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); }

            @media (max-width: 900px) { .container, .services, .f-grid { grid-template-columns: 1fr; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand"><img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true"> <span>MOS360</span></a>
        <a href="#" style="background:var(--primary); color:white; padding:10px 25px; border-radius:10px; text-decoration:none; font-weight:700;">Đăng nhập</a>
    </header>

    <div class="side-social">
        <a href="#" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="#" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="#" class="social-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
        <a href="#" class="social-item"><svg viewBox="0 0 24 24" fill="white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.12-.91.38-1.57 1.23-1.73 2.19-.11.64-.03 1.3.18 1.91.43 1.13 1.53 1.95 2.73 2.11 1.19.16 2.45-.19 3.33-1.01.62-.57.97-1.38 1-2.22.04-4.52-.01-9.04.01-13.56z"/></svg></a>
    </div>

    <section class="hero">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p style="color:#777">Luyện thi MOS 1000/1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="container">
        <div class="main-card">
            <h3 style="color:var(--primary)">🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-wrapper">
                <div class="wheel-pointer"></div>
                <div class="wheel-circle">
                    <div class="wheel-item it1"><b>GIẢM 50K</b></div>
                    <div class="wheel-item it2"><b>GIẢM 50%</b></div>
                    <div class="wheel-item it3"><b>GIẢM 100K</b></div>
                    <div class="wheel-item it4"><b>GIẢM 80%</b></div>
                </div>
                <div class="wheel-btn">QUAY</div>
            </div>
            <button class="btn-cta">NHẬN QUÀ NGAY</button>
        </div>

        <div class="main-card" style="text-align:left">
            <h3>🏆 Bảng Vàng MOS360</h3>
            <p style="color:#666; font-size:0.9rem">Học viên tiêu biểu đạt điểm tối đa tại Hải Phòng.</p>
            <div class="hall-of-fame">
                <div class="slide-track">
                    <div class="student-card"><img src="https://via.placeholder.com/100"><b>1000/1000</b></div>
                    <div class="student-card"><img src="https://via.placeholder.com/100"><b>1000/1000</b></div>
                    <div class="student-card"><img src="https://via.placeholder.com/100"><b>980/1000</b></div>
                    <div class="student-card"><img src="https://via.placeholder.com/100"><b>1000/1000</b></div>
                    <div class="student-card"><img src="https://via.placeholder.com/100"><b>1000/1000</b></div>
                    <div class="student-card"><img src="https://via.placeholder.com/100"><b>1000/1000</b></div>
                    <div class="student-card"><img src="https://via.placeholder.com/100"><b>1000/1000</b></div>
                    <div class="student-card"><img src="https://via.placeholder.com/100"><b>980/1000</b></div>
                </div>
            </div>
            <div style="margin-top:30px; border-top:1px solid var(--border); padding-top:20px;">
                <p style="color:var(--primary); font-weight:700">🎁 ƯU ĐÃI NHÓM:</p>
                <p style="color:#555; font-size:0.85rem">Đăng ký nhóm 3 người giảm thêm 100k/bạn.</p>
            </div>
        </div>
    </div>

    <div class="services">
        <div class="service-card"><h3>Thi Thật 100%</h3><p>Thực hành sát đề thi quốc tế Certiport.</p></div>
        <div class="service-card"><h3>AI Assistant ✨</h3><p>Hỗ trợ giải đáp kiến thức tin học 24/7.</p></div>
        <div class="service-card"><h3>Đồng Hành</h3><p>Hỗ trợ đồ án, luận văn trọn đời.</p></div>
    </div>

    <footer>
        <div class="f-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p style="color:#666">Hotline: 0912.888.360</p></div>
            <div><p style="color:#999">57 Lê Văn Thuyết A, An Biên, Hải Phòng</p></div>
            <div class="map-box"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.5348821013775!2d106.6784849!3d20.8504994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af27670e3eb%3A0xb71a81f33f076b2!2zNTcgTMOqIFbEg24gVGh1eeG6v3QgQSwgQW4gQmmnbiwgTMOqIENow6JuLCBI4bqjaSBQaMOybmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1714000000000!5m2!1sen!2s4" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div>
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
