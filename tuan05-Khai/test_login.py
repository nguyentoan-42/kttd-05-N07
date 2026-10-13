import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import os










def setup_driver():
  """Khởi tạo WebDriver cho Cốc Cốc với đúng phiên bản 152"""
  options = webdriver.ChromeOptions()

  # Trỏ đến đường dẫn Cốc Cốc trên máy bạn
  options.binary_location = os.path.expanduser(
      r"~\AppData\Local\CocCoc\Browser\Application\browser.exe"
  )

  options.add_argument("--no-sandbox")
  options.add_argument("--disable-dev-shm-usage")

  # Ép webdriver_manager tải đúng phiên bản 152 tương thích với Cốc Cốc
  driver_path = ChromeDriverManager(driver_version="152.0.7977.124").install()

  driver = webdriver.Chrome(service=Service(driver_path), options=options)
  driver.maximize_window()
  return driver


def test_login_success():
  """Trường hợp 1: Đăng nhập thành công"""
  driver = setup_driver()
  try:
    # Bước 1: Mở trang đăng nhập
    driver.get("https://the-internet.herokuapp.com/login")

    # Bước 2 & 3: Nhập username và password hợp lệ
    driver.find_element(By.ID, "username").send_keys("tomsmith")
    driver.find_element(By.ID, "password").send_keys("SuperSecretPassword!")

    # Bước 4: Nhấn nút Login
    driver.find_element(By.CSS_SELECTOR, "button.radius").click()

    # Kiểm tra kết quả mong đợi
    time.sleep(2)  # Chờ chuyển trang
    current_url = driver.current_url
    flash_message = driver.find_element(By.ID, "flash").text

    assert "secure" in current_url, "Lỗi: Không chuyển đến trang Secure Area!"
    assert (
        "You logged into a secure area!" in flash_message
    ), "Lỗi: Thông báo thành công không hiển thị chính xác!"
    print("-> Trường hợp 1 [Đăng nhập thành công]: PASSED")

  finally:
    driver.quit()


def test_login_wrong_password():
  """Trường hợp 2: Đăng nhập với mật khẩu sai"""
  driver = setup_driver()
  try:
    # Bước 1: Mở trang đăng nhập
    driver.get("https://the-internet.herokuapp.com/login")

    # Bước 2 & 3: Nhập username đúng, password sai
    driver.find_element(By.ID, "username").send_keys("tomsmith")
    driver.find_element(By.ID, "password").send_keys("WrongPassword")

    # Bước 4: Nhấn nút Login
    driver.find_element(By.CSS_SELECTOR, "button.radius").click()

    # Kiểm tra kết quả mong đợi
    time.sleep(2)
    flash_message = driver.find_element(By.ID, "flash").text

    assert (
        "Your password is invalid!" in flash_message
    ), "Lỗi: Thông báo sai mật khẩu không hiển thị chính xác!"
    print("-> Trường hợp 2 [Đăng nhập mật khẩu sai]: PASSED")

  finally:
    driver.quit()


def test_login_wrong_username():
  """Trường hợp 3: Đăng nhập với tên đăng nhập sai"""
  driver = setup_driver()
  try:
    # Bước 1: Mở trang đăng nhập
    driver.get("https://the-internet.herokuapp.com/login")

    # Bước 2 & 3: Nhập username sai, password đúng
    driver.find_element(By.ID, "username").send_keys("wronguser")
    driver.find_element(By.ID, "password").send_keys("SuperSecretPassword!")

    # Bước 4: Nhấn nút Login
    driver.find_element(By.CSS_SELECTOR, "button.radius").click()

    # Kiểm tra kết quả mong đợi
    time.sleep(2)
    flash_message = driver.find_element(By.ID, "flash").text

    assert (
        "Your username is invalid!" in flash_message
    ), "Lỗi: Thông báo sai username không hiển thị chính xác!"
    print("-> Trường hợp 3 [Đăng nhập tên đăng nhập sai]: PASSED")

  finally:
    driver.quit()


if __name__ == "__main__":
  print("Bắt đầu chạy các test case đăng nhập trên Cốc Cốc...")
  test_login_success()
  test_login_wrong_password()
  test_login_wrong_username()
  print("Hoàn thành tất cả các bài kiểm thử!")