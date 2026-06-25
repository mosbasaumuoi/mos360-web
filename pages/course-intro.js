// ============================================================
// GIÁO TRÌNH HỌC — Trang giới thiệu nội dung khóa học
// Dùng chung style với layout() chính (var(--p), --card, --border, --muted, --cyan)
// ============================================================

const SHARED_STYLE = `
<style>
.gt-wrap { max-width:900px; margin:0 auto; padding:32px 20px 64px; }
.gt-back { display:inline-flex; align-items:center; gap:6px; font-size:0.85rem; font-weight:700; color:var(--muted); text-decoration:none; margin-bottom:18px; }
.gt-back:hover { color:var(--text); }
.gt-hero { text-align:center; padding:36px 20px 28px; border-bottom:1px solid var(--border); margin-bottom:28px; }
.gt-badge { display:inline-flex; align-items:center; gap:6px; padding:5px 14px; border-radius:100px; font-size:0.72rem; font-weight:800; letter-spacing:1px; text-transform:uppercase; margin-bottom:14px; }
.gt-title { font-size:clamp(1.5rem,4vw,2.2rem); font-weight:800; letter-spacing:-0.5px; margin-bottom:8px; }
.gt-subtitle { color:var(--muted); font-size:0.95rem; max-width:560px; margin:0 auto; line-height:1.6; }
.gt-drive { display:inline-flex; align-items:center; gap:8px; margin-top:18px; padding:11px 22px; border-radius:10px; font-weight:800; font-size:0.88rem; text-decoration:none; transition:transform 0.15s, box-shadow 0.15s; }
.gt-drive:hover { transform:translateY(-2px); }
.gt-note { display:block; margin-top:8px; font-size:0.75rem; color:var(--muted); }

.gt-section { margin-bottom:32px; }
.gt-section h2 { font-size:1.15rem; font-weight:800; margin-bottom:10px; }
.gt-section p { color:var(--text); font-size:0.92rem; line-height:1.7; margin-bottom:10px; }
.gt-section ul { margin:0 0 10px 0; padding-left:0; list-style:none; }
.gt-section ul li { font-size:0.92rem; line-height:1.7; padding-left:22px; position:relative; margin-bottom:4px; }
.gt-section ul li::before { content:'•'; position:absolute; left:6px; font-weight:900; }

.gt-table { width:100%; border-collapse:collapse; margin:14px 0 8px; border:1px solid var(--border); border-radius:10px; overflow:hidden; }
.gt-table th, .gt-table td { padding:10px 14px; text-align:left; font-size:0.85rem; border-bottom:1px solid var(--border); }
.gt-table th { font-weight:800; }
.gt-table tr:last-child td { border-bottom:none; }

.gt-acc { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; margin-bottom:12px; transition:border-color 0.2s; }
.gt-acc-hdr { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; cursor:pointer; user-select:none; gap:12px; }
.gt-acc-hdr-left { display:flex; align-items:center; gap:12px; min-width:0; }
.gt-acc-num { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; font-weight:800; flex-shrink:0; }
.gt-acc-title { font-size:0.92rem; font-weight:800; }
.gt-acc-chevron { color:var(--muted); font-size:0.8rem; transition:transform 0.25s; flex-shrink:0; }
.gt-acc.open .gt-acc-chevron { transform:rotate(180deg); }
.gt-acc-body { display:none; padding:0 20px 18px; border-top:1px solid var(--border); }
.gt-acc.open .gt-acc-body { display:block; padding-top:14px; }
.gt-lvl-label { display:inline-block; font-size:0.72rem; font-weight:800; letter-spacing:1px; text-transform:uppercase; padding:2px 10px; border-radius:100px; margin:10px 0 6px; }
.gt-lvl-label.l1 { background:rgba(34,197,94,0.12); color:#16a34a; }
.gt-lvl-label.l2 { background:rgba(245,158,11,0.14); color:#b45309; }
.gt-lvl-label.l3 { background:rgba(239,68,68,0.12); color:#dc2626; }

.gt-footer-cta { text-align:center; padding:28px 20px; border-top:1px solid var(--border); margin-top:32px; }
.gt-footer-cta p { color:var(--muted); font-size:0.85rem; margin-bottom:14px; }
</style>
<script>
function gtToggle(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('open');
}
</script>
`;

// ============================================================
// IC3 GS6 — 7 chuyên đề × Level 1/2/3
// ============================================================
const IC3_DOMAINS = [
  {
    title: "CÔNG NGHỆ THÔNG TIN CƠ BẢN",
    l1: { goals: ["Truy cập và điều hướng giữa các môi trường kỹ thuật số", "Xác định các thiết bị kỹ thuật số và kết nối", "Giải thích các khái niệm phần mềm cơ bản", "Giải thích các khái niệm phần cứng cơ bản", "Giải thích các khái niệm Hệ điều hành cơ bản", "Giải thích các khái niệm mạng cơ bản"],
      topics: "Hệ điều hành (HĐH), phần mềm vs phần cứng, các loại thiết bị số (máy tính, di động, IoT), cổng kết nối và phụ kiện, khái niệm mạng (LAN, Wi-Fi, Internet), điện toán đám mây." },
    l2: { goals: ["Tùy chỉnh môi trường kỹ thuật số"],
      topics: "Tùy chỉnh hệ điều hành và môi trường làm việc số: thiết lập cài đặt hệ thống, quản lý ứng dụng và cửa sổ làm việc, tổ chức và quản lý tệp/thư mục, cá nhân hóa giao diện thiết bị để làm việc hiệu quả hơn." },
    l3: { goals: ["Xác định, khắc phục sự cố và giải quyết các vấn đề kỹ thuật"],
      topics: "Nhận diện các sự cố kỹ thuật thường gặp với thiết bị, phần mềm, kết nối mạng; quy trình xác định nguyên nhân (troubleshooting) và các bước khắc phục cơ bản; khi nào cần liên hệ bộ phận hỗ trợ kỹ thuật (IT support)." }
  },
  {
    title: "CÔNG DÂN KỶ NGUYÊN SỐ",
    l1: { goals: ["Tạo và quản lý danh tính kỹ thuật số", "Biết, quản lý và bảo vệ danh tiếng kỹ thuật số", "Biết được những hành vi và nội dung kỹ thuật số không phù hợp"],
      topics: "Danh tính số (hồ sơ, bài đăng, dấu chân kỹ thuật số), bảo vệ danh tiếng trực tuyến, hành vi và nội dung số không phù hợp, quyền riêng tư cá nhân." },
    l2: { goals: ["Áp dụng các tiêu chuẩn về nghi thức kỹ thuật số"],
      topics: "Áp dụng các quy tắc ứng xử (etiquette) phù hợp trong môi trường học tập, công việc và mạng xã hội; nhận biết và xử lý các tình huống giao tiếp số không phù hợp; thực hành các tiêu chuẩn nghi thức số khi tương tác với đồng nghiệp, bạn học, khách hàng." },
    l3: { goals: ["Trình bày các phương pháp tốt nhất cho công dân kỹ thuật số"],
      topics: "Các phương pháp thực hành tốt nhất (best practices) để trở thành công dân số có trách nhiệm: bảo vệ danh tiếng trực tuyến trong dài hạn, tôn trọng bản quyền và quyền riêng tư của người khác, hành xử có đạo đức trong môi trường học tập và làm việc số." }
  },
  {
    title: "QUẢN LÝ THÔNG TIN",
    l1: { goals: ["Tìm kiếm các mục trên một trang web cụ thể", "Tìm kiếm thông tin bằng cách sử dụng công cụ tìm kiếm", "Sử dụng các công cụ để thu hẹp tiêu chí tìm kiếm", "Đánh giá tính hợp lý của thông tin"],
      topics: "Công cụ tìm kiếm (search engine), kỹ thuật tìm kiếm nâng cao, phân loại các loại website (chính phủ, giáo dục, thương mại...), đánh giá độ tin cậy của nguồn thông tin." },
    l2: { goals: ["Quản lý thu thập, lưu trữ và truy xuất dữ liệu trực tuyến"],
      topics: "Thu thập và tổ chức thông tin từ nhiều nguồn trực tuyến; lưu trữ dữ liệu trên máy tính cá nhân và trên đám mây (cloud storage); đặt tên, phân loại, sắp xếp tệp/thư mục theo hệ thống hợp lý để dễ truy xuất sau này." },
    l3: { goals: ["Đánh giá nguồn thông tin kỹ thuật số từ các kết quả tìm kiếm"],
      topics: "Kỹ năng đánh giá độ tin cậy, tính chính xác và tính thời sự của thông tin tìm được trên Internet; phân biệt nguồn chính thống, nguồn tham khảo và quảng cáo; nhận diện thông tin sai lệch (misinformation) và tin giả (fake news)." }
  },
  {
    title: "SÁNG TẠO NỘI DUNG",
    l1: { goals: ["Tạo tài liệu và bản trình chiếu cơ bản", "Hiểu về các tham chiếu trong tài liệu", "Biết lưu và sao lưu công việc", "Hiểu khái niệm cơ bản về in ấn"],
      topics: "Sử dụng Microsoft Word (Backstage View, tạo/lưu/in tài liệu), Microsoft PowerPoint (tạo bản trình chiếu cơ bản), tham chiếu trong tài liệu, sao lưu (backup) dữ liệu." },
    l2: { goals: ["Sử dụng lại tài nguyên kỹ thuật số một cách có trách nhiệm"],
      topics: "Thực hành thao tác trên Microsoft Word, Excel, PowerPoint ở mức trung bình: định dạng văn bản, sử dụng công thức/hàm cơ bản trong Excel, chèn biểu đồ và bảng, thiết kế slide trình chiếu; sử dụng lại hình ảnh, video, văn bản từ nguồn khác đúng quy định bản quyền (Creative Commons, trích dẫn nguồn)." },
    l3: { goals: ["Tạo, chỉnh sửa và xuất bản hoặc trình bày nội dung phương tiện kỹ thuật số cho một đối tượng cụ thể"],
      topics: "Thực hành nâng cao trên Word/Excel/PowerPoint: tạo tài liệu, bảng tính, bài trình chiếu hoàn chỉnh phục vụ một mục đích và đối tượng cụ thể (báo cáo, thuyết trình, ấn phẩm); xuất bản và chia sẻ nội dung dưới nhiều định dạng (PDF, liên kết chia sẻ, xuất bản trực tuyến)." }
  },
  {
    title: "GIAO TIẾP / TRUYỀN THÔNG",
    l1: { goals: ["Thể hiện bản thân thông qua các phương tiện kỹ thuật số", "Tương tác với mọi người trong môi trường kỹ thuật số"],
      topics: "Mạng xã hội và blog, các hình thức truyền thông số (email, nhắn tin, video call), nghi thức giao tiếp trực tuyến (netiquette), chia sẻ nội dung có trách nhiệm." },
    l2: { goals: ["Tương tác với những người khác trong môi trường kỹ thuật số"],
      topics: "Sử dụng email, tin nhắn, video call để trao đổi công việc và học tập; lựa chọn kênh giao tiếp phù hợp với từng tình huống; tham gia thảo luận, phản hồi và tương tác hiệu quả trong nhóm trực tuyến." },
    l3: { goals: ["Tùy chỉnh tin nhắn và phương tiện cho một đối tượng cụ thể"],
      topics: "Điều chỉnh nội dung, văn phong và hình thức truyền thông (email, tin nhắn, bài đăng, video) phù hợp với từng đối tượng người nhận (cấp trên, đồng nghiệp, khách hàng, công chúng); lựa chọn định dạng và kênh truyền thông hiệu quả nhất cho từng mục đích." }
  },
  {
    title: "CỘNG TÁC",
    l1: { goals: ["Xác định các khái niệm cộng tác kỹ thuật số", "Xác định các tiêu chuẩn nghi thức kỹ thuật số cho quá trình cộng tác"],
      topics: "Cộng tác đồng bộ (real-time) và bất đồng bộ, công cụ làm việc nhóm trực tuyến (chia sẻ tài liệu, lịch, video conference), quy tắc ứng xử khi cộng tác kỹ thuật số." },
    l2: { goals: ["Sử dụng công cụ và công nghệ kỹ thuật số để cộng tác trên việc tạo nội dung"],
      topics: "Cộng tác chỉnh sửa tài liệu/bảng tính/bài trình chiếu cùng lúc với nhiều người (Google Docs, Sheets, Slides, Microsoft 365); chia sẻ quyền truy cập tệp; theo dõi lịch sử thay đổi (version history) và bình luận (comment) trong quá trình làm việc nhóm." },
    l3: { goals: ["Sử dụng công cụ cộng tác để làm việc với người khác để kiểm tra các vấn đề và sự cố"],
      topics: "Sử dụng các công cụ cộng tác trực tuyến (quản lý công việc, theo dõi lỗi/sự cố, lịch chung, không gian làm việc chia sẻ) để cùng nhóm phát hiện, theo dõi và xử lý vấn đề; phối hợp quy trình làm việc nhóm từ xa hiệu quả." }
  },
  {
    title: "AN TOÀN VÀ AN NINH",
    l1: { goals: ["Mô tả các mối đe dọa bảo mật kỹ thuật số", "Bảo vệ thiết bị và nội dung kỹ thuật số", "Nhận thức về công nghệ thu thập dữ liệu", "Xác định các rủi ro sức khỏe liên quan đến việc sử dụng công nghệ kỹ thuật số"],
      topics: "Các mối đe dọa bảo mật (virus, malware, phishing, hacking), biện pháp bảo vệ thiết bị và dữ liệu (mật khẩu, mã hóa, antivirus), thu thập dữ liệu cá nhân (cookies, theo dõi), sức khỏe khi dùng công nghệ (ergonomics, sử dụng hợp lý)." },
    l2: { goals: ["Tránh các mối đe dọa về sức khỏe tâm lý trong khi sử dụng công nghệ kỹ thuật số (Catfishing, FOMO)"],
      topics: "Nhận diện các mối đe dọa tâm lý khi sử dụng công nghệ số: Catfishing (giả mạo danh tính), FOMO (sợ bỏ lỡ — Fear Of Missing Out), nghiện mạng xã hội; cách phòng tránh và xử lý khi gặp các tình huống này; xây dựng thói quen sử dụng công nghệ lành mạnh." },
    l3: { goals: ["Quản lý bảo mật thiết bị (mã hóa, mật khẩu sinh trắc học, virus)"],
      topics: "Các biện pháp bảo mật thiết bị nâng cao: mã hóa dữ liệu (encryption), xác thực sinh trắc học (vân tay, khuôn mặt), quản lý mật khẩu an toàn, nhận diện và phòng chống virus/malware, cập nhật phần mềm bảo mật định kỳ." }
  }
];

const DRIVE_LINKS_IC3 = {
  1: "https://drive.google.com/PLACEHOLDER_LEVEL_1",
  2: "https://drive.google.com/PLACEHOLDER_LEVEL_2",
  3: "https://drive.google.com/PLACEHOLDER_LEVEL_3"
};

function ic3GoalsHtml(goals) {
  return `<ul>${goals.map(g => `<li>${g}</li>`).join('')}</ul>`;
}

export function getIC3IntroUI() {
  const accordions = IC3_DOMAINS.map((d, i) => `
    <div class="gt-acc" id="ic3-acc-${i+1}">
      <div class="gt-acc-hdr" onclick="gtToggle('ic3-acc-${i+1}')">
        <div class="gt-acc-hdr-left">
          <div class="gt-acc-num" style="background:rgba(255,215,0,0.15); color:#B8860B;">${i+1}</div>
          <div class="gt-acc-title">${d.title}</div>
        </div>
        <span class="gt-acc-chevron">▼</span>
      </div>
      <div class="gt-acc-body">
        <span class="gt-lvl-label l1">Level 1</span>
        <p style="font-weight:700; margin-bottom:4px;">Mục tiêu:</p>
        ${ic3GoalsHtml(d.l1.goals)}
        <p style="font-weight:700; margin-bottom:4px;">Nội dung chính:</p>
        <p>${d.l1.topics}</p>

        <span class="gt-lvl-label l2">Level 2</span>
        <p style="font-weight:700; margin-bottom:4px;">Mục tiêu:</p>
        ${ic3GoalsHtml(d.l2.goals)}
        <p style="font-weight:700; margin-bottom:4px;">Nội dung chính:</p>
        <p>${d.l2.topics}</p>

        <span class="gt-lvl-label l3">Level 3</span>
        <p style="font-weight:700; margin-bottom:4px;">Mục tiêu:</p>
        ${ic3GoalsHtml(d.l3.goals)}
        <p style="font-weight:700; margin-bottom:4px;">Nội dung chính:</p>
        <p>${d.l3.topics}</p>
      </div>
    </div>
  `).join('');

  return `${SHARED_STYLE}
<div class="gt-wrap">
  <a href="/courses" class="gt-back">← Quay lại danh sách khóa học</a>

  <div class="gt-hero">
    <span class="gt-badge" style="background:rgba(255,215,0,0.15); color:#B8860B;">🌐 IC3 GS6 · Certiport</span>
    <h1 class="gt-title">Giáo trình IC3 GS6 — Level 1, 2 &amp; 3</h1>
    <p class="gt-subtitle">Computing Fundamentals · Key Applications · Living Online — chứng chỉ quốc tế do Certiport (Pearson VUE) cấp.</p>
    <a href="${DRIVE_LINKS_IC3[1]}" target="_blank" class="gt-drive" style="background:linear-gradient(135deg,#FFD700,#cca400); color:#fff;">📁 Tải tài liệu lý thuyết (Google Drive)</a>
    <span class="gt-note">Link tài liệu sẽ được trung tâm cập nhật đầy đủ trong thời gian tới</span>
  </div>

  <div class="gt-section">
    <h2>Giới thiệu chung</h2>
    <p>IC3 (Internet and Computing Core Certification) là chứng chỉ quốc tế do Certiport (thuộc Pearson VUE) cấp, xác nhận năng lực sử dụng máy tính, Internet và các ứng dụng kỹ thuật số cơ bản. Phiên bản GS6 (Global Standard 6) là phiên bản mới nhất, phù hợp với bối cảnh công nghệ và kỹ năng số hiện đại.</p>
    <p>Chứng chỉ gồm 3 cấp độ (Level), tương ứng 3 bài thi riêng biệt. Học viên cần hoàn thành cả 3 Level để được công nhận đạt chuẩn IC3 GS6 toàn diện.</p>
    <table class="gt-table">
      <tr><th>Level</th><th>Tên gọi</th><th>Nội dung chính</th></tr>
      <tr><td><b>Level 1</b></td><td>Computing Fundamentals</td><td>Kiến thức nền tảng về máy tính, phần cứng, phần mềm, mạng, công dân số</td></tr>
      <tr><td><b>Level 2</b></td><td>Key Applications</td><td>Kỹ năng sử dụng Word, Excel, PowerPoint và các ứng dụng văn phòng</td></tr>
      <tr><td><b>Level 3</b></td><td>Living Online</td><td>Làm việc và giao tiếp trực tuyến, an toàn mạng, cộng tác số</td></tr>
    </table>
  </div>

  <div class="gt-section">
    <h2>Nội dung chi tiết theo 7 chuyên đề</h2>
    <p>Mỗi chuyên đề được trình bày xuyên suốt cả 3 Level — kiến thức và kỹ năng tăng dần từ <b>Level 1</b> (nền tảng) → <b>Level 2</b> (thực hành áp dụng) → <b>Level 3</b> (vận dụng nâng cao). Nhấn vào từng chuyên đề để xem chi tiết.</p>
    ${accordions}
  </div>

  <div class="gt-footer-cta">
    <p>Sau khi đọc tài liệu lý thuyết, hãy vào phòng ôn luyện để làm bài trắc nghiệm theo từng Level.</p>
    <a href="/ic3-test" class="gt-drive" style="background:var(--p); color:#fff;">🎯 Vào phòng ôn luyện thi thử IC3 GS6 →</a>
  </div>
</div>`;
}

// ============================================================
// GENERATIVE AI FOUNDATIONS — GIÁO TRÌNH (4 MODULE)
// ============================================================

const GENAI_MODULES = [
  {
    id: 1,
    title: "GIỚI THIỆU GENERATIVE AI & CÁC KHÁI NIỆM NỀN TẢNG",
    icon: "🧠",
    goals: [
      "Làm rõ khái niệm Generative AI và sự khác biệt với AI truyền thống",
      "Khám phá các mô hình chủ đạo như LLMs (Large Language Models), GANs và Autoencoders",
      "Tìm hiểu quy trình hoạt động của AI tạo sinh — từ đầu vào (input), prompt đến kết quả đầu ra (output)",
      "Phân tích tác động xã hội, xu hướng tương lai và tiềm năng nghề nghiệp trong kỷ nguyên AI"
    ],
    topics: [
      "Khái niệm Generative AI (AI tạo sinh) và phân biệt với AI truyền thống (AI phân loại/dự đoán)",
      "Tổng quan các kiến trúc mô hình nền tảng: LLM (Large Language Models), GAN (Generative Adversarial Networks), Autoencoder",
      "Quy trình hoạt động input → prompt → output của một hệ thống AI tạo sinh",
      "Các xu hướng phát triển AI hiện nay và cơ hội nghề nghiệp liên quan đến AI"
    ]
  },
  {
    id: 2,
    title: "CÔNG CỤ, KỸ THUẬT & PROMPT ENGINEERING",
    icon: "🛠️",
    goals: [
      "Làm quen với các nền tảng và công cụ Generative AI hàng đầu như ChatGPT, DALL·E, Copilot, Midjourney…",
      "Học Prompt Engineering — nghệ thuật và khoa học thiết kế câu lệnh hiệu quả",
      "Thực hành với các kỹ thuật few-shot, zero-shot, chaining prompt và cách tối ưu đầu ra",
      "Trực tiếp tạo văn bản, hình ảnh, âm thanh, video hoặc nội dung số sáng tạo bằng công cụ AI"
    ],
    topics: [
      "Tổng quan các công cụ Generative AI phổ biến (ChatGPT, DALL·E, Microsoft Copilot, Midjourney...) và ứng dụng đặc trưng của từng công cụ",
      "Nguyên tắc và kỹ thuật Prompt Engineering — cách thiết kế câu lệnh (prompt) rõ ràng, hiệu quả",
      "Các kỹ thuật nâng cao: zero-shot, few-shot, chain-of-thought/chaining prompt",
      "Thực hành tạo nội dung đa phương tiện (văn bản, hình ảnh, âm thanh, video) bằng công cụ AI"
    ]
  },
  {
    id: 3,
    title: "ỨNG DỤNG THỰC TIỄN & TRIỂN KHAI TRONG CÔNG VIỆC",
    icon: "💼",
    goals: [
      "Khám phá cách Generative AI hỗ trợ công việc và sáng tạo trong giáo dục, marketing, thiết kế, truyền thông, lập trình...",
      "Thực hành xây dựng dự án thực tế — từ ý tưởng, yêu cầu đến sản phẩm hoặc dịch vụ ứng dụng AI",
      "Biết cách đánh giá chất lượng đầu ra, quản lý rủi ro và hiểu rõ giới hạn của mô hình AI"
    ],
    topics: [
      "Ứng dụng Generative AI trong các lĩnh vực: giáo dục (soạn bài giảng, tài liệu học tập), marketing (nội dung quảng cáo, ý tưởng chiến dịch), thiết kế (hình ảnh, layout), truyền thông (bài viết, kịch bản), lập trình (sinh và tối ưu code)",
      "Quy trình xây dựng một dự án ứng dụng AI từ ý tưởng → yêu cầu → sản phẩm/dịch vụ",
      "Tiêu chí đánh giá chất lượng đầu ra của AI, nhận diện rủi ro (thông tin sai lệch, ảo giác — hallucination) và giới hạn của mô hình"
    ]
  },
  {
    id: 4,
    title: "ĐẠO ĐỨC, TRÁCH NHIỆM & LỘ TRÌNH CHINH PHỤC CHỨNG CHỈ",
    icon: "🛡️",
    goals: [
      "Tìm hiểu các nguyên tắc đạo đức, bảo mật dữ liệu, quyền riêng tư và bản quyền nội dung trong kỷ nguyên AI",
      "Phân tích khung pháp lý, quy định và tiêu chuẩn quốc tế liên quan đến việc ứng dụng AI tạo sinh",
      "Nắm vững cấu trúc bài thi chứng chỉ Generative AI Foundations, chiến lược ôn luyện và bí quyết đạt điểm cao"
    ],
    topics: [
      "Các nguyên tắc đạo đức khi sử dụng AI: minh bạch, công bằng, tránh thiên lệch (bias)",
      "Bảo mật dữ liệu, quyền riêng tư và bản quyền nội dung do AI tạo ra",
      "Tổng quan khung pháp lý và tiêu chuẩn quốc tế liên quan đến AI tạo sinh",
      "Cấu trúc bài thi chứng chỉ Generative AI Foundations, các dạng câu hỏi và chiến lược ôn luyện hiệu quả"
    ]
  }
];

// ============================================================
// DRIVE LINK
// ============================================================

const DRIVE_LINK_GENAI = "https://drive.google.com/PLACEHOLDER_GENAI";

// ============================================================
// HÀM RENDER GIAO DIỆN
// ============================================================

function renderModuleAccordion(module) {
  const goalsHtml = module.goals.map(g => `<li>${g}</li>`).join('');
  const topicsHtml = module.topics.map(t => `<li>${t}</li>`).join('');

  return `
    <div class="gt-acc" id="genai-acc-${module.id}">
      <div class="gt-acc-hdr" onclick="gtToggle('genai-acc-${module.id}')">
        <div class="gt-acc-hdr-left">
          <div class="gt-acc-num" style="background:rgba(0,104,255,0.12); color:var(--cyan);">
            ${module.icon}
          </div>
          <div class="gt-acc-title">Module ${module.id}: ${module.title}</div>
        </div>
        <span class="gt-acc-chevron">▼</span>
      </div>
      <div class="gt-acc-body">
        <div class="gt-acc-section">
          <p class="gt-acc-label">🎯 Mục tiêu:</p>
          <ul class="gt-acc-list">${goalsHtml}</ul>
        </div>
        <div class="gt-acc-section">
          <p class="gt-acc-label">📚 Nội dung chính:</p>
          <ul class="gt-acc-list">${topicsHtml}</ul>
        </div>
      </div>
    </div>
  `;
}

export function getGenAIIntroUI() {
  const accordions = GENAI_MODULES.map(renderModuleAccordion).join('');

  return `${SHARED_STYLE}
<div class="gt-wrap">
  <a href="/courses" class="gt-back">← Quay lại danh sách khóa học</a>

  <div class="gt-hero">
    <span class="gt-badge" style="background:rgba(0,104,255,0.12); color:var(--cyan);">🤖 AI Digital</span>
    <h1 class="gt-title">Giáo trình Generative AI Foundations</h1>
    <p class="gt-subtitle">Làm chủ Generative AI &amp; Chinh phục Chứng chỉ Quốc tế — Generative AI · Prompt Engineering · Ứng dụng thực tế · Đạo đức AI.</p>
    <a href="${DRIVE_LINK_GENAI}" target="_blank" class="gt-drive" style="background:linear-gradient(135deg,var(--cyan),#00a2ff); color:#fff;">📁 Tải tài liệu lý thuyết (Google Drive)</a>
    <span class="gt-note">Link tài liệu sẽ được trung tâm cập nhật đầy đủ trong thời gian tới</span>
  </div>

  <div class="gt-section">
    <h2>📖 Giới thiệu chung</h2>
    <p><strong>Generative AI Foundations</strong> là chứng chỉ quốc tế cung cấp nền tảng kiến thức về Trí tuệ nhân tạo tạo sinh (Generative AI) — lĩnh vực công nghệ đang phát triển mạnh mẽ và có ảnh hưởng sâu rộng đến học tập, công việc và đời sống hiện đại.</p>
    <p>Khóa học giúp học viên nhận diện vai trò và ứng dụng thực tiễn của Generative AI, từ đó xây dựng lộ trình học tập và phương pháp chuẩn bị phù hợp để chinh phục chứng chỉ quốc tế Generative AI Foundations. Khóa học gồm <strong>4 mô-đun</strong> chính, đi từ kiến thức nền tảng → công cụ và kỹ thuật thực hành → ứng dụng thực tế → đạo đức và chuẩn bị thi chứng chỉ.</p>
  </div>

  <div class="gt-section">
    <h2>🎯 Mục tiêu khóa học</h2>
    <ul>
      <li>Nắm vững kiến thức nền tảng về Generative AI và các công cụ tạo sinh nội dung.</li>
      <li>Biết cách ứng dụng Generative AI vào học tập, công việc và sáng tạo nội dung số.</li>
      <li>Xây dựng được kỹ năng prompt engineering, đánh giá và kiểm soát output của AI.</li>
      <li>Hiểu rõ các khía cạnh đạo đức, pháp lý và trách nhiệm khi sử dụng AI.</li>
      <li>Tự tin chuẩn bị cho bài thi chứng chỉ Generative AI Foundations và đạt được kết quả cao.</li>
    </ul>
  </div>

  <div class="gt-section">
    <h2>📚 Nội dung chi tiết 4 Module</h2>
    <p style="margin-bottom:16px;">Nhấn vào từng module để xem mục tiêu và nội dung chính.</p>
    ${accordions}
  </div>

  <div class="gt-footer-cta">
    <p style="font-weight:600;">Sau khi đọc tài liệu lý thuyết, hãy vào phòng ôn luyện để làm bài trắc nghiệm theo từng module.</p>
    <a href="/generative-ai" class="gt-drive" style="background:var(--cyan); color:#fff;">🎯 Vào phòng ôn luyện thi thử Generative AI →</a>
  </div>
</div>`;
}