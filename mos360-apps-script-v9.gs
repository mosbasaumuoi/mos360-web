/**
 * MOS360 Apps Script v9
 * Nhận dữ liệu POST từ web form → ghi vào Google Sheet
 * Deploy: Web App → Anyone → Execute as Me
 *
 * ── THAY ĐỔI Ở v9 ───────────────────────────────────────────
 * Thêm GET ?action=vipCheck — đọc tab "DSVIP" (Họ và tên, SĐT (Zalo),
 * Ghi chú), dùng để trang Thư viện video (Cloudflare Worker) xác thực
 * đăng nhập học viên.
 *   TRƯỚC: Worker tự xác thực bằng cách quét danh mục học viên ĐÃ ĐƯỢC
 *          CẤP MẬT KHẨU PHẦN MỀM MOS (KV pwd_index:*) — không đúng đối
 *          tượng, vì học viên có mật khẩu MOS chưa chắc là học viên VIP
 *          được xem thư viện video.
 *   NAY:   Worker gọi sang endpoint này, đối chiếu trực tiếp với danh
 *          sách DSVIP (do trung tâm tự quản lý trong tab DSVIP) — khớp
 *          CẢ Họ và tên VÀ SĐT mới coi là hợp lệ, giống hệt cách xác
 *          thực cũ (chỉ đổi nguồn danh sách đối chiếu).
 *   Ô B1 "Đợt thi"/"Đợt 6/2026" ở đầu tab DSVIP CHỈ là ghi chú/đợt hiện
 *   tại — KHÔNG dùng để lọc, toàn bộ người có tên trong danh sách DSVIP
 *   đều được cấp quyền, không phân biệt theo đợt.
 *   Endpoint CHỈ trả về true/false (đã khớp hay chưa) + Họ và tên khớp
 *   được — KHÔNG bao giờ trả nguyên danh sách DSVIP ra ngoài, tránh lộ
 *   dữ liệu học viên.
 * ============================================================
 *
 * ── THAY ĐỔI Ở v8 (giữ nguyên) ──────────────────────────────
 * Thêm GET ?action=lophoc — đọc tab "LOP HOC" (bảng countifs có sẵn),
 * trả về CẢNH BÁO ca sắp đầy/đã đầy trong 7 ngày tới cho form "Đăng ký
 * học Offline". KHÔNG trả số lượng thô (hiện số ít dễ gây hiểu nhầm
 * trung tâm vắng khách) — chỉ trả list các ca cần lưu ý.
 * ============================================================
 *
 * ── THAY ĐỔI Ở v7 (giữ nguyên) ──────────────────────────────
 * 1. Thêm 2 cột mới vào DKTHI: "Phiên bản" (2019/365, học viên tự chọn
 *    lúc đăng ký) và "Lưu ý thi" (trung tâm tự điền tay, giống Phòng
 *    thi/Ca thi — hiện luôn cho học viên xem khi tra cứu).
 * 2. handleDKThi(): chuyển từ ghi theo VỊ TRÍ CỘT CỐ ĐỊNH (appendRow
 *    dạng mảng) sang ghi theo TÊN CỘT — an toàn dù cột mới bị
 *    ensureColumnsExist() nối vào cuối sheet cũ thay vì đúng vị trí như
 *    sheet mới tạo (tránh lệch dữ liệu sang nhầm cột khi sheet cũ và
 *    sheet mới có thứ tự cột khác nhau).
 * 3. handleLookup(): trả về thêm Ngày sinh (gộp dd/MM/yyyy), Giới tính,
 *    Địa chỉ, Phiên bản, Ngôn ngữ đề, Đã từng thi MOS chưa, Lưu ý thi.
 * ============================================================
 *
 * ── THAY ĐỔI Ở v6 (giữ nguyên) ──────────────────────────────
 * 1. BỎ hẳn sheet TRACUU và hàm syncThiToTracuu() — không cần bước đồng
 *    bộ thủ công trước mỗi đợt thi nữa. Học viên tra cứu trực tiếp trên
 *    DKTHI (đã được xử lý sạch, không trùng).
 * 2. DKTHI có thêm 3 cột: "Phòng thi", "Ca thi", "Trạng thái" — do trung
 *    tâm tự điền tay (giống thiết kế cũ của TRACUU, giờ gộp vào DKTHI).
 * 3. Cột "Ngày thi" KHÔNG còn tự động điền theo cấu hình đợt (LICH_THI)
 *    lúc đăng ký nữa — để TRỐNG, do trung tâm tự điền ngày cụ thể (vì 1
 *    đợt thi thường có 2 ngày, học viên không tự chọn được ngày nào cả).
 *    Cột này được định dạng Ngày (Date) để hiển thị tra cứu luôn ra đúng
 *    dd/MM/yyyy, không phụ thuộc cách trung tâm gõ tay.
 * 4. Đăng ký thi trùng SĐT + Đợt thi (ví dụ đăng ký thêm môn sau) → GỘP
 *    vào dòng cũ (giữ nguyên môn đã đăng ký trước, cộng thêm môn mới),
 *    KHÔNG tạo dòng mới, KHÔNG đụng vào Phòng thi/Ca thi/Ngày thi/Trạng
 *    thái (vì đó là phần trung tâm tự điền, tránh bị ghi đè mất).
 * ============================================================
 */

var SHEET_HV      = "DKHOC";
var SHEET_THI     = "DKTHI";
var SHEET_OFF     = "DKOFFLINE";
var SHEET_VIP     = "DSVIP"; // v9 — danh sách học viên được cấp quyền xem Thư viện video

// ── CẤU HÌNH LỆ PHÍ ────────────────────────────────────────
var LE_PHI = {
  "Hải Phòng": 950000,
  "Hà Nội":    960000,
  "Hồ Chí Minh": 960000
};

// ── CẤU HÌNH ĐỊA ĐIỂM THI ──────────────────────────────────
var DIA_DIEM = {
  "Hải Phòng": [
    "CITAD - Trường ĐH Hàng Hải VN (484 Lạch Tray, Lê Chân, Hải Phòng)"
  ],
  "Hà Nội": [
    "VP Giang Văn Minh (75 Giang Văn Minh, Ngọc Hà, Hà Nội)",
    "VP Trung Yên (Tầng 3, Trung Yên Plaza, 1 Trung Hòa, Yên Hòa, Hà Nội)",
    "VP Quan Hoa (217 Quan Hoa, Nghĩa Đô, Hà Nội)"
  ],
  "Hồ Chí Minh": [
    "VP IIG HCM (Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, Bình Trưng, TP.HCM)"
  ]
};

// ── LỊCH THI IIG 2026 (cập nhật từ online.iigvietnam.com) ──
// Chỉ dùng để hiển thị khoảng ngày tham khảo + hạn đăng ký lúc chọn đợt,
// KHÔNG dùng để tự điền "Ngày thi" cụ thể vào Sheet nữa (xem thay đổi #3).
var LICH_THI = {
  "Hải Phòng": [
    { dot: "Đợt 1/2026", ngayThi: "Cập nhật theo CITAD", hanDangKy: "", trangThai: "Chưa mở" }
  ],
  "Hà Nội": [
    { dot: "Đợt 4/2026", ngayThi: "19/05/2026", hanDangKy: "21/04/2026", trangThai: "Đã đóng" },
    { dot: "Đợt 5/2026", ngayThi: "23/06/2026", hanDangKy: "26/05/2026", trangThai: "Đã đóng" },
    { dot: "Đợt 6/2026", ngayThi: "21/07/2026", hanDangKy: "23/06/2026", trangThai: "Sắp mở" },
    { dot: "Đợt 7/2026", ngayThi: "18/08/2026", hanDangKy: "21/07/2026", trangThai: "Sắp mở" },
    { dot: "Đợt 8/2026", ngayThi: "22/09/2026", hanDangKy: "25/08/2026", trangThai: "Sắp mở" }
  ],
  "Hồ Chí Minh": [
    { dot: "Đợt 4/2026", ngayThi: "21/05/2026", hanDangKy: "21/04/2026", trangThai: "Đã đóng" },
    { dot: "Đợt 5/2026", ngayThi: "25/06/2026", hanDangKy: "26/05/2026", trangThai: "Đã đóng" },
    { dot: "Đợt 6/2026", ngayThi: "23/07/2026", hanDangKy: "23/06/2026", trangThai: "Sắp mở" },
    { dot: "Đợt 7/2026", ngayThi: "20/08/2026", hanDangKy: "21/07/2026", trangThai: "Sắp mở" },
    { dot: "Đợt 8/2026", ngayThi: "24/09/2026", hanDangKy: "25/08/2026", trangThai: "Sắp mở" }
  ]
};

// ── SETUP ──────────────────────────────────────────────────
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tabs = [
    { name: SHEET_HV, headers: [
      "Thời gian","Họ và tên","Ngày/tháng/năm sinh","SĐT (Zalo)","Link Facebook",
      "Trường","Năm học","Khoa / Lớp","Khóa học","Biết đến MOS360 qua","Mã giảm giá",
      "Người giới thiệu / Trưởng nhóm","Ghi chú"
    ]},
    { name: SHEET_THI, headers: [
      "Thời gian","Họ và tên","Mã SV","Ngày sinh","Tháng sinh","Năm sinh",
      "Giới tính","CCCD","Địa chỉ (VNeID)","SĐT","Thành phố thi","Địa điểm thi",
      "Đợt thi","Ngày thi","Hạn đăng ký","Lệ phí (VNĐ/môn)","Phiên bản",
      "Đăng ký Word","Đăng ký Excel","Đăng ký PPT","Ngôn ngữ đề","Đã thi MOS chưa","Ghi chú",
      "Phòng thi","Ca thi","Trạng thái","Lưu ý thi"
    ]},
    { name: SHEET_OFF, headers: [
      "Thời gian","Họ và tên","SĐT (Zalo)","Ngày học",
      "Ca 8-9h","Ca 9-10h","Ca 10-11h","Ca 14-15h","Ca 15-16h","Ca 16-17h","Ghi chú"
    ]},
  ];
  tabs.forEach(function(tab) {
    var sheet = ss.getSheetByName(tab.name);
    if (!sheet) sheet = ss.insertSheet(tab.name);
    if (sheet.getLastRow() === 0) {
      var r = sheet.getRange(1, 1, 1, tab.headers.length);
      r.setValues([tab.headers]);
      r.setBackground("#1a1a2e").setFontColor("#ffffff").setFontWeight("bold");
      sheet.setFrozenRows(1);
    } else {
      // Sheet đã có sẵn dữ liệu từ trước — bổ sung cột mới nếu chưa có,
      // KHÔNG đụng gì tới dữ liệu cũ đang có.
      if (tab.name === SHEET_THI) ensureColumnsExist(sheet, ["Phòng thi", "Ca thi", "Trạng thái", "Phiên bản", "Lưu ý thi"]);
      if (tab.name === SHEET_HV) ensureColumnsExist(sheet, ["Người giới thiệu / Trưởng nhóm"]);
    }
  });
  fixPhoneCCCDFormat();
  setNgayThiDateFormat();
  SpreadsheetApp.getUi().alert("✅ Đã tạo/cập nhật sheet! (đã ép định dạng SĐT/CCCD/Ngày thi)");
}

// Thêm cột mới vào cuối sheet nếu tên cột chưa tồn tại — dùng khi nâng
// cấp sheet cũ (v3/v4) lên cấu trúc mới mà không cần tạo lại từ đầu.
function ensureColumnsExist(sheet, columnNames) {
  var lastCol = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  columnNames.forEach(function(name) {
    if (headers.indexOf(name) === -1) {
      lastCol++;
      sheet.getRange(1, lastCol).setValue(name)
        .setBackground("#1a1a2e").setFontColor("#ffffff").setFontWeight("bold");
      headers.push(name);
    }
  });
}

// ── FIX ĐỊNH DẠNG SĐT/CCCD (chống mất số 0 đầu) ────────────
function fixPhoneCCCDFormat() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var MAX_ROWS = 5000;

  var targets = [
    { sheet: SHEET_HV,  cols: [4] },      // SĐT (Zalo)
    { sheet: SHEET_THI, cols: [8, 10] },  // CCCD, SĐT
    { sheet: SHEET_OFF, cols: [3] }       // SĐT (Zalo)
  ];

  targets.forEach(function(t) {
    var sheet = ss.getSheetByName(t.sheet);
    if (!sheet) return;
    t.cols.forEach(function(col) {
      sheet.getRange(2, col, MAX_ROWS, 1).setNumberFormat("@");
    });
  });
}

// ── FIX ĐỊNH DẠNG NGÀY THI (hiển thị dd/MM/yyyy khi tra cứu) ─
// Ép cột "Ngày thi" thành định dạng Ngày thực sự (không phải text tự do)
// — giúp trung tâm gõ vào bằng date-picker của Sheets, và tra cứu web
// luôn hiện đúng dd/MM/yyyy bất kể trung tâm gõ kiểu gì lúc nhập.
function setNgayThiDateFormat() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_THI);
  if (!sheet) return;
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var col = headers.indexOf("Ngày thi");
  if (col === -1) return;
  sheet.getRange(2, col + 1, 5000, 1).setNumberFormat("dd/MM/yyyy");
}

// ── KHÔI PHỤC SỐ 0 ĐẦU CHO DỮ LIỆU CŨ (chạy tay 1 lần) ──────
function restoreLeadingZeros() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var targets = [
    { sheet: SHEET_HV,  cols: [4] },
    { sheet: SHEET_THI, cols: [8, 10] },
    { sheet: SHEET_OFF, cols: [3] }
  ];
  fixPhoneCCCDFormat();

  var totalFixed = 0;
  targets.forEach(function(t) {
    var sheet = ss.getSheetByName(t.sheet);
    if (!sheet) return;
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    t.cols.forEach(function(col) {
      var range = sheet.getRange(2, col, lastRow - 1, 1);
      var values = range.getValues();
      var changed = false;
      for (var i = 0; i < values.length; i++) {
        var v = values[i][0];
        if (v === "" || v === null) continue;
        var s = String(v).trim();
        if (/^\d{9}$/.test(s) || /^\d{11}$/.test(s)) {
          values[i][0] = "0" + s;
          changed = true;
          totalFixed++;
        }
      }
      if (changed) range.setValues(values);
    });
  });

  SpreadsheetApp.getUi().alert("✅ Đã khôi phục số 0 đầu cho " + totalFixed + " ô dữ liệu cũ.");
}

// ── WEB APP ENTRY POINT ────────────────────────────────────
function doGet(e) {
  var action = (e.parameter.action || "lookup");
  if (action === "lookup")      return handleLookup(e);
  if (action === "lichThi")     return handleLichThi(e);
  if (action === "diaDiem")     return handleDiaDiem(e);
  if (action === "lophoc")      return handleLopHocStatus(e);
  if (action === "vipCheck")    return handleVipCheck(e);
  return jsonResp({ ok: false, msg: "Action không hợp lệ" });
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action || "";
    if (action === "dkhoc")     return handleDKHoc(body);
    if (action === "dkthi")     return handleDKThi(body);
    if (action === "dkoffline") return handleDKOffline(body);
    if (action === "xacNhan")   return handleXacNhanPost(body);
    return jsonResp({ ok: false, msg: "Action không hợp lệ" });
  } catch(err) {
    return jsonResp({ ok: false, msg: "Lỗi server: " + err.message });
  }
}

// ── API: LẤY LỊCH THI (khoảng ngày tham khảo cho form đăng ký) ──
function handleLichThi(e) {
  var tp = (e.parameter.thanhPho || "").trim();
  if (tp && LICH_THI[tp]) {
    return jsonResp({ ok: true, data: LICH_THI[tp], lePhi: LE_PHI[tp] });
  }
  return jsonResp({ ok: true, data: LICH_THI, lePhi: LE_PHI });
}

// ── API: LẤY ĐỊA ĐIỂM THI ─────────────────────────────────
function handleDiaDiem(e) {
  var tp = (e.parameter.thanhPho || "").trim();
  if (tp && DIA_DIEM[tp]) {
    return jsonResp({ ok: true, data: DIA_DIEM[tp] });
  }
  return jsonResp({ ok: true, data: DIA_DIEM });
}

// ── API: TÌNH TRẠNG CA HỌC OFFLINE (7 NGÀY TỚI) ────────────
// Đọc tab "LOP HOC" (bảng countifs đếm số đăng ký theo ca đã có sẵn).
// CHỈ trả về CẢNH BÁO khi ca sắp đầy/đã đầy — KHÔNG trả số thô, vì số
// lượng thực tế mỗi ca hiện còn thấp (~3-4 học viên), hiện ra công khai
// dễ gây hiểu nhầm trung tâm vắng khách thay vì tạo hiệu ứng khan hiếm.
var LOPHOC_MAX_CAP = 16;
var LOPHOC_NEAR_THRESHOLD = 11; // >= 11/16 coi là "sắp đầy"
var LOPHOC_CA_COLS = ["Ca 8-9h", "Ca 9-10h", "Ca 10-11h", "Ca 14-15h", "Ca 15-16h", "Ca 16-17h"];

function handleLopHocStatus(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("LOP HOC");
    if (!sheet) return jsonResp({ ok: true, warnings: [], closedDays: [] });

    var data = sheet.getDataRange().getValues();

    // Tìm dòng tiêu đề (chứa ô "Ngày") — không hardcode số dòng cố định,
    // để không vỡ nếu bạn chèn/xóa dòng tiêu đề mô tả phía trên sau này.
    var headerRow = -1, headers = [];
    for (var i = 0; i < Math.min(data.length, 15); i++) {
      if (data[i].some(function (c) { return String(c).trim() === "Ngày"; })) {
        headerRow = i; headers = data[i]; break;
      }
    }
    if (headerRow === -1) return jsonResp({ ok: true, warnings: [], closedDays: [] });

    var col = {};
    headers.forEach(function (h, i) { col[String(h).trim()] = i; });

    var now = new Date();
    var vnNow = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    var warnings = [];
    var closedDays = [];

    for (var d = 0; d < 7; d++) {
      var target = new Date(vnNow.getTime() + d * 24 * 60 * 60 * 1000);
      var targetStr = Utilities.formatDate(target, "Asia/Ho_Chi_Minh", "dd/MM/yyyy");

      var found = null;
      for (var r = headerRow + 1; r < data.length; r++) {
        var cellVal = col["Ngày"] !== undefined ? data[r][col["Ngày"]] : null;
        var cellStr = Object.prototype.toString.call(cellVal) === "[object Date]"
          ? Utilities.formatDate(cellVal, "Asia/Ho_Chi_Minh", "dd/MM/yyyy")
          : String(cellVal || "").trim();
        if (cellStr === targetStr) { found = data[r]; break; }
      }
      if (!found) continue;

      var ghiChu = col["Ghi chú"] !== undefined ? String(found[col["Ghi chú"]] || "").trim() : "";
      if (/nghỉ/i.test(ghiChu)) {
        closedDays.push({ date: targetStr, note: ghiChu });
        continue;
      }

      LOPHOC_CA_COLS.forEach(function (caName) {
        if (col[caName] === undefined) return;
        var count = Number(found[col[caName]]) || 0;
        if (count >= LOPHOC_MAX_CAP) {
          warnings.push({ date: targetStr, ca: caName, level: "full" });
        } else if (count >= LOPHOC_NEAR_THRESHOLD) {
          warnings.push({ date: targetStr, ca: caName, level: "near" });
        }
      });
    }

    return jsonResp({ ok: true, warnings: warnings, closedDays: closedDays });
  } catch (e2) {
    return jsonResp({ ok: true, warnings: [], closedDays: [] }); // im lặng bỏ qua nếu lỗi, không chặn form đăng ký
  }
}

// ── API: KIỂM TRA QUYỀN THƯ VIỆN VIDEO (v9) ────────────────
// GET ?action=vipCheck&phone=xxx&name=xxx
// Đọc trực tiếp tab "DSVIP" (Họ và tên | SĐT (Zalo) | Ghi chú), khớp CẢ
// Họ và tên VÀ SĐT mới coi là hợp lệ — dùng để Worker (trang Thư viện
// video) xác thực đăng nhập học viên, thay cho cách cũ (đối chiếu với
// danh mục học viên đã được cấp mật khẩu phần mềm MOS).
// Ô B1 (vd "Đợt 6/2026") chỉ là ghi chú đợt hiện tại — KHÔNG dùng để lọc,
// toàn bộ người có tên trong DSVIP đều được cấp quyền.
// CHỈ trả về true/false + Họ và tên khớp được — KHÔNG bao giờ trả cả
// danh sách DSVIP ra ngoài, tránh lộ dữ liệu học viên qua endpoint công khai.
function handleVipCheck(e) {
  try {
    var phone = normalizePhone((e.parameter.phone || "").trim());
    var name  = (e.parameter.name || "").trim();
    if (!phone) return jsonResp({ ok: false, matched: false, msg: "Thiếu số điện thoại" });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_VIP);
    if (!sheet) return jsonResp({ ok: true, matched: false });

    var data = sheet.getDataRange().getValues();

    // Tìm dòng tiêu đề (chứa "SĐT (Zalo)" hoặc "SĐT") — không hardcode
    // số dòng cố định, vì dòng 1 hiện là ô "Đợt thi" (nhãn/dropdown ghi
    // chú đợt hiện tại), không phải dòng tiêu đề bảng.
    var headerRow = -1, headers = [];
    for (var i = 0; i < Math.min(data.length, 10); i++) {
      if (data[i].some(function (c) {
        var s = String(c).trim();
        return s === "SĐT (Zalo)" || s === "SĐT";
      })) {
        headerRow = i; headers = data[i]; break;
      }
    }
    if (headerRow === -1) return jsonResp({ ok: true, matched: false });

    var col = {};
    headers.forEach(function (h, i) { col[String(h).trim()] = i; });
    var colTen = col["Họ và tên"];
    var colSdt = col["SĐT (Zalo)"] !== undefined ? col["SĐT (Zalo)"] : col["SĐT"];
    if (colSdt === undefined) return jsonResp({ ok: true, matched: false });

    var normNameInput = normalizeVN(name);

    for (var r = headerRow + 1; r < data.length; r++) {
      var rowSdt = normalizePhone(String(data[r][colSdt] || "").trim());
      if (!rowSdt || rowSdt !== phone) continue;

      var rowTen = colTen !== undefined ? String(data[r][colTen] || "").trim() : "";
      // Yêu cầu khớp cả tên (không phân biệt hoa/thường, khoảng trắng thừa)
      if (normalizeVN(rowTen) !== normNameInput) continue;

      return jsonResp({ ok: true, matched: true, hoTen: rowTen });
    }
    return jsonResp({ ok: true, matched: false });
  } catch (err) {
    return jsonResp({ ok: false, matched: false, msg: "Lỗi server: " + err.message });
  }
}

function normalizeVN(s) {
  return String(s || "").trim().replace(/\s+/g, " ").toLowerCase();
}

// ── ĐĂNG KÝ HỌC ───────────────────────────────────────────
function handleDKHoc(d) {
  var required = ["ten", "sdt"];
  for (var i = 0; i < required.length; i++) {
    if (!d[required[i]]) return jsonResp({ ok: false, msg: "Thiếu trường bắt buộc: " + required[i] });
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_HV);
  var now = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
  sheet.appendRow([
    now, d.ten||"", d.ngaysinh||"", normalizePhoneForSheet(d.sdt), d.facebook||"",
    d.truong||"", d.namhoc||"", d.khoa||"", d.khoahoc||"",
    d.kenh||"", d.magiamgia||"", d.gioithieu||"", d.ghichu||""
  ]);
  return jsonResp({ ok: true, msg: "Đăng ký thành công! MOS360 sẽ liên hệ Zalo/Face trong vòng 1 giờ." });
}

// ── ĐĂNG KÝ THI (gộp nếu trùng SĐT + Đợt thi) ──────────────
function handleDKThi(d) {
  var required = ["ten", "sdt", "cccd", "thanhPho", "diaDiem", "dotThi"];
  for (var i = 0; i < required.length; i++) {
    if (!d[required[i]]) return jsonResp({ ok: false, msg: "Vui lòng điền đầy đủ thông tin bắt buộc" });
  }

  var lephi = LE_PHI[d.thanhPho] || 950000;
  var monCount = [d.word, d.excel, d.ppt].filter(Boolean).length;
  if (monCount === 0) return jsonResp({ ok: false, msg: "Vui lòng chọn ít nhất 1 môn thi" });
  var tongLePhi = lephi * monCount;

  var lichList = LICH_THI[d.thanhPho] || [];
  var lichThi = lichList.find(function(l){ return l.dot === d.dotThi; }) || {};

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_THI);
  fixPhoneCCCDFormat();
  var now = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var col = {};
  headers.forEach(function(h, i) { col[h] = i; });

  var sdtNorm = normalizePhone(d.sdt);
  var existingRowIdx = -1;
  for (var r = 1; r < data.length; r++) {
    var rowSdt = normalizePhone(String(data[r][col["SĐT"]] || ""));
    var rowDot = String(data[r][col["Đợt thi"]] || "").trim();
    if (rowSdt === sdtNorm && rowDot === d.dotThi) { existingRowIdx = r; break; }
  }

  var feeMsg = tongLePhi.toLocaleString('vi-VN') + " đ (" + monCount + " môn × " + lephi.toLocaleString('vi-VN') + " đ)";

  if (existingRowIdx >= 0) {
    // ĐÃ đăng ký đợt này trước đó → GỘP thêm môn mới, KHÔNG tạo dòng mới,
    // KHÔNG đụng Ngày thi/Phòng thi/Ca thi/Trạng thái/Lưu ý thi (trung tâm
    // tự điền tay các cột này).
    var rowNum = existingRowIdx + 1;
    var wordMerged  = !!data[existingRowIdx][col["Đăng ký Word"]]  || !!d.word;
    var excelMerged = !!data[existingRowIdx][col["Đăng ký Excel"]] || !!d.excel;
    var pptMerged   = !!data[existingRowIdx][col["Đăng ký PPT"]]   || !!d.ppt;

    var fields = {
      "Thời gian": now, "Họ và tên": d.ten||"", "Mã SV": d.masv||"",
      "Ngày sinh": d.ngay||"", "Tháng sinh": d.thang||"", "Năm sinh": d.nam||"",
      "Giới tính": d.gioitinh||"", "CCCD": normalizePhoneForSheet(d.cccd),
      "Địa chỉ (VNeID)": d.diachi||"", "Thành phố thi": d.thanhPho||"",
      "Địa điểm thi": d.diaDiem||"", "Hạn đăng ký": lichThi.hanDangKy||"",
      "Lệ phí (VNĐ/môn)": feeMsg, "Phiên bản": d.phienBan||"",
      "Đăng ký Word": wordMerged ? "W" : "", "Đăng ký Excel": excelMerged ? "E" : "",
      "Đăng ký PPT": pptMerged ? "P" : "", "Ngôn ngữ đề": d.ngonngu||"N",
      "Đã thi MOS chưa": d.datungThi||"N"
    };
    if (d.ghichu) fields["Ghi chú"] = d.ghichu;

    Object.keys(fields).forEach(function(name) {
      if (col[name] !== undefined) sheet.getRange(rowNum, col[name] + 1).setValue(fields[name]);
    });

    return jsonResp({
      ok: true,
      msg: "Đã cập nhật đăng ký thi (gộp thêm môn mới vào lượt đăng ký trước đó). Tổng lệ phí: " + feeMsg + ". Hạn thanh toán: " + (lichThi.hanDangKy || "liên hệ trung tâm") + "."
    });
  }

  // Chưa đăng ký đợt này → tạo dòng mới. Ghi theo TÊN CỘT (không theo vị
  // trí cố định) — an toàn dù sheet cũ có thứ tự cột khác sheet mới do
  // các cột bổ sung (Phiên bản, Lưu ý thi...) được ensureColumnsExist()
  // thêm vào CUỐI sheet cũ thay vì đúng vị trí "lý tưởng" như sheet mới.
  // "Ngày thi" để TRỐNG vì đợt thi thường có 2 ngày, trung tâm sẽ xác
  // nhận ngày cụ thể sau (giống Phòng thi/Ca thi), học viên không tự
  // chọn được.
  var newRow = new Array(headers.length).fill("");
  var newFields = {
    "Thời gian": now, "Họ và tên": d.ten||"", "Mã SV": d.masv||"",
    "Ngày sinh": d.ngay||"", "Tháng sinh": d.thang||"", "Năm sinh": d.nam||"",
    "Giới tính": d.gioitinh||"", "CCCD": normalizePhoneForSheet(d.cccd),
    "Địa chỉ (VNeID)": d.diachi||"", "SĐT": normalizePhoneForSheet(d.sdt),
    "Thành phố thi": d.thanhPho||"", "Địa điểm thi": d.diaDiem||"", "Đợt thi": d.dotThi||"",
    "Ngày thi": "", "Hạn đăng ký": lichThi.hanDangKy||"", "Lệ phí (VNĐ/môn)": feeMsg,
    "Phiên bản": d.phienBan||"",
    "Đăng ký Word": d.word?"W":"", "Đăng ký Excel": d.excel?"E":"", "Đăng ký PPT": d.ppt?"P":"",
    "Ngôn ngữ đề": d.ngonngu||"N", "Đã thi MOS chưa": d.datungThi||"N", "Ghi chú": d.ghichu||"",
    "Phòng thi": "", "Ca thi": "", "Trạng thái": "Chưa xác nhận", "Lưu ý thi": ""
  };
  Object.keys(newFields).forEach(function(name) {
    if (col[name] !== undefined) newRow[col[name]] = newFields[name];
  });
  sheet.appendRow(newRow);

  return jsonResp({
    ok: true,
    msg: "Đăng ký thi thành công! Tổng lệ phí: " + feeMsg + ". Hạn thanh toán: " + (lichThi.hanDangKy || "liên hệ trung tâm") + ". Ngày thi cụ thể, phòng thi, ca thi sẽ được trung tâm xác nhận sau."
  });
}

// ── ĐĂNG KÝ OFFLINE ───────────────────────────────────────
function handleDKOffline(d) {
  var required = ["ten", "sdt"];
  for (var i = 0; i < required.length; i++) {
    if (!d[required[i]]) return jsonResp({ ok: false, msg: "Vui lòng điền Họ tên và SĐT" });
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_OFF);
  var now = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
  sheet.appendRow([
    now, d.ten||"", normalizePhoneForSheet(d.sdt), d.ngay||"",
    d.ca1||"", d.ca2||"", d.ca3||"",
    d.ca4||"", d.ca5||"", d.ca6||"", d.ghichu||""
  ]);
  return jsonResp({ ok: true, msg: "Đăng ký lịch học thành công! Trung tâm sẽ xác nhận qua Zalo." });
}

// ── TRA CỨU DỰ THI (đọc trực tiếp DKTHI, không qua sheet trung gian) ──
function handleLookup(e) {
  var phone = normalizePhone((e.parameter.phone || "").trim());
  var dot   = (e.parameter.dot || "").trim();
  if (!phone) return jsonResp({ ok: false, msg: "Vui lòng nhập số điện thoại" });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_THI);
  if (!sheet) return jsonResp({ ok: false, msg: "Chưa có dữ liệu đăng ký thi" });

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var col = {};
  headers.forEach(function(h, i) { col[h] = i; });

  var results = [];
  for (var r = 1; r < data.length; r++) {
    var rowPhone = normalizePhone(String(data[r][col["SĐT"]] || "").trim());
    if (rowPhone !== phone) continue;

    var rowDot = String(data[r][col["Đợt thi"]] || "").trim();
    if (dot && rowDot && rowDot !== dot && rowDot !== "Đợt " + dot) continue;

    var monList = [];
    if (data[r][col["Đăng ký Word"]])  monList.push("Word");
    if (data[r][col["Đăng ký Excel"]]) monList.push("Excel");
    if (data[r][col["Đăng ký PPT"]])   monList.push("PowerPoint");

    var ngay  = String(data[r][col["Ngày sinh"]]  || "").trim();
    var thang = String(data[r][col["Tháng sinh"]] || "").trim();
    var nam   = String(data[r][col["Năm sinh"]]   || "").trim();
    var ngaySinhStr = (ngay && thang && nam)
      ? (ngay.padStart(2,"0") + "/" + thang.padStart(2,"0") + "/" + nam)
      : "";

    results.push({
      "SĐT": String(data[r][col["SĐT"]] || "").trim(),
      "Họ và tên": String(data[r][col["Họ và tên"]] || "").trim(),
      "CCCD": String(data[r][col["CCCD"]] || "").trim(),
      "Ngày sinh": ngaySinhStr,
      "Giới tính": String(data[r][col["Giới tính"]] || "").trim(),
      "Địa chỉ": String(data[r][col["Địa chỉ (VNeID)"]] || "").trim(),
      "Môn thi": monList.join(" + "),
      "Phiên bản": String(data[r][col["Phiên bản"]] || "").trim(),
      "Thành phố thi": String(data[r][col["Thành phố thi"]] || "").trim(),
      "Địa điểm thi": String(data[r][col["Địa điểm thi"]] || "").trim(),
      "Đợt thi": rowDot,
      "Ngày thi": formatDateField(data[r][col["Ngày thi"]]),
      "Ngôn ngữ đề": String(data[r][col["Ngôn ngữ đề"]] || "").trim() === "V" ? "Tiếng Việt" : "Tiếng Anh",
      "Đã từng thi MOS chưa": String(data[r][col["Đã thi MOS chưa"]] || "").trim() === "Y" ? "Đã từng thi" : "Chưa thi lần nào",
      "Phòng thi": String(data[r][col["Phòng thi"]] || "").trim(),
      "Ca thi": String(data[r][col["Ca thi"]] || "").trim(),
      "Trạng thái": String(data[r][col["Trạng thái"]] || "Chưa xác nhận").trim(),
      "Lưu ý thi": String(data[r][col["Lưu ý thi"]] || "").trim(),
      "_rowIndex": r + 1
    });
  }

  if (results.length > 0) {
    return jsonResp({ ok: true, data: results, count: results.length });
  }

  var phoneExists = data.slice(1).some(function(row) {
    return normalizePhone(String(row[col["SĐT"]] || "").trim()) === phone;
  });
  if (phoneExists && dot) {
    return jsonResp({
      ok: false,
      msg: "Số điện thoại " + (e.parameter.phone||"") + " không có trong " + dot + ". Vui lòng kiểm tra lại hoặc liên hệ Zalo 0912.888.360.",
      notFound: true
    });
  }
  return jsonResp({
    ok: false,
    msg: "Không tìm thấy thông tin đăng ký cho SĐT " + (e.parameter.phone||"") + ". Liên hệ Zalo 0912.888.360 để kiểm tra.",
    notFound: true
  });
}

// Định dạng ô "Ngày thi" ra đúng dd/MM/yyyy khi trả về cho web, bất kể ô
// đang là kiểu Date (Sheets tự nhận diện) hay vẫn là text do gõ tay.
function formatDateField(v) {
  if (!v) return "";
  if (Object.prototype.toString.call(v) === "[object Date]") {
    return Utilities.formatDate(v, "Asia/Ho_Chi_Minh", "dd/MM/yyyy");
  }
  return String(v).trim();
}

// ── XÁC NHẬN ĐÃ NHẬN LỊCH THI ────────────────────────────
// POST { action: "xacNhan", phone: "0912...", dot: "Đợt 6/2026" }
function handleXacNhanPost(d) {
  var phone = normalizePhone((d.phone || "").trim());
  var dot   = (d.dot || "").trim();
  if (!phone) return jsonResp({ ok: false, msg: "Thiếu số điện thoại" });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_THI);
  if (!sheet) return jsonResp({ ok: false, msg: "Không tìm thấy sheet" });

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var col = {};
  headers.forEach(function(h, i) { col[h] = i; });

  if (col["Trạng thái"] === undefined) return jsonResp({ ok: false, msg: "Sheet DKTHI thiếu cột Trạng thái" });

  var updated = 0;
  var now = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm");

  for (var r = 1; r < data.length; r++) {
    var rowPhone = normalizePhone(String(data[r][col["SĐT"]] || "").trim());
    if (rowPhone !== phone) continue;
    var rowDot = String(data[r][col["Đợt thi"]] || "").trim();
    if (dot && rowDot && rowDot !== dot) continue;

    sheet.getRange(r + 1, col["Trạng thái"] + 1).setValue("✅ Đã xác nhận (" + now + ")");
    updated++;
  }

  if (updated > 0) return jsonResp({ ok: true, msg: "Đã xác nhận. Cảm ơn bạn!" });
  return jsonResp({ ok: false, msg: "Không tìm thấy thông tin để xác nhận" });
}

// ── TIỆN ÍCH ─────────────────────────────────────────────
function normalizePhone(p) {
  p = String(p || "").replace(/\s/g,"");
  if (p.startsWith("+84")) p = "0" + p.slice(3);
  else if (p.startsWith("84") && p.length >= 11) p = "0" + p.slice(2);
  return p;
}

function normalizePhoneForSheet(v) {
  return normalizePhone(String(v || "").trim());
}

function jsonResp(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getStats() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var msg = "📊 THỐNG KÊ MOS360:\n\n";
  [SHEET_HV, SHEET_THI, SHEET_OFF].forEach(function(n) {
    var s = ss.getSheetByName(n);
    msg += n + ": " + (s ? Math.max(0, s.getLastRow()-1) : 0) + " dòng\n";
  });
  SpreadsheetApp.getUi().alert(msg);
}

function migrateOldData() {
  var ui = SpreadsheetApp.getUi();
  var r = ui.prompt("Nhập ID file hocvienmos360 cũ:", ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK || !r.getResponseText().trim()) return;
  try {
    var old = SpreadsheetApp.openById(r.getResponseText().trim());
    var dest = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_HV);
    var total = 0;
    old.getSheets().forEach(function(s) {
      var rows = s.getDataRange().getValues().slice(1).filter(function(row){
        return row.some(function(c){ return String(c).trim(); });
      });
      if (rows.length) {
        dest.getRange(dest.getLastRow()+1, 1, rows.length, rows[0].length).setValues(rows);
        total += rows.length;
      }
    });
    ui.alert("✅ Đã migrate " + total + " dòng sang DKHOC!");
  } catch(err) { ui.alert("❌ Lỗi: " + err.message); }
}