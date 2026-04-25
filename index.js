export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - Luyện thi chuẩn đầu ra tinh tế</title>
        <style>
            :root { --primary: #FF6600; --bg: #0d0d0d; --card: #1a1a1a; --text: #e0e0e0; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.6; }
            
            /* Header mỏng, chuyên nghiệp */
            header { padding: 15px 20px; background: #111; text-align: center; border-bottom: 1px solid #333; }
            .logo-img { max-height: 150px; width: auto; filter: drop-shadow(0 0 5px rgba(255,102,0,0.2)); }

            /* Banner tối giản, tập trung vào text */
            .banner { text-align: center; padding: 100px 20px 60px; }
            .banner h1 { font-size: 3.2rem; margin: 0 0 15px 0; font-weight: 800; color: #fff; }
            .banner p { font-size: 1.2rem; margin: 0; font-weight: 400; color: #aaa; letter-spacing: 0.5px; }
            
            /* Search Section: Bo tròn, viền mỏng nổi bật */
            .search-section { max-width: 600px; margin: 0 auto 50px; padding: 0 20px; }
            .search-box { width: 100%; padding: 16px 20px; border-radius: 50px; border: 1px solid #444; background: #1a1a1a; color: white; font-size: 1rem; outline: none; transition: 0.3s; box-sizing: border-box; }
            .search-box:focus { border-color: var(--primary); box-shadow: 0 0 10px rgba(255,102,0,0.3); }
            
            .container { max-width: 1100px; margin: 0 auto; padding: 20px; }
            
            /* Feature Grid: Các thẻ tối giản, điểm nhấn viền mỏng */
            .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
            .feature-card { background: var(--card); padding: 30px; border-radius: 12px; border-left: 3px solid #333; transition: 0.3s; text-align: left; }
            .feature-card:hover { border-left-color: var(--primary); transform: translateX(5px); background: #222; }
            .feature-icon { font-size: 2.5rem; margin-right: 15px; color: var(--primary); }
            .feature-header { display: flex; align-items: center; margin-bottom: 15px; }
            .feature-card h3 { color: #fff; margin: 0; font-size: 1.2rem; }
            .feature-card p { color: #aaa; font-size: 0.9rem; margin: 0; }

            /* Kho dữ liệu chờ: Tối giản, không quá nổi bật */
            .status-card { background: #1a1a1a; padding: 30px; border-radius: 12px; text-align: center; border: 1px solid #333; margin-bottom: 40px; }
            
            footer { background: #111; padding: 30px; text-align: center; color: #555; font-size: 0.8rem; border-top: 1px solid #222; }
        </style>
    </head>
    <body>

    <header>
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-img" alt="MOS360 Logo">
    </header>

    <div class="banner">
        <h1>Chuẩn đầu ra cho sinh viên</h1>
        <p>Luyện thi MOS 1000 — Đồng hành thực chiến trọn đời</p>
    </div>

    <div class="search-section">
        <input type="text" class="search-box" placeholder="Nhập tên tài liệu: Excel, Word, IC3...">
    </div>

    <div class="container">
        <div class="status-card">
            <h3 style="color: #ccc; margin-top:0;">📦 KHO DỮ LIỆU ĐANG ĐỒNG BỘ</h3>
            <p style="color: #888; font-size: 0.9rem; margin-bottom:0;">Hệ thống đang chuẩn bị 429 link tài liệu. Sau khi nạp dữ liệu, toàn bộ sẽ tự động xuất hiện.</p>
        </div>

        <div class="feature-grid">
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">💻</span>
                    <h3>Trải Nghiệm Thi Thật</h3>
                </div>
                <p>Phần mềm mô phỏng giao diện và áp lực thời gian chính xác như bài thi quốc tế. Tự tin 100% trước khi bước vào phòng thi.</p>
            </div>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">🤝</span>
                    <h3>Đồng hành trọn đời</h3>
                </div>
                <p>Hỗ trợ giải đáp thắc mắc 24/7 qua Zalo và Teamview. Cập nhật tài liệu mới miễn phí cho học viên cũ.</p>
            </div>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">⚡</span>
                    <h3>Công nghệ 2026</h3>
                </div>
                <p>Tìm kiếm thông minh, truy cập siêu tốc. Tài liệu sắp xếp khoa học, tối ưu hóa cho việc ôn thi chuẩn đầu ra.</p>
            </div>
        </div>
    </div>

    <footer>
        <p>© 2026 MOS360.VN — Luyện thi MOS Chuyên Nghiệp</p>
    </footer>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
