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
                --primary: #FF5722; 
                --bg: #080808; 
                --card: #121212;
                --text: #ffffff;
                --border: rgba(255, 255, 255, 0.08);
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }

            /* HEADER */
            header { padding: 15px 50px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8, 8, 8, 0.95); backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
            .brand img { width: 42px; height: auto; }
            .brand span { color: white; font-size: 1.4rem; font-weight: 800; }

            /* SIDE SOCIAL */
            .side-contact { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
            .social-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a; border: 1px solid var(--border); text-decoration: none; transition: 0.3s; }
            .social-icon img, .social-icon svg { width: 24px; height: 24px; }
            .social-icon:hover { border-color: var(--primary); transform: translateX(-5px); }

            /* HERO */
            .hero { text-align: center; padding: 80px 20px 40px; }
            .hero h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 10px; background: linear-gradient(to bottom, #fff 60%, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .stat-badge { background: rgba(255,102,0,0.1); color: var(--primary); padding: 6px 15px; border-radius: 100px; font-weight: 700; font-size: 0.8rem; display: inline-block; margin-bottom: 10px; border: 1px solid rgba(255,87,34,0.2); }

            /* PHỄU VÒNG QUAY & BẢNG VÀNG */
            .funnel-container { max-width: 1200px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; }
            .funnel-card { background: var(--card); border: 1px solid var(--border); border-radius: 32px; padding: 40px; position: relative; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

            /* VÒNG QUAY: LOGIC CHỮ CĂN GIỮA NAN */
            .wheel-box { position: relative; width: 300px; height: 300px; margin: 30px auto; }
            .wheel-pointer { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #FFD700; z-index: 20; filter: drop-shadow(0 0 5px rgba(255,215,0,0.5)); }
            
            .wheel-canvas { 
                width: 100%; height: 100%; border-radius: 50%; border: 10px solid #FFD700;
                background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg);
                position: relative; animation: rotateWheel 15s linear infinite;
            }

            .wheel-center-btn {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                width: 75px; height: 75px; background: #fff; border-radius: 50%;
                z-index: 30; display: flex; flex-direction: column; align-items: center; justify-content: center;
                box-shadow: 0 5px 15px rgba(0,0,0,0.4); border: 4px solid #f0f0f0;
            }
            .wheel-center-btn span { color: #222; font-weight: 900; font-size: 0.8rem; line-height: 1; }
            .wheel-center-btn small { color: #999; font-size: 0.5rem; font-weight: 700; margin-top: 2px; }

            .wheel-label { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
            .wheel-label b {
                position: absolute; top: 50%; left: 50%; width: 50%;
                transform-origin: left center; text-align: center; padding-left: 40px;
                font-size: 0.75rem; font-weight: 900; color: white; text-shadow: 0 1px 4px rgba(0,0,0,0.6);
            }
            .l1 b { transform: rotate(-45deg) translate(0, -50%); }
            .l2 b { transform: rotate(-135deg) translate(0, -50%); }
            .l3 b { transform: rotate(-225deg) translate(0, -50%); }
            .l4 b { transform: rotate(-315deg) translate(0, -50%); }

            @keyframes rotateWheel { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            .btn-gift { background: #E64A19; color: white; border: none; padding: 18px; border-radius: 100px; font-weight: 800; width: 100%; cursor: pointer; margin-top: 15px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 5px 20px rgba(230,74,25,0.4); transition: 0.3s; }
            .btn-gift:hover { background: #FF5722; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,87,34,0.5); }

            /* 3 MẢNG CHÍNH */
            .main-sections { max-width: 1200px; margin: 60px auto; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
            .card { background: var(--card); padding: 35px; border-radius: 28px; border: 1px solid var(--border); transition: 0.3s; }
            .card:hover { border-color: var(--primary); background: #1a1a1a; }
            .card h3 { margin-bottom: 12px; font-size: 1.3rem; color: #fff; }
            .card p { color: #888; font-size: 0.95rem; }

            /* FOOTER */
            footer { background: #050505; padding: 60px 40px; border-top: 1px solid var(--border); margin-top: 60px; }
            .f-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.3fr 1fr 1.2fr; gap: 40px; }
            .map-container { border-radius: 20px; overflow: hidden; height: 250px; border: 1px solid var(--border); filter: grayscale(1) invert(0.9); }

            @media (max-width: 900px) { .funnel-container, .main-sections, .f-grid { grid-template-columns: 1fr; } .hero h1 { font-size: 2.5rem; } }
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
        <a href="https://www.tiktok.com/@mos360.vn" class="social-icon" target="_blank">
            <svg viewBox="0 0 24 24" fill="white" style="width:22px"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.12-.91.38-1.57 1.23-1.73 2.19-.11.64-.03 1.3.18 1.91.43 1.13 1.53 1.95 2.73 2.11 1.19.16 2.45-.19 3.33-1.01.62-.57.97-1.38 1-2.22.04-4.52-.01-9.04.01-13.56z"/></svg>
        </a>
    </div>

    <section class="hero">
        <span class="stat-badge">⭐ 100% Học viên đỗ ngay lần đầu</span>
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p style="color: #777;">Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
    </section>

    <div class="funnel-container">
        <div class="funnel-card">
            <h3 style="color: var(--primary);">🎡 Vòng Quay May Mắn</h3>
            <div class="wheel-box">
                <div class="wheel-pointer"></div>
                <div class="wheel-canvas">
                    <div class="wheel-label l1"><b>VOUCHER 50K</b></div>
                    <div class="wheel-label l2"><b>GIẢM 50%</b></div>
                    <div class="wheel-label l3"><b>VOUCHER 100K</b></div>
                    <div class="wheel-label l4"><b>GIẢM 80%</b></div>
                </div>
                <div class="wheel-center-btn"><span>QUAY</span><small>LUCKY ★</small></div>
            </div>
            <button class="btn-gift">NHẬN QUÀ NGAY</button>
        </div>

        <div class="funnel-card" style="text-align: left;">
            <span class="stat-badge">Học viên tiêu biểu</span>
            <h3 style="margin: 10px 0;">🏆 Bảng Vàng MOS360</h3>
            <p style="color:#888; font-size:0.9rem; margin-bottom: 20px;">Hơn 1.000 học viên tại Hải Phòng đã lấy bằng.</p>
            <div style="display:flex; gap:15px;">
                <img src="https://via.placeholder.com/70" style="border-radius:50%; border:2px solid #FFD700;">
                <img src="https://via.placeholder.com/70" style="border-radius:50%; border:2px solid #FFD700;">
                <img src="https://via.placeholder.com/70" style="border-radius:50%; border:2px solid #FFD700;">
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border);">
                <p style="color: var(--primary); font-weight: 800;">🎁 ƯU ĐÃI NHÓM:</p>
                <p style="color: #666; font
