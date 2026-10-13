## GHI CHÚ - TUẦN 4

## Kiến thức
Qua tuần 4, em đã tự cài được các thư viện cần thiết cho kiểm thử như Selenium và pytest.
Đồng thời có thể tự chạy một chương trình kiểm thử cơ bản trên trình duyệt Chrome về kiểm tra tiêu đề trang.
Hiểu được khi nào kết quả kiểm thử báo trượt (FAIL) hoặc đạt (PASS).

## Câu hỏi của tuần
**Một script Selenium gồm những bước nào, và mỗi bước ứng với dòng nào trong bài kiểm thử của bạn?**
Một script Selenium cơ bản gồm 5 bước chính, ứng với các phần trong bài thực hành trong file test_smoke.py sẽ là:
- Khởi tạo một phiên làm việc mới trên trình duyệt: `driver = webdriver.Chrome()`;
- Điều hướng trình duyệt đến URL của trang web cần kiểm thử: `driver.get("https://the-internet.herokuapp.com/")`;
- Tìm/lấy thông tin, thao tác trên trang web: `driver.title`;
- Kiểm tra/xác thực kết quả: `assert driver.title == "The Internet"`;
- Đóng trình duyệt: `driver.quit()`.

**pytest tự tìm bài kiểm thử dựa vào quy tắc đặt tên nào?**
Các quy tắc đặt tên:
- Tên file kiểm thử: phải bắt đầu bằng tiền tố `test_` hoặc kết thúc bằng hậu tố `_test.py`
- Tên Class kiểm thử: phải bắt đầu bằng chữ `Test`. Đồng thời, các class này không được định nghĩa hàm khởi tạo `__init__`
- Tên hàm/phương thức: phải bắt đầu bằng tiền tố `test_`

## Sử dụng AI
- Cách viết script Selenium cơ bản => Em đã học được cấu trúc và tự viết được script cho bài kiểm thử đầu tiên.
- Các quy tắt đặt tên của pytest => Có thể trả lời được câu hỏi trên và tránh để sau này bị dính phải lỗi này.
