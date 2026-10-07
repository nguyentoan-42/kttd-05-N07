from selenium import webdriver

def test_smoke():
    # Mở một tab Chrome mới
    driver = webdriver.Chrome()

    try:
        # Truy cập trang the-internet
        driver.get("https://the-internet.herokuapp.com/")

        # Kiểm tra tiêu đề trang có là "The Internet" không?
        assert driver.title == "The Internet"

    finally:
        # Đóng trình duyệt sau khi đã test xong
        driver.quit()
