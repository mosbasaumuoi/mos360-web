const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  STUDENT_PASS: "hocvien360",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cookie = request.headers.get("Cookie") || "";
    const isStudent = cookie.includes("auth=student");

    // Lấy dữ liệu Bảng Vàng (Đã chốt)
    let studentItems = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL);
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      rows.forEach(row => {
        const link = row.split("\t")[0]?.trim();
        if (link && link.startsWith("http")) {
          studentItems += `<div class="student-item"><img src="${link}" loading="lazy"></div>`;
        }
      });
      studentItems += studentItems; 
    } catch (e) { studentItems = "<div>Đang tải dữ liệu...</div>"; }

    // Routing
    let content = "";
    if (path === "/courses") {
      content = this.getCoursesUI();
    } else if (path === "/library") {
      content = this.getLibraryUI();
    } else {
      content = this.getHomeUI(studentItems);
    }

    return new Response(this.layout(content, isStudent), {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  },

  getHomeUI(studentData) {
    return `
      <div class="stats-bar">
        <div class="stat"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="stat"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="stat"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
      </div>

      <div class="main-grid">
        <aside>
          <div class="section-card">
            <h3 style="color:var(--primary); margin-bottom:15px;">🎡 Vòng Quay & Ưu Đãi</h3>
            <div class="wheel-mini"></div>
            <div class="promo-content" style="margin-top:15px; font-size:0.9rem;">
              <p>🎁 <b>ƯU ĐÃI KHỦNG:</b> Đăng ký Combo 3 môn tính tiền 2 môn (Chỉ 800k).</p>
              <button class="btn-primary" onclick="location.href='/courses'" style="margin-top:15px; width:100%;">XEM CHI TIẾT KHÓA HỌC</button>
            </div>
          </div>
          <div class="section-card" style="margin-top:20px; border-left: 4px solid var(--cyan);">
            <h4>Đăng ký Offline</h4>
            <p style="font-size:0.8rem; color:#888;">Lớp kèm trực tiếp tại trung tâm Hải Phòng.</p>
            <button class="btn-primary" style="background:#222; margin-top:10px; width:100%;" onclick="alert('Đang mở Form Offline...')">ĐĂNG KÝ NGAY</button>
          </div>
        </aside>

        <section class="section-card">
          <h3 style="margin-bottom:20px;">🏆 Bảng Vàng Chứng Chỉ</h3>
          <div class="carousel-container"><div class="track">${studentData}</div></div>
        </section>
      </div>

      <div class="values-grid">
        <div class="value-card"><h3>Thi Thật 100%</h3><p>Thực hành trên hệ thống mô phỏng sát 100% đề thi quốc tế Certiport.</p></div>
        <div class="value-card" style="border-color:var(--cyan)"><h3>Trợ lý AI 24/7</h3><p>Giải đáp kiến thức tin học và các hàm Excel nhanh chóng qua khung Chat AI.</p></div>
        <div class="value-card"><h3>Đồng Hành Trọn Đời</h3><p>Hỗ trợ kỹ năng định dạng luận văn, đồ án chuyên nghiệp suốt quá trình học tập.</p></div>
      </div>
    `;
  },

  getCoursesUI() {
    return `
      <div class="courses-section">
        <h2 style="text-align:center; margin-bottom:40px;">Hệ Thống Khóa Học (Đồng giá 400k)</h2>
        <div class="groups-wrapper">
          <div class="course-group">
            <h3>📦 Nhóm MOS 2019</h3>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS Word 2019</label>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS Excel 2019</label>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS PowerPoint 2019</label>
          </div>
          <div class="course-group">
            <h3>📦 Nhóm MOS 365</h3>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS Word 365</label>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS Excel 365</label>
            <label><input type="checkbox" class="cb-course" onchange="updateTotal()"> MOS PowerPoint 365</label>
          </div>
        </div>
        <div class="total-bar">
          <div class="price-show">Tổng cộng: <span id="total-val">0</span>.000 VNĐ</div>
          <p id="msg" style="color:var(--cyan); height:20px; font-size:0.9rem;"></p>
          <button class="btn-primary" style="padding:15px 50px;" onclick="alert('Chuyển tới Form Đăng ký...')">ĐĂNG KÝ HỌC</button>
        </div>
      </div>
      <script>
        function updateTotal() {
          let n = document.querySelectorAll('.cb-course:checked').length;
          let price = 0;
          if (n >= 3) {
             let sets = Math.floor(n/3);
             let rem = n%3;
             price = (sets * 800) + (rem * 400);
             document.getElementById('msg').innerText = "🔥 Đã áp dụng: Đăng ký 3 tính tiền 2!";
          } else {
             price = n * 400;
             document.getElementById('msg').innerText = "";
          }
          document.getElementById('total-val').innerText = price;
        }
      </script>
    `;
  },

  getLibraryUI() {
    return `
      <div class="library-box">
        <div class="ai-chat-section section-card">
          <h3>Trợ Lý AI MOS360 ✨</h3>
          <div style="height:200px; background:#000; border-radius:10px; margin:15px 0; padding:15px; font-size:0.9rem; color:#aaa;">Hỏi tôi về các hàm Excel hoặc cách dùng Word...</div>
          <input type="text" placeholder="Nhập nội dung cần hỏi..." style="width:100%; padding:12px; background:#1a1a1a; border:1px solid #333; color:#fff; border-radius:10px;">
        </div>
        <div class="search-section section-card" style="margin-top:30px;">
          <h3>Tìm Kiếm Tài Liệu</h3>
          <input type="text" placeholder="Nhập tên tài liệu (ví dụ: Gmetrix, Excel 2019...)" style="width:100%; padding:12px; background:#1a1a1a; border:1px solid #333; color:#fff; border-radius:10px; margin-top:15px;">
        </div>
      </div>
    `;
  },

  layout(content, isStudent) {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${CONFIG.TITLE}</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
            
            header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(8,8,8,0.95); position: sticky; top:0; z-index:1000; border-bottom: 1px solid var(--border); }
            .nav-links a { color: #888; text-decoration: none; margin-left: 25px; font-weight: 600; font-size: 0.9rem; transition: 0.3s; }
            .nav-links a:hover { color: var(--primary); }

            /* SOCIAL SIDEBAR ĐÃ CHỐT */
            .side-social { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
            .social-item { width: 45px; height: 45px; background: #1a1a1a; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
            .social-item img { width: 22px; }

            .main-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; max-width: 1400px; margin: 20px auto; padding: 0 40px; }
            .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 30px; padding: 30px; }
            
            .stats-bar { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 1400px; margin: 30px auto; padding: 0 40px; text-align: center; }
            .stat h2 { color: var(--primary); font-size: 2.2rem; }
            
            .wheel-mini { width: 180px; height: 180px; margin: 0 auto; border-radius: 50%; border: 5px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 10s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            .carousel-container { overflow: hidden; margin-top: 15px; }
            .track { display: flex; gap: 20px; animation: scroll 40s linear infinite; }
            .student-item img { height: 300px; border-radius: 15px; border: 1px solid var(--border); }
            @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

            .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1400px; margin: 50px auto; padding: 0 40px; }
            .value-card { background: var(--card); padding: 30px; border-radius: 25px; border-left: 4px solid var(--primary); }

            .groups-wrapper { display: flex; justify-content: center; gap: 30px; padding: 0 5%; }
            .course-group { background: var(--card); padding: 30px; border-radius: 25px; width: 400px; border-top: 4px solid var(--primary); }
            .course-group label { display: block; padding: 12px; border-bottom: 1px solid #222; cursor: pointer; }
            .total-bar { text-align: center; margin: 40px auto;
