#GHI CHÚ - Tuần 5

## Kiến thức được học
Tuần này, trọng tâm công việc của mình xoay quanh việc chuyển dịch từ kiểm thử thủ công sang tự động hóa (Automation Testing) trên nền tảng web mẫu (the-internet.herokuapp.com).

Mình đã tự tay xây dựng một bộ test script hoàn chỉnh bằng Python kết hợp với thư viện Selenium WebDriver để kiểm chứng luồng xác thực (Authentication).

Quá trình làm việc giúp mình thực hành sâu hơn về cách phân tích DOM structure, định danh các thành phần trên giao diện web bằng By.ID
## Câu hỏi
1. Với ô tên đăng nhập ở trang /login, nên xác định bằng cách nào là ổn định nhất, vì sao?
- Với ô tên đăng nhập ở trang /login, cách xác định ổn định nhất là sử dụng thuộc tính id (ví dụ trong Selenium: By.ID, "username").

2. Muốn nhập chữ vào một ô thì dùng lệnh gì?
- Để nhập chữ vào một ô (input field) trong Selenium với Python, ta dùng lệnh send_keys().

3. Làm thế nào để biết id của một ô nhập trên trang?
-Trong tab Elements của bảng Developer Tools, dòng HTML tương ứng với ô nhập đó sẽ được tô sáng (highlight).

Quan sát bên trong thẻ đó (thường là thẻ <input>) để tìm thuộc tính id="...". Giá trị nằm trong dấu ngoặc kép chính là id của ô nhập đó.

##  AI
- Biết cách viết script hoạt động được
- Check script giúp code sạch hơn
