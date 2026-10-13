# Test Cases – Chức năng đăng nhập

**Website:** https://the-internet.herokuapp.com/login

## Trường Hợp 1 – Đăng nhập thành công

- **Mục tiêu:** Kiểm tra đăng nhập với thông tin hợp lệ.
- **Các bước thực hiện:**
  1. Mở trang đăng nhập.
  2. Nhập username `tomsmith`.
  3. Nhập password `SuperSecretPassword!`.
  4. Nhấn nút Login.
- **Dữ liệu kiểm thử:** Username và password hợp lệ.
- **Kết quả mong đợi:** Chuyển đến trang Secure Area và hiển thị thông báo đăng nhập thành công.

## Trường hợp 2 – Đăng nhập với mật khẩu sai

- **Mục tiêu:** Kiểm tra hệ thống xử lý khi nhập sai mật khẩu.
- **Các bước thực hiện:**
  1. Mở trang đăng nhập.
  2. Nhập username `tomsmith`.
  3. Nhập password `WrongPassword`.
  4. Nhấn nút Login.
- **Dữ liệu kiểm thử:** Username đúng, password sai.
- **Kết quả mong đợi:** Không đăng nhập thành công và hiển thị thông báo `Your password is invalid!`.

## Trường hợp 3 – Đăng nhập với tên đăng nhập sai

- **Mục tiêu:** Kiểm tra hệ thống xử lý khi nhập sai username.
- **Các bước thực hiện:**
  1. Mở trang đăng nhập.
  2. Nhập username `wronguser`.
  3. Nhập password `SuperSecretPassword!`.
  4. Nhấn nút Login.
- **Dữ liệu kiểm thử:** Username sai, password đúng.
- **Kết quả mong đợi:** Không đăng nhập thành công và hiển thị thông báo `Your username is invalid!`.