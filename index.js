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
                --primary: #FF5722; /* Cam sậm sang trọng */
                --bg: #080808; 
                --card: #121212;
                --text: #ffffff;
                --border: rgba(255, 255, 255, 0.08);
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }

            /* HEADER */
            header { padding: 12px 50px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8, 8, 8, 0.95); backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
            .brand img { width: 38px; height: auto; }
            .brand span { color: white; font-size: 1.3rem; font-weight: 800; }

            /* HERO */
            .hero { text-align: center; padding: 60px 20px 20px; }
            .hero h1 { font-size: 3rem; font-weight: 800; background: linear-gradient(to bottom, #fff 60%, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }
            .stat-badge { background: rgba(255,102,0,0.1); color: var(--primary); padding: 6px 16px; border-radius: 100px; font-weight: 700; font-size: 0.8rem; display: inline-block; margin-bottom: 15px; border: 1px solid rgba(255,87,34,0.2); }

            /* MARKETING SECTION */
            .funnel-container { max-width: 1100px; margin: 20px auto; padding: 0 20px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 25px; }
            .funnel-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 35px; text-align: center; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }

            /* VÒNG QUAY NÂNG CẤP - CHỮ CĂN GIỮA */
            .wheel-box { position: relative; width: 280px; height: 280px; margin: 25px auto; }
            .wheel-pointer { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 14px solid transparent; border-right: 14px solid transparent; border-top: 22px solid #FFD700; z-index: 20; filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)); }
            
            .wheel-canvas { 
                width: 100%; height: 100%; border-radius: 50%; border: 8px solid #FFD700;
                background: conic-gradient(
                    #ff6b6b 0deg 90deg, 
                    #4ecdc4 90deg 180deg, 
                    #ffbe0b 180deg 270deg, 
                    #ff006e 270deg 360deg
                );
                position: relative; animation: rotateWheel 15s linear infinite;
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.15);
            }

            /* CSS CHỮ NẰM GIỮA MIẾNG BÁNH */
            .wheel-text { 
                position: absolute; width: 100%; height: 100%; top: 0; left: 0;
                font-size: 0.75rem; font-weight: 900; color: white; 
                display: flex; justify-content: center; align-items: flex-start;
                text-shadow: 0 2px 4px rgba(0,0,0,0.6);
            }
            .t1 { transform: rotate(45deg); padding-top: 50px; }  /* Miếng 1 */
            .t2 { transform: rotate(135deg); padding-top: 50px; } /* Miếng 2 */
            .t3 { transform: rotate(225deg); padding-top: 50px; } /* Miếng 3 */
            .t4 { transform: rotate(315deg); padding-top: 50px; } /* Miếng 4 */

            /* NÚT QUAY Ở GIỮA */
            .wheel-center-btn {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                width: 65px; height: 65px; background: #fff; border-radius: 50%;
                z-index: 30; display: flex; flex-direction: column; align-items: center; justify-content: center;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 4px solid #f0f0f0;
            }
            .wheel-center-btn span { color: #222; font-weight: 900; font-size: 0.8rem; }
            .wheel-center-btn small { color: #888; font-size: 0.5rem; font-weight: 700; }

            /* NÚT NHẬN QUÀ MÀU CAM SẬM */
            .btn-gift { 
                background: #E64A19; color: white; border: none; padding: 16px; border-radius: 100px; 
                font-weight: 800; width: 100%; cursor: pointer; margin-top: 15px; 
                box-shadow: 0 5px 20px rgba(230, 74, 25, 0.4); font-size: 1rem;
                text-transform: uppercase; transition: 0.3s;
            }
            .btn-gift:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(230, 74, 25, 0.6); background: #FF5722; }

            /* MAPS & FOOTER */
            .map-container { border-radius: 20px; overflow: hidden; height: 220px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); margin-top: 15px; }
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
        <a href="#" style="background: var(--primary); color: white; padding: 10px 22px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 0.9rem;">Đăng nhập</a>
    </header>

    <section class="hero">
        <span class="stat-badge">⭐ Cam kết 100% chứng chỉ quốc tế</span>
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p style="color: #888;">Luyện thi MOS 1000/1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="funnel-container">
        <div class="funnel-card">
            <h3 style="color: var(--primary); font-size: 1.4rem;">🎡 Vòng Quay May Mắn</h3>
            <p style="font-size:0.8rem; color:#666; margin-bottom: 10px;">Cơ hội nhận học bổng lên đến 80%</p>
            <div class="wheel-box">
                <div class="wheel-pointer"></div>
                <div class="wheel-canvas">
                    <div class="wheel-text t1">VOUCHER 50K</div>
                    <div class="wheel-text t2">GIẢM 50%</div>
                    <div class="wheel-text t3">VOUCHER 100K</div>
                    <div class="wheel-text t4">GIẢM 80%</div>
                </div>
                <div class="wheel-center-btn">
                    <span>QUAY</span>
                    <small>LUCKY ★</small>
                </div>
            </div>
            <button class="btn-gift">NHẬN QUÀ NGAY</button>
        </div>

        <div class="funnel-card" style="text-align: left;">
            <span class="stat-badge">Hơn 1.000 học viên đạt điểm tối đa</span>
            <h3 style="margin: 10px 0;">🏆 Bảng Vàng MOS360</h3>
            <p style="color:#777; font-size:0.9rem; margin-bottom: 20px;">Tự hào đồng hành cùng sinh viên Hải Phòng chinh phục MOS với điểm số tuyệt đối.</p>
            <div style="display: flex; gap: 15px;">
                <div style="text-align: center;"><img src="https://via.placeholder.com/60" style="border-radius: 50%; border: 2px solid #FFD700;"><br><span style="color:#FFD700; font-size:0.7rem; font-weight:800;">1000/1000</span></div>
                <div style="text-align: center;"><img src="https://via.placeholder.com/60" style="border-radius: 50%; border: 2px solid #FFD700;"><br><span style="color:#FFD700; font-size:0.7rem; font-weight:800;">1000/1000</span></div>
                <div style="text-align: center;"><img src="https://via.placeholder.com/60" style="border-radius: 50%; border: 2px solid #FFD700;"><br><span style="color:#FFD700; font-size:0.7rem; font-weight:800;">980/1000</span></div>
            </div>
            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid var(--border);">
                <p style="color: var(--primary); font-weight: 800; font-size: 0.9rem;">🎁 ƯU ĐÃI NHÓM:</p>
                <p style="color: #666; font-size: 0.8rem;">Đăng ký từ 3 người - Nhận ngay Voucher giảm thêm 100k/bạn.</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="f-grid">
            <div>
                <div style="color: var(--primary); font-size: 1.4rem; font-weight: 800; margin-bottom: 15px;">MOS360.VN</div>
                <p style="color: #666; font-size: 0.85rem;">Hệ thống đào tạo tin học quốc tế thực chiến hàng đầu.</p>
                <p style="color: #fff; font-weight: 700; margin-top: 10px;">Hotline: 0912.888.360</p>
            </div>
            <div>
                <p style="color: #888; font-size: 0.9rem;"><strong>Cơ sở Hải Phòng:</strong><br>Số 57 Lê Văn Thuyết A, P. An Biên, TP. Hải Phòng</p>
                <p style="color: #888; font-size: 0.9rem; margin-top: 10px;"><strong>Email:</strong><br>mos360.vn@gmail.com</p>
            </div>
            <div class="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.468752839446!2d106.678788!3d20.843054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af015480001%3A0x7d00f72363840e53!2zNTcgTMOqIFbEg24gVGh1eeG6vHQsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZw!5e0!3m2!1svi!2s!4v1710000000000" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
        <p style="text-align: center; color: #444; font-size: 0.75rem; margin-top: 30px;">MOS360 — CÔNG NGHỆ DẪN ĐẦU KỶ NGUYÊN LUYỆN THI © 2026</p>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
