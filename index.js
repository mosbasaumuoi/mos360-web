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
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); margin: 0; line-height: 1.6; }

            header { padding: 12px 50px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8, 8, 8, 0.95); backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
            .brand img { width: 42px; height: auto; }
            .brand span { color: white; font-size: 1.4rem; font-weight: 800; }

            .side-contact { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 9999; }
            .social-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a; border: 1px solid var(--border); text-decoration: none; }
            .social-icon img, .social-icon svg { width: 24px; height: 24px; }

            .hero { text-align: center; padding: 60px 20px 20px; }
            .hero h1 { font-size: 3.5rem; font-weight: 800; margin: 0; background: linear-gradient(to bottom, #fff 60%, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

            /* PHỄU MARKETING */
            .funnel-container { max-width: 1200px; margin: 20px auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; }
            .funnel-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 35px; position: relative; }

            /* VÒNG QUAY NÂNG CẤP CÓ CHỮ */
            .wheel-box { position: relative; width: 280px; height: 280px; margin: 20px auto; }
            .wheel-pointer { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #FFD700; z-index: 10; }
            
            .wheel-canvas { 
                width: 100%; height: 100%; border-radius: 50%; border: 8px solid #FFD700;
                background: conic-gradient(
                    #ff6b6b 0deg 90deg, 
                    #4ecdc4 90deg 180deg, 
                    #ffbe0b 180deg 270deg, 
                    #ff006e 270deg 360deg
                );
                position: relative; animation: rotateWheel 20s linear infinite;
            }
            /* Thêm text vào các nan quạt */
            .wheel-text { position: absolute; font-size: 0.7rem; font-weight: 800; color: white; text-align: center; width: 100%; height: 100%; top: 0; left: 0; }
            .t1 { transform: rotate(45deg) translateY(-80px); position: absolute; width: 100%; }
            .t2 { transform: rotate(135deg) translateY(-80px); position: absolute; width: 100%; }
            .t3 { transform: rotate(225deg) translateY(-80px); position: absolute; width: 100%; }
            .t4 { transform: rotate(315deg) translateY(-80px); position: absolute; width: 100%; }

            @keyframes rotateWheel { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            .btn-gift { background: var(--primary); color: white; border: none; padding: 16px; border-radius: 100px; font-weight: 800; width: 100%; cursor: pointer; margin-top: 15px; box-shadow: 0 8px 20px rgba(255,102,0,0.3); }

            /* BẢNG VÀNG */
            .stat-badge { background: rgba(255,102,0,0.1); color: var(--primary); padding: 6px 15px; border-radius: 100px; font-weight: 700; font-size: 0.8rem; display: inline-block; margin-bottom: 10px; }
            .proof-grid { display: flex; gap: 20px; margin-top: 20px; }
            .student { text-align: center; }
            .student img { width: 70px; height: 70px; border-radius: 50%; border: 2px solid #FFD700; background: #222; }
            .student span { display: block; color: #FFD700; font-weight: 800; font-size: 0.75rem; margin-top: 5px; }

            /* GOOGLE MAPS FIX */
            .map-container { border-radius: 20px; overflow: hidden; height: 250px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); }

            .container { max-width: 1200px; margin: 40px auto; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
            .card { background: var(--card); padding: 30px; border-radius: 24px; border: 1px solid var(--border); }
            footer { background: #050505; padding: 60px 40px; border-top: 1px solid var(--border); }
            .f-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.3fr 1fr 1.2fr; gap: 40px; }

            @media (max-width: 900px) { .funnel-container, .container, .f-grid { grid-template-columns: 1fr; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand">
            <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" alt="MOS360">
            <span>MOS360</span>
        </a>
        <div>
            <a href="#" style="color: white; background: var(--primary); padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700;">Đăng nhập</a>
        </div>
    </header>

    <div class="side-contact">
        <a href="https://zalo.me/0912888360" class="social-icon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="https://www.facebook.com/MOS360.EDU" class="social-icon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="https://www.tiktok.com/@mos360.vn" class="social-icon" target="_blank"><img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/tiktok-icon.png?raw=true" style="filter:invert(1)"></a>
    </div>

    <section class="hero">
        <span class="stat-badge">⭐ 100% Học viên đỗ ngay lần đầu</span>
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p style="color: #777;">Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="funnel-container">
        <div class="funnel-card" style="text-align:center;">
            <h3 style="margin:0; color: var(--primary);">🎡 Vòng Quay May Mắn</h3>
            <p style="font-size:0.85rem; color:#888;">100% nhận quà khi đăng ký</p>
            <div class="wheel-box">
                <div class="wheel-pointer"></div>
                <div class="wheel-canvas">
                    <div class="wheel-text t1">VOUCHER 50K</div>
                    <div class="wheel-text t2">GIẢM 50%</div>
                    <div class="wheel-text t3">VOUCHER 100K</div>
                    <div class="wheel-text t4">GIẢM 80%</div>
                </div>
            </div>
            <button class="btn-gift">NHẬN QUÀ NGAY</button>
        </div>

        <div class="funnel-card">
            <span class="stat-badge">Hơn 1.000 học viên đã lấy bằng</span>
            <h3 style="margin: 10px 0;">🏆 Bảng Vàng MOS360</h3>
            <p style="color:#888; font-size:0.9rem;">Tự hào đồng hành cùng các bạn sinh viên Hải Phòng chinh phục chứng chỉ quốc tế.</p>
            <div class="proof-grid">
                <div class="student"><img src="https://via.placeholder.com/100" alt="Học viên"><span>1000/1000</span></div>
                <div class="student"><img src="https://via.placeholder.com/100" alt="Học viên"><span>1000/1000</span></div>
                <div class="student"><img src="https://via.placeholder.com/100" alt="Học viên"><span>980/1000</span></div>
            </div>
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid var(--border);">
                <p style="color: var(--primary); font-weight: 800; margin:0;">🎁 ƯU ĐÃI NHÓM:</p>
                <p style="color: #bbb; font-size: 0.8rem;">Đăng ký từ 3 người - Nhận thêm Voucher 100k.</p>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="card"><h3>Thi Thật 100%</h3><p style="color:#888; font-size:0.9rem;">Thực hành sát 100% đề thi quốc tế Certiport.</p></div>
        <div class="card"><h3>AI Assistant 24/7 ✨</h3><p style="color:#888; font-size:0.9rem;">Giải đáp kiến thức tin học ngay lập tức.</p></div>
        <div class="card"><h3>Đồng Hành Trọn Đời</h3><p style="color:#888; font-size:0.9rem;">Hỗ trợ định dạng luận văn, đồ án sau khi thi xong.</p></div>
    </div>

    <footer>
        <div class="f-grid">
            <div>
                <div style="color: var(--primary); font-size: 1.5rem; font-weight: 800; margin-bottom: 15px;">MOS360.VN</div>
                <p style="color: #777; font-size: 0.9rem;">Hệ thống đào tạo tin học uy tín tại Hải Phòng.</p>
                <p style="color: var(--primary); font-weight: 800;">Hotline: 0912.888.360</p>
            </div>
            <div>
                <p style="color: #ccc;"><strong>Cơ sở Hải Phòng:</strong><br>57 Lê Văn Thuyết A, An Biên</p>
                <p style="color: #ccc; margin-top: 10px;"><strong>Email:</strong><br>mos360.vn@gmail.com</p>
            </div>
            <div class="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.530491007421!2d106.677561!3d20.85066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af015555555%3A0x5555555555555555!2zNTcgTMOqIFbEg24gVGh1eeG6v3QgQSwgQW4gQmnDqm4sIEzDqiBDaMOibiwgSOG6o2kgUGjDsm5n!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
