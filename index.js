export default {
  async fetch(request, env) {
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MOS360 - AI Learning Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF6600; --bg: #0a0a0a; --card: #151515; --text: #f5f5f5; --ai: #7000ff; }
            body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; line-height: 1.6; }

            /* Navigation Bar */
            header { 
                padding: 20px 50px; display: flex; justify-content: flex-end; gap: 15px;
                position: absolute; top: 0; width: 100%; box-sizing: border-box; z-index: 100;
            }
            .btn { padding: 10px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; transition: 0.3s; font-size: 0.85rem; }
            .btn-trial { border: 1px solid rgba(255,102,0,0.5); color: var(--primary); }
            .btn-login { background: var(--primary); color: white; }
            .btn:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(255,102,0,0.2); }

            /* Hero Section: Tỷ lệ vàng và Ánh sáng mờ (Glow) */
            .hero { text-align: center; padding: 100px 20px 80px; background: radial-gradient(circle at center, #1a1000 0%, #0a0a0a 70%); }
            .logo-main { width: 350px; height: auto; filter: drop-shadow(0 0 30px rgba(255,102,0,0.15)); margin-bottom: 20px; transition: 0.5s; }
            .logo-main:hover { transform: scale(1.02); filter: drop-shadow(0 0 40px rgba(255,102,0,0.25)); }
            
            .hero h1 { font-size: 3.8rem; font-weight: 800; margin: 10px 0; letter-spacing: -2px; line-height: 1.1; }
            .hero p { font-size: 1.25rem; color: #888; font-weight: 300; max-width: 700px; margin: 20px auto; }

            /* Search tinh tế */
            .search-box { 
                width: 100%; max-width: 600px; padding: 18px 30px; border-radius: 100px; border: 1px solid #333; 
                background: #111; color: white; font-size: 1rem; outline: none; transition: 0.3s;
                margin-bottom: 80px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .search-box:focus { border-color: var(--primary); box-shadow: 0 0 20px rgba(255,102,0,0.1); }

            .container { max-width: 1100px; margin: 0 auto; padding: 0 30px; }
            
            /* Feature Cards */
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 120px; }
            .card { background: var(--card); padding: 40px; border-radius: 20px; border: 1px solid #222; transition: 0.4s; }
            .card:hover { border-color: var(--primary); transform: translateY(-8px); }
            .card h3 { font-size: 1.3rem; margin-bottom: 15px; color: #fff; }
            .card p { color: #888; font-size: 0.95rem; }

            /* Footer: Chuyên nghiệp và đầy đặn */
            footer { background: #070707; padding: 80px 0 30px; border-top: 1px solid #1a1a1a; }
            .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; margin-bottom: 60px; }
            
            .f-brand h2 { color: var(--primary); font-size: 1.8rem; margin-bottom: 25px; }
            .f-contact { display: flex; flex-direction: column; gap: 20px; }
            .contact-item label { color: #555; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; display: block; }
            .contact-item span { color: #bbb; font-size: 1rem; }

            .f-map { border-radius: 20px; overflow: hidden; border: 1px solid #222; height: 300px; filter: grayscale(1) invert(0.9) brightness(0.8); }

            .f-partners { text-align: center; padding: 40px 0; border-top: 1px solid #111; }
            .f-partners img { height: 35px; opacity: 0.4; margin: 0 20px; filter: grayscale(1); transition: 0.3s; }
            .f-partners img:hover { opacity: 0.8; filter: grayscale(0); }

            .copyright { text-align: center; color: #333; font-size: 0.8rem; margin-top: 40px; }

            @media (max-width: 850px) { .grid, .footer-grid { grid-template-columns: 1fr; } .hero h1 { font-size: 2.5rem; } }
        </style>
    </head>
    <body>

    <header>
        <a href="#" class="btn btn-trial">Học thử</a>
        <a href="#" class="btn btn-login">Đăng nhập</a>
    </header>

    <section class="hero">
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-main" alt="MOS360">
        <h1>Chuẩn đầu ra sinh viên</h1>
        <p>Luyện thi MOS 1000 — Hệ thống đào tạo thực chiến tích hợp AI thế hệ mới.</p>
        <input type="text" class="search-box" placeholder="Bạn cần hỗ trợ gì từ AI Assistant?">
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h3 style="color:var(--primary)">01. Thi Thật 100%</h3>
                <p>Phần mềm mô phỏng sát thực tế, xóa tan nỗi lo bỡ ngỡ khi vào phòng thi quốc tế.</p>
            </div>
            <div class="card">
                <h3 style="color:var(--ai)">02. AI Assistant</h3>
                <p>Trợ lý ảo thông minh giải đáp lỗi thực hành ngay lập tức, hỗ trợ học viên 24/7.</p>
            </div>
            <div class="card">
                <h3 style="color:var(--primary)">03. Cam Kết Đầu Ra</h3>
                <p>Hỗ trợ chuyên gia trực tiếp qua Teamview đến khi bạn cầm chắc chứng chỉ trên tay.</p>
            </div>
        </div>

        <footer>
            <div class="footer-grid">
                <div class="f-info">
                    <div class="f-brand"><h2>MOS360.VN</h2></div>
                    <div class="f-contact">
                        <div class="contact-item">
                            <label>Địa điểm học tập</label>
                            <span>Hà Nội: KĐT Nam Trung Yên, Cầu Giấy<br>Hải Phòng: 125 Lê Văn Thuyết, Lê Chân</span>
                        </div>
                        <div class="contact-item">
                            <label>Hỗ trợ học viên</label>
                            <span style="font-size: 1.5rem; color: #fff;">0333 031 321</span>
                        </div>
                    </div>
                </div>
                <div class="f-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.238495893158!2d105.7891!3d21.0231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzIzLjEiTiAxMDXCsDQ3JzIyLjgiRQ!5e0!3m2!1svi!2svn!4v1620000000000!5m2!1svi!2svn" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
            
            <div class="f-partners">
                <span style="display:block; color:#444; font-size:0.7rem; margin-bottom:20px; text-transform:uppercase;">Đối tác công nghệ & Chứng chỉ</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Google_logo_%282013-2015%29.svg" alt="Google">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_Certiport.png" alt="Certiport">
            </div>

            <div class="copyright">© 2026 MOS360 — NỀN TẢNG LUYỆN THI CÔNG NGHỆ CAO</div>
        </footer>
    </div>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
