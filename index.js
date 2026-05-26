const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    const webPaths = ["/", "/index.html", "/courses", "/library", "/login", "/generative-ai"];
    if (!webPaths.includes(path)) return fetch(request);

    if (path === "/generative-ai") {
        return new Response(this.getGenerativeAIUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }

    let studentData = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL + "&v=" + Date.now());
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";
      rows.forEach(row => {
        const link = row.split("\t")[0]?.replace(/\r/g, "").trim();
        if (link && link.startsWith("http")) {
          let finalLink = link;
          if (link.includes("drive.google.com")) {
            const imgId = link.match(/[-\w]{25,}/);
            finalLink = "https://lh3.googleusercontent.com/d/$$" + imgId;
          }
          htmlContent += '<div class="student-item"><img src="' + finalLink + '" loading="lazy"></div>';
        }
      });
      studentData = htmlContent + htmlContent; 
    } catch (e) { studentData = "<p>Đang tải dữ liệu...</p>"; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/login") content = this.getLoginUI();
    else if (path === "/library") content = this.getLibraryUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  getHomeUI(studentData) {
    let html = `
      <div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
          <div class="stat-item"><h2>1.000+</h2><p>Học viên đã nhận chứng chỉ</p></div>
          <div class="stat-item"><h2>500+</h2><p>Truy cập thường xuyên</p></div>
      </div>

      <div class="main-container">
          <div class="left-col">
              <div class="promo-box-top" style="border: 1.5px solid var(--primary); background: rgba(255,87,34,0.1); border-radius:15px; padding:15px; margin-bottom:15px;">
                  <p style="font-size:1.1rem; line-height:1.4; text-align:center;">🔥 <b style="color:var(--primary);">Siêu ưu đãi đặc biệt trong tháng 5 !!!</b><br><span style="font-size:0.9rem; opacity:0.9;">Mua 3 khóa tính tiền 2</span><br><span style="color:#FFD700; font-weight:800; font-size:1.2rem;">Tiết kiệm 400k</span></p>
              </div>
              <div class="section-card wheel-card" style="text-align: center;">
                  <h3 class="wheel-title" style="margin-bottom: 15px;">Vòng Quay May Mắn</h3>
                  <div class="wheel-box">
                      <div class="wheel-pointer"></div>
                      <div class="wheel-circle idle-spin" id="main-wheel">
                          <div class="wheel-label l1"><b>GIẢM 50K</b></div>
                          <div class="wheel-label l2"><b>GIẢM 50%</b></div>
                          <div class="wheel-label l3"><b>GIẢM 100K</b></div>
                          <div class="wheel-label l4"><b>GIẢM 80%</b></div>
                      </div>
                      <div class="wheel-center">MOS</div>
                  </div>
                  <div class="wheel-inputs">
                      <input type="text" placeholder="Họ tên của bạn" id="w-name">
                      <input type="text" placeholder="Số điện thoại của bạn" id="w-phone">
                  </div>
                  <button class="btn-action" onclick="spinWheel()">QUAY NGAY</button>
              </div>
          </div>

          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 class="bv-title">🏆 Bảng Vàng Chứng Chỉ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">` + studentData + `</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card"><h4>Thi Thật 100%</h4><p class="small-desc">Hệ thống mô phỏng sát đề quốc tế.</p></div>
          <div class="service-card ai-chat-card" style="display: flex; flex-direction: column; justify-content: center;">
              <h4 style="color:var(--cyan); margin-bottom: 10px;">AI Assistant 24/7 ✨</h4>
              <div class="chat-input-box">
                  <input type="text" placeholder="Chào bạn, hỏi MOS đi..."><button style="color: white; font-family: 'Plus Jakarta Sans', sans-serif; font-weight:800;">GỬI</button>
              </div>
          </div>
          <div class="service-card"><h4>Đồng hành trọn đời</h4><p class="small-desc">Hỗ trợ đề án, luận văn, tin học công sở.</p></div>
      </div>

      <div class="side-socials">
        <a href="https://zalo.me/0912888360" target="_blank" class="s-btn"><img src="https://img.icons8.com/color/48/zalo.png"></a>
        <a href="https://facebook.com/mos360.vn" target="_blank" class="s-btn"><img src="https://img.icons8.com/color/48/facebook-new.png"></a>
        <a href="https://m.me/mos360.vn" target="_blank" class="s-btn"><img src="https://img.icons8.com/color/48/facebook-messenger--v1.png"></a>
        <a href="https://youtube.com/@mos360_vn" target="_blank" class="s-btn"><img src="https://img.icons8.com/color/48/youtube-play.png"></a>
        <a href="https://tiktok.com/@mos360.vn" target="_blank" class="s-btn" style="background:#000;"><img src="https://img.icons8.com/ios-filled/50/ffffff/tiktok--v1.png"></a>
      </div>`;

    let script = `<script>
        function spinWheel() {
            var name = document.getElementById('w-name').value;
            var phone = document.getElementById('w-phone').value;
            if(!name || !phone) { alert('Vui lòng nhập đủ thông tin!'); return; }
            var wheel = document.getElementById('main-wheel');
            wheel.classList.remove('idle-spin');
            var deg = 3600 + Math.random() * 360;
            wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0, 0.1, 1)';
            wheel.style.transform = 'rotate(' + deg + 'deg)';
            setTimeout(function() { alert('Chúc mừng ' + name + '! MOS360 sẽ liên hệ ưu đãi qua SĐT ' + phone); }, 4500);
        }
    </script>`;
    return html + script;
  },

  getCoursesUI() {
    let html = `<div class="section-card" style="max-width:900px; margin:40px auto;">
        <h1 style="text-align:center; color:var(--primary); margin-bottom:10px;">ĐĂNG KÝ KHÓA HỌC</h1>
        <div style="text-align:center; margin-bottom:30px; padding:10px; border:1px solid rgba(255,87,34,0.3); border-radius:10px;">
            <p style="color:#FFD700; font-size:1.1rem;">🔥 <b>Siêu ưu đãi đặc biệt trong tháng 5 !!!</b></p>
            <p style="color:#888; font-size:0.9rem;">Chương trình: <b>Mua 3 khóa tính tiền 2</b></p>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
            <div class="course-group" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:20px;">
                <h3>MOS 2019</h3>
                <div style="margin-top:15px;">
                  <label><input type="checkbox" class="course-cb" data-price="400000"> Word 2019 (400k)</label><br><br>
                  <label><input type="checkbox" class="course-cb" data-price="400000"> Excel 2019 (400k)</label><br><br>
                  <label><input type="checkbox" class="course-cb" data-price="400000"> PowerPoint 2019 (400k)</label>
                </div>
            </div>
            <div class="course-group" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:20px;">
                <h3>MOS 365</h3>
                <div style="margin-top:15px;">
                  <label><input type="checkbox" class="course-cb" data-price="400000"> Word 365 (400k)</label><br><br>
                  <label><input type="checkbox" class="course-cb" data-price="400000"> Excel 365 (400k)</label><br><br>
                  <label><input type="checkbox" class="course-cb" data-price="400000"> PowerPoint 365 (400k)</label>
                </div>
            </div>
        </div>
        <div style="margin-top:30px; text-align:center; padding:25px; background:#000; border-radius:15px; border:1px solid var(--primary);">
            <h2 id="total-price" style="color:#FFD700">Tổng thanh toán: 0đ</h2>
            <p id="discount-note" style="color:var(--cyan); font-size:0.9rem; margin-top:5px;"></p>
            <button class="btn-action" style="margin-top:15px; max-width:300px;">THANH TOÁN NGAY</button>
        </div>`;
        
    let script = `<script>
            document.querySelectorAll('.course-cb').forEach(function(cb) {
                cb.addEventListener('change', function() {
                    var prices = [];
                    document.querySelectorAll('.course-cb:checked').forEach(function(c) { prices.push(parseInt(c.dataset.price)); });
                    var total = 0;
                    var note = "";
                    if (prices.length >= 3) {
                        prices.sort(function(a, b) { return b - a; });
                        total = prices[0] + prices[1]; 
                        note = "✨ Đã áp dụng ưu đãi Mua 3 tính tiền 2 (Tiết kiệm " + prices[2].toLocaleString() + "đ)";
                    } else {
                        total = prices.reduce(function(a, b) { return a + b; }, 0);
                    }
                    document.getElementById('total-price').innerText = 'Tổng thanh toán: ' + total.toLocaleString('vi-VN') + 'đ';
                    document.getElementById('discount-note').innerText = note;
                });
            });
    </script></div>`;
    return html + script;
  },

  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>` + CONFIG.TITLE + `</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

        header { padding: 10px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.9); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.2rem; }
        .brand img { height: 35px; margin-right: 10px; }
        nav a { color: #888; text-decoration: none; font-weight: 700; margin-left: 20px; font-size: 0.8rem; }

        .stats-bar { display: flex; justify-content: center; gap: 30px; padding: 25px; text-align: center; }
        .stat-item h2 { color: var(--primary); font-size: 2rem; }

        .main-container { max-width: 1400px; margin: 0 auto; padding: 0 5%; display: grid; grid-template-columns: 320px 1fr; gap: 25px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 28px; padding: 25px; }

        .wheel-box { position: relative; width: 180px; height: 180px; margin: 0 auto 20px; }
        .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 4px solid #FFD700; position: relative; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); }
        .idle-spin { animation: slowRotate 15s linear infinite; }
        @keyframes slowRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .wheel-center { position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:40px; height:40px; background:#fff; border-radius:50%; color:#000; font-weight:900; display:flex; align-items:center; justify-content:center; z-index:20; font-size:0.6rem; }
        .wheel-label { position: absolute; width:100%; height:100%; display:flex; justify-content:center; align-items:flex-start; padding-top:20px; font-size:0.65rem; color:#fff; }
        .l1{transform:rotate(45deg)} .l2{transform:rotate(135deg)} .l3{transform:rotate(225deg)} .l4{transform:rotate(315deg)}
        .wheel-pointer { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); border-top: 15px solid #FFD700; border-left: 8px solid transparent; border-right: 8px solid transparent; z-index: 10; }

        #bang-vang-container { height: 450px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.4); border-radius: 20px; }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 100s linear infinite; }
        .student-item { flex: 0 0 auto; width: 320px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .side-socials { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
        .s-btn { width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .s-btn img { width: 25px; height: 25px; }

        .services-grid { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .service-card { background: var(--card); padding: 25px; border-radius: 20px; border-left: 4px solid var(--primary); }
        .chat-input-box { display: flex; background: #000; border-radius: 8px; padding: 4px; border: 1px solid #222; }
        .chat-input-box input { flex:1; background:transparent; border:none; color:#fff; padding:10px; outline:none; font-size:0.85rem; }
        .chat-input-box button { background:var(--cyan); border:none; padding:0 15px; border-radius:6px; font-weight:800; cursor:pointer; }

        footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 40px; }
        .btn-action { background: var(--primary); color: white; border: none; padding: 12px; border-radius: 30px; font-weight: 800; cursor: pointer; width: 100%; }
        .wheel-inputs input { width: 100%; padding: 10px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: #fff; border-radius: 8px; }

        @media (max-width: 800px) { .main-container, .services-grid, .footer-grid { grid-template-columns: 1fr; } }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="` + CONFIG.LOGO_URL + `"> MOS360</a>
        <nav><a href="/">TRANG CHỦ</a><a href="/courses">KHÓA HỌC</a><a href="/library">KHO MOS</a><a href="/login" style="color:var(--primary)">ĐĂNG NHẬP</a></nav>
    </header>
    <nav style="background: rgba(255,255,255,0.03); padding: 5px 5%; font-size: 0.8rem; border-bottom: 1px solid var(--border); display:flex; gap:15px;">
        <span style="color:#666;">🎯 Thử thách mới:</span>
        <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold; margin:0;">[HOT] Trắc nghiệm Generative AI ✨</a>
    </nav>
    <main>` + content + `</main>
    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p><p>📞 Hotline: 0912.888.360</p></div>
            <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
            <div style="height:180px; border-radius:15px; overflow:hidden;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.665792945241!2d106.6791653!3d20.8431818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af99d2557e9%3A0x679c2980c6c7478d!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZw!5e0!3m2!1svi!2s!4v1714368000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    </body></html>`;
  },

  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto; text-align:center;"><h2>Đăng Nhập</h2><input type="password" placeholder="Mật khẩu" style="width:100%; padding:15px; margin:20px 0; background:#000; border:1px solid #333; color:#fff; border-radius:10px;"><button class="btn-action">VÀO HỆ THỐNG</button></div>`; },
  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:50px auto; text-align:center;"><h2>📚 Kho Tài Liệu MOS</h2><p>Nội dung đang được cập nhật...</p></div>`; },
  
  getGenerativeAIUI() {
    let htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> MOS360 - Trắc nghiệm Generative AI</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #f5f7fa; color: #333; line-height: 1.6; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); overflow: hidden; }
        header { background: linear-gradient(135deg, #e63946, #a4161a); color: white; padding: 25px 30px; position: relative; overflow: hidden; }
        .header-content { position: relative; z-index: 2; }
        header h1 { font-size: 24px; margin-bottom: 8px; font-weight: 700; letter-spacing: 0.5px; }
        header p { font-size: 14px; opacity: 0.9; }
        .header-bg { position: absolute; top: -50%; right: -10%; width: 400px; height: 400px; background: rgba(255, 255, 255, 0.05); border-radius: 50%; z-index: 1; }
        .quiz-layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; padding: 25px; }
        @media (max-width: 992px) { .quiz-layout { grid-template-columns: 1fr; } }
        .main-quiz { background-color: #fff; border: 1px solid #e1e8ed; border-radius: 8px; padding: 25px; display: flex; flex-direction: column; }
        .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #f0f2f5; }
        .question-number { font-size: 14px; font-weight: 600; color: #e63946; background-color: #fceade; padding: 6px 12px; border-radius: 20px; }
        .score-display { font-size: 14px; font-weight: 600; color: #2b2d42; }
        .question-box { margin-bottom: 25px; }
        .question-text { font-size: 18px; font-weight: 600; color: #2b2d42; line-height: 1.5; margin-bottom: 20px; }
        .options-container { display: flex; flex-direction: column; gap: 12px; }
        .option { display: flex; align-items: center; padding: 14px 20px; background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; }
        .option:hover { background-color: #eef1f6; border-color: #ced4da; }
        .option.selected { background-color: #e8f0fe; border-color: #3b82f6; }
        .option.correct { background-color: #d1e7dd; border-color: #0f5132; }
        .option.incorrect { background-color: #f8d7da; border-color: #842029; }
        .option-label { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background-color: #fff; border: 1px solid #ced4da; border-radius: 50%; margin-right: 15px; font-weight: 600; font-size: 14px; flex-shrink: 0; }
        .option.selected .option-label { background-color: #3b82f6; color: white; border-color: #3b82f6; }
        .option.correct .option-label { background-color: #198754; color: white; border-color: #198754; }
        .option.incorrect .option-label { background-color: #dc3545; color: white; border-color: #dc3545; }
        .option-text { font-size: 15px; color: #495057; }
        .option.selected .option-text { color: #1e3a8a; font-weight: 500; }
        .answer-key { margin-top: 25px; padding: 20px; background-color: #e8f5e9; border-left: 5px solid #2e7d32; border-radius: 4px; display: none; }
        .answer-key.show { display: block; }
        .answer-key h4 { color: #2e7d32; margin-bottom: 8px; font-size: 16px; display: flex; align-items: center; gap: 8px; }
        .answer-key p { font-size: 14px; color: #1b5e20; }
        .action-buttons { display: flex; justify-content: space-between; margin-top: auto; padding-top: 25px; border-top: 1px solid #f0f2f5; gap: 15px; }
        .btn { padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.2s ease; border: none; display: flex; align-items: center; gap: 8px; }
        .btn-prev { background-color: #fff; color: #495057; border: 1px solid #ced4da; }
        .btn-prev:hover:not(:disabled) { background-color: #e9ecef; }
        .btn-next { background-color: #e63946; color: white; margin-left: auto; }
        .btn-next:hover:not(:disabled) { background-color: #c92a3a; }
        .btn-check { background-color: #2b2d42; color: white; }
        .btn-check:hover:not(:disabled) { background-color: #1d1e2c; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .sidebar { background-color: #fff; border: 1px solid #e1e8ed; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; max-height: 600px; }
        .sidebar-title { font-size: 16px; font-weight: 600; color: #2b2d42; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f0f2f5; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; overflow-y: auto; padding-right: 5px; flex-grow: 1; margin-bottom: 15px; }
        .nav-item { display: flex; align-items: center; justify-content: center; height: 40px; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; font-size: 13px; font-weight: 600; color: #495057; cursor: pointer; transition: all 0.15s ease; }
        .nav-item:hover { background-color: #e9ecef; border-color: #dee2e6; }
        .nav-item.current { border: 2px solid #e63946; color: #e63946; background-color: #fff; }
        .nav-item.answered { background-color: #e8f0fe; border-color: #bfdbfe; color: #2563eb; }
        .nav-item.correct { background-color: #d1e7dd; border-color: #a3cfbb; color: #0f5132; }
        .nav-item.incorrect { background-color: #f8d7da; border-color: #f5c2c7; color: #842029; }
        .stats-summary { padding: 15px; background-color: #f8f9fa; border-radius: 6px; border: 1px solid #e9ecef; }
        .stat-line { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #495057; }
        .stat-line:last-child { margin-bottom: 0; padding-top: 6px; border-top: 1px solid #dee2e6; font-weight: 600; color: #2b2d42; }
        .progress-container { margin-bottom: 20px; background-color: #e9ecef; height: 8px; border-radius: 4px; overflow: hidden; }
        .progress-bar { background: linear-gradient(90deg, #e63946, #ff7096); height: 100%; width: 0%; transition: width 0.3s ease; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="header-content">
                <h1>MOS360 - Hệ Thống Ôn Luyện Trắc Nghiệm</h1>
                <p>Chuyên đề: Kiến thức về Generative AI (Trí tuệ nhân tạo tạo sinh) • Tổng số: 30 câu hỏi mẫu</p>
            </div>
            <div class="header-bg"></div>
        </header>

        <div class="quiz-layout">
            <div class="main-quiz">
                <div class="progress-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
                <div class="quiz-header">
                    <span class="question-number">Câu hỏi <span id="q-num">1</span>/30</span>
                    <span class="score-display">Đúng: <span id="score-correct" style="color: #198754;">0</span> | Sai: <span id="score-incorrect" style="color: #dc3545;">0</span></span>
                </div>

                <div class="question-box">
                    <div class="question-text" id="question-text">Đang tải câu hỏi...</div>
                    <div class="options-container" id="options-container"></div>
                </div>

                <div class="answer-key" id="answer-key">
                    <h4><span id="result-icon">✨</span> <span id="result-text">Đáp án chính xác</span></h4>
                    <p id="explanation-text">Giải thích nội dung câu hỏi...</p>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-prev" id="btn-prev" onclick="changeQuestion(-1)" disabled>
                        ← Câu trước
                    </button>
                    <button class="btn btn-check" id="btn-check" onclick="checkAnswer()">
                        Kiểm tra đáp án
                    </button>
                    <button class="btn btn-next" id="btn-next" onclick="changeQuestion(1)">
                        Câu tiếp theo →
                    </button>
                </div>
            </div>

            <div class="sidebar">
                <div class="sidebar-title">Danh sách câu hỏi</div>
                <div class="nav-grid" id="nav-grid"></div>
                
                <div class="stats-summary">
                    <div class="stat-line"><span>Đã làm:</span><span id="stat-answered">0/30</span></div>
                    <div class="stat-line"><span>Tỷ lệ chính xác:</span><span id="stat-accuracy">0%</span></div>
                </div>
            </div>
        </div>
    </div>`;

    let scriptContent = `<script>
        var questions = [
            { id: 1, text: "Khái niệm nào sau đây mô tả đúng nhất về Generative AI?", options: ["Một loại AI chỉ có khả năng phân tích dữ liệu cũ mà không thể tạo ra nội dung mới.", "Một nhánh của AI tập trung vào việc tạo ra nội dung mới (văn bản, hình ảnh, âm thanh, mã nguồn...) dựa trên dữ liệu đã học.", "Hệ thống máy tính chuyên dụng dùng để tăng tốc độ xử lý phần cứng.", "Thuật toán chỉ áp dụng trong việc điều khiển robot tự động."], correct: 1, explanation: "Generative AI (AI tạo sinh) là một nhánh của trí tuệ nhân tạo tập trung vào các mô hình có khả năng tạo ra nội dung mới dựa trên các mẫu dữ liệu thu thập được từ quá trình huấn luyện." },
            { id: 2, text: "Mô hình ngôn ngữ lớn (LLM) như GPT-4 hoạt động chủ yếu dựa trên kiến trúc mạng thần kinh nào?", options: ["RNN (Recurrent Neural Network)", "CNN (Convolutional Neural Network)", "Transformer", "GAN (Generative Adversarial Network)"], correct: 2, explanation: "Hầu hết các LLM hiện đại đều dựa trên kiến trúc Transformer, được giới thiệu vào năm 2017 với cơ chế Attention giúp xử lý ngữ cảnh rất hiệu quả." },
            { id: 3, text: "Thuật ngữ \\"Prompt\\" trong ngữ cảnh sử dụng Generative AI có nghĩa là gì?", options: ["Một đoạn mã lập trình hệ thống.", "Câu lệnh, hướng dẫn hoặc yêu cầu bằng văn bản/hình ảnh mà người dùng cung cấp để AI tạo ra nội dung mong muốn.", "Thời gian phản hồi của hệ thống AI.", "Quá trình kiểm thử lỗi của mô hình."], correct: 1, explanation: "Prompt (Lời nhắc) là đầu vào (văn bản, câu hỏi, hình ảnh) mà người dùng nhập vào để hướng dẫn mô hình AI tạo ra kết quả đầu ra tương ứng." },
            { id: 4, text: "Hiện tượng \\"Hallucination\\" (Ảo tưởng/Ảo giác) ở các mô hình Generative AI xảy ra khi nào?", options: ["Mô hình ngừng hoạt động do quá tải máy chủ.", "Mô hình tạo ra thông tin trông có vẻ thuyết phục và hợp lý nhưng thực chất là sai lệch hoặc không có thật.", "Mô hình dịch ngôn ngữ này sang ngôn ngữ khác.", "Mô hình phát hiện phần mềm độc hại trong hệ thống."], correct: 1, explanation: "Hallucination là hiện tượng AI tạo sinh tạo ra các thông tin hoàn toàn sai sự thật nhưng được trình bày một cách rất tự tin và logic." },
            { id: 5, text: "Kỹ thuật \\"Few-shot Prompting\\" được hiểu là gì?", options: ["Cung cấp cho AI một yêu cầu ngắn gọn không kèm ví dụ.", "Cung cấp cho AI một vài ví dụ minh họa cụ thể về định dạng hoặc nội dung mong muốn trước khi đưa ra yêu cầu chính.", "Chạy mô hình AI nhiều lần liên tiếp để chọn kết quả tốt nhất.", "Sử dụng hình ảnh thay cho văn bản để ra lệnh cho AI."], correct: 1, explanation: "Few-shot Prompting là kỹ thuật cung cấp một vài ví dụ (shots) trong prompt để giúp mô hình hiểu rõ ngữ cảnh và định dạng đầu ra mong muốn." },
            { id: 6, text: "Trong các công cụ sau, công cụ nào chuyên về tạo sinh hình ảnh từ văn bản (Text-to-Image)?", options: ["ChatGPT", "Midjourney", "GitHub Copilot", "ElevenLabs"], correct: 1, explanation: "Midjourney là công cụ nổi tiếng chuyên chuyển đổi văn bản thành hình ảnh nghệ thuật chất lượng cao." },
            { id: 7, text: "Cơ chế \\"Self-Attention\\" trong kiến trúc Transformer có tác dụng gì?", options: ["Giúp mô hình tự động xóa các dữ liệu trùng lặp.", "Giúp mô hình đánh giá mức độ liên quan và mối quan hệ giữa tất cả các từ trong một câu, bất kể khoảng cách giữa chúng.", "Bảo mật dữ liệu người dùng không bị rò rỉ ra ngoài.", "Tăng độ phân giải của hình ảnh đầu ra."], correct: 1, explanation: "Cơ chế Self-Attention cho phép mô hình tập trung vào các phần khác nhau của chuỗi đầu vào để hiểu rõ ngữ cảnh của từ ngữ." },
            { id: 8, text: "Mô hình GAN (Generative Adversarial Network) bao gồm hai thành phần đối nghịch nào?", options: ["Encoder và Decoder", "Generator (Mô hình tạo sinh) và Discriminator (Mô hình phân biệt)", "Transformer và Thuật toán tìm kiếm", "Dữ liệu đầu vào và Dữ liệu đầu ra"], correct: 1, explanation: "GAN gồm Generator cố gắng tạo dữ liệu giả giống thật và Discriminator cố gắng phân biệt dữ liệu thật/giả. Sự đối nghịch này giúp cả hai cùng tiến bộ." },
            { id: 9, text: "Mục đích chính của quá trình \\"Fine-tuning\\" (Tinh chỉnh) một mô hình AI là gì?", options: ["Xóa bỏ hoàn toàn mô hình cũ để làm lại từ đầu.", "Tiếp tục huấn luyện một mô hình đã được đào tạo trước (Pre-trained) trên một tập dữ liệu nhỏ, chuyên biệt để thực hiện tốt một tác vụ cụ thể.", "Giảm lượng điện năng tiêu thụ của máy chủ AI.", "Tăng tốc độ kết nối Internet của người dùng."], correct: 1, explanation: "Fine-tuning giúp tối ưu hóa một mô hình đa năng có sẵn thành một mô hình chuyên biệt cho một ngành nghề hoặc tác vụ cụ thể bằng tập dữ liệu ngách." },
            { id: 10, text: "Trong kỷ nguyên Generative AI, rủi ro về \\"Deepfake\\" liên quan đến vấn đề gì?", options: ["Dữ liệu bị xóa sạch do virus máy tính.", "Việc sử dụng AI để tạo ra hình ảnh, video hoặc âm thanh giả mạo người thật một cách tinh vi nhằm mục đích lừa đảo hoặc bôi nhọ.", "Hệ thống AI từ chối trả lời câu hỏi của người dùng.", "Sự sụt giảm giá trị cổ phiếu của các công ty công nghệ."], correct: 1, explanation: "Deepfake là công nghệ sử dụng AI để thay thế khuôn mặt, giọng nói của một người trong video/hình ảnh bằng một người khác vô cùng chân thực, tiềm ẩn nguy cơ lừa đảo cao." },
            { id: 11, text: "Công cụ nào sau đây của Microsoft được tích hợp Generative AI để hỗ trợ lập trình viên viết mã nguồn?", options: ["Microsoft Word", "GitHub Copilot", "Windows Defender", "OneDrive"], correct: 1, explanation: "GitHub Copilot (thuộc Microsoft) hỗ trợ gợi ý và viết mã nguồn tự động dựa trên mô hình Codex của OpenAI." },
            { id: 12, text: "Thuật ngữ \\"Multimodal AI\\" (AI đa phương thức) chỉ các mô hình có khả năng gì?", options: ["Chỉ xử lý được một loại dữ liệu văn bản duy nhất nhưng với tốc độ cực nhanh.", "Có thể hiểu và xử lý đồng thời nhiều loại dữ liệu đầu vào/đầu ra khác nhau như văn bản, hình ảnh, âm thanh, video...", "Chạy được trên nhiều hệ điều hành cùng một lúc.", "Hệ thống AI có thể kết nối với nhiều người dùng cùng lúc."], correct: 1, explanation: "Multimodal AI là mô hình có khả năng xử lý đồng thời và kết hợp nhiều dạng thông tin như nghe, nhìn, đọc, hiểu (ví dụ GPT-4o, Gemini)." },
            { id: 13, text: "Khi sử dụng ChatGPT, thông số \\"Temperature\\" (nếu có thể điều chỉnh qua API) kiểm soát yếu tố nào của kết quả đầu ra?", options: ["Tốc độ tạo văn bản của mô hình.", "Độ dài tối đa của văn bản được tạo ra.", "Tính sáng tạo và mức độ ngẫu nhiên của câu trả lời.", "Độ bảo mật và quyền riêng tư của dữ liệu."], correct: 2, explanation: "Temperature kiểm soát độ ngẫu nhiên. Nhiệt độ thấp kết quả sẽ an toàn, logic và lặp lại; nhiệt độ cao kết quả sẽ sáng tạo, đa dạng nhưng dễ bị ảo tưởng hơn." },
            { id: 14, text: "Kỹ thuật \\"RAG\\" (Retrieval-Augmented Generation) được sử dụng nhằm mục đích gì?", options: ["Tăng tốc độ xử lý đồ họa của GPU.", "Kết hợp mô hình AI với việc truy xuất dữ liệu từ một kho kiến thức bên ngoài đáng tin cậy để cung cấp câu trả lời chính xác và cập nhật hơn.", "Tự động dịch văn bản sang 100 ngôn ngữ khác nhau.", "Nén dung lượng file HTML để tải lên website nhanh hơn."], correct: 1, explanation: "RAG giúp hạn chế hiện tượng ảo tưởng của AI bằng cách bắt AI tra cứu thông tin từ nguồn tài liệu chuẩn được cung cấp trước khi tổng hợp câu trả lời." },
            { id: 15, text: "Đâu là một thách thức lớn về mặt pháp lý và đạo đức đối với dữ liệu huấn luyện (Training Data) của Generative AI hiện nay?", options: ["Dữ liệu quá ít không đủ để máy tính lưu trữ.", "Vấn đề vi phạm bản quyền và quyền sở hữu trí tuệ khi thu thập tác phẩm của nghệ sĩ, nhà văn mà chưa được phép.", "Dữ liệu bị lỗi phông chữ khi nạp vào hệ thống.", "Tốc độ truyền tải dữ liệu giữa các quốc gia quá chậm."], correct: 1, explanation: "Nhiều công ty AI đang đối mặt với các vụ kiện tụng do sử dụng dữ liệu có bản quyền trên internet để huấn luyện mô hình mà không xin phép hay trả phí cho tác giả." },
            { id: 16, text: "Sự khác biệt cốt lõi giữa AI truyền thống (Discriminative AI) và AI tạo sinh (Generative AI) là gì?", options: ["AI truyền thống chạy bằng điện, AI tạo sinh chạy bằng pin.", "AI truyền thống phân loại hoặc dự đoán dựa trên dữ liệu có sẵn; AI tạo sinh tạo ra dữ liệu hoàn toàn mới có cấu trúc tương tự dữ liệu huấn luyện.", "AI truyền thống chỉ dùng cho điện thoại, AI tạo sinh chỉ dùng cho máy tính.", "Không có sự khác biệt nào về mặt chức năng."], correct: 1, explanation: "AI truyền thống nhận diện, phân loại (ví dụ: đây là ảnh chó hay mèo), còn AI tạo sinh tạo ra nội dung mới hoàn toàn (ví dụ: vẽ một con mèo đang bay)." },
            { id: 17, text: "Phương pháp học \\"RLHF\\" (Reinforcement Learning from Human Feedback) giúp ích gì cho các mô hình như ChatGPT?", options: ["Giúp mô hình tự động tìm kiếm mã giảm giá trên mạng.", "Căn chỉnh câu trả lời của AI sao cho an toàn, hữu ích, trung thực và phù hợp với chuẩn mực đạo đức của con người thông qua sự đánh giá của chuyên gia.", "Tăng dung lượng lưu trữ của bộ nhớ RAM.", "Giúp mô hình kết nối trực tiếp với các thiết bị gia dụng thông minh."], correct: 1, explanation: "RLHF (Học tăng cường từ phản hồi của con người) giúp tối ưu câu trả lời của AI thân thiện, chính xác và an toàn hơn dựa trên điểm số đánh giá từ con người." },
            { id: 18, text: "Đâu là định nghĩa đúng cho kỹ thuật \\"Zero-shot Prompting\\"?", options: ["Yêu cầu AI thực hiện một tác vụ mà không đưa ra bất kỳ ví dụ minh họa nào trước đó.", "Xóa bỏ hoàn toàn lịch sử chat để bắt đầu phiên làm việc mới.", "Cung cấp vô số ví dụ cho AI đến khi hệ thống bị quá tải.", "Sử dụng các ký tự đặc biệt để hack hệ thống AI."], correct: 0, explanation: "Zero-shot Prompting là việc đưa ra yêu cầu trực tiếp cho AI thực hiện dựa trên kiến thức nền tảng của nó mà không mồi thêm ví dụ cụ thể nào." },
            { id: 19, text: "Token trong xử lý ngôn ngữ tự nhiên (NLP) của Generative AI thường được hiểu là gì?", options: ["Một đơn vị tiền tệ dùng để mua tài khoản VIP.", "Mã bảo mật dùng để đăng nhập vào ứng dụng.", "Các đoạn nhỏ của từ ngữ (có thể là một từ, một phần của từ hoặc một ký tự) mà mô hình sử dụng để đọc và xử lý văn bản.", "Thiết bị phần cứng lưu trữ khóa mã hóa."], correct: 2, explanation: "Token là đơn vị cơ bản để mô hình AI xử lý ngôn ngữ. 100 từ tiếng Anh thường tương đương khoảng 130 tokens; tiếng Việt có dấu sẽ tốn nhiều token hơn." },
            { id: 20, text: "Mô hình nào sau đây do Google phát triển, nổi tiếng với khả năng xử lý đa phương thức và có cửa sổ ngữ cảnh (Context Window) lên tới hàng triệu token?", options: ["GPT-4", "Claude 3", "Gemini", "Llama 3"], correct: 2, explanation: "Gemini là thế hệ mô hình AI đa phương thức tiên tiến của Google, hỗ trợ cửa sổ ngữ cảnh siêu lớn giúp phân tích được video và tài liệu dài hàng ngàn trang." },
            { id: 21, text: "Cửa sổ ngữ cảnh (Context Window) của một mô hình AI tạo sinh đại diện cho điều gì?", options: ["Kích thước khung hình hiển thị của ứng dụng trên màn hình máy tính.", "Lượng dữ liệu tối đa (tính bằng token) bao gồm cả prompt đầu vào và kết quả đầu ra mà mô hình có thể ghi nhớ và xử lý trong một phiên làm việc.", "Số lượng người dùng tối đa có thể truy cập hệ thống cùng lúc.", "Thời gian tối đa AI được phép suy nghĩ trước khi trả lời."], correct: 1, explanation: "Context Window quyết định độ dài tài liệu mà AI có thể đọc hiểu cùng một lúc. Cửa sổ càng lớn, AI càng nhớ được nhiều nội dung đã trò chuyện ở phía trên." },
            { id: 22, text: "In các định dạng sau, Generative AI có thể tạo ra loại nội dung nào?", options: ["Chỉ văn bản (Text).", "Chỉ hình ảnh (Image).", "Chỉ mã lập trình (Code).", "Tất cả các định dạng trên (Văn bản, Hình ảnh, Âm thanh, Video, Mã nguồn...)."], correct: 3, explanation: "Generative AI ngày nay cực kỳ đa năng, bao phủ toàn bộ các định dạng nội dung số hóa phổ biến." },
            { id: 23, text: "Khi viết prompt, việc cung cấp \\"Context\\" (Ngữ cảnh) có vai trò gì?", options: ["Làm cho câu lệnh dài hơn để tốn nhiều chi phí hơn.", "Giúp mô hình giới hạn phạm vi kiến thức, hiểu rõ vai trò và đối tượng mục tiêu để đưa ra câu trả lời chính xác, phù hợp nhất.", "Giúp máy tính chạy mát hơn.", "Tự động sửa lỗi chính tả cho người dùng."], correct: 1, explanation: "Ngữ cảnh giúp định hình câu trả lời của AI. Ví dụ: Hãy đóng vai chuyên gia kinh tế, viết cho học sinh cấp 3 hiểu... sẽ cho ra kết quả tốt hơn lệnh chung chung." },
            { id: 24, text: "Công cụ \\"Sora\\" do OpenAI công bố thuộc thể loại Generative AI nào?", options: ["Text-to-Speech (Văn bản thành giọng nói)", "Text-to-Video (Văn bản thành video)", "Image-to-3D (Hình ảnh thành mô hình 3D)", "Code-to-Web (Mã nguồn thành trang web)"], correct: 1, explanation: "Sora là mô hình AI tạo sinh video từ văn bản vô cùng chân thực và có tính nhất quán cao về mặt không gian, vật lý." },
            { id: 25, text: "Rủi ro \\"Data Leakage\\" (Rò rỉ dữ liệu) khi nhân viên sử dụng các công cụ AI công cộng là gì?", options: ["Máy tính bị mất điện đột ngột.", "Thông tin bảo mật, mã nguồn nội bộ hoặc dữ liệu khách hàng nhập vào prompt có thể bị lưu lại để huấn luyện mô hình và vô tình hiển thị cho người dùng khác ở tương lai.", "Màn hình máy tính hiển thị sai màu sắc.", "File kết quả tải về bị nhiễm virus."], correct: 1, explanation: "Các công cụ AI miễn phí thường dùng dữ liệu chat của người dùng để tái huấn luyện mô hình. Nếu nhập dữ liệu mật của công ty lên đó, nguy cơ rò rỉ là rất lớn." },
            { id: 26, text: "Thuật ngữ \\"Open-source AI model\\" (Mô hình AI mã nguồn mở) nghĩa là gì?", options: ["Mô hình bắt buộc phải trả phí rất cao mới được sử dụng.", "Mô hình mà nhà phát triển công khai toàn bộ cấu trúc, trọng số (weights) để cộng đồng có thể tự do tải về, tùy chỉnh và chạy trên hạ tầng riêng.", "Mô hình chỉ chạy được trên hệ điều hành Linux.", "Mô hình không cần kết nối mạng vẫn sử dụng được."], correct: 1, explanation: "Mô hình mã nguồn mở (như Llama của Meta, Mistral) cho phép các lập trình viên tải về toàn bộ mã nguồn để tự phát triển và bảo mật dữ liệu riêng." },
            { id: 27, text: "Đâu là một ví dụ về ứng dụng của Generative AI trong lĩnh vực y tế?", options: ["Thay thế hoàn toàn bác sĩ để phẫu thuật từ xa.", "Tự động hóa việc dọn dẹp phòng bệnh.", "Hỗ trợ thiết kế, sáng tạo ra các cấu trúc phân tử protein mới giúp đẩy nhanh quá trình tìm kiếm và bào chế thuốc chữa bệnh.", "Tăng tốc độ hiển thị của máy chụp X-quang."], correct: 2, explanation: "AI tạo sinh có khả năng mô phỏng và tạo ra các chuỗi protein, cấu trúc hóa học mới chưa từng có, hỗ trợ đắc lực cho ngành dược phẩm." },
            { id: 28, text: "Kỹ thuật \\"Chain-of-Thought Prompting\\" giúp cải thiện khả năng nào của mô hình AI?", options: ["Khả năng tạo ra các bài thơ hay hơn.", "Khả năng tư vấn tâm lý khách hàng.", "Khả năng lập luận logic, giải toán hoặc xử lý các bài toán phức tạp bằng cách yêu cầu AI giải thích từng bước một trước khi đưa ra đáp án cuối cùng.", "Khả năng tăng tốc độ kết xuất đồ họa hình ảnh."], correct: 2, explanation: "Chain-of-Thought (Chuỗi suy nghĩ) kích hoạt khả năng suy luận từng bước của AI bằng cách chèn cụm từ lệnh \\"Hãy suy nghĩ từng bước một\\"." },
            { id: 29, text: "Tại sao việc xác thực lại thông tin (Fact-checking) từ kết quả của Generative AI lại cực kỳ quan trọng trước khi xuất bản?", options: ["Kiểm tra lỗi bản quyền nếu thông tin bị trùng lặp.", "Vì các mô hình AI không thực sự \\"hiểu\\" sự thật, chúng chỉ dự đoán từ tiếp theo dựa trên xác suất toán học nên hoàn toàn có thể tạo ra thông tin sai lệch rất tự tin.", "Vì luật pháp cấm sử dụng trực tiếp câu chữ của AI.", "Vì văn bản của AI có chứa mã độc ẩn."], correct: 1, explanation: "Bản chất của LLM là mô hình xác suất từ ngữ, không phải bộ máy tra cứu sự thật tuyệt đối, nên việc kiểm tra lại thông tin là bắt buộc đối với người dùng chuyên nghiệp." },
            { id: 30, text: "Đâu là hành vi sử dụng Generative AI có trách nhiệm và đạo đức?", options: ["Dùng AI viết toàn bộ luận văn tốt nghiệp và cam đoan tự viết.", "Sử dụng AI như một công cụ hỗ trợ tìm kiếm ý tưởng, lập dàn ý, tối ưu mã nguồn và luôn ghi rõ nguồn hoặc có sự kiểm soát, chỉnh sửa từ con người.", "Dùng AI để tạo hàng loạt bài viết giả mạo nhằm hạ uy tín đối thủ cạnh tranh.", "Sao chép tác phẩm nghệ thuật của người khác bắt AI vẽ lại giống hệt để bán."], correct: 1, explanation: "Sử dụng AI có đạo đức là coi AI là trợ lý đồng hành, tăng hiệu suất công việc và chịu trách nhiệm cuối cùng về nội dung sản phẩm do mình tạo ra." }
        ];

        var currentQuestion = 0;
        var scoreCorrect = 0;
        var scoreIncorrect = 0;
        var userAnswers = new Array(questions.length).fill(null);
        var selectedOptionIndex = null;

        function createNavigationButtons() {
            var navGrid = document.getElementById('nav-grid');
            navGrid.innerHTML = '';
            for (var i = 0; i < questions.length; i++) {
                var btn = document.createElement('div');
                btn.className = 'nav-item';
                btn.textContent = i + 1;
                btn.id = 'nav-item-' + i;
                btn.onclick = (function(index) {
                    return function() { jumpToQuestion(index); };
                })(i);
                navGrid.appendChild(btn);
            }
        }

        function updateQuestion() {
            var currentQ = questions[currentQuestion];
            document.getElementById('q-num').textContent = currentQuestion + 1;
            document.getElementById('question-text').textContent = currentQ.text;

            var optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';
            selectedOptionIndex = null;

            var status = userAnswers[currentQuestion];

            currentQ.options.forEach(function(option, index) {
                var optDiv = document.createElement('div');
                optDiv.className = 'option';
                optDiv.id = 'option-' + index;
                
                var labelText = String.fromCharCode(65 + index);
                optDiv.innerHTML = '<div class="option-label">' + labelText + '</div><div class="option-text">' + option + '</div>';

                if (status === null) {
                    optDiv.onclick = (function(idx) {
                        return function() { selectOption(idx); };
                    })(index);
                } else {
                    if (index === currentQ.correct) {
                        optDiv.classList.add('correct');
                    } else if (status === 0 && index === currentQ.userChoice) {
                        optDiv.classList.add('incorrect');
                    }
                }
                optionsContainer.appendChild(optDiv);
            });

            var answerKey = document.getElementById('answer-key');
            if (status !== null) {
                answerKey.classList.add('show');
                document.getElementById('explanation-text').textContent = currentQ.explanation;
                var resultIcon = document.getElementById('result-icon');
                var resultText = document.getElementById('result-text');
                
                if (status === 1) {
                    resultIcon.textContent = '✅';
                    resultText.textContent = 'Chính xác! Đáp án đúng là ' + String.fromCharCode(65 + currentQ.correct);
                    answerKey.style.backgroundColor = '#e8f5e9';
                    answerKey.style.borderLeftColor = '#2e7d32';
                } else {
                    resultIcon.textContent = '❌';
                    resultText.textContent = 'Chưa chính xác! Đáp án đúng là ' + String.fromCharCode(65 + currentQ.correct);
                    answerKey.style.backgroundColor = '#ffebee';
                    answerKey.style.borderLeftColor = '#c62828';
                }
                document.getElementById('btn-check').disabled = true;
            } else {
                answerKey.classList.remove('show');
                document.getElementById('btn-check').disabled = false;
            }

            document.getElementById('btn-prev').disabled = (currentQuestion === 0);
            document.getElementById('btn-next').disabled = (currentQuestion === questions.length - 1);

            for (var i = 0; i < questions.length; i++) {
                var navItem = document.getElementById('nav-item-' + i);
                if (navItem) {
                    navItem.classList.remove('current', 'answered', 'correct', 'incorrect');
                    if (i === currentQuestion) {
                        navItem.classList.add('current');
                    } else if (userAnswers[i] === 1) {
                        navItem.classList.add('correct');
                    } else if (userAnswers[i] === 0) {
                        navItem.classList.add('incorrect');
                    }
                }
            }

            var progress = ((currentQuestion + 1) / questions.length) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';
            
            updateStats();
        }

        function selectOption(index) {
            if (userAnswers[currentQuestion] !== null) return;

            selectedOptionIndex = index;
            var options = document.querySelectorAll('.options-container .option');
            options.forEach(function(opt, idx) {
                if (idx === index) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });
        }

        function checkAnswer() {
            if (selectedOptionIndex === null) {
                alert('Vui lòng chọn một phương án trả lời!');
                return;
            }

            var currentQ = questions[currentQuestion];
            currentQ.userChoice = selectedOptionIndex;

            if (selectedOptionIndex === currentQ.correct) {
                userAnswers[currentQuestion] = 1;
                scoreCorrect++;
            } else {
                userAnswers[currentQuestion] = 0;
                scoreIncorrect++;
            }

            updateQuestion();
        }

        function changeQuestion(direction) {
            var nextQ = currentQuestion + direction;
            if (nextQ >= 0 && nextQ < questions.length) {
                currentQuestion = nextQ;
                updateQuestion();
            }
        }

        function jumpToQuestion(index) {
            currentQuestion = index;
            updateQuestion();
        }

        function updateStats() {
            document.getElementById('score-correct').textContent = scoreCorrect;
            document.getElementById('score-incorrect').textContent = scoreIncorrect;

            var answeredCount = userAnswers.filter(function(ans) { return ans !== null; }).length;
            document.getElementById('stat-answered').textContent = answeredCount + '/' + questions.length;

            var accuracy = answeredCount === 0 ? 0 : Math.round((scoreCorrect / answeredCount) * 100);
            document.getElementById('stat-accuracy').textContent = accuracy + '%';
        }

        function init() {
            createNavigationButtons();
            updateQuestion();

            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    if (currentQuestion > 0) { currentQuestion--; updateQuestion(); }
                } else if (e.key === 'ArrowRight') {
                    if (currentQuestion < questions.length - 1) { currentQuestion++; updateQuestion(); }
                } else if (e.key === 'Enter') {
                    if (userAnswers[currentQuestion] === null) checkAnswer();
                } else if (e.key === 'a' || e.key === 'A') {
                    selectOption(0);
                } else if (e.key === 'b' || e.key === 'B') {
                    selectOption(1);
                } else if (e.key === 'c' || e.key === 'C') {
                    selectOption(2);
                } else if (e.key === 'd' || e.key === 'D') {
                    selectOption(3);
                }
            });
        }

        window.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>`;
    return htmlContent + scriptContent;
  }
};
