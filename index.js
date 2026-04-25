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

            /* Header & Social Icons (Giữ nguyên như bản cũ) */
            header { padding: 12px 50px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8, 8, 8, 0.95); backdrop-filter: blur(15px); z-index: 1000; border-bottom: 1px solid var(--border); }
            .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
            .brand img { width: 42px; height: auto; }
            .brand span { color: white; font-size: 1.4rem; font-weight: 800; }
            .side-contact { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 9999; }
            .social-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #1a1a1a; border: 1px solid var(--border); text-decoration: none; }
            .social-icon svg, .social-icon img { width: 24px; height: 24px; fill: white; }
            .social-icon:hover { border-color: var(--primary); transform: translateX(-5px); }

            /* Hero */
            .hero { text-align: center; padding: 80px 20px 40px; }
            .hero h1 { font-size: 4rem; font-weight: 800; letter-spacing: -2px; margin: 0; background: linear-gradient(to bottom, #fff 60%, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

            /* Marketing Funnel Section */
            .funnel-container { max-width: 1200px; margin: 40px auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; }
            .funnel-card { background: linear-gradient(145deg, #1a1a1a, #0d0d0d); border: 1px solid var(--border); border-radius: 32px; padding: 40px; position: relative; overflow: hidden; }
            
            /* Wheel Styles */
            .wheel-wrap { text-align: center; }
            .wheel-visual { width: 220px; height: 220px; border: 8px solid var(--primary); border-radius: 50%; margin: 20px auto; position: relative; background: conic-gradient(from 0deg, var(--primary) 0% 25%, #222 25% 50%, var(--primary) 50% 75%, #222 75% 100%); animation: rotateWheel 10s linear infinite; }
            @keyframes rotateWheel { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
            .wheel-pointer { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 20px solid #FFD700; z-index: 10; }

            /* Stats & Proof */
            .stat-badge { background: rgba(255,102,0,0.1); color: var(--primary); padding: 8px 16px; border-radius: 100px; font-weight: 700; font-size: 0.8rem; display: inline-block; margin-bottom: 15px; }
            .proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 25px; }
            .student-mini { text-align: center; }
            .student-mini img { width: 60px; height: 60px; border-radius: 50%; border: 2px solid #FFD700; background: #333; }
            .student-mini span { display: block; font-size: 0.7rem; color: #FFD700; font-weight: 800; margin-top: 5px; }

            /* Main Cards Grid */
            .container { max-width: 1200px; margin: 0 auto; padding: 40px 40px 100px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
            .card { background: var(--card); padding: 40px 30px; border-radius: 28px; border: 1px solid var(--border); }
            .card h3 { font-size: 1.3rem; color: #fff; display: flex; align-items: center; gap: 10px; margin-top: 0; }
            .card h3::before { content: ''; width: 4px; height: 20px; background: var(--primary); border-radius: 10px; }
            .ai-icon-inline svg { width: 18px; height: 18px; fill: #FFD700; filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5)); margin-left: 5px; }

            footer { background: #050505; padding: 60px; border-top: 1px solid var(--border); }
            .f-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.3fr 1fr 1.2fr; gap: 60px; }
            .map-container { border-radius: 24px; overflow: hidden; height: 280px; border: 1px solid var(--border); filter: grayscale(1) invert(0.92); }

            @media (max-width: 1000px) { .funnel-container, .grid, .f-grid { grid-template-columns: 1fr; } .hero h1 { font-size: 2.5rem; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="brand">
            <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" alt="MOS360">
            <span>MOS360</span>
        </a>
        <div class="nav-actions">
            <a href="#" class="btn-trial btn" style="color: #bbb; text-decoration: none; margin-right: 15px;">Học thử</a>
            <a href="#" class="btn" style="background: var(--primary); color: white; text-decoration: none; padding: 10px 20px; border-radius: 8px;">Đăng nhập</a>
        </div>
    </header>

    <div class="side-contact">
        <a href="https://zalo.me/0912888360" class="social-icon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"></a>
        <a href="https://www.facebook.com/MOS360.EDU" class="social-icon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"></a>
        <a href="https://www.youtube.com/@mos360_vn" class="social-icon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"></a>
        <a href="https://www.tiktok.com/@mos360.vn" class="social-icon" target="_blank">
            <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.12-.91.38-1.57 1.23-1.73 2.19-.11.64-.03 1.3.18 1.91.43 1.13 1.53 1.95 2.73 2.11 1.19.16 2.45-.19 3.33-1.01.62-.57.97-1.38 1-2.22.04-4.52-.01-9.04.01-13.56z"/></svg>
        </a>
    </div>

    <section class="hero">
        <span class="stat-badge">⭐ 100% Học viên đỗ ngay lần đầu</span>
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p style="color: #777; font-size: 1.2rem; margin-top: 20px;">Luyện thi MOS 1000 - Đồng hành thực chiến cùng sự nghiệp</p>
    </section>

    <div class="funnel-container">
        <div class="funnel-card wheel-wrap">
            <h3 style="color: var(--primary); margin: 0;">🎡 Vòng Quay May Mắn</h3>
            <p style="color: #888; font-size: 0.9rem; margin: 10px 0;">100% Trúng quà: Giảm tới 80% học phí!</p>
            <div style="position: relative;">
                <div class="wheel-pointer"></div>
                <div class="wheel-visual"></div>
            </div>
            <button style="background: var(--primary); color: white; border: none; padding: 15px 40px; border-radius: 100px; font-weight: 800; cursor: pointer; width: 100%; margin-top: 10px;">THỬ VẬN MAY NGAY</button>
        </div>

        <div class="funnel-card">
            <span class="stat-badge">Hơn 1.000 học viên đã lấy bằng</span>
            <h3 style="color: #fff; margin: 5px 0 15px;">🏆 Bảng Vàng MOS360</h3>
            <p style="color: #888; font-size: 0.95rem;">Tự hào đồng hành cùng các bạn sinh viên Hải Phòng chinh phục chứng chỉ quốc tế với điểm số tuyệt đối.</p>
            
            <div class="proof-grid">
                <div class="student-mini">
                    <img src="https://via.placeholder.com/80" alt="Học viên">
                    <span>1000/1000</span>
                </div>
                <div class="student-mini">
                    <img src="https://via.placeholder.com/80" alt="Học viên">
                    <span>1000/1000</span>
                </div>
                <div class="student-mini">
                    <img src="https://via.placeholder.com/80" alt="Học viên">
                    <span>980/1000</span>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border);">
                <p style="color: var(--primary); font-weight: 800; margin: 0;">🎁 ƯU ĐÃI NHÓM:</p>
                <p style="color: #bbb; font-size: 0.85rem; margin: 5px 0;">Đăng ký từ 3 người trở lên - Nhận thêm Voucher giảm 100k.</p>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h3>Thi Thật 100%</h3>
                <p style="color: #888; font-size: 0.95rem;">Thực hành trên phần mềm mô phỏng sát 100% đề thi quốc tế. Tự tin tuyệt đối khi bước vào phòng thi.</p>
            </div>
            <div class="card">
                <h3>AI Assistant 24/7 <span class="ai-icon-inline"><svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.4L12 22l-2.4-7.2L2 12l7.6-2.4L12 2zM19 6l1.2 3.6L24 11l-3.8 1.2L19 16l-1.2-3.6L14 11l3.8-1.2L19 6zM6 16l.8 2.4L9 19l-2.2.8L6 22l-.8-2.4L3 19l2.2-.8L6 16z"/></svg></span></h3>
                <p style="color: #888; font-size: 0.95rem;">Hệ thống AI hỗ trợ tìm kiếm tài liệu và giải đáp mọi thắc mắc về tin học ngay lập tức.</p>
            </div>
            <div class="card">
                <h3>Đồng Hành Trọn Đời</h3>
                <p style="color: #888; font-size: 0.95rem;">Hỗ trợ kỹ năng chuyên sâu, giúp bạn làm chủ mọi luận văn và tác vụ văn phòng thực tế.</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="f-grid">
            <div>
                <div style="color: var(--primary); font-size: 1.8rem; font-weight: 800; margin-bottom: 20px;">MOS360.VN</div>
                <p style="color: #777;">Hệ thống đào tạo tin học quốc tế uy tín tại Hải Phòng.</p>
                <p style="color: var(--primary); font-weight: 800; margin-top: 20px;">Hotline: 0912.888.360</p>
            </div>
            <div>
                <p style="color: #777;"><strong>Cơ sở Hải Phòng:</strong><br>57 Lê Văn Thuyết A, P. An Biên</p>
                <p style="color: #777; margin-top: 15px;"><strong>Email:</strong><br>mos360.vn@gmail.com</p>
            </div>
            <div class="map-container">
                <iframe src="https://www.google.com/maps6" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
