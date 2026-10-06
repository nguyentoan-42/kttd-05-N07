# Smoke Test

## 1. Giới thiệu

Bài kiểm thử Smoke Test sử dụng Selenium để kiểm tra trang web The Internet.

## 2. Cài đặt

Cài đặt thư viện Selenium và Pytest bằng lệnh:
(Lưu ý: Phiên bản Python phải từ 3.7 trở lên)
pip install Pytest
pip install selenium

## 3. Cách chạy

Mở Terminal tại thư mục chứa file test_smoke.py và chạy:
pytest test_smoke.py

## 4. Nội dung kiểm thử

Bài kiểm thử thực hiện:

Mở trình duyệt Google Chrome.
Truy cập trang:
https://the-internet.herokuapp.com/
Kiểm tra tiêu đề trang.
Tiêu đề phải bằng: The Internet

## 5. Kết quả

Nếu tiêu đề đúng The Internet, bài kiểm thử sẽ được đánh giá là thành công.