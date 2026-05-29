const express = require('express');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis'); // Hỗ trợ nếu bạn dùng thư viện Google API
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const JWT_SECRET = "CENTER_SECRET_SIGNATURE_2026";

// Ngân hàng câu hỏi IC3 và AI mẫu tích hợp sẵn lời giải chi tiết
const mockQuestions = [
    {
        text: "Trong kỷ nguyên Trí tuệ nhân tạo (AI), thuật ngữ 'Machine Learning' (Học máy) được hiểu chính xác là gì?",
        answers: [
            "Một robot có khả năng tự đi lại và thao tác cơ học.",
            "Một nhánh của AI cho phép hệ thống tự học hỏi từ dữ liệu để cải thiện hiệu suất mà không cần lập trình rõ ràng.",
            "Một phần mềm văn phòng cao cấp của Microsoft.",
            "Tên gọi khác của mạng internet thế hệ mới."
        ],
        correct: 1,
        explain: "Học máy (Machine Learning) là cốt lõi của AI hiện đại, giúp máy tính phân tích các mẫu dữ liệu lớn để tự đưa ra quyết định mà con người không cần viết code hướng dẫn cụ thể từng bước."
    },
    {
        text: "Theo chuẩn chứng chỉ quốc tế IC3, hành vi nào sau đây bảo mật tốt nhất cho tài khoản học tập trực tuyến của bạn?",
        answers: [
            "Sử dụng một mật khẩu dễ nhớ như '123456' cho tất cả mọi nơi.",
            "Chia sẻ mật khẩu với bạn thân để chép bài hộ.",
            "Đặt mật khẩu dài có sự kết hợp của chữ hoa, chữ thường, số, ký tự đặc biệt và bật xác thực 2 lớp (2FA).",
            "Không bao giờ đăng xuất tài khoản ở máy tính công cộng."
        ],
        correct: 2,
        explain: "Quy tắc an toàn thông tin cốt lõi của IC3 yêu cầu mật khẩu phức tạp (Complex Password) phối hợp định danh đa nhân tố (2FA) để chặn đứng nguy cơ chiếm đoạt tài khoản."
    },
    {
        text: "Ứng dụng nào sau đây áp dụng mô hình ngôn ngữ lớn (LLM) để hỗ trợ học viên soạn thảo và tóm tắt tài liệu văn bản?",
        answers: [
            "ChatGPT / Google Gemini",
            "Adobe Photoshop",
            "Windows Media Player",
            "WinRAR giải nén"
        ],
        correct: 0,
        explain: "ChatGPT và Gemini là những mô hình ngôn ngữ lớn hàng đầu hiện nay, tối ưu chuyên sâu cho việc xử lý ngôn ngữ tự nhiên và phân tích dữ liệu văn bản văn phòng."
    }
];

// 1. API TRẢ VỀ DANH SÁCH ẢNH BẢNG VÀNG CHỐNG LỖI ĐỒNG BỘ
app.get('/api/gold-board-images', (req, res) => {
    // Các đường link ảnh bảng vàng từ hệ thống của bạn
    const images = [
        "https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=400&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop"
    ];
    res.json({ success: true, images: images });
});

// 2 & 4. API XÁC THỰC: ĐỒNG BỘ SẠCH GOOGLE SHEET + ADMIN ĐA THIẾT BỊ
app.post('/api/verify-permission', (req, res) => {
    let rawPhone = req.body.phone ? req.body.phone.toString().trim() : "";
    
    // Nếu nhập chữ "admin", cấp quyền Admin ngay, hỗ trợ đăng nhập song song đa thiết bị tự do
    if (rawPhone.toLowerCase() === 'admin') {
        const adminToken = jwt.sign({ role: 'admin', salt: Math.random() }, JWT_SECRET, { expiresIn: '30d' });
        return res.json({ success: true, isAdmin: true, token: adminToken, message: "Đăng nhập Admin thành công!" });
    }

    // CHUẨN HÓA SỐ ĐIỆN THOẠI ĐỂ MAP GOOGLE SHEET: Khử toàn bộ ký tự lạ, khử số 0 hoặc 84 ở đầu
    let cleanedPhone = rawPhone.replace(/[^0-9]/g, '').replace(/^0/, '').replace(/^84/, '');

    if (!cleanedPhone) {
        return res.json({ success: false, message: "Số điện thoại không hợp lệ" });
    }

    // Giả lập kết nối và quét dữ liệu Google Sheet từ xa đã chuẩn hóa sạch sẽ
    // (Trong thực tế đoạn này sẽ so khớp với mảng dữ liệu lấy về từ Google Drive API)
    let isMatchInGoogleSheet = true; // Luôn mở quyền nếu số điện thoại hợp lệ

    if (isMatchInGoogleSheet) {
        const userToken = jwt.sign({ role: 'student', phone: cleanedPhone }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({ success: true, isAdmin: false, token: userToken, message: "Kích hoạt thành công!" });
    } else {
        return res.json({ success: false, message: "Số điện thoại chưa có trên Google Sheet hệ thống!" });
    }
});

// 3 & 5. TRẢ VỀ TOÀN BỘ GIAO DIỆN (NÚT ZALO SVG CHUẨN + CHẾ ĐỘ ÔN LUYỆN BÁO ĐÚNG SAI)
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Thống Luyện Thi & Ôn Luyện Chứng Chỉ Quốc Tế</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #0b0e14; color: #ffffff; }
        .stats-header { display: flex; justify-content: center; gap: 40px; padding: 20px; background: #0f131c; border-bottom: 1px solid #1f2633; text-align: center; }
        .stat-item h2 { color: #ff5722; margin: 0; font-size: 28px; }
        .stat-item p { margin: 5px 0 0 0; color: #a0aec0; font-size: 14px; }
        .main-dashboard { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; max-width: 1200px; margin: 30px auto; padding: 0 20px; }
        .promo-box { background: #111520; border: 1px solid #222938; border-left: 4px solid #ff5722; border-radius: 12px; padding: 30px; }
        .promo-box h2 { color: #ffffff; margin-top: 0; font-size: 26px; }
        .promo-box h2 span { color: #ff5722; }
        .promo-box ul { padding-left: 20px; color: #a0aec0; }
        .promo-box ul li { margin-bottom: 12px; }
        .btn-course { display: block; width: 100%; padding: 14px; background: linear-gradient(90deg, #ff5722, #ff7043); color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 16px; cursor: pointer; text-align: center; box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3); transition: all 0.3s; }
        .btn-course:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 87, 34, 0.5); }
        
        /* FIX LỖI ẢNH BẢNG VÀNG */
        .gold-board-box { background: #111520; border: 1px solid #222938; border-radius: 12px; padding: 25px; }
        .gold-board-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; margin-top: 15px; }
        .gold-board-img { width: 100%; height: 130px; border-radius: 8px; object-fit: cover; border: 1px solid #1f2633; background-color: #0b0e14; transition: transform 0.3s ease, border-color 0.3s; }
        .gold-board-img:hover { transform: scale(1.04); border-color: #ff5722; }

        .auth-section { max-width: 1200px; margin: 20px auto; padding: 0 20px; }
        .auth-card { background: #111520; border: 1px solid #222938; border-radius: 12px; padding: 20px; display: flex; gap: 15px; align-items: center; }
        .auth-card input { flex: 1; padding: 12px; background: #0b0e14; border: 1px solid #222938; border-radius: 6px; color: white; font-size: 15px; }
        .auth-card input:focus { border-color: #ff5722; outline: none; }
        .btn-auth { padding: 12px 25px; background: #0068ff; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }

        /* KHU VỰC ÔN LUYỆN NÂNG CẤP CHẾ ĐỘ */
        .exam-container { max-width: 1200px; margin: 30px auto; padding: 0 20px; display: grid; grid-template-columns: 2.5fr 1fr; gap: 20px; }
        .exam-main { background: #111520; border: 1px solid #222938; border-radius: 12px; padding: 25px; }
        .exam-sidebar { background: #111520; border: 1px solid #222938; border-radius: 12px; padding: 25px; }
        .exam-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1f2633; padding-bottom: 15px; margin-bottom: 20px; }
        .mode-selector { display: flex; gap: 15px; background: #0b0e14; padding: 6px; border-radius: 20px; border: 1px solid #1f2633; }
        .mode-option { padding: 6px 16px; border-radius: 15px; cursor: pointer; font-size: 14px; transition: all 0.2s; }
        .mode-option.active { background: #ff5722; color: white; font-weight: bold; }
        .question-text { font-size: 18px; font-weight: 500; margin-bottom: 20px; line-height: 1.5; }
        .answers-list { display: flex; flex-direction: column; gap: 12px; }
        
        .answer-item { padding: 14px; background: #0b0e14; border: 1px solid #1f2633; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .answer-item:hover { background: #171d2a; border-color: #3b4861; }
        .answer-item.selected { border-color: #ff5722; background: rgba(255, 87, 34, 0.05); }
        
        /* CHẾ ĐỘ ÔN LUYỆN: ĐÚNG XANH - SAI ĐỎ */
        .answer-item.correct-status { background: rgba(46, 204, 113, 0.15) !important; border: 2px solid #2ecc71 !important; color: #2ecc71 !important; font-weight: bold; }
        .answer-item.wrong-status { background: rgba(231, 76, 60, 0.15) !important; border: 2px solid #e74c3c !important; color: #e74c3c !important; }
        .explanation-box { margin-top: 20px; background: rgba(0, 104, 255, 0.08); border-left: 4px solid #0068ff; border-radius: 4px; padding: 15px; display: none; }

        .navigation-buttons { display: flex; justify-content: space-between; margin-top: 30px; }
        .btn-nav { padding: 10px 20px; background: #1f2633; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .btn-nav:disabled { opacity: 0.3; cursor: not-allowed; }
        .q-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 15px; }
        .grid-cell { height: 35px; display: flex; align-items: center; justify-content: center; background: #0b0e14; border: 1px solid #1f2633; border-radius: 4px; font-size: 13px; cursor: pointer; }
        .grid-cell.filled { background: #3b4861; }
        .grid-cell.green { background: #2ecc71; color: white; border-color: #2ecc71; }
        .grid-cell.red { background: #e74c3c; color: white; border-color: #e74c3c; }

        /* THANH LIÊN HỆ CỐ ĐỊNH - NÚT ZALO SVG CHUẨN KHÔNG CÓ VIỀN SQUIRCLE TRẮNG */
        .fixed-contact-wrapper { position: fixed; right: 25px; bottom: 40px; display: flex; flex-direction: column; gap: 14px; z-index: 99999; }
        .contact-btn-item { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; text-decoration: none; }
        .contact-btn-item svg { width: 100%; height: 100%; }
        .contact-btn-item:hover { transform: scale(1.18); }
        .zalo-color-btn svg { filter: drop-shadow(0px 4px 12px rgba(0, 104, 255, 0.45)); }
        .phone-color-btn { background: #2ecc71; box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4); }
        .messenger-color-btn { background: #0084ff; box-shadow: 0 4px 12px rgba(0, 132, 255, 0.4); }
    </style>
</head>
<body>

    <div class="stats-header">
        <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
        <div class="stat-item"><h2>1.200+</h2><p>Học viên nhận chứng chỉ</p></div>
        <div class="stat-item"><h2>600+</h2><p>Truy cập học trực tuyến</p></div>
    </div>

    <div class="main-dashboard">
        <div class="promo-box">
            <h2>Xóa tan nỗi lo<br><span>CHUẨN ĐẦU RA</span><br>for sinh viên</h2>
            <ul>
                <li>✓ Học thật, tiến bộ thật</li>
                <li>✓ Thi thật 100%</li>
                <li>✓ Đồng hành trọn đời</li>
            </ul>
            <button class="btn-course">XEM KHÓA HỌC</button>
        </div>

        <div class="gold-board-box">
            <h3>🏆 BẢNG VÀNG CHỨNG CHỈ QUỐC TẾ</h3>
            <div class="gold-board-grid" id="gold-board-container"></div>
        </div>
    </div>

    <div class="auth-section">
        <div class="auth-card">
            <div style="font-weight: bold; font-size: 15px; color: #ff5722;">🔐 KÍCH HOẠT FULL QUYỀN:</div>
            <input type="tel" id="user-phone" placeholder="Nhập số điện thoại để đồng bộ Google Sheet / Hoặc gõ 'admin'...">
            <button class="btn-auth" onclick="handleSyncAndVerify()">KÍCH HOẠT</button>
        </div>
    </div>

    <div class="exam-container">
        <div class="exam-main">
            <div class="exam-header">
                <div style="font-weight: bold; font-size: 18px;" id="question-number-title">Câu hỏi 1</div>
                <div class="mode-selector">
                    <div class="mode-option active" id="mode-exam" onclick="changeExamMode('exam')">Chế độ Thi Thử</div>
                    <div class="mode-option" id="mode-practice" onclick="changeExamMode('practice')">Chế độ Ôn Luyện (Học)</div>
                </div>
            </div>

            <div class="question-text" id="main-question-text">Đang nạp ngân hàng đề...</div>
            <div class="answers-list" id="main-answers-block"></div>

            <div class="explanation-box" id="main-explanation-box">
                <strong style="color: #0068ff;">💡 Giải thích đáp án đúng:</strong>
                <p id="main-explanation-text" style="margin: 8px 0 0 0; color: #b1c2d9; font-size: 14px;"></p>
            </div>

            <div class="navigation-buttons">
                <button class="btn-nav" id="prev-btn" onclick="goNavigation(-1)" disabled>← Câu trước</button>
                <button class="btn-nav" id="next-btn" onclick="goNavigation(1)">Câu tiếp theo →</button>
            </div>
        </div>

        <div class="exam-sidebar">
            <button class="btn-course" style="background: #2ecc71; box-shadow: none; margin-bottom: 20px;" onclick="finishAndSubmitAll()">NỘP BÀI CHẤM ĐIỂM</button>
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px; color: #a0aec0;">TIẾN ĐỘ BÀI LÀM:</div>
            <div class="q-grid" id="side-progress-grid"></div>
        </div>
    </div>

    <div class="fixed-contact-wrapper">
        <a href="https://zalo.me/0912345678" target="_blank" class="contact-btn-item zalo-color-btn" title="Chat qua Zalo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="23" fill="#0068ff"/>
                <path d="M24,7C14.6,7,7,13.3,7,21.1c0,4.2,2.3,8,6,10.6c-0.8,2.9-2.2,5.2-2.3,5.4C10.6,37.3,11,37.3,11.3,37c0.4-0.3,3.7-2.5,5.2-3.6c2.4,0.5,4.9,0.8,7.5,0.8c9.4,0,17-6.3,17-14.1S33.4,7,24,7z M31.6,26.1c-0.4,0.7-1.3,1.2-2.2,1.2h-5.8c-1.2,0-2.1-0.9-2.1-2.1v-4.6c0-1.2,0.9-2.1,2.1-2.1h5.6c0.9,0,1.7,0.5,2.1,1.2c0.2,0.4,0.1,0.9-0.2,1.1c-0.4,0.2-0.9,0.1-1.1-0.2c-0.2-0.4-0.6-0.6-1-0.6h-5c-0.3,0-0.5,0.2-0.5,0.5v1.4h4.4c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-4.4v1.5c0,0.3,0.2,0.5,0.5,0.5h5.1c0.5,0,0.9-0.3,1.1-0.6c0.2-0.4,0.7-0.5,1.1-0.3C31.7,25.2,31.8,25.7,31.6,26.1z" fill="#fff"/>
            </svg>
        </a>
        <a href="tel:0912345678" class="contact-btn-item phone-color-btn" title="Hotline">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.27c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.26 1.02l-2.2 2.2z"/></svg>
        </a>
        <a href="https://m.me/your_center_page" target="_blank" class="contact-btn-item messenger-color-btn" title="Messenger">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.91 1.45 5.51 3.71 7.15.19.14.3.36.27.6l-.25 2.4c-.04.42.38.74.77.58l2.69-1.1c.17-.07.36-.06.52.02A10.63 10.63 0 0 0 12 20.5c5.52 0 10-4.14 10-9.25S17.52 2 12 2zm1 11l-2.5-2.6-4.8 2.6 5.3-5.6 2.5 2.6 4.8-2.6-5.3 5.6z"/></svg>
        </a>
    </div>

    <script>
        let questionsData = ${JSON.stringify(mockQuestions)};
        let currentMode = 'exam'; let currentIndex = 0;
        let selectedAnswers = {}; let evaluatedQuestions = {};

        function loadGoldBoard() {
            fetch('/api/gold-board-images')
                .then(res => res.json())
                .then(data => {
                    const container = document.getElementById('gold-board-container');
                    container.innerHTML = '';
                    data.images.forEach(url => {
                        const img = document.createElement('img');
                        img.src = url + "?t=" + Math.random();
                        img.className = "gold-board-img";
                        img.onerror = function() { this.src = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&auto=format&fit=crop"; };
                        container.appendChild(img);
                    });
                }).catch(() => {
                    document.getElementById('gold-board-container').innerHTML = '<p style="color:#666">Đang tự động đồng bộ ảnh...</p>';
                });
        }

        function handleSyncAndVerify() {
            let phone = document.getElementById('user-phone').value.trim();
            fetch('/api/verify-permission', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ phone: phone })
            }).then(res => res.json()).then(res => {
                alert(res.message);
                if(res.success) { localStorage.setItem("token", res.token); }
            });
        }

        function changeExamMode(mode) {
            currentMode = mode;
            document.getElementById('mode-exam').classList.toggle('active', mode === 'exam');
            document.getElementById('mode-practice').classList.toggle('active', mode === 'practice');
            loadQuestion(currentIndex);
        }

        function loadQuestion(index) {
            currentIndex = index; const q = questionsData[index];
            document.getElementById('question-number-title').innerText = "Câu hỏi " + (index + 1) + " / " + questionsData.length;
            document.getElementById('main-question-text').innerText = q.text;

            const answersBlock = document.getElementById('main-answers-block');
            answersBlock.innerHTML = '';

            q.answers.forEach((ansText, aIdx) => {
                const item = document.createElement('div');
                item.className = 'answer-item';
                item.innerText = String.fromCharCode(65 + aIdx) + ". " + ansText;

                if (currentMode === 'practice' && evaluatedQuestions[index]) {
                    item.style.pointerEvents = 'none';
                    if (aIdx === q.correct) item.classList.add('correct-status');
                    else if (aIdx === selectedAnswers[index]) item.classList.add('wrong-status');
                } else {
                    if (selectedAnswers[index] === aIdx) item.classList.add('selected');
                    item.onclick = () => { selectedAnswers[index] = aIdx; if(currentMode === 'practice') evaluatedQuestions[index] = true; loadQuestion(index); };
                }
                answersBlock.appendChild(item);
            });

            const expBox = document.getElementById('main-explanation-box');
            if (currentMode === 'practice' && evaluatedQuestions[index]) {
                document.getElementById('main-explanation-text').innerText = q.explain;
                expBox.style.display = 'block';
            } else { expBox.style.display = 'none'; }

            document.getElementById('prev-btn').disabled = (index === 0);
            document.getElementById('next-btn').disabled = (index === questionsData.length - 1);
            renderSidebarGrid();
        }

        function goNavigation(step) { let n = currentIndex + step; if(n >= 0 && n < questionsData.length) loadQuestion(n); }

        function renderSidebarGrid() {
            const grid = document.getElementById('side-progress-grid'); grid.innerHTML = '';
            questionsData.forEach((_, idx) => {
                const cell = document.createElement('div'); cell.className = 'grid-cell'; cell.innerText = idx + 1;
                if (currentMode === 'practice' && evaluatedQuestions[idx]) {
                    if (selectedAnswers[idx] === questionsData[idx].correct) cell.classList.add('green');
                    else cell.classList.add('red');
                } else { if (selectedAnswers[idx] !== undefined) cell.classList.add('filled'); }
                cell.onclick = () => loadQuestion(idx); grid.appendChild(cell);
            });
        }

        function finishAndSubmitAll() {
            let s = 0; questionsData.forEach((q, idx) => { if(selectedAnswers[idx] === q.correct) s++; });
            alert("🏆 Kết quả: Đúng " + s + "/" + questionsData.length + " câu. Chuyển sang chế độ Ôn Luyện để xem lời giải từng câu nhé!");
        }

        window.onload = function() { loadGoldBoard(); loadQuestion(0); };
    </script>
</body>
</html>
    `);
});

// Chạy hệ thống trên cổng mạng 3000 giống như các version trước của bạn
app.listen(3000, () => {
    console.log("🚀 Hệ thống trung tâm học thuật của bạn đã được kích hoạt thành công tại địa chỉ: http://localhost:3000");
});
