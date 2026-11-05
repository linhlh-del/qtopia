/**
 * Apps Script webhook — ghi lead từ Cloudflare Worker vào Google Sheet.
 * Dùng chung cho MỌI dự án: tạo Sheet mới → Extensions → Apps Script → dán file này → Deploy Web app.
 * Chỉ nhận POST JSON từ Worker (URL /exec chỉ nằm trong secret của Worker, không lộ ra frontend).
 *
 * 14 cột đầu GIỮ ĐÚNG thứ tự script cũ → Sheet đang chạy không phải sửa gì.
 * Các cột sau là thông tin bổ sung; Sheet trống sẽ được tự tạo dòng tiêu đề.
 */

const SHEET_NAME = 'RAW_LEAD'; // đổi nếu đặt tên sheet khác

const COLUMNS = [
  // ── 14 cột như script cũ ──
  'timestamp',
  'name',
  'phone',
  'email',
  'apartment_types',
  'message',
  'form_type',       // popup / register / quote / floating_price…
  'source_url',      // URL trang đích lần đầu (first-touch)
  'utm_source',
  'utm_campaign',
  'utm_medium',
  'utm_content',
  'utm_term',
  'submitted_at',    // giờ client lúc bấm gửi
  // ── bổ sung ──
  'project',         // PROJECT_NAME của Worker
  'page_url',        // trang lúc gửi form
  'referrer',
  'gclid',
  'fbclid',
  'ttclid',
  'lt_utm_source',   // nguồn gần nhất (last non-direct)
  'lt_utm_medium',
  'lt_utm_campaign',
  'origin',
  'country',
  'received_at',     // giờ Worker nhận
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'Không có dữ liệu gửi lên' });
    }
    const data = JSON.parse(e.postData.contents);
    if (!data.name || !data.phone) {
      return jsonResponse({ success: false, error: 'Thiếu name hoặc phone' });
    }

    lock.waitLock(10000); // tránh 2 lead cùng lúc ghi đè cùng một dòng
    const sheet = getSheet_();
    const row = COLUMNS.map(function (key) {
      if (key === 'timestamp') return new Date();
      const v = data[key];
      return v === undefined || v === null ? '' : String(v);
    });
    sheet.appendRow(row);
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) { /* chưa giữ khoá */ }
  }
}

/* Mở /exec trên trình duyệt để kiểm tra script đang chạy */
function doGet() {
  return jsonResponse({ success: true, message: 'Webhook is running', sheet: SHEET_NAME });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
