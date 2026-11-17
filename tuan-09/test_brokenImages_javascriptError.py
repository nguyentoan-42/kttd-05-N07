import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By


# BÀI 1: KIỂM TRA ẢNH HỎNG (BROKEN IMAGES)
# find_elements(By.TAG_NAME), get_attribute, execute_script (naturalWidth)
def test_broken_images():
    driver = webdriver.Chrome()

    # Truy cập trang Broken Images
    driver.get("https://the-internet.herokuapp.com/broken_images")

    # 4.5 By Tag Name - find_elements(By.TAG_NAME)
    # Tìm tất cả các thẻ <img> (hình ảnh) đang có trên trang web
    images = driver.find_elements(By.TAG_NAME, "img")
    assert len(images) > 0

    broken_images = []

    for img in images:
        # 7.20 WebElement - get_attribute
        # Lấy đường dẫn nguồn (src) của từng bức ảnh
        src = img.get_attribute("src")

        # execute_script (naturalWidth)
        # Chạy lệnh JavaScript để đo chiều rộng thực tế của ảnh (ảnh hỏng sẽ có chiều rộng = 0)
        natural_width = driver.execute_script("return arguments[0].naturalWidth;", img)

        if natural_width == 0:
            broken_images.append(src)

    # Đảm bảo phát hiện được ít nhất 1 ảnh bị hỏng trên trang
    assert len(broken_images) > 0

    driver.quit()


# BÀI 2: BẮT LỖI JAVASCRIPT TRONG CONSOLE (JAVASCRIPT ONLOAD ERROR)
# ChromeOptions.set_capability, get_log("browser")
def test_javascript_error():
    # ChromeOptions.set_capability
    # Bật quyền ghi lại toàn bộ nhật ký (log) của trình duyệt trước khi mở Chrome
    options = webdriver.ChromeOptions()
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    driver = webdriver.Chrome(options=options)

    # Truy cập trang có sẵn lỗi JavaScript khi vừa tải trang (onload)
    driver.get("https://the-internet.herokuapp.com/javascript_error")

    # get_log("browser")
    # Đọc toàn bộ danh sách thông báo/lỗi trong tab Console của trình duyệt
    logs = driver.get_log("browser")

    # Kiểm tra xem có ghi nhận được lỗi nghiêm trọng (SEVERE) nào từ JavaScript không
    assert any(log["level"] == "SEVERE" for log in logs)

    driver.quit()


# BÀI 3: KẾT NỐI TỪ XA
# 7.19 Remote WebDriver, ChromeOptions.set_capability
def test_remote_webdriver():
    # Phải có Selenium Server đang chạy ở port 4444 thì đoạn này mới hoạt động
    try:
        options = webdriver.ChromeOptions()
        options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

        # 7.19 Remote WebDriver
        # Thay vì driver = webdriver.Chrome(), ta kết nối tới máy chủ từ xa
        driver = webdriver.Remote(
            command_executor='http://127.0.0.1:4444/wd/hub',
            options=options
        )
        driver.get("https://the-internet.herokuapp.com/broken_images")
        assert "The Internet" in driver.title
        driver.quit()
    except Exception:
        print("Bỏ qua bài test này vì không có Selenium Server port 4444")