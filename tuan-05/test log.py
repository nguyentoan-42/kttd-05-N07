import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def init_driver():
    """Khởi tạo WebDriver cho Chrome"""
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.maximize_window()
    return driver

def execute_login_steps(driver, username, password):
    """Hàm chung để thực hiện các bước mở trang và điền thông tin đăng nhập"""
    driver.get("https://the-internet.herokuapp.com/login")
    driver.find_element(By.ID, "username").send_keys(username)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(By.CSS_SELECTOR, "button.radius").click()
    time.sleep(2) # Chờ chuyển trang / load thông báo

def test_login_success():
    """Trường hợp 1: Đăng nhập thành công"""
    driver = init_driver()
    try:
        execute_login_steps(driver, "tomsmith", "SuperSecretPassword!")
        
        current_url = driver.current_url
        flash_message = driver.find_element(By.ID, "flash").text
        
        assert "secure" in current_url, "Lỗi: Không chuyển đến trang Secure Area!"
        assert "You logged into a secure area!" in flash_message, "Lỗi: Thông báo thành công không hiển thị chính xác!"
        print("-> Trường hợp 1 [Đăng nhập thành công]: PASSED")
    finally:
        driver.quit()

def test_login_wrong_password():
    """Trường hợp 2: Đăng nhập với mật khẩu sai"""
    driver = init_driver()
    try:
        execute_login_steps(driver, "tomsmith", "WrongPassword")
        
        flash_message = driver.find_element(By.ID, "flash").text
        assert "Your password is invalid!" in flash_message, "Lỗi: Thông báo sai mật khẩu không hiển thị chính xác!"
        print("-> Trường hợp 2 [Đăng nhập mật khẩu sai]: PASSED")
    finally:
        driver.quit()

def test_login_wrong_username():
    """Trường hợp 3: Đăng nhập với tên đăng nhập sai"""
    driver = init_driver()
    try:
        execute_login_steps(driver, "wronguser", "SuperSecretPassword!")
        
        flash_message = driver.find_element(By.ID, "flash").text
        assert "Your username is invalid!" in flash_message, "Lỗi: Thông báo sai username không hiển thị chính xác!"
        print("-> Trường hợp 3 [Đăng nhập tên đăng nhập sai]: PASSED")
    finally:
        driver.quit()

if __name__ == "__main__":
    print("Bắt đầu chạy các test case đăng nhập...")
    test_login_success()
    test_login_wrong_password()
    test_login_wrong_username()
    print("Hoàn thành tất cả các bài kiểm thử!")