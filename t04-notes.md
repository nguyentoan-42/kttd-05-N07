--Điều đã học:

Qua bài đọc "Write your first Selenium script", mình hiểu được: Một script Selenium thường gồm các bước: khởi tạo trình duyệt, mở trang web, thực hiện thao tác/kiểm tra, sau đó đóng trình duyệt. Mình cũng hiểu thêm cách viết một bài kiểm thử đơn giản bằng Python và Selenium

-- Câu hỏi 1: 
- Một script Selenium gồm những bước nào, và mỗi bước ứng với dòng nào trong bài kiểm thử của bạn?
  + Khởi tạo trình duyệt: driver = webdriver.Chrome()
  + Mở trang web: driver.get("https://the-internet.herokuapp.com/")
  + Kiểm tra kết quả: assert driver.title == "The Internet"
  + Đóng trình duyệt: driver.quit()

-- Câu hỏi 2:
- pytest tự tìm bài kiểm thử dựa vào quy tắc đặt tên nào?
  + pytest sẽ tìm các file kiểm thử theo quy tắc đặt tên như test_*.py hoặc *_test.py. Trong file, các hàm kiểm thử thường được đặt tên bắt đầu bằng test_.
Bài của mình sử dụng hàm:
test_smoke()
nên pytest có thể nhận diện đây là một bài kiểm thử.
