# BÁO CÁO GHI CHÚ THU HOẠCH - TUẦN 04

## I. CÁC KIẾN THỨC ĐÃ TÍCH LŨY
- Thành thạo thiết lập môi trường kiểm thử tự động Python kết hợp thư viện `selenium` và framework `pytest`.
- Nắm vững quy trình khởi tạo và điều khiển trình duyệt tự động (Chrome) để tương tác trực tiếp với giao diện người dùng.
- Hiểu rõ cơ chế đánh giá trạng thái kiểm thử (`PASS` khi mọi khẳng định `assert` đều đúng, `FAIL` khi có ít nhất một điều kiện vi phạm).

---

## II. TRẢ LỜI CÂU HỎI 

### 1. Quy trình thực thi một script Selenium chuẩn
Một kịch bản Selenium cơ bản bao gồm 5 bước cốt lõi. Trong bài `test_smoke.py`, các dòng code tương ứng được triển khai như sau:

1. **Khởi tạo WebDriver:** Mở trình duyệt Chrome.
   - Code: `driver = webdriver.Chrome()`
2. **Điều hướng URL:** Truy cập vào trang web mục tiêu.
   - Code: `driver.get("https://the-internet.herokuapp.com/")`
3. **Trích xuất thông tin:** Lấy dữ liệu thực tế từ trang web (tiêu đề trang).
   - Code: `driver.title`
4. **Xác minh kết quả (Assertion):** So sánh giá trị thực tế với giá trị mong đợi.
   - Code: `assert driver.title == "The Internet"`
5. **Giải phóng tài nguyên (Teardown):** Đóng hoàn toàn trình duyệt sau khi kiểm thử xong.
   - Code: `driver.quit()`

### 2. Quy tắc tự động phát hiện bài test của Pytest (Test Discovery)
Pytest dựa vào cách đặt tên file, class và hàm để tự động nhận diện kịch bản kiểm thử:
- **Tên file:** Phải bắt đầu bằng `test_` (ví dụ: `test_smoke.py`) hoặc kết thúc bằng `_test.py`.
- **Tên class (nếu có):** Bắt đầu bằng từ `Test` (viết hoa chữ T, không dùng hàm `__init__`).
- **Tên hàm/method:** Bắt đầu bằng tiền tố `test_` (ví dụ: `def test_smoke():`).

---

## III. NHẬN XÉT VỀ VIỆC ỨNG DỤNG AI
- **Tối ưu hóa mã nguồn:** Học cách viết code kiểm thử ngắn gọn, chính xác theo chuẩn của Selenium 4 và Pytest.
- **Tránh lỗi hệ thống:** Hiểu rõ quy tắc đặt tên để Pytest không bị bỏ sót các file hoặc bài kiểm thử trong dự án nhóm.
