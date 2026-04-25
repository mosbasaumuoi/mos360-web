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
            
            /* Header tinh tế với cụm nút Auth */
            header { 
                padding: 15px 30px; 
                background: rgba(17, 17, 17, 0.9); 
                backdrop-filter: blur(10px); 
                display: flex; justify-content: space-between; align-items: center;
                border-bottom: 1px solid #333; position: sticky; top: 0; z-index: 1000;
            }
            .logo-img { max-height: 50px; width: auto; }
            
            .auth-buttons { display: flex; gap: 10px; }
            .btn { padding: 8px 20px; border-radius: 6px; font-size: 0.9rem; font-weight: 600; cursor: pointer; text-decoration: none; transition: 0.3s; }
            .btn-trial { border: 1px solid var(--primary); color: var(--primary); background: transparent; }
            .btn-login { background: var(--primary); color: white; border: none; }
            .btn-login:hover { background: #e65c00; }

            .container { max-width: 1100px; margin: 40px auto; padding: 20px; }

            /* Khu vực hiển thị tùy biến theo User Role */
            .role-section { 
                padding: 20px; border-radius: 15px; margin-bottom: 30px;
                background: linear-gradient(145deg, #111, #1a1a1a);
                border: 1px solid #333;
            }
            .admin-tools { border-left: 4px solid var(--primary); display: none; } /* Mặc định ẩn */
            .student-features { border-left: 4px solid var(--ai-color); display: none; } /* Mặc định ẩn */
            
            /* Giao diện chung (Minimalist cũ) */
            .search-section { text-align: center; margin: 60px 0; }
            .search-box { width: 100%; max-width: 600px; padding: 15px 25px; border-radius: 50px; border: 1px solid #444; background: #1a1a1a; color: white; outline: none; }
            
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
            .card { background: var(--card); padding: 25px; border-radius: 12px; border: 1px solid #222; transition: 0.3s; }
            .card:hover { border-color: var(--primary); }

            /* Nút sửa nhanh chỉ dành cho Admin */
            .edit-btn { font-size: 0.7rem; color: var(--primary); cursor: pointer; text-decoration: underline; margin-left: 10px; display: none; }

            .ai-float { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: var(--ai-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(112,0,255,0.3); }
        </style>
    </head>
    <body>

    <header>
        <img src="https://github.com/mosbasaumuoi/mos360-web/blob/main/logo%20vien.png?raw=true" class="logo-img" alt="MOS360">
        <div class="auth-buttons">
            <a href="#" class="btn btn-trial">Học thử</a>
            <a href="#" class="btn btn-login">Đăng nhập</a>
        </div>
    </header>

    <div class="container">
        
        <div id="admin-panel" class="role-section admin-tools">
            <h3 style="color: var(--primary); margin: 0;">🛠 Bảng Điều Khiển Quản Trị</h3>
            <p style="font-size: 0.9rem; color: #aaa;">Bạn có quyền chỉnh sửa trực tiếp: <button class="btn" style="background:#333; color:white; padding:5px 10px; font-size:0.7rem;">Cập nhật 429 Link</button> <button class="btn" style="background:#333; color:white; padding:5px 10px; font-size:0.7rem;">Đổi Logo/Ảnh</button></p>
        </div>

        <div id="student-panel" class="role-section student-features">
            <h3 style="color: var(--ai-color); margin: 0;">✨ Khu Vực Học Viên Nâng Cao</h3>
            <p style="font-size: 0.9rem; color: #aaa;">Đã mở khóa: Phần mềm thi thử bản quyền & Trợ lý AI Assistant chuyên sâu.</p>
        </div>

        <div class="search-section">
            <h1 style="font-size: 2.5rem; margin-bottom: 10px;">Chuẩn đầu ra sinh viên</h1>
            <p style="color: #666; margin-bottom: 30px;">Luyện thi MOS 1000 — Đồng hành thực chiến</p>
            <input type="text" class="search-box" placeholder="Tìm tài liệu hoặc hỏi AI...">
        </div>

        <div class="grid">
            <div class="card">
                <h3>💻 Trải Nghiệm Thi Thật <span class="edit-btn">[Sửa]</span></h3>
                <p>Phần mềm mô phỏng 100% bài thi quốc tế.</p>
            </div>
            <div class="card">
                <h3>✨ AI Assistant 24/7 <span class="edit-btn">[Sửa]</span></h3>
                <p>Hỏi đáp kiến thức và lỗi thực hành ngay lập tức.</p>
            </div>
            <div class="card">
                <h3>🤝 Đồng Hành Trọn Đời <span class="edit-btn">[Sửa]</span></h3>
                <p>Hỗ trợ chuyên gia qua Zalo/Teamview.</p>
            </div>
        </div>
    </div>

    <div class="ai-float">✨</div>

    <script>
        // Logic mô phỏng (Sáng mai sẽ thay bằng logic thật)
        function setRole(role) {
            document.getElementById('admin-panel').style.display = role === 'admin' ? 'block' : 'none';
            document.getElementById('student-panel').style.display = role === 'student' ? 'block' : 'none';
            const editBtns = document.querySelectorAll('.edit-btn');
            editBtns.forEach(btn => btn.style.display = role === 'admin' ? 'inline' : 'none');
        }

        // Thử nghiệm: Gõ setRole('admin') hoặc setRole('student') vào console để thấy sự thay đổi.
    </script>

    </body>
    </html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
};
