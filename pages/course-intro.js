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
    l1: {
      goals: ["Truy cập và điều hướng giữa các môi trường kỹ thuật số", "Xác định các thiết bị kỹ thuật số và kết nối", "Giải thích các khái niệm phần mềm cơ bản", "Giải thích các khái niệm phần cứng cơ bản", "Giải thích các khái niệm Hệ điều hành cơ bản", "Giải thích các khái niệm mạng cơ bản"],
      topics: "Hệ điều hành (HĐH), phần mềm vs phần cứng, các loại thiết bị số (máy tính, di động, IoT), cổng kết nối và phụ kiện, khái niệm mạng (LAN, Wi-Fi, Internet), điện toán đám mây."
    },
    l2: {
      goals: ["Tùy chỉnh môi trường kỹ thuật số"],
      topics: "Tùy chỉnh hệ điều hành và môi trường làm việc số: thiết lập cài đặt hệ thống, quản lý ứng dụng và cửa sổ làm việc, tổ chức và quản lý tệp/thư mục, cá nhân hóa giao diện thiết bị để làm việc hiệu quả hơn."
    },
    l3: {
      goals: ["Xác định, khắc phục sự cố và giải quyết các vấn đề kỹ thuật"],
      topics: "Nhận diện các sự cố kỹ thuật thường gặp với thiết bị, phần mềm, kết nối mạng; quy trình xác định nguyên nhân (troubleshooting) và các bước khắc phục cơ bản; khi nào cần liên hệ bộ phận hỗ trợ kỹ thuật (IT support)."
    }
  },
  {
    title: "CÔNG DÂN KỶ NGUYÊN SỐ",
    l1: {
      goals: ["Tạo và quản lý danh tính kỹ thuật số", "Biết, quản lý và bảo vệ danh tiếng kỹ thuật số", "Biết được những hành vi và nội dung kỹ thuật số không phù hợp"],
      topics: "Danh tính số (hồ sơ, bài đăng, dấu chân kỹ thuật số), bảo vệ danh tiếng trực tuyến, hành vi và nội dung số không phù hợp, quyền riêng tư cá nhân."
    },
    l2: {
      goals: ["Áp dụng các tiêu chuẩn về nghi thức kỹ thuật số"],
      topics: "Áp dụng các quy tắc ứng xử (etiquette) phù hợp trong môi trường học tập, công việc và mạng xã hội; nhận biết và xử lý các tình huống giao tiếp số không phù hợp; thực hành các tiêu chuẩn nghi thức số khi tương tác với đồng nghiệp, bạn học, khách hàng."
    },
    l3: {
      goals: ["Trình bày các phương pháp tốt nhất cho công dân kỹ thuật số"],
      topics: "Các phương pháp thực hành tốt nhất (best practices) để trở thành công dân số có trách nhiệm: bảo vệ danh tiếng trực tuyến trong dài hạn, tôn trọng bản quyền và quyền riêng tư của người khác, hành xử có đạo đức trong môi trường học tập và làm việc số."
    }
  },
  {
    title: "QUẢN LÝ THÔNG TIN",
    l1: {
      goals: ["Tìm kiếm các mục trên một trang web cụ thể", "Tìm kiếm thông tin bằng cách sử dụng công cụ tìm kiếm", "Sử dụng các công cụ để thu hẹp tiêu chí tìm kiếm", "Đánh giá tính hợp lý của thông tin"],
      topics: "Công cụ tìm kiếm (search engine), kỹ thuật tìm kiếm nâng cao, phân loại các loại website (chính phủ, giáo dục, thương mại...), đánh giá độ tin cậy của nguồn thông tin."
    },
    l2: {
      goals: ["Quản lý thu thập, lưu trữ và truy xuất dữ liệu trực tuyến"],
      topics: "Thu thập và tổ chức thông tin từ nhiều nguồn trực tuyến; lưu trữ dữ liệu trên máy tính cá nhân và trên đám mây (cloud storage); đặt tên, phân loại, sắp xếp tệp/thư mục theo hệ thống hợp lý để dễ truy xuất sau này."
    },
    l3: {
      goals: ["Đánh giá nguồn thông tin kỹ thuật số từ các kết quả tìm kiếm"],
      topics: "Kỹ năng đánh giá độ tin cậy, tính chính xác và tính thời sự của thông tin tìm được trên Internet; phân biệt nguồn chính thống, nguồn tham khảo và quảng cáo; nhận diện thông tin sai lệch (misinformation) và tin giả (fake news)."
    }
  },
  {
    title: "SÁNG TẠO NỘI DUNG",
    l1: {
      goals: ["Tạo tài liệu và bản trình chiếu cơ bản", "Hiểu về các tham chiếu trong tài liệu", "Biết lưu và sao lưu công việc", "Hiểu khái niệm cơ bản về in ấn"],
      topics: "Sử dụng Microsoft Word (Backstage View, tạo/lưu/in tài liệu), Microsoft PowerPoint (tạo bản trình chiếu cơ bản), tham chiếu trong tài liệu, sao lưu (backup) dữ liệu."
    },
    l2: {
      goals: ["Sử dụng lại tài nguyên kỹ thuật số một cách có trách nhiệm"],
      topics: "Thực hành thao tác trên Microsoft Word, Excel, PowerPoint ở mức trung bình: định dạng văn bản, sử dụng công thức/hàm cơ bản trong Excel, chèn biểu đồ và bảng, thiết kế slide trình chiếu; sử dụng lại hình ảnh, video, văn bản từ nguồn khác đúng quy định bản quyền (Creative Commons, trích dẫn nguồn)."
    },
    l3: {
      goals: ["Tạo, chỉnh sửa và xuất bản hoặc trình bày nội dung phương tiện kỹ thuật số cho một đối tượng cụ thể"],
      topics: "Thực hành nâng cao trên Word/Excel/PowerPoint: tạo tài liệu, bảng tính, bài trình chiếu hoàn chỉnh phục vụ một mục đích và đối tượng cụ thể (báo cáo, thuyết trình, ấn phẩm); xuất bản và chia sẻ nội dung dưới nhiều định dạng (PDF, liên kết chia sẻ, xuất bản trực tuyến)."
    }
  },
  {
    title: "GIAO TIẾP / TRUYỀN THÔNG",
    l1: {
      goals: ["Thể hiện bản thân thông qua các phương tiện kỹ thuật số", "Tương tác với mọi người trong môi trường kỹ thuật số"],
      topics: "Mạng xã hội và blog, các hình thức truyền thông số (email, nhắn tin, video call), nghi thức giao tiếp trực tuyến (netiquette), chia sẻ nội dung có trách nhiệm."
    },
    l2: {
      goals: ["Tương tác với những người khác trong môi trường kỹ thuật số"],
      topics: "Sử dụng email, tin nhắn, video call để trao đổi công việc và học tập; lựa chọn kênh giao tiếp phù hợp với từng tình huống; tham gia thảo luận, phản hồi và tương tác hiệu quả trong nhóm trực tuyến."
    },
    l3: {
      goals: ["Tùy chỉnh tin nhắn và phương tiện cho một đối tượng cụ thể"],
      topics: "Điều chỉnh nội dung, văn phong và hình thức truyền thông (email, tin nhắn, bài đăng, video) phù hợp với từng đối tượng người nhận (cấp trên, đồng nghiệp, khách hàng, công chúng); lựa chọn định dạng và kênh truyền thông hiệu quả nhất cho từng mục đích."
    }
  },
  {
    title: "CỘNG TÁC",
    l1: {
      goals: ["Xác định các khái niệm cộng tác kỹ thuật số", "Xác định các tiêu chuẩn nghi thức kỹ thuật số cho quá trình cộng tác"],
      topics: "Cộng tác đồng bộ (real-time) và bất đồng bộ, công cụ làm việc nhóm trực tuyến (chia sẻ tài liệu, lịch, video conference), quy tắc ứng xử khi cộng tác kỹ thuật số."
    },
    l2: {
      goals: ["Sử dụng công cụ và công nghệ kỹ thuật số để cộng tác trên việc tạo nội dung"],
      topics: "Cộng tác chỉnh sửa tài liệu/bảng tính/bài trình chiếu cùng lúc với nhiều người (Google Docs, Sheets, Slides, Microsoft 365); chia sẻ quyền truy cập tệp; theo dõi lịch sử thay đổi (version history) và bình luận (comment) trong quá trình làm việc nhóm."
    },
    l3: {
      goals: ["Sử dụng công cụ cộng tác để làm việc với người khác để kiểm tra các vấn đề và sự cố"],
      topics: "Sử dụng các công cụ cộng tác trực tuyến (quản lý công việc, theo dõi lỗi/sự cố, lịch chung, không gian làm việc chia sẻ) để cùng nhóm phát hiện, theo dõi và xử lý vấn đề; phối hợp quy trình làm việc nhóm từ xa hiệu quả."
    }
  },
  {
    title: "AN TOÀN VÀ AN NINH",
    l1: {
      goals: ["Mô tả các mối đe dọa bảo mật kỹ thuật số", "Bảo vệ thiết bị và nội dung kỹ thuật số", "Nhận thức về công nghệ thu thập dữ liệu", "Xác định các rủi ro sức khỏe liên quan đến việc sử dụng công nghệ kỹ thuật số"],
      topics: "Các mối đe dọa bảo mật (virus, malware, phishing, hacking), biện pháp bảo vệ thiết bị và dữ liệu (mật khẩu, mã hóa, antivirus), thu thập dữ liệu cá nhân (cookies, theo dõi), sức khỏe khi dùng công nghệ (ergonomics, sử dụng hợp lý)."
    },
    l2: {
      goals: ["Tránh các mối đe dọa về sức khỏe tâm lý trong khi sử dụng công nghệ kỹ thuật số (Catfishing, FOMO)"],
      topics: "Nhận diện các mối đe dọa tâm lý khi sử dụng công nghệ số: Catfishing (giả mạo danh tính), FOMO (sợ bỏ lỡ — Fear Of Missing Out), nghiện mạng xã hội; cách phòng tránh và xử lý khi gặp các tình huống này; xây dựng thói quen sử dụng công nghệ lành mạnh."
    },
    l3: {
      goals: ["Quản lý bảo mật thiết bị (mã hóa, mật khẩu sinh trắc học, virus)"],
      topics: "Các biện pháp bảo mật thiết bị nâng cao: mã hóa dữ liệu (encryption), xác thực sinh trắc học (vân tay, khuôn mặt), quản lý mật khẩu an toàn, nhận diện và phòng chống virus/malware, cập nhật phần mềm bảo mật định kỳ."
    }
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
    <div class="gt-acc" id="ic3-acc-${i + 1}">
      <div class="gt-acc-hdr" onclick="gtToggle('ic3-acc-${i + 1}')">
        <div class="gt-acc-hdr-left">
          <div class="gt-acc-num" style="background:rgba(255,215,0,0.15); color:#B8860B;">${i + 1}</div>
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
// ============================================================
// MOS — HÀM DÙNG CHUNG CHO MOS 2019 & MOS 365 (WORD / EXCEL / POWERPOINT)
// ============================================================

function mosLessonHtml(lesson, idx) {
  const lvl = ['l1', 'l2', 'l3'][idx % 3];
  const goalsHtml = lesson.goals.map(g => `<li>${g}</li>`).join('');
  return `
    <div class="gt-mos-lesson" style="margin-bottom:16px;">
      <span class="gt-lvl-label ${lvl}">Bài ${lesson.no}</span>
      <p style="font-weight:800; margin:6px 0 6px;">${lesson.title}</p>
      <p style="font-weight:700; margin-bottom:4px;">Mục tiêu:</p>
      <ul>${goalsHtml}</ul>
      <p style="font-weight:700; margin-bottom:4px;">Nội dung chính:</p>
      <p>${lesson.topics}</p>
    </div>
  `;
}

function renderMOSPartAccordion(part, prefix) {
  const lessonsHtml = part.lessons.map((l, i) => mosLessonHtml(l, i)).join('');
  return `
    <div class="gt-acc" id="${prefix}-acc-${part.id}">
      <div class="gt-acc-hdr" onclick="gtToggle('${prefix}-acc-${part.id}')">
        <div class="gt-acc-hdr-left">
          <div class="gt-acc-num" style="background:${part.badgeBg}; color:${part.badgeColor};">${part.icon}</div>
          <div class="gt-acc-title">${part.title}</div>
        </div>
        <span class="gt-acc-chevron">▼</span>
      </div>
      <div class="gt-acc-body">
        <p style="color:var(--muted); margin-bottom:14px;">${part.subtitle}</p>
        ${lessonsHtml}
      </div>
    </div>
  `;
}

// ============================================================
// MOS 2019 — GIÁO TRÌNH CHUNG WORD, EXCEL, POWERPOINT
// (Theo chuẩn kỹ năng chính thức Microsoft — Exam MO-100 / MO-200 / MO-300)
// ============================================================

const MOS2019_PARTS = [
  {
    id: 1,
    icon: "📝",
    title: "PHẦN 1 · MOS WORD 2019",
    subtitle: "Exam MO-100 (Word Associate) — Tạo và chỉnh sửa tài liệu văn phòng chuyên nghiệp.",
    badgeBg: "rgba(43,87,154,0.12)",
    badgeColor: "#2B579A",
    lessons: [
      {
        no: 1,
        title: "Quản lý các tài liệu",
        goals: ["Tạo tài liệu mới từ blank hoặc template", "Điều hướng và tìm kiếm nội dung trong tài liệu", "Định dạng tài liệu (page setup, theme, header/footer)", "Lưu, xuất bản và in tài liệu dưới nhiều định dạng", "Kiểm tra tài liệu trước khi hoàn tất (spelling, accessibility, compatibility)"],
        topics: "Tạo mới/mở/chuyển đổi định dạng .doc, .docx, .pdf; điều hướng bằng Go To, Find & Replace, Bookmark; thiết lập trang (margin, orientation, columns), áp dụng Theme/Style Set, Header/Footer, Watermark; lưu và xuất tài liệu (PDF/XPS), thiết lập tùy chọn in; kiểm tra chính tả - ngữ pháp, Document Inspector, Accessibility Checker, Compatibility Checker."
      },
      {
        no: 2,
        title: "Chèn và định dạng văn bản, đoạn văn, và phân vùng tài liệu",
        goals: ["Chèn văn bản và ký hiệu đặc biệt", "Định dạng văn bản và ký tự (font, hiệu ứng)", "Định dạng đoạn văn (căn lề, giãn dòng, tab, sort)", "Tạo và quản lý các section trong tài liệu"],
        topics: "Chèn văn bản, symbol, AutoCorrect; định dạng font chữ, hiệu ứng chữ, WordArt, Format Painter; căn chỉnh đoạn văn, giãn dòng/giãn đoạn, thụt lề, thiết lập tab, sắp xếp (Sort), Borders & Shading; tạo section break để áp dụng bố cục trang khác nhau trong cùng tài liệu (cột báo, hướng trang riêng)."
      },
      {
        no: 3,
        title: "Quản lý bảng và danh sách",
        goals: ["Tạo bảng từ dữ liệu có sẵn hoặc từ đầu", "Định dạng và chỉnh sửa nội dung bảng", "Tạo danh sách một cấp và nhiều cấp"],
        topics: "Tạo bảng (Insert Table, Convert Text to Table); định dạng Table Style, border, cell margin; thêm/xóa hàng-cột, merge/split cell, lặp lại header row, sắp xếp dữ liệu trong bảng; tạo danh sách có thứ tự/không thứ tự, danh sách nhiều cấp (multilevel list), tùy chỉnh ký hiệu và định dạng số thứ tự."
      },
      {
        no: 4,
        title: "Tạo mới và quản lý tài liệu tham khảo",
        goals: ["Tạo và quản lý chú thích cuối trang/cuối tài liệu", "Tạo và cập nhật mục lục (Table of Contents)", "Chèn trích dẫn nguồn và tạo danh mục tài liệu tham khảo"],
        topics: "Chèn và quản lý Footnote/Endnote; tạo mục lục tự động (Table of Contents) và cập nhật khi tài liệu thay đổi; chèn trích dẫn (Citation) theo các kiểu APA/MLA/Chicago, quản lý nguồn tham khảo (Manage Sources) và tạo danh mục tài liệu tham khảo (Bibliography)."
      },
      {
        no: 5,
        title: "Chèn và định dạng phần tử đồ họa",
        goals: ["Chèn hình minh họa (hình ảnh, shape, SmartArt)", "Định dạng và sắp xếp đối tượng đồ họa trên trang", "Thêm văn bản thay thế (Alt Text) cho đối tượng"],
        topics: "Chèn hình ảnh, Shapes, SmartArt, chụp ảnh màn hình (Screenshot/Screen Clipping); chỉnh sửa đối tượng (resize, rotate, crop, Picture/Shape Style, Wrap Text); chèn và định dạng WordArt, Text Box; căn chỉnh, nhóm (group), sắp lớp (layer) các đối tượng; thêm Alt Text hỗ trợ tiếp cận."
      },
      {
        no: 6,
        title: "Quản lý sự cộng tác tài liệu",
        goals: ["Thêm, trả lời và giải quyết bình luận (comments)", "Quản lý theo dõi thay đổi (Track Changes)", "So sánh và kết hợp nhiều phiên bản tài liệu"],
        topics: "Thêm/xóa/trả lời Comment; bật/tắt Track Changes, chấp nhận hoặc từ chối từng thay đổi; so sánh (Compare) và kết hợp (Combine) nhiều phiên bản tài liệu; hạn chế chỉnh sửa (Restrict Editing), đặt mật khẩu bảo vệ tài liệu."
      }
    ]
  },
  {
    id: 2,
    icon: "📊",
    title: "PHẦN 2 · MOS EXCEL 2019",
    subtitle: "Exam MO-200 (Excel Associate) — Xử lý dữ liệu, công thức và biểu đồ trong bảng tính.",
    badgeBg: "rgba(33,115,70,0.12)",
    badgeColor: "#217346",
    lessons: [
      {
        no: 1,
        title: "Quản lý worksheets và workbooks",
        goals: ["Tạo và quản lý worksheet, workbook", "Điều hướng và tùy chỉnh chế độ xem", "Cấu hình nội dung để in ấn và cộng tác"],
        topics: "Tạo workbook mới, nhập dữ liệu từ file khác; điều hướng bằng Name Box, Go To, Hyperlink; đổi tên/di chuyển/sao chép/ẩn-hiện worksheet, đổi màu tab; tùy chỉnh view (Freeze Panes, Split, Zoom, Normal/Page Layout View); thiết lập Print Area, Page Setup, Print Titles; chia sẻ và bảo vệ workbook/worksheet."
      },
      {
        no: 2,
        title: "Quản lý dữ liệu ô và vùng",
        goals: ["Thao tác và định dạng dữ liệu trong ô, vùng", "Tóm tắt dữ liệu trực quan bằng công cụ có sẵn", "Đặt tên vùng và kiểm tra tính hợp lệ của dữ liệu"],
        topics: "Chèn/xóa/di chuyển/sao chép dữ liệu, sử dụng Paste Special; định dạng ô và vùng (Format Cells, Cell Styles, Conditional Formatting); tóm tắt dữ liệu bằng Sparklines, Quick Analysis; tạo và sử dụng Named Range; thiết lập Data Validation."
      },
      {
        no: 3,
        title: "Quản lý bảng và bảng dữ liệu",
        goals: ["Tạo Excel Table từ vùng dữ liệu", "Định dạng và chỉnh sửa bảng dữ liệu", "Lọc và sắp xếp dữ liệu trong bảng"],
        topics: "Tạo Excel Table (Insert Table); áp dụng Table Style, bật/tắt Header Row - Total Row - Banded Rows; thêm/xóa hàng-cột, loại bỏ dữ liệu trùng (Remove Duplicates); lọc (Filter), sắp xếp (Sort) theo nhiều tiêu chí, sử dụng Slicer."
      },
      {
        no: 4,
        title: "Thực hiện các thao tác bằng cách sử dụng công thức và hàm",
        goals: ["Sử dụng tham chiếu ô đúng cách trong công thức", "Tính toán dữ liệu bằng các hàm cơ bản", "Định dạng, kiểm tra và sửa lỗi công thức"],
        topics: "Sử dụng tham chiếu tương đối/tuyệt đối/hỗn hợp, tham chiếu tới sheet/workbook khác; áp dụng hàm tính toán (SUM, AVERAGE, COUNT, MAX/MIN), hàm điều kiện (IF, AND, OR), hàm văn bản (LEFT, RIGHT, CONCATENATE), hàm tra cứu (VLOOKUP, HLOOKUP); kiểm tra và sửa lỗi công thức bằng Trace Precedents/Dependents, Error Checking, Show Formulas."
      },
      {
        no: 5,
        title: "Quản lý và xử lý biểu đồ",
        goals: ["Tạo biểu đồ (Chart) từ dữ liệu bảng tính", "Định dạng và tùy chỉnh các thành phần biểu đồ", "Chèn và định dạng đối tượng đồ họa trong bảng tính"],
        topics: "Tạo Chart phù hợp với loại dữ liệu; tùy chỉnh Chart Style, Layout, thêm/sửa Chart Title, Legend, Data Label; di chuyển biểu đồ sang sheet riêng; chèn và định dạng Shapes, SmartArt, hình ảnh trong bảng tính; tạo và tùy chỉnh Sparkline."
      }
    ]
  },
  {
    id: 3,
    icon: "📽️",
    title: "PHẦN 3 · MOS POWERPOINT 2019",
    subtitle: "Exam MO-300 (PowerPoint Associate) — Thiết kế và trình bày bài thuyết trình chuyên nghiệp.",
    badgeBg: "rgba(210,71,38,0.12)",
    badgeColor: "#D24726",
    lessons: [
      {
        no: 1,
        title: "Quản lý bài thuyết trình",
        goals: ["Tạo bài thuyết trình mới từ blank hoặc template", "Định dạng bài thuyết trình bằng Slide Master, Theme", "Lưu, xuất bản và in bài thuyết trình"],
        topics: "Tạo presentation mới; áp dụng Slide Size, Theme, chỉnh sửa Slide Master và Handout Master; lưu/xuất dưới nhiều định dạng (PDF, video, đóng gói trình chiếu); in Handouts, Notes Pages; thêm comment để cộng tác trên bài thuyết trình."
      },
      {
        no: 2,
        title: "Quản lý trang trình chiếu",
        goals: ["Chèn, sắp xếp và tổ chức slide theo section", "Áp dụng và thay đổi Slide Layout", "Định dạng nền (Background) cho từng slide"],
        topics: "Chèn slide mới và chọn Layout phù hợp; sao chép, nhân bản, sắp xếp lại thứ tự, ẩn/hiện slide; nhóm slide thành Section; thay đổi Slide Layout, định dạng Background riêng cho từng slide."
      },
      {
        no: 3,
        title: "Chèn và định dạng văn bản, hình khối, và hình ảnh",
        goals: ["Định dạng văn bản trong placeholder và text box", "Chèn và định dạng hình khối (Shapes)", "Chèn, chỉnh sửa và sắp xếp hình ảnh trên slide"],
        topics: "Định dạng văn bản (font, căn lề, bullet/numbering, WordArt); chèn và định dạng Shapes, Text Box; chèn hình ảnh, crop/xoay/áp dụng Picture Style; căn chỉnh, nhóm và sắp lớp các đối tượng trên slide."
      },
      {
        no: 4,
        title: "Chèn bảng, biểu đồ, SmartArt, mô hình 3D, và đoạn phim",
        goals: ["Chèn và định dạng bảng, biểu đồ trên slide", "Tạo và tùy chỉnh SmartArt", "Chèn mô hình 3D, âm thanh và video"],
        topics: "Chèn và định dạng Table, Chart; tạo SmartArt (chuyển văn bản thành SmartArt, thêm hình, đổi màu/layout); chèn mô hình 3D (3D Models) và xoay góc nhìn; chèn Audio/Video, thiết lập Playback Options và cắt (Trim) media."
      },
      {
        no: 5,
        title: "Áp dụng hiệu ứng chuyển tiếp và hoạt cảnh",
        goals: ["Áp dụng và tùy chỉnh hiệu ứng chuyển slide", "Áp dụng hiệu ứng hoạt cảnh cho đối tượng", "Sắp xếp thứ tự và thời gian hoạt cảnh"],
        topics: "Áp dụng Transitions giữa các slide, tùy chỉnh thời gian và âm thanh chuyển cảnh; áp dụng Animations cho văn bản/đối tượng; sử dụng Animation Pane để sắp xếp thứ tự, thiết lập Trigger và thời gian hoạt cảnh."
      }
    ]
  }
];

const DRIVE_LINK_MOS2019 = "https://drive.google.com/PLACEHOLDER_MOS2019";

export function getMOS2019IntroUI() {
  const accordions = MOS2019_PARTS.map(p => renderMOSPartAccordion(p, 'mos2019')).join('');

  return `${SHARED_STYLE}
<div class="gt-wrap">
  <a href="/courses" class="gt-back">← Quay lại danh sách khóa học</a>

  <div class="gt-hero">
    <span class="gt-badge" style="background:rgba(43,87,154,0.12); color:#2B579A;">💼 MOS 2019 · Microsoft</span>
    <h1 class="gt-title">Giáo trình MOS 2019 — Word, Excel &amp; PowerPoint</h1>
    <p class="gt-subtitle">Chứng chỉ Tin học Văn phòng Quốc tế do Microsoft trực tiếp cấp — Exam MO-100 · MO-200 · MO-300.</p>
    <a href="${DRIVE_LINK_MOS2019}" target="_blank" class="gt-drive" style="background:linear-gradient(135deg,#2B579A,#1a3a6e); color:#fff;">📁 Tải tài liệu lý thuyết (Google Drive)</a>
    <span class="gt-note">Link tài liệu sẽ được trung tâm cập nhật đầy đủ trong thời gian tới</span>
  </div>

  <div class="gt-section">
    <h2>Giới thiệu chung</h2>
    <p><strong>MOS (Microsoft Office Specialist) 2019</strong> là chứng chỉ Tin học Văn phòng Quốc tế được cấp trực tiếp bởi Tập đoàn Microsoft, xác nhận năng lực sử dụng thành thạo các ứng dụng Word, Excel và PowerPoint phiên bản 2019. Đây là chứng chỉ được nhiều trường đại học công nhận làm chuẩn đầu ra và được doanh nghiệp đánh giá cao khi tuyển dụng.</p>
    <p>Khóa học gồm <strong>3 phần</strong> tương ứng 3 môn thi độc lập (Word, Excel, PowerPoint). Học viên có thể học và thi từng môn riêng lẻ hoặc trọn bộ để lấy đầy đủ chứng chỉ MOS Specialist.</p>
    <table class="gt-table">
      <tr><th>Môn thi</th><th>Mã Exam</th><th>Nội dung chính</th></tr>
      <tr><td><b>Word</b></td><td>MO-100</td><td>Soạn thảo, định dạng và cộng tác trên tài liệu văn bản</td></tr>
      <tr><td><b>Excel</b></td><td>MO-200</td><td>Xử lý dữ liệu, công thức, hàm và biểu đồ trong bảng tính</td></tr>
      <tr><td><b>PowerPoint</b></td><td>MO-300</td><td>Thiết kế và trình bày bài thuyết trình chuyên nghiệp</td></tr>
    </table>
  </div>

  <div class="gt-section">
    <h2>🎯 Mục tiêu khóa học</h2>
    <ul>
      <li>Thành thạo các thao tác cốt lõi trên Word, Excel, PowerPoint 2019 theo đúng chuẩn kỹ năng của Microsoft.</li>
      <li>Áp dụng được kiến thức vào công việc thực tế: soạn thảo văn bản, xử lý số liệu, thuyết trình chuyên nghiệp.</li>
      <li>Làm quen với định dạng đề thi performance-based (thao tác trực tiếp trên ứng dụng thật).</li>
      <li>Tự tin đạt điểm 700/1000 trở lên để nhận chứng chỉ MOS do Microsoft cấp.</li>
    </ul>
  </div>

  <div class="gt-section">
    <h2>📚 Nội dung chi tiết 3 phần</h2>
    <p style="margin-bottom:16px;">Nhấn vào từng phần để xem chi tiết các bài học, mục tiêu và nội dung chính.</p>
    ${accordions}
  </div>

  <div class="gt-footer-cta">
    <p style="font-weight:600;">Sau khi đọc tài liệu lý thuyết, hãy vào phòng ôn luyện để làm bài thi thử theo từng môn.</p>
    <a href="/mos-test" class="gt-drive" style="background:#2B579A; color:#fff;">🎯 Vào phòng ôn luyện thi thử MOS 2019 →</a>
  </div>
</div>`;
}

// ============================================================
// MOS 365 — GIÁO TRÌNH CHUNG WORD, EXCEL, POWERPOINT
// (Cùng chuẩn kỹ năng MO-100/MO-200/MO-300, thực hành trên Microsoft 365
// với các tính năng đám mây, cộng tác thời gian thực và AI hỗ trợ)
// ============================================================

const MOS365_PARTS = [
  {
    id: 1,
    icon: "📝",
    title: "PHẦN 1 · MOS WORD 365",
    subtitle: "Word Associate (Microsoft 365) — Soạn thảo và cộng tác tài liệu trên nền tảng đám mây.",
    badgeBg: "rgba(16,124,16,0.12)",
    badgeColor: "#107C10",
    lessons: [
      {
        no: 1,
        title: "Quản lý các tài liệu trên Word 365",
        goals: ["Tạo, mở và lưu tài liệu trực tiếp trên OneDrive/SharePoint", "Điều hướng và định dạng tài liệu", "Sử dụng AutoSave và Version History", "Kiểm tra tài liệu với công cụ hỗ trợ AI"],
        topics: "Tạo/mở/lưu tài liệu trên OneDrive, SharePoint với AutoSave luôn bật; điều hướng bằng Search, Bookmark, Cross-reference; thiết lập page setup, Theme, Header/Footer, Watermark; xem lại lịch sử phiên bản (Version History); dùng Editor (trợ lý viết AI) thay cho Spelling & Grammar truyền thống, kiểm tra Accessibility."
      },
      {
        no: 2,
        title: "Chèn và định dạng văn bản, đoạn văn, và phân vùng tài liệu",
        goals: ["Chèn văn bản bằng gõ phím hoặc Dictate (nhập liệu giọng nói)", "Định dạng văn bản và đoạn văn", "Tạo và quản lý section trong tài liệu"],
        topics: "Chèn văn bản, symbol, sử dụng Dictate để nhập liệu bằng giọng nói; định dạng font, hiệu ứng chữ, WordArt; căn chỉnh đoạn văn, tab, sort, Borders & Shading; tạo section break để áp dụng bố cục trang khác nhau; dùng Immersive Reader hỗ trợ đọc tài liệu."
      },
      {
        no: 3,
        title: "Quản lý bảng và danh sách",
        goals: ["Tạo và định dạng bảng dữ liệu", "Chỉnh sửa nội dung và sắp xếp dữ liệu trong bảng", "Tạo danh sách một cấp và nhiều cấp"],
        topics: "Tạo bảng, áp dụng Table Style; thêm/xóa hàng-cột, merge/split cell, sắp xếp dữ liệu trong bảng; tạo danh sách có thứ tự/không thứ tự và danh sách nhiều cấp, tùy chỉnh ký hiệu."
      },
      {
        no: 4,
        title: "Tạo mới và quản lý tài liệu tham khảo",
        goals: ["Tạo chú thích cuối trang/cuối tài liệu", "Tạo và cập nhật mục lục tự động", "Chèn trích dẫn và tạo danh mục tham khảo với sự hỗ trợ của Researcher"],
        topics: "Chèn Footnote/Endnote; tạo và cập nhật Table of Contents; chèn Citation theo chuẩn APA/MLA/Chicago, quản lý nguồn và tạo Bibliography; sử dụng công cụ Researcher tích hợp trong Word 365 để tìm và trích dẫn nguồn nhanh hơn."
      },
      {
        no: 5,
        title: "Chèn và định dạng phần tử đồ họa",
        goals: ["Chèn hình ảnh, shape, SmartArt và mô hình 3D", "Định dạng và sắp xếp đối tượng đồ họa", "Thêm Alt Text và kiểm tra khả năng tiếp cận"],
        topics: "Chèn hình ảnh (kể cả từ kho ảnh trực tuyến tích hợp), Shapes, SmartArt, mô hình 3D; chỉnh sửa, căn chỉnh, nhóm và sắp lớp đối tượng; thêm Alt Text tự động gợi ý bởi AI; kiểm tra Accessibility Checker."
      },
      {
        no: 6,
        title: "Quản lý sự cộng tác tài liệu",
        goals: ["Cộng tác chỉnh sửa tài liệu theo thời gian thực (co-authoring)", "Thêm bình luận và gắn thẻ (@mention) người cùng làm việc", "Quản lý Track Changes và chia sẻ quyền truy cập"],
        topics: "Cộng tác nhiều người chỉnh sửa tài liệu cùng lúc (real-time co-authoring) trên OneDrive/SharePoint; thêm Comment kèm @mention để gửi thông báo cho đồng nghiệp; bật/tắt Track Changes, chấp nhận/từ chối thay đổi; chia sẻ tài liệu và phân quyền xem/chỉnh sửa."
      }
    ]
  },
  {
    id: 2,
    icon: "📊",
    title: "PHẦN 2 · MOS EXCEL 365",
    subtitle: "Excel Associate (Microsoft 365) — Phân tích dữ liệu với hàm mới và công cụ AI hỗ trợ.",
    badgeBg: "rgba(16,124,16,0.12)",
    badgeColor: "#107C10",
    lessons: [
      {
        no: 1,
        title: "Quản lý worksheets và workbooks",
        goals: ["Tạo và quản lý workbook lưu trữ trên đám mây", "Tùy chỉnh chế độ xem, kể cả Sheet View riêng cho từng người", "Cấu hình nội dung để in ấn và chia sẻ cộng tác"],
        topics: "Tạo workbook với AutoSave trên OneDrive/SharePoint; đổi tên/di chuyển/ẩn-hiện worksheet; tùy chỉnh Freeze Panes, Zoom, và Sheet View (mỗi người xem/lọc dữ liệu riêng mà không ảnh hưởng người khác); thiết lập Print Area, Page Setup; chia sẻ workbook để nhiều người cùng truy cập."
      },
      {
        no: 2,
        title: "Quản lý dữ liệu ô và vùng",
        goals: ["Thao tác và định dạng dữ liệu trong ô, vùng", "Sử dụng Data Types (Stocks, Geography) để làm giàu dữ liệu", "Phân tích dữ liệu nhanh với Ideas"],
        topics: "Chèn/xóa/định dạng dữ liệu, Conditional Formatting, Sparklines; áp dụng Data Types liên kết (Stocks, Geography) để tự động lấy thêm thuộc tính dữ liệu; dùng công cụ Ideas để Excel tự đề xuất biểu đồ và xu hướng từ dữ liệu; thiết lập Data Validation."
      },
      {
        no: 3,
        title: "Quản lý bảng và bảng dữ liệu",
        goals: ["Tạo và định dạng Excel Table", "Lọc, sắp xếp dữ liệu bằng hàm mảng động (dynamic array)", "Loại bỏ dữ liệu trùng lặp"],
        topics: "Tạo Excel Table, áp dụng Table Style, Header/Total Row; dùng các hàm mảng động SORT, FILTER, UNIQUE để lọc và sắp xếp dữ liệu tự động 'tràn' (spill) sang các ô lân cận; loại bỏ dữ liệu trùng (Remove Duplicates); sử dụng Slicer."
      },
      {
        no: 4,
        title: "Thực hiện các thao tác bằng cách sử dụng công thức và hàm",
        goals: ["Sử dụng tham chiếu ô đúng cách trong công thức", "Áp dụng các hàm tra cứu và điều kiện thế hệ mới", "Kiểm tra và sửa lỗi công thức"],
        topics: "Tham chiếu tương đối/tuyệt đối/hỗn hợp; hàm tính toán cơ bản (SUM, AVERAGE, COUNT); hàm điều kiện IFS (nhiều điều kiện gọn hơn IF lồng nhau); hàm tra cứu thế hệ mới XLOOKUP (thay thế linh hoạt cho VLOOKUP/HLOOKUP); hàm văn bản TEXTJOIN; kiểm tra công thức bằng Trace Precedents/Dependents, Error Checking."
      },
      {
        no: 5,
        title: "Quản lý và xử lý biểu đồ",
        goals: ["Tạo biểu đồ từ dữ liệu, kể cả biểu đồ được AI đề xuất", "Định dạng và tùy chỉnh các thành phần biểu đồ", "Chèn đối tượng đồ họa trong bảng tính"],
        topics: "Tạo Chart theo cách truyền thống hoặc để Excel tự đề xuất qua Ideas/Recommended Charts; tùy chỉnh Chart Style, Title, Legend, Data Label; chèn Shapes, SmartArt, hình ảnh; tạo và tùy chỉnh Sparkline."
      }
    ]
  },
  {
    id: 3,
    icon: "📽️",
    title: "PHẦN 3 · MOS POWERPOINT 365",
    subtitle: "PowerPoint Associate (Microsoft 365) — Thiết kế slide thông minh và trình bày trực tuyến.",
    badgeBg: "rgba(16,124,16,0.12)",
    badgeColor: "#107C10",
    lessons: [
      {
        no: 1,
        title: "Quản lý bài thuyết trình",
        goals: ["Tạo và lưu bài thuyết trình trên đám mây với AutoSave", "Định dạng bằng Slide Master, Theme", "Xuất bản, ghi hình và chia sẻ trình chiếu trực tuyến"],
        topics: "Tạo presentation lưu trên OneDrive/SharePoint với AutoSave; áp dụng Slide Size, Theme, chỉnh Slide Master/Handout Master; xuất video, ghi hình bài thuyết trình (Record Slide Show) kèm giọng nói và webcam; chia sẻ liên kết trình chiếu trực tuyến, thêm comment cộng tác."
      },
      {
        no: 2,
        title: "Quản lý trang trình chiếu",
        goals: ["Chèn, sắp xếp slide và tổ chức theo section", "Áp dụng Slide Layout và Designer để bố cục nhanh", "Sử dụng Zoom để điều hướng phi tuyến tính"],
        topics: "Chèn slide, chọn Layout, sắp xếp thứ tự, nhóm Section; dùng Designer để nhận đề xuất bố cục thiết kế slide tự động dựa trên nội dung; sử dụng Summary Zoom/Section Zoom để tạo trình chiếu điều hướng linh hoạt giữa các phần."
      },
      {
        no: 3,
        title: "Chèn và định dạng văn bản, hình khối, và hình ảnh",
        goals: ["Định dạng văn bản trong placeholder và text box", "Chèn, chỉnh sửa hình ảnh với công cụ AI (xóa nền, Ideas)", "Sắp xếp đối tượng trên slide"],
        topics: "Định dạng văn bản (font, căn lề, bullet, WordArt); chèn Shapes, Text Box; chèn hình ảnh và dùng Remove Background để xóa phông nền tự động, Designer Ideas gợi ý bố cục hình ảnh; căn chỉnh, nhóm, sắp lớp đối tượng."
      },
      {
        no: 4,
        title: "Chèn bảng, biểu đồ, SmartArt, mô hình 3D, và đoạn phim",
        goals: ["Chèn và định dạng bảng, biểu đồ trên slide", "Tạo SmartArt và chèn mô hình 3D", "Chèn media và bật phụ đề trực tiếp (Live Captions)"],
        topics: "Chèn Table, Chart; tạo SmartArt; chèn mô hình 3D và xoay góc nhìn; chèn Audio/Video, thiết lập Playback Options; bật Live Captions & Subtitles để tự động hiển thị phụ đề khi thuyết trình trực tiếp."
      },
      {
        no: 5,
        title: "Áp dụng hiệu ứng chuyển tiếp và hoạt cảnh",
        goals: ["Áp dụng hiệu ứng chuyển slide, đặc biệt hiệu ứng Morph", "Áp dụng và sắp xếp hoạt cảnh cho đối tượng", "Tùy chỉnh thời gian và trình tự hiệu ứng"],
        topics: "Áp dụng Transitions, đặc biệt hiệu ứng Morph để tạo chuyển động mượt giữa hai slide có đối tượng tương đồng; áp dụng Animations cho văn bản/đối tượng; dùng Animation Pane để sắp xếp thứ tự, thiết lập Trigger và thời gian."
      }
    ]
  }
];

const DRIVE_LINK_MOS365 = "https://drive.google.com/PLACEHOLDER_MOS365";

export function getMOS365IntroUI() {
  const accordions = MOS365_PARTS.map(p => renderMOSPartAccordion(p, 'mos365')).join('');

  return `${SHARED_STYLE}
<div class="gt-wrap">
  <a href="/courses" class="gt-back">← Quay lại danh sách khóa học</a>

  <div class="gt-hero">
    <span class="gt-badge" style="background:rgba(16,124,16,0.12); color:#107C10;">☁️ MOS 365 · Microsoft</span>
    <h1 class="gt-title">Giáo trình MOS 365 — Word, Excel &amp; PowerPoint</h1>
    <p class="gt-subtitle">Chứng chỉ Tin học Văn phòng Quốc tế thực hành trên Microsoft 365 — cộng tác đám mây &amp; công cụ AI hỗ trợ.</p>
    <a href="${DRIVE_LINK_MOS365}" target="_blank" class="gt-drive" style="background:linear-gradient(135deg,#107C10,#0b5c0b); color:#fff;">📁 Tải tài liệu lý thuyết (Google Drive)</a>
    <span class="gt-note">Link tài liệu sẽ được trung tâm cập nhật đầy đủ trong thời gian tới</span>
  </div>

  <div class="gt-section">
    <h2>Giới thiệu chung</h2>
    <p><strong>MOS 365</strong> dùng chung cấu trúc kỹ năng chuẩn của Microsoft (Exam MO-100 · MO-200 · MO-300 — áp dụng cho cả Office 365 và Office 2019), nhưng học viên thực hành trực tiếp trên phiên bản <strong>Microsoft 365</strong> mới nhất với các tính năng lưu trữ đám mây, cộng tác thời gian thực và công cụ hỗ trợ bởi AI (Editor, Designer, Ideas, Dictate...).</p>
    <p>Khóa học gồm <strong>3 phần</strong> tương ứng 3 môn thi độc lập (Word, Excel, PowerPoint), giúp học viên vừa đạt chuẩn chứng chỉ quốc tế, vừa làm chủ các công cụ văn phòng hiện đại nhất đang được doanh nghiệp sử dụng.</p>
    <table class="gt-table">
      <tr><th>Môn thi</th><th>Trọng tâm khác biệt so với 2019</th></tr>
      <tr><td><b>Word</b></td><td>Co-authoring thời gian thực, Editor, Dictate, Researcher, Version History</td></tr>
      <tr><td><b>Excel</b></td><td>Hàm XLOOKUP/IFS/TEXTJOIN, mảng động (SORT/FILTER/UNIQUE), Data Types, Ideas</td></tr>
      <tr><td><b>PowerPoint</b></td><td>Designer, Morph, Zoom, Record Slide Show, Live Captions</td></tr>
    </table>
  </div>

  <div class="gt-section">
    <h2>🎯 Mục tiêu khóa học</h2>
    <ul>
      <li>Thành thạo các kỹ năng cốt lõi trên Word, Excel, PowerPoint theo chuẩn Microsoft Office Specialist.</li>
      <li>Làm chủ các công cụ AI và cộng tác đám mây mới nhất trên nền tảng Microsoft 365.</li>
      <li>Áp dụng vào công việc thực tế: làm việc nhóm từ xa, phân tích dữ liệu nhanh, thiết kế slide chuyên nghiệp.</li>
      <li>Tự tin đạt điểm 700/1000 trở lên để nhận chứng chỉ MOS do Microsoft cấp.</li>
    </ul>
  </div>

  <div class="gt-section">
    <h2>📚 Nội dung chi tiết 3 phần</h2>
    <p style="margin-bottom:16px;">Nhấn vào từng phần để xem chi tiết các bài học, mục tiêu và nội dung chính.</p>
    ${accordions}
  </div>

  <div class="gt-footer-cta">
    <p style="font-weight:600;">Sau khi đọc tài liệu lý thuyết, hãy vào phòng ôn luyện để làm bài thi thử theo từng môn.</p>
    <a href="/mos-test" class="gt-drive" style="background:#107C10; color:#fff;">🎯 Vào phòng ôn luyện thi thử MOS 365 →</a>
  </div>
</div>`;
}

// ============================================================
// AI PRODUCTIVITY INTRO — wrapper cho ai_productivity_intro.js
// ============================================================
import { renderAIPIntro } from "./ai_productivity_intro.js";

export function getAIPIntroUI() {
  return renderAIPIntro();
}