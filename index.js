export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - AI Learning Platform</title>
        <style>
            :root { --primary: #FF6600; --bg: #0d0d0d; --card: #1a1a1a; --text: #e0e0e0; --ai-color: #7000ff; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.6; }
            
            /* Header tinh tế với các nút Auth */
            header { 
                padding: 15px 30px; 
                background: rgba(17, 17, 17, 0.9); 
                backdrop-filter: blur(10px); 
                display: flex; justify-content: flex-end; align-items: center;
                border-bottom: 1px solid #333; position: sticky; top: 0; z-index: 1000;
            }
            .auth-buttons { display: flex; gap: 10px; }
            .btn { padding: 8px 20px; border-radius: 6px; font-size: 0.9rem; font-weight: 600; cursor: pointer; text-decoration: none; transition: 0.3s; }
            .btn-trial { border: 1px solid var(--primary); color: var(--primary); background: transparent; }
            .btn-login { background: var(--primary); color: white; border: none; }
            .btn-login:hover { background: #e65c00; }

            /* --- NÂNG CẤP 1: BANNER LOGO TO VÀ NỔI BẬT --- */
            .logo-banner {
                background: var(--primary); /* Vệt cam đậm tạo điểm nhấn */
                padding: 60px 20px;
                text-align: center;
                border-bottom: 5px solid #e65c00;
            }
            .logo-big {
                max-width: 400px; /* Logo to, rõ ràng */
                height: auto;
                filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2)); /* Tạo khối */
            }
            
            .hero-text h1 { font-size: 3rem; margin: 30px 0 10px; font-weight: 800; color: #fff; }
            .hero-text p { color: #aaa; margin: 0; }

            /* Search box tinh tế */
            .search-section { text-align: center; margin: -30px 0 60px; padding: 0 20px; position: relative; z-index: 10; }
            .search-box { width: 100%; max-width: 650px; padding: 18px 25px; border-radius: 50px; border: 2px solid #111; background: white; color: #333; font-size: 1.1rem; outline: none; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .search-box:focus { border-color: var(--primary); }

            .container { max-width: 1100px; margin: 0 auto; padding: 20px; }
            
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 60px; }
            .card { background: var(--card); padding: 25px; border-radius: 12px; border: 1px solid #222; transition: 0.3s; }
            .card:hover { border-color: var(--primary); transform: translateY(-5px); }
            .card h3 { color: #fff; margin: 0; font-size: 1.2rem; display: flex; align-items: center; }
            .card-icon { font-size: 1.5rem; margin-right: 10px; color: var(--primary); }
            .card-icon.ai { color: var(--ai-color); }

            /* AI Tag dành cho Học viên */
            .student-badge { background: var(--ai-color); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: bold; margin-left: 10px; }

            /* Floating AI */
            .ai-float { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: var(--ai-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(112,0,255,0.3); z-index: 100; }
            .ai-float:hover { transform: scale(1.1); }

            /* --- NÂNG CẤP 2: FOOTER ĐẦY ĐẶN & CHUYÊN NGHIỆP --- */
            footer {
                background: #111;
                padding: 60px 30px;
                border-top: 1px solid #222;
                margin-top: auto;
            }
            .footer-content {
                max-width: 1100px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 2fr 1.5fr; /* 2 cột: Thông tin và Bản đồ */
                gap: 40px;
                align-items: start;
            }
            .footer-info h4 { color: #fff; margin-top: 0; }
            .footer-info p { color: #999; font-size: 0.9rem; margin: 8px 0; }
            .footer-info strong { color: var(--primary); }
            
            .social-links { margin-top: 20px; display: flex; gap: 15px; }
            .social-links a { font-size: 1.5rem; color: #666; text-decoration: none; transition: 0.3s; }
            .social-links a:hover { color: var(--primary); }
            .social-links a.zalo:hover { color: #0088cc; } /* Màu Zalo */

            /* Bản đồ tông màu tối cho đồng bộ */
            .map-container {
                width: 100%;
                height: 250px;
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid #333;
                filter: grayscale(100%) invert(90%) contrast(100%); /* Biến bản đồ thành tông tối */
            }
            .map-container iframe { width: 100%; height: 100%; border: none; }

            .copyright { text-align: center; color: #555; font-size: 0.8rem; margin-top: 40px; padding-top: 20px; border-top: 1px solid #222; }

        </style>
    </head>
    <body>

    <header>
        <div class="auth-buttons">
            <a href="#" class="btn btn-trial">Học thử</a>
            <a href="#" class="btn btn-login">Đăng nhập</a>
        </div>
    </header>

    <div class="logo-banner">
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-big" alt="MOS360">
        <div class="hero-text">
            <h1>Chuẩn đầu ra sinh viên</h1>
            <p>Luyện thi MOS 1000 — Đồng hành thực chiến cùng AI Assistant</p>
        </div>
    </div>

    <div class="search-section">
        <input type="text" class="search-box" placeholder="Tìm tài liệu: Excel, Word, IC3, hoặc hỏi AI Assistant...">
    </div>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h3><span class="card-icon">💻</span>Trải Nghiệm Thi Thật</h3>
                <p>Phần mềm mô phỏng 100% giao diện thi chứng chỉ quốc tế.</p>
            </div>
            <div class="card">
                <h3><span class="card-icon ai">✨</span>AI Assistant 24/7 <span class="student-badge">HỌC VIÊN</span></h3>
                <p>Hỏi đáp kiến thức và lỗi thực hành ngay lập tức.</p>
            </div>
            <div class="card">
                <h3><span class="card-icon">🤝</span>Đồng Hành Trọn Đời</h3>
                <p>Hỗ trợ chuyên gia qua Zalo/Teamview đến khi bạn cầm chứng chỉ.</p>
            </div>
        </div>
    </div>

    <div class="ai-float">✨</div>

    <footer>
        <div class="footer-content">
            <div class="footer-info">
                <h4>HỆ THỐNG LUYỆN THI MOS360</h4>
                <p><strong>Cơ sở Hà Nội:</strong> Tầng 2, Tòa nhà 86A, Khu đô thị Nam Trung Yên, Cầu Giấy, Hà Nội.</p>
                <p><strong>Cơ sở Hải Phòng:</strong> 125 Lê Văn Thuyết, Phường Lê Chân, Thành phố Hải Phòng.</p>
                <p><strong>SĐT/Zalo:</strong> 0333031321</p>
                <p><strong>Email:</strong> manager@mos360.vn</p>
                
                <div class="social-links">
                    <a href="https://zalo.me/0333031321" class="zalo" title="Liên hệ Zalo">💬</a>
                    <a href="#" class="facebook" title="Ghé thăm Facebook">f</a>
                    <a href="#" class="youtube" title="Xem kênh YouTube">▶</a>
                </div>
            </div>

            <div class="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.081120286121!2d105.7891236!3d21.0294156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4b58e65f39%3A0x67396a5f78b776a0!2zODZBIC8gTmFtIFRydW5nIFnDqm4sIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1716335191834!5m2!1svi!2s" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>

        <div class="copyright">
            <p>© 2026 MOS360.VN - Bản quyền thuộc về Đội ngũ chuyên gia MOS360</p>
        </div>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
