// ================================================
// GOOGLE APPS SCRIPT - MOS360 Sheet Manager (bản cập nhật)
// Sheet: "Quản lý học viên" — dùng chung cho:
//   - Đăng nhập học Online (index.js /api/verify-code)
//   - Admin Dashboard tab "Học viên Online" (admin-api.js)
//   - Học viên tự đăng ký học Online qua web (online-register-api.js)
//
// CỘT (giữ đúng thứ tự A→D như cũ để không phá code cũ đang đọc theo
// index cột cố định — chỉ NỐI THÊM cột E→I phía sau):
//   A Khóa học   B SĐT   C Ngày ĐK   D Ngày hết hạn
//   E Họ tên     F Trường   G Lớp/Khoa   H Kênh biết đến   I Ghi chú
//
// Hướng dẫn deploy:
// 1. Mở Google Sheet quản lý học viên (17spoqBAG...)
// 2. Extensions → Apps Script → paste code này (thay code cũ)
// 3. Deploy → Manage deployments → sửa deployment hiện có (giữ
//    nguyên URL cũ để không phải sửa lại config.js)
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Đảm bảo range "Publish to web" (File → Share → Publish to web)
//    của sheet này bao gồm ĐỦ các cột A→I (không chỉ A→D), để
//    Dashboard đọc được cột Họ tên (cột E).
// ================================================

const SHEET_NAME = 'DSHVMOS360'; // Tên sheet tab

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;

    if (action === 'add') return addStudent(data);
    if (action === 'renew') return renewStudent(data);

    return result(false, 'Action không hợp lệ');
  } catch (err) {
    return result(false, err.message);
  }
}

function doGet(e) {
  return result(true, 'MOS360 Apps Script đang hoạt động!');
}

function addStudent(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

  var course = String(data.course || '').trim();
  var phone = String(data.phone || '').trim();
  var date = String(data.date || formatDate(new Date())).trim();
  var expire = String(data.expire || '').trim(); // để trống nếu đăng ký online tự động, chờ admin duyệt

  // Các trường mở rộng — chỉ có khi học viên tự đăng ký học Online qua web
  var name = String(data.name || '').trim();
  var school = String(data.school || '').trim();
  var classInfo = String(data.classInfo || '').trim();
  var channel = String(data.channel || '').trim();
  var note = String(data.note || '').trim();

  if (!course || !phone) return result(false, 'Thiếu thông tin khóa học hoặc SĐT');

  var lastRow = sheet.getLastRow();
  var rows = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 4).getValues() : [];

  for (var i = 0; i < rows.length; i++) {
    var rowCourse = String(rows[i][0]).trim();
    var rowPhone = String(rows[i][1]).trim();
    var rowExpire = String(rows[i][3]).trim();

    if (rowCourse === course && rowPhone === phone) {
      // Nếu dòng cũ CHƯA được kích hoạt (hạn dùng còn trống) — cho phép
      // cập nhật lại thông tin mới nhất thay vì báo lỗi trùng, vì có thể
      // học viên gửi lại form do nhập sai hoặc quên thông tin.
      if (!rowExpire) {
        var updateRow = i + 2;
        sheet.getRange(updateRow, 3).setValue(date); // Ngày ĐK — cập nhật lần gửi mới nhất
        if (name) sheet.getRange(updateRow, 5).setValue(name);
        if (school) sheet.getRange(updateRow, 6).setValue(school);
        if (classInfo) sheet.getRange(updateRow, 7).setValue(classInfo);
        if (channel) sheet.getRange(updateRow, 8).setValue(channel);
        if (note) sheet.getRange(updateRow, 9).setValue(note);
        return result(true, 'Đã cập nhật lại thông tin đăng ký — MOS360 sẽ liên hệ sớm!');
      }
      // Dòng cũ đã có hạn dùng (đã kích hoạt / đang học) — đây mới là trùng thật.
      return result(false, 'Học viên ' + phone + ' đã đăng ký khóa ' + course);
    }
  }

  sheet.appendRow([course, phone, date, expire, name, school, classInfo, channel, note]);
  return result(true, 'Đã ghi nhận đăng ký!');
}

function renewStudent(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

  var phone = String(data.phone || '').trim();
  var course = String(data.course || '').trim();
  var expire = String(data.expire || '').trim();

  if (!phone || !course || !expire) return result(false, 'Thiếu thông tin gia hạn');

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return result(false, 'Không tìm thấy dữ liệu');

  var rows = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  var found = false;
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === course && String(rows[i][1]).trim() === phone) {
      sheet.getRange(i + 2, 4).setValue(expire); // Cột D = expire
      found = true;
      break;
    }
  }

  if (!found) return result(false, 'Không tìm thấy học viên ' + phone + ' - ' + course);
  return result(true, 'Gia hạn thành công đến ' + expire);
}

function formatDate(d) {
  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

function result(success, msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: success, msg: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}
