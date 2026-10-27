# Tuần 7

### Kiến thức
- Biết cách dùng Explicit Wait (`WebDriverWait` + `expected_conditions`) để chờ đúng điều kiện thay vì chờ cứng bằng `time.sleep()`: `visibility_of_element_located`, `staleness_of`, `url_contains`
- Biết điều khiển lịch sử trình duyệt: `driver.back()`, `driver.refresh()` và kiểm tra địa chỉ hiện tại bằng `driver.current_url`
- Biết cách kết nối tới Selenium Server từ xa bằng `webdriver.Remote`

### Trả lời câu hỏi
1. Explicit Wait khác Implicit Wait thế nào?
- Implicit Wait đặt một lần, áp dụng cho mọi lệnh `find_element` (chờ phần tử xuất hiện trong DOM). Explicit Wait chờ một điều kiện cụ thể (hiển thị, URL thay đổi, phần tử cũ bị thay thế...) tại một chỗ cụ thể, nên linh hoạt và rõ ràng hơn

2. Khi nào phần tử bị "stale"?
- Khi trang hoặc một phần trang được tải lại, phần tử cũ không còn gắn với DOM hiện tại nữa. Dùng `EC.staleness_of(element)` để chờ phần tử cũ bị thay thế

### Sử dụng AI
- Hỏi AI: sự khác nhau giữa `visibility_of_element_located` và `presence_of_element_located`, và `staleness_of` dùng khi nào
- Câu trả lời có đúng không: đúng, đã đối chiếu với tài liệu Selenium (presence chỉ cần có trong DOM, visibility cần hiển thị và có kích thước > 0)
- Hiểu thêm: nên chờ theo điều kiện thay vì `time.sleep()` để test vừa nhanh vừa ổn định

### Nhận xét
- Có lệnh chờ (`wait.until(EC.url_contains("status_codes"))`): test luôn PASSED, chỉ chờ đúng đến khi URL đổi rồi chạy tiếp
- Không có lệnh chờ (đọc `driver.current_url` ngay sau `click()`): chạy thử 5 lần đều ra đúng `/status_codes`, vì `click()` trên link thường đợi trang mới tải xong và chuyển hướng ở đây xảy ra phía server nên nhanh
- Kết luận: không có lệnh chờ vẫn có thể chạy được nhưng phụ thuộc vào tốc độ mạng/máy, dễ lỗi ngẫu nhiên (flaky) khi trang chậm hoặc chuyển hướng bằng JavaScript. Có lệnh chờ thì test ổn định hơn
