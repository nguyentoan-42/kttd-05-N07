const API_URL = "http://localhost:3000";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentDiscount = 0;
let currentVoucher = "";
let shippingFee = 30000;

function getMemberRank(totalSpent) {
  if (totalSpent >= 2000000) {
    return {
      name: "Hội viên kim cương",
      discount: 10,
      icon: "💎"
    };
  }

  if (totalSpent >= 1000000) {
    return {
      name: "Hội viên vàng",
      discount: 7,
      icon: "🥇"
    };
  }

  if (totalSpent >= 500000) {
    return {
      name: "Hội viên bạc",
      discount: 5,
      icon: "🥈"
    };
  }

  return {
    name: "Thành viên thường",
    discount: 0,
    icon: "👤"
  };
}

function getCurrentUserTotalSpent() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return 0;
  }

  let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

  let userOrders = historyBuy.filter(function(order) {
    return (
      order.status !== "Đã hủy" &&
      (
        order.customer === currentUser.username ||
        order.username === currentUser.username ||
        String(order.userId) === String(currentUser.id)
      )
    );
  });

  let totalSpent = userOrders.reduce(function(sum, order) {
    return sum + Number(order.total || 0);
  }, 0);

  return totalSpent;
}

function renderCart() {
  let html = "";
  let total = 0;

  if (cart.length === 0) {
    document.getElementById("cartItems").innerHTML = `
      <div class="cart-empty">
        <p>Giỏ hàng của bạn đang trống.</p>
        <a href="index.html">Tiếp tục mua sắm</a>
      </div>`;
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      html += `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <input type="checkbox" checked>
            <img src="${item.image}" alt="${item.name}">
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${item.price.toLocaleString()}đ</div>
              <div class="cart-qty" style="margin-top:8px">
                <button onclick="decreaseQty(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${index})">+</button>
              </div>
            </div>
          </div>
          <div style="text-align:center; font-weight:600;">${item.quantity}</div>
          <div style="text-align:right; font-weight:700; font-size:15px;">${itemTotal.toLocaleString()}đ</div>
          <div style="text-align:center;">
            <button class="cart-delete-btn" onclick="removeCart(${index})" title="Xóa">🗑</button>
          </div>
        </div>`;
    });

    document.getElementById("cartItems").innerHTML = html;
  }

  const discountMoney = Math.round(total * currentDiscount / 100);

const totalSpent = getCurrentUserTotalSpent();
const memberRank = getMemberRank(totalSpent);
const memberDiscountMoney = Math.round(total * memberRank.discount / 100);

const finalTotal = total - discountMoney - memberDiscountMoney + shippingFee;

document.getElementById("subTotal").textContent = total.toLocaleString() + "đ";
document.getElementById("shippingFee").textContent = shippingFee.toLocaleString() + "đ";
document.getElementById("discount").textContent = "-" + discountMoney.toLocaleString() + "đ";
document.getElementById("finalTotal").textContent = finalTotal.toLocaleString() + "đ";

let memberInfo = document.getElementById("memberInfo");
if (memberInfo) {
  memberInfo.innerHTML =
    memberRank.icon +
    " " +
    memberRank.name +
    " - Ưu đãi hội viên: giảm " +
    memberRank.discount +
    "%";
}

let memberDiscount = document.getElementById("memberDiscount");
if (memberDiscount) {
  memberDiscount.textContent = "-" + memberDiscountMoney.toLocaleString() + "đ";
}
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = totalCount;
}

function increaseQty(index) {
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) cart[index].quantity--;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

async function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống");
    return;
  }

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Vui lòng đăng nhập trước khi thanh toán");
    return;
  }

  let phone = document.getElementById("customerPhone").value.trim();
  let address = document.getElementById("customerAddress").value.trim();
  let payment = document.getElementById("paymentMethod").value;

  if (phone === "" || address === "") {
    alert("Vui lòng nhập số điện thoại và địa chỉ giao hàng");
    return;
  }

  let total = cart.reduce(function(sum, item) {
  return sum + item.price * item.quantity;
  }, 0);

  let discountMoney = Math.round(total * currentDiscount / 100);

  let totalSpent = getCurrentUserTotalSpent();
  let memberRank = getMemberRank(totalSpent);
  let memberDiscountMoney = Math.round(total * memberRank.discount / 100);

  let finalTotal = total - discountMoney - memberDiscountMoney + shippingFee;

  let newOrder = {
  userId: currentUser.id,
  username: currentUser.username,
  customer: currentUser.username,
  phone: phone,
  address: address,
  payment: payment,
  items: cart,
  total: finalTotal,
  shippingFee: shippingFee,
  discount: discountMoney,
  memberRank: memberRank.name,
  memberDiscountPercent: memberRank.discount,
  memberDiscountMoney: memberDiscountMoney,
  status: "Chờ xử lý",
  date: new Date().toLocaleString("vi-VN")
};

  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    });

    const savedOrder = await res.json();

    let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

    historyBuy.push(savedOrder);

    localStorage.setItem("historyBuy", JSON.stringify(historyBuy));

    localStorage.removeItem("cart");

    cart = [];

    renderCart();

    alert("Thanh toán thành công! Đơn hàng đã được lưu vào hệ thống.");
  } catch (error) {
    console.error("Lỗi lưu đơn hàng:", error);
    alert("Không lưu được đơn hàng. Hãy kiểm tra json-server đã chạy chưa.");
  }
}

function showVoucherList() {
  document.getElementById("voucherModal").style.display = "flex";
}

function closeVoucher() {
  document.getElementById("voucherModal").style.display = "none";
}

function selectVoucher(code, percent) {
  currentVoucher = code;
  currentDiscount = percent;
  document.getElementById("selectedVoucher").textContent = code + " - Giảm " + percent + "%";
  closeVoucher();
  renderCart();
}

function removeVoucher() {
  currentVoucher = "";
  currentDiscount = 0;
  document.getElementById("selectedVoucher").textContent = "Chưa chọn mã giảm giá";
  renderCart();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  if (user) {
    document.getElementById("guestMenu").style.display = "none";
    document.getElementById("userMenu").style.display = "flex";
    const helloEl = document.getElementById("helloUser");
    if (helloEl) helloEl.textContent = "Xin chào, " + user.name;
  }
  renderCart();
});

function showUser() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  let guestMenu = document.getElementById("guestMenu");
  let userMenu = document.getElementById("userMenu");
  let helloUser = document.getElementById("helloUser");

  if (currentUser) {
    if (guestMenu) guestMenu.style.display = "none";
    if (userMenu) userMenu.style.display = "flex";
    if (helloUser) helloUser.innerHTML = "Xin chào, " + currentUser.username;
  } else {
    if (guestMenu) guestMenu.style.display = "flex";
    if (userMenu) userMenu.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("Đã đăng xuất");
  showUser();
}
function goToAdmin(event) {
  event.preventDefault();

  let user = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!user || user.role !== "admin") {
    alert("Bạn không có quyền truy cập trang quản trị!");
    return;
  }
  window.location.href = "admin.html";
}
window.onload = function() {
  renderCart();
  showUser();
};