# Test chức năng Đăng nhập

## 1. TC-1: Đăng nhập thất bại do bỏ trống cả Username và Password
Các bước thực hiện:

Truy cập trang đăng nhập

Để trống ô Username và ô Password

Nhấn nút "Login"

Dữ liệu đầu vào:

Username: (bỏ trống)

Password: (bỏ trống)

Kết quả mong đợi: Hệ thống hiển thị thông báo lỗi yêu cầu nhập thông tin (hoặc thông báo Your username is invalid!).

## 2. TC-2: Đăng nhập thất bại do bỏ trống ô Username
Các bước thực hiện:

Truy cập trang đăng nhập

Để trống ô Username, nhập Password ĐÚNG

Nhấn nút "Login"

Dữ liệu đầu vào:

Username: (bỏ trống)

Password: SuperSecretPassword!

Kết quả mong đợi: Hiển thị thông báo lỗi Your username is invalid!.

## 3.TC-3 Đăng nhập thất bại do bỏ trống ô Password
Các bước thực hiện:

Truy cập trang đăng nhập

Nhập Username ĐÚNG, để trống ô Password

Nhấn nút "Login"

Dữ liệu đầu vào:

Username: tomsmith

Password: (bỏ trống)

Kết quả mong đợi: Hiển thị thông báo lỗi Your password is invalid!.
  ## 4. TC4 . Kiểm tra tính bảo mật của mật khẩu (Masking Password)
Các bước thực hiện:

Truy cập trang đăng nhập

Nhập ký tự vào ô Password

Dữ liệu đầu vào:

Password: SuperSecretPassword!

Kết quả mong đợi: Ký tự nhập vào ô Password phải được ẩn đi dưới dạng dấu chấm tròn (•) hoặc dấu hoa thị (*), không hiển thị dạng văn bản thuần túy (plain text).
