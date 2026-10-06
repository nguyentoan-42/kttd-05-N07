from selenium import webdriver

def test_smoke():
    # Mở của sổ trình duyệt Chrome
    driver = webdriver.Chrome()
    # Mở trang web
    driver.get("https://the-internet.herokuapp.com/")
    # Kiểm tra tiêu đề của trang web
    assert driver.title == "The Internet"
    # Đóng trình duyệt
    driver.quit()
