const CONFIG = {
  TITLE: "MOS360 - Luyện thi MOS 1000/1000",
  STUDENT_PASS: "hocvien360",
  LOGO_URL: "https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true",
  SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv"
};

const COURSES = [
  { id: "wd19", name: "MOS Word 2019", price1: "450k", price3: "1.200k" },
  { id: "ex19", name: "MOS Excel 2019", price1: "450k", price3: "1.200k" },
  { id: "pp19", name: "MOS PPT 2019", price1: "450k", price3: "1.200k" },
  { id: "wd365", name: "MOS Word 365", price1: "500k", price3: "1.350k" },
  { id: "ex365", name: "MOS Excel 365", price1: "500k", price3: "1.350k" },
  { id: "pp365", name: "MOS PPT 365", price1: "500k", price3: "1.350k" }
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.split("/")[1];
    const cookie = request.headers.get("Cookie") || "";

    // GĐ 1 & 2: Xử lý link KV & Bảo mật
    if (key && !["", "api-reg"].includes(key)) {
      const linkData = await env.Links_mos360.get(key);
      if (linkData) {
         try {
           const data = JSON.parse(linkData);
           if (data.type === "Học viên" && !cookie.includes("auth=student")) return Response.redirect(url.origin + "?login=1", 302);
           return Response.redirect(data.url, 301);
         } catch(e) { return Response.redirect(linkData, 301); }
      }
    }

    // GĐ 3: Lấy ảnh Bảng Vàng từ Sheets
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
    } catch (e) { studentItems = "<div>Đang tải...</div>"; }

    return new Response(this.renderHTML(studentItems, cookie.includes("auth=student")), {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  },

  renderHTML(studentData, isStudent) {
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
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.5; }
        
        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(8,8,8,0.9); backdrop-filter: blur(10px); position: sticky; top:0; z-index:100; border-bottom: 1px solid var(--border); }
        .brand img { height: 40px; }

        /* Khối thống kê */
        .stats-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; margin: 30px auto; text-align: center; background: linear-gradient(90deg, #121212, #1a1a1a); padding: 20px; border-radius: 20px; border: 1px solid var(--border); }
        .stat-item h2 { color: var(--primary); font-size: 2.2rem; }
        .stat-item p { color: #888; font-size: 0.9rem; }

        /* Bố cục chính */
        .main-grid { display: grid; grid-template-columns: 380px 1fr; gap: 30px; max-width: 1400px; margin: 0 auto; padding: 0 5%; }
        
        /* Cụm quay thưởng nhỏ gọn */
        .promo-wheel-box { background: var(--card); border: 1px solid var(--border); border-radius: 30px; padding: 25px; text-align: center; }
        .wheel { width: 220px; height: 220px; margin: 0 auto 20px; border-radius: 50%; border: 5px solid #FFD700; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Khối khóa học */
        .course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1400px; margin: 40px auto; padding: 0 5%; }
        .course-card { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 25px; transition: 0.3s; border-top: 4px solid var(--primary); }
        .course-card:hover { transform: translateY(-5px); border-color: var(--primary); }
        .price-tag { font-size: 1.4rem; font-weight: 800; color: var(--cyan); margin: 15px 0; }
        .btn-reg { width: 100%; background: #fff; color: #000; border: none; padding: 12px; border-radius: 12px; font-weight: 800; cursor: pointer; margin-top: 10px; }

        /* Carousel Bảng Vàng */
        .gold-board { background: var(--card); border-radius: 30px; padding: 30px; border: 1px solid var(--border); overflow: hidden; }
        .track { display: flex; gap: 15px; animation: scroll 40s linear infinite; }
        .student-item img { height: 320px; border-radius: 12px; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* Modal Form */
        .modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center; }
        .form-box { background: #1a1a1a; padding: 40px; border-radius: 24px; width: 450px; border: 1px solid var(--primary); }
        input, select { width: 100%; padding: 12px; margin: 10px 0; background: #000; border: 1px solid #333; color: #fff; border-radius: 8px; }
    </style>
</head>
<body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"></a>
        <div>
            ${isStudent ? '<button onclick="openForm(\'thi\')" style="color:var(--cyan); background:none; border:1px solid var(--cyan); padding:8px 15px; border-radius:8px; margin-right:10px; cursor:pointer;">Đăng ký thi</button>' : ''}
            <button onclick="location.href='/?login=1'" style="background:var(--primary); border:none; color:#fff; padding:10px 20px; border-radius:10px; font-weight:800; cursor:pointer;">HỌC VIÊN</button>
        </div>
    </header>

    <div class="stats-bar">
        <div class="stat-item"><h2>100%</h2><p>Đỗ ngay lần đầu</p></div>
        <div class="stat-item"><h2>1,000+</h2><p>Học viên đăng ký</p></div>
        <div class="stat-item"><h2>600+</h2><p>Truy cập thường xuyên</p></div>
    </div>

    <div class="main-grid">
        <aside>
            <div class="promo-wheel-box">
                <h3 style="color:var(--primary); margin-bottom:15px;">🎡 Quay Thưởng</h3>
                <div class="wheel"></div>
                <p style="font-size:0.85rem; color:#888; margin-bottom:15px;">🎁 ƯU ĐÃI NHÓM 3: Giảm 100k/bạn</p>
                <button class="btn-reg" style="background:var(--primary); color:#fff;" onclick="alert('Hãy chọn khóa học bên dưới để áp dụng mã giảm giá!')">QUAY NGAY</button>
            </div>
            <div class="promo-wheel-box" style="margin-top:20px; border-left:4px solid var(--cyan);">
                <h4>Học Offline</h4>
                <p style="font-size:0.8rem; color:#888;">Lớp kèm trực tiếp tại Hải Phòng</p>
                <button class="btn-reg" onclick="openForm('offline')">Đăng ký Offline</button>
            </div>
        </aside>
        
        <section class="gold-board">
            <h3 style="margin-bottom:20px;">🏆 Bảng Vàng Chứng Chỉ</h3>
            <div class="track">${studentData}</div>
        </section>
    </div>

    <div class="course-grid">
        ${COURSES.map(c => `
            <div class="course-card">
                <h4>${c.name}</h4>
                <div class="price-tag" id="price-${c.id}">${c.price1}</div>
                <select onchange="updatePrice('${c.id}', this.value, '${c.price1}', '${c.price3}')">
                    <option value="1">Luyện 1 môn</option>
                    <option value="3">Gói Combo 3 môn</option>
                </select>
                <button class="btn-reg" onclick="openForm('hoc', '${c.name}')">Đăng Ký Học</button>
            </div>
        `).join('')}
    </div>

    <div id="modalForm" class="modal">
        <div class="form-box">
            <h2 id="formTitle">Đăng ký</h2>
            <input type="text" placeholder="Họ và tên">
            <input type="text" placeholder="Số điện thoại">
            <input type="text" id="courseInput" readonly>
            <button class="btn-reg" style="background:var(--primary); color:#fff;" onclick="alert('Gửi thành công! Chúng tôi sẽ liên hệ sớm.')">GỬI THÔNG TIN</button>
            <button onclick="closeForm()" style="background:none; border:none; color:#888; margin-top:15px; cursor:pointer; width:100%;">Đóng</button>
        </div>
    </div>

    <script>
        function updatePrice(id, val, p1, p3) {
            document.getElementById('price-'+id).innerText = (val == '1') ? p1 : p3;
        }
        function openForm(type, course = '') {
            document.getElementById('modalForm').style.display = 'flex';
            document.getElementById('courseInput').value = course || type.toUpperCase();
            document.getElementById('formTitle').innerText = 'Đăng ký ' + type;
        }
        function closeForm() { document.getElementById('modalForm').style.display = 'none'; }
    </script>
</body>
</html>`;
  }
};
