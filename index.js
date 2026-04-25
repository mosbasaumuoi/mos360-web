export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Luyện Thi MOS Chuẩn Quốc Tế</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { 
                --primary: #FF5722; 
                --bg: #080808; 
                --card: #121212;
                --text: #ffffff;
                --border: rgba(255, 255, 255, 0.08);
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }

            header { padding: 12px 50px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8, 8, 8, 0.95); backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
            .brand img { width: 38px; height: auto; }
            .brand span { color: white; font-size: 1.3rem; font-weight: 800; }

            /* SOCIAL ICONS FIXED */
            .side-contact { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 9999; }
            .social-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a; border: 1px solid var(--border); text-decoration: none; }
            .social-icon img { width: 24px; height: 24px; }
            .social-icon:hover { border-color: var(--primary); transform: translateX(-5px); }

            .hero { text-align: center; padding: 60px 20px 20px; }
            .hero h1 { font-size: 3rem; font-weight: 800; background: linear-gradient(to bottom, #fff 60%, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }

            .funnel-container { max-width: 1100px; margin: 20px auto; padding: 0 20px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 25px; }
            .funnel-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 35px; text-align: center; position: relative; }

            /* VÒNG QUAY NÂNG CẤP CHUẨN MIẾNG BÁNH */
            .wheel-box { position: relative; width: 300px; height: 300px; margin: 25px auto; }
            .wheel-pointer { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #FFD700; z-index: 20; filter: drop-shadow(0 0 5px rgba(255,215,0,0.5)); }
            
            .wheel-canvas { 
                width: 100%; height: 100%; border-radius: 50%; border: 10px solid #FFD700;
                background: conic-gradient(
                    #ff6b6b 0deg 90deg, 
                    #4ecdc4 90deg 180deg, 
                    #ffbe0b 180deg 270deg, 
                    #ff006e 270deg 360deg
                );
                position: relative; animation: rotateWheel 15s linear infinite;
            }

            /* CHỮ NẰM GIỮA VÀ XOAY THEO MIẾNG BÁNH */
            .wheel-text { 
                position: absolute; width: 100%; height: 100%; top: 0; left: 0;
                font-size: 0.7rem; font-weight: 900; color: white;
            }
            .wheel-text span {
                position: absolute; top: 50%; left: 50%;
                width: 50%; text-align: right; padding-right: 20px;
                transform-origin: 0% 50%;
            }
            .t1 span { transform: translate(0, -50%) rotate(-45deg); }
            .t2 span { transform: translate(0, -50%) rotate(-135deg); }
            .t3 span { transform: translate(0, -50%) rotate(-225deg); }
            .t4 span { transform: translate(0, -50%) rotate(-315deg); }

            .wheel-center-btn {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                width: 70px; height: 70px; background: #fff; border-radius: 50%;
                z-index: 30; display: flex; flex-direction: column; align-items: center; justify-content: center;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 4px solid #fff;
            }
            .wheel-center-btn b { color: #222; font-size: 0.8rem; }

            .btn-gift { 
                background: #E64A19; color: white; border: none; padding: 18px; border-radius: 100px; 
                font-weight: 800; width: 100%; cursor: pointer; margin-top: 15px; 
                box-shadow: 0 5px 20px rgba(230, 74, 25, 0.4); text-transform: uppercase;
            }

            .map-container { border-radius: 20px; overflow: hidden; height: 250px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); margin-top: 15px; }
            footer { background: #050505; padding: 40px 20px; border-top: 1px solid var(--border); margin-top: 40px; }
            .f-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 30px; }

            @keyframes rotateWheel { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @media (max-width: 850px) { .funnel-container, .f-grid { grid-template-columns: 1fr; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand">
            <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" alt="MOS360">
            <span>MOS360</span>
        </a>
        <a href="#" style="background: var(--primary); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700;">Đăng nhập</a>
    </header>

    <div class="side-contact">
        <a href="https://zalo.me/0912888360" class="social-icon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="https://www.facebook.com/MOS360.EDU" class="social-icon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="https://www.youtube.com/@mos360_vn" class="social-icon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
        <a href="https://www.tiktok.com/@mos360.vn" class="social-icon" target="_blank"><img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/tiktok-icon.png?raw=true" style="filter:invert(1)"></a>
    </div>

    <section class="hero">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p style="color: #888;">Luyện thi MOS 1000/1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="funnel-container">
        <div class="funnel-card">
            <h3 style="color: var(--primary);">🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-box">
                <div class="wheel-pointer"></div>
                <div class="wheel-canvas">
                    <div class="wheel-text t1"><span>VOUCHER 50K</span></div>
                    <div class="wheel-text t2"><span>GIẢM 50%</span></div>
                    <div class="wheel-text t3"><span>VOUCHER 100K</span></div>
                    <div class="wheel-text t4"><span>GIẢM 80%</span></div>
                </div>
                <div class="wheel-center-btn"><b>QUAY</b><small>LUCKY ★</small></div>
            </div>
            <button class="btn-gift">NHẬN QUÀ NGAY</button>
        </div>

        <div class="funnel-card" style="text-align: left;">
            <h3>🏆 Bảng Vàng MOS360</h3>
            <p style="color:#777; margin-bottom: 20px;">Hơn 1.000 học viên tại Hải Phòng đạt điểm tối đa.</p>
            <div style="display: flex; gap: 15px;">
                <div style="text-align: center;"><img src="https://via.placeholder.com/60" style="border-radius: 50%; border: 2px solid #FFD700;"><br><span style="color:#FFD700; font-size:0.7rem; font-weight:800;">1000/1000</span></div>
                <div style="text-align: center;"><img src="https://via.placeholder.com/60" style="border-radius: 50%; border: 2px solid #FFD700;"><br><span style="color:#FFD700; font-size:0.7rem; font-weight:800;">1000/1000</span></div>
                <div style="text-align: center;"><img src="https://via.placeholder.com/60" style="border-radius: 50%; border: 2px solid #FFD700;"><br><span style="color:#FFD700; font-size:0.7rem; font-weight:800;">980/1000</span></div>
            </div>
        </div>
    </div>

    <footer>
        <div class="f-grid">
            <div>
                <div style="color: var(--primary); font-size: 1.4rem; font-weight: 800; margin-bottom: 15px;">MOS360.VN</div>
                <p style="color: #666; font-size: 0.85rem;">Hotline: 0912.888.360</p>
            </div>
            <div>
                <p style="color: #888; font-size: 0.9rem;"><strong>Địa chỉ:</strong> 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p>
            </div>
            <div class="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.431284568117!2d106.67923761142512!3d20.85465139361735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af2763f60e9%3A0x6b77c56434441999!2zNTcgTMOqIFbEg24gVGh1eeG6vHQsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZywgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
