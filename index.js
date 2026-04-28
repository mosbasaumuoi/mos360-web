const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  STUDENT_PASS: "hocvien360",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.split("/")[1];
    const cookie = request.headers.get("Cookie") || "";

    // 1. LOGIC RÚT GỌN LINK & BẢO MẬT
    if (key && !["", "api-search"].includes(key)) {
      const rawData = await env.Links_mos360.get(key);
      if (rawData) {
        try {
          const data = JSON.parse(rawData);
          if (data.type === "Học viên" && !cookie.includes("auth=student")) {
            return Response.redirect(url.origin + "?login=required", 302);
          }
          return Response.redirect(data.url, 301);
        } catch (e) {
          return Response.redirect(rawData, 301); // Link cũ (text thuần) chạy thẳng
        }
      }
    }

    // 2. GIAO DIỆN NGƯỜI DÙNG CHUẨN ĐÃ CHỐT
    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\${CONFIG.TITLE}</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --cyan: #00f2ff; --border: rgba(255,255,255,0.1); }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); margin: 0; line-height: 1.6; }
            header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.9); border-bottom: 1px solid var(--border); position: sticky; top:0; z-index:100; backdrop-filter: blur(10px); }
            .logo { display: flex; align-items: center; gap: 10px; font-weight: 800; color: var(--primary); text-decoration: none; font-size: 22px; }
            
            .hero { text-align: center; padding: 80px 20px; background: radial-gradient(circle at top, #22120d 0%, #080808 100%); }
            .search-input { width: 100%; max-width: 600px; padding: 20px 30px; border-radius: 50px; border: 1.5px solid var(--primary); background: #000; color: #fff; outline: none; font-size: 16px; }
            
            /* 3 KHỐI NỘI DUNG */
            .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1100px; margin: -50px auto 60px; padding: 0 20px; }
            .f-card { background: var(--card); padding: 30px; border-radius: 24px; border: 1px solid var(--border); text-align: center; transition: 0.3s; }
            .f-card h3 { color: var(--primary); margin: 0 0 10px 0; }
            .f-card.cyan { border-color: var(--cyan); }
            .f-card.cyan h3 { color: var(--cyan); }

            .main-grid { display: grid; grid-template-columns: 2.2fr 1fr; gap: 30px; max-width: 1100px; margin: 0 auto 80px; padding: 0 20px; }
            .bng-vang { background: var(--card); padding: 40px; border-radius: 30px; border: 1px solid var(--border); }
            .promo { background: linear-gradient(135deg, #FF5722 0%, #D84315 100%); padding: 15px; border-radius: 15px; font-weight: 700; text-align: center; margin-bottom: 30px; }

            /* SIDEBAR & VÒNG QUAY */
            .sidebar { display: flex; flex-direction: column; gap: 25px; }
            .mini-wheel { background: #111; padding: 30px; border-radius: 25px; text-align: center; border: 1px solid #222; }
            #wheel-ui { width: 160px; height: 160px; background: #222; border-radius: 50%; margin: 20px auto; border: 5px solid #333; display:flex; align-items:center; justify-content:center; color:#444; font-size:12px; }

            /* FOOTER */
            footer { background: #050505; padding: 60px 5% 30px; border-top: 1px solid var(--border); margin-top: 50px; }
            .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; max-width: 1100px; margin: 0 auto; }
            .footer-col h4 { color: var(--primary); margin-bottom: 25px; text-transform: uppercase; }
            .footer-col p, .footer-col li { color: #888; font-size: 0.9rem; list-style: none; margin-bottom: 12px; padding: 0; }
            .footer-bottom { text-align: center; margin-top: 50px; padding-top: 25px; border-top: 1px solid #111; color: #444; font-size: 0.8rem; }
            
            #m-login { position:fixed; inset:0; background:rgba(0,0,0,0.9); display:none; align-items:center; justify-content:center; z-index:2000; }
            .login-box { background:#1a1a1a; padding:40px; border-radius:30px; width:90%; max-width:380px; text-align:center; border:1px solid var(--primary); }
        </style>
    </head>
    <body>
        <header>
            <a href="/" class="logo">
                <img src="\${CONFIG.LOGO_URL}" height="35" onerror="this.style.display='none'">
                <span>MOS360</span>
            </a>
            <button onclick="document.getElementById('m-login').style.display='flex'" style="background:var(--primary); border:none; color:#fff; padding:12px 25px; border-radius:12px; cursor:pointer; font-weight:700;">HỌC VIÊN</button>
        </header>

        <section class="hero">
            <h1>Luyện Thi MOS Thực Chiến 1000/1000</h1>
            <p style="color:#666; margin-bottom:30px;">Hệ thống tra cứu giải đề & tài liệu thông minh</p>
            <input type="text" class="search-input" placeholder="Tìm kiếm tài liệu, giải đề...">
        </section>

        <div class="features">
            <div class="f-card"><h3>Thi Thật 100%</h3><p style="color:#888;">Mô phỏng chuẩn Certiport quốc tế.</p></div>
            <div class="f-card cyan"><h3>AI Assistant ✨</h3><p style="color:#888;">Hỗ trợ giải đáp kiến thức 24/7.</p></div>
            <div class="f-card"><h3>Đồng Hành Trọn Đời</h3><p style="color:#888;">Hỗ trợ đồ án, tiểu luận chuyên nghiệp.</p></div>
        </div>

        <main class="main-grid">
            <div class="bng-vang">
                <div class="promo">🎁 ƯU ĐÃI: ĐĂNG KÝ NHÓM 3 BẠN GIẢM 100K/BẠN</div>
                <h2 style="margin:0 0 25px 0;">🏆 Bảng Vàng Vinh Danh</h2>
                <div style="height:350px; border:1px dashed #333; border-radius:20px; display:flex; align-items:center; justify-content:center; color:#333;">Đang kết nối dữ liệu chứng chỉ học viên...</div>
            </div>
            <aside class="sidebar">
                <div class="mini-wheel">
                    <h4 style="margin:0; color:var(--primary);">Quà Tặng May Mắn</h4>
                    <div id="wheel-ui">MOS360 WHEEL</div>
                    <button style="width:100%; background:#fff; color:#000; padding:12px; border-radius:12px; border:none; font-weight:800; cursor:pointer;">QUAY THƯỞNG</button>
                </div>
            </aside>
        </main>

        <footer>
            <div class="footer-grid">
                <div class="footer-col"><h4>Về MOS360</h4><p>Trung tâm đào tạo Tin học văn phòng thực chiến, cam kết đầu ra chứng chỉ quốc tế điểm tuyệt đối.</p></div>
                <div class="footer-col"><h4>Khóa học</h4><ul><li>Luyện thi MOS Word</li><li>Luyện thi MOS Excel</li><li>Luyện thi MOS PowerPoint</li></ul></div>
                <div class="footer-col"><h4>Liên hệ</h4><p>📍 Địa chỉ: [Cập nhật địa chỉ]</p><p>📞 Hotline: [Cập nhật SĐT]</p><p>✉️ Email: contact@mos360.vn</p></div>
            </div>
            <div class="footer-bottom">&copy; 2024 MOS360.VN - Website tra cứu chính thức.</div>
        </footer>

        <div id="m-login">
            <div class="login-box">
                <h3 style="color:var(--primary)">Xác thực học viên</h3>
                <p style="color:#888; font-size:0.9rem;">Vui lòng nhập mật khẩu được cấp</p>
                <input type="password" id="pw" style
