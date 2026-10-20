"""W4 - Phần 4: Các lỗi thường gặp khi làm việc với cửa sổ và frame.

Tài liệu: 7.1 Exceptions, 5.1 Explicit Waits.
Mỗi test cố tình gây lỗi và kiểm tra Selenium ném đúng loại exception.
"""
import pytest
from selenium.common.exceptions import (
    NoSuchElementException,
    NoSuchFrameException,
    NoSuchWindowException,
    TimeoutException,
)
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from helpers import open_and_switch_to_new_window, switch_to_frame_path


def test_no_such_frame_khi_sai_ten_frame(driver, base_url):
    driver.get(f"{base_url}/nested_frames")
    with pytest.raises(NoSuchFrameException):
        driver.switch_to.frame("frame-khong-ton-tai")


def test_no_such_frame_khi_quen_default_content(driver, base_url):
    """Lỗi hay gặp: đang ở frame-middle mà vào thẳng frame-bottom."""
    driver.get(f"{base_url}/nested_frames")
    switch_to_frame_path(driver, "frame-top", "frame-middle")

    with pytest.raises(NoSuchFrameException):
        driver.switch_to.frame("frame-bottom")

    # Cách đúng: quay về trang gốc trước
    driver.switch_to.default_content()
    driver.switch_to.frame("frame-bottom")
    assert driver.find_element(By.TAG_NAME, "body").text.strip() == "BOTTOM"


def test_no_such_element_khi_chua_vao_frame(driver, base_url):
    """#content nằm trong frame-middle, tìm từ trang gốc sẽ không thấy."""
    driver.get(f"{base_url}/nested_frames")
    with pytest.raises(NoSuchElementException):
        driver.find_element(By.ID, "content")


def test_no_such_window_sau_khi_dong_cua_so(driver, base_url):
    driver.get(f"{base_url}/windows")
    original = driver.current_window_handle
    open_and_switch_to_new_window(
        driver, lambda: driver.find_element(By.LINK_TEXT, "Click Here").click()
    )

    driver.close()  # driver vẫn "đứng" ở cửa sổ vừa đóng
    with pytest.raises(NoSuchWindowException):
        _ = driver.title

    driver.switch_to.window(original)
    assert driver.find_element(By.TAG_NAME, "h3").text == "Opening a new window"


def test_timeout_khi_khong_co_cua_so_moi(driver, base_url):
    driver.get(f"{base_url}/windows")
    with pytest.raises(TimeoutException):
        # Không click gì nên sẽ không bao giờ có 2 cửa sổ
        WebDriverWait(driver, 2).until(EC.number_of_windows_to_be(2))
