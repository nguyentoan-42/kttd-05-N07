"""Cấu hình chung cho pytest: tạo WebDriver, đọc tuỳ chọn dòng lệnh.

Tài liệu liên quan: 7.19 Remote WebDriver (chạy trên Selenium Grid qua --remote-url).
"""
import os

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

DEFAULT_BASE_URL = "https://the-internet.herokuapp.com"


def pytest_addoption(parser):
    parser.addoption(
        "--headless",
        action="store_true",
        help="Chạy Chrome ẩn (không hiện cửa sổ trình duyệt).",
    )
    parser.addoption(
        "--remote-url",
        default=os.getenv("SELENIUM_REMOTE_URL"),
        help="URL Selenium Grid, ví dụ http://localhost:4444 (mục 7.19 Remote WebDriver).",
    )
    parser.addoption(
        "--base-url-w4",
        default=os.getenv("BASE_URL", DEFAULT_BASE_URL),
        help="Địa chỉ trang thử nghiệm (mặc định the-internet.herokuapp.com).",
    )


@pytest.fixture(scope="session")
def base_url(request):
    return request.config.getoption("--base-url-w4").rstrip("/")


def _chrome_options(headless: bool) -> Options:
    options = Options()
    if headless:
        options.add_argument("--headless=new")
    options.add_argument("--window-size=1280,900")
    # Tuỳ chọn thêm, ví dụ CHROME_ARGS="--no-sandbox --disable-dev-shm-usage"
    for arg in os.getenv("CHROME_ARGS", "").split():
        options.add_argument(arg)
    if os.getenv("CHROME_BINARY"):
        options.binary_location = os.environ["CHROME_BINARY"]
    return options


@pytest.fixture
def driver(request):
    headless = request.config.getoption("--headless")
    remote_url = request.config.getoption("--remote-url")
    options = _chrome_options(headless)

    if remote_url:
        # 7.19 Remote WebDriver: trình duyệt chạy trên máy khác / Selenium Grid
        drv = webdriver.Remote(command_executor=remote_url, options=options)
    else:
        # Selenium >= 4.6 tự tải chromedriver (Selenium Manager).
        # Muốn chỉ định driver riêng thì đặt biến môi trường CHROMEDRIVER.
        driver_path = os.getenv("CHROMEDRIVER")
        service = Service(executable_path=driver_path) if driver_path else Service()
        drv = webdriver.Chrome(service=service, options=options)

    # Chỉ dùng explicit wait (5.1). Không trộn implicit wait với explicit wait
    # vì thời gian chờ sẽ bị cộng dồn, khó đoán.
    drv.implicitly_wait(0)
    yield drv
    drv.quit()
