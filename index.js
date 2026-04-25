export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Hệ thống tài liệu chuẩn đầu ra</title>
        <style>
            :root { --primary: #FF6600; --bg: #0d0d0d; --card: #1a1a1a; --text: #e0e0e0; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.6; }
            
            /* Header & Logo */
            header { padding: 40px 20px; text-align: center; background: #111; border-bottom: 2px solid var(--primary); }
            .logo-img { max-width: 250px; height: auto; display: block; margin: 0 auto; filter: drop-shadow(0 0 10px rgba(255,102,0,0.3)); }
            
            /* Search Section */
            .search-section { position: relative; max-width: 700px; margin: -30px auto 40px; padding: 0 20px; }
            .search-box { width: 100%; padding: 18px 25px; border-radius: 50px; border: 2px solid var(--primary); background: #1a1a1a; color: white; font-size: 1.1rem; outline: none; box-shadow: 0 10px 30px rgba(0,0,0,0.6); box-sizing: border-box; }
            
            .container { max-width: 1100px; margin: 0 auto; padding: 20px; }
            
            /* Section Title */
            .section-title { text-align: center; color: var(--primary); font-size: 1.8rem; margin: 40px 0 20px; text-transform: uppercase; letter-spacing: 2px; }

            /* Feature Grid (Các hạng mục cam kết) */
            .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 50px; }
            .feature-card { background: var(--card); padding: 30px; border-radius: 20px; border-top: 3px solid var(--primary); transition: 0.3s; text-align: center; }
            .feature-card:hover { transform: translateY(-10px); background: #222; }
            .feature-icon { font-size: 3rem; margin-bottom: 15px; display: block; }
            .feature-card h3 { color: var(--primary); margin: 10px 0; font-size: 1.4rem; }
            .feature-card p { color: #aaa; font-size: 0.95rem; }

            /* Status Card (Phần đợi link) */
            .status-card { background: #1a1a1a; padding: 40px; border-radius: 20px; text-align: center; border: 1px dashed var(--primary); margin-bottom: 50px; }
            .status-card h2 { color: var(--primary); margin-top: 0; }
            
            /* Footer */
            footer { background: #111; padding: 40px 20px; text-align: center; border-top: 1px solid #333; color: #666; }
            .footer-links { margin-bottom: 20px; }
            .footer-links a { color: #888; text-decoration: none; margin: 0 15px; font-size: 0.9rem; }
            .footer-links a:hover { color: var(--primary); }
        </style>
    </head>
    <body>

    <header>
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-img" alt="MOS360 Logo">
        <p style="color: #888; margin-top: 10px; font-weight: 500;">Hệ thống cung cấp tài liệu ôn thi chứng chỉ quốc tế</p>
    </header>

    <div class="search-section">
        <input type="text" class="search-box" placeholder="Nhập tên tài liệu: Excel, Word, IC3, Windows...">
    </div>

    <div class="container">
        <div class="status-card">
            <h2>📦 KHO TÀI LIỆU 2026</h2>
            <p>Hệ thống đang được nạp dữ liệu. Sáng mai, 429 đầu tài liệu ôn thi sẽ tự động hiển thị tại đây.</p>
        </div>

        <h2 class="section-title">Tại sao chọn MOS360?</h2>
        <div class="feature-grid">
            <div class="feature-card">
                <span class="feature-icon">🎯</span>
                <h3>Cam kết 1000 Điểm</h3>
                <p>Tài liệu được cập nhật mới nhất theo cấu trúc đề thi 2026. Học đúng trọng tâm, thi là đỗ.</p>
            </div>
            <div class="feature-card">
                <span class="feature-icon">🤝</span>
                <h3>Đồng hành trọn đời</h3>
                <p>Hỗ trợ giải đáp thắc mắc 24/7. Cập nhật tài liệu mới miễn phí cho học viên cũ.</p>
            </div>
            <div class="feature-card">
                <span class="feature-icon">⚡</span>
                <h3>Công nghệ 2026</h3>
                <p>Tìm kiếm thông minh, truy cập siêu tốc trên mọi thiết bị. Tài liệu sắp xếp khoa học, dễ hiểu.</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-links">
            <a href="#">Trang chủ</a>
            <a href="#">Hướng dẫn</a>
            <a href="#">Chính sách</a>
            <a href="#">Liên hệ hỗ trợ</a>
        </div>
        <p>© 2026 MOS360.VN - Bản quyền thuộc về Đội ngũ chuyên gia MOS360</p>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
