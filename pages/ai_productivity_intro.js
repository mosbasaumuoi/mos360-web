// ============================================================
// MOS360 AI PRODUCTIVITY FOUNDATION
// Giới thiệu khóa học — Premium Version 2.0
// Version: 2.1.0
// ============================================================

// ============================================================
// 1. CONFIGURATION
// ============================================================
const AI_PRODUCTIVITY_CONFIG = {
  courseId: "AI_PRODUCTIVITY",
  courseName: "AI Productivity Foundation",
  level: "FOUNDATION LEVEL",
  framework: "MOS360 AI Competency™",
  version: "2.1.0",
  primaryColor: "#0068FF",
  accentColor: "#00D4FF",
  totalQuestions: 300,
  totalCompetencies: 8,
  driveLink: "https://drive.google.com/PLACEHOLDER_AI_PRODUCTIVITY"
};

// ============================================================
// 2. DATA — 8 COMPETENCIES (Nâng cấp với Difficulty)
// ============================================================
const AI_PRODUCTIVITY_COMPETENCIES = [
  {
    id: 1,
    icon: "🧠",
    title: "Think with AI",
    subtitle: "AI Mindset",
    color: "#0068FF",
    questionCount: 35,
    difficulty: "Beginner",
    difficultyColor: "#00B894",
    estimatedTime: "25 phút",
    description: "Xây dựng tư duy làm việc cộng tác cùng AI, hiểu đúng vai trò và giới hạn.",
    goals: [
      "Hiểu AI là công cụ hỗ trợ thay vì thay thế con người.",
      "Xây dựng tư duy AI-First trong học tập và công việc.",
      "Nhận biết giới hạn, điểm mạnh và trách nhiệm khi sử dụng AI.",
      "Hình thành phương pháp làm việc hiệu quả với AI."
    ],
    topics: "Giới thiệu AI Productivity; AI truyền thống và Generative AI; AI Copilot; AI Assistant; Human + AI Collaboration; tư duy phản biện; kiểm chứng thông tin; đạo đức và trách nhiệm khi sử dụng AI."
  },
  {
    id: 2,
    icon: "💬",
    title: "Communicate with AI",
    subtitle: "Giao tiếp và soạn thảo",
    color: "#7B61FF",
    questionCount: 40,
    difficulty: "Beginner",
    difficultyColor: "#00B894",
    estimatedTime: "30 phút",
    description: "Sử dụng AI để giao tiếp hiệu quả và viết chuyên nghiệp hơn.",
    goals: [
      "Sử dụng AI để giao tiếp hiệu quả hơn.",
      "Viết email, báo cáo và tài liệu chuyên nghiệp.",
      "Điều chỉnh giọng văn theo từng đối tượng.",
      "Nâng cao chất lượng giao tiếp trong doanh nghiệp."
    ],
    topics: "Email; Chat; Meeting Notes; Báo cáo; Tóm tắt; Rewrite; Tone of Voice; Business Writing; Translation; Communication Workflow."
  },
  {
    id: 3,
    icon: "🔍",
    title: "Research with AI",
    subtitle: "Nghiên cứu và khai thác thông tin",
    color: "#00B894",
    questionCount: 35,
    difficulty: "Intermediate",
    difficultyColor: "#FDCB6E",
    estimatedTime: "28 phút",
    description: "Tìm kiếm, tổng hợp và kiểm chứng thông tin nhanh hơn với AI.",
    goals: [
      "Tìm kiếm thông tin nhanh hơn.",
      "Đánh giá và kiểm chứng nguồn dữ liệu.",
      "Tổng hợp nhiều tài liệu thành báo cáo.",
      "Hỗ trợ nghiên cứu và học tập."
    ],
    topics: "Research Workflow; Information Verification; Compare Sources; Summarization; Knowledge Extraction; Fact Checking; AI Search."
  },
  {
    id: 4,
    icon: "📊",
    title: "Office with AI",
    subtitle: "Làm việc với Microsoft Office",
    color: "#E17055",
    questionCount: 40,
    difficulty: "Intermediate",
    difficultyColor: "#FDCB6E",
    estimatedTime: "35 phút",
    description: "Tăng tốc xử lý công việc văn phòng với AI trong Word, Excel, PowerPoint.",
    goals: [
      "Ứng dụng AI vào Word, Excel, PowerPoint và Outlook.",
      "Tăng tốc xử lý công việc văn phòng.",
      "Phân tích dữ liệu và tạo báo cáo.",
      "Tạo bài trình bày chuyên nghiệp."
    ],
    topics: "Word AI; Excel AI; PowerPoint AI; Outlook AI; Microsoft Copilot; Document Workflow; Report Automation."
  },
  {
    id: 5,
    icon: "📅",
    title: "Plan with AI",
    subtitle: "Quản lý cuộc họp và kế hoạch",
    color: "#FDCB6E",
    questionCount: 35,
    difficulty: "Intermediate",
    difficultyColor: "#FDCB6E",
    estimatedTime: "25 phút",
    description: "Tổ chức cuộc họp hiệu quả và lập kế hoạch thông minh với AI.",
    goals: [
      "Chuẩn bị cuộc họp hiệu quả.",
      "Tạo Agenda và Meeting Notes.",
      "Theo dõi Action Items.",
      "Lập kế hoạch công việc bằng AI."
    ],
    topics: "Meeting Preparation; Agenda; Meeting Summary; Action Items; Weekly Planning; Task Prioritization."
  },
  {
    id: 6,
    icon: "⚖️",
    title: "Decide with AI",
    subtitle: "Ra quyết định với AI",
    color: "#6C5CE7",
    questionCount: 40,
    difficulty: "Advanced",
    difficultyColor: "#E17055",
    estimatedTime: "32 phút",
    description: "Phân tích dữ liệu và ra quyết định sáng suốt với sự hỗ trợ của AI.",
    goals: [
      "Phân tích dữ liệu trước khi ra quyết định.",
      "Đánh giá nhiều phương án khác nhau.",
      "Quản lý rủi ro.",
      "Ra quyết định có cơ sở dữ liệu."
    ],
    topics: "Decision Framework; Risk Analysis; Scenario Planning; Business Analysis; KPI Evaluation."
  },
  {
    id: 7,
    icon: "⚙️",
    title: "Workflow with AI",
    subtitle: "Thiết kế quy trình làm việc",
    color: "#00CEC9",
    questionCount: 40,
    difficulty: "Advanced",
    difficultyColor: "#E17055",
    estimatedTime: "35 phút",
    description: "Thiết kế quy trình làm việc thông minh với AI để tăng năng suất.",
    goals: [
      "Thiết kế AI Workflow cho công việc hằng ngày.",
      "Chuẩn hóa quy trình doanh nghiệp.",
      "Kết hợp AI và con người hiệu quả.",
      "Tối ưu năng suất làm việc."
    ],
    topics: "Workflow Design; Automation Thinking; AI Collaboration; Process Optimization; Continuous Improvement."
  },
  {
    id: 8,
    icon: "🚀",
    title: "Grow with AI",
    subtitle: "Thực chiến AI Productivity",
    color: "#FD79A8",
    questionCount: 35,
    difficulty: "Advanced",
    difficultyColor: "#E17055",
    estimatedTime: "30 phút",
    description: "Vận dụng tổng hợp kiến thức để giải quyết các tình huống thực tế.",
    goals: [
      "Ứng dụng tổng hợp toàn bộ kiến thức đã học.",
      "Giải quyết các tình huống doanh nghiệp thực tế.",
      "Xây dựng workflow hoàn chỉnh.",
      "Đánh giá năng lực AI Productivity."
    ],
    topics: "Business Cases; Office Scenarios; Marketing; HR; Sales; Customer Service; Project Management; Final Assessment."
  }
];

// ============================================================
// 3. WHY AI PRODUCTIVITY — Premium Cards
// ============================================================
const WHY_DATA = [
  { icon: "🧠", title: "Think with AI", desc: "Tư duy làm việc cùng AI", color: "#0068FF" },
  { icon: "💬", title: "Communicate with AI", desc: "Giao tiếp chuyên nghiệp", color: "#7B61FF" },
  { icon: "🔍", title: "Research with AI", desc: "Nghiên cứu thông minh", color: "#00B894" },
  { icon: "📊", title: "Office with AI", desc: "Văn phòng số hóa", color: "#E17055" },
  { icon: "📅", title: "Plan with AI", desc: "Lập kế hoạch hiệu quả", color: "#FDCB6E" },
  { icon: "⚖️", title: "Decide with AI", desc: "Ra quyết định sáng suốt", color: "#6C5CE7" },
  { icon: "⚙️", title: "Workflow with AI", desc: "Quy trình thông minh", color: "#00CEC9" },
  { icon: "🚀", title: "Grow with AI", desc: "Phát triển bền vững", color: "#FD79A8" }
];

// ============================================================
// 4. LEARNING JOURNEY — Premium Timeline (Nâng cấp)
// ============================================================
const LEARNING_JOURNEY = [
  { 
    step: 1, 
    icon: "🧠", 
    title: "Mindset", 
    subtitle: "Tư duy nền tảng", 
    color: "#0068FF", 
    questionCount: 35,
    estimatedTime: "25 phút",
    difficulty: "Beginner"
  },
  { 
    step: 2, 
    icon: "💬", 
    title: "Communication", 
    subtitle: "Giao tiếp và viết", 
    color: "#7B61FF", 
    questionCount: 40,
    estimatedTime: "30 phút",
    difficulty: "Beginner"
  },
  { 
    step: 3, 
    icon: "🔍", 
    title: "Research", 
    subtitle: "Nghiên cứu thông tin", 
    color: "#00B894", 
    questionCount: 35,
    estimatedTime: "28 phút",
    difficulty: "Intermediate"
  },
  { 
    step: 4, 
    icon: "📊", 
    title: "Office", 
    subtitle: "Văn phòng số", 
    color: "#E17055", 
    questionCount: 40,
    estimatedTime: "35 phút",
    difficulty: "Intermediate"
  },
  { 
    step: 5, 
    icon: "📅", 
    title: "Planning", 
    subtitle: "Lập kế hoạch", 
    color: "#FDCB6E", 
    questionCount: 35,
    estimatedTime: "25 phút",
    difficulty: "Intermediate"
  },
  { 
    step: 6, 
    icon: "⚖️", 
    title: "Decision", 
    subtitle: "Ra quyết định", 
    color: "#6C5CE7", 
    questionCount: 40,
    estimatedTime: "32 phút",
    difficulty: "Advanced"
  },
  { 
    step: 7, 
    icon: "⚙️", 
    title: "Workflow", 
    subtitle: "Quy trình làm việc", 
    color: "#00CEC9", 
    questionCount: 40,
    estimatedTime: "35 phút",
    difficulty: "Advanced"
  },
  { 
    step: 8, 
    icon: "🚀", 
    title: "Challenge", 
    subtitle: "Thực chiến", 
    color: "#FD79A8", 
    questionCount: 35,
    estimatedTime: "30 phút",
    difficulty: "Advanced"
  }
];

// ============================================================
// 5. COMPETENCY LAB — Premium Journey
// ============================================================
const LAB_JOURNEY = [
  { icon: "📝", title: "Practice", desc: "Luyện tập từng năng lực", color: "#0068FF" },
  { icon: "✅", title: "Checkpoint", desc: "Kiểm tra nhanh sau mỗi Competency", color: "#00B894" },
  { icon: "🎯", title: "Scenario", desc: "Tình huống thực tế", color: "#FDCB6E" },
  { icon: "📊", title: "Mock Exam", desc: "Thi thử toàn bộ", color: "#E17055" },
  { icon: "🏆", title: "Final Assessment", desc: "Đánh giá cuối khóa", color: "#6C5CE7" },
  { icon: "🎓", title: "Certificate", desc: "Chứng chỉ hoàn thành", color: "#FD79A8" }
];

// ============================================================
// 6. TARGET AUDIENCE
// ============================================================
const TARGET_AUDIENCE = [
  { icon: "🎓", title: "Học sinh, Sinh viên", desc: "Chuẩn bị kỹ năng làm việc trong kỷ nguyên AI", color: "#0068FF" },
  { icon: "💼", title: "Nhân viên văn phòng", desc: "Nâng cao năng suất và hiệu quả công việc", color: "#7B61FF" },
  { icon: "👨‍🏫", title: "Giáo viên, Giảng viên", desc: "Cập nhật phương pháp giảng dạy hiện đại", color: "#00B894" },
  { icon: "🏢", title: "Chủ doanh nghiệp, Quản lý", desc: "Tối ưu vận hành và ra quyết định", color: "#E17055" },
  { icon: "✍️", title: "Freelancer, Creator", desc: "Tăng tốc sáng tạo và quản lý công việc", color: "#6C5CE7" },
  { icon: "🌐", title: "Digital Worker", desc: "Thích nghi với môi trường làm việc số", color: "#00CEC9" }
];

// ============================================================
// 7. SHARED STYLES — MOS360 Premium Design System V2
// ============================================================
const SHARED_STYLE = `
<style>
/* ===== RESET & BASE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #f8fafc;
  color: #1a1a2e;
  line-height: 1.6;
}

/* ===== VARIABLES ===== */
:root {
  --primary: #0068FF;
  --primary-dark: #0052cc;
  --accent: #00D4FF;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
  --radius: 20px;
  --radius-sm: 14px;
  --shadow: 0 4px 24px rgba(0,0,0,0.06);
  --shadow-hover: 0 12px 48px rgba(0,104,255,0.15);
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== CONTAINER ===== */
.gt-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 60px;
}

/* ===== BACK BUTTON ===== */
.gt-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-500);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 32px;
  transition: color var(--transition);
}
.gt-back:hover {
  color: var(--primary);
}

/* ===== HERO — Cảm xúc hơn ===== */
.gt-hero {
  background: linear-gradient(145deg, #0a0e1a 0%, #1a2744 50%, #0f1f3a 100%);
  border-radius: var(--radius);
  padding: 80px 64px;
  margin-bottom: 48px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
}
.gt-hero::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -10%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(0,104,255,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.gt-hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
  pointer-events: none;
}
.gt-hero .badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(0,104,255,0.12);
  color: var(--accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 100px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(0,104,255,0.15);
}
.gt-hero .badge .level {
  color: rgba(255,255,255,0.4);
  font-weight: 400;
}
.gt-hero h1 {
  font-size: 56px;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 4px;
  position: relative;
  z-index: 1;
  letter-spacing: -1.5px;
}
.gt-hero h1 .highlight {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gt-hero .hero-sub {
  font-size: 24px;
  font-weight: 300;
  color: rgba(255,255,255,0.7);
  margin: 8px 0 4px;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
}
.gt-hero .hero-desc {
  font-size: 18px;
  color: rgba(255,255,255,0.4);
  max-width: 600px;
  margin: 4px 0 20px;
  position: relative;
  z-index: 1;
  font-weight: 300;
  line-height: 1.8;
}
.gt-hero .hero-desc strong {
  color: rgba(255,255,255,0.7);
  font-weight: 400;
}
.gt-hero .divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 4px;
  margin: 20px 0 24px;
  position: relative;
  z-index: 1;
}
.gt-hero .tagline {
  font-size: 20px;
  color: rgba(255,255,255,0.5);
  font-style: italic;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
  font-weight: 300;
}
.gt-hero .tagline strong {
  color: rgba(255,255,255,0.8);
  font-style: normal;
}
.gt-hero .actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}
.gt-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.gt-btn-primary {
  background: linear-gradient(135deg, var(--primary), #0052cc);
  color: #fff;
  box-shadow: 0 4px 24px rgba(0,104,255,0.25);
}
.gt-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,104,255,0.35);
}
.gt-btn-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: skewX(-25deg);
  transition: left 0.6s;
}
.gt-btn-primary:hover::after {
  left: 100%;
}
.gt-btn-outline {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.15);
}
.gt-btn-outline:hover {
  border-color: rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.05);
  transform: translateY(-3px);
}

/* ===== SECTION ===== */
.gt-section {
  margin-bottom: 64px;
}
.gt-section h2 {
  font-size: 38px;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}
.gt-section .desc {
  font-size: 18px;
  color: var(--gray-500);
  max-width: 760px;
  margin-bottom: 32px;
}

/* ===== OVERVIEW 2 COLUMN ===== */
.gt-overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  background: #fff;
  border-radius: var(--radius);
  padding: 48px 56px;
  box-shadow: var(--shadow);
  margin-bottom: 56px;
}
.gt-overview-grid .left h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 12px;
}
.gt-overview-grid .left p {
  color: var(--gray-600);
  font-size: 16px;
  line-height: 1.7;
}
.gt-overview-grid .right {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.gt-overview-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--gray-50);
  border-radius: var(--radius-sm);
  padding: 18px 22px;
  border: 1px solid transparent;
  transition: all var(--transition);
}
.gt-overview-card:hover {
  border-color: var(--primary);
  background: #fff;
  box-shadow: var(--shadow);
}
.gt-overview-card .icon {
  font-size: 28px;
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,104,255,0.08);
  border-radius: 12px;
}
.gt-overview-card .info h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: 2px;
}
.gt-overview-card .info p {
  font-size: 14px;
  color: var(--gray-500);
  margin-bottom: 0;
}

/* ===== WHY CARDS — Premium Gradient ===== */
.gt-why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.gt-why-card {
  background: #fff;
  border-radius: var(--radius-sm);
  padding: 28px 20px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: all var(--transition);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}
.gt-why-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, transparent 40%, var(--color, var(--primary)) 100%);
  opacity: 0;
  transition: opacity var(--transition);
  z-index: 0;
}
.gt-why-card:hover::before {
  opacity: 1;
}
.gt-why-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}
.gt-why-card .content {
  position: relative;
  z-index: 1;
}
.gt-why-card .icon {
  font-size: 40px;
  display: block;
  margin-bottom: 12px;
  transition: transform var(--transition);
}
.gt-why-card:hover .icon {
  transform: scale(1.1);
}
.gt-why-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: 6px;
}
.gt-why-card p {
  font-size: 14px;
  color: var(--gray-500);
  margin-bottom: 0;
}

/* ===== GOALS ===== */
.gt-goals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.gt-goal-item {
  background: #fff;
  border-radius: var(--radius-sm);
  padding: 20px 24px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: flex-start;
  gap: 14px;
  transition: all var(--transition);
  border-left: 4px solid transparent;
}
.gt-goal-item:hover {
  box-shadow: var(--shadow-hover);
  border-left-color: var(--primary);
}
.gt-goal-item .num {
  width: 32px;
  height: 32px;
  min-width: 32px;
  background: var(--primary);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}
.gt-goal-item p {
  font-size: 15px;
  color: var(--gray-600);
  margin-bottom: 0;
}

/* ===== ACCORDION — Nâng cấp với Difficulty ===== */
.gt-acc {
  background: #fff;
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all var(--transition);
  border: 1px solid var(--gray-100);
}
.gt-acc:hover {
  box-shadow: var(--shadow-hover);
}
.gt-acc-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  cursor: pointer;
  user-select: none;
  transition: background var(--transition);
}
.gt-acc-hdr:hover {
  background: var(--gray-50);
}
.gt-acc-hdr-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}
.gt-acc-num {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
}
.gt-acc-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--gray-800);
  flex: 1;
}
.gt-acc-title small {
  font-weight: 400;
  color: var(--gray-400);
  font-size: 14px;
  margin-left: 8px;
}
.gt-acc-title .desc-sm {
  display: block;
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-500);
  margin-top: 2px;
}
.gt-acc-title .meta-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
}
.gt-acc-title .difficulty-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 12px;
  border-radius: 100px;
  display: inline-block;
}
.gt-acc-title .time-badge {
  font-size: 11px;
  font-weight: 500;
  color: var(--gray-400);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.gt-acc-chevron {
  font-size: 12px;
  color: var(--gray-400);
  transition: transform var(--transition);
  min-width: 24px;
}
.gt-acc.open .gt-acc-chevron {
  transform: rotate(180deg);
}
.gt-acc-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  padding: 0 24px;
}
.gt-acc.open .gt-acc-body {
  max-height: 800px;
  padding: 0 24px 24px;
}
.gt-acc-body h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-700);
  margin-top: 12px;
  margin-bottom: 6px;
}
.gt-acc-body ul {
  padding-left: 20px;
  margin-bottom: 12px;
}
.gt-acc-body ul li {
  font-size: 15px;
  color: var(--gray-600);
  margin-bottom: 4px;
}
.gt-acc-body p {
  font-size: 15px;
  color: var(--gray-500);
  margin-bottom: 0;
}
.gt-acc-body .badge-count {
  display: inline-block;
  background: var(--gray-100);
  color: var(--gray-600);
  font-size: 13px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 100px;
  margin-top: 8px;
}

/* ===== LEARNING JOURNEY — Premium Timeline V2 ===== */
.gt-timeline {
  background: #fff;
  border-radius: var(--radius);
  padding: 48px 56px;
  box-shadow: var(--shadow);
  position: relative;
}
.gt-timeline::before {
  content: '';
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: calc(100% - 160px);
  background: linear-gradient(to bottom, var(--primary), var(--accent));
  opacity: 0.15;
  border-radius: 4px;
}
.gt-timeline-row {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  justify-content: center;
}
.gt-timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 0 6px;
  position: relative;
  max-width: 120px;
}
.gt-timeline-node .circle {
  width: 56px;
  height: 56px;
  min-width: 56px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  position: relative;
  transition: all var(--transition);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  cursor: default;
}
.gt-timeline-node .circle:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}
.gt-timeline-node .circle .label {
  font-size: 7px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  opacity: 0.8;
  margin-top: 1px;
}
.gt-timeline-node .info {
  text-align: center;
  margin-top: 8px;
  width: 100%;
}
.gt-timeline-node .info .title {
  font-size: 13px;
  font-weight: 700;
  color: var(--gray-800);
}
.gt-timeline-node .info .subtitle {
  font-size: 10px;
  color: var(--gray-400);
}
.gt-timeline-node .info .meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-top: 4px;
}
.gt-timeline-node .info .qcount {
  font-size: 10px;
  font-weight: 600;
  color: var(--gray-600);
  background: var(--gray-100);
  padding: 1px 10px;
  border-radius: 100px;
}
.gt-timeline-node .info .etime {
  font-size: 9px;
  color: var(--gray-400);
}
.gt-timeline-node .info .diff-badge {
  font-size: 8px;
  font-weight: 600;
  padding: 1px 10px;
  border-radius: 100px;
  display: inline-block;
}
.gt-timeline-arrow {
  font-size: 16px;
  color: var(--gray-300);
  padding: 0 2px;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 18px;
}

/* ===== COMPETENCY LAB — Premium Journey ===== */
.gt-lab {
  background: linear-gradient(145deg, #0f172a, #1a2744);
  border-radius: var(--radius);
  padding: 48px 56px;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.gt-lab::after {
  content: '🧬';
  position: absolute;
  font-size: 180px;
  opacity: 0.03;
  right: -20px;
  bottom: -40px;
  pointer-events: none;
}
.gt-lab .header h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #fff;
}
.gt-lab .header p {
  color: rgba(255,255,255,0.6);
  font-size: 16px;
  margin-bottom: 28px;
}
.gt-lab-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.gt-lab-card {
  background: rgba(255,255,255,0.05);
  border-radius: var(--radius-sm);
  padding: 24px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.06);
  transition: all var(--transition);
  cursor: default;
}
.gt-lab-card:hover {
  background: rgba(255,255,255,0.08);
  transform: translateY(-4px);
  border-color: rgba(255,255,255,0.12);
}
.gt-lab-card .icon {
  font-size: 28px;
  display: block;
  margin-bottom: 6px;
}
.gt-lab-card .step-num {
  font-size: 10px;
  font-weight: 600;
  color: rgba(255,255,255,0.3);
  letter-spacing: 1px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 2px;
}
.gt-lab-card h4 {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}
.gt-lab-card p {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 0;
}
.gt-lab-arrow {
  text-align: center;
  color: rgba(255,255,255,0.1);
  font-size: 20px;
  padding: 4px 0;
}

/* ===== TARGET AUDIENCE ===== */
.gt-target-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.gt-target-card {
  background: #fff;
  border-radius: var(--radius-sm);
  padding: 24px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: all var(--transition);
  border: 1px solid transparent;
}
.gt-target-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary);
}
.gt-target-card .icon {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}
.gt-target-card h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--gray-800);
  margin-bottom: 4px;
}
.gt-target-card p {
  font-size: 14px;
  color: var(--gray-500);
  margin-bottom: 0;
}

/* ===== DNA SECTION — Premium Quote ===== */
.gt-dna {
  background: linear-gradient(145deg, #0a0e1a, #162035);
  border-radius: var(--radius);
  padding: 64px 56px;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.04);
}
.gt-dna::before {
  content: '🧬';
  position: absolute;
  font-size: 300px;
  opacity: 0.02;
  right: -60px;
  top: -60px;
  pointer-events: none;
}
.gt-dna::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0,104,255,0.03) 0%, transparent 70%);
  pointer-events: none;
}
.gt-dna .icon-big {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}
.gt-dna .divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  margin: 16px auto;
  border-radius: 4px;
  position: relative;
  z-index: 1;
}
.gt-dna .quote {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
  max-width: 720px;
  margin: 0 auto 12px;
  position: relative;
  z-index: 1;
}
.gt-dna .quote .highlight {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gt-dna .sub-quote {
  font-size: 18px;
  color: rgba(255,255,255,0.5);
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  font-weight: 300;
}
.gt-dna .sub-quote strong {
  color: rgba(255,255,255,0.7);
  font-weight: 500;
}

/* ===== CTA — Mạnh mẽ hơn ===== */
.gt-cta {
  text-align: center;
  padding: 48px 0 20px;
  background: linear-gradient(180deg, transparent, rgba(0,104,255,0.03));
  border-radius: var(--radius);
}
.gt-cta .journey-text {
  font-size: 14px;
  color: var(--gray-400);
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
}
.gt-cta h2 {
  font-size: 40px;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}
.gt-cta h2 .highlight {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gt-cta .sub-line {
  font-size: 20px;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 8px;
}
.gt-cta p {
  font-size: 17px;
  color: var(--gray-500);
  margin-bottom: 28px;
}
.gt-cta .actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}
.gt-cta .btn-glow {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #fff;
  padding: 18px 48px;
  border-radius: 100px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all var(--transition);
  box-shadow: 0 4px 24px rgba(0,104,255,0.2);
}
.gt-cta .btn-glow:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 48px rgba(0,104,255,0.35);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .gt-hero h1 { font-size: 44px; }
  .gt-why-grid { grid-template-columns: repeat(2, 1fr); }
  .gt-target-grid { grid-template-columns: repeat(2, 1fr); }
  .gt-lab-grid { grid-template-columns: repeat(2, 1fr); }
  .gt-timeline::before { display: none; }
  .gt-timeline-row { flex-wrap: wrap; justify-content: center; gap: 12px; }
  .gt-timeline-node { max-width: 100px; }
}
@media (max-width: 768px) {
  .gt-wrap { padding: 24px 16px 40px; }
  .gt-hero { padding: 40px 28px; }
  .gt-hero h1 { font-size: 30px; }
  .gt-hero .hero-sub { font-size: 18px; }
  .gt-hero .hero-desc { font-size: 15px; }
  .gt-hero .tagline { font-size: 16px; }
  .gt-hero .actions { flex-direction: column; }
  .gt-hero .actions .gt-btn { justify-content: center; }
  .gt-overview-grid { grid-template-columns: 1fr; padding: 32px 24px; }
  .gt-overview-grid .left h2 { font-size: 24px; }
  .gt-section h2 { font-size: 28px; }
  .gt-why-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .gt-why-card { padding: 20px 16px; }
  .gt-why-card .icon { font-size: 32px; }
  .gt-goals-grid { grid-template-columns: 1fr; }
  .gt-acc-hdr { padding: 14px 18px; }
  .gt-acc-title { font-size: 15px; }
  .gt-acc-title small { display: block; margin-left: 0; font-size: 13px; }
  .gt-acc-title .desc-sm { font-size: 12px; }
  .gt-acc-title .meta-tags { flex-wrap: wrap; }
  .gt-acc-body { padding: 0 18px; }
  .gt-acc.open .gt-acc-body { padding: 0 18px 18px; }
  .gt-timeline { padding: 32px 20px; }
  .gt-timeline-node .circle { width: 44px; height: 44px; min-width: 44px; font-size: 17px; }
  .gt-timeline-node .circle .label { display: none; }
  .gt-timeline-node .info .title { font-size: 11px; }
  .gt-timeline-node .info .subtitle { font-size: 9px; }
  .gt-timeline-node .info .qcount { font-size: 8px; }
  .gt-timeline-node .info .etime { font-size: 8px; }
  .gt-timeline-arrow { font-size: 12px; padding: 0 2px; }
  .gt-lab { padding: 32px 24px; }
  .gt-lab .header h2 { font-size: 26px; }
  .gt-lab-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .gt-lab-card { padding: 16px; }
  .gt-lab-card .icon { font-size: 22px; }
  .gt-target-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .gt-target-card { padding: 18px; }
  .gt-dna { padding: 40px 24px; }
  .gt-dna .quote { font-size: 22px; }
  .gt-dna .sub-quote { font-size: 16px; }
  .gt-cta h2 { font-size: 28px; }
  .gt-cta .sub-line { font-size: 16px; }
}
@media (max-width: 480px) {
  .gt-hero { padding: 28px 18px; }
  .gt-hero h1 { font-size: 24px; }
  .gt-hero .hero-sub { font-size: 16px; }
  .gt-why-grid { grid-template-columns: 1fr; }
  .gt-target-grid { grid-template-columns: 1fr; }
  .gt-lab-grid { grid-template-columns: 1fr; }
  .gt-timeline-row { flex-direction: column; gap: 8px; align-items: center; }
  .gt-timeline-arrow { transform: rotate(90deg); margin-top: 0; align-self: center; }
  .gt-timeline-node { max-width: 100%; }
  .gt-cta h2 { font-size: 22px; }
  .gt-cta .sub-line { font-size: 14px; }
  .gt-cta .btn-glow { padding: 14px 28px; font-size: 16px; width: 100%; justify-content: center; }
}
</style>
`;

// ============================================================
// 8. HTML RENDERER — Premium V2
// ============================================================
export function renderAIPIntro() {
  // Build Competencies Accordion HTML with Difficulty & Time
  const competenciesHTML = AI_PRODUCTIVITY_COMPETENCIES.map((comp, index) => {
    const goalsHTML = comp.goals.map(g => `<li>${g}</li>`).join('');
    const diffColors = {
      Beginner: "#00B894",
      Intermediate: "#FDCB6E",
      Advanced: "#E17055"
    };
    return `
      <div class="gt-acc" id="ai-acc-${comp.id}">
        <div class="gt-acc-hdr" onclick="toggleAIAcc('ai-acc-${comp.id}')">
          <div class="gt-acc-hdr-left">
            <div class="gt-acc-num" style="background:${comp.color}22; color:${comp.color};">${comp.id}</div>
            <div class="gt-acc-title">
              ${comp.icon} ${comp.title}
              <small>${comp.subtitle}</small>
              <span class="desc-sm">${comp.description}</span>
              <div class="meta-tags">
                <span class="difficulty-badge" style="background:${diffColors[comp.difficulty]}22; color:${diffColors[comp.difficulty]};">${comp.difficulty}</span>
                <span class="time-badge">⏱ ${comp.estimatedTime}</span>
                <span class="time-badge" style="color:var(--gray-400);">📝 ${comp.questionCount} câu</span>
              </div>
            </div>
          </div>
          <span class="gt-acc-chevron">▼</span>
        </div>
        <div class="gt-acc-body">
          <h4>🎯 Mục tiêu</h4>
          <ul>${goalsHTML}</ul>
          <h4>📚 Nội dung chính</h4>
          <p>${comp.topics}</p>
        </div>
      </div>
    `;
  }).join('');

  // Build Why Cards with gradient border
  const whyHTML = WHY_DATA.map(item => `
    <div class="gt-why-card" style="--color: ${item.color};">
      <div class="content">
        <span class="icon">${item.icon}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');

  // Build Goals
  const goalsList = [
    "Hiểu đúng vai trò của AI trong học tập và công việc.",
    "Xây dựng tư duy AI-First và phương pháp cộng tác hiệu quả với AI.",
    "Sử dụng AI để giao tiếp, nghiên cứu, xử lý tài liệu và tăng năng suất.",
    "Kết hợp AI với Microsoft Office để tạo báo cáo, phân tích dữ liệu.",
    "Tổ chức cuộc họp, lập kế hoạch và quản lý công việc với AI.",
    "Phân tích dữ liệu và hỗ trợ ra quyết định dựa trên thông tin.",
    "Thiết kế AI Workflow để tự động hóa các công việc lặp lại.",
    "Vận dụng tổng hợp kỹ năng AI để giải quyết tình huống thực tế."
  ];
  const goalsHTML = goalsList.map((g, i) => `
    <div class="gt-goal-item">
      <span class="num">${i + 1}</span>
      <p>${g}</p>
    </div>
  `).join('');

  // Build Premium Learning Journey Timeline V2
  const diffColors = {
    Beginner: "#00B894",
    Intermediate: "#FDCB6E",
    Advanced: "#E17055"
  };
  const journeyHTML = LEARNING_JOURNEY.map((item, index) => {
    const arrow = index < LEARNING_JOURNEY.length - 1 ? `<span class="gt-timeline-arrow">▼</span>` : '';
    return `
      <div class="gt-timeline-node">
        <div class="circle" style="background:${item.color}">
          ${item.icon}
          <span class="label">${item.title}</span>
        </div>
        <div class="info">
          <div class="title">${item.title}</div>
          <div class="subtitle">${item.subtitle}</div>
          <div class="meta">
            <span class="qcount">📝 ${item.questionCount} câu</span>
            <span class="etime">⏱ ${item.estimatedTime}</span>
            <span class="diff-badge" style="background:${diffColors[item.difficulty]}22; color:${diffColors[item.difficulty]};">${item.difficulty}</span>
          </div>
        </div>
        ${arrow}
      </div>
    `;
  }).join('');

  // Build Target Audience
  const targetHTML = TARGET_AUDIENCE.map(item => `
    <div class="gt-target-card">
      <span class="icon">${item.icon}</span>
      <h4>${item.title}</h4>
      <p>${item.desc}</p>
    </div>
  `).join('');

  // Build Competency Lab Journey Cards
  const labHTML = LAB_JOURNEY.map((item, index) => `
    <div class="gt-lab-card">
      <span class="step-num">${String(index + 1).padStart(2, '0')}</span>
      <span class="icon">${item.icon}</span>
      <h4>${item.title}</h4>
      <p>${item.desc}</p>
    </div>
  `).join('');

  return `
    ${SHARED_STYLE}
    <div class="gt-wrap">
      <a href="/courses" class="gt-back">← Quay lại danh sách khóa học</a>

      <!-- ===== HERO — Cảm xúc hơn ===== -->
      <div class="gt-hero">
        <span class="badge">
          🤖 ${AI_PRODUCTIVITY_CONFIG.framework}
          <span class="level">· ${AI_PRODUCTIVITY_CONFIG.level}</span>
        </span>
        <h1>
          ${AI_PRODUCTIVITY_CONFIG.courseName}
        </h1>
        <div class="hero-sub">
          <span class="highlight">Trang bị năng lực làm việc với AI</span>
        </div>
        <div class="hero-desc">
          cho <strong>học tập</strong>, <strong>công việc</strong> và <strong>sự nghiệp</strong>
        </div>
        <div class="divider"></div>
        <p class="tagline">
          "Không học cách dùng AI. <strong>Học cách làm việc cùng AI.</strong>"
        </p>
        <div class="actions">
          <a href="${AI_PRODUCTIVITY_CONFIG.driveLink}" target="_blank" class="gt-btn gt-btn-primary">
            📁 Learning Guide
          </a>
          <a href="/ai-productivity" class="gt-btn gt-btn-outline">
            🎯 Bắt đầu ôn luyện
          </a>
        </div>
      </div>

      <!-- ===== OVERVIEW — 2 Column ===== -->
      <div class="gt-overview-grid">
        <div class="left">
          <h2>AI Productivity là gì?</h2>
          <p>
            <strong>AI Productivity Foundation</strong> là chương trình đào tạo được MOS360 xây dựng 
            nhằm giúp học viên hình thành <strong>năng lực làm việc với AI</strong> trong môi trường 
            học tập và doanh nghiệp hiện đại.
          </p>
          <p style="margin-top:12px;">
            Khác với các khóa học chỉ tập trung vào công cụ, AI Productivity Foundation hướng đến 
            việc tích hợp AI vào quy trình làm việc để tăng năng suất và hỗ trợ quyết định.
          </p>
        </div>
        <div class="right">
          <div class="gt-overview-card">
            <span class="icon">🤖</span>
            <div class="info">
              <h4>AI Copilot</h4>
              <p>AI là cộng sự, không phải công cụ thay thế</p>
            </div>
          </div>
          <div class="gt-overview-card">
            <span class="icon">🧬</span>
            <div class="info">
              <h4>8 Competencies</h4>
              <p>Khung năng lực làm việc với AI toàn diện</p>
            </div>
          </div>
          <div class="gt-overview-card">
            <span class="icon">🎯</span>
            <div class="info">
              <h4>Thực chiến</h4>
              <p>300 câu hỏi + Business Case thực tế</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== WHY AI PRODUCTIVITY ===== -->
      <div class="gt-section">
        <h2>🚀 Vì sao AI Productivity?</h2>
        <p class="desc">8 năng lực cốt lõi giúp bạn làm việc hiệu quả trong kỷ nguyên AI.</p>
        <div class="gt-why-grid">${whyHTML}</div>
      </div>

      <!-- ===== GOALS ===== -->
      <div class="gt-section">
        <h2>🎯 Mục tiêu khóa học</h2>
        <p class="desc">Sau khi hoàn thành chương trình, bạn có thể:</p>
        <div class="gt-goals-grid">${goalsHTML}</div>
      </div>

      <!-- ===== COMPETENCIES — Nâng cấp với Difficulty ===== -->
      <div class="gt-section">
        <h2>📋 8 Competencies — Khung năng lực</h2>
        <p class="desc">Nhấn vào từng Competency để xem chi tiết mục tiêu và nội dung.</p>
        ${competenciesHTML}
      </div>

      <!-- ===== LEARNING JOURNEY — Premium Timeline V2 ===== -->
      <div class="gt-section">
        <h2>🗺️ Learning Journey</h2>
        <p class="desc">Lộ trình phát triển năng lực AI Productivity từ cơ bản đến thực chiến.</p>
        <div class="gt-timeline">
          <div class="gt-timeline-row">${journeyHTML}</div>
        </div>
      </div>

      <!-- ===== COMPETENCY LAB — Premium Journey ===== -->
      <div class="gt-section">
        <div class="gt-lab">
          <div class="header">
            <h2>🧬 AI Competency Lab</h2>
            <p>Hành trình ôn luyện và đánh giá năng lực AI Productivity</p>
          </div>
          <div class="gt-lab-grid">${labHTML}</div>
        </div>
      </div>

      <!-- ===== TARGET AUDIENCE ===== -->
      <div class="gt-section">
        <h2>👥 Đối tượng phù hợp</h2>
        <p class="desc">Khóa học dành cho bất kỳ ai muốn ứng dụng AI vào học tập và công việc.</p>
        <div class="gt-target-grid">${targetHTML}</div>
      </div>

      <!-- ===== DNA SECTION ===== -->
      <div class="gt-dna">
        <span class="icon-big">🧬</span>
        <div class="divider"></div>
        <div class="quote">
          Không đào tạo công cụ.<br>
          <span class="highlight">Đào tạo năng lực.</span>
        </div>
        <div class="divider" style="width:40px; margin:12px auto;"></div>
        <div class="sub-quote">
          Công cụ AI sẽ thay đổi.<br>
          <strong>Năng lực sẽ theo bạn suốt sự nghiệp.</strong>
        </div>
        <div style="margin-top:20px; font-size:14px; color:rgba(255,255,255,0.2); letter-spacing:2px;">
          MOS360 AI Competency™ Framework v2.1
        </div>
      </div>

      <!-- ===== CTA — Mạnh mẽ hơn ===== -->
      <div class="gt-cta">
        <div class="journey-text">⬇ Bắt đầu hành trình của bạn</div>
        <h2>
          Bạn đã sẵn sàng
          <br>
          <span class="highlight">Trở thành</span>
        </h2>
        <div class="sub-line">AI Productivity Professional?</div>
        <p>300 câu hỏi · 8 năng lực · Thực chiến cùng Business Case</p>
        <div class="actions">
          <a href="/ai-productivity" class="btn-glow">
            🎯 Bắt đầu ôn luyện ngay
          </a>
          <a href="${AI_PRODUCTIVITY_CONFIG.driveLink}" target="_blank" class="gt-btn gt-btn-outline" style="color:var(--gray-700); border-color:var(--gray-300); background:#fff;">
            📁 Tải Learning Guide
          </a>
        </div>
      </div>
    </div>

    <script>
    // ============================================================
    // ACCORDION TOGGLE
    // ============================================================
    function toggleAIAcc(id) {
      const el = document.getElementById(id);
      if (!el) return;
      const isOpen = el.classList.contains('open');
      // Close all
      document.querySelectorAll('.gt-acc').forEach(acc => acc.classList.remove('open'));
      if (!isOpen) {
        el.classList.add('open');
      }
    }

    // Auto-open first accordion on load
    document.addEventListener('DOMContentLoaded', function() {
      const first = document.querySelector('.gt-acc');
      if (first) first.classList.add('open');
    });
    </script>
  `;
}

// ============================================================
// 9. EXPORT
// ============================================================
// For use in existing MOS360 platform:
// if using CommonJS: module.exports = { renderAIPIntro, AI_PRODUCTIVITY_CONFIG, AI_PRODUCTIVITY_COMPETENCIES };
// if using ES Modules: export { renderAIPIntro, AI_PRODUCTIVITY_CONFIG, AI_PRODUCTIVITY_COMPETENCIES };

// ============================================================
// HOW TO USE:
// 1. Copy this entire file to courses/ai-productivity-intro.js
// 2. In your router/page, import { renderAIPIntro } from './courses/ai-productivity-intro.js'
// 3. Call renderAIPIntro() to get HTML string
// 4. Insert into DOM
// ============================================================