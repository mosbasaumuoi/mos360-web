/* =========================
   MOS360 V2026
   BASELINE CONTRACT LOCKED
   ========================= */

import IC3_LEVEL1 from "./questions/ic3-level1.js";
import IC3_LEVEL2 from "./questions/ic3-level2.js";
import IC3_LEVEL3 from "./questions/ic3-level3.js";
import GENERATIVE_AI from "./questions/generative-ai.js";
import AI_PRODUCTIVITY from "./questions/ai_productivity.js";
import { getAdminDashboardUI } from "./pages/admin.js";
import { getProgressUI } from "./pages/progress.js";
import { getFlashcardUI } from "./pages/flashcard.js";
import { getIC3IntroUI, getGenAIIntroUI, getAIPIntroUI } from "./pages/course-intro.js";
import { getLicenseRequestUI } from "./pages/license-request.js";
import { getResultsLookupUI } from "./pages/results-lookup.js";
import { handleAdminAPI } from "./api/admin-api.js";
import { handleLicenseAPI } from "./api/license-api.js";
import { handleResultAPI } from "./api/result-api.js";
import { getCosUI } from "./pages/cos.js";
// Thêm vào sau các import hiện có
import { getLibraryUI } from "./pages/library.js";
import { handleLinksAPI, handleLinkRedirect } from "./api/links-api.js";
import { BLOG_POSTS, getBlogListUI, getBlogPostUI } from "./pages/blog.js";
import { handleRegisterAPI } from "./api/register-api.js";

// ── SEO: title/description riêng cho từng trang, thay vì dùng chung 1
// CONFIG.TITLE cho mọi trang như trước (nguyên nhân chính khiến Google
// không phân biệt được nội dung từng trang để xếp hạng đúng từ khóa).
// noindex: true = trang chức năng/riêng tư, không cần Google index.
const SEO_PAGES = {
    "/": {
        title: "MOS360 - Luyện Thi MOS Word, Excel, PowerPoint Tại Hải Phòng | Cam Kết 700+",
        description: "Trung tâm luyện thi MOS & IC3 tại Hải Phòng. Học bằng phần mềm mô phỏng giống 100% đề thi thật, kèm 1:1, học phí chỉ 400.000đ/môn. Cam kết đầu ra 700+, hoàn 100% lệ phí nếu chưa đỗ."
    },
    "/courses": {
        title: "Khóa Học MOS, IC3 GS6 & Generative AI | MOS360 Hải Phòng",
        description: "Danh sách khóa học tại MOS360: MOS Word/Excel/PowerPoint 2019 & 365, IC3 GS6 Level 1-3, Generative AI. Học phí từ 100.000đ/môn, cam kết đầu ra 700+."
    },
    "/course-intro/ic3": {
        title: "Luyện Thi IC3 GS6 Online (Level 1, 2, 3) | MOS360 Hải Phòng",
        description: "Khóa luyện thi chứng chỉ IC3 GS6 Level 1, 2, 3 tại MOS360. Học phí chỉ 100.000đ/môn, luyện tập không giới hạn số lần, có giáo viên hỗ trợ 1:1."
    },
    "/course-intro/genai": {
        title: "Khóa Học Generative AI Cơ Bản | MOS360 Hải Phòng",
        description: "Học kỹ năng sử dụng AI tạo sinh (Generative AI) ứng dụng vào công việc, học tập. Học phí 100.000đ, thực hành trực tiếp trên phần mềm mô phỏng."
    },
    "/course-intro/aip": {
        title: "Khóa Học AI Productivity - Nâng Cao Năng Suất Với AI | MOS360",
        description: "Khóa học AI Productivity tại MOS360 Hải Phòng giúp bạn ứng dụng AI vào công việc hiệu quả hơn. Học phí 100.000đ, thực hành trực tiếp trên phần mềm."
    },
    "/register": {
        title: "Đăng Ký Học MOS, IC3, Generative AI | MOS360 Hải Phòng",
        description: "Đăng ký khóa luyện thi MOS, IC3 GS6, Generative AI tại MOS360. Học phí ưu đãi, cam kết đầu ra 700+, hoàn 100% lệ phí thi nếu chưa đỗ."
    },
    "/cap-mat-khau": {
        title: "Yêu Cầu Cấp Mật Khẩu Phần Mềm Luyện Thi | MOS360",
        description: "Học viên MOS360 điền form để nhận mật khẩu phần mềm luyện thi MOS Word, Excel, PowerPoint cài trực tiếp trên máy tính.",
        noindex: true
    },
    "/ket-qua": {
        title: "Tra Cứu Kết Quả Học Tập & Thi Thử | MOS360",
        description: "Học viên MOS360 nhập số điện thoại để tra cứu lịch sử kết quả luyện tập và thi thử MOS Word, Excel, PowerPoint.",
        noindex: true
    },
    "/library": { title: "Thư Viện Tài Liệu Học Viên | MOS360", noindex: true },
    "/login": { title: "Đăng Nhập | MOS360", noindex: true },
    "/progress": { title: "Tiến Độ Học Tập | MOS360", noindex: true },
    "/admin-dashboard": { title: "Quản Trị | MOS360", noindex: true }
};

// JSON-LD (schema.org) — giúp Google hiểu đây là trung tâm đào tạo có địa
// chỉ vật lý cụ thể, hỗ trợ hiển thị trên Google Maps / kết quả tìm kiếm
// local. Chỉ chèn ở trang chủ (đủ để Google gắn kết với toàn site).
const ORG_JSONLD = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "name": "MOS360 - Trung tâm tin học MOS & IC3 & AI",
    "url": "https://mos360.vn",
    "image": "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
    "telephone": "+84912888360",
    "priceRange": "100.000₫ - 400.000₫",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Số 57 Lê Văn Thuyết A",
        "addressLocality": "Phường Lê Chân",
        "addressRegion": "Hải Phòng",
        "addressCountry": "VN"
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "11:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "14:00",
            "closes": "17:00"
        }
    ],
    "sameAs": [
        "https://facebook.com/mos360.vn",
        "https://youtube.com/@mos360_vn",
        "https://tiktok.com/@mos360.vn"
    ]
};

// ── Course schema (schema.org/Course) ──
const MOS360_PROVIDER = {
    "@type": "EducationalOrganization",
    "name": "MOS360 - Trung tâm tin học MOS & IC3 & AI",
    "sameAs": "https://mos360.vn"
};

function courseOffer(price) {
    return {
        "@type": "Offer",
        "category": "Paid",
        "price": String(price),
        "priceCurrency": "VND",
        "availability": "https://schema.org/InStock"
    };
}

function courseInstance() {
    return {
        "@type": "CourseInstance",
        "courseMode": "Blended",
        "location": {
            "@type": "Place",
            "name": "MOS360",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Số 57 Lê Văn Thuyết A",
                "addressLocality": "Phường Lê Chân",
                "addressRegion": "Hải Phòng",
                "addressCountry": "VN"
            }
        }
    };
}

const COURSE_SCHEMAS = {
    "/course-intro/ic3": {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Luyện thi IC3 GS6 (Level 1, 2, 3)",
        "description": "Khóa luyện thi chứng chỉ IC3 GS6 Level 1, 2, 3 bằng phần mềm mô phỏng 100% giống đề thi thật, học 1:1 cùng giáo viên, học không giới hạn số lần.",
        "provider": MOS360_PROVIDER,
        "offers": courseOffer(100000),
        "hasCourseInstance": courseInstance()
    },
    "/course-intro/genai": {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Generative AI Cơ Bản",
        "description": "Khóa học kỹ năng sử dụng AI tạo sinh (Generative AI) ứng dụng vào công việc và học tập, thực hành trực tiếp trên phần mềm mô phỏng.",
        "provider": MOS360_PROVIDER,
        "offers": courseOffer(100000),
        "hasCourseInstance": courseInstance()
    },
    "/course-intro/aip": {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "AI Productivity",
        "description": "Khóa học AI Productivity giúp ứng dụng AI vào công việc hiệu quả hơn, thực hành trực tiếp trên phần mềm mô phỏng.",
        "provider": MOS360_PROVIDER,
        "offers": courseOffer(100000),
        "hasCourseInstance": courseInstance()
    }
};

const COURSES_ITEMLIST_JSONLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Course", "name": "MOS Word (2019 & 365)", "provider": MOS360_PROVIDER, "offers": courseOffer(400000) } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Course", "name": "MOS Excel (2019 & 365)", "provider": MOS360_PROVIDER, "offers": courseOffer(400000) } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Course", "name": "MOS PowerPoint (2019 & 365)", "provider": MOS360_PROVIDER, "offers": courseOffer(400000) } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "Course", "name": "IC3 GS6 (Level 1, 2, 3)", "provider": MOS360_PROVIDER, "offers": courseOffer(100000), "url": "https://mos360.vn/course-intro/ic3" } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "Course", "name": "Generative AI Cơ Bản", "provider": MOS360_PROVIDER, "offers": courseOffer(100000), "url": "https://mos360.vn/course-intro/genai" } },
        { "@type": "ListItem", "position": 6, "item": { "@type": "Course", "name": "AI Productivity", "provider": MOS360_PROVIDER, "offers": courseOffer(100000), "url": "https://mos360.vn/course-intro/aip" } }
    ]
};

const CONFIG = {
    TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
    SITE_URL: "https://mos360.vn",
    SEO_DEFAULT_DESCRIPTION: "MOS360 - Trung tâm tin học MOS & IC3 & AI tại 57 Lê Văn Thuyết A, Lê Chân, Hải Phòng. Luyện thi MOS Word/Excel/PowerPoint, IC3 GS6, Generative AI bằng phần mềm mô phỏng 100% giống đề thi thật. Cam kết đầu ra 700+, hoàn 100% lệ phí thi nếu chưa đỗ.",
    GA_MEASUREMENT_ID: "G-RDLSPNT6SV",
    LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
    SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv",
    SHEET_EDIT_URL: "https://docs.google.com/spreadsheets/d/17spoqBAGtinFHQSTGbaDMapFH4nWGS0RHGGhCB5WzqI/edit?gid=0#gid=0",
    SHEET_TONGHOP_URL: "https://docs.google.com/spreadsheets/d/16xxaXIvvJ-ovuSJ8HU1osUGHzkg_3GlB6n2GjJW6Bco/edit",
    STUDENT_SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjb4deEYb7i_AMpimoccuyElyPF01QfQGEue2nQNrlRjU4xZlz3tH1qJt3jPUN8gqRHiHJQqWJBo9E/pub?output=tsv",
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbweC3d-SKm29ltW6Y13hWqYuw8Q-4X23QEbF0AhQL_IfA2YiWYzVkIOyV4n-sxApEpcMA/exec",

    SOCIALS: {
        ZALO: "https://zalo.me/0912888360",
        FACEBOOK: "https://facebook.com/mos360.vn",
        MESSENGER: "https://m.me/mos360.vn",
        YOUTUBE: "https://youtube.com/@mos360_vn",
        TIKTOK: "https://tiktok.com/@mos360.vn"
    },

    // URL Apps Script Web App đã deploy — tra cứu dự thi
    // Thay bằng URL thật sau khi deploy Apps Script
    APPS_SCRIPT_LOOKUP: "https://script.google.com/macros/s/AKfycbweC3d-SKm29ltW6Y13hWqYuw8Q-4X23QEbF0AhQL_IfA2YiWYzVkIOyV4n-sxApEpcMA/exec",

    // Links form đăng ký
    FORMS: {
        HOC: "https://docs.google.com/forms/d/e/1FAIpQLSegb6K7afTKsw5Go0E0H9MYcNZ6guOxkzSWrUe3nMli0AXQqQ/viewform",
        THI: "https://docs.google.com/forms/d/1a7tW5YzmX4-lFEl4lXHcpYD430ztM7NOnNdHPWjMwuA/viewform",
        OFFLINE: "https://docs.google.com/forms/d/1rQt3B9eae_dYlc9PLrwsljxY9LLfMtoumEC1_n12lOc/viewform"
    },

    // Links tải tiện ích
    TOOLS: {
        MOS360: "https://drive.google.com/file/d/16ZRK0JtioIq1R0grfw88-M5V0fr6tY_A/view",
        OFFICE: "https://drive.google.com/file/d/1nYo6f5VDqgsgbp_-_IA6tO9muyohHOhg/view",
        FRAMEWORK: "https://go.microsoft.com/fwlink/?LinkId=852092",
        WINRAR: "https://drive.google.com/file/d/1NJVEBHJBpPr6R_y7PP_oZM0qn8hFyoG1/view",
        UNIKEY: "https://drive.google.com/file/d/1niMPJWesSzTmvNRLAvxxNNv4llL0WlcT/view",
        TEAMVIEWER: "https://drive.google.com/file/d/1dBlMqaSqkjYqC-rvjoyVf5q3NaDVSoHL/view",
        ULTRAVIEWER: "https://www.ultraviewer.net/vi/download.html",
        HD_MOS360: "https://docs.google.com/document/d/1j2zrxTZWvuPa6CaffkKlS9UMbU4xFLWC/edit",
        HD_OFFICE: "https://docs.google.com/document/d/1RXFli_WC_2hiTtOTZHTx-Ln5VHCBkJLI/edit",
        HD_THI: "https://iigvietnam.com/wp-content/uploads/2021/09/Huong-dan-du-thi-MOS-2016-update-05.08.2020_compressed.pdf"
    },

    // Lịch thi VMU 2026 — cập nhật theo thông báo CITAD
    SCHEDULE: [
        { dot: 1, dates: "10–11/01/2026", from: "", to: "", deadline: "" },
        { dot: 2, dates: "14–15/03/2026", from: "23/02/2026", to: "05/03/2026", deadline: "02/03/2026" },
        { dot: 3, dates: "18–19/04/2026", from: "17/03/2026", to: "09/04/2026", deadline: "06/04/2026" },
        { dot: 4, dates: "23–24/05/2026", from: "20/04/2026", to: "14/05/2026", deadline: "11/05/2026" },
        { dot: 5, dates: "27–28/06/2026", from: "25/05/2026", to: "18/06/2026", deadline: "15/06/2026" },
        { dot: 6, dates: "25–26/07/2026", from: "29/06/2026", to: "16/07/2026", deadline: "13/07/2026" },
        { dot: 7, dates: "29–30/08/2026", from: "27/07/2026", to: "13/08/2026", deadline: "10/08/2026" },
        { dot: 8, dates: "26–27/09/2026", from: "31/08/2026", to: "19/09/2026", deadline: "16/09/2026" },
        { dot: 9, dates: "24–25/10/2026", from: "28/09/2026", to: "15/10/2026", deadline: "12/10/2026" },
        { dot: 10, dates: "28–29/11/2026", from: "26/10/2026", to: "19/11/2026", deadline: "16/11/2026" },
        { dot: 11, dates: "26–27/12/2026", from: "30/11/2026", to: "17/12/2026", deadline: "14/12/2026" },
        { dot: 12, dates: "30–31/01/2027", from: "04/12/2026", to: "21/01/2027", deadline: "18/01/2027" }
    ],
    // Lịch thi IIG theo thành phố (cập nhật từ online.iigvietnam.com)
    LICH_THI: {
        "Hải Phòng": [
            { dot: "Đợt 5/2026", ngayThi: "27–28/06/2026", hanDK: "15/06/2026", lephi: 950000, diaDiem: "CITAD – ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)", trangThai: "dang-mo" },
            { dot: "Đợt 6/2026", ngayThi: "25–26/07/2026", hanDK: "13/07/2026", lephi: 950000, diaDiem: "CITAD – ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)", trangThai: "sap-mo" },
            { dot: "Đợt 7/2026", ngayThi: "29–30/08/2026", hanDK: "10/08/2026", lephi: 950000, diaDiem: "CITAD – ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)", trangThai: "sap-mo" },
            { dot: "Đợt 8/2026", ngayThi: "26–27/09/2026", hanDK: "16/09/2026", lephi: 950000, diaDiem: "CITAD – ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)", trangThai: "sap-mo" }
        ],
        "Hà Nội": [
            { dot: "Đợt 4/2026", ngayThi: "19/05/2026", hanDK: "21/04/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "da-dong" },
            { dot: "Đợt 5/2026", ngayThi: "23/06/2026", hanDK: "26/05/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "da-dong" },
            { dot: "Đợt 6/2026", ngayThi: "21/07/2026", hanDK: "23/06/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "dang-mo" },
            { dot: "Đợt 7/2026", ngayThi: "18/08/2026", hanDK: "21/07/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "sap-mo" },
            { dot: "Đợt 8/2026", ngayThi: "22/09/2026", hanDK: "25/08/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "sap-mo" }
        ],
        "Hồ Chí Minh": [
            { dot: "Đợt 4/2026", ngayThi: "21/05/2026", hanDK: "21/04/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "da-dong" },
            { dot: "Đợt 5/2026", ngayThi: "25/06/2026", hanDK: "26/05/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "da-dong" },
            { dot: "Đợt 6/2026", ngayThi: "23/07/2026", hanDK: "23/06/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "dang-mo" },
            { dot: "Đợt 7/2026", ngayThi: "20/08/2026", hanDK: "21/07/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "sap-mo" },
            { dot: "Đợt 8/2026", ngayThi: "24/09/2026", hanDK: "25/08/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "sap-mo" }
        ]
    },
    // Lịch thi IIG theo thành phố (cập nhật từ online.iigvietnam.com)
    LICH_THI: {
        "Hải Phòng": [
            { dot: "Đợt 5/2026", ngayThi: "27–28/06/2026", hanDK: "15/06/2026", lephi: 950000, diaDiem: "CITAD – Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)", trangThai: "dang-mo" },
            { dot: "Đợt 6/2026", ngayThi: "25–26/07/2026", hanDK: "13/07/2026", lephi: 950000, diaDiem: "CITAD – Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)", trangThai: "sap-mo" },
            { dot: "Đợt 7/2026", ngayThi: "29–30/08/2026", hanDK: "10/08/2026", lephi: 950000, diaDiem: "CITAD – Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)", trangThai: "sap-mo" },
            { dot: "Đợt 8/2026", ngayThi: "26–27/09/2026", hanDK: "16/09/2026", lephi: 950000, diaDiem: "CITAD – Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)", trangThai: "sap-mo" }
        ],
        "Hà Nội": [
            { dot: "Đợt 4/2026", ngayThi: "19/05/2026", hanDK: "21/04/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "da-dong" },
            { dot: "Đợt 5/2026", ngayThi: "23/06/2026", hanDK: "26/05/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "da-dong" },
            { dot: "Đợt 6/2026", ngayThi: "21/07/2026", hanDK: "23/06/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "dang-mo" },
            { dot: "Đợt 7/2026", ngayThi: "18/08/2026", hanDK: "21/07/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "sap-mo" },
            { dot: "Đợt 8/2026", ngayThi: "22/09/2026", hanDK: "25/08/2026", lephi: 960000, diaDiem: "VP IIG (75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa, Hà Nội)", trangThai: "sap-mo" }
        ],
        "Hồ Chí Minh": [
            { dot: "Đợt 4/2026", ngayThi: "21/05/2026", hanDK: "21/04/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "da-dong" },
            { dot: "Đợt 5/2026", ngayThi: "25/06/2026", hanDK: "26/05/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "da-dong" },
            { dot: "Đợt 6/2026", ngayThi: "23/07/2026", hanDK: "23/06/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "dang-mo" },
            { dot: "Đợt 7/2026", ngayThi: "20/08/2026", hanDK: "21/07/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "sap-mo" },
            { dot: "Đợt 8/2026", ngayThi: "24/09/2026", hanDK: "25/08/2026", lephi: 960000, diaDiem: "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)", trangThai: "sap-mo" }
        ]
    }
};

/* ========================
   QUESTION BANK V2
   ========================= */

const COURSE_MAP = {
    "IC3 GS6 LEVEL 1": [...IC3_LEVEL1],
    "IC3 GS6 LEVEL 2": [...IC3_LEVEL2],
    "IC3 GS6 LEVEL 3": [...IC3_LEVEL3],
    "GENERATIVE AI": [...GENERATIVE_AI],
    "AI PRODUCTIVITY": [...AI_PRODUCTIVITY]
};

// ===== CATEGORY TRANSLATIONS — hiển thị tên tiếng Việt chuẩn =====
// Đầy đủ TẤT CẢ category code có thật trong questions/ic3-level1.js, ic3-level2.js,
// ic3-level3.js và generative-ai.js (trước đây dict này chỉ khớp ~category của Level 1,
// nên Level 2/3/AI bị hiện code tiếng Anh thô khi chọn "Ôn theo chủ đề").
const CATEGORY_TRANSLATIONS = {
    // --- IC3 Level 1 ---
    HARDWARE: "💻 Thiết bị phần cứng",
    SOFTWARE: "📦 Phần mềm & Ứng dụng",
    OPERATING_SYSTEM: "🖥️ Hệ điều hành",
    NETWORK: "🌐 Mạng & Internet",
    SECURITY: "🔐 An ninh bảo mật",
    PRIVACY: "🛡️ Quyền riêng tư",
    DIGITAL_CITIZENSHIP: "🌍 Công dân kỹ thuật số",
    FILE_FORMAT: "📁 Định dạng tệp tin",
    TROUBLESHOOTING: "🔧 Xử lý sự cố",
    BROWSER: "🌐 Trình duyệt Web",
    COLLABORATION: "🤝 Cộng tác trực tuyến",
    // --- IC3 Level 2 ---
    ACCESSIBILITY: "♿ Khả năng truy cập (Accessibility)",
    CLOUD_DIGITAL_SERVICES: "☁️ Dịch vụ số & Điện toán đám mây",
    COMMUNICATION_COLLABORATION: "💬 Giao tiếp & Cộng tác",
    COPYRIGHT: "©️ Bản quyền nội dung",
    DATA_MANAGEMENT: "🗂️ Quản lý tệp & dữ liệu",
    DATA_VISUALIZATION: "📊 Trực quan hóa dữ liệu",
    DIAGRAMS: "📐 Sơ đồ & lưu đồ",
    MEDIA_EDITING: "🎬 Chỉnh sửa hình ảnh/âm thanh/video",
    PRESENTATION: "📽️ Trình chiếu",
    PRODUCTIVITY_SOFTWARE: "📝 Word/Excel/PowerPoint",
    SOFTWARE_APPLICATIONS: "🧩 Tính năng phần mềm chung",
    WEB_DESIGN: "🎨 Thiết kế Web",
    // --- IC3 Level 3 ---
    AI: "🤖 Trí tuệ nhân tạo (AI)",
    CLOUD_COMPUTING: "☁️ Điện toán đám mây",
    CRITICAL_THINKING: "🧠 Tư duy phản biện",
    CYBERSECURITY: "🔐 An ninh mạng",
    DATA_PRIVACY: "🛡️ Bảo mật quyền riêng tư",
    DIGITAL_IDENTITY: "🪪 Danh tính số",
    INFORMATION_LITERACY: "📚 Đánh giá thông tin",
    INFORMATION_SEARCH: "🔍 Tìm kiếm thông tin",
    INFORMATION_USE: "📖 Sử dụng thông tin",
    INTELLECTUAL_PROPERTY: "©️ Sở hữu trí tuệ",
    IOT: "📡 Internet vạn vật (IoT)",
    NETWORKING: "🌐 Mạng máy tính",
    ONLINE_SAFETY: "🛟 An toàn trực tuyến",
    // --- Generative AI ---
    FOUNDATION: "🌱 Khái niệm nền tảng AI",
    PROMPTING: "✍️ Prompt Engineering",
    ETHICS: "⚖️ Đạo đức & rủi ro AI",
    TOOLS: "🛠️ Công cụ AI",
    // --- AI Productivity ---
    MINDSET: "🧠 Think with AI — Tư duy AI",
    COMMUNICATION: "💬 Communicate with AI — Giao tiếp",
    RESEARCH: "🔍 Research with AI — Nghiên cứu",
    OFFICE: "📊 Office with AI — Văn phòng số",
    PLANNING: "📅 Plan with AI — Lập kế hoạch",
    DECISION: "⚖️ Decide with AI — Ra quyết định",
    WORKFLOW: "⚙️ Workflow with AI — Quy trình",
    CHALLENGE: "🚀 Grow with AI — Thực chiến"
};

// ===== TOPIC DOMAINS — gom các category kỹ thuật theo đúng 7 chuyên đề IC3 GS6 /
// 4 module Generative AI trong giáo trình (pages/course-intro.js), để "Ôn luyện theo
// chủ đề" khớp với cấu trúc giáo trình học viên đang đọc, thay vì hiện 30+ category
// kỹ thuật rời rạc của ngân hàng câu hỏi. =====
const IC3_TOPIC_DOMAINS = [
    { title: "1. Công nghệ thông tin cơ bản", cats: ["HARDWARE", "SOFTWARE", "OPERATING_SYSTEM", "NETWORK", "NETWORKING", "TROUBLESHOOTING", "BROWSER", "FILE_FORMAT", "CLOUD_COMPUTING", "CLOUD_DIGITAL_SERVICES", "IOT", "ACCESSIBILITY", "DATA_MANAGEMENT", "SOFTWARE_APPLICATIONS", "AI"] },
    { title: "2. Công dân kỷ nguyên số", cats: ["DIGITAL_CITIZENSHIP", "DIGITAL_IDENTITY", "COPYRIGHT", "INTELLECTUAL_PROPERTY"] },
    { title: "3. Quản lý thông tin", cats: ["CRITICAL_THINKING", "INFORMATION_SEARCH", "INFORMATION_LITERACY", "INFORMATION_USE"] },
    { title: "4. Sáng tạo nội dung", cats: ["DATA_VISUALIZATION", "WEB_DESIGN", "DIAGRAMS", "MEDIA_EDITING", "PRESENTATION", "PRODUCTIVITY_SOFTWARE"] },
    { title: "5. Giao tiếp", cats: ["COMMUNICATION_COLLABORATION"] },
    { title: "6. Cộng tác", cats: ["COLLABORATION"] },
    { title: "7. An toàn và an ninh", cats: ["SECURITY", "CYBERSECURITY", "PRIVACY", "DATA_PRIVACY", "ONLINE_SAFETY"] }
];
const GENAI_TOPIC_DOMAINS = [
    { title: "1. Giới thiệu Generative AI & khái niệm nền tảng", cats: ["FOUNDATION"] },
    { title: "2. Kỹ thuật nhắc lệnh (Prompt Engineering)", cats: ["PROMPTING"] },
    { title: "3. Ứng dụng thực tiễn & công cụ (Đầu vào - Đầu ra)", cats: ["TOOLS"] },
    { title: "4. Đạo đức, pháp lý & tác động xã hội", cats: ["ETHICS"] }
];
const AIP_TOPIC_DOMAINS = [
    { title: "1. Think with AI — Tư duy & Mindset", cats: ["MINDSET"] },
    { title: "2. Communicate with AI — Giao tiếp & Soạn thảo", cats: ["COMMUNICATION"] },
    { title: "3. Research with AI — Nghiên cứu & Khai thác thông tin", cats: ["RESEARCH"] },
    { title: "4. Office with AI — Làm việc với Microsoft Office", cats: ["OFFICE"] },
    { title: "5. Plan with AI — Quản lý cuộc họp & Kế hoạch", cats: ["PLANNING"] },
    { title: "6. Decide with AI — Ra quyết định với AI", cats: ["DECISION"] },
    { title: "7. Workflow with AI — Thiết kế quy trình làm việc", cats: ["WORKFLOW"] },
    { title: "8. Grow with AI — Thực chiến AI Productivity", cats: ["CHALLENGE"] }
];
const TOPIC_DOMAINS_BY_COURSE = {
    "IC3 GS6 LEVEL 1": IC3_TOPIC_DOMAINS,
    "IC3 GS6 LEVEL 2": IC3_TOPIC_DOMAINS,
    "IC3 GS6 LEVEL 3": IC3_TOPIC_DOMAINS,
    "GENERATIVE AI": GENAI_TOPIC_DOMAINS,
    "AI PRODUCTIVITY": AIP_TOPIC_DOMAINS
};

/* =========================
   EXAM CONTRACT V21
   ========================= */

const EXAM_CONFIG = {
    QUESTION_COUNT: 45,
    EXAM_DURATION: 50,
    PASS_SCORE: 700,
    MAX_SCORE: 1000,

    TRIAL_DURATION: 10
};

const DEVICE_CONFIG = {
    MAX_DEVICES: 3
};

const IMAGE_BASE_URL = "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/refs/heads/main/main/images/";
const IMAGE_MAP = {

    // IC3 LEVEL 1 — ảnh options image-select

    // Câu 2: Thiết bị nhập (image-select)
    "ic3_lv1_q02_opt_a": "ic3-level1/ic3_lv1_q02_opt_a.svg",
    "ic3_lv1_q02_opt_b": "ic3-level1/ic3_lv1_q02_opt_b.svg",
    "ic3_lv1_q02_opt_c": "ic3-level1/ic3_lv1_q02_opt_c.svg",
    "ic3_lv1_q02_opt_d": "ic3-level1/ic3_lv1_q02_opt_d.svg",
    "ic3_lv1_q02_opt_e": "ic3-level1/ic3_lv1_q02_opt_e.svg",

    // Câu 4: Các loại cáp (matching)
    "ic3_lv1_q04_opt_a": "ic3-level1/ic3_lv1_q04_opt_a.svg",
    "ic3_lv1_q04_opt_b": "ic3-level1/ic3_lv1_q04_opt_b.svg",
    "ic3_lv1_q04_opt_c": "ic3-level1/ic3_lv1_q04_opt_c.svg",
    "ic3_lv1_q04_opt_d": "ic3-level1/ic3_lv1_q04_opt_d.svg",

    // Câu 8: Các loại cổng kết nối (matching)
    "ic3_lv1_q08_opt_a": "ic3-level1/ic3_lv1_q08_opt_a.svg",
    "ic3_lv1_q08_opt_b": "ic3-level1/ic3_lv1_q08_opt_b.svg",
    "ic3_lv1_q08_opt_c": "ic3-level1/ic3_lv1_q08_opt_c.svg",
    "ic3_lv1_q08_opt_d": "ic3-level1/ic3_lv1_q08_opt_d.svg",
    "ic3_lv1_q08_opt_e": "ic3-level1/ic3_lv1_q08_opt_e.svg",

    // Câu 46: Linh kiện máy tính (matching - Test 2)
    "ic3_lv1_q46_opt_a": "ic3-level1/ic3_lv1_q46_opt_a.svg",
    "ic3_lv1_q46_opt_b": "ic3-level1/ic3_lv1_q46_opt_b.svg",
    "ic3_lv1_q46_opt_c": "ic3-level1/ic3_lv1_q46_opt_c.svg",
    "ic3_lv1_q46_opt_d": "ic3-level1/ic3_lv1_q46_opt_d.svg",

    // Câu 113: System Information - Settings (image-select)
    "ic3_lv1_q113_opt_a": "ic3-level1/ic3_lv1_q113_opt_a.svg",
    "ic3_lv1_q113_opt_b": "ic3-level1/ic3_lv1_q113_opt_b.svg",
    "ic3_lv1_q113_opt_c": "ic3-level1/ic3_lv1_q113_opt_c.svg",
    "ic3_lv1_q113_opt_d": "ic3-level1/ic3_lv1_q113_opt_d.svg",

    // Câu 114: System Model (image-select)
    "ic3_lv1_q114_opt_a": "ic3-level1/ic3_lv1_q114_opt_a.svg",
    "ic3_lv1_q114_opt_b": "ic3-level1/ic3_lv1_q114_opt_b.svg",
    "ic3_lv1_q114_opt_c": "ic3-level1/ic3_lv1_q114_opt_c.svg",
    "ic3_lv1_q114_opt_d": "ic3-level1/ic3_lv1_q114_opt_d.svg",

    // IC3 LEVEL 3 — ảnh minh họa   
    "ic3_lv3_q86_sysinfo": "ic3-level3/ic3_lv3_q86_sysinfo.svg",
};

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;
        const hostname = url.hostname;

        // ── robots.txt ──────────────────────────────────────────
        if (path === "/robots.txt") {
            const body = [
                "User-agent: *",
                "Allow: /",
                "Disallow: /admin-dashboard",
                "Disallow: /login",
                "Disallow: /progress",
                "Disallow: /api/",
                "",
                `Sitemap: ${CONFIG.SITE_URL}/sitemap.xml`
            ].join("\n");
            return new Response(body, { headers: { "Content-Type": "text/plain;charset=UTF-8" } });
        }

        // ── sitemap.xml ──────────────────────────────────────────
        if (path === "/sitemap.xml") {
            const extraPublicPaths = [
                "/blog",
                "/generative-ai", "/ai-productivity",
                "/ic3-lv1", "/ic3-lv2", "/ic3-lv3",
                "/flashcard-ic3", "/flashcard-ai", "/flashcard-aip",
                ...BLOG_POSTS.map((p) => "/blog/" + p.slug)
            ];
            const publicPaths = [
                ...Object.keys(SEO_PAGES).filter((p) => !SEO_PAGES[p].noindex),
                ...extraPublicPaths
            ];
            const urls = publicPaths.map((p) => {
                const loc = CONFIG.SITE_URL + (p === "/" ? "" : p);
                return `  <url><loc>${loc}</loc><changefreq>weekly</changefreq></url>`;
            }).join("\n");
            const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
            return new Response(xml, { headers: { "Content-Type": "application/xml;charset=UTF-8" } });
        }

        // ── ĐĂNG KÝ (proxy sang Google Sheet + thông báo Telegram) ──
        if (path === "/api/register" && request.method === "POST") {
            return handleRegisterAPI(request, env);
        }

        // ── VISIT TRACKING API ────────────────────────────────────
        if (path === '/api/admin/visit-stats' && request.method === 'GET') {
            const token = url.searchParams.get('token') || request.headers.get('X-Admin-Token') || '';
            if (token !== 'mos360admin2026') return new Response(JSON.stringify({ ok: false }), { status: 401, headers: { 'Content-Type': 'application/json' } });
            try {
                const kv = env.MOS360_USERS_KV;
                const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                const todayKey = 'visit:day:' + today;
                const totalKey = 'visit:total';
                // Tính ngày hôm qua và tuần này
                const d = new Date(); d.setDate(d.getDate() - 1);
                const yestKey = 'visit:day:' + d.toISOString().slice(0, 10).replace(/-/g, '');
                // Tuần này: từ đầu tuần (thứ 2)
                const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
                // Tháng này
                const monthKey = 'visit:month:' + today.slice(0, 6);

                const [todayVal, yestVal, totalVal, monthVal] = await Promise.all([
                    kv.get(todayKey), kv.get(yestKey), kv.get(totalKey), kv.get(monthKey)
                ]);

                // Tính tuần: lấy tổng các ngày trong tuần
                let weekTotal = 0;
                for (let i = 0; i < 7; i++) {
                    const wd = new Date(weekStart); wd.setDate(wd.getDate() + i);
                    const wKey = 'visit:day:' + wd.toISOString().slice(0, 10).replace(/-/g, '');
                    const wVal = await kv.get(wKey);
                    weekTotal += parseInt(wVal || '0');
                }

                return new Response(JSON.stringify({
                    ok: true,
                    today: parseInt(todayVal || '0'),
                    yesterday: parseInt(yestVal || '0'),
                    week: weekTotal,
                    month: parseInt(monthVal || '0'),
                    total: parseInt(totalVal || '0')
                }), { headers: { 'Content-Type': 'application/json' } });
            } catch (e) {
                return new Response(JSON.stringify({ ok: false, msg: e.message }), { headers: { 'Content-Type': 'application/json' } });
            }
        }

        // ===== go.mos360.vn — Short URL redirect domain =====
        // Mọi request đến go.mos360.vn đều được xử lý như short URL redirect
        // Ví dụ: go.mos360.vn/hdcaimos360 → tra KV → redirect 302 đến long URL
        if (hostname === 'go.mos360.vn') {
            const slug = path.replace(/^\//, '').split('/')[0];
            if (!slug) return Response.redirect('https://mos360.vn', 302);

            // Thử link: prefix (format mới từ links-api.js)
            const redirect = await handleLinkRedirect(slug, env);
            if (redirect) return redirect;

            // Fallback: thử plain text URL (data cũ nhập tay không có prefix)
            const kv = env.MOS360_LINKS_KV;
            const raw = await kv.get(slug);
            if (raw) {
                let targetUrl;
                try { targetUrl = JSON.parse(raw).url; } catch (e) { targetUrl = raw; }
                if (targetUrl && targetUrl.startsWith('http')) {
                    return Response.redirect(targetUrl, 302);
                }
            }

            return Response.redirect('https://mos360.vn/library', 302);
        }

        // ===== ADMIN API =====
        if (path.startsWith("/api/admin/")) {
            return handleAdminAPI(path, request, env);
        }

        // ===== LINKS API =====
        if (path.startsWith("/api/links/")) {
            return handleLinksAPI(path, request, env);
        }

        // ===== LICENSE API (cấp mật khẩu Excel/Word/PPT) =====
        if (path.startsWith("/api/license/")) {
            return handleLicenseAPI(path, request, env);
        }

        // ===== RESULT API (kết quả Học/Thi từ WinApp) =====
        if (path === "/api/submit-result" || path === "/api/results" || path === "/api/results/stats") {
            return handleResultAPI(path, request, env);
        }

        // ===== FIX 3: API xác thực =====
        if (path === "/api/verify-code") {
            const rawPhone = url.searchParams.get("phone") || "";
            const rawCourse = url.searchParams.get("course") || "";
            const deviceId = url.searchParams.get("deviceId") || "";

            function normalizePhone(raw) {
                let p = raw.trim();
                if (p.startsWith("+84")) p = "0" + p.slice(3);
                else if (p.startsWith("84") && p.length >= 11) p = "0" + p.slice(2);
                return p;
            }

            const phone = normalizePhone(rawPhone);
            const course = rawCourse.replace(/\s+/g, " ").trim().toLowerCase();

            if (!phone || !course || !deviceId) {
                return new Response(JSON.stringify({ success: false, msg: "Thiếu thông tin tra cứu!" }), {
                    headers: { "Content-Type": "application/json" }
                });
            }

            try {
                // 1. Xác thực học viên từ sheet
                const resp = await fetch(CONFIG.STUDENT_SHEET_URL + "&v=" + Date.now());
                const tsv = await resp.text();
                const rows = tsv.split("\n");
                const courseIdx = 0, phoneIdx = 1, expireIdx = 3;

                let isValid = false;
                let reason = "Không tìm thấy thông tin đăng ký. Vui lòng kiểm tra lại SĐT và khóa học!";
                let expireStr = "";

                for (let i = 1; i < rows.length; i++) {
                    const cols = rows[i].split("\t");
                    if (cols.length < 3) continue;

                    const sheetPhone = normalizePhone((cols[phoneIdx] || "").trim());
                    const sheetCourse = (cols[courseIdx] || "").replace(/\s+/g, " ").trim().toLowerCase();
                    const rawExpire = (cols[expireIdx] || "").trim();

                    if (sheetPhone === phone && (sheetCourse === course || sheetCourse.includes(course) || course.includes(sheetCourse))) {
                        if (rawExpire) {
                            // ── FIX 1+2: parse đúng cả DD/MM/YYYY và YYYY-MM-DD,
                            // và tính end-of-day theo múi giờ Việt Nam (UTC+7 = 16:59:59 UTC)
                            let dd, mm, yyyy;
                            if (rawExpire.includes("/")) {
                                [dd, mm, yyyy] = rawExpire.split("/").map(Number);
                            } else {
                                [yyyy, mm, dd] = rawExpire.split("-").map(Number);
                            }
                            if (yyyy < 100) yyyy += 2000;
                            // 23:59:59 Vietnam = 16:59:59 UTC
                            const expireDate = new Date(Date.UTC(yyyy, mm - 1, dd, 16, 59, 59));
                            if (new Date() > expireDate) {
                                reason = "Tài khoản đã hết hạn. Vui lòng liên hệ MOS360 để gia hạn!";
                                break;
                            }
                            expireStr = rawExpire; // giữ chuỗi gốc để gửi về client
                        }
                        isValid = true;
                        break;
                    }
                }

                if (!isValid) {
                    return new Response(JSON.stringify({ success: false, msg: reason }), {
                        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
                    });
                }

                // 2. Kiểm tra / cập nhật danh sách thiết bị qua KV
                const kvKey = phone + "_" + course.replace(/\s+/g, "_");
                const stored = await env.MOS360_USERS_KV.get(kvKey);
                let devices = stored ? JSON.parse(stored) : [];
                const isSilent = url.searchParams.get("silent") === "1";

                if (!devices.includes(deviceId)) {
                    if (isSilent) {
                        // ── FIX BẢO MẬT: đây là lượt tự kiểm tra ngầm (không phải học viên chủ động
                        // nhập SĐT để đăng nhập). Nếu thiết bị này không còn trong danh sách — do admin
                        // đã bấm "Reset thiết bị" hoặc thiết bị chưa từng đăng ký — KHÔNG tự thêm lại.
                        // Trả về false để client thu hồi quyền ngay, đúng tác dụng của nút Reset.
                        return new Response(JSON.stringify({ success: false, msg: "Thiết bị đã bị gỡ hoặc chưa đăng ký. Vui lòng đăng nhập lại." }), {
                            headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
                        });
                    }
                    // ── Đăng nhập thủ công (học viên tự nhập SĐT): nếu đã đủ slot thì xoay vòng
                    // (bỏ thiết bị cũ nhất) thay vì chặn — học viên đổi máy/xoá localStorage vẫn vào được.
                    if (devices.length >= DEVICE_CONFIG.MAX_DEVICES) {
                        devices.shift(); // bỏ thiết bị cũ nhất
                    }
                    devices.push(deviceId);
                    await env.MOS360_USERS_KV.put(kvKey, JSON.stringify(devices));
                }

                // ── luôn trả về expire để client refresh được sau khi localStorage bị xoá
                return new Response(JSON.stringify({ success: true, msg: "Kích hoạt thành công!", expire: expireStr }), {
                    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
                });

            } catch (err) {
                return new Response(JSON.stringify({ success: false, msg: "Lỗi kết nối máy chủ dữ liệu!" }), {
                    headers: { "Content-Type": "application/json" }
                });
            }
        }

        if (path === "/generative-ai") {
            return new Response(this.getQuizEnginePage("GENERATIVE AI"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/ai-productivity") {
            return new Response(this.getQuizEnginePage("AI PRODUCTIVITY"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/ic3-lv1") {
            return new Response(this.getQuizEnginePage("IC3 GS6 LEVEL 1"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/ic3-lv2") {
            return new Response(this.getQuizEnginePage("IC3 GS6 LEVEL 2"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/ic3-lv3") {
            return new Response(this.getQuizEnginePage("IC3 GS6 LEVEL 3"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/flashcard-ic3") {
            return new Response(getFlashcardUI("IC3 GS6", [...IC3_LEVEL1, ...IC3_LEVEL2, ...IC3_LEVEL3], IMAGE_BASE_URL, IMAGE_MAP), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/flashcard-ai") {
            return new Response(getFlashcardUI("GENERATIVE AI", [...GENERATIVE_AI], IMAGE_BASE_URL, IMAGE_MAP), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/flashcard-aip") {
            return new Response(getFlashcardUI("AI PRODUCTIVITY", [...AI_PRODUCTIVITY], IMAGE_BASE_URL, IMAGE_MAP), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/cos") {
            return new Response(getCosUI(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }

        // ── ĐẾM LƯỢT TRUY CẬP (fire and forget) ────────────────
        // Chỉ đếm page requests, bỏ qua API, static assets, bots
        const isPageReq = request.headers.get('Accept')?.includes('text/html') &&
            !path.startsWith('/api/') && path !== '/favicon.ico';
        // Sampling: chỉ ghi KV cho 1/30 số lượt truy cập, mỗi lần ghi cộng dồn x30
        // để số liệu hiển thị vẫn xấp xỉ đúng thực tế mà giảm ~97% số put xuống KV.
        const VISIT_SAMPLE_RATE = 1 / 30;
        if (isPageReq && Math.random() < VISIT_SAMPLE_RATE) {
            const kv = env.MOS360_USERS_KV;
            const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const month = today.slice(0, 6);
            const step = Math.round(1 / VISIT_SAMPLE_RATE); // = 30
            // Fire and forget - không block response
            Promise.all([
                kv.get('visit:day:' + today).then(v => kv.put('visit:day:' + today, String((parseInt(v || '0') + step)))),
                kv.get('visit:month:' + month).then(v => kv.put('visit:month:' + month, String((parseInt(v || '0') + step)))),
                kv.get('visit:total').then(v => kv.put('visit:total', String((parseInt(v || '0') + step))))
            ]).catch(() => { });
        }

        // ===== FIX 1: Tải ảnh Bảng Vàng – dùng SHEET_URL pub TSV (v1 logic) =====
        let studentData = "";
        try {
            const resp = await fetch(CONFIG.SHEET_URL + "&v=" + Date.now());
            const tsv = await resp.text();
            const rows = tsv.split("\n").slice(1);
            let htmlContent = "";
            rows.forEach(row => {
                const cols = row.split("\t");
                // Cột 1 (index 0) = tên khóa học / link ảnh chứng chỉ
                const link = cols[0]?.replace(/\r/g, "").trim();
                if (link && link.startsWith("http")) {
                    let finalLink = link;
                    // Chuyển đổi link Google Drive sang link trực tiếp (lh3.googleusercontent)
                    if (link.includes("drive.google.com")) {
                        const match = link.match(/[-\w]{25,}/);
                        if (match) finalLink = "https://lh3.googleusercontent.com/d/" + match[0];
                    }
                    htmlContent += `<div class="student-item"><img src="${finalLink}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`;
                }
            });
            // Nhân 3 lần để hiệu ứng cuộn không bị hết nội dung
            studentData = htmlContent
                ? htmlContent + htmlContent + htmlContent
                : "<div style='color:#5A6A85;padding:20px;'>Đang cập nhật bảng vàng...</div>";
        } catch (e) {
            studentData = "<div style='color:#5A6A85;padding:20px;'>Hệ thống đang đồng bộ dữ liệu...</div>";
        }

        // Đọc promo config từ KV
        let promoConfig = { active: false };
        try {
            const promoRaw = await env.MOS360_USERS_KV.get('promo_config');
            if (promoRaw) promoConfig = JSON.parse(promoRaw);
        } catch (e) { }

        let content = "";
        let blogPost = null;
        let blogNotFound = false;
        if (path === "/courses") content = this.getCoursesUI();
        else if (path === "/course-intro/ic3") content = getIC3IntroUI();
        else if (path === "/course-intro/genai") content = getGenAIIntroUI();
        else if (path === "/course-intro/aip") content = getAIPIntroUI();
        else if (path === "/register") content = this.getHomeUI(studentData, promoConfig, 'register');
        else if (path === "/login") content = this.getLoginUI();
        else if (path === "/library") content = getLibraryUI();
        else if (path === "/progress") content = getProgressUI();
        else if (path === "/cap-mat-khau") content = getLicenseRequestUI();
        else if (path === "/ket-qua") content = getResultsLookupUI();
        else if (path === "/blog") content = getBlogListUI();
        else if (path.startsWith("/blog/")) {
            const slug = path.slice("/blog/".length);
            blogPost = BLOG_POSTS.find((p) => p.slug === slug) || null;
            if (blogPost) content = getBlogPostUI(blogPost);
            else {
                blogNotFound = true;
                content = `<div style="max-width:560px;margin:80px auto;text-align:center;padding:0 16px;">
                    <div style="font-size:2rem;margin-bottom:12px;">🔍</div>
                    <h1 style="font-size:1.3rem;color:var(--text);margin-bottom:10px;">Không tìm thấy bài viết</h1>
                    <a href="/blog" style="color:var(--primary);font-weight:700;text-decoration:none;">← Xem tất cả bài viết</a>
                </div>`;
            }
        }
        else if (path === "/admin-dashboard") {
            const isAdmin = request.headers.get('Cookie')?.includes('mos360_admin=true');
            content = getAdminDashboardUI();
        }
        else content = this.getHomeUI(studentData, promoConfig);

        let pageSeo = SEO_PAGES[path] || SEO_PAGES["/"];
        let dynamicJsonLd = path === "/" ? ORG_JSONLD
            : path === "/courses" ? COURSES_ITEMLIST_JSONLD
                : COURSE_SCHEMAS[path] || null;
        if (path === "/blog") {
            pageSeo = {
                title: "Blog - Kinh Nghiệm Thi MOS, IC3 & Chuẩn Đầu Ra Tin Học | MOS360",
                description: "Chia sẻ kinh nghiệm thi MOS, IC3 GS6, thông tin chuẩn đầu ra tin học và các khóa học tại MOS360 Hải Phòng."
            };
        } else if (path.startsWith("/blog/")) {
            if (blogPost) {
                pageSeo = { title: blogPost.title + " | MOS360", description: blogPost.seoDescription };
                dynamicJsonLd = {
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": blogPost.title,
                    "description": blogPost.seoDescription,
                    "datePublished": blogPost.publishedDate,
                    "author": { "@type": "Organization", "name": "MOS360" },
                    "publisher": {
                        "@type": "Organization",
                        "name": "MOS360",
                        "logo": { "@type": "ImageObject", "url": CONFIG.LOGO_URL }
                    },
                    "mainEntityOfPage": CONFIG.SITE_URL + path
                };
            } else {
                pageSeo = { title: "Không tìm thấy bài viết | MOS360", noindex: true };
            }
        }

        const seo = {
            path,
            title: pageSeo.title,
            description: pageSeo.description || CONFIG.SEO_DEFAULT_DESCRIPTION,
            noindex: !!pageSeo.noindex,
            jsonLd: dynamicJsonLd
        };

        return new Response(this.layout(content, seo), {
            status: blogNotFound ? 404 : 200,
            headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
    },

    layout(content, seo = {}) {
        const title = seo.title || CONFIG.TITLE;
        const description = seo.description || CONFIG.SEO_DEFAULT_DESCRIPTION;
        const canonical = CONFIG.SITE_URL + (!seo.path || seo.path === "/" ? "" : seo.path);
        const robotsMeta = seo.noindex ? "noindex, nofollow" : "index, follow";
        const esc = (s) => String(s).replace(/"/g, "&quot;");
        const jsonLdBlock = seo.jsonLd
            ? `<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`
            : "";
        return `<!DOCTYPE html><html lang="vi"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${title}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="${robotsMeta}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="MOS360">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${CONFIG.LOGO_URL}">
    <meta property="og:locale" content="vi_VN">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${CONFIG.LOGO_URL}">
    ${jsonLdBlock}
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_MEASUREMENT_ID}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${CONFIG.GA_MEASUREMENT_ID}');
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #F0F4FA; --card: #FFFFFF; --text: #0F1F40; --border: #CFD8EA; --cyan: #0052CC; --muted: #5A6A85; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; text-decoration: none; color: var(--text); font-weight: 800; font-size: 1.3rem; }
        .brand img { height: 36px; margin-right: 10px; }
        nav { display: flex; align-items: center; }
        nav a { color: var(--muted); text-decoration: none; font-weight: 700; margin-left: 20px; font-size: 0.85rem; transition: color 0.2s; }
        nav a:hover { color: var(--text); }
        .admin-only-btn { display: none; background: rgba(255,215,0,0.12); color: #B8860B !important; border: 1px solid #DAA520; padding: 6px 12px; border-radius: 6px; font-weight: 800; }

        /* ── DROPDOWN NAV ── */
        .nav-dropdown { position: relative; margin-left: 20px; }
        .nav-dropdown > .nav-drop-btn { color: var(--muted); text-decoration: none; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: color 0.2s; background: none; border: none; padding: 0; font-family: inherit; }
        .nav-dropdown > .nav-drop-btn:hover { color: var(--text); }
        .nav-dropdown > .nav-drop-btn::after { content: '▾'; font-size: 0.7rem; }
        .nav-drop-menu { display: none; position: absolute; top: calc(100% + 10px); left: 0; background: #fff; border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 8px 24px rgba(15,23,42,0.10); padding: 8px 0; min-width: 210px; z-index: 2000; }
        .nav-dropdown:hover .nav-drop-menu,
        .nav-dropdown:focus-within .nav-drop-menu { display: block; }
        .nav-drop-menu a { display: flex; align-items: center; gap: 10px; padding: 9px 18px; color: var(--text); text-decoration: none; font-size: 0.83rem; font-weight: 700; transition: background 0.15s; margin: 0; }
        .nav-drop-menu a:hover { background: #F0F4FA; }
        .nav-drop-menu .drop-divider { height: 1px; background: var(--border); margin: 4px 0; }
        .nav-drop-menu .drop-label { padding: 6px 18px 3px; font-size: 0.68rem; font-weight: 800; color: var(--muted); letter-spacing: 0.5px; text-transform: uppercase; }
        @media (max-width: 768px) {
            .nav-dropdown { margin-left: 0; }
            .nav-drop-menu { position: fixed; left: 50%; transform: translateX(-50%); top: 100px; width: 90vw; }
        }

        .hero-banner { position: relative; width: 100%; min-height: 340px; background: linear-gradient(135deg, #E2ECFA 0%, #D6E4F7 100%); overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; border-bottom: 1px solid var(--border); }
        .hero-content { position: relative; z-index: 2; max-width: 800px; }
        .hero-content h1 { font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 15px; color: var(--text); }
        .hero-content h1 span { background: linear-gradient(to right, #FF5722, #ff8a65); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-content p { color: var(--muted); font-size: 1rem; margin-bottom: 25px; line-height: 1.6; }

        .stats-bar { display: flex; justify-content: center; gap: 40px; padding: 25px 5%; text-align: center; background: #FFFFFF; border-bottom: 1px solid var(--border); }
        .stat-item h2 { color: var(--primary); font-size: 2rem; font-weight: 800; }
        .stat-item p { color: var(--muted); font-size: 0.8rem; font-weight: 600; }

        .main-container { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: 360px 1fr; gap: 30px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 25px; box-shadow: 0 4px 16px rgba(15,23,42,0.04); }

        .featured-highlights-box { background: #FFFFFF; border: 1px solid var(--border); border-radius: 24px; padding: 35px 25px; box-shadow: 0 8px 28px rgba(15,23,42,0.06); position: relative; overflow: hidden; }
        .featured-highlights-box::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(to bottom, #FF5722, #ff9100); }
        .featured-main-title { font-size: 1.85rem; font-weight: 800; color: var(--text); line-height: 1.25; letter-spacing: -0.5px; margin-top: 5px; }
        .featured-main-title span { color: #FF5722; display: block; font-size: 2.15rem; margin-top: 5px; }
        .highlight-list { list-style: none; margin: 30px 0; display: flex; flex-direction: column; gap: 16px; }
        .highlight-list li { display: flex; align-items: center; gap: 12px; font-size: 1.05rem; font-weight: 700; color: #334155; }
        .highlight-list li::before { content: "✓"; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: rgba(255,87,34,0.12); color: #FF5722; border-radius: 50%; font-size: 11px; font-weight: 900; }

        /* FIX 1: Bảng Vàng - carousel cuộn mượt */
        #bang-vang-container { height: 600px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: #E2ECFA; border-radius: 16px; }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 60s linear infinite; width: max-content; }
        .carousel-track:hover { animation-play-state: paused; }
        .student-item { flex: 0 0 auto; width: 320px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 98%; object-fit: contain; border-radius: 12px; box-shadow: 0 5px 15px rgba(15,23,42,0.08); }
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }

        /* FIX 2: Icon Zalo SVG chuẩn thương hiệu – nền xanh tròn, chữ Z trắng sắc nét */
        .social-sticky-bar { position: fixed; right: 25px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 9999; }
        .social-sticky-item { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(15,23,42,0.15); text-decoration: none; }
        .social-sticky-item:hover { transform: scale(1.15); }
        .social-sticky-item svg { width: 48px; height: 48px; }
        .s-zalo { box-shadow: 0 4px 14px rgba(0,104,255,0.4); }
        .s-zalo svg {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              overflow: hidden;
          }
        .s-fb { background: #1877F2; box-shadow: 0 4px 14px rgba(24,119,242,0.3); }
        .s-fb svg, .s-mess svg, .s-yt svg, .s-tt svg { width: 26px; height: 26px; fill: white; }
        .s-mess { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); box-shadow: 0 4px 14px rgba(214,36,159,0.3); }
        .s-yt { background: #FF0000; box-shadow: 0 4px 14px rgba(255,0,0,0.3); }
        .s-tt { background: #000; border: 1px solid rgba(0,0,0,0.1); }

        .course-block-title { display: flex; align-items: center; gap: 12px; margin: 40px 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid var(--border); color: var(--text); }
        .course-block-title svg { width: 28px; height: 28px; fill: var(--primary); }
        .course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .price-tag { font-size: 1.3rem; font-weight: 800; color: #0052CC; margin: 15px 0; display: flex; align-items: center; gap: 8px; }
        .price-tag span { font-size: 0.85rem; color: var(--muted); text-decoration: line-through; font-weight: normal; }
        .course-btn-group { display: flex; flex-direction: column; gap: 8px; margin-top: 15px; }

        .btn-action { background: linear-gradient(135deg, #FF5722, #ff784e); color: var(--text); border: none; padding: 12px; border-radius: 25px; font-weight: 800; cursor: pointer; width: 100%; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 12px rgba(255,87,34,0.2); transition: transform 0.15s; }
        .btn-sub { padding: 10px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; border: 1px solid var(--border); background: #F0F4FA; color: #334155; cursor: pointer; text-decoration: none; text-align: center; transition: all 0.2s; }
        .btn-sub:hover { background: #EDF1F7; color: var(--text); }
        .btn-trial { background: rgba(0,82,204,0.06); color: #0052CC; border: 1px solid rgba(0,82,204,0.2); }
        .btn-confirm { display:none; margin-top:12px; padding:12px 30px; background:linear-gradient(135deg,#2684FF,#0068ff); color:#fff; border:none; border-radius:10px; font-weight:800; font-size:0.95rem; cursor:pointer; width:100%; }
        .btn-confirm.visible { display:block; }

        footer { padding: 40px 5%; background: #FFFFFF; border-top: 1px solid var(--border); margin-top: 40px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 30px; }

        @media (max-width: 768px) {
            header { padding: 12px 4%; flex-direction: column; gap: 8px; text-align: center; }
            nav { width: 100%; justify-content: center; flex-wrap: wrap; gap: 6px; }
            nav a { margin: 3px 6px; font-size: 0.78rem; }
            .hero-content h1 { font-size: 1.7rem; }
            .stats-bar { gap: 15px; flex-wrap: wrap; }
            .main-container { grid-template-columns: 1fr; gap: 20px; padding: 0 4%; }
            .footer-grid { grid-template-columns: 1fr; }
            .social-sticky-bar { position: relative; top: 0; transform: none; right: 0; flex-direction: row; justify-content: center; padding: 15px; background: #F0F4FA; border-radius: 12px; margin: 10px 4%; gap: 15px; }
        }
    
@media (max-width: 480px) {
  .hn-tools-grid { grid-template-columns: 1fr; }
  .hn-stats { flex-direction: column; align-items: center; gap: 12px; }
  .hn-tcard { width: 240px; }
}
</style>
    </head><body>

    <header>
        <a href="/" class="brand"><span style="color:#FF5722">MOS</span><span style="color:#0052CC">360</span></a>
        <nav>
            <a href="/">TRANG CHỦ</a>
            <a href="/courses">KHÓA HỌC</a>
            <a href="/blog">BLOG</a>
            <a href="/register" style="color:#FF5722;">📝 ĐĂNG KÝ</a>

            <!-- DROPDOWN: HỌC ONLINE -->
            <div class="nav-dropdown">
                <button class="nav-drop-btn" style="color:#16a34a;">🖥️ HỌC ONLINE</button>
                <div class="nav-drop-menu">
                    <div class="drop-label">IC3 GS6</div>
                    <a href="/ic3-lv1">🟢 IC3 GS6 Level 1</a>
                    <a href="/ic3-lv2">🟡 IC3 GS6 Level 2</a>
                    <a href="/ic3-lv3">🔴 IC3 GS6 Level 3</a>
                    <div class="drop-divider"></div>
                    <div class="drop-label">Generative AI</div>
                    <a href="/generative-ai">✨ Luyện thi Generative AI</a>
                    <div class="drop-divider"></div>
                    <div class="drop-label">AI Productivity</div>
                    <a href="/ai-productivity">⚡ Làm việc hiệu quả với AI</a>
                    <div class="drop-divider"></div>
                    <a href="/progress">📈 Tiến độ học của tôi</a>
                </div>
            </div>

            <!-- DROPDOWN: PHẦN MỀM MOS -->
            <div class="nav-dropdown">
                <button class="nav-drop-btn" style="color:var(--cyan);">💻 PHẦN MỀM MOS</button>
                <div class="nav-drop-menu">
                    <a href="/#hn-tools">📦 Tải & Cài đặt</a>
                    <div class="drop-divider"></div>
                    <a href="/cap-mat-khau">🔑 Lấy mật khẩu phần mềm</a>
                    <a href="/ket-qua">📊 Kết quả luyện tập của tôi</a>
                </div>
            </div>

            <!-- DROPDOWN: THƯ VIỆN (public) -->
            <div class="nav-dropdown">
                <button class="nav-drop-btn" style="color:#0052CC;">📚 THƯ VIỆN</button>
                <div class="nav-drop-menu">
                    <a href="/library">📚 Kho tài nguyên</a>
                </div>
            </div>

            <!-- DROPDOWN: QUẢN TRỊ (chỉ admin, ẩn mặc định) -->
            <div class="nav-dropdown" id="adminMegaMenu" style="display:none;">
                <button class="nav-drop-btn" style="color:#B8860B;">⚙️ QUẢN TRỊ</button>
                <div class="nav-drop-menu">
                    <a href="/admin-dashboard">📊 Dashboard</a>
                    <a href="${CONFIG.SHEET_EDIT_URL}" target="_blank">👥 Quản lý học viên</a>
                    <a href="${CONFIG.SHEET_TONGHOP_URL}" target="_blank">📋 Dữ liệu đăng ký</a>
                </div>
            </div>
            
            <a href="/login" id="navLoginLink" style="color:var(--primary)">ĐĂNG NHẬP</a>
        </nav>
    </header>

    <nav style="background:#E2ECFA; padding:10px 5%; font-size:0.8rem; border-bottom:1px solid var(--border); display:flex; gap:6px; overflow-x:auto; white-space:nowrap; -webkit-overflow-scrolling:touch; align-items:center; flex-wrap:wrap;">
        <span style="color:var(--muted); font-weight:800; font-size:0.72rem; letter-spacing:0.3px;">🎯 HỌC THỬ:</span>
        <a href="/generative-ai" style="color:#0052CC; text-decoration:none; font-weight:700; background:#fff; padding:4px 12px; border-radius:20px; border:1px solid #CFD8EA; font-size:0.78rem;">✨ Generative AI</a>
        <a href="/ai-productivity" style="color:#0068FF; text-decoration:none; font-weight:700; background:#fff; padding:4px 12px; border-radius:20px; border:1px solid #CFD8EA; font-size:0.78rem;">⚡ AI Productivity</a>
        <a href="/ic3-lv1" style="color:#16a34a; text-decoration:none; font-weight:700; background:#fff; padding:4px 12px; border-radius:20px; border:1px solid #CFD8EA; font-size:0.78rem;">🟢 IC3 Level 1</a>
        <a href="/ic3-lv2" style="color:#d97706; text-decoration:none; font-weight:700; background:#fff; padding:4px 12px; border-radius:20px; border:1px solid #CFD8EA; font-size:0.78rem;">🟡 IC3 Level 2</a>
        <a href="/ic3-lv3" style="color:#dc2626; text-decoration:none; font-weight:700; background:#fff; padding:4px 12px; border-radius:20px; border:1px solid #CFD8EA; font-size:0.78rem;">🔴 IC3 Level 3</a>

    </nav>

    <!-- FIX 2: Icon Zalo SVG logo chuẩn thương hiệu chính thức -->
    <div class="social-sticky-bar" id="stickySocialBar">
        <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="social-sticky-item s-zalo" title="Zalo">
            <!-- Zalo official: nền tròn xanh #0068FF, wordmark trắng chuẩn -->
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#0068FF"/>
                <!-- Wordmark "Zalo" — font bold, kerning chặt -->
                <text x="24" y="28" text-anchor="middle" fill="white"
                      font-family="'Helvetica Neue', Arial, sans-serif"
                      font-weight="800" font-size="17" letter-spacing="-0.3">Zalo</text>
            </svg>
        </a>
        <a href="${CONFIG.SOCIALS.FACEBOOK}" target="_blank" class="social-sticky-item s-fb" title="Facebook">
            <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.MESSENGER}" target="_blank" class="social-sticky-item s-mess" title="Messenger">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.36 2 2 6.13 2 11.43c0 2.99 1.45 5.63 3.73 7.37.19.15.31.38.31.62l-.07 1.94c-.02.51.52.88.96.63l2.15-1.21c.18-.1.39-.13.59-.08 1.02.28 2.1.43 3.33.43 5.64 0 10-4.13 10-9.43S17.64 2 12 2zm1.02 12.35l-2.42-2.58-4.73 2.58 5.2-5.53 2.47 2.58 4.68-2.58-5.2 5.53z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.YOUTUBE}" target="_blank" class="social-sticky-item s-yt" title="Youtube">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.503 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.TIKTOK}" target="_blank" class="social-sticky-item s-tt" title="Tiktok">
            <svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.16 8.16 0 004.77 1.52V7.09a4.85 4.85 0 01-1-.4z" fill="white"/></svg>
        </a>    
    </div>

    <main id="mainWebBody">${content}</main>

    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>📍 Số 57 Lê Văn Thuyết A, Lê Chân, Hải Phòng</p><p>📞 Hotline: 0912.888.360</p></div>
            <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
            <div style="height:160px; border-radius:15px; overflow:hidden;">
                <iframe src="https://maps.google.com/maps?q=Hai%20Phong&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>

    <script>
        // FIX 4: Admin đa thiết bị – KHÔNG thu hồi session cũ, chỉ thêm session mới
        function applyAdminSession() {
            var isAdmin = localStorage.getItem('mos360_admin_session') === 'active';
            var menu = document.getElementById('adminMegaMenu');
            if (menu) menu.style.display = isAdmin ? 'block' : 'none';
            var logLink = document.getElementById('navLoginLink');
            if (logLink && isAdmin) {
                logLink.textContent = "ĐĂNG XUẤT ADMIN";
                logLink.href = "#";
                logLink.onclick = function(e) {
                    e.preventDefault();
                    localStorage.removeItem('mos360_admin_session');
                    window.location.href = "/";
                };
            }
        }
        applyAdminSession();

        function adjustLayoutMobile() {
            if (window.innerWidth <= 768) {
                var bar = document.getElementById('stickySocialBar');
                var main = document.getElementById('mainWebBody');
                if (bar && main && bar.parentNode !== main) main.appendChild(bar);
            }
        }
        window.addEventListener('resize', adjustLayoutMobile);
        window.addEventListener('DOMContentLoaded', adjustLayoutMobile);
    </script>

    </body></html>`;
    },

    getHomeUI(studentData, promoConfig = {}, mode = 'home') {
        const promo = promoConfig || {};
        const isPromoActive = promo.active && promo.title;

        // Tính countdown deadline — normalize date string cho V8/CF Workers
        let countdownHtml = '';
        if (isPromoActive && promo.deadline) {
            // Normalize "06/30/2026 11:59 PM" → "2026-06-30T23:59:00" (ISO safe)
            let dlRaw = promo.deadline.trim();
            let dlMs = NaN;
            try {
                // Try ISO first
                dlMs = Date.parse(dlRaw);
                if (isNaN(dlMs)) {
                    // Parse "MM/DD/YYYY HH:MM AM/PM"
                    const m = dlRaw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
                    if (m) {
                        let hh = parseInt(m[4]);
                        const mm = parseInt(m[5]);
                        const ampm = (m[6] || '').toUpperCase();
                        if (ampm === 'PM' && hh < 12) hh += 12;
                        if (ampm === 'AM' && hh === 12) hh = 0;
                        dlMs = new Date(parseInt(m[3]), parseInt(m[1]) - 1, parseInt(m[2]), hh, mm, 59).getTime();
                    }
                }
            } catch (e) { dlMs = NaN; }
            const dl = new Date(dlMs);
            const now = new Date();
            const diff = dl - now;
            if (diff > 0) {
                const days = Math.floor(diff / 86400000);
                const hrs = Math.floor((diff % 86400000) / 3600000);
                countdownHtml = `<span style="font-family:monospace;font-weight:800;color:#fff;background:rgba(0,0,0,0.3);padding:2px 8px;border-radius:6px;margin-left:8px">Còn ${days} ngày ${hrs} giờ</span>`;
            } else {
                // Hết hạn — không hiện
                promo.active = false;
            }
        }

        // Banner sticky
        const bannerHtml = (isPromoActive && promo.showBanner !== false) ? `
<div id="promoBanner" style="background:linear-gradient(90deg,${promo.color || '#FF5722'},${promo.color2 || '#e64a19'});padding:10px 20px;text-align:center;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;position:relative">
  <span style="font-size:0.88rem;font-weight:700;color:#fff">${promo.badge || '🔥'} ${promo.title}</span>
  ${countdownHtml}
  ${promo.subtitle ? `<span style="font-size:0.82rem;color:rgba(255,255,255,0.85)">— ${promo.subtitle}</span>` : ''}
  <a href="#hn-promo" style="padding:4px 14px;background:rgba(0,0,0,0.25);color:#fff;border-radius:100px;font-size:0.78rem;font-weight:800;text-decoration:none">Xem ngay →</a>
  <button onclick="document.getElementById('promoBanner').remove()" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,0.6);font-size:1.2rem;cursor:pointer;line-height:1">×</button>
</div>` : '';

        // Section KM
        const discountItems = (promo.discounts || []).map(d => `
  <div style="background:#FFFFFF;border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center;box-shadow:0 4px 16px rgba(15,23,42,0.04)">
    <div style="font-size:1.8rem;font-weight:900;color:${promo.color || '#FF5722'};margin-bottom:4px">${d.label}</div>
    <div style="font-size:0.88rem;font-weight:700;color:var(--text);margin-bottom:4px">${d.title}</div>
    <div style="font-size:0.78rem;color:var(--muted)">${d.note || ''}</div>
  </div>`).join('');

        const promoSectionHtml = (isPromoActive && promo.showSection !== false) ? `
<div class="hn-section" id="hn-promo" style="padding:56px 24px;background:linear-gradient(180deg,rgba(${promo.colorRgb || '255,87,34'},0.06) 0%,transparent 100%)">
  <div class="hn-inner">
    <div class="hn-tag" style="color:${promo.color || '#FF5722'}">${promo.badge || '🔥'} Khuyến mãi</div>
    <h2 class="hn-h2">${promo.title}</h2>
    ${promo.subtitle ? `<p class="hn-desc">${promo.subtitle}</p>` : ''}
    ${promo.deadline ? `<div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,87,34,0.1);border:1px solid rgba(255,87,34,0.3);border-radius:100px;padding:6px 16px;margin-bottom:28px;font-size:0.82rem;font-weight:700;color:#fff">⏰ Hết hạn: <strong>${new Date(promo.deadline).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</strong>${countdownHtml}</div>` : ''}
    ${discountItems ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:28px">${discountItems}</div>` : ''}
    <a href="/register#hn-register" class="hn-btn-p" style="font-size:0.9rem;padding:12px 28px">Đăng ký ngay →</a>
  </div>
</div>
<hr class="hn-divider">` : '';

        // Testimonials từ feedback thật
        const testimonials = [
            { name: 'Tú Linh Nguyễn', score: 'W: 884 · E: 1000', text: 'Phần mềm dễ hiểu, GV hướng dẫn siêu chi tiết. Nội dung bài học sát bài thi, luyện đúng để được 1000/1000. Nên học ở đây nha!' },
            { name: 'Đào Minh Hà Phương', score: 'W: 950 · E: 950', text: 'Trước đây mình gần như "mù công nghệ". Nhờ GV tận tình, mình đã đạt 950 điểm MOS cho cả Word và Excel — kết quả mà trước đây mình chưa từng nghĩ tới.' },
            { name: 'Phong Đoàn', score: '1000 điểm', text: 'Ôn siêu sát đề thi, học là bao đỗ. Mình được 981 điểm chỉ trong 2 ngày luyện.' },
            { name: 'Đinh Thiếu', score: 'W: 950 · E: 1000', text: 'Word còn dư 15 phút, Excel còn dư 28 phút. Đề giống phần mềm luyện thi gần như 100%!' },
            { name: 'Nguyễn Xuân Quang', score: 'E: 1000 · W: 925', text: 'Đề giống đúng không ạ? — Vâng, giống ạ. Em chưa biết sai ở đâu. Xuất sắc quá!' },
            { name: 'Vũ Thị Hường', score: 'W: 907 · E: 981', score2: 'Suýt 1000 luôn!', text: 'Mỗi môn em chỉ mất 15 phút để làm xong. Cảm ơn chị rất nhiều ạ.' },
            { name: 'Phạm Văn Trình', score: 'Gần 100%', text: 'Em cảm ơn chị đã giúp đỡ và hỗ trợ bọn em rất nhiệt tình. Chúc trung tâm ngày càng phát triển hơn. Em sẽ recommend thêm bạn tới học ạ.' },
            { name: 'Trần Đức Hải', score: '5⭐', text: 'Mình thấy ôn đề sát với đề thi nên rất dễ đạt điểm.' },
        ];
        const testimonialsHtml = testimonials.map((t, i) => `
  <div class="hn-tcard" style="flex-shrink:0;width:300px;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;box-shadow:0 4px 16px rgba(15,23,42,0.04)">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#FF5722,#ff8a65);display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:1rem;flex-shrink:0">${t.name.charAt(0)}</div>
      <div>
        <div style="font-size:0.88rem;font-weight:700;color:var(--text)">${t.name}</div>
      </div>
    </div>
    <p style="font-size:0.83rem;color:var(--muted);line-height:1.6;font-style:italic">"${t.text}"</p>
  </div>`).join('');

        const scheduleRows = CONFIG.SCHEDULE.map(row => {
            const parseDate = str => {
                if (!str) return null;
                const p = str.split('/');
                return p.length === 3 ? new Date(+p[2], +p[1] - 1, +p[0]) : null;
            };
            const getMonth = dates => {
                const m = dates.match(/(\d{2})\/(\d{4})$/);
                return m ? new Date(+m[2], +m[1] - 1, 1) : null;
            };
            const now = new Date();
            const curMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const maxMonth = new Date(now.getFullYear(), now.getMonth() + 6, 1);
            const examMonth = getMonth(row.dates);
            if (!examMonth || examMonth < curMonth || examMonth >= maxMonth) return '';
            const dl = parseDate(row.deadline);
            let tag = '', rowStyle = '';
            if (dl && now > dl) {
                tag = '<span class="htag tag-done">Đã đóng</span>';
            } else if (dl) {
                const diff = (dl - now) / 86400000;
                if (diff <= 5) {
                    tag = '<span class="htag tag-soon">⚠ Sắp đóng</span>';
                    rowStyle = 'background:rgba(245,158,11,0.04)';
                } else if (parseDate(row.from) && now >= parseDate(row.from)) {
                    tag = '<span class="htag tag-open">🟢 Đang mở</span>';
                    rowStyle = 'background:rgba(34,197,94,0.04)';
                } else {
                    tag = '<span class="htag tag-future">Sắp mở</span>';
                }
            } else {
                tag = '<span class="htag tag-future">Sắp TB</span>';
            }
            return `<tr style="${rowStyle}"><td style="font-weight:700">Đợt ${row.dot}</td><td>${row.dates}</td><td style="color:#f59e0b;font-weight:700">${row.deadline || '—'}</td><td>${tag}</td></tr>`;
        }).join('');

        return `
<!-- NEW HOMEPAGE 2026 -->
${bannerHtml}
<style>
:root { --p:#FF5722; --bg:#F0F4FA; --card:#FFFFFF; --border:#CFD8EA; --cyan:#0052CC; --muted:#5A6A85; --text:#0F1F40; }
.hn-hero { min-height:90vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:80px 24px 60px; position:relative; overflow:hidden; }
.hn-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 20%,rgba(255,87,34,0.05),transparent 70%),radial-gradient(ellipse 60% 50% at 80% 80%,rgba(0,82,204,0.07),transparent 60%),radial-gradient(ellipse 40% 30% at 20% 60%,rgba(0,82,204,0.04),transparent 60%); }
.hn-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(0,38,100,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,38,100,0.03) 1px,transparent 1px); background-size:48px 48px; mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,black,transparent 70%); }
.hn-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(255,87,34,0.1); border:1px solid rgba(255,87,34,0.3); border-radius:100px; padding:8px 18px; font-size:0.92rem; font-weight:700; color:var(--p); letter-spacing:0.5px; margin-bottom:20px; }
.hn-h1 { font-size:clamp(1.9rem,5.5vw,3.6rem); font-weight:900; line-height:1.12; letter-spacing:-1px; margin-bottom:8px; }
.hn-h1 .g1 { background:linear-gradient(135deg,#FF5722,#ff8a65); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.hn-h1 .g2 { background:linear-gradient(135deg,var(--cyan),#2684FF); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.hn-sub { color:var(--muted); font-size:clamp(0.9rem,2vw,1.1rem); max-width:520px; margin:0 auto 32px; line-height:1.7; }
.hn-acts { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.hn-btn-p { padding:13px 28px; background:var(--p); color:#fff; border-radius:10px; font-weight:800; font-size:0.95rem; text-decoration:none; transition:all 0.15s; }
.hn-btn-p:hover { background:#e64a19; transform:translateY(-1px); }
.hn-btn-s { padding:13px 28px; background:rgba(15,23,42,0.06); color:var(--text); border-radius:10px; font-weight:700; font-size:0.95rem; text-decoration:none; border:1px solid rgba(15,23,42,0.08); transition:all 0.15s; }
.hn-btn-s:hover { background:rgba(15,23,42,0.06); }
.hn-stats { display:flex; gap:36px; justify-content:center; margin-top:52px; flex-wrap:wrap; }
.hn-stat .num { font-size:2.6rem; font-weight:800; color:var(--text); font-family:monospace; }
.hn-stat .num span { color:var(--p); }
.hn-stat .lbl { font-size:0.73rem; color:var(--muted); font-weight:600; margin-top:2px; }

.hn-tscroll{display:flex;gap:16px;overflow-x:auto;padding-bottom:12px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
.hn-tscroll::-webkit-scrollbar{height:4px}
.hn-tscroll::-webkit-scrollbar-thumb{background:rgba(255,87,34,0.4);border-radius:2px}
.hn-tcard{scroll-snap-align:start}
.hn-section { padding:72px 24px; }
.hn-inner { max-width:1100px; margin:0 auto; }
.hn-tag { display:inline-flex; align-items:center; gap:6px; font-size:0.72rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--p); margin-bottom:10px; }
.hn-h2 { font-size:clamp(1.4rem,3.5vw,2.1rem); font-weight:800; letter-spacing:-0.5px; margin-bottom:8px; }
.hn-desc { color:var(--muted); font-size:0.93rem; margin-bottom:32px; max-width:520px; line-height:1.65; }

/* Course cards */
.hn-course-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px; }
.hn-course { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; transition:all 0.2s; }
.hn-course:hover { border-color:rgba(255,87,34,0.35); transform:translateY(-3px); box-shadow:0 12px 36px rgba(0,0,0,0.4); }
.hn-course-thumb { height:140px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
.hn-course-thumb::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 30% 30%,rgba(255,87,34,0.1),transparent 60%); }
.hn-course-thumb .hn-ico { font-size:2.6rem; z-index:1; }
.hn-cbadge { position:absolute; top:10px; right:10px; padding:3px 9px; border-radius:100px; font-size:0.67rem; font-weight:700; }
.hn-syl-btn { position:absolute; bottom:10px; left:50%; transform:translateX(-50%); z-index:2; display:inline-flex; align-items:center; gap:6px; padding:7px 16px; background:rgba(255,255,255,0.92); border:1px solid rgba(15,23,42,0.08); color:var(--text); font-weight:700; font-size:0.78rem; border-radius:100px; cursor:pointer; font-family:inherit; backdrop-filter:blur(4px); box-shadow:0 2px 10px rgba(15,23,42,0.08); transition:all 0.15s; white-space:nowrap; }
.hn-syl-btn:hover { background:#fff; transform:translateX(-50%) translateY(-1px); box-shadow:0 4px 14px rgba(15,23,42,0.12); }
.cbadge-hot { background:rgba(255,87,34,0.2); color:#ff8a65; border:1px solid rgba(255,87,34,0.3); }
.cbadge-new { background:rgba(0,82,204,0.12); color:var(--cyan); border:1px solid rgba(0,82,204,0.25); }
.cbadge-gold { background:rgba(255,215,0,0.12); color:#FFD700; border:1px solid rgba(255,215,0,0.25); }
.cbadge-ai { background:rgba(167,139,250,0.12); color:#a78bfa; border:1px solid rgba(167,139,250,0.25); }
.hn-cbody { padding:16px; }
.hn-ctitle { font-size:0.97rem; font-weight:700; margin-bottom:4px; }
.hn-cdesc { font-size:0.8rem; color:var(--muted); line-height:1.5; margin-bottom:10px; }
.hn-cprice { font-size:1.15rem; font-weight:800; color:var(--cyan); margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.hn-cprice .old { font-size:0.8rem; color:var(--muted); text-decoration:line-through; font-weight:400; }
.hn-cbtns { display:flex; gap:7px; }
.hn-cbtn-p { flex:1; padding:8px; background:var(--p); color:#fff; border:none; border-radius:8px; font-weight:800; font-size:0.8rem; cursor:pointer; text-decoration:none; text-align:center; transition:all 0.15s; }
.hn-cbtn-p:hover { background:#e64a19; }
.hn-cbtn-s { padding:8px 12px; background:rgba(15,23,42,0.04); color:var(--muted); border:1px solid rgba(15,23,42,0.06); border-radius:8px; font-weight:700; font-size:0.8rem; cursor:pointer; white-space:nowrap; transition:all 0.15s; }
.hn-cbtn-s:hover { color:var(--text); background:rgba(15,23,42,0.08); }

/* Video feature */
.hn-video-wrap { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; display:grid; grid-template-columns:1fr 1fr; }
.hn-video-left { padding:28px; display:flex; flex-direction:column; justify-content:center; }
.hn-video-left h3 { font-size:1.1rem; font-weight:800; margin-bottom:8px; }
.hn-video-left p { font-size:0.85rem; color:var(--muted); line-height:1.6; margin-bottom:20px; }
.hn-video-right { background:linear-gradient(135deg,#E2ECFA,#D6E4F7); display:flex; align-items:center; justify-content:center; min-height:220px; cursor:pointer; position:relative; transition:all 0.2s; }
.hn-video-right:hover .hn-play { background:var(--cyan); color:#fff; transform:scale(1.1); }
.hn-play { width:60px; height:60px; background:rgba(0,82,204,0.12); border:2px solid var(--cyan); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.3rem; color:var(--cyan); transition:all 0.25s; }

/* Tools */
.hn-tools-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:10px; }
.hn-tool { background:var(--card); border:1px solid var(--border); border-radius:11px; padding:13px 15px; display:flex; align-items:center; gap:11px; text-decoration:none; color:inherit; transition:all 0.2s; }
.hn-tool:hover { border-color:rgba(255,87,34,0.3); transform:translateY(-2px); }
.hn-tool-ico { width:38px; height:38px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0; }
.hn-tool-name { font-size:0.84rem; font-weight:700; margin-bottom:1px; }
.hn-tool-type { font-size:0.69rem; color:var(--muted); font-weight:600; }
.hn-tool-arr { margin-left:auto; color:var(--muted); transition:all 0.15s; flex-shrink:0; font-size:0.85rem; }
.hn-tool:hover .hn-tool-arr { color:var(--p); transform:translateX(3px); }

/* Register tabs */
.hn-reg-tabs { display:flex; gap:0; border:1px solid var(--border); border-radius:10px; overflow:hidden; width:fit-content; margin-bottom:24px; }
.hn-rtab { padding:9px 22px; background:transparent; border:none; border-right:1px solid var(--border); color:var(--muted); font-weight:600; font-size:0.83rem; cursor:pointer; font-family:inherit; transition:all 0.15s; }
.hn-rtab:last-child { border-right:none; }
.hn-rtab.active { background:var(--p); color:#fff; }
.hn-rpanel { display:none; }
.hn-rpanel.active { display:block; }
.hn-form-wrap { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; }
.hn-fh { padding:20px 22px; border-bottom:1px solid var(--border); display:flex; gap:13px; align-items:flex-start; }
.hn-fh-ico { width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.25rem; flex-shrink:0; }
.hn-fh h3 { font-size:1rem; font-weight:700; margin-bottom:3px; }
.hn-fh p { font-size:0.8rem; color:var(--muted); line-height:1.55; }
.hn-fi { padding:16px 22px; display:grid; grid-template-columns:repeat(auto-fit,minmax(185px,1fr)); gap:10px; border-bottom:1px solid var(--border); }
.hn-fi-item { display:flex; gap:8px; align-items:flex-start; }
.hn-fi-ico { font-size:0.9rem; margin-top:1px; flex-shrink:0; }
.hn-fi-txt { font-size:0.79rem; color:var(--muted); line-height:1.5; }
.hn-fi-txt strong { color:var(--text); display:block; font-size:0.82rem; margin-bottom:1px; }
.hn-fcta { padding:20px 22px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.hn-fcta a { display:inline-flex; align-items:center; gap:7px; padding:10px 20px; background:var(--p); color:#fff; border-radius:9px; font-weight:800; font-size:0.87rem; text-decoration:none; transition:all 0.15s; }
.hn-fcta a:hover { background:#e64a19; }
.hn-fnote { font-size:0.76rem; color:var(--muted); line-height:1.55; }

/* Schedule */
.hn-sch-wrap { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; }
.hn-sch-top { padding:16px 22px; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; }
.hn-sch-top h3 { font-size:0.92rem; font-weight:700; }
.hn-legend { display:flex; gap:12px; font-size:0.72rem; color:var(--muted); }
.hn-legend span { display:flex; align-items:center; gap:4px; }
.hn-ldot { width:7px; height:7px; border-radius:50%; display:inline-block; }
table.hn-table { width:100%; border-collapse:collapse; }
.hn-table thead th { padding:9px 16px; text-align:left; font-size:0.7rem; font-weight:700; color:var(--muted); letter-spacing:0.5px; text-transform:uppercase; border-bottom:1px solid var(--border); white-space:nowrap; }
.hn-table tbody td { padding:11px 16px; font-size:0.83rem; border-bottom:1px solid var(--border); }
.hn-table tbody tr:last-child td { border-bottom:none; }
.hn-table tbody tr:hover { background:rgba(15,23,42,0.02); }
.htag { padding:2px 8px; border-radius:100px; font-size:0.67rem; font-weight:700; white-space:nowrap; }
.tag-done { background:rgba(71,85,105,0.3); color:var(--muted); }
.tag-open { background:rgba(34,197,94,0.12); color:#22c55e; border:1px solid rgba(34,197,94,0.25); }
.tag-soon { background:rgba(245,158,11,0.12); color:#f59e0b; border:1px solid rgba(245,158,11,0.25); }
.tag-future { background:rgba(0,82,204,0.07); color:var(--cyan); border:1px solid rgba(0,82,204,0.18); }

/* Lookup */
.hn-lookup-box { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:28px; max-width:580px; }
.hn-linput-wrap { display:flex; gap:10px; margin-bottom:18px; }
.hn-linput { flex:1; padding:11px 15px; background:#E2ECFA; border:1px solid rgba(15,23,42,0.06); border-radius:9px; color:var(--text); font-size:0.9rem; font-family:inherit; outline:none; transition:border-color 0.15s; }
.hn-linput:focus { border-color:var(--p); }
.hn-linput::placeholder { color:var(--muted); }
.hn-lbtn { padding:11px 22px; background:var(--p); color:#fff; border:none; border-radius:9px; font-weight:800; font-size:0.9rem; cursor:pointer; font-family:inherit; transition:all 0.15s; white-space:nowrap; }
.hn-lbtn:hover { background:#e64a19; }
.hn-lresult { background:#E2ECFA; border:1px solid var(--border); border-radius:11px; padding:18px; display:none; }
.hn-lresult.show { display:block; }
.hn-lresult h4 { font-size:0.7rem; color:var(--muted); font-weight:700; letter-spacing:1px; text-transform:uppercase; margin-bottom:12px; }
.hn-lf { display:flex; gap:12px; align-items:baseline; margin-bottom:7px; }
.hn-lf-key { font-size:0.78rem; color:var(--muted); min-width:96px; flex-shrink:0; }
.hn-lf-val { font-size:0.88rem; font-weight:700; color:var(--text); }
.hn-lf-val.hl { color:var(--cyan); }
.hn-lf-val.ok { color:#22c55e; }
.hn-lnote { font-size:0.73rem; color:var(--muted); margin-top:12px; padding-top:11px; border-top:1px solid var(--border); line-height:1.55; }
.hn-lmsg { padding:14px; text-align:center; font-size:0.84rem; color:var(--muted); display:none; border-radius:10px; background:#E2ECFA; border:1px solid var(--border); }
.hn-lmsg.show { display:block; }

/* Bảng vàng */
.hn-bvang { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; }
.hn-bvang-hdr { padding:16px 22px; border-bottom:1px solid var(--border); font-weight:700; font-size:0.92rem; }

/* Divider */
.hn-divider { border:none; border-top:1px solid #CFD8EA; margin:0; }

@media(max-width:768px) {
  .hn-video-wrap { grid-template-columns:1fr; }
  .hn-video-right { min-height:160px; }
  .hn-reg-tabs { width:100%; }
  .hn-rtab { flex:1; text-align:center; font-size:0.75rem; padding:9px 6px; }
}
</style>

<!-- HERO -->
${mode === 'register' ? `
<div class="hn-hero" style="padding-bottom:24px">
  <div class="hn-hero-bg"></div>
  <div class="hn-grid"></div>
  <div style="position:relative;z-index:1">
    <div class="hn-badge">✦ Trung tâm tin học MOS360</div>
    <h1 class="hn-h1" style="font-size:1.9rem">📝 Đăng ký & Tra cứu</h1>
    <p class="hn-sub">Đăng ký học · Đăng ký thi MOS · Đăng ký học Offline · Tra cứu thông tin dự thi — tất cả trong một trang.</p>
    <div class="hn-acts">
      <a href="/" class="hn-btn-s">← Về trang chủ</a>
      <a href="/courses" class="hn-btn-p">Xem khóa học →</a>
    </div>
  </div>
</div>
` : `
<div class="hn-hero">
  <div class="hn-hero-bg"></div>
  <div class="hn-grid"></div>
  <div style="position:relative;z-index:1">
    <div class="hn-badge">✦ Trung tâm tin học MOS360</div>
    <h1 class="hn-h1">Xóa tan nỗi lo<br><span class="g1">chuẩn đầu ra</span> <span class="g2">cho sinh viên</span></h1>
    <p class="hn-sub">Học thật · Tiến bộ thật · Làm được thật.<br>MOS/IC3/AI chỉ là chứng nhận — kỹ năng mới là tài sản thật sự.</p>
    <div class="hn-acts">
      <a href="/courses" class="hn-btn-p">Xem khóa học →</a>
      <a href="/register#hn-register" class="hn-btn-s">Đăng ký ngay</a>
    </div>
    <div class="hn-stats">
      <div class="hn-stat"><div class="num" data-target="1000" data-suffix="+">0</div><div class="lbl">Học viên</div></div>
      <div class="hn-stat"><div class="num" data-target="100" data-suffix="%">0</div><div class="lbl">Thi đậu lần đầu</div></div>
      <div class="hn-stat"><div class="num" data-target="700" data-suffix="+">0</div><div class="lbl">Cam kết bằng văn bản</div></div>
    </div>
  </div>
</div>
`}

<hr class="hn-divider">

${mode !== 'register' ? `
<!-- BẢNG VÀNG CHỨNG CHỈ -->
<div class="hn-section" style="padding:48px 24px">
  <div class="hn-inner">
    <div class="hn-tag">🏆 Bảng vàng</div>
    <h2 class="hn-h2">Chứng chỉ Quốc tế của học viên MOS360</h2>
    <p class="hn-desc" style="margin-bottom:20px">Hơn 1000 học viên đã nhận chứng chỉ MOS & IC3 từ Certiport.</p>
    <div class="hn-bvang">
      <div class="hn-bvang-hdr">🏆 BẢNG VÀNG CHỨNG CHỈ QUỐC TẾ</div>
      <div style="height:520px; overflow:hidden; padding:4px;">
        <div class="carousel-viewport" style="border-radius:10px;">
          <div class="carousel-track">${studentData}</div>
        </div>
      </div>
    </div>
  </div>
</div>

<hr class="hn-divider">

<!-- TESTIMONIALS -->
<div class="hn-section" style="padding:56px 24px">
  <div class="hn-inner">
    <div class="hn-tag">💬 Học viên nói gì</div>
    <h2 class="hn-h2">Kết quả từ học viên MOS360</h2>
    <p class="hn-desc" style="margin-bottom:24px">100% đề xuất · 668+ lượt đánh giá · Điểm số xác thực từ hệ thống Certiport.</p>
    <div class="hn-tscroll">${testimonialsHtml}</div>
  </div>
</div>

<hr class="hn-divider">

${promoSectionHtml}

<!-- KHÓA HỌC NỔI BẬT -->
<div class="hn-section" id="hn-courses">
  <div class="hn-inner">
    <div class="hn-tag">📚 Khóa học</div>
    <h2 class="hn-h2">Luyện thi chứng chỉ quốc tế</h2>
    <p class="hn-desc">Học trực tiếp trên phần mềm giao diện 98% sát đề thi. Cam kết đầu ra — hoàn tiền 100% nếu chưa đạt.</p>

    <div class="hn-course-grid">
      <!-- MOS Word + Excel -->
      <div class="hn-course">
        <div class="hn-course-thumb" style="background:linear-gradient(135deg,#E6F7ED,#D4F0DF)">
          <span class="hn-ico">📊</span>
          <span class="hn-cbadge cbadge-hot">🔥 Bán chạy</span>
        </div>
        <div class="hn-cbody">
          <div class="hn-ctitle">Luyện thi MOS Word + Excel 2019</div>
          <div class="hn-cdesc">Combo 2 môn phổ biến nhất. Giao diện phần mềm 98% sát đề thi thật.</div>
          <div class="hn-cprice">800.000đ <span class="old">1.200.000đ</span></div>
          <div class="hn-cbtns">
            <a href="/register#hn-register" class="hn-cbtn-p">Đăng ký học</a>
            <button class="hn-cbtn-s" onclick="openVideoModal('https://www.youtube.com/watch?v=LPmScfHMk_o')">▶ Học thử</button>
            <button class="hn-cbtn-s" onclick="openVideoModal('https://www.youtube.com/watch?v=RA_UIuxwkzk')">🎯 Thi thử</button>
          </div>
        </div>
      </div>
      <!-- MOS PPT -->
      <div class="hn-course">
        <div class="hn-course-thumb" style="background:linear-gradient(135deg,#FFF1EC,#FFE3D6)">
          <span class="hn-ico">📑</span>
          <span class="hn-cbadge cbadge-new">✨ Mới</span>
        </div>
        <div class="hn-cbody">
          <div class="hn-ctitle">Luyện thi MOS PowerPoint 2019</div>
          <div class="hn-cdesc">Thuyết trình chuyên nghiệp chuẩn quốc tế. Thiết yếu cho sinh viên và văn phòng.</div>
          <div class="hn-cprice">400.000đ <span class="old">600.000đ</span></div>
          <div class="hn-cbtns">
            <a href="/register#hn-register" class="hn-cbtn-p">Đăng ký học</a>
            <button class="hn-cbtn-s" onclick="openVideoModal('https://youtu.be/o7mmLCeA1D0')">▶ Học thử</button>
            <button class="hn-cbtn-s" onclick="openVideoModal('https://youtu.be/jPt1uNLbU5U')">🎯 Thi thử</button>
          </div>
        </div>
      </div>
      <!-- IC3 Level 1 -->
      <div class="hn-course">
        <div class="hn-course-thumb" style="background:linear-gradient(135deg,#F0FDF4,#DCFCE7)">
          <span class="hn-ico">🌐</span>
          <span class="hn-cbadge" style="background:rgba(22,163,74,0.15); color:#16a34a; border:1px solid rgba(22,163,74,0.3);">IC3 GS6 · LV1</span>
          <a href="/course-intro/ic3" class="hn-syl-btn" onclick="event.stopPropagation()">📘 Giáo trình học</a>
        </div>
        <div class="hn-cbody">
          <div class="hn-ctitle">Luyện thi IC3 GS6 — Level 1</div>
          <div class="hn-cdesc">Computing Fundamentals. Kiến thức nền tảng về máy tính, phần cứng, phần mềm, mạng và công dân số.</div>
          <div class="hn-cprice" style="color:#16a34a;">100.000đ <span class="old">300.000đ</span></div>
          <div class="hn-cbtns">
            <a href="/register#hn-register" class="hn-cbtn-p">Đăng ký học</a>
            <a href="/ic3-lv1" class="hn-cbtn-s">▶ Học thử</a>
            <a href="/ic3-lv1" class="hn-cbtn-s">🎯 Thi thử</a>
          </div>
        </div>
      </div>
      <!-- IC3 Level 2 -->
      <div class="hn-course">
        <div class="hn-course-thumb" style="background:linear-gradient(135deg,#FFFBEB,#FEF3C7)">
          <span class="hn-ico">🌐</span>
          <span class="hn-cbadge" style="background:rgba(217,119,6,0.15); color:#d97706; border:1px solid rgba(217,119,6,0.3);">IC3 GS6 · LV2</span>
          <a href="/course-intro/ic3" class="hn-syl-btn" onclick="event.stopPropagation()">📘 Giáo trình học</a>
        </div>
        <div class="hn-cbody">
          <div class="hn-ctitle">Luyện thi IC3 GS6 — Level 2</div>
          <div class="hn-cdesc">Key Applications. Kỹ năng sử dụng Word, Excel, PowerPoint và các ứng dụng văn phòng thực tế.</div>
          <div class="hn-cprice" style="color:#d97706;">100.000đ <span class="old">300.000đ</span></div>
          <div class="hn-cbtns">
            <a href="/register#hn-register" class="hn-cbtn-p">Đăng ký học</a>
            <a href="/ic3-lv2" class="hn-cbtn-s">▶ Học thử</a>
            <a href="/ic3-lv2" class="hn-cbtn-s">🎯 Thi thử</a>
          </div>
        </div>
      </div>
      <!-- IC3 Level 3 -->
      <div class="hn-course">
        <div class="hn-course-thumb" style="background:linear-gradient(135deg,#FFF1F2,#FFE4E6)">
          <span class="hn-ico">🌐</span>
          <span class="hn-cbadge" style="background:rgba(220,38,38,0.15); color:#dc2626; border:1px solid rgba(220,38,38,0.3);">IC3 GS6 · LV3</span>
          <a href="/course-intro/ic3" class="hn-syl-btn" onclick="event.stopPropagation()">📘 Giáo trình học</a>
        </div>
        <div class="hn-cbody">
          <div class="hn-ctitle">Luyện thi IC3 GS6 — Level 3</div>
          <div class="hn-cdesc">Living Online. Làm việc và giao tiếp trực tuyến, an toàn mạng, cộng tác số nâng cao.</div>
          <div class="hn-cprice" style="color:#dc2626;">100.000đ <span class="old">300.000đ</span></div>
          <div class="hn-cbtns">
            <a href="/register#hn-register" class="hn-cbtn-p">Đăng ký học</a>
            <a href="/ic3-lv3" class="hn-cbtn-s">▶ Học thử</a>
            <a href="/ic3-lv3" class="hn-cbtn-s">🎯 Thi thử</a>
          </div>
        </div>
      </div>
      <!-- AI Generative -->
      <div class="hn-course">
        <div class="hn-course-thumb" style="background:linear-gradient(135deg,#FFF8E6,#FFEFCC)">
          <span class="hn-ico">🤖</span>
          <span class="hn-cbadge cbadge-ai">⚡ AI</span>
          <a href="/course-intro/genai" class="hn-syl-btn" onclick="event.stopPropagation()">📘 Giáo trình học</a>
        </div>
        <div class="hn-cbody">
          <div class="hn-ctitle">Luyện thi Generative AI</div>
          <div class="hn-cdesc">Kỹ năng sử dụng AI trong học tập & công việc. Prompt, tạo nội dung, tự động hóa.</div>
          <div class="hn-cprice" style="color:#a78bfa">100.000đ <span class="old">400.000đ</span></div>
          <div class="hn-cbtns">
            <a href="/register#hn-register" class="hn-cbtn-p">Đăng ký học</a>
            <a href="/generative-ai" class="hn-cbtn-s">▶ Học thử</a>
            <a href="/generative-ai" class="hn-cbtn-s">🎯 Thi thử</a>
          </div>
        </div>
      </div>
      <!-- AI Productivity -->
      <div class="hn-course">
        <div class="hn-course-thumb" style="background:linear-gradient(135deg,#E8F0FF,#C7D9FF)">
          <span class="hn-ico">⚡</span>
          <span class="hn-cbadge" style="background:linear-gradient(135deg,#0068FF,#00D4FF);color:#fff;">🚀 AI PRO</span>
          <a href="/course-intro/aip" class="hn-syl-btn" onclick="event.stopPropagation()">📘 Giáo trình học</a>
        </div>
        <div class="hn-cbody">
          <div class="hn-ctitle">Làm việc hiệu quả với AI</div>
          <div class="hn-cdesc">8 năng lực AI Productivity: Tư duy, Giao tiếp, Nghiên cứu, Office, Kế hoạch, Quyết định, Workflow, Thực chiến.</div>
          <div class="hn-cprice" style="color:#0068FF">300.000đ <span class="old">600.000đ</span></div>
          <div class="hn-cbtns">
            <a href="/register#hn-register" class="hn-cbtn-p">Đăng ký học</a>
            <a href="/ai-productivity" class="hn-cbtn-s">▶ Học thử</a>
            <a href="/ai-productivity" class="hn-cbtn-s">🎯 Thi thử</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Video giới thiệu phần mềm -->
    <div style="margin-top:40px">
      <div class="hn-tag">🎥 Video giới thiệu</div>
      <h3 class="hn-h2" style="font-size:1.4rem;margin-bottom:6px">Xem phần mềm MOS360 hoạt động</h3>
      <p class="hn-desc" style="margin-bottom:18px">Giao diện thi thật 98% — học và thi thử ngay trên phần mềm trước khi quyết định.</p>
      <div class="hn-video-wrap">
        <div class="hn-video-left">
          <h3>Hướng dẫn sử dụng phần mềm MOS360</h3>
          <p>Xem tổng quan: cách cài đặt, giao diện, học và thi thử từng môn Word · Excel · PowerPoint. Học mọi lúc, không giới hạn số lần.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="hn-btn-p" style="font-size:0.85rem;padding:9px 18px;border:none;cursor:pointer" onclick="openVideoModal('https://www.youtube.com/watch?v=rmXrwT0Iu8U')">▶ Xem ngay</button>
            <a href="/register#hn-register" class="hn-btn-s" style="font-size:0.85rem;padding:9px 18px">Đăng ký học →</a>
          </div>
        </div>
        <div class="hn-video-right" onclick="openVideoModal('https://www.youtube.com/watch?v=rmXrwT0Iu8U')">
          <div class="hn-play">▶</div>
        </div>
      </div>
    </div>
  </div>
</div>

<hr class="hn-divider">

<!-- HỆ THỐNG HỌC TẬP -->
<div class="hn-section" id="hn-tools">
  <div class="hn-inner">

    <!-- KHU 1: HỌC ONLINE -->
    <div style="margin-bottom:32px;">
      <div class="hn-tag" style="background:rgba(22,163,74,0.1);color:#16a34a;">🖥️ Hệ học Online</div>
      <h2 class="hn-h2">IC3 GS6 · Generative AI · AI Productivity</h2>
      <p class="hn-desc">Luyện đề trực tiếp trên web — không cần cài đặt. Đăng nhập học viên để lưu tiến độ học.</p>
      <div class="hn-tools-grid">
        <a href="/ic3-lv1" class="hn-tool" style="border:1.5px solid rgba(22,163,74,0.3);background:rgba(22,163,74,0.03);"><div class="hn-tool-ico" style="background:rgba(22,163,74,0.1)">🟢</div><div><div class="hn-tool-name" style="color:#16a34a">IC3 GS6 Level 1</div><div class="hn-tool-type">Kiến thức nền tảng</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="/ic3-lv2" class="hn-tool" style="border:1.5px solid rgba(217,119,6,0.3);background:rgba(217,119,6,0.03);"><div class="hn-tool-ico" style="background:rgba(217,119,6,0.1)">🟡</div><div><div class="hn-tool-name" style="color:#d97706">IC3 GS6 Level 2</div><div class="hn-tool-type">Nâng cao kỹ năng</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="/ic3-lv3" class="hn-tool" style="border:1.5px solid rgba(220,38,38,0.3);background:rgba(220,38,38,0.03);"><div class="hn-tool-ico" style="background:rgba(220,38,38,0.1)">🔴</div><div><div class="hn-tool-name" style="color:#dc2626">IC3 GS6 Level 3</div><div class="hn-tool-type">Chuyên sâu & thi thật</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="/generative-ai" class="hn-tool" style="border:1.5px solid rgba(0,82,204,0.3);background:rgba(0,82,204,0.03);"><div class="hn-tool-ico" style="background:rgba(0,82,204,0.1)">✨</div><div><div class="hn-tool-name" style="color:var(--cyan)">Generative AI</div><div class="hn-tool-type">Chứng chỉ CCS AI Foundations</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="/ai-productivity" class="hn-tool" style="border:1.5px solid rgba(0,104,255,0.3);background:rgba(0,104,255,0.03);"><div class="hn-tool-ico" style="background:rgba(0,104,255,0.1)">⚡</div><div><div class="hn-tool-name" style="color:#0068FF">AI Productivity</div><div class="hn-tool-type">Làm việc hiệu quả với AI</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="/progress" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(255,87,34,0.1)">📈</div><div><div class="hn-tool-name">Tiến độ học của tôi</div><div class="hn-tool-type">Theo dõi kết quả online</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="/library" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(100,116,139,0.1)">📚</div><div><div class="hn-tool-name">Kho MOS</div><div class="hn-tool-type">Tài liệu & flashcard</div></div><span class="hn-tool-arr">↗</span></a>
      </div>
    </div>

    <!-- DIVIDER -->
    <hr style="border:none;border-top:2px dashed var(--border);margin:0 0 28px;">

    <!-- KHU 2: PHẦN MỀM MOS CÀI TRÊN MÁY -->
    <div>
      <div class="hn-tag" style="background:rgba(0,82,204,0.1);color:var(--cyan);">💻 Phần mềm MOS — Cài trên máy</div>
      <h2 class="hn-h2">MOS Word / Excel / PowerPoint 2019</h2>
      <p class="hn-desc">Phần mềm luyện thi MOS chạy trực tiếp trên máy tính — thực hành sát đề thi thật nhất. Cần mật khẩu kích hoạt sau khi cài.</p>
      <div class="hn-tools-grid">
        <a href="/cap-mat-khau" class="hn-tool" style="border:1.5px solid rgba(0,82,204,0.35);background:rgba(0,82,204,0.04);"><div class="hn-tool-ico" style="background:rgba(0,82,204,0.12)">🔑</div><div><div class="hn-tool-name" style="color:var(--cyan)">Lấy mật khẩu kích hoạt</div><div class="hn-tool-type">Sau khi cài xong — gửi mã ID</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="/ket-qua" class="hn-tool" style="border:1.5px solid rgba(34,197,94,0.3);background:rgba(34,197,94,0.04);"><div class="hn-tool-ico" style="background:rgba(34,197,94,0.1)">📊</div><div><div class="hn-tool-name" style="color:#16a34a">Kết quả luyện tập của tôi</div><div class="hn-tool-type">Lịch sử điểm thi & luyện tập</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.MOS360}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(255,87,34,0.1)">🖥️</div><div><div class="hn-tool-name">Tải phần mềm MOS360</div><div class="hn-tool-type">Luyện thi & thi thử offline</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.OFFICE}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(249,115,22,0.1)">📦</div><div><div class="hn-tool-name">Office 2019 Pro Plus</div><div class="hn-tool-type">Bộ cài Microsoft Office</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.FRAMEWORK}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(167,139,250,0.1)">⚙️</div><div><div class="hn-tool-name">Framework .NET 4.8</div><div class="hn-tool-type">Yêu cầu cho MOS360</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.WINRAR}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(245,158,11,0.1)">🗜️</div><div><div class="hn-tool-name">WinRAR</div><div class="hn-tool-type">Giải nén file cài đặt</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.UNIKEY}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(34,197,94,0.1)">⌨️</div><div><div class="hn-tool-name">Unikey</div><div class="hn-tool-type">Bộ gõ tiếng Việt</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.TEAMVIEWER}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(0,82,204,0.07)">🖥️</div><div><div class="hn-tool-name">TeamViewer</div><div class="hn-tool-type">Hỗ trợ từ xa</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.ULTRAVIEWER}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(167,139,250,0.08)">📡</div><div><div class="hn-tool-name">UltraViewer</div><div class="hn-tool-type">Hỗ trợ từ xa</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.HD_MOS360}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(255,87,34,0.1)">📖</div><div><div class="hn-tool-name">Cài phần mềm MOS360</div><div class="hn-tool-type">Hướng dẫn từng bước</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.HD_OFFICE}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(249,115,22,0.1)">📖</div><div><div class="hn-tool-name">Cài Office 2019</div><div class="hn-tool-type">Hướng dẫn từng bước</div></div><span class="hn-tool-arr">↗</span></a>
        <a href="${CONFIG.TOOLS.HD_THI}" target="_blank" class="hn-tool"><div class="hn-tool-ico" style="background:rgba(34,197,94,0.1)">📋</div><div><div class="hn-tool-name">Hướng dẫn bài thi MOS</div><div class="hn-tool-type">Tài liệu chính thức IIG</div></div><span class="hn-tool-arr">↗</span></a>
      </div>
    </div>

  </div>
</div>

<hr class="hn-divider">
` : ''}

<!-- CSS FORM -->
<style>
.hn-field { margin-bottom:16px; }
.hn-label { display:block; font-size:0.8rem; font-weight:700; color:var(--muted); margin-bottom:6px; letter-spacing:0.3px; }
.hn-label .req { color:#f97316; margin-left:2px; }
.hn-input, .hn-select, .hn-textarea {
  width:100%; padding:10px 14px; background:#F0F4FA; border:1px solid var(--border);
  border-radius:9px; color:var(--text); font-size:0.88rem; font-family:inherit; outline:none;
  transition:border-color 0.15s;
}
.hn-input:focus, .hn-select:focus, .hn-textarea:focus { border-color:#FF5722; }
.hn-input::placeholder, .hn-textarea::placeholder { color:#94A3B8; }
.hn-select option { background:#fff; }
.hn-textarea { resize:vertical; min-height:72px; }
.hn-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.hn-row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
.hn-checkbox-group { display:flex; flex-wrap:wrap; gap:10px; margin-top:4px; }
.hn-checkbox-item { display:flex; align-items:center; gap:7px; cursor:pointer; }
.hn-checkbox-item input[type=checkbox] { width:16px; height:16px; accent-color:#FF5722; cursor:pointer; }
.hn-checkbox-item span { font-size:0.85rem; color:#334155; font-weight:500; }
.hn-submit { width:100%; padding:13px; background:#FF5722; color:#fff; border:none; border-radius:10px;
  font-weight:800; font-size:0.95rem; cursor:pointer; font-family:inherit; transition:all 0.15s;
  margin-top:4px; display:flex; align-items:center; justify-content:center; gap:8px; }
.hn-submit:hover { background:#e64a19; transform:translateY(-1px); }
.hn-submit:disabled { background:#CBD5E1; cursor:not-allowed; transform:none; }
.hn-form-msg { padding:12px 16px; border-radius:9px; font-size:0.85rem; font-weight:600; margin-top:14px; display:none; }
.hn-form-msg.ok { background:rgba(34,197,94,0.12); border:1px solid rgba(34,197,94,0.3); color:#16a34a; display:block; }
.hn-form-msg.err { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); color:#dc2626; display:block; }
.hn-info-box { background:rgba(255,87,34,0.05); border:1px solid rgba(255,87,34,0.15); border-radius:10px; padding:14px 16px; margin-bottom:20px; font-size:0.82rem; color:var(--muted); line-height:1.6; }
.hn-info-box strong { color:var(--text); }
.hn-divider-form { border:none; border-top:1px solid var(--border); margin:20px 0; }
@media(max-width:600px) { .hn-row,.hn-row3 { grid-template-columns:1fr; } }
</style>

${mode !== 'home' ? `
<!-- ĐĂNG KÝ -->
<style>
.hn-acc { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; margin-bottom:12px; transition:border-color 0.2s; }
.hn-acc:hover { border-color:rgba(255,87,34,0.3); }
.hn-acc-hdr { display:flex; align-items:center; justify-content:space-between; padding:18px 20px; cursor:pointer; user-select:none; gap:12px; }
.hn-acc-hdr-left { display:flex; align-items:center; gap:12px; }
.hn-acc-ico { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; }
.hn-acc-title { font-size:0.97rem; font-weight:800; color:var(--text); margin-bottom:2px; }
.hn-acc-sub { font-size:0.76rem; color:var(--muted); }
.hn-acc-chevron { color:var(--muted); font-size:0.85rem; transition:transform 0.25s; }
.hn-acc.open .hn-acc-chevron { transform:rotate(180deg); color:var(--p); }
.hn-acc-body { display:none; padding:0 20px 20px; }
.hn-acc.open .hn-acc-body { display:block; padding-top:0; border-top:1px solid var(--border); }
.hn-acc.open .hn-acc-hdr { border-bottom:none; }
</style>

<div class="hn-section" id="hn-register">
  <div class="hn-inner">
    <div class="hn-tag">📝 Đăng ký</div>
    <h2 class="hn-h2">Đăng ký ngay hôm nay</h2>
    <p class="hn-desc">Nhấn vào loại đăng ký bên dưới để mở form — MOS360 liên hệ Zalo trong 24h.</p>

    <!-- ACCORDION: ĐĂNG KÝ HỌC -->
    <div class="hn-acc" id="hn-acc-hoc">
      <div class="hn-acc-hdr" onclick="toggleAcc('hoc')">
        <div class="hn-acc-hdr-left">
          <div class="hn-acc-ico" style="background:rgba(255,87,34,0.12)">📱</div>
          <div>
            <div class="hn-acc-title">Đăng ký học online</div>
            <div class="hn-acc-sub">MOS Word · Excel · PowerPoint · IC3 GS6 · Generative AI</div>
          </div>
        </div>
        <span class="hn-acc-chevron">▼</span>
      </div>
      <div class="hn-acc-body">
    <div id="hn-reg-hoc">
      <div class="hn-form-wrap" style="padding:24px">
        <div class="hn-info-box">
          ✅ Học 100% trên phần mềm MOS360 · Giao diện sát đề 98% · Giáo viên hỗ trợ 1:1 · Không giới hạn số buổi<br>
          🏆 <strong>Cam kết đầu ra — hoàn tiền 100% nếu chưa đạt</strong>
        </div>
        <div class="hn-row">
          <div class="hn-field">
            <label class="hn-label">Họ và tên <span class="req">*</span></label>
            <input class="hn-input" id="hoc_ten" placeholder="Nguyễn Văn A" required>
          </div>
          <div class="hn-field">
            <label class="hn-label">SĐT (Zalo) <span class="req">*</span></label>
            <input class="hn-input" id="hoc_sdt" type="tel" placeholder="0912888360" required>
          </div>
        </div>
        <div class="hn-row">
          <div class="hn-field">
            <label class="hn-label">Ngày, tháng, năm sinh</label>
            <input class="hn-input" id="hoc_ngaysinh" placeholder="01/01/2005">
          </div>
          <div class="hn-field">
            <label class="hn-label">Trường đang học</label>
            <select class="hn-select" id="hoc_truong">
              <option value="">-- Chọn trường --</option>
              <option>ĐH Hàng Hải Việt Nam</option>
              <option>ĐH Hải Phòng</option>
              <option>ĐH Quản lý & Công nghệ HP</option>
              <option>CĐ Hàng Hải I</option>
              <option>Khác</option>
            </select>
          </div>
        </div>
        <div class="hn-row">
          <div class="hn-field">
            <label class="hn-label">Năm học</label>
            <select class="hn-select" id="hoc_namhoc">
              <option value="">-- Năm học --</option>
              <option>Năm 1</option><option>Năm 2</option><option>Năm 3</option><option>Năm 4</option><option>Đã tốt nghiệp</option>
            </select>
          </div>
          <div class="hn-field">
            <label class="hn-label">Khoa / Lớp</label>
            <input class="hn-input" id="hoc_khoa" placeholder="VD: Khoa Kinh tế - KTB66ĐH">
          </div>
        </div>
        <div class="hn-field">
          <label class="hn-label">Khóa học muốn đăng ký <span class="req">*</span></label>
          <div class="hn-checkbox-group">
            <label class="hn-checkbox-item"><input type="checkbox" id="hoc_kh_we" value="Word + Excel 2019"><span>📊 Luyện thi Word + Excel</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="hoc_kh_ppt" value="PowerPoint 2019"><span>📑 Luyện thi PowerPoint</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="hoc_kh_ic3" value="IC3 GS6"><span>🌐 Luyện thi IC3 GS6</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="hoc_kh_ai" value="Generative AI"><span>🤖 Generative AI</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="hoc_kh_aip" value="AI Productivity"><span>⚡ Làm việc hiệu quả với AI</span></label>
          </div>
        </div>
        <div class="hn-row">
          <div class="hn-field">
            <label class="hn-label">Biết đến MOS360 qua</label>
            <select class="hn-select" id="hoc_kenh">
              <option value="">-- Chọn kênh --</option>
              <option>Facebook</option><option>TikTok</option><option>YouTube</option>
              <option>Bạn bè giới thiệu</option><option>Học viên cũ của Toeic Ms.Hương</option><option>Khác</option>
            </select>
          </div>
          <div class="hn-field">
            <label class="hn-label">Mã giảm giá (nếu có)</label>
            <input class="hn-input" id="hoc_magg" placeholder="Nhập mã giảm giá">
          </div>
        </div>
        <div class="hn-field">
          <label class="hn-label">Link Facebook của em</label>
          <input class="hn-input" id="hoc_fb" placeholder="https://facebook.com/...">
        </div>
        <div class="hn-field">
          <label class="hn-label">Ghi chú thêm</label>
          <textarea class="hn-textarea" id="hoc_ghichu" placeholder="Câu hỏi hoặc yêu cầu đặc biệt..."></textarea>
        </div>
        <button class="hn-submit" onclick="submitForm('hoc')" id="btn_hoc">
          <span>📝 Gửi đăng ký học</span>
        </button>
        <div class="hn-form-msg" id="msg_hoc"></div>
        <p style="font-size:0.75rem;color:var(--muted);margin-top:12px;text-align:center">
          Sau khi gửi, MOS360 liên hệ Zalo trong 24h · Hotline: <strong style="color:var(--text)">0912.888.360</strong>
        </p>
      </div>
    </div>
    </div></div><!-- end acc-body hoc -->

    <!-- ACCORDION: ĐĂNG KÝ THI -->
    <div class="hn-acc" id="hn-acc-thi">
      <div class="hn-acc-hdr" onclick="toggleAcc('thi')">
        <div class="hn-acc-hdr-left">
          <div class="hn-acc-ico" style="background:rgba(34,197,94,0.12)">📋</div>
          <div>
            <div class="hn-acc-title">Đăng ký thi MOS</div>
            <div class="hn-acc-sub">Tại Hải Phòng / Hà Nội / Hồ Chí Minh</div>
          </div>
        </div>
        <span class="hn-acc-chevron">▼</span>
      </div>
      <div class="hn-acc-body">
    <div id="hn-reg-thi">
      <div class="hn-form-wrap" style="padding:24px">

        <!-- BƯỚC 1: Chọn thành phố & đợt thi -->
        <div style="background:rgba(0,82,204,0.06);border:1px solid rgba(0,82,204,0.2);border-radius:12px;padding:16px;margin-bottom:18px">
          <div style="font-size:0.8rem;font-weight:800;color:var(--cyan);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">📍 Bước 1 — Chọn địa điểm & đợt thi</div>
          <div class="hn-row">
            <div class="hn-field">
              <label class="hn-label">Thành phố thi <span class="req">*</span></label>
              <select class="hn-select" id="thi_thanhpho" onchange="onThiThanhPhoChange()">
                <option value="">-- Chọn thành phố --</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              </select>
            </div>
            <div class="hn-field">
              <label class="hn-label">Đợt thi <span class="req">*</span></label>
              <select class="hn-select" id="thi_dotthi" onchange="onThiDotChange()">
                <option value="">-- Chọn thành phố trước --</option>
              </select>
            </div>
          </div>
          <!-- Thông tin đợt thi tự động hiện -->
          <div id="thi_info_box" style="display:none;margin-top:12px;padding:12px;background:#fff;border:1px solid var(--border);border-radius:8px;font-size:0.82rem;line-height:1.8">
          </div>
        </div>

        <!-- BƯỚC 2: Thông tin cá nhân -->
        <div style="font-size:0.8rem;font-weight:800;color:var(--muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">👤 Bước 2 — Thông tin cá nhân</div>
        <div class="hn-row">
          <div class="hn-field">
            <label class="hn-label">Họ và tên <span class="req">*</span></label>
            <input class="hn-input" id="thi_ten" placeholder="Nguyễn Văn A" required>
          </div>
          <div class="hn-field">
            <label class="hn-label">SĐT (Zalo) <span class="req">*</span></label>
            <input class="hn-input" id="thi_sdt" type="tel" placeholder="0912888360" required>
          </div>
        </div>
        <div class="hn-row">
          <div class="hn-field">
            <label class="hn-label">Mã số sinh viên</label>
            <input class="hn-input" id="thi_masv" placeholder="VD: 106001 hoặc HVN">
          </div>
          <div class="hn-field">
            <label class="hn-label">Giới tính</label>
            <select class="hn-select" id="thi_gioitinh">
              <option value="M">Nam (M)</option>
              <option value="F">Nữ (F)</option>
            </select>
          </div>
        </div>
        <div class="hn-row3">
          <div class="hn-field">
            <label class="hn-label">Ngày sinh <span class="req">*</span></label>
            <input class="hn-input" id="thi_ngay" placeholder="15" maxlength="2">
          </div>
          <div class="hn-field">
            <label class="hn-label">Tháng sinh <span class="req">*</span></label>
            <input class="hn-input" id="thi_thang" placeholder="03" maxlength="2">
          </div>
          <div class="hn-field">
            <label class="hn-label">Năm sinh <span class="req">*</span></label>
            <input class="hn-input" id="thi_nam" placeholder="2005" maxlength="4">
          </div>
        </div>
        <div class="hn-row">
          <div class="hn-field">
            <label class="hn-label">Số CCCD <span class="req">*</span></label>
            <input class="hn-input" id="thi_cccd" placeholder="12 số trên CCCD" maxlength="12">
          </div>
          <div class="hn-field">
            <label class="hn-label">Địa chỉ trên VNeID <span class="req">*</span></label>
            <input class="hn-input" id="thi_diachi" placeholder="VD: Số 14/53 Xóm Trung, P.Gia Viên, TP.HP">
          </div>
        </div>

        <!-- BƯỚC 3: Chọn môn thi -->
        <div style="font-size:0.8rem;font-weight:800;color:var(--muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">📝 Bước 3 — Môn thi</div>
        <div class="hn-field">
          <label class="hn-label">Đăng ký thi môn <span class="req">*</span> <span style="font-weight:400;color:var(--muted)">(SV VMU bắt buộc Word + Excel)</span></label>
          <div class="hn-checkbox-group">
            <label class="hn-checkbox-item"><input type="checkbox" id="thi_word" checked onchange="calcLePhi()"><span>📄 Word 2019 (W)</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="thi_excel" checked onchange="calcLePhi()"><span>📊 Excel 2019 (E)</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="thi_ppt" onchange="calcLePhi()"><span>📑 PowerPoint 2019 (P)</span></label>
          </div>
          <!-- Tổng lệ phí tự tính -->
          <div id="thi_lephi_sum" style="display:none;margin-top:10px;padding:10px 14px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.3);border-radius:8px;font-size:0.85rem;font-weight:700;color:#16a34a"></div>
        </div>
        <div class="hn-field">
          <label class="hn-label">Đã từng thi MOS chưa?</label>
          <select class="hn-select" id="thi_datungThi">
            <option value="N">Chưa thi lần nào</option>
            <option value="Y">Đã thi rồi</option>
          </select>
        </div>

        <button class="hn-submit" style="background:#22c55e" onclick="submitForm('thi')" id="btn_thi">
          <span>📋 Gửi đăng ký thi</span>
        </button>
        <div class="hn-form-msg" id="msg_thi"></div>
        <p style="font-size:0.75rem;color:var(--muted);margin-top:12px;text-align:center;line-height:1.7">
          Sau khi gửi, vui lòng chuyển khoản lệ phí và chụp màn hình gửi Zalo MOS360 xác nhận.<br>
          🏦 <strong>Vietcombank 1912888360</strong> — Nguyễn Thị Thảo · Nội dung: <em>Tên + SĐT + Môn thi + Đợt</em>
        </p>
      </div>
    </div>
    </div></div><!-- end acc-body thi -->

    <!-- ACCORDION: HỌC OFFLINE -->
    <div class="hn-acc" id="hn-acc-off">
      <div class="hn-acc-hdr" onclick="toggleAcc('off')">
        <div class="hn-acc-hdr-left">
          <div class="hn-acc-ico" style="background:rgba(245,158,11,0.12)">🏫</div>
          <div>
            <div class="hn-acc-title">Học Offline tại trung tâm</div>
            <div class="hn-acc-sub">57 Lê Văn Thuyết A · 6 ca/ngày · Tối đa 16 học viên</div>
          </div>
        </div>
        <span class="hn-acc-chevron">▼</span>
      </div>
      <div class="hn-acc-body">
    <div id="hn-reg-off">
      <div class="hn-form-wrap" style="padding:24px">
        <div class="hn-info-box">
          📍 <strong>Tầng 1 – 57 Lê Văn Thuyết A</strong>, Quận Nam, Hải Phòng (cạnh C2, ĐH Hàng Hải)<br>
          👥 Tối đa 16 học viên/ca · Có thể đăng ký nhiều ca trong một ngày
        </div>
        <div class="hn-row">
          <div class="hn-field">
            <label class="hn-label">Họ và tên <span class="req">*</span></label>
            <input class="hn-input" id="off_ten" placeholder="Nguyễn Văn A" required>
          </div>
          <div class="hn-field">
            <label class="hn-label">SĐT (Zalo) <span class="req">*</span></label>
            <input class="hn-input" id="off_sdt" type="tel" placeholder="0912888360" required>
          </div>
        </div>
        <div class="hn-field">
          <label class="hn-label">Ngày muốn học <span class="req">*</span></label>
          <input class="hn-input" id="off_ngay" type="date">
        </div>
        <div class="hn-field">
          <label class="hn-label">Chọn ca học <span class="req">*</span></label>
          <div class="hn-checkbox-group" style="flex-direction:column;gap:8px">
            <div style="font-size:0.78rem;color:var(--muted);font-weight:700;margin-bottom:2px">🌅 Buổi sáng</div>
            <label class="hn-checkbox-item"><input type="checkbox" id="off_ca1"><span>Ca 1 — 08h00 đến 09h00</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="off_ca2"><span>Ca 2 — 09h00 đến 10h00</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="off_ca3"><span>Ca 3 — 10h00 đến 11h00</span></label>
            <div style="font-size:0.78rem;color:var(--muted);font-weight:700;margin:6px 0 2px">☀️ Buổi chiều</div>
            <label class="hn-checkbox-item"><input type="checkbox" id="off_ca4"><span>Ca 4 — 14h00 đến 15h00</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="off_ca5"><span>Ca 5 — 15h00 đến 16h00</span></label>
            <label class="hn-checkbox-item"><input type="checkbox" id="off_ca6"><span>Ca 6 — 16h00 đến 17h00</span></label>
          </div>
        </div>
        <div class="hn-field">
          <label class="hn-label">Ghi chú</label>
          <textarea class="hn-textarea" id="off_ghichu" placeholder="Yêu cầu đặc biệt hoặc câu hỏi..."></textarea>
        </div>
        <button class="hn-submit" style="background:#f59e0b;color:#000" onclick="submitForm('off')" id="btn_off">
          <span>🏫 Gửi đăng ký lịch học</span>
        </button>
        <div class="hn-form-msg" id="msg_off"></div>
        <p style="font-size:0.75rem;color:var(--muted);margin-top:12px;text-align:center">
          Trung tâm xác nhận lịch và gửi nhắc nhở qua Zalo trước buổi học
        </p>
      </div>
    </div>
    </div></div><!-- end acc-body off -->

  </div>
</div>

<hr class="hn-divider">

<!-- LỊCH THI 3 THÀNH PHỐ -->
<div class="hn-section" id="hn-schedule">
  <div class="hn-inner">
    <div class="hn-tag">📅 Lịch thi</div>
    <h2 class="hn-h2">Lịch thi MOS / IC3 năm 2026</h2>
    <p class="hn-desc">Lịch thi tại 3 thành phố. Chọn khu vực để xem chi tiết.</p>

    <!-- Tab thành phố -->
    <div style="display:flex;gap:0;border:1px solid var(--border);border-radius:10px;overflow:hidden;width:fit-content;margin-bottom:20px">
      <button id="schTab_hp"  onclick="switchSchTab('hp')"  style="padding:10px 20px;background:var(--p);border:none;color:#fff;font-weight:700;cursor:pointer;font-size:0.82rem;border-right:1px solid var(--border)">📍 Hải Phòng</button>
      <button id="schTab_hn"  onclick="switchSchTab('hn')"  style="padding:10px 20px;background:transparent;border:none;color:var(--muted);font-weight:700;cursor:pointer;font-size:0.82rem;border-right:1px solid var(--border)">📍 Hà Nội</button>
      <button id="schTab_hcm" onclick="switchSchTab('hcm')" style="padding:10px 20px;background:transparent;border:none;color:var(--muted);font-weight:700;cursor:pointer;font-size:0.82rem">📍 Hồ Chí Minh</button>
    </div>

    <!-- Hải Phòng -->
    <div id="schPanel_hp">
      <div class="hn-sch-wrap">
        <div class="hn-sch-top">
          <h3>📍 CITAD – Trường ĐH Hàng Hải Việt Nam · Hải Phòng</h3>
          <div class="hn-legend">
            <span><span class="hn-ldot" style="background:#22c55e"></span>Đang mở</span>
            <span><span class="hn-ldot" style="background:#f59e0b"></span>Sắp đóng</span>
            <span><span class="hn-ldot" style="background:var(--cyan)"></span>Sắp mở</span>
            <span><span class="hn-ldot" style="background:#94a3b8"></span>Đã đóng</span>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table class="hn-table">
            <thead><tr><th>Đợt</th><th>Ngày thi</th><th>Hạn đóng LP</th><th>Lệ phí/môn</th><th>Trạng thái</th></tr></thead>
            <tbody id="schRows_hp"></tbody>
          </table>
        </div>
      </div>
      <p style="font-size:0.74rem;color:var(--muted);margin-top:10px;line-height:1.6">* Lịch theo CITAD – ĐH Hàng Hải Việt Nam. Liên hệ Zalo <strong style="color:var(--text)">0912.888.360</strong> để đăng ký.</p>
    </div>

    <!-- Hà Nội -->
    <div id="schPanel_hn" style="display:none">
      <div class="hn-sch-wrap">
        <div class="hn-sch-top">
          <h3>📍 Văn phòng IIG Việt Nam · Hà Nội</h3>
          <div class="hn-legend">
            <span><span class="hn-ldot" style="background:#22c55e"></span>Đang mở</span>
            <span><span class="hn-ldot" style="background:var(--cyan)"></span>Sắp mở</span>
            <span><span class="hn-ldot" style="background:#94a3b8"></span>Đã đóng</span>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table class="hn-table">
            <thead><tr><th>Đợt</th><th>Ngày thi</th><th>Hạn đóng LP</th><th>Lệ phí/môn</th><th>Trạng thái</th></tr></thead>
            <tbody id="schRows_hn"></tbody>
          </table>
        </div>
      </div>
      <p style="font-size:0.74rem;color:var(--muted);margin-top:10px;line-height:1.6">* Địa điểm: 75 Giang Văn Minh / Trung Yên Plaza / 217 Quan Hoa. Nguồn: <a href="https://online.iigvietnam.com/examcalendarit/" target="_blank" style="color:var(--cyan)">online.iigvietnam.com</a></p>
    </div>

    <!-- Hồ Chí Minh -->
    <div id="schPanel_hcm" style="display:none">
      <div class="hn-sch-wrap">
        <div class="hn-sch-top">
          <h3>📍 Văn phòng IIG Việt Nam · Hồ Chí Minh</h3>
          <div class="hn-legend">
            <span><span class="hn-ldot" style="background:#22c55e"></span>Đang mở</span>
            <span><span class="hn-ldot" style="background:var(--cyan)"></span>Sắp mở</span>
            <span><span class="hn-ldot" style="background:#94a3b8"></span>Đã đóng</span>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table class="hn-table">
            <thead><tr><th>Đợt</th><th>Ngày thi</th><th>Hạn đóng LP</th><th>Lệ phí/môn</th><th>Trạng thái</th></tr></thead>
            <tbody id="schRows_hcm"></tbody>
          </table>
        </div>
      </div>
      <p style="font-size:0.74rem;color:var(--muted);margin-top:10px;line-height:1.6">* Địa điểm: Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ. Nguồn: <a href="https://online.iigvietnam.com/examcalendarit/" target="_blank" style="color:var(--cyan)">online.iigvietnam.com</a></p>
    </div>

  </div>
</div>

<hr class="hn-divider">

<!-- TRA CỨU DỰ THI -->
<div class="hn-section" id="hn-lookup">
  <div class="hn-inner">
    <div class="hn-tag">🔍 Tra cứu</div>
    <h2 class="hn-h2">Tra cứu thông tin dự thi</h2>
    <p class="hn-desc">Nhập số điện thoại đã đăng ký để xem thông tin phòng thi, ca thi và xác nhận lịch.</p>
    <div class="hn-lookup-box">
      <div class="hn-row" style="gap:10px;margin-bottom:14px">
        <div class="hn-field" style="flex:1.2">
          <label class="hn-label">Số điện thoại đã đăng ký <span class="req">*</span></label>
          <input class="hn-linput" id="hnLookupInput" type="tel" placeholder="0912888360" onkeydown="if(event.key==='Enter')hnDoLookup()">
        </div>
        <div class="hn-field" style="flex:1">
          <label class="hn-label">Đợt thi (không bắt buộc)</label>
          <select class="hn-select" id="hnLookupDot">
            <option value="">-- Tất cả đợt --</option>
            <option value="Đợt 5/2026">Đợt 5/2026</option>
            <option value="Đợt 6/2026">Đợt 6/2026</option>
            <option value="Đợt 7/2026">Đợt 7/2026</option>
            <option value="Đợt 8/2026">Đợt 8/2026</option>
          </select>
        </div>
      </div>
      <button class="hn-lbtn" style="width:100%;margin-bottom:16px" onclick="hnDoLookup()">🔍 Tra cứu</button>

      <!-- Kết quả -->
      <div class="hn-lresult" id="hnLookupResult">
        <h4 id="hnLookupTitle" style="margin-bottom:14px;font-size:0.85rem;font-weight:800">📋 Thông tin đăng ký dự thi</h4>
        <div id="hnLookupFields"></div>
        <!-- Nút xác nhận -->
        <div id="hnConfirmWrap" style="display:none;margin-top:16px;padding-top:14px;border-top:1px solid var(--border)">
          <p style="font-size:0.8rem;color:var(--muted);margin-bottom:10px;line-height:1.6">
            ✅ Thông tin chính xác? Bấm xác nhận để MOS360 biết bạn đã nhận được lịch thi.
          </p>
          <button id="hnConfirmBtn" onclick="hnDoConfirm()" style="padding:10px 22px;background:#22c55e;border:none;color:#fff;border-radius:9px;font-weight:800;cursor:pointer;font-size:0.85rem">
            ✅ Xác nhận đã nhận lịch thi
          </button>
          <div id="hnConfirmMsg" style="margin-top:10px;font-size:0.82rem;font-weight:700"></div>
        </div>
        <div class="hn-lnote" style="margin-top:14px">
          ⚠️ Thông tin chưa đúng hoặc chưa thấy tên? → Liên hệ Zalo <strong style="color:var(--text)">0912.888.360</strong> để kiểm tra và chỉnh sửa.
        </div>
      </div>

      <div class="hn-lmsg" id="hnLookupMsg"></div>

      <!-- Ghi chú chưa thấy tên -->
      <div style="margin-top:16px;padding:14px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.25);border-radius:10px;font-size:0.8rem;line-height:1.8;color:var(--muted)">
        📌 <strong style="color:var(--text)">Lưu ý:</strong><br>
        • Phòng thi và ca thi sẽ được bổ sung <strong>3–5 ngày trước kỳ thi</strong>.<br>
        • <strong>Chưa thấy tên</strong> hoặc <strong>sai thông tin</strong> → Liên hệ ngay Zalo <a href="https://zalo.me/0912888360" target="_blank" style="color:var(--cyan);font-weight:700">0912.888.360</a> để được hỗ trợ.<br>
        • Sau khi xác nhận, MOS360 sẽ gửi nhắc nhở qua Zalo trước ngày thi.
      </div>
    </div>
  </div>
</div>
` : `
<!-- CTA: ĐĂNG KÝ TRANG RIÊNG -->
<div class="hn-section" style="padding:48px 24px">
  <div class="hn-inner" style="text-align:center">
    <div class="hn-tag" style="justify-content:center">📝 Đăng ký & Tra cứu</div>
    <h2 class="hn-h2">Đăng ký học · Đăng ký thi · Tra cứu dự thi</h2>
    <p class="hn-desc">Tất cả các form đăng ký và tra cứu đã được chuyển sang một trang riêng để dễ sử dụng hơn.</p>
    <a href="/register" class="hn-btn-p" style="display:inline-block;margin-top:8px">📝 Đến trang Đăng ký →</a>
  </div>
</div>
`}

<!-- VIDEO MODAL -->
<div id="hnVideoModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);align-items:center;justify-content:center;padding:20px" onclick="if(event.target===this)closeVideoModal()">
  <div style="position:relative;width:100%;max-width:820px;aspect-ratio:16/9" onclick="event.stopPropagation()">
    <button onclick="closeVideoModal()" style="position:absolute;top:-40px;right:0;background:none;border:none;color:var(--text);font-size:1.3rem;cursor:pointer;font-family:inherit;font-weight:700">✕ Đóng</button>
    <iframe id="hnVideoFrame" allowfullscreen style="width:100%;height:100%;border:none;border-radius:12px"></iframe>
  </div>
</div>

<script>
// Video Modal
function openVideoModal(url) {
  var embed = url.replace('youtu.be/','youtube.com/embed/').replace('watch?v=','embed/');
  var idx = embed.indexOf('youtube.com/embed/');
  if(idx > -1) {
    var id = embed.substring(idx+18).split(/[&?]/)[0];
    embed = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
  }
  document.getElementById('hnVideoFrame').src = embed;
  var modal = document.getElementById('hnVideoModal');
  modal.style.display = 'flex';
}
function closeVideoModal() {
  document.getElementById('hnVideoModal').style.display = 'none';
  document.getElementById('hnVideoFrame').src = '';
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeVideoModal(); });

// Hiệu ứng đếm số động cho khu vực thống kê (hero stats)
function animateStatNum(el) {
  var target = parseInt(el.getAttribute('data-target'), 10) || 0;
  var suffix = el.getAttribute('data-suffix') || '';
  var duration = 1400; // ms
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    var current = Math.round(target * eased);
    el.innerHTML = current + '<span>' + suffix + '</span>';
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
document.addEventListener('DOMContentLoaded', function() {
  var nums = document.querySelectorAll('.hn-stat .num[data-target]');
  nums.forEach(function(el) { animateStatNum(el); });
});
</script>

<script>// Accordion register
function toggleAcc(id) {
  var acc = document.getElementById('hn-acc-' + id);
  if (!acc) return;
  var isOpen = acc.classList.contains('open');
  // Close all first
  ['hoc','thi','off'].forEach(function(k) {
    var el = document.getElementById('hn-acc-' + k);
    if (el) el.classList.remove('open');
  });
  // Toggle clicked
  if (!isOpen) acc.classList.add('open');
}

// Submit form → /api/register (Worker proxy: ghi Google Sheet + báo Telegram)

async function submitForm(type) {
  var btn = document.getElementById('btn_' + type);
  var msgEl = document.getElementById('msg_' + type);
  msgEl.className = 'hn-form-msg';
  msgEl.textContent = '';

  var actionMap = { hoc: 'dkhoc', thi: 'dkthi', off: 'dkoffline' };
  var payload = { action: actionMap[type] || ('dk' + type) };
  var ok = true;

  if (type === 'hoc') {
    var ten = document.getElementById('hoc_ten').value.trim();
    var sdt = document.getElementById('hoc_sdt').value.trim();
    if (!ten || !sdt) { showMsg(msgEl, 'err', '⚠ Vui lòng điền đầy đủ Họ tên và SĐT'); return; }
    var khoahoc = [];
    ['we','ppt','ic3','ai','aip'].forEach(function(k) {
      var el = document.getElementById('hoc_kh_' + k);
      if (el && el.checked) khoahoc.push(el.value);
    });
    if (!khoahoc.length) { showMsg(msgEl, 'err', '⚠ Vui lòng chọn ít nhất 1 khóa học'); return; }
    Object.assign(payload, {
      ten: ten, sdt: sdt,
      ngaysinh: document.getElementById('hoc_ngaysinh').value,
      truong: document.getElementById('hoc_truong').value,
      namhoc: document.getElementById('hoc_namhoc').value,
      khoa: document.getElementById('hoc_khoa').value,
      khoahoc: khoahoc.join(', '),
      kenh: document.getElementById('hoc_kenh').value,
      magiamgia: document.getElementById('hoc_magg').value,
      facebook: document.getElementById('hoc_fb').value,
      ghichu: document.getElementById('hoc_ghichu').value
    });
  }

  if (type === 'thi') {
    var ten = document.getElementById('thi_ten').value.trim();
    var sdt = document.getElementById('thi_sdt').value.trim();
    var cccd = document.getElementById('thi_cccd').value.trim();
    var ngay = document.getElementById('thi_ngay').value.trim();
    var thang = document.getElementById('thi_thang').value.trim();
    var nam = document.getElementById('thi_nam').value.trim();
    var diachi = document.getElementById('thi_diachi').value.trim();
    if (!ten || !sdt || !cccd || !ngay || !thang || !nam || !diachi) {
      showMsg(msgEl, 'err', '⚠ Vui lòng điền đầy đủ các trường bắt buộc (*)'); return;
    }
    var word = document.getElementById('thi_word').checked ? 'W' : '';
    var excel = document.getElementById('thi_excel').checked ? 'E' : '';
    var ppt = document.getElementById('thi_ppt').checked ? 'P' : '';
    if (!word && !excel && !ppt) { showMsg(msgEl, 'err', '⚠ Vui lòng chọn ít nhất 1 môn thi'); return; }
    var thanhPho = document.getElementById('thi_thanhpho').value.trim();
    var dotThi   = document.getElementById('thi_dotthi').value.trim();
    if (!thanhPho) { showMsg(msgEl, 'err', '\u26a0 Vui l\u00f2ng ch\u1ecdn th\u00e0nh ph\u1ed1 thi'); return; }
    if (!dotThi)   { showMsg(msgEl, 'err', '\u26a0 Vui l\u00f2ng ch\u1ecdn \u0111\u1ee3t thi'); return; }
    var lichTP = (_lichThi && _lichThi[thanhPho]) || [];
    var lichDot = lichTP.find(function(r){ return r.dot === dotThi; }) || {};
    Object.assign(payload, {
      ten: ten, sdt: sdt, cccd: cccd,
      masv: document.getElementById('thi_masv').value,
      gioitinh: document.getElementById('thi_gioitinh').value,
      ngay: ngay, thang: thang, nam: nam,
      diachi: diachi,
      thanhPho: thanhPho,
      diaDiem: lichDot.diaDiem || '',
      dotThi: dotThi,
      ngayThi: lichDot.ngayThi || '',
      lePhi: lichDot.lephi || 0,
      word: word, excel: excel, ppt: ppt,
      ngonngu: 'V',
      datungThi: document.getElementById('thi_datungThi').value
    });
  }

  if (type === 'off') {
    var ten = document.getElementById('off_ten').value.trim();
    var sdt = document.getElementById('off_sdt').value.trim();
    var ngay = document.getElementById('off_ngay').value;
    if (!ten || !sdt || !ngay) { showMsg(msgEl, 'err', '⚠ Vui lòng điền Họ tên, SĐT và Ngày học'); return; }
    var anyCA = ['ca1','ca2','ca3','ca4','ca5','ca6'].some(function(c) {
      return document.getElementById('off_' + c).checked;
    });
    if (!anyCA) { showMsg(msgEl, 'err', '⚠ Vui lòng chọn ít nhất 1 ca học'); return; }
    Object.assign(payload, {
      ten: ten, sdt: sdt, ngay: ngay,
      ca1: document.getElementById('off_ca1').checked ? '✓' : '',
      ca2: document.getElementById('off_ca2').checked ? '✓' : '',
      ca3: document.getElementById('off_ca3').checked ? '✓' : '',
      ca4: document.getElementById('off_ca4').checked ? '✓' : '',
      ca5: document.getElementById('off_ca5').checked ? '✓' : '',
      ca6: document.getElementById('off_ca6').checked ? '✓' : '',
      ghichu: document.getElementById('off_ghichu').value
    });
  }

  // Gửi lên Apps Script
  btn.disabled = true;
  btn.innerHTML = '<span>⏳ Đang gửi...</span>';
  try {
    var res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    var data = await res.json();
    var isOk = (data.ok === true) || (data.success === true);
    if (isOk) {
      showMsg(msgEl, 'ok', '✅ ' + data.msg);
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { form_type: type });
      }
      // Reset form sau khi gửi thành công
      setTimeout(function() {
        document.querySelectorAll('#hn-reg-' + type + ' input, #hn-reg-' + type + ' select, #hn-reg-' + type + ' textarea').forEach(function(el) {
          if (el.type === 'checkbox') el.checked = (el.id === 'thi_word' || el.id === 'thi_excel');
          else el.value = '';
        });
      }, 1500);
    } else {
      showMsg(msgEl, 'err', '❌ ' + (data.msg || 'Gửi thất bại, thử lại hoặc liên hệ Zalo 0912.888.360'));
    }
  } catch(err) {
    showMsg(msgEl, 'err', '❌ Không kết nối được. Vui lòng thử lại hoặc liên hệ Zalo 0912.888.360');
  } finally {
    btn.disabled = false;
    var labels = { hoc: '📝 Gửi đăng ký học', thi: '📋 Gửi đăng ký thi', off: '🏫 Gửi đăng ký lịch học' };
    btn.innerHTML = '<span>' + labels[type] + '</span>';
  }
}

function showMsg(el, type, text) {
  el.className = 'hn-form-msg ' + type;
  el.textContent = text;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── LỊCH THI: Render bảng theo thành phố ────────────────
var _schCurrentTab = 'hp';
var _lichThi = ${JSON.stringify(CONFIG.LICH_THI)};

function renderSchRows(tabKey) {
  var tpMap = { hp: 'Hải Phòng', hn: 'Hà Nội', hcm: 'Hồ Chí Minh' };
  var tp = tpMap[tabKey];
  var rows = _lichThi[tp] || [];
  var now = new Date();
  now.setHours(0, 0, 0, 0); // So sánh theo ngày, bỏ giờ
  var tbody = document.getElementById('schRows_' + tabKey);
  if (!tbody) return;

  // Hàm parse "dd/MM/yyyy" hoặc "dd-dd/MM/yyyy" → Date (không dùng regex)
  function parseVNDate(str) {
    if (!str) return null;
    var parts = str.split('/');
    if (parts.length !== 3) return null;
    var dayPart = parts[0];
    // Nếu dạng khoảng "27–28" hoặc "27-28" → lấy số cuối cùng
    var dashIdx = Math.max(dayPart.lastIndexOf('-'), dayPart.indexOf('\u2013'));
    if (dashIdx >= 0) dayPart = dayPart.slice(dashIdx + 1);
    var d = parseInt(dayPart, 10);
    var mo = parseInt(parts[1], 10);
    var y = parseInt(parts[2], 10);
    if (isNaN(d) || isNaN(mo) || isNaN(y)) return null;
    return new Date(y, mo - 1, d);
  }

  tbody.innerHTML = rows.map(function(r) {
    var ngayThi = parseVNDate(r.ngayThi);
    var hanDK   = parseVNDate(r.hanDK);
    var badge = '', rowStyle = '';

    if (ngayThi && now > ngayThi) {
      // Đã qua ngày thi → Đã đóng
      badge = '<span class="htag tag-done">Đã đóng</span>';
    } else if (hanDK && now > hanDK) {
      // Qua hạn ĐK nhưng chưa thi → Đã đóng ĐK
      badge = '<span class="htag tag-done">Đã đóng ĐK</span>';
    } else if (hanDK) {
      var diffDays = Math.ceil((hanDK - now) / 86400000);
      if (diffDays <= 5) {
        // Còn ≤5 ngày đóng LP → Sắp đóng
        badge = '<span class="htag tag-soon">⚠ Sắp đóng (' + diffDays + ' ngày)</span>';
        rowStyle = 'background:rgba(245,158,11,0.04)';
      } else {
        // Còn hạn → Đang mở
        badge = '<span class="htag tag-open">🟢 Đang mở ĐK</span>';
        rowStyle = 'background:rgba(34,197,94,0.04)';
      }
    } else {
      // Chưa có hạn ĐK → Sắp mở
      badge = '<span class="htag tag-future">Sắp mở</span>';
    }

    var lp = r.lephi ? r.lephi.toLocaleString('vi-VN') + ' đ' : '—';
    return '<tr style="' + rowStyle + '">'
      + '<td style="font-weight:700">' + r.dot + '</td>'
      + '<td>' + r.ngayThi + '</td>'
      + '<td style="color:#f59e0b;font-weight:700">' + (r.hanDK || '—') + '</td>'
      + '<td style="color:var(--cyan);font-weight:700">' + lp + '</td>'
      + '<td>' + badge + '</td>'
      + '</tr>';
  }).join('') || '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--muted)">Chưa có lịch thi</td></tr>';
}

function switchSchTab(tabKey) {
  ['hp','hn','hcm'].forEach(function(k) {
    var btn = document.getElementById('schTab_' + k);
    var panel = document.getElementById('schPanel_' + k);
    if (btn)   { btn.style.background = 'transparent'; btn.style.color = 'var(--muted)'; }
    if (panel) panel.style.display = 'none';
  });
  var activeBtn = document.getElementById('schTab_' + tabKey);
  var activePanel = document.getElementById('schPanel_' + tabKey);
  if (activeBtn)   { activeBtn.style.background = 'var(--p)'; activeBtn.style.color = '#fff'; }
  if (activePanel) activePanel.style.display = 'block';
  renderSchRows(tabKey);
  _schCurrentTab = tabKey;
}

// Render tất cả tabs khi load
(function() {
  if (document.getElementById('schRows_hp')) {
    renderSchRows('hp');
    renderSchRows('hn');
    renderSchRows('hcm');
  }
})();

// ── FORM ĐĂNG KÝ THI: Chọn thành phố → điền đợt + lệ phí ─
function onThiThanhPhoChange() {
  var tp = document.getElementById('thi_thanhpho').value;
  var dotSel = document.getElementById('thi_dotthi');
  var infoBox = document.getElementById('thi_info_box');
  dotSel.innerHTML = '<option value="">-- Chọn đợt thi --</option>';
  infoBox.style.display = 'none';
  if (!tp || !_lichThi[tp]) return;
  _lichThi[tp].forEach(function(r) {
    if (r.trangThai === 'da-dong') return; // Không hiện đợt đã đóng
    var opt = document.createElement('option');
    opt.value = r.dot;
    opt.textContent = r.dot + ' — ' + r.ngayThi;
    dotSel.appendChild(opt);
  });
  calcLePhi();
}

function onThiDotChange() {
  var tp = document.getElementById('thi_thanhpho').value;
  var dot = document.getElementById('thi_dotthi').value;
  var infoBox = document.getElementById('thi_info_box');
  if (!tp || !dot || !_lichThi[tp]) { infoBox.style.display = 'none'; return; }
  var lich = _lichThi[tp].find(function(r){ return r.dot === dot; });
  if (!lich) { infoBox.style.display = 'none'; return; }
  var lp = lich.lephi ? lich.lephi.toLocaleString('vi-VN') : '—';
  infoBox.style.display = 'block';
  infoBox.innerHTML =
    '📅 <strong>Ngày thi:</strong> ' + lich.ngayThi + '<br>' +
    '⏰ <strong>Hạn đóng lệ phí:</strong> <span style="color:#f59e0b;font-weight:700">' + (lich.hanDK || '—') + '</span><br>' +
    '💰 <strong>Lệ phí:</strong> <span style="color:var(--cyan);font-weight:700">' + lp + ' đ/môn</span><br>' +
    '📍 <strong>Địa điểm:</strong> ' + lich.diaDiem;
  calcLePhi();
}

function calcLePhi() {
  var tp = document.getElementById('thi_thanhpho') ? document.getElementById('thi_thanhpho').value : '';
  var dot = document.getElementById('thi_dotthi') ? document.getElementById('thi_dotthi').value : '';
  var sumEl = document.getElementById('thi_lephi_sum');
  if (!sumEl) return;
  if (!tp || !dot || !_lichThi[tp]) { sumEl.style.display = 'none'; return; }
  var lich = _lichThi[tp].find(function(r){ return r.dot === dot; });
  if (!lich) { sumEl.style.display = 'none'; return; }
  var monCount = 0;
  ['thi_word','thi_excel','thi_ppt'].forEach(function(id){
    var el = document.getElementById(id);
    if (el && el.checked) monCount++;
  });
  if (!monCount) { sumEl.style.display = 'none'; return; }
  var tong = lich.lephi * monCount;
  sumEl.style.display = 'block';
  sumEl.textContent = '💰 Tổng lệ phí: ' + tong.toLocaleString('vi-VN') + ' đ (' + monCount + ' môn × ' + lich.lephi.toLocaleString('vi-VN') + ' đ)';
}

// ── TRA CỨU DỰ THI ───────────────────────────────────────
var _lookupResults = [];

async function hnDoLookup() {
  var phone = document.getElementById('hnLookupInput').value.trim();
  var dot   = document.getElementById('hnLookupDot').value.trim();
  var result = document.getElementById('hnLookupResult');
  var msg    = document.getElementById('hnLookupMsg');
  result.classList.remove('show');
  msg.classList.remove('show');
  _lookupResults = [];

  if (!phone) { msg.textContent = '⚠ Vui lòng nhập số điện thoại.'; msg.classList.add('show'); return; }

  msg.textContent = 'Đang tra cứu...'; msg.classList.add('show');
  try {
    var url = '${CONFIG.APPS_SCRIPT_LOOKUP}?action=lookup&phone=' + encodeURIComponent(phone) + (dot ? '&dot=' + encodeURIComponent(dot) : '');
    var res = await fetch(url);
    var data = await res.json();
    msg.classList.remove('show');

    if (data.ok && data.data) {
      var items = Array.isArray(data.data) ? data.data : [data.data];
      _lookupResults = items;
      var fields = document.getElementById('hnLookupFields');
      var highlight = ['Phòng thi','Ca thi','Ngày thi','Đợt','Môn thi','Địa điểm'];
      var html = '';
      items.forEach(function(payload, idx) {
        if (items.length > 1) html += '<div style="font-size:0.75rem;font-weight:800;color:var(--cyan);margin:' + (idx>0?'14px':'0') + ' 0 8px;text-transform:uppercase">Môn ' + (idx+1) + '</div>';
        Object.keys(payload).forEach(function(k) {
          var v = payload[k];
          if (!v || k === 'Ghi chú admin' || k === '_rowIndex') return;
          var isHL = highlight.some(function(h){ return k.includes(h); });
          var valStyle = isHL ? 'color:var(--cyan);font-weight:800;font-size:0.95rem' : '';
          html += '<div class="hn-lf" style="margin-bottom:8px">'
               + '<span class="hn-lf-key">' + k + '</span>'
               + '<span class="hn-lf-val" style="' + valStyle + '">' + v + '</span>'
               + '</div>';
        });
        if (idx < items.length - 1) html += '<hr style="border:none;border-top:1px dashed var(--border);margin:10px 0">';
      });
      fields.innerHTML = html || '<div style="color:var(--muted)">Không có dữ liệu chi tiết.</div>';
      // Hiện nút xác nhận
      var confirmWrap = document.getElementById('hnConfirmWrap');
      if (confirmWrap) confirmWrap.style.display = 'block';
      var confirmBtn = document.getElementById('hnConfirmBtn');
      if (confirmBtn) { confirmBtn.style.display = 'inline-block'; confirmBtn.disabled = false; confirmBtn.textContent = '\u2705 Xác nhận đã nhận lịch thi'; }
      var confirmMsg = document.getElementById('hnConfirmMsg');
      if (confirmMsg) confirmMsg.textContent = '';
      result.classList.add('show');
    } else {
      msg.textContent = data.msg || 'Không tìm thấy thông tin. Vui lòng kiểm tra lại SĐT.';
      msg.classList.add('show');
    }
  } catch(e) {
    msg.textContent = 'Không kết nối được. Vui lòng thử lại hoặc liên hệ Zalo 0912.888.360.';
    msg.classList.add('show');
  }
}

// Xác nhận đã nhận lịch thi
async function hnDoConfirm() {
  var phone = document.getElementById('hnLookupInput').value.trim();
  var dot   = document.getElementById('hnLookupDot').value.trim();
  var btn   = document.getElementById('hnConfirmBtn');
  var msgEl = document.getElementById('hnConfirmMsg');
  if (!phone) return;
  btn.disabled = true;
  btn.textContent = '\u23F3 Đang xác nhận...';
  try {
    var res = await fetch('${CONFIG.APPS_SCRIPT_LOOKUP}', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'xacNhan', phone: phone, dot: dot })
    });
    var data = await res.json();
    if (data.ok) {
      btn.style.display = 'none';
      msgEl.style.color = '#22c55e';
      msgEl.textContent = '\u2705 ' + (data.msg || 'Đã xác nhận! Cảm ơn bạn.');
    } else {
      btn.disabled = false;
      btn.textContent = '\u2705 Xác nhận đã nhận lịch thi';
      msgEl.style.color = '#f59e0b';
      msgEl.textContent = data.msg || 'Không thể xác nhận lúc này.';
    }
  } catch(e) {
    btn.disabled = false;
    btn.textContent = '\u2705 Xác nhận đã nhận lịch thi';
    msgEl.style.color = '#ef4444';
    msgEl.textContent = 'Lỗi kết nối. Vui lòng thử lại.';
  }
}
</script>`;
    },
    getCoursesUI() {
        return `<div style="max-width:1200px; margin:30px auto; padding:0 15px;">
        <h2 style="color:var(--primary); text-align:center; margin-bottom:10px; font-weight:800; font-size:1.8rem;">LỘ TRÌNH LUYỆN THI CHỨNG CHỈ QUỐC TẾ</h2>
        <p style="text-align:center; color:#888; margin-bottom:30px; font-size:0.9rem;">Học và ôn thi trực tuyến tương tác cao, bám sát cấu trúc hành trình Certiport.</p>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M22 18H2V4h20v14zm-11 2h2v2h-2v-2zm-9-4h18V6H2v10z"/></svg>
            <h2>LỚP KHÓA HỌC LUYỆN THI MOS OFFICE 2019</h2>
        </div>
        <div class="course-grid">
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS WORD 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-W19" onclick="triggerRemoteVerification(&apos;MOS WORD 2019&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS EXCEL 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-E19" onclick="triggerRemoteVerification(&apos;MOS EXCEL 2019&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS PPT 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-P19" onclick="triggerRemoteVerification(&apos;MOS PPT 2019&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <h2>LỚP KHÓA HỌC LUYỆN THI MOS OFFICE 365</h2>
        </div>
        <div class="course-grid">
            <div class="section-card">
                <span style="background:rgba(0,82,204,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS WORD 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-W365" onclick="triggerRemoteVerification(&apos;MOS WORD 365&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(0,82,204,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS EXCEL 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-E365" onclick="triggerRemoteVerification(&apos;MOS EXCEL 365&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(0,82,204,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS PPT 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-P365" onclick="triggerRemoteVerification(&apos;MOS PPT 365&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>
            <h2>PHÒNG THI THỬ ĐẶC BIỆT CHUYÊN SÂU</h2>
        </div>
        <div class="course-grid">
            <!-- IC3 LV1 -->
            <div class="section-card" style="border-color:#16a34a; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(22,163,74,0.12); color:#16a34a; padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">IC3 GS6 · Level 1</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.1rem; color:#16a34a;">IC3 GS6 — Level 1</h3>
                    <p style="color:var(--muted); font-size:0.82rem; line-height:1.5;">Computing Fundamentals. Luyện tập tự do và thi thử tính giờ.</p>
                    <div class="price-tag" style="color:#16a34a;">100.000đ <span>300.000đ</span></div>
                    <a href="/course-intro/ic3" style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#16a34a;background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.25);padding:5px 12px;border-radius:100px;margin-top:8px;cursor:pointer;font-family:inherit;text-decoration:none;">📘 Giáo trình học</a>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,#16a34a,#22c55e); color:#fff;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-IC3-LV1" onclick="triggerRemoteVerification(&apos;IC3 GS6 LEVEL 1&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess(&apos;/ic3-lv1&apos;,&apos;IC3 GS6 LEVEL 1&apos;)">🎯 VÀO PHÒNG ÔN LUYỆN</button>
                </div>
            </div>
            <!-- IC3 LV2 -->
            <div class="section-card" style="border-color:#d97706; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(217,119,6,0.12); color:#d97706; padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">IC3 GS6 · Level 2</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.1rem; color:#d97706;">IC3 GS6 — Level 2</h3>
                    <p style="color:var(--muted); font-size:0.82rem; line-height:1.5;">Key Applications. Luyện tập tự do và thi thử tính giờ.</p>
                    <div class="price-tag" style="color:#d97706;">100.000đ <span>300.000đ</span></div>
                    <a href="/course-intro/ic3" style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#d97706;background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.25);padding:5px 12px;border-radius:100px;margin-top:8px;cursor:pointer;font-family:inherit;text-decoration:none;">📘 Giáo trình học</a>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,#d97706,#f59e0b); color:#fff;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-IC3-LV2" onclick="triggerRemoteVerification(&apos;IC3 GS6 LEVEL 2&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess(&apos;/ic3-lv2&apos;,&apos;IC3 GS6 LEVEL 2&apos;)">🎯 VÀO PHÒNG ÔN LUYỆN</button>
                </div>
            </div>
            <!-- IC3 LV3 -->
            <div class="section-card" style="border-color:#dc2626; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(220,38,38,0.12); color:#dc2626; padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">IC3 GS6 · Level 3</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.1rem; color:#dc2626;">IC3 GS6 — Level 3</h3>
                    <p style="color:var(--muted); font-size:0.82rem; line-height:1.5;">Living Online. Luyện tập tự do và thi thử tính giờ.</p>
                    <div class="price-tag" style="color:#dc2626;">100.000đ <span>300.000đ</span></div>
                    <a href="/course-intro/ic3" style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:#dc2626;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);padding:5px 12px;border-radius:100px;margin-top:8px;cursor:pointer;font-family:inherit;text-decoration:none;">📘 Giáo trình học</a>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,#dc2626,#ef4444); color:#fff;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-IC3-LV3" onclick="triggerRemoteVerification(&apos;IC3 GS6 LEVEL 3&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess(&apos;/ic3-lv3&apos;,&apos;IC3 GS6 LEVEL 3&apos;)">🎯 VÀO PHÒNG ÔN LUYỆN</button>
                </div>
            </div>
            <div class="section-card" style="border-color:var(--cyan); display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0,82,204,0.1); color:var(--cyan); padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">AI DIGITAL</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.2rem; color:var(--cyan);">Luyện thi GENERATIVE AI</h3>
                    <p style="color:var(--muted); font-size:0.85rem; line-height:1.5;">Bộ ngân hàng 45 câu xáo trộn ngẫu nhiên đạt tiêu chuẩn từ đề thi quốc tế.</p>
                    <div class="price-tag">100.000đ <span>400.000đ</span></div>
                    <a href="/course-intro/genai" style="display:inline-flex;align-items:center;gap:6px;font-size:0.8rem;font-weight:700;color:var(--cyan);background:rgba(0,82,204,0.06);border:1px solid rgba(0,82,204,0.2);padding:6px 14px;border-radius:100px;margin-top:8px;cursor:pointer;font-family:inherit;transition:all 0.15s;text-decoration:none;">📘 Giáo trình học</a>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,var(--cyan),#2684FF); color:#fff;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-AI" onclick="triggerRemoteVerification(&apos;GENERATIVE AI&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess(&apos;/generative-ai&apos;,&apos;GENERATIVE AI&apos;)">🎯 VÀO PHÒNG ÔN LUYỆN THI THỬ</button>
                </div>
            </div>
            <div class="section-card" style="border-color:#0068FF; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0,104,255,0.1); color:#0068FF; padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">🚀 AI PRODUCTIVITY</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.2rem; color:#0068FF;">Làm việc hiệu quả với AI</h3>
                    <p style="color:var(--muted); font-size:0.85rem; line-height:1.5;">300 câu hỏi · 8 Competencies · Từ Tư duy đến Thực chiến AI trong công việc thực tế.</p>
                    <div class="price-tag">300.000đ <span>600.000đ</span></div>
                    <a href="/course-intro/aip" style="display:inline-flex;align-items:center;gap:6px;font-size:0.8rem;font-weight:700;color:#0068FF;background:rgba(0,104,255,0.06);border:1px solid rgba(0,104,255,0.2);padding:6px 14px;border-radius:100px;margin-top:8px;cursor:pointer;font-family:inherit;transition:all 0.15s;text-decoration:none;">📘 Giáo trình học</a>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,#0068FF,#00D4FF); color:#fff;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-AIP" onclick="triggerRemoteVerification(&apos;AI PRODUCTIVITY&apos;)">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess(&apos;/ai-productivity&apos;,&apos;AI PRODUCTIVITY&apos;)">🎯 VÀO PHÒNG ÔN LUYỆN THI THỬ</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        const cList = ["MOS WORD 2019","MOS EXCEL 2019","MOS PPT 2019","MOS WORD 365","MOS EXCEL 365","MOS PPT 365","IC3 GS6 LEVEL 1","IC3 GS6 LEVEL 2","IC3 GS6 LEVEL 3","GENERATIVE AI","AI PRODUCTIVITY"];
        const idMap = {
            "MOS WORD 2019":"btn-auth-W19","MOS EXCEL 2019":"btn-auth-E19","MOS PPT 2019":"btn-auth-P19",
            "MOS WORD 365":"btn-auth-W365","MOS EXCEL 365":"btn-auth-E365","MOS PPT 365":"btn-auth-P365",
            "IC3 GS6 LEVEL 1":"btn-auth-IC3-LV1","IC3 GS6 LEVEL 2":"btn-auth-IC3-LV2","IC3 GS6 LEVEL 3":"btn-auth-IC3-LV3",
            "GENERATIVE AI":"btn-auth-AI",
            "AI PRODUCTIVITY":"btn-auth-AIP"
        };
        function checkState() {
            cList.forEach(c => {
                if (localStorage.getItem('course_auth_' + c) === 'verified') {
                    var el = document.getElementById(idMap[c]);
                    if (el) { el.innerHTML = "✅ FULL QUYỀN HỌC VIÊN"; el.style.color = "var(--cyan)"; }
                }
            });
        }
        // FIX 3: Chuẩn hóa SĐT phía client trước khi gửi lên API
        function normalizePhone(raw) {
             let p = raw.trim();
             if (p.startsWith("+84")) p = "0" + p.slice(3);
             else if (p.startsWith("84") && p.length >= 11) p = "0" + p.slice(2);
             return p;
         }
        function getOrCreateDeviceId() {
    var id = localStorage.getItem('mos360_device_id');
    if (!id) {
        id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem('mos360_device_id', id);
    }
    return id;
}

async function triggerRemoteVerification(courseName) {
    var rawPhone = prompt("Nhập số điện thoại đăng ký [" + courseName + "] của bạn:");
    if (!rawPhone) return;

    var phone = normalizePhone(rawPhone);
    var deviceId = getOrCreateDeviceId();

    try {
        var res = await fetch("/api/verify-code?phone=" + encodeURIComponent(phone) + "&course=" + encodeURIComponent(courseName) + "&deviceId=" + encodeURIComponent(deviceId));
        var data = await res.json();
        if (data.success) {
            alert("🎉 Xác thực thành công [" + courseName + "]! Hệ thống mở khóa toàn bộ quyền Ôn Tập & Thi Thử.");
            localStorage.setItem('course_auth_' + courseName, 'verified');
            localStorage.setItem('course_phone_' + courseName, phone); // dùng cho silent re-verify
            if (data.expire) localStorage.setItem('course_expire_' + courseName, data.expire);
            localStorage.setItem('course_ping_' + courseName, String(Date.now()));
            checkState();
        } else {
            alert("❌ Không thành công: " + data.msg);
        }
          } catch(e) {
              alert("Lỗi kết nối hệ thống!");
          }
      }
        function startTrialAccess(targetUrl, courseName) {
            sessionStorage.setItem('mos360_active_course_context', courseName);
            window.location.href = targetUrl;
        }
        window.onload = checkState;
    </script>`;
    },

    getLoginUI() {
        return `
    <div class="section-card" style="max-width:420px; margin:60px auto; padding:35px 25px;">
        <h2 style="text-align:center; color:var(--primary); margin-bottom:5px;">ĐĂNG NHẬP ADMIN</h2>
        <p style="text-align:center; color:var(--muted); font-size:0.85rem; margin-bottom:25px;">Chức năng bảo mật phân tầng dành riêng cho quản trị viên</p>
        <div style="margin-bottom:15px;">
            <label style="font-size:0.8rem; color:var(--muted); font-weight:bold; display:block; margin-bottom:5px;">TÀI KHOẢN ADMIN</label>
            <input type="text" id="admUser" name="mos360-adm-user-field" placeholder="Nhập tài khoản quản trị" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-1p-ignore data-bwignore style="width:100%; padding:14px; background:#E2ECFA; border:1px solid #CFD8EA; color:var(--text); border-radius:10px; font-weight:bold;">
        </div>
        <div style="margin-bottom:25px;">
            <label style="font-size:0.8rem; color:var(--muted); font-weight:bold; display:block; margin-bottom:5px;">MẬT KHẨU</label>
            <input type="password" id="admPass" name="mos360-adm-pass-field" placeholder="••••••••" autocomplete="new-password" data-lpignore="true" data-1p-ignore data-bwignore style="width:100%; padding:14px; background:#E2ECFA; border:1px solid #CFD8EA; color:var(--text); border-radius:10px; font-weight:bold;">
        </div>
        <button class="btn-action" onclick="handleAdminLoginGate()">XÁC THỰC QUYỀN TRUY CẬP</button>
    </div>
    <script>
        async function handleAdminLoginGate() {
            var u = document.getElementById('admUser').value.trim();
            var p = document.getElementById('admPass').value.trim();
            var btn = document.querySelector('.btn-action');
            btn.disabled = true; btn.textContent = 'Đang kiểm tra...';
            try {
                var res = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user: u, pass: p })
                });
                var data = await res.json();
                if (data.success) {
                    localStorage.setItem('mos360_admin_session', 'active');
                    if (data.token) localStorage.setItem('mos360_admin_token', data.token);
                    alert("Đăng nhập Admin thành công! Nút [QUẢN LÝ HỌC VIÊN] đã được mở trên thiết bị này.");
                    window.location.href = "/";
                } else {
                    alert(data.msg || "Tài khoản hoặc mật khẩu quản lý không đúng!");
                }
            } catch (e) {
                alert("Không kết nối được tới máy chủ. Vui lòng thử lại.");
            } finally {
                btn.disabled = false; btn.textContent = 'XÁC THỰC QUYỀN TRUY CẬP';
            }
        }
    </script>`;
    },


    // FIX 5: Phòng ôn luyện với phản hồi đúng/sai ngay lập tức + hộp giải thích
    getQuizEnginePage(courseType) {
        /* =========================
       QUESTION BANK V2
       ========================= */

        const questionBank =
            COURSE_MAP[courseType] || [];

        if (!questionBank.length) {

            return `
  <!DOCTYPE html>
  <html>
  <body style="
      background:#F0F4FA;
      color:var(--text);
      font-family:sans-serif;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      text-align:center;
  ">
      <div>
          <h2>⚠ Không tìm thấy Question Bank</h2>
          <p>${courseType}</p>
          <a href="/courses">Quay lại</a>
      </div>
  </body>
  </html>
  `;
        }

        // Mỗi page đã là 1 Level riêng — không cần bước chọn level nữa
        const hasLevels = false;
        const levelBoxStyle = "display:none;";
        const modeBoxStyle = "";

        // Cấu trúc 7 chuyên đề (IC3) / 4 module (GenAI) dùng cho "Ôn luyện theo chủ đề",
        // khớp với giáo trình hiển thị ở pages/course-intro.js
        const topicDomains = TOPIC_DOMAINS_BY_COURSE[courseType] || [];
        const topicDomainsJSON = JSON.stringify(topicDomains);

        const bankJSON = JSON.stringify(
            questionBank.map(item => {
                // Resolve image-select options
                let options = item.options || [];
                if (item.type === 'image-select') {
                    options = options.map(opt => {
                        if (typeof opt === 'object' && opt.img) {
                            const resolvedImg = IMAGE_MAP[opt.img] ? IMAGE_BASE_URL + IMAGE_MAP[opt.img] : opt.img;
                            return { label: opt.label || '', img: resolvedImg };
                        }
                        return opt;
                    });
                }

                // === FIX: Chuẩn hóa answer sang index số để isCorrectAnswer() hoạt động đúng ===
                // Bank lưu answer là string/array-of-string, nhưng userAns lưu index.
                // Phải convert TRƯỚC khi đưa vào bankJSON.
                let answer = item.answer;
                const type = item.type || "single";
                if (type === 'single' || type === 'multiple') {
                    const opts = options; // đã resolve ở trên
                    if (Array.isArray(answer)) {
                        // multiple: array of strings → array of indexes
                        answer = answer.map(a => {
                            if (typeof a === 'number') return a;
                            const idx = opts.indexOf(a);
                            return idx >= 0 ? idx : a;
                        });
                    } else if (typeof answer === 'string') {
                        // single: string → index
                        const idx = opts.indexOf(answer);
                        if (idx >= 0) answer = idx;
                    }
                }

                return {
                    id: item.id,
                    q: item.question,
                    o: options,
                    o_left: (item.left || []).map(k => IMAGE_MAP[k] ? IMAGE_BASE_URL + IMAGE_MAP[k] : k),
                    o_right: item.right || [],
                    c: answer,
                    e: item.explanation || "",
                    t: type,
                    lv: item.level || "",
                    cat: item.category || "",
                    img: item.image_key && IMAGE_MAP[item.image_key] ? IMAGE_BASE_URL + IMAGE_MAP[item.image_key] : ""
                };
            })
        );

        return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Phòng Luyện Thi: ${courseType}</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', -apple-system, sans-serif; }
        body { --text: #0F1F40; --muted: #5A6A85; --cyan: #0052CC; --border: #CFD8EA; background: #F0F4FA; color: #0F1F40; padding: 15px; }
        .container { max-width: 1200px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); overflow: hidden; }
        header { background: #F0F4FA; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .timer-box { border: 2px solid var(--cyan); padding: 6px 14px; border-radius: 8px; font-size: 16px; font-weight: 800; color: #0052CC; }

        .mode-selection-overlay { position: absolute; inset: 0; background: #F0F4FA; z-index: 999; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 24px 20px; text-align: center; border-radius: 12px; overflow-y: auto; }
        .mode-btn { width: 100%; max-width: 420px; padding: 14px 16px; margin: 6px 0; border: 2px solid #CFD8EA; background: #FFFFFF; color: var(--text); border-radius: 12px; font-size: 0.92rem; font-weight: 700; cursor: pointer; transition: all 0.2s; text-align: left; box-sizing: border-box; }
        .mode-btn:hover { border-color: #0052CC; background: rgba(0,82,204,0.04); }
        .lock-badge { font-size: 0.73rem; display: block; margin-top: 3px; font-weight: 600; line-height: 1.4; }

        .quiz-layout { display: grid; grid-template-columns: 1fr 280px; gap: 20px; padding: 20px; }
        .main-quiz { background: #FFFFFF; padding: 20px; border-radius: 12px; min-height: 580px; display: flex; flex-direction: column; position: relative; }

        .question-box { font-size: 1.05rem; font-weight: 700; line-height: 1.5; margin-bottom: 20px; color: var(--text); }
        .option { display: flex; align-items: flex-start; padding: 14px 16px; background: #F0F4FA; border: 2px solid #CFD8EA; border-radius: 10px; cursor: pointer; margin-bottom: 10px; font-size: 0.95rem; font-weight: 600; transition: all 0.15s; gap: 10px; }
        .option.selected { border-color: #0052CC; background: rgba(0,82,204,0.04); color: #0052CC; }
        /* FIX 5: Màu phản hồi đúng/sai ngay lập tức cho chế độ ôn luyện */
        .option.correct-ans { border-color: #22c55e !important; background: rgba(34,197,94,0.12) !important; color: #22c55e !important; }
        .option.wrong-ans { border-color: #ef4444 !important; background: rgba(239,68,68,0.1) !important; color: #ef4444 !important; }
        .option.show-correct { border-color: #22c55e !important; background: rgba(34,197,94,0.06) !important; color: #86efac !important; }
        /* FIX 5: Hộp giải thích trượt xuống */
        .explanation-box { background: rgba(0,82,204,0.06); border: 1px solid rgba(0,82,204,0.2); border-radius: 10px; padding: 14px 16px; margin-top: 12px; font-size: 0.88rem; line-height: 1.6; color: var(--muted); display: none; animation: slideDown 0.25s ease; }
        .explanation-box.visible { display: block; }
        .explanation-box strong { color: #0052CC; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

        .right-sidebar { background: #FFFFFF; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; overflow-y: auto; max-height: 350px; }
        .nav-item { height: 36px; background: #EEF3FB; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border-radius: 6px; cursor: pointer; color: var(--muted); }
        .nav-item.current { border: 1px solid var(--cyan); color: #0052CC; background: rgba(0,82,204,0.05); }
        .nav-item.answered { background: #CFD8EA; color: var(--text); }
        .nav-item.correct-nav { background: rgba(34,197,94,0.16); color: #16a34a; }
        .nav-item.wrong-nav { background: rgba(239,68,68,0.14); color: #dc2626; }

        .nav-item.marked { box-shadow: inset 0 0 0 2px #f59e0b; }
        .nav-item.marked::after { content: '🚩'; font-size: 8px; position: relative; top: -10px; left: 10px; }
        .exam-extra-btns { display: none; gap: 10px; margin-top: 14px; }
        .btn-mark { padding: 10px 16px; background: #FFF7ED; border: 1px solid #FED7AA; color: #C2410C; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.82rem; flex: 1; }
        .btn-mark.active { background: #f59e0b; color: #fff; border-color: #f59e0b; }
        .btn-summary { padding: 10px 16px; background: #EFF6FF; border: 1px solid #BFDBFE; color: #1D4ED8; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.82rem; flex: 1; }
        .summary-overlay { display: none; position: absolute; inset: 0; background: #F0F4FA; z-index: 1000; flex-direction: column; padding: 24px 20px; border-radius: 12px; overflow-y: auto; }
        .summary-overlay.visible { display: flex; }
        .summary-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.85rem; }
        .summary-table th { text-align: left; padding: 10px 12px; background: #EEF3FB; color: var(--muted); font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.4px; position: sticky; top: 0; }
        .summary-table th:first-child { border-radius: 8px 0 0 8px; width: 70px; text-align: center; }
        .summary-table th:last-child { border-radius: 0 8px 8px 0; width: 160px; }
        .summary-row { cursor: pointer; transition: background 0.15s; }
        .summary-row:hover { background: rgba(0,82,204,0.05); }
        .summary-row td { padding: 11px 12px; border-bottom: 1px solid var(--border); vertical-align: middle; }
        .summary-row td:first-child { text-align: center; font-weight: 800; color: var(--muted); }
        .summary-row.is-current td:first-child { color: var(--cyan); }
        .summary-qtext { color: var(--text); line-height: 1.4; }
        .summary-status { display: inline-flex; align-items: center; gap: 6px; font-size: 0.76rem; font-weight: 700; padding: 4px 10px; border-radius: 100px; white-space: nowrap; }
        .summary-status.st-answered { background: rgba(34,197,94,0.12); color: #16a34a; }
        .summary-status.st-unanswered { background: rgba(148,163,184,0.15); color: var(--muted); }
        .summary-status.st-marked { background: rgba(245,158,11,0.14); color: #C2410C; margin-left: 6px; }
        @media (max-width: 600px) { .summary-table { font-size: 0.78rem; } .summary-table th:nth-child(2), .summary-row td:nth-child(2) { max-width: 140px; } .summary-status { font-size: 0.7rem; padding: 3px 8px; } }
        .summary-legend { display: flex; gap: 16px; flex-wrap: wrap; font-size: 12px; color: var(--muted); margin-bottom: 8px; }
        .summary-legend span { display: inline-flex; align-items: center; gap: 5px; }
        .summary-legend i { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
        .control-btns { display: flex; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 20px; }
        .btn-ctrl { padding: 12px 18px; background: #E2ECFA; color: var(--text); border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.85rem; }
        .btn-submit { background: #16a34a; font-weight: 800; }

        .result-overlay { position: absolute; inset: 0; background: #F0F4FA; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; padding: 28px 20px; z-index: 1000; display: none; border-radius: 12px; overflow-y: auto; }
        .breakdown-row { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }
        .breakdown-label { flex: 0 0 150px; font-size: 0.78rem; font-weight: 700; color: var(--text); text-align: left; line-height: 1.25; }
        .breakdown-bar-wrap { flex: 1; height: 18px; background: #E2ECFA; border-radius: 9px; overflow: hidden; position: relative; }
        .breakdown-bar-fill { height: 100%; border-radius: 9px; transition: width 0.4s ease; }
        .breakdown-pct { flex: 0 0 42px; font-size: 0.8rem; font-weight: 800; text-align: right; }

        /* ===== NÚT XÁC NHẬN ĐÁP ÁN - Thiết kế lại ===== */
        .btn-confirm-wrap { display:none; margin-top:14px; }
        .btn-confirm-wrap.visible { display:flex; justify-content:center; }
        .btn-confirm {
            padding: 11px 36px;
            background: linear-gradient(135deg, #0052CC, #2684FF);
            color: #000;
            border: none;
            border-radius: 25px;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
            letter-spacing: 0.3px;
            box-shadow: 0 4px 15px rgba(0,82,204,0.3);
            transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-confirm:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,82,204,0.4); }

        /* ===== ẢNH MINH HỌA ===== */
        .question-image-wrap { width:100%; max-height:200px; border-radius:12px; overflow:hidden; margin-bottom:14px; display:none; justify-content:center; }
        .question-image-wrap img { max-width:100%; max-height:200px; object-fit:contain; border-radius:12px; }

        /* ===== MATCHING ===== */
        .matching-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px; align-items:start; }
        .matching-left-col, .matching-right-col { display:contents; }
        .matching-row-left { background:#F0F4FA; border:2px solid #CFD8EA; border-radius:8px; padding:11px 13px; font-size:0.86rem; font-weight:600; color:var(--text); display:flex; align-items:center; gap:8px; }
        .matching-dot { width:6px; height:6px; border-radius:50%; background:var(--cyan); flex-shrink:0; }
        .drop-zone { background:#FFFFFF; border:2px dashed #CFD8EA; border-radius:8px; padding:11px 13px; font-size:0.86rem; font-weight:600; color:var(--muted); display:flex; align-items:center; justify-content:center; transition:all 0.15s; cursor:pointer; }
        .drop-zone.drag-over { border-color:var(--cyan); background:rgba(0,82,204,0.05); }
        .drop-zone.filled { border-style:solid; border-color:var(--cyan); background:rgba(0,82,204,0.04); color:var(--text); justify-content:flex-start; }
        .drop-zone.correct-match { border-color:#22c55e !important; background:rgba(34,197,94,0.12) !important; color:#22c55e !important; }
        .drop-zone.wrong-match { border-color:#ef4444 !important; background:rgba(239,68,68,0.1) !important; color:#ef4444 !important; }
        .answer-bank { display:flex; flex-wrap:wrap; gap:8px; margin-top:4px; }
        .bank-item { background:#E2ECFA; border:2px solid #CFD8EA; border-radius:8px; padding:9px 13px; font-size:0.84rem; font-weight:600; color:var(--text); cursor:grab; user-select:none; transition:all 0.15s; }
        .bank-item:hover { border-color:var(--cyan); }
        .bank-item.dragging { opacity:0.4; }
        .matching-col-label { font-size:11px; color:var(--muted); font-weight:800; margin-bottom:7px; letter-spacing:0.5px; }

        /* ===== DRAGDROP (fill-in-blank) ===== */
        .sentence-box { background:#FFFFFF; border:1px solid #CFD8EA; border-radius:10px; padding:16px; font-size:1rem; font-weight:600; color:var(--text); line-height:2.6; margin-bottom:12px; }
        .inline-drop { display:inline-flex; align-items:center; justify-content:center; min-width:110px; height:32px; background:#F0F4FA; border:2px dashed #CFD8EA; border-radius:6px; padding:0 10px; margin:0 5px; color:var(--muted); font-size:0.84rem; vertical-align:middle; cursor:pointer; transition:all 0.15s; }
        .inline-drop.drag-over { border-color:var(--cyan); background:rgba(0,82,204,0.08); }
        .inline-drop.filled { border-style:solid; border-color:var(--cyan); background:rgba(0,82,204,0.06); color:var(--cyan); }
        .inline-drop.correct-fill { border-color:#22c55e !important; background:rgba(34,197,94,0.12) !important; color:#22c55e !important; }
        .inline-drop.wrong-fill { border-color:#ef4444 !important; background:rgba(239,68,68,0.1) !important; color:#ef4444 !important; }

        /* ===== SORT ORDER ===== */
        .sort-list { display:flex; flex-direction:column; gap:8px; margin-bottom:12px; }
        .sort-item { background:#F0F4FA; border:2px solid #CFD8EA; border-radius:8px; padding:12px 15px; font-size:0.9rem; font-weight:600; color:var(--text); display:flex; align-items:center; gap:12px; cursor:grab; user-select:none; transition:border-color 0.15s; }
        .sort-item:hover { border-color:#CFD8EA; }
        .sort-item.drag-over-sort { border-color:var(--cyan); background:rgba(0,82,204,0.04); }
        .sort-item.correct-sort { border-color:#22c55e !important; background:rgba(34,197,94,0.08) !important; }
        .sort-item.wrong-sort { border-color:#ef4444 !important; background:rgba(239,68,68,0.06) !important; }
        .sort-handle { color:#CFD8EA; font-size:1.1rem; flex-shrink:0; }
        .sort-num { background:#E2ECFA; color:var(--cyan); font-weight:800; font-size:0.75rem; padding:3px 8px; border-radius:4px; min-width:24px; text-align:center; flex-shrink:0; }

        /* ===== IMAGE SELECT ===== */
        .img-select-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
        .img-opt { background:#FFFFFF; border:2px solid #CFD8EA; border-radius:10px; padding:12px; cursor:pointer; transition:all 0.15s; text-align:center; }
        .img-opt:hover { border-color:#CFD8EA; }
        .img-opt.selected { border-color:var(--cyan); background:rgba(0,82,204,0.05); }
        .img-opt.correct-img { border-color:#22c55e !important; background:rgba(34,197,94,0.1) !important; }
        .img-opt.wrong-img { border-color:#ef4444 !important; background:rgba(239,68,68,0.08) !important; }
        .img-opt img { width:100%; aspect-ratio:4/3; object-fit:contain; border-radius:6px; margin-bottom:7px; background:#F0F4FA; }
        .img-opt-label { font-size:0.8rem; font-weight:700; color:var(--muted); }

        /* ===== ÔN CÂU SAI - Banner ===== */
        .retry-banner { background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); border-radius:10px; padding:10px 16px; margin-bottom:14px; font-size:0.85rem; font-weight:700; color:#fca5a5; display:none; }
        .retry-banner.visible { display:block; }

        /* ===== THÔNG BÁO HẾT HẠN ===== */
        .expire-banner { background:rgba(255,87,34,0.1); border:1px solid rgba(255,87,34,0.3); border-radius:12px; padding:12px 16px; margin:10px 20px; font-size:0.85rem; font-weight:700; color:#ffaa80; display:none; align-items:center; gap:10px; }
        .expire-banner.visible { display:flex; }

        /* ===== MOBILE TOUCH cho drag-drop ===== */
        @media (max-width: 768px) {
            .matching-grid { grid-template-columns:1fr; }
            .img-select-grid { grid-template-columns:1fr 1fr; gap:8px; }
            .bank-item { padding:8px 12px; font-size:0.82rem; }
            .sort-item { padding:10px 12px; font-size:0.86rem; }
        }

        @media (max-width: 768px) {
            header { flex-direction: column; gap: 8px; text-align: center; padding: 12px; }
            .quiz-layout { grid-template-columns: 1fr; gap: 15px; padding: 10px; }
            .right-sidebar { order: 2; }
            .nav-grid { grid-template-columns: repeat(9, 1fr); max-height: none; }
            .control-btns { flex-wrap: wrap; }
            .btn-ctrl { flex: 1 1 40%; text-align: center; }
            .btn-submit { flex: 1 1 100%; order: -1; }
        }
    </style></head><body>
    <div class="container">
        <header>
            <div>
                <h3 style="color:var(--text);">🎯 Phòng Ôn Luyện & Sát Hạch: ${courseType}</h3>
                <p style="color:var(--muted); font-size:0.75rem; margin-top:2px;">Tiêu chuẩn đạt: ${EXAM_CONFIG.PASS_SCORE} / ${EXAM_CONFIG.MAX_SCORE} điểm | ${EXAM_CONFIG.QUESTION_COUNT} Câu hỏi
                </p>
            </div>
            <div class="timer-box" id="timerContainer">⏱️ <span id="clock">00:00</span></div>
        </header>
        <div class="expire-banner" id="expireBanner">
            ⚠️ <span id="expireMsg"></span>
            <a href="https://zalo.me/0912888360" target="_blank" style="color:#FF5722; margin-left:8px; font-weight:800; text-decoration:none;">Gia hạn ngay →</a>
        </div>
        <div class="quiz-layout">
            <div class="main-quiz">

                <!-- Bước 1: Chọn Level (chỉ IC3 GS6) -->
               <div class="mode-selection-overlay" id="levelSelectBox" style="${levelBoxStyle}">
                   <h2 style="color:var(--text); margin-bottom:6px;">CHỌN CẤP ĐỘ ÔN LUYỆN</h2>
                   <p style="font-size:0.85rem; margin-bottom:20px; color:var(--muted);">IC3 GS6 gồm 3 cấp độ từ cơ bản đến nâng cao</p>
                   <button class="mode-btn" onclick="selectLevel(&apos;ALL&apos;)">
                       🌐 Tất cả các cấp độ
                       <span class="lock-badge" style="color:var(--muted);">Trộn ngẫu nhiên từ Level 1 + 2 + 3</span>
                   </button>
                   <button class="mode-btn" onclick="selectLevel(&apos;IC3_LEVEL1&apos;)">
                       🟢 Level 1 – Cơ bản
                       <span class="lock-badge" style="color:var(--muted);">Kiến thức nền tảng máy tính & mạng</span>
                   </button>
                   <button class="mode-btn" onclick="selectLevel(&apos;IC3_LEVEL2&apos;)">
                       🟡 Level 2 – Trung cấp
                       <span class="lock-badge" style="color:var(--muted);">Ứng dụng văn phòng & internet</span>
                   </button>
                   <button class="mode-btn" onclick="selectLevel(&apos;IC3_LEVEL3&apos;)">
                       🔴 Level 3 – Nâng cao
                       <span class="lock-badge" style="color:var(--muted);">Bảo mật, đám mây & kỹ năng số</span>
                   </button>
                   <a href="/courses" style="color:var(--muted); font-size:0.8rem; margin-top:15px; text-decoration:none;">← Quay lại danh mục khóa học</a>
               </div>
               
               <!-- Bước 2: Chọn Mode -->
               <div class="mode-selection-overlay" id="modeSelectBox" style="${modeBoxStyle}">
                   <h2 style="color:var(--text); margin-bottom:4px; font-size:1.2rem;">CHỌN CHẾ ĐỘ HỌC TẬP</h2>
                   <p style="font-size:0.82rem; margin-bottom:18px; font-weight:700; color:var(--cyan);" id="modeWelcomeTxt">Đang kiểm tra quyền truy cập...</p>

                   <!-- ROW 1: ÔN LUYỆN -->
                   <div style="width:100%; max-width:420px; text-align:left; margin-bottom:6px;">
                       <span style="font-size:0.7rem; font-weight:800; color:var(--muted); letter-spacing:1px; text-transform:uppercase;">📖 Ôn luyện</span>
                   </div>
                   <button class="mode-btn" onclick="launchEngine(&apos;topic&apos;)" id="btn-mode-topic">
                       📌 Ôn luyện theo chủ đề
                       <span class="lock-badge" id="lock-topic">Chọn 1 chủ đề · 15 câu · Có đáp án</span>
                   </button>
                   <button class="mode-btn" onclick="launchEngine(&apos;practice&apos;)" id="btn-mode-practice">
                       🔀 Ôn luyện tự do (hỗn hợp)
                       <span class="lock-badge" id="lock-practice">Ngẫu nhiên từ tất cả chủ đề · 15 câu · Có đáp án</span>
                   </button>

                   <!-- ROW 2: THI THỬ -->
                   <div style="width:100%; max-width:420px; text-align:left; margin:10px 0 6px;">
                       <span style="font-size:0.7rem; font-weight:800; color:var(--muted); letter-spacing:1px; text-transform:uppercase;">⏱️ Thi thử</span>
                   </div>
                   <button class="mode-btn" onclick="launchEngine(&apos;exam&apos;)" id="btn-mode-exam" style="border-color:rgba(255,87,34,0.3); background:rgba(255,87,34,0.03);">
                       🎯 Thi thử thực chiến
                       <span class="lock-badge" id="lock-exam">45 câu · Tính giờ · Không hiện đáp án</span>
                   </button>

                   <!-- ROW 3: FLASHCARD -->
                   <div style="width:100%; max-width:420px; text-align:left; margin:10px 0 6px;">
                       <span style="font-size:0.7rem; font-weight:800; color:var(--muted); letter-spacing:1px; text-transform:uppercase;">📇 Ghi nhớ</span>
                   </div>
                   <button class="mode-btn" onclick="launchFlashcard(&apos;topic&apos;)" style="border-color:rgba(255,215,0,0.3); background:rgba(255,215,0,0.03);">
                       📌 Flashcard theo chủ đề
                       <span class="lock-badge" style="color:#B8860B;">Lật thẻ theo từng chủ đề</span>
                   </button>
                   <button class="mode-btn" onclick="launchFlashcard(&apos;all&apos;)" style="border-color:rgba(255,215,0,0.3); background:rgba(255,215,0,0.03);">
                       🔀 Flashcard hỗn hợp
                       <span class="lock-badge" style="color:#B8860B;">Lật thẻ toàn bộ câu hỏi</span>
                   </button>

                   <!-- ÔN CÂU SAI -->
                   <button class="mode-btn" id="btnRetryFromExam" onclick="launchRetryFromExam()" style="display:none; border-color:rgba(239,68,68,0.4); background:rgba(239,68,68,0.05); margin-top:8px;">
                       🔁 Ôn câu sai từ lần thi trước
                       <span class="lock-badge" id="lock-retry-exam" style="color:#dc2626;"> </span>
                   </button>

                   <a href="/courses" style="color:var(--muted); font-size:0.8rem; margin-top:14px; text-decoration:none; display:block;">← Quay lại danh mục khóa học</a>
               </div>

               <!-- Bước 2b: Chọn Chủ đề (cho mode topic) -->
               <div class="mode-selection-overlay" id="topicSelectBox" style="display:none; overflow-y:auto;">
                   <h2 style="color:var(--text); margin-bottom:4px; font-size:1.1rem;">CHỌN CHỦ ĐỀ ÔN LUYỆN</h2>
                   <p style="font-size:0.82rem; margin-bottom:14px; color:var(--muted);">Mỗi lần ôn 15 câu ngẫu nhiên trong chủ đề</p>
                   <div id="topicList" style="width:100%; max-width:420px;"></div>
                   <button style="color:var(--muted); font-size:0.8rem; margin-top:14px; background:none; border:none; cursor:pointer;" onclick="showModeSelect()">← Quay lại chọn chế độ</button>
               </div>

               <!-- Bước 2c: Chọn Chủ đề Flashcard -->
               <div class="mode-selection-overlay" id="fcTopicSelectBox" style="display:none; overflow-y:auto;">
                   <h2 style="color:var(--text); margin-bottom:4px; font-size:1.1rem;">FLASHCARD THEO CHỦ ĐỀ</h2>
                   <p style="font-size:0.82rem; margin-bottom:14px; color:var(--muted);">Chọn chủ đề để bắt đầu lật thẻ</p>
                   <div id="fcTopicList" style="width:100%; max-width:420px;"></div>
                   <button style="color:var(--muted); font-size:0.8rem; margin-top:14px; background:none; border:none; cursor:pointer;" onclick="showModeSelect()">← Quay lại chọn chế độ</button>
               </div>

                <div class="result-overlay" id="resBox">
                    <h2 style="color:var(--cyan); font-weight:800;">KẾT QUẢ SÁT HẠCH</h2>
                    <div style="font-size:42px; font-weight:800; margin:15px 0;" id="resScore">0 / 1000</div>
                    <p style="margin-bottom:18px; color:#334155; font-size:0.95rem; max-width:420px; line-height:1.5;" id="resText"></p>
                    <div id="resBreakdownWrap" style="width:100%; max-width:460px; text-align:left; margin-bottom:22px; display:none;">
                        <h3 style="font-size:0.78rem; color:var(--muted); font-weight:800; letter-spacing:0.5px; margin-bottom:12px; text-transform:uppercase;">📊 Phân tích từng phần (như đề thi thật)</h3>
                        <div id="resBreakdownTable"></div>
                    </div>
                    <button onclick="location.href=&apos;/courses&apos;" style="padding:12px 35px; background:linear-gradient(135deg,#FF5722,#ff784e); border:none; color:var(--text); font-weight:800; border-radius:25px; cursor:pointer; margin-bottom:12px;">QUAY LẠI TRANG KHÓA HỌC</button>
                    <button onclick="retryWrongAnswers()" id="btnRetryWrong" style="padding:10px 25px; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.4); color:#fca5a5; font-weight:700; border-radius:20px; cursor:pointer; margin-bottom:8px;">🔁 ÔN LẠI CÁC CÂU SAI</button>
                    <button onclick="restartQuiz()" style="padding:10px 25px; background:#F0F4FA; border:1px solid #CFD8EA; color:var(--muted); font-weight:700; border-radius:20px; cursor:pointer;">LÀM LẠI BÀI THI</button>
                </div>

                <div style="font-size:11px; color:var(--cyan); font-weight:800; letter-spacing:0.5px; margin-bottom:10px;">
                CÂU HỎI: <span id="lblIdx">1</span> / <span id="lblTotal">${EXAM_CONFIG.QUESTION_COUNT}</span>
                </div>
                <div class="retry-banner" id="retryBanner">🔁 Chế độ ÔN CÂU SAI — Chỉ hiện các câu bạn đã trả lời sai</div>
                <div class="question-image-wrap" id="questionImageWrap"></div>
                <div class="question-box" id="lblText">Đang tải...</div>
                <div id="optsArea"></div>
                <div class="btn-confirm-wrap" id="btnConfirmWrap">
                    <button class="btn-confirm" id="btnConfirm" onclick="confirmAnswer()">✅ XÁC NHẬN ĐÁP ÁN</button>
                </div>
                <div class="explanation-box" id="explanationBox"><strong>💡 Giải thích:</strong> <span id="explanationText"></span></div>

                <div class="exam-extra-btns" id="examExtraBtns">
                    <button class="btn-mark" id="btnMarkReview" onclick="toggleMarkReview()">🚩 Đánh dấu xem lại</button>
                    <button class="btn-summary" onclick="showSummaryScreen()">📋 Tổng quan bài thi</button>
                </div>

                <div class="summary-overlay" id="summaryOverlay">
                    <h2 style="color:var(--text); margin-bottom:4px; font-size:1.15rem;">📋 TỔNG QUAN BÀI THI</h2>
                    <p style="font-size:0.85rem; color:var(--muted); margin-bottom:4px;" id="summaryStats"></p>
                    <div style="overflow-x:auto; overflow-y:auto; max-height:60vh; border:1px solid var(--border); border-radius:10px;">
                        <table class="summary-table">
                            <thead><tr><th>Số câu</th><th>Nội dung câu hỏi</th><th>Tình trạng</th></tr></thead>
                            <tbody id="summaryGrid"></tbody>
                        </table>
                    </div>
                    <div style="display:flex; gap:10px; margin-top:14px;">
                        <button class="btn-ctrl" style="flex:1;" onclick="hideSummaryScreen()">← QUAY LẠI LÀM BÀI</button>
                        <button class="btn-ctrl btn-submit" style="flex:1;" onclick="submitExamNow()">NỘP BÀI CHẤM ĐIỂM</button>
                    </div>
                </div>

                <div class="control-btns">
                    <button class="btn-ctrl" onclick="go(-1)">← TRƯỚC</button>
                    <button class="btn-ctrl btn-submit" id="btnSubmit" onclick="submitExamNow()">NỘP BÀI CHẤM ĐIỂM</button>
                    <button class="btn-ctrl" onclick="go(1)">TIẾP THEO →</button>
                </div>
            </div>

            <div class="right-sidebar" id="rightSidebar" style="display:none;">
                <h4 style="margin-bottom:8px; font-size:12px; color:var(--muted);">DANH SÁCH CÂU HỎI</h4>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                    <button id="navPagePrev" onclick="changeNavPage(-1)" style="background:#E2ECFA; border:1px solid #CFD8EA; color:var(--muted); border-radius:6px; padding:4px 10px; cursor:pointer; font-size:12px; font-weight:800;">&#9664;</button>
                    <span id="navPageLabel" style="font-size:11px; color:var(--muted); font-weight:700;">1–10</span>
                    <button id="navPageNext" onclick="changeNavPage(1)" style="background:#E2ECFA; border:1px solid #CFD8EA; color:var(--muted); border-radius:6px; padding:4px 10px; cursor:pointer; font-size:12px; font-weight:800;">&#9654;</button>
                </div>
                <div class="nav-grid" id="gridArea"></div>
                <div style="margin-top:12px; font-size:11px; color:var(--muted); line-height:1.6;">
                    <span style="color:#22c55e;">■</span> Đúng &nbsp;
                    <span style="color:#ef4444;">■</span> Sai &nbsp;
                    <span style="color:#CFD8EA;">■</span> Đã chọn
                </div>
            </div>
        </div>
    </div>

    <script>
    var qCount = ${EXAM_CONFIG.QUESTION_COUNT};
    var fullBank = ${bankJSON};
    var topicDomains = ${topicDomainsJSON};
    var list = [];
    var cur = 0;
    var userAns = [];
    var isDone = false;
    var mode = "";
    var selectedLevel = "ALL";
    var selectedCategory = null;      // array các category kỹ thuật thuộc chuyên đề đang ôn (mode === 'topic')
    var selectedCategoryLabel = "";   // tên hiển thị của chuyên đề (vd: "1. Công nghệ thông tin cơ bản")
    var isVerified = localStorage.getItem('course_auth_${courseType}') === 'verified';
    var hasLevels = ${hasLevels};
    var confirmedList = [];
    var matchingState = {};
    var dragdropState = {};
    var sortState = {};
    var isRetryMode = false;
    var markedForReview = {}; // {questionIndex: true} — chỉ dùng ở chế độ thi thử
    var navPage = 0; // trang hiện tại của sidebar (10 câu/trang)
    var NAV_PAGE_SIZE = 10;

    // ===== SHUFFLE =====
    function shuffleArray(arr) {
        var clone = arr.slice();
        for (var i = clone.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = clone[i]; clone[i] = clone[j]; clone[j] = temp;
        }
        return clone;
    }

    // ===== LEVEL & MODE =====
    function selectLevel(lv) {
        selectedLevel = lv;
        document.getElementById('levelSelectBox').style.display = 'none';
        document.getElementById('modeSelectBox').style.display = 'flex';
        verifyModeMenu();
    }

    function setSidebar(visible) {
        var sb = document.getElementById('rightSidebar');
        if (sb) sb.style.display = visible ? 'flex' : 'none';
    }

    function verifyModeMenu() {
        setSidebar(false);
        if (isVerified) {
            document.getElementById('modeWelcomeTxt').textContent = "✅ Quyền học viên hợp lệ – Mở khóa đầy đủ tính năng!";
            document.getElementById('modeWelcomeTxt').style.color = "#22c55e";
            document.getElementById('lock-topic').textContent = "🔓 Chọn 1 chủ đề · 15 câu · Không giới hạn thời gian";
            document.getElementById('lock-topic').style.color = "var(--cyan)";
            document.getElementById('lock-practice').textContent = "🔓 Ôn tập tự do – Xem giải thích ngay, không giới hạn thời gian";
            document.getElementById('lock-practice').style.color = "var(--cyan)";
            document.getElementById('lock-exam').textContent = "🔓 Thi thử thực chiến – 50 phút, tính điểm chuẩn Certiport";
            document.getElementById('lock-exam').style.color = "var(--cyan)";
        } else {
            document.getElementById('modeWelcomeTxt').textContent = "⚠️ Chưa đăng nhập – Ôn theo chủ đề & Thi thử giới hạn dùng thử";
            document.getElementById('modeWelcomeTxt').style.color = "#FF5722";
            document.getElementById('lock-topic').textContent = "⏱️ Dùng thử – Chọn 1 chủ đề · 15 câu · Giới hạn 10 phút";
            document.getElementById('lock-topic').style.color = "#ffaa80";
            document.getElementById('lock-practice').textContent = "🔓 Ngẫu nhiên từ tất cả chủ đề · Có giải thích, không giới hạn thời gian";
            document.getElementById('lock-practice').style.color = "var(--cyan)";
            document.getElementById('lock-exam').textContent = "⏱️ Thi thử dùng thử – Giới hạn 10 phút";
            document.getElementById('lock-exam').style.color = "#ffaa80";
        }
        // Hiện nút ôn câu sai từ lần thi nếu có data
        var examWrong = localStorage.getItem('mos360_exam_wrong_${courseType}');
        var btnRetryExam = document.getElementById('btnRetryFromExam');
        if (btnRetryExam && examWrong) {
            var count = JSON.parse(examWrong).length;
            btnRetryExam.style.display = 'block';
            document.getElementById('lock-retry-exam').textContent = count + " câu sai từ lần thi gần nhất";
        }
    }

    function launchEngine(chosenMode) {
        // Kiểm tra cooldown học thử (1 tiếng) cho người chưa đăng nhập
        if (!isVerified) {
            var cooldownKey = 'mos360_trial_last_${courseType}';
            var lastTrial = localStorage.getItem(cooldownKey);
            if (lastTrial) {
                var elapsed = Date.now() - parseInt(lastTrial);
                var cooldownMs = 1 * 60 * 60 * 1000; // 1 tiếng
                if (elapsed < cooldownMs) {
                    var remaining = Math.ceil((cooldownMs - elapsed) / 60000);
                    var hrs = Math.floor(remaining / 60);
                    var mins = remaining % 60;
                    var timeStr = hrs > 0 ? hrs + ' giờ ' + (mins > 0 ? mins + ' phút' : '') : mins + ' phút';
                    alert('⏳ Bạn cần chờ thêm ' + timeStr + ' nữa để học thử lại. Đăng nhập học viên để học không giới hạn!');
                    return;
                }
            }
            localStorage.setItem(cooldownKey, Date.now().toString());
        }

        mode = chosenMode;
        isRetryMode = false;
        document.getElementById('modeSelectBox').style.display = "none";
        document.getElementById('retryBanner').classList.remove('visible');

        // Chế độ "Ôn theo chủ đề" cần hiển thị danh sách chủ đề trước,
        // không build/chạy quiz ngay — chờ người dùng chọn 1 chủ đề ở launchTopicMode().
        if (mode === 'topic') {
            showTopicSelect(false);
            return;
        }

        document.getElementById('btnSubmit').style.display = mode === 'exam' ? 'inline-block' : 'none';
        document.getElementById('examExtraBtns').style.display = mode === 'exam' ? 'flex' : 'none';

        var filtered = selectedLevel === 'ALL' ? fullBank : fullBank.filter(function(b) { return b.lv === selectedLevel; });
        var selected;
        if (mode === 'practice') {
            selected = filtered.slice();
        } else if (mode === 'exam') {
            // Đảm bảo mỗi chuyên đề/category đều có ít nhất 2 câu trong đề thi,
            // để bảng "Phân tích từng phần" sau khi nộp bài luôn đủ 7 chuyên đề / 4 module
            // — không phụ thuộc may rủi của random thuần túy.
            selected = stratifiedSample(filtered, ${EXAM_CONFIG.QUESTION_COUNT}, 2);
        } else {
            selected = shuffleArray(filtered).slice(0, Math.min(${EXAM_CONFIG.QUESTION_COUNT}, filtered.length));
        }
        buildList(selected);
        initQuiz();
    }

    function buildList(selected) {
        setSidebar(true);
        markedForReview = {};
        list = [];
        for (var i = 0; i < selected.length; i++) {
            var b = selected[i];
            list.push({ id: b.id, q: "[Câu " + (i+1) + "] " + b.q, options: b.o ? b.o.slice() : [], o_left: b.o_left || [], o_right: b.o_right || [], c: b.c, e: b.e, t: b.t, img: b.img || "", cat: b.cat || "" });            
        }
        qCount = list.length;
        userAns = list.map(function(q) { return Array.isArray(q.c) ? [] : null; });
        confirmedList = new Array(list.length).fill(false);
        matchingState = {};
        dragdropState = {};
        sortState = {};
    }

    // ===== ÔN CÂU SAI =====
    function retryWrongAnswers() {
        var wrongItems = [];
        for (var i = 0; i < list.length; i++) {
            try {
                if (!isCorrectAnswer(i)) {
                    var byId = (list[i] && list[i].id != null) ? fullBank.find(function(b) { return b.id === list[i].id; }) : null;
                    var rawQ = (list[i] && typeof list[i].q === 'string') ? list[i].q.replace(/^\[Câu \d+\] /, '') : null;
                    var matched = byId || (rawQ ? fullBank.find(function(b) { return b.q === rawQ; }) : null);
                    wrongItems.push(matched || list[i]);
                }
            } catch (err) {
                console.error('Lỗi khi xử lý câu ' + (i + 1) + ' trong ÔN CÂU SAI:', err);
                if (list[i]) wrongItems.push(list[i]);
            }
        }
        if (wrongItems.length === 0) { alert("🎉 Tuyệt vời! Bạn không có câu nào sai!"); return; }
        isRetryMode = true;
        document.getElementById('resBox').style.display = "none";
        document.getElementById('retryBanner').classList.add('visible');
        document.getElementById('btnSubmit').style.display = mode === 'exam' ? 'inline-block' : 'none';
        document.getElementById('examExtraBtns').style.display = mode === 'exam' ? 'flex' : 'none';
        buildList(wrongItems);
        cur = 0; isDone = false;
        initQuiz();
    }

    // ===== SIDEBAR PAGINATION =====
    function renderNavGrid() {
        var g = document.getElementById('gridArea');
        g.innerHTML = '';
        var totalPages = Math.ceil(qCount / NAV_PAGE_SIZE);
        var start = navPage * NAV_PAGE_SIZE;
        var end = Math.min(start + NAV_PAGE_SIZE, qCount);

        for (var i = start; i < end; i++) {
            var d = document.createElement('div');
            var cls = 'nav-item';
            if (i === cur) cls += ' current';
            else if (confirmedList[i]) cls += isCorrectAnswer(i) ? ' correct-nav' : ' wrong-nav';
            else if (isAnswered(i)) cls += ' answered';
            if (markedForReview[i]) cls += ' marked';
            d.className = cls;
            d.id = 'ni-' + i;
            d.textContent = i + 1;
            (function(idx){ d.onclick = function() { cur = idx; renderQ(); }; })(i);
            g.appendChild(d);
        }

        // Cập nhật label trang
        var label = document.getElementById('navPageLabel');
        if (label) label.textContent = (start+1) + '–' + end + ' / ' + qCount;

        // Ẩn/hiện nút prev/next
        var prev = document.getElementById('navPagePrev');
        var next = document.getElementById('navPageNext');
        if (prev) prev.style.opacity = navPage === 0 ? '0.3' : '1';
        if (next) next.style.opacity = navPage >= totalPages - 1 ? '0.3' : '1';
    }

    function changeNavPage(dir) {
        var totalPages = Math.ceil(qCount / NAV_PAGE_SIZE);
        navPage = Math.max(0, Math.min(totalPages - 1, navPage + dir));
        renderNavGrid();
    }

    function syncNavPageToCur() {
        var targetPage = Math.floor(cur / NAV_PAGE_SIZE);
        if (targetPage !== navPage) { navPage = targetPage; }
        renderNavGrid();
    }

    function initQuiz() {
        navPage = 0;
        renderNavGrid();
        cur = 0; isDone = false;
        // Cập nhật title header
        var titleEl = document.getElementById('quizTitle');
        if (titleEl) {
            var modeNames = { practice: '🔀 Ôn luyện hỗn hợp', exam: '🎯 Thi thử thực chiến', topic: '📌 Ôn theo chủ đề' };
            var catPart = (mode === 'topic' && selectedCategoryLabel) ? (' — ' + selectedCategoryLabel) : '';
            titleEl.textContent = (modeNames[mode] || mode) + catPart + ' | ${courseType}';
        }
        renderQ();
        checkExpireBanner();

        var mins;
        if (mode === 'exam') {
            mins = isVerified ? 50 : 10;
        } else if (mode === 'practice') {
            // Ôn luyện tự do (hỗn hợp): luôn mở, không giới hạn thời gian, không cần đăng nhập
            mins = 0;
        } else {
            // topic: vẫn giới hạn 10 phút cho người chưa đăng nhập, mở khi đã xác thực
            mins = isVerified ? 0 : 10;
        }
        if (mins > 0) {
            startTimer(mins);
        } else {
            document.getElementById('timerContainer').innerHTML = "📖 Ôn luyện tự do";
            document.getElementById('timerContainer').style.border = "2px solid #22c55e";
            document.getElementById('timerContainer').style.color = "#22c55e";
        }
    }

    // ===== CROSS-MODE: ÔN CÂU SAI TỪ LẦN THI =====
    function launchRetryFromExam() {
        var raw = localStorage.getItem('mos360_exam_wrong_${courseType}');
        if (!raw) return;
        var wrongEntries = JSON.parse(raw);
        var wrongItems = wrongEntries.map(function(entry) {
            if (typeof entry === 'string') {
                return fullBank.find(function(b) { return b.q === entry; });
            }
            var byId = entry.id != null ? fullBank.find(function(b) { return b.id === entry.id; }) : null;
            if (byId) return byId;
            return fullBank.find(function(b) { return b.q === entry.q; });
        }).filter(Boolean);
        if (wrongItems.length === 0) { alert("Không tìm thấy câu hỏi trong ngân hàng! (Có thể ngân hàng câu hỏi đã được cập nhật kể từ lần thi trước — hãy làm bài thi mới để lưu lại danh sách câu sai mới nhất.)"); return; }
        mode = 'practice';
        isRetryMode = true;
        document.getElementById('modeSelectBox').style.display = "none";
        document.getElementById('btnSubmit').style.display = 'none';
        document.getElementById('examExtraBtns').style.display = 'none';
        document.getElementById('retryBanner').classList.add('visible');
        buildList(wrongItems);
        initQuiz();
    }

    // ===== THÔNG BÁO HẾT HẠN =====
    function parseExpireDate(raw) {
        // Hỗ trợ cả "DD/MM/YYYY" (định dạng VN) và "YYYY-MM-DD" (ISO).
        // Tất cả đều tính hết ngày theo múi giờ Việt Nam (UTC+7 = 16:59:59 UTC).
        if (!raw) return null;
        var dd, mm, yyyy;
        if (raw.includes("/")) {
            var p = raw.split("/");
            dd = +p[0]; mm = +p[1]; yyyy = +p[2];
        } else {
            var p = raw.split("-");
            yyyy = +p[0]; mm = +p[1]; dd = +p[2];
        }
        if (yyyy < 100) yyyy += 2000;
        // 23:59:59 Vietnam time = 16:59:59 UTC
        return new Date(Date.UTC(yyyy, mm - 1, dd, 16, 59, 59));
    }

    // Thu hồi quyền NGAY trong phiên hiện tại (không chỉ xoá localStorage cho lần tải sau) —
    // dùng chung cho cả trường hợp hết hạn và trường hợp admin Reset thiết bị.
    function revokeAccessNow(reasonMsg) {
        isVerified = false;
        localStorage.removeItem('course_auth_${courseType}');
        localStorage.removeItem('course_expire_${courseType}');
        localStorage.removeItem('course_ping_${courseType}');
        var banner = document.getElementById('expireBanner');
        var msg = document.getElementById('expireMsg');
        if (banner && msg && reasonMsg) {
            msg.textContent = reasonMsg;
            banner.classList.add('visible');
        }
        // Cập nhật lại badge/khoá thời gian ngay lập tức cho phiên đang mở, không cần tải lại trang
        if (typeof verifyModeMenu === 'function') verifyModeMenu();
    }

    function checkExpireBanner() {
        var expireRaw = localStorage.getItem('course_expire_${courseType}');
        if (!expireRaw || !isVerified) return;
        try {
            var expireDate = parseExpireDate(expireRaw);
            if (!expireDate || isNaN(expireDate.getTime())) return;
            var now = new Date();
            var diffDays = Math.ceil((expireDate - now) / (1000 * 60 * 60 * 24));
            var banner = document.getElementById('expireBanner');
            var msg = document.getElementById('expireMsg');
            if (diffDays <= 0) {
                // FIX: thu hồi quyền NGAY trong phiên này, không để học viên dùng tiếp tới khi tải lại trang
                revokeAccessNow("Tài khoản của bạn đã hết hạn! Liên hệ MOS360 để gia hạn.");
            } else if (diffDays <= 7) {
                msg.textContent = "Tài khoản sắp hết hạn trong " + diffDays + " ngày. Gia hạn ngay để không gián đoạn!";
                banner.classList.add('visible');
            }
        } catch(e) {}
    }

    // ===== TỰ ĐỘNG XÁC THỰC LẠI (SILENT RE-VERIFY) =====
    // Ping ngầm để: (1) khôi phục quyền sau khi deploy/xoá cache nếu vẫn còn hợp lệ,
    // (2) phát hiện NHANH khi admin Reset thiết bị hoặc tài khoản vừa hết hạn và thu hồi quyền ngay.
    function silentRevalidate() {
        var phone = localStorage.getItem('course_phone_${courseType}');
        var deviceId = localStorage.getItem('mos360_device_id');
        if (!phone || !deviceId) return;
        // Giảm xuống 5 phút (từ 12 giờ) để việc Reset thiết bị / hết hạn có hiệu lực gần như ngay lập tức
        // ở lần tải trang tiếp theo, thay vì học viên có thể dùng "chùa" cả nửa ngày.
        var lastPing = parseInt(localStorage.getItem('course_ping_${courseType}') || '0');
        var now = Date.now();
        if (isVerified && now - lastPing < 5 * 60 * 1000) return;
        fetch('/api/verify-code?phone=' + encodeURIComponent(phone) +
              '&course=' + encodeURIComponent('${courseType}') +
              '&deviceId=' + encodeURIComponent(deviceId) +
              '&silent=1')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.success) {
                    localStorage.setItem('course_auth_${courseType}', 'verified');
                    if (data.expire) localStorage.setItem('course_expire_${courseType}', data.expire);
                    localStorage.setItem('course_ping_${courseType}', String(now));
                    if (!isVerified) {
                        // Quyền vừa được khôi phục → reload để áp dụng
                        location.reload();
                    }
                } else {
                    // FIX: Hết hạn HOẶC bị admin Reset thiết bị → thu hồi quyền NGAY, không chờ tải lại trang
                    revokeAccessNow(data.msg || "Phiên đăng nhập không còn hợp lệ. Vui lòng đăng nhập lại.");
                }
            })
            .catch(function() { /* im lặng nếu offline */ });
    }

    // ===== ANSWER HELPERS =====
    function isConfirmed(idx) { return confirmedList[idx] === true; }

    function isAnswered(idx) {
        var q = list[idx];
        if (q.t === 'matching') {
            var s = matchingState[idx];
            if (!s) return false;
            // Cần fill đủ tất cả slots
            return s.dropData.every(function(d) { return d !== null; });
        }
        if (q.t === 'dragdrop') { var s2 = dragdropState[idx]; return s2 && s2.every(function(d) { return d !== null; }); }
        if (q.t === 'sort-order') return true;
        var a = userAns[idx];
        return Array.isArray(a) ? a.length > 0 : a !== null;
    }

    function isCorrectAnswer(idx) {
        var q = list[idx];
        if (q.t === 'matching') {
            var s = matchingState[idx];
            if (!s) return false;
            var keys = Object.keys(q.c);
            var firstAns = q.c[keys[0]];
            var isTextAns = typeof firstAns === 'string';
            var rightT = q.o_right && q.o_right.length ? q.o_right : q.options;
            return keys.every(function(k, i) {
                if (s.dropData[i] === null) return false;
                if (isTextAns) return rightT[s.dropData[i]] === q.c[k];
                return s.dropData[i] === q.c[k];
            });
        }
        if (q.t === 'dragdrop') {
            var s2 = dragdropState[idx];
            if (!s2) return false;
            return Array.isArray(q.c) && q.c.every(function(ans, i) { return s2[i] === ans; });
        }
        if (q.t === 'sort-order') {
            var s3 = sortState[idx];
            if (!s3) return false;
            return Array.isArray(q.c) && q.c.every(function(ans, i) { return s3[i] === ans; });
        }
        if (Array.isArray(q.c)) {
            var a = userAns[idx];
            if (!Array.isArray(a) || a.length !== q.c.length) return false;
            var sc = q.c.slice().sort(), sa = a.slice().sort();
            for (var i = 0; i < sc.length; i++) { if (sc[i] !== sa[i]) return false; }
            return true;
        }
        return userAns[idx] === q.c;
    }

    // ===== CONFIRM =====
    function confirmAnswer() {
        if (!isAnswered(cur)) return;
        confirmedList[cur] = true;
        var ni = document.getElementById('ni-' + cur);
        ni.classList.remove('answered');
        ni.classList.add(isCorrectAnswer(cur) ? 'correct-nav' : 'wrong-nav');
        renderQ();
    }

    function updateConfirmBtn() {
        var wrap = document.getElementById('btnConfirmWrap');
        var confirmed = isConfirmed(cur);
        if (!isDone && !confirmed && isAnswered(cur)) {
            wrap.classList.add('visible');
        } else {
            wrap.classList.remove('visible');
        }
    }

    // ===== RENDER MAIN =====
    function renderQ() {
        var q = list[cur];
        document.getElementById('lblIdx').textContent = cur + 1;
        if (document.getElementById('lblTotal')) document.getElementById('lblTotal').textContent = qCount;
        document.getElementById('lblText').textContent = q.q;
        var area = document.getElementById('optsArea');
        area.innerHTML = '';
        var expBox = document.getElementById('explanationBox');
        expBox.classList.remove('visible');

        // Ảnh minh họa
        // Ảnh minh họa
        var imgWrap = document.getElementById('questionImageWrap');
        if (q.img) {
            var imgEl = document.createElement('img');
            imgEl.src = q.img;
            imgEl.alt = 'Minh họa';
            imgEl.loading = 'lazy';
            imgEl.onerror = function() { imgWrap.style.display = 'none'; };
            imgWrap.innerHTML = '';
            imgWrap.appendChild(imgEl);
            imgWrap.style.display = 'flex';
            // Câu 86 cần ảnh to hơn để đọc thông tin
            if (q.img.indexOf('q86') >= 0) {
                imgWrap.style.maxHeight = '380px';
                imgEl.style.maxHeight = '380px';
            }
        } else {
            imgWrap.innerHTML = '';
            imgWrap.style.display = 'none';
        }

        var confirmed = isConfirmed(cur);

        if (q.t === 'matching') { renderMatching(q, area, confirmed); }
        else if (q.t === 'dragdrop') { renderDragdrop(q, area, confirmed); }
        else if (q.t === 'sort-order') { renderSortOrder(q, area, confirmed); }
        else if (q.t === 'image-select') { renderImageSelect(q, area, confirmed); }
        else { renderSingleMultiple(q, area, confirmed); }

        updateConfirmBtn();

        if (confirmed && mode !== 'exam') {
            document.getElementById('explanationText').textContent = q.e;
            expBox.classList.add('visible');
        }

        syncNavPageToCur();
        updateMarkBtn();
    }

    function updateMarkBtn() {
        var btn = document.getElementById('btnMarkReview');
        if (!btn) return;
        if (markedForReview[cur]) {
            btn.classList.add('active');
            btn.textContent = '🚩 Đã đánh dấu — Bỏ đánh dấu';
        } else {
            btn.classList.remove('active');
            btn.textContent = '🚩 Đánh dấu xem lại';
        }
    }

    function toggleMarkReview() {
        var wasMarked = !!markedForReview[cur];
        if (wasMarked) {
            delete markedForReview[cur];
            updateMarkBtn();
            renderNavGrid();
        } else {
            markedForReview[cur] = true;
            // "Làm sau": đánh dấu xong tự chuyển sang câu tiếp theo để tiếp tục làm bài
            if (cur < qCount - 1) { go(1); }
            else { updateMarkBtn(); renderNavGrid(); }
        }
    }

    // ===== TỔNG QUAN BÀI THI (Go to Summary) =====
    function showSummaryScreen() {
        var tbody = document.getElementById('summaryGrid');
        var rows = '';
        var answeredCount = 0, markedCount = 0;
        for (var i = 0; i < qCount; i++) {
            var answered = isAnswered(i);
            var marked = !!markedForReview[i];
            if (answered) answeredCount++;
            if (marked) markedCount++;
            var qText = (list[i] && list[i].q) ? list[i].q.replace(/^\[Câu \d+\]\s*/, '') : '';
            if (qText.length > 90) qText = qText.slice(0, 90) + '…';
            var statusHtml = answered
                ? '<span class="summary-status st-answered">✓ Đã làm</span>'
                : '<span class="summary-status st-unanswered">○ Chưa làm</span>';
            if (marked) statusHtml += '<span class="summary-status st-marked">🚩 Đánh dấu</span>';
            var rowCls = 'summary-row' + (i === cur ? ' is-current' : '');
            rows += '<tr class="' + rowCls + '" onclick="jumpFromSummary(' + i + ')">' +
                '<td>' + (i + 1) + '</td>' +
                '<td class="summary-qtext">' + qText.replace(/</g,'&lt;') + '</td>' +
                '<td>' + statusHtml + '</td>' +
                '</tr>';
        }
        tbody.innerHTML = rows;
        document.getElementById('summaryStats').textContent =
            'Đã làm: ' + answeredCount + '/' + qCount + ' câu · Đã đánh dấu xem lại: ' + markedCount + ' câu';
        document.getElementById('summaryOverlay').classList.add('visible');
    }

    function hideSummaryScreen() {
        document.getElementById('summaryOverlay').classList.remove('visible');
    }

    function jumpFromSummary(idx) {
        cur = idx;
        hideSummaryScreen();
        renderQ();
    }

    // ===== SINGLE / MULTIPLE =====
    function renderSingleMultiple(q, area, confirmed) {
        var isMultiple = Array.isArray(q.c);
        if (isMultiple) {
            var hint = document.createElement('div');
            hint.style.cssText = "font-size:0.8rem;color:#f59e0b;margin-bottom:10px;font-weight:bold;";
            hint.textContent = "⚠️ Chọn " + q.c.length + " đáp án đúng";
            area.appendChild(hint);
        }
        for (var i = 0; i < q.options.length; i++) {
            var div = document.createElement('div');
            var isSelected = isMultiple ? userAns[cur].indexOf(i) >= 0 : userAns[cur] === i;
            var isCorrectOpt = isMultiple ? q.c.indexOf(i) >= 0 : q.c === i;
            var cls = 'option';
            if (confirmed && mode !== 'exam') {
                if (isSelected && isCorrectOpt) cls += ' correct-ans';
                else if (isSelected && !isCorrectOpt) cls += ' wrong-ans';
                else if (!isSelected && isCorrectOpt) cls += ' show-correct';
            } else if (isSelected) { cls += ' selected'; }
            div.className = cls;
            div.innerHTML = '<span style="min-width:22px;font-weight:900;color:var(--muted);">' + String.fromCharCode(65+i) + '.</span>' + q.options[i];
            if (!isDone && !confirmed) {
                (function(optIdx){
                    div.onclick = function() {
                        if (isMultiple) {
                            var idx2 = userAns[cur].indexOf(optIdx);
                            if (idx2 >= 0) userAns[cur].splice(idx2, 1); else userAns[cur].push(optIdx);
                        } else { userAns[cur] = optIdx; }
                        renderQ();
                    };
                })(i);
            }
            area.appendChild(div);
        }
    }

    // ===== IMAGE SELECT =====
    function resolveImgKey(key) {
        if (!key) return '';
        if (key.startsWith('http')) return key;
        // key là image_key → resolve qua IMAGE_MAP trên server, nhưng client dùng pattern
        return key; // img đã được resolve server-side trong bankJSON
    }
    function renderImageSelect(q, area, confirmed) {
        var grid = document.createElement('div');
        grid.className = 'img-select-grid';
        var isMultiple = Array.isArray(q.c);
        q.options.forEach(function(opt, i) {
            var cell = document.createElement('div');
            var isSelected = isMultiple ? (userAns[cur]||[]).indexOf(i) >= 0 : userAns[cur] === i;
            var isCorrectOpt = isMultiple ? q.c.indexOf(i) >= 0 : q.c === i;
            var cls = 'img-opt';
            if (confirmed && mode !== 'exam') {
                if (isSelected && isCorrectOpt) cls += ' correct-img';
                else if (isSelected && !isCorrectOpt) cls += ' wrong-img';
                else if (!isSelected && isCorrectOpt) cls += ' correct-img';
            } else if (isSelected) { cls += ' selected'; }
            cell.className = cls;
            var imgSrc = opt && typeof opt === 'object' ? (opt.img || '') : '';
            var label = opt && typeof opt === 'object' ? (opt.label || '') : String(opt);
            var imgEl = document.createElement('img');
            imgEl.src = imgSrc;
            imgEl.onerror = function() { this.style.minHeight='60px'; this.style.background='#F0F4FA'; };
            var labelEl = document.createElement('div');
            labelEl.className = 'img-opt-label';
            labelEl.textContent = String.fromCharCode(65+i) + '. ' + label;
            cell.appendChild(imgEl);
            cell.appendChild(labelEl);
            if (!isDone && !confirmed) {
                (function(optIdx){
                    cell.onclick = function() {
                        if (isMultiple) {
                            if (!Array.isArray(userAns[cur])) userAns[cur] = [];
                            var idx2 = userAns[cur].indexOf(optIdx);
                            if (idx2 >= 0) userAns[cur].splice(idx2,1); else userAns[cur].push(optIdx);
                        } else { userAns[cur] = optIdx; }
                        renderQ();
                    };
                })(i);
            }
            grid.appendChild(cell);
        });
        area.appendChild(grid);
    }

    // ===== MATCHING =====
    function renderMatching(q, area, confirmed) {
        var leftKeys = (q.o_left && q.o_left.length) ? q.o_left : Object.keys(q.c);
        var rightTexts = q.o_right && q.o_right.length ? q.o_right : q.options;
        var firstVal = q.c[leftKeys[0]];
        var isTextAnswer = typeof firstVal === 'string';
        var reusable = isTextAnswer;

        if (!matchingState[cur]) matchingState[cur] = { dropData: new Array(leftKeys.length).fill(null) };
        var state = matchingState[cur];

        if (!confirmed) {
            var hint = document.createElement('div');
            hint.style.cssText = "font-size:0.8rem;color:#f59e0b;font-weight:bold;margin-bottom:12px;";
            hint.textContent = reusable ? "Nhấn chọn đáp án rồi nhấn vào ô cần ghép" : "Kéo thả hoặc nhấn chọn để ghép cặp";
            area.appendChild(hint);
        }

        // Header labels
        var headerRow = document.createElement('div');
        headerRow.style.cssText = "display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:6px;";
        var lh = document.createElement('div'); lh.className = 'matching-col-label'; lh.textContent = 'KHÁI NIỆM';
        var rh = document.createElement('div'); rh.className = 'matching-col-label'; rh.textContent = confirmed ? 'KẾT QUẢ' : 'KÉO ĐÁP ÁN VÀO ĐÂY';
        headerRow.appendChild(lh); headerRow.appendChild(rh);
        area.appendChild(headerRow);

        // Grid — mỗi cặp left+right = 1 hàng → tự động cùng chiều cao
        var grid = document.createElement('div');
        grid.style.cssText = "display:grid; grid-template-columns:1fr 1fr; gap:8px 10px; margin-bottom:12px; align-items:stretch;";

        leftKeys.forEach(function(key, idx) {
            // LEFT cell
            var leftCell = document.createElement('div');
            leftCell.className = 'matching-row-left';
            if (key.startsWith('http') || key.startsWith('https')) {
                var imgEl = document.createElement('img');
                imgEl.src = key;  // ← dùng thẳng key luôn
                imgEl.style.cssText = 'max-width:100%; max-height:80px; object-fit:contain; border-radius:6px;';
                imgEl.alt = '';
                leftCell.appendChild(imgEl);
            } else {
                leftCell.innerHTML = '<span class="matching-dot"></span>' + key;
            }

            // RIGHT cell (drop zone)
            var zone = document.createElement('div');
            var droppedVal = state.dropData[idx];
            var correctVal = q.c[key];
            var isDropCorrect = droppedVal !== null && (isTextAnswer ? rightTexts[droppedVal] === correctVal : droppedVal === correctVal);

            zone.className = 'drop-zone' + (droppedVal !== null ? ' filled' : '');
            if (droppedVal !== null && confirmed) zone.classList.add(isDropCorrect ? 'correct-match' : 'wrong-match');
            zone.dataset.idx = idx;
            zone.textContent = droppedVal !== null ? rightTexts[droppedVal] : 'Thả vào đây';

            if (!confirmed) {
                zone.addEventListener('dragover', function(e) { e.preventDefault(); zone.classList.add('drag-over'); });
                zone.addEventListener('dragleave', function() { zone.classList.remove('drag-over'); });
                zone.addEventListener('drop', function(e) {
                    e.preventDefault(); zone.classList.remove('drag-over');
                    var val = parseInt(e.dataTransfer.getData('text/plain'));
                    if (!reusable) { state.dropData.forEach(function(v,i2){ if(v===val&&i2!==idx) state.dropData[i2]=null; }); }
                    state.dropData[idx] = val;
                    renderQ();
                });
                zone.addEventListener('click', function() {
                    if (window._matchTapSel !== undefined) {
                        var val = window._matchTapSel;
                        if (!reusable) { state.dropData.forEach(function(v,i2){ if(v===val&&i2!==idx) state.dropData[i2]=null; }); }
                        state.dropData[idx] = val;
                        window._matchTapSel = undefined;
                        document.querySelectorAll('.bank-item').forEach(function(b){ b.style.outline=''; });
                        renderQ();
                    } else if (droppedVal !== null) {
                        state.dropData[idx] = null; renderQ();
                    }
                });
            }

            grid.appendChild(leftCell);
            grid.appendChild(zone);
        });
        area.appendChild(grid);

        // Bank
        if (!confirmed) {
            var blabel = document.createElement('div'); blabel.className = 'matching-col-label'; blabel.textContent = 'NGÂN HÀNG ĐÁP ÁN';
            area.appendChild(blabel);
            var bank = document.createElement('div'); bank.className = 'answer-bank';
            rightTexts.forEach(function(text, val) {
                var item = document.createElement('div'); item.className = 'bank-item'; item.draggable = true; item.dataset.val = val; item.textContent = text;
                if (!reusable && state.dropData.indexOf(val) >= 0) item.style.display = 'none';
                item.addEventListener('dragstart', function(e) { e.dataTransfer.setData('text/plain', val); item.classList.add('dragging'); });
                item.addEventListener('dragend', function() { item.classList.remove('dragging'); });
                item.addEventListener('click', function() {
                    document.querySelectorAll('.bank-item').forEach(function(b){ b.style.outline=''; });
                    if (window._matchTapSel === val) { window._matchTapSel = undefined; }
                    else { window._matchTapSel = val; item.style.outline='2px solid var(--cyan)'; }
                });
                bank.appendChild(item);
            });
            area.appendChild(bank);
        }
    }

    // ===== DRAGDROP (fill-in-blank) =====
    function renderDragdrop(q, area, confirmed) {
        var blanks = Array.isArray(q.c) ? q.c.length : 1;
        if (!dragdropState[cur]) dragdropState[cur] = new Array(blanks).fill(null);
        var state = dragdropState[cur];
        var words = q.options.slice();

        if (!confirmed) {
            var hint = document.createElement('div');
            hint.style.cssText = "font-size:0.8rem;color:#f59e0b;font-weight:bold;margin-bottom:10px;";
            hint.textContent = "Kéo từ ngân hàng vào ô trống trong câu";
            area.appendChild(hint);
        }

        // Build sentence with inline drops
        var sentBox = document.createElement('div'); sentBox.className = 'sentence-box';
        var parts = q.q.replace(/^\[Câu \d+\] /, '').split('___');
        parts.forEach(function(part, pi) {
            sentBox.appendChild(document.createTextNode(part));
            if (pi < blanks) {
                var zone = document.createElement('span'); zone.className = 'inline-drop' + (state[pi] !== null ? ' filled' : '');
                var correctVal = Array.isArray(q.c) ? q.c[pi] : q.c;
                if (state[pi] !== null && confirmed) zone.classList.add(state[pi] === correctVal ? 'correct-fill' : 'wrong-fill');
                zone.dataset.idx = pi;
                zone.textContent = state[pi] !== null ? words[state[pi]] : 'thả vào đây';
                if (!confirmed) {
                    zone.addEventListener('dragover', function(e) { e.preventDefault(); zone.classList.add('drag-over'); });
                    zone.addEventListener('dragleave', function() { zone.classList.remove('drag-over'); });
                    zone.addEventListener('drop', function(e) {
                        e.preventDefault(); zone.classList.remove('drag-over');
                        var val = parseInt(e.dataTransfer.getData('text/plain'));
                        var old = state[pi];
                        if (old !== null) { var ob = area.querySelector('.bank-item[data-val="'+old+'"]'); if(ob) ob.style.display=''; }
                        state.forEach(function(v,i2){ if(v===val&&i2!==pi) state[i2]=null; });
                        state[pi] = val;
                        var bi = area.querySelector('.bank-item[data-val="'+val+'"]'); if(bi) bi.style.display='none';
                        dragdropState[cur] = state; renderQ();
                    });
                    // Mobile tap
                    zone.addEventListener('click', function() {
                        if (window._ddTapSel !== undefined) {
                            var val = window._ddTapSel;
                            var old = state[pi];
                            if(old!==null){var ob=area.querySelector('.bank-item[data-val="'+old+'"]');if(ob)ob.style.display='';}
                            state.forEach(function(v,i2){if(v===val&&i2!==pi)state[i2]=null;});
                            state[pi]=val;
                            var bi=area.querySelector('.bank-item[data-val="'+val+'"]');if(bi)bi.style.display='none';
                            window._ddTapSel=undefined; dragdropState[cur]=state; renderQ();
                        } else if (state[pi]!==null) {
                            var ob2=area.querySelector('.bank-item[data-val="'+state[pi]+'"]');if(ob2)ob2.style.display='';
                            state[pi]=null; dragdropState[cur]=state; renderQ();
                        }
                    });
                }
                sentBox.appendChild(zone);
            }
        });
        area.appendChild(sentBox);

        if (!confirmed) {
            var blabel = document.createElement('div'); blabel.className = 'matching-col-label'; blabel.textContent = 'NGÂN HÀNG TỪ — KÉO VÀO Ô TRỐNG';
            area.appendChild(blabel);
            var bank = document.createElement('div'); bank.className = 'answer-bank';
            words.forEach(function(word, val) {
                var item = document.createElement('div'); item.className = 'bank-item'; item.draggable = true; item.dataset.val = val; item.textContent = word;
                if (state.indexOf(val) >= 0) item.style.display = 'none';
                item.addEventListener('dragstart', function(e) { e.dataTransfer.setData('text/plain', val); item.classList.add('dragging'); });
                item.addEventListener('dragend', function() { item.classList.remove('dragging'); });
                item.addEventListener('click', function() {
                    document.querySelectorAll('.bank-item').forEach(function(b){b.style.outline='';});
                    if(window._ddTapSel===val){window._ddTapSel=undefined;}
                    else{window._ddTapSel=val;item.style.outline='2px solid var(--cyan)';}
                });
                bank.appendChild(item);
            });
            area.appendChild(bank);
        }
    }

    // ===== SORT ORDER =====
    function renderSortOrder(q, area, confirmed) {
        var items = q.options.slice();
        if (!sortState[cur]) {
            var init = items.map(function(_,i){return i;});
            sortState[cur] = shuffleArray(init);
        }
        var state = sortState[cur];

        if (!confirmed) {
            var hint = document.createElement('div');
            hint.style.cssText = "font-size:0.8rem;color:#f59e0b;font-weight:bold;margin-bottom:10px;";
            hint.textContent = "Kéo để sắp xếp từ trên xuống dưới theo thứ tự đúng";
            area.appendChild(hint);
        }

        var sortList = document.createElement('div'); sortList.className = 'sort-list'; sortList.id = 'sortListEl';
        var dragSrc = null;

        state.forEach(function(optIdx, pos) {
            var item = document.createElement('div');
            var correctPos = Array.isArray(q.c) ? q.c.indexOf(optIdx) : -1;
            var cls = 'sort-item';
            if (confirmed && mode !== 'exam') {
                cls += (pos === correctPos) ? ' correct-sort' : ' wrong-sort';
            }
            item.className = cls;
            item.draggable = !confirmed;
            item.dataset.pos = pos;
            item.innerHTML = '<span class="sort-handle">⠿</span><span class="sort-num">' + (pos+1) + '</span>' + items[optIdx];

            if (!confirmed) {
                item.addEventListener('dragstart', function() { dragSrc = pos; setTimeout(function(){item.style.opacity='0.4';},0); });
                item.addEventListener('dragend', function() { item.style.opacity='1'; dragSrc=null; refreshSortNums(); });
                item.addEventListener('dragover', function(e) {
                    e.preventDefault(); item.classList.add('drag-over-sort');
                    if (dragSrc !== null && dragSrc !== pos) {
                        var tmp = state[dragSrc]; state[dragSrc]=state[pos]; state[pos]=tmp;
                        dragSrc=pos; sortState[cur]=state; renderQ();
                    }
                });
                item.addEventListener('dragleave', function() { item.classList.remove('drag-over-sort'); });
            }
            sortList.appendChild(item);
        });
        area.appendChild(sortList);
    }

    function refreshSortNums() {
        document.querySelectorAll('.sort-item').forEach(function(el, i) {
            var numEl = el.querySelector('.sort-num'); if(numEl) numEl.textContent = i+1;
        });
    }

    // ===== TIMER =====
    function go(d) { cur = Math.max(0, Math.min(qCount-1, cur + d)); renderQ(); }

    function startTimer(m) {
        var sec = m * 60;
        var t = setInterval(function() {
            if (isDone) { clearInterval(t); return; }
            sec--;
            var mins = Math.floor(sec / 60), s = sec % 60;
            document.getElementById('clock').textContent = (mins<10?'0':'')+mins+':'+(s<10?'0':'')+s;
            if (sec <= 0) { clearInterval(t); alert("Hết thời gian làm bài!"); submitExamNow(); }
        }, 1000);
    }

    function goToFlashcard() {
        var ct = '${courseType}';
        var url = ct === 'IC3 GS6 LEVEL 1' ? '/flashcard-ic3'
                : ct === 'IC3 GS6 LEVEL 2' ? '/flashcard-ic3'
                : ct === 'IC3 GS6 LEVEL 3' ? '/flashcard-ic3'
                : ct === 'AI PRODUCTIVITY' ? '/flashcard-aip'
                : '/flashcard-ai';
        window.location.href = url;
    }

    // ===== PHÂN TÍCH TỪNG PHẦN (như báo cáo điểm thi thật) =====
    function renderResultBreakdown(categoryResults) {
        var wrap = document.getElementById('resBreakdownWrap');
        var tableEl = document.getElementById('resBreakdownTable');
        if (!topicDomains || !topicDomains.length) { wrap.style.display = 'none'; return; }

        // Đề thi IC3 thật luôn hiện đủ 7 chuyên đề ở mọi Level. Ngân hàng câu hỏi hiện tại
        // của hệ thống chưa phủ đều cả 7 domain ở từng Level (vd Level 1 mới chỉ có câu hỏi
        // cho domain 1, 2, 7) — đây là khoảng trống NỘI DUNG cần bổ sung câu hỏi, không phải
        // lỗi hiển thị. Trong lúc chờ bổ sung, domain nào chưa có câu hỏi sẽ hiện rõ "Chưa đủ
        // dữ liệu đánh giá" (màu trung tính) — KHÔNG hiện 0% (màu đỏ), để tránh đánh lừa học
        // viên rằng họ làm sai trong khi domain đó chưa từng được hỏi.
        var rows = topicDomains.map(function(domain) {
            var correct = 0, total = 0;
            domain.cats.forEach(function(c) {
                if (categoryResults[c]) { correct += categoryResults[c].correct; total += categoryResults[c].total; }
            });
            return { title: domain.title, correct: correct, total: total, pct: total > 0 ? Math.round((correct/total)*100) : null };
        });

        tableEl.innerHTML = rows.map(function(r) {
            if (r.pct === null) {
                return '<div class="breakdown-row">' +
                    '<div class="breakdown-label">' + r.title + '</div>' +
                    '<div class="breakdown-bar-wrap"></div>' +
                    '<div class="breakdown-pct" style="color:var(--muted); flex-basis:120px; font-size:0.7rem; font-weight:600;">Chưa đủ dữ liệu</div>' +
                    '</div>';
            }
            var color = r.pct >= 80 ? '#22c55e' : (r.pct >= 60 ? '#f59e0b' : '#ef4444');
            return '<div class="breakdown-row">' +
                '<div class="breakdown-label">' + r.title + '</div>' +
                '<div class="breakdown-bar-wrap"><div class="breakdown-bar-fill" style="width:' + r.pct + '%; background:' + color + ';"></div></div>' +
                '<div class="breakdown-pct" style="color:' + color + ';">' + r.pct + '%</div>' +
                '</div>';
        }).join('');
        wrap.style.display = 'block';
    }

    // ===== SUBMIT =====
    function submitExamNow() {
        if (isDone) return;
        if (mode === 'exam' && isVerified) {
            var answeredCount = 0;
            for(var i=0;i<qCount;i++){if(isAnswered(i))answeredCount++;}
            if (!confirm("Bạn đã trả lời " + answeredCount + "/" + qCount + " câu. Xác nhận nộp bài?")) return;
        }
        isDone = true;
        var rights = 0;
        var wrongOriginalTexts = [];
        var categoryResults = {};
        for (var i = 0; i < qCount; i++) {
            var q = list[i];
            var correct = isCorrectAnswer(i);
            if (correct) { rights++; } else { wrongOriginalTexts.push({ id: q.id, q: q.q.replace(/^\[Câu \d+\] /, '') }); }
            // Category tracking
            var cat = q.cat || 'OTHER';
            if (!categoryResults[cat]) categoryResults[cat] = { correct: 0, total: 0 };
            categoryResults[cat].total++;
            if (correct) categoryResults[cat].correct++;
        }
        // Lưu câu sai để cross-mode (exam → practice)
        if (mode === 'exam' && wrongOriginalTexts.length > 0) {
            localStorage.setItem('mos360_exam_wrong_${courseType}', JSON.stringify(wrongOriginalTexts));
        }
        var score = Math.round((rights / qCount) * 1000);

        // Lưu tiến độ cá nhân
        if (window.saveProgressSession) {
            window.saveProgressSession('${courseType}', mode, rights, qCount, score, categoryResults);
        } else {
            // Inline save nếu không có trang progress
            var pkey = 'mos360_progress_' + '${courseType}'.replace(/\\s+/g,'_');
            var praw = localStorage.getItem(pkey);
            var pdata = praw ? JSON.parse(praw) : { sessions: [], categoryStats: {} };
            var now = new Date();
            pdata.sessions.push({ date: now.toLocaleDateString('vi-VN'), mode: mode, correct: rights, total: qCount, score: score });
            Object.keys(categoryResults).forEach(function(cat) {
                if (!pdata.categoryStats[cat]) pdata.categoryStats[cat] = { correct: 0, total: 0 };
                pdata.categoryStats[cat].correct += categoryResults[cat].correct;
                pdata.categoryStats[cat].total += categoryResults[cat].total;
            });
            localStorage.setItem(pkey, JSON.stringify(pdata));
        }

        document.getElementById('resScore').textContent = score + "/${EXAM_CONFIG.MAX_SCORE} điểm";
        var btnRetry = document.getElementById('btnRetryWrong');
        if (btnRetry) btnRetry.style.display = (mode !== 'exam' && rights < qCount) ? 'inline-block' : 'none';

        renderResultBreakdown(categoryResults);

        if (score >= ${EXAM_CONFIG.PASS_SCORE}) {
            document.getElementById('resScore').style.color = "#22c55e";
            document.getElementById('resText').innerHTML = "🎉 XUẤT SẮC ĐẠT CHUẨN! Bạn trả lời đúng " + rights + "/" + qCount + " câu, đạt " + score + "/${EXAM_CONFIG.MAX_SCORE} điểm.";
        } else {
            document.getElementById('resScore').style.color = "#FF5722";
            var hint = mode !== 'exam' ? " Hãy ôn lại các câu sai!" : " Vào Ôn luyện để ôn câu sai!";
            document.getElementById('resText').innerHTML = "⚠️ CHƯA ĐẠT CHUẨN. Bạn đạt " + score + "/${EXAM_CONFIG.MAX_SCORE} điểm, cần đạt ${EXAM_CONFIG.PASS_SCORE} điểm." + hint;
        }
        document.getElementById('resBox').style.display = "flex";
    }

    // ===== CATEGORY TRANSLATIONS (inline) =====
    var CAT_TRANS = ${JSON.stringify(CATEGORY_TRANSLATIONS)};
    function catLabel(key) { return CAT_TRANS[key] || key; }

    // ===== STRATIFIED SAMPLING =====
    // Lấy n câu từ bank theo tỉ lệ mỗi category, mỗi cat tối thiểu minPerCat câu
    function stratifiedSample(bank, n, minPerCat) {
        minPerCat = minPerCat || 2;
        // Nhóm theo category
        var groups = {};
        bank.forEach(function(q) {
            var c = q.cat || 'OTHER';
            if (!groups[c]) groups[c] = [];
            groups[c].push(q);
        });
        var cats = Object.keys(groups);
        var total = bank.length;
        var result = [];

        // Bước 1: đảm bảo mỗi cat ít nhất minPerCat câu
        var allocated = {};
        var remaining = n;
        cats.forEach(function(c) {
            var min = Math.min(minPerCat, groups[c].length);
            allocated[c] = min;
            remaining -= min;
        });

        // Bước 2: phân bổ phần còn lại theo tỉ lệ
        if (remaining > 0) {
            var weights = {};
            var totalW = 0;
            cats.forEach(function(c) {
                weights[c] = groups[c].length / total;
                totalW += weights[c];
            });
            cats.forEach(function(c) {
                var extra = Math.round((weights[c] / totalW) * remaining);
                var cap = groups[c].length - allocated[c];
                allocated[c] += Math.min(extra, cap);
            });
        }

        // Bước 3: lấy ngẫu nhiên từ mỗi group
        cats.forEach(function(c) {
            var shuffled = shuffleArray(groups[c].slice());
            result = result.concat(shuffled.slice(0, allocated[c]));
        });

        // Điều chỉnh tổng về đúng n
        result = shuffleArray(result);
        if (result.length > n) result = result.slice(0, n);
        return result;
    }

    // ===== SHOW/HIDE OVERLAY HELPERS =====
    function showModeSelect() {
        setSidebar(false);
        document.getElementById('modeSelectBox').style.display = 'flex';
        document.getElementById('topicSelectBox').style.display = 'none';
        document.getElementById('fcTopicSelectBox').style.display = 'none';
    }

    function showTopicSelect(forFlashcard) {
        setSidebar(false);
        var boxId = forFlashcard ? 'fcTopicSelectBox' : 'topicSelectBox';
        var listId = forFlashcard ? 'fcTopicList' : 'topicList';
        document.getElementById('modeSelectBox').style.display = 'none';
        document.getElementById(boxId).style.display = 'flex';

        // Đếm số câu hỏi có sẵn cho từng chuyên đề (domain), dựa trên category thật trong fullBank
        var listEl = document.getElementById(listId);
        listEl.innerHTML = '';
        topicDomains.forEach(function(domain, dIdx) {
            var count = fullBank.filter(function(q) { return domain.cats.indexOf(q.cat) >= 0; }).length;
            if (count === 0) return; // chuyên đề chưa có câu hỏi trong ngân hàng — không hiện để tránh chọn vào rồi trống
            var btn = document.createElement('button');
            btn.className = 'mode-btn';
            btn.style.textAlign = 'left';
            btn.innerHTML = domain.title +
                '<span class="lock-badge" style="color:var(--muted);">' + count + ' câu</span>';
            btn.onclick = function() {
                if (forFlashcard) {
                    var ct = '${courseType}';
                    var base = ct.indexOf('AI PRODUCTIVITY') >= 0 ? '/flashcard-aip'
                             : ct.indexOf('GENERATIVE AI') >= 0 ? '/flashcard-ai' : '/flashcard-ic3';
                    window.location.href = base + '?cats=' + encodeURIComponent(domain.cats.join(',')) + '&label=' + encodeURIComponent(domain.title);
                } else {
                    launchTopicMode(dIdx);
                }
            };
            listEl.appendChild(btn);
        });
    }

    function launchFlashcard(type) {
        if (type === 'topic') {
            showTopicSelect(true);
        } else {
            var ct = '${courseType}';
            var url = ct.indexOf('AI PRODUCTIVITY') >= 0 ? '/flashcard-aip'
                    : ct.indexOf('GENERATIVE AI') >= 0 ? '/flashcard-ai' : '/flashcard-ic3';
            window.location.href = url;
        }
    }

    function launchTopicMode(domainIdx) {
        document.getElementById('topicSelectBox').style.display = 'none';
        var domain = topicDomains[domainIdx];
        if (!domain) return;
        selectedCategory = domain.cats;
        selectedCategoryLabel = domain.title;
        mode = 'topic';
        document.getElementById('btnSubmit').style.display = 'none';
        document.getElementById('examExtraBtns').style.display = 'none';
        // Lọc theo các category thuộc chuyên đề, lấy 15 câu ngẫu nhiên
        var filtered = fullBank.filter(function(q) { return selectedCategory.indexOf(q.cat) >= 0; });
        var selected = shuffleArray(filtered.slice()).slice(0, 15);
        buildList(selected);
        initQuiz();
    }

    function restartQuiz() {
        isRetryMode = false;
        document.getElementById('retryBanner').classList.remove('visible');
        document.getElementById('resBox').style.display = "none";
        document.getElementById('btnConfirmWrap').classList.remove('visible');
        isDone = false;
        navPage = 0;
        var selected;
        if (mode === 'topic' && selectedCategory) {
            var filtered = fullBank.filter(function(q) { return selectedCategory.indexOf(q.cat) >= 0; });
            selected = shuffleArray(filtered.slice()).slice(0, 15);
        } else if (mode === 'practice') {
            // Ôn hỗn hợp: stratified 15 câu
            selected = stratifiedSample(fullBank, 15, 1);
        } else {
            // Thi thử: stratified 45 câu, mỗi cat min 2
            selected = stratifiedSample(fullBank, ${EXAM_CONFIG.QUESTION_COUNT}, 2);
        }
        buildList(selected);
        initQuiz();
    }

    window.addEventListener('DOMContentLoaded', function() {
        selectedLevel = 'ALL';
        selectedCategory = null;
        selectedCategoryLabel = '';
        verifyModeMenu();
        checkExpireBanner();
        silentRevalidate(); // tự xác thực lại trong nền sau deploy / xoá cache
    });
    </script>
    </body></html>`;
    }
};