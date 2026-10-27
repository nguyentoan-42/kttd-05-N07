# Test chức năng: Chuyển hướng trang (Redirector)

https://the-internet.herokuapp.com/redirector

## 1. TC-01: Chuyển hướng thành công khi bấm link "here"
- Các bước thực hiện:
  + Truy cập trang /redirector
  + Bấm vào link "here" (id="redirect")
  + Chờ cho đến khi URL thay đổi
- Dữ liệu đầu vào: không có
- Kết quả mong đợi: URL chứa "status_codes", trang hiển thị tiêu đề "Status Codes"

## 2. TC-02: Quay lại trang ban đầu bằng nút Back
- Các bước thực hiện:
  + Thực hiện TC-01 (đã được chuyển sang trang /status_codes)
  + Nhấn nút Quay lại (Back) của trình duyệt
- Dữ liệu đầu vào: không có
- Kết quả mong đợi: URL quay về và chứa "redirector", trang hiển thị lại link "here"

## 3. TC-03: Tải lại trang sau khi chuyển hướng
- Các bước thực hiện:
  + Thực hiện TC-01 (đã được chuyển sang trang /status_codes)
  + Nhấn Tải lại (Refresh) trang
- Dữ liệu đầu vào: không có
- Kết quả mong đợi: Vẫn ở trang /status_codes, không bị chuyển hướng lại về /redirector
