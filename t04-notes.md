# Notes

## Điều đã học
Một script Selenium thường gồm các bước: khởi tạo trình duyệt, mở trang web, thực hiện thao tác/kiểm tra, sau đó đóng trình duyệt.
Hiểu thêm cách viết một bài kiểm thử đơn giản bằng Python và Selenium, rồi chạy nó bằng pytest.

## Câu hỏi 1

### Một script Selenium gồm những bước nào, và mỗi bước ứng với dòng nào trong bài kiểm ?

Bài kiểm thử nằm trong file `test_smoke.py`:

| Bước | Dòng | Mã |
| --- | --- | --- |
| Khởi tạo trình duyệt | 5 | `driver = webdriver.Chrome()` |
| Mở trang web | 7 | `driver.get("https://the-internet.herokuapp.com/")` |
| Kiểm tra kết quả | 9 | `assert driver.title == "The Internet"` |
| Đóng trình duyệt | 11 | `driver.quit()` |

Dòng 1 (`from selenium import webdriver`) là phần chuẩn bị, dùng để nạp thư viện Selenium trước khi chạy các bước trên.

## Câu hỏi 2

### Pytest tự tìm bài kiểm thử dựa vào quy tắc đặt tên nào?

pytest sẽ tìm các file kiểm thử theo quy tắc đặt tên như `test_*.py` hoặc `*_test.py`.
Trong file, các hàm kiểm thử được đặt tên bắt đầu bằng `test_`.
File tên `test_smoke.py`, khi chạy `pytest tuan-04/test_smoke.py` thì pytest nhận diện được đây là một bài kiểm thử.
