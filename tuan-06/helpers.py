"""Hàm dùng chung cho bài W4: nhiều cửa sổ và frame lồng nhau.

Tài liệu: 3.4 Windows and frames, 5.1 Explicit Waits.
"""
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

TIMEOUT = 10


def open_and_switch_to_new_window(driver, open_action, timeout=TIMEOUT):
    """Thực hiện open_action (ví dụ click link), chờ cửa sổ mới xuất hiện rồi chuyển sang.

    Ghi lại danh sách handle TRƯỚC khi click để tìm đúng handle mới,
    không phụ thuộc vào thứ tự của driver.window_handles.
    Trả về handle của cửa sổ mới.
    """
    old_handles = set(driver.window_handles)
    open_action()
    WebDriverWait(driver, timeout).until(
        lambda d: len(d.window_handles) > len(old_handles),
        message="Không thấy cửa sổ mới được mở",
    )
    new_handle = (set(driver.window_handles) - old_handles).pop()
    driver.switch_to.window(new_handle)
    return new_handle


def switch_to_frame_path(driver, *frames, timeout=TIMEOUT):
    """Đi từ trang gốc vào lần lượt từng frame, ví dụ ("frame-top", "frame-middle").

    Luôn gọi default_content() trước để bắt đầu từ trang gốc,
    tránh lỗi NoSuchFrameException khi đang đứng ở frame khác.
    """
    driver.switch_to.default_content()
    wait = WebDriverWait(driver, timeout)
    for frame in frames:
        wait.until(
            EC.frame_to_be_available_and_switch_to_it(frame),
            message=f"Không vào được frame {frame!r}",
        )


def read_frame_text(driver, *frames):
    """Đọc chữ trong body của frame cuối cùng trong đường dẫn, rồi quay về trang gốc."""
    switch_to_frame_path(driver, *frames)
    try:
        return driver.find_element(By.TAG_NAME, "body").text.strip()
    finally:
        driver.switch_to.default_content()
