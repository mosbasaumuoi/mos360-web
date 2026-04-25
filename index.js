export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Luyện thi chuẩn đầu ra</title>
        <style>
            :root { --primary: #FF6600; --bg: #0d0d0d; --card: #1a1a1a; --text: #ffffff; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.6; }
            
            /* Header & Logo */
            header { padding: 20px; background: #111; text-align: center; }
            .logo-img { max-width: 200px; height: auto; }

            /* Banner Cam rực rỡ */
            .banner { background: var(--primary); color: white; text-align: center; padding: 60px 20px; border-bottom: 5px solid #e65c00; }
            .banner h1 { font-size: 2.8rem; margin: 0 0 15px 0; font-weight: 800; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
            .banner p { font-size: 1.4rem; margin: 0 0 30px 0; font-weight: 500; opacity: 0.9; }
            
            /* Search Section */
            .search-section { max-width: 700px; margin: -30px auto 40px; padding: 0 20px; }
            .search-box { width: 100%; padding: 18px 25px; border-radius: 50px; border: 3px solid #111; background: white; color: #333; font-size: 1.1rem; outline: none; box-shadow: 0 10px 25px rgba(0,0,0,0.3); box-sizing: border-box; }
            
            .container { max-width: 1100px; margin: 0 auto; padding: 20px; }
            
            /* Feature Grid (Giữ nguyên Trải nghiệm thi thật) */
            .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-top: 40px; }
            .feature-card { background: var(--card); padding: 30px; border-radius: 20px; border-top: 4px solid var(--primary); text-align: center; transition: 0.3s; }
            .feature-card:hover { transform: translateY(-10px); background: #222; }
            .feature-icon { font-size: 3rem; margin-bottom: 15px; display: block; }
            .feature-card h3 { color: var(--primary); margin: 10px 0; font-size: 1.4rem; }
            .feature-card p { color: #aaa; font-size: 0.95rem; }

            /* Kho dữ liệu chờ */
            .status-card { background: #1a1a1a; padding: 40px; border-radius: 20px; text-align: center; border: 1px dashed var(--primary); margin-bottom: 40px; }
            
            footer { background: #111; padding: 30px; text-align: center; color: #555; font-size: 0.9rem; border-top: 1px solid #222; }
        </style>
    </head>
    <body>

    <header>
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-img" alt="MOS360 Logo">
    </header>

    <div class="banner">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p>Luyện thi MOS 1000 - Đồng hành thực chiến trọn đời</p>
    </div>

    <div class="search-section">
        <input type="text" class="search-box" placeholder="Tìm tài liệu: Word, Excel, IC3...">
    </div>

    <div class="container">
        <div class="status-card">
            <h2 style="color: var(--primary);">📦 KHO DỮ LIỆU ĐANG ĐỒNG BỘ</h2>
            <p>Hệ thống đang chuẩn bị 429 link tài liệu. Sau khi nạp dữ liệu thành công, toàn bộ link sẽ tự động xuất hiện tại đây.</p>
        </div>

        <div class="feature-grid">
            <div class="feature-card">
                <span class="feature-icon">💻</span>
                <h3>Trải Nghiệm Thi Thật</h3>
                <p>Phần mềm mô phỏng giao diện và áp lực thời gian chính xác như bài thi quốc tế. Giúp bạn tự tin 100% khi bước vào phòng thi.</p>
            </div>
            <div class="feature-card">
                <span class="feature-icon">🤝</span>
                <h3>Đồng hành trọn đời</h3>
                <p>Hỗ trợ giải đáp thắc mắc 24/7 thông qua Zalo và Teamview. Cập nhật tài liệu mới miễn phí cho học viên.</p>
            </div>
            <div class="feature-card">
                <span class="feature-icon">⚡</span>
                <h3>Công nghệ 2026</h3>
                <p>Tìm kiếm thông minh, truy cập siêu tốc. Tài liệu được sắp xếp khoa học, tối ưu cho việc tự học và ôn luyện.</p>
            </div>
        </div>
    </div>

    <footer>
        <p>© 2026 MOS360.VN - Luyện thi MOS 1000 Chuyên Nghiệp</p>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
