const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  STUDENT_PASS: "hocvien360",
  // Link ảnh lấy trực tiếp từ GitHub của bạn
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.split("/")[1];
    const cookie = request.headers.get("Cookie") || "";

    // --- LOGIC ĐIỀU HƯỚNG & BẢO MẬT (Link cũ chạy bình thường) ---
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
          return Response.redirect(rawData, 301); // Link cũ dạng text thuần chạy luôn
        }
      }
    }

    // --- GIAO DIỆN FULL NỘI DUNG ĐÃ CHỐT ---
    return new Response(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\${CONFIG.TITLE}</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --cyan: #00f2ff; --border: rgba(255,255,255,0.1); }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); margin: 0; }
            header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.9); border-bottom: 1px solid var(--border); position: sticky; top:0; z-index:100; backdrop-filter: blur(10px); }
            .logo { display: flex; align-items: center; gap: 10px; font-weight: 800; color: var(--primary); text-decoration: none; font-size: 22px; }
            .hero { text-align: center; padding: 80px 20px; background: radial-gradient(circle at top, #22120d 0%, #080808 100%); }
            .search-input { width: 100%; max-width: 600px; padding: 20px 30px; border-radius: 50px; border: 1.5px solid var(--primary); background: #000; color: #fff; outline: none; }
            
            /* 3 KHỐI GIÁ TRỊ */
            .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1100px; margin: -50px auto 50px; padding: 0 20px; }
            .f-card { background: var(--card); padding: 30px; border-radius: 24px; border: 1px solid var(--border); text-align: center; }
            .f-card h3 { color: var(--primary); margin: 0 0 10px; }
            .f-card.cyan { border-color: var(--cyan); }
            .f-card.cyan h3 { color: var(--cyan); }

            /* MAIN GRID */
            .main-grid { display: grid; grid-template-columns: 2.2fr 1fr; gap: 30px; max-width: 1100px; margin: 0 auto 50px; padding: 0 20px; }
            .bng-vang { background: var(--card); padding: 35px; border-radius: 30px; border: 1px solid var(--border); }
            .promo { background: linear-gradient(135deg, #FF5722 0%, #D84315 100%); padding: 15px; border-radius: 15px; font-weight: 700; text-align: center; margin-bottom: 25px; }

            /* VÒNG QUAY SIDEBAR */
            .mini-wheel { background: #111; padding: 25px; border-radius: 25px; text-align: center; border: 1px solid #222; }
            #wheel-ui { width: 140px; height: 140px; background: #222; border-radius: 50%; margin: 15px auto; border: 5px solid #333; display:flex; align-items:center; justify-content:center; color:#444; }

            /* FOOTER */
            footer { background: #050505; padding: 50px 5%; border-top: 1px solid var(--border); margin-top: 50px; }
            .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; max-width: 1100px; margin: 0 auto; }
            .footer-col h4 { color: var(--primary); margin-bottom: 20px; }
            .footer-col p, .footer-col li { color: #888; font-size: 0.9rem; list-style: none; margin-bottom: 10px; padding: 0; }
        </style>
    </head>
    <body>
        <header>
            <a href="/" class="logo"><img src="\${CONFIG.LOGO_URL}" height="35"> <span>MOS360</span></a>
            <button onclick="document.getElementById('m-login').style.display='flex'" style="background:var(--primary); border:none; color:#fff; padding:10px 20px; border-radius:10px; cursor:pointer; font-weight:700;">HỌC VIÊN</button>
        </header>
        <section class="hero">
            <h1>Luyện Thi MOS Thực Chiến</h1>
            <input type="text" class="search-input" placeholder="Tìm kiếm tài liệu...">
        </section>
        <div class="features">
            <div class="f-card"><h3>Thi Thật 100%</h3><p>Mô phỏng chuẩn Certiport.</p></div>
            <div class="f-card cyan"><h3>AI Assistant ✨</h3><p>Hỗ trợ giải đáp 24/7.</p></div>
            <div class="f-card"><h3>Đồng Hành Trọn Đời</h3><p>Hỗ trợ đồ án, tiểu luận.</p></div>
        </div>
        <main class="main-grid">
            <div class="bng-vang">
                <div class="promo">🎁 ƯU ĐÃI NHÓM 3: GIẢM 100K/BẠN</div>
                <h2>🏆 Bảng Vàng Chứng Chỉ</h2>
                <div style="height:300px; border:1px dashed #333; border-radius:20px; display:flex; align-items:center; justify-content:center; color:#333;">Đang kết nối dữ liệu...</div>
            </div>
            <aside class="sidebar">
                <div class="mini-wheel">
                    <h4 style="color:var(--primary);">Quà Tặng May Mắn</h4>
                    <div id="wheel-ui">WHEEL</div>
                    <button style="width:100%; background:#fff; color:#000; padding:10px; border-radius:10px; border:none; font-weight:800; cursor:pointer;">QUAY THƯỞNG</button>
                </div>
            </aside>
        </main>
        <footer>
            <div class="footer-grid">
                <div class="footer-col"><h4>Về MOS360</h4><p>Đào tạo Tin học văn phòng điểm tuyệt đối.</p></div>
                <div class="footer-col"><h4>Liên Hệ</h4><p>📍 [Địa chỉ]</p><p>📞 [Số điện thoại]</p></div>
            </div>
        </footer>
        <div id="m-login" style="position:fixed; inset:0; background:rgba(0,0,0,0.9); display:none; align-items:center; justify-content:center; z-index:2000;">
            <div style="background:#1a1a1a; padding:40px; border-radius:30px; text-align:center; border:1px solid var(--primary);">
                <h3>Mật khẩu học viên</h3>
                <input type="password" id="pw" style="width:100%; padding:15px; margin:20px 0; border-radius:10px;">
                <button onclick="checkAuth()" style="width:100%; padding:15px; background:var(--primary); border:none; color:#fff; border-radius:10px;">VÀO HỌC</button>
            </div>
        </div>
        <script>
            function checkAuth() {
                if(document.getElementById('pw').value === '\${CONFIG.STUDENT_PASS}') {
                    document.cookie = "auth=student; path=/; max-age=86400";
                    location.reload();
                } else { alert('Sai mật khẩu!'); }
            }
        </script>
    </body>
    </html>`, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
