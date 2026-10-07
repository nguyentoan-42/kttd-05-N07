from selenium import webdriver
from selenium.webdriver.common.by import By


def test_smoke():
    # Khởi tạo phiên làm việc với trình duyệt Chrome
    driver = webdriver.Chrome()

    try:
        # Điều hướng đến trang web cần kiểm thử
        driver.get("https://the-internet.herokuapp.com/")

        # 1. Xác minh tiêu đề của trang (Title)
        assert driver.title == "The Internet"

        # 2. Xác minh nội dung thẻ h1 hiển thị trên giao diện
        heading = driver.find_element(By.TAG_NAME, "h1")
        assert heading.text == "Welcome to the-internet"

    finally:
        # Tự động đóng trình duyệt và giải phóng tài nguyên sau khi kiểm thử xong
        driver.quit()
