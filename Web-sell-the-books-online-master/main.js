const API_URL = "http://localhost:3000";

let currentDiscount = 0;

let shippingFee = 30000;

let isFreeShip = false;

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

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

  return userOrders.reduce(function(sum, order) {
    return sum + Number(order.total || 0);
  }, 0);
}

function showLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function showRegister() {
  document.getElementById("registerModal").style.display = "flex";
}

function closeRegister() {
  document.getElementById("registerModal").style.display = "none";
}

async function register() {
  let username = document.getElementById("regUser").value.trim();
  let email = document.getElementById("regEmail").value.trim();
  let phone = document.getElementById("regPhone").value.trim();
  let password = document.getElementById("regPass").value.trim();
  let confirmPass = document.getElementById("regConfirmPass").value.trim();

  if (
    username === "" ||
    email === "" ||
    phone === "" ||
    password === "" ||
    confirmPass === ""
  ) {
    alert("Vui lòng nhập đầy đủ thông tin đăng ký");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Email không hợp lệ");
    return;
  }

  if (!/^[0-9]{9,11}$/.test(phone)) {
    alert("Số điện thoại phải gồm 9 đến 11 chữ số");
    return;
  }

  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự");
    return;
  }

  if (password !== confirmPass) {
    alert("Mật khẩu nhập lại không khớp");
    return;
  }

  try {
    const res = await fetch(
      `${API_URL}/users?username=${encodeURIComponent(username)}`
    );

    const usersByName = await res.json();

    if (usersByName.length > 0) {
      alert("Tên đăng nhập đã tồn tại");
      return;
    }

    const emailRes = await fetch(
      `${API_URL}/users?email=${encodeURIComponent(email)}`
    );

    const usersByEmail = await emailRes.json();

    if (usersByEmail.length > 0) {
      alert("Email đã được sử dụng");
      return;
    }

    const newUser = {
      username: username,
      email: email,
      phone: phone,
      password: password,
      role: "user"
    };

    const addRes = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    const savedUser = await addRes.json();

    console.log("Tài khoản vừa đăng ký:", savedUser);

    alert("Đăng ký thành công");

    document.getElementById("regUser").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPhone").value = "";
    document.getElementById("regPass").value = "";
    document.getElementById("regConfirmPass").value = "";

    closeRegister();
    showLogin();
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    alert("Không đăng ký được. Hãy kiểm tra json-server đã chạy chưa.");
  }
}

async function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("Vui lòng nhập tài khoản và mật khẩu");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/users`);

    const users = await res.json();

    console.log("Danh sách user tìm được:", users);

    const user = users.find(function(u) {
      return (
        (u.username === username || u.email === username) &&
        String(u.password) === String(password)
  );
});

    if (user) {
      currentUser = user;

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      alert("Đăng nhập thành công");

      showUser();
      closeLogin();
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    alert("Không kết nối được API. Hãy kiểm tra json-server đã chạy chưa.");
  }
}

function showUser() {
  let guestMenu = document.getElementById("guestMenu");
  let userMenu = document.getElementById("userMenu");
  let helloUser = document.getElementById("helloUser");
  let adminBtn = document.querySelector(".admin-btn");

  if (currentUser) {
    guestMenu.style.display = "none";
    userMenu.style.display = "flex";
    helloUser.innerHTML = "Xin chào, " + currentUser.username;

    // Đã đăng nhập thì hiện nút admin
    // Nhưng chỉ admin mới được vào, user thường sẽ bị chặn ở goToAdmin()
    if (adminBtn) {
      adminBtn.style.display = "inline-flex";
    }
  } else {
    guestMenu.style.display = "flex";
    userMenu.style.display = "none";

    // Chưa đăng nhập thì ẩn nút admin
    if (adminBtn) {
      adminBtn.style.display = "none";
    }
  }
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

function logout() {
  localStorage.removeItem("currentUser");

  currentUser = null;

  alert("Đã đăng xuất");

  showUser();
}

function addToCart(name, price, image) {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  let check = cart.find(function(item) {
    return item.name === name;
  });

  if (check) {
    check.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();

  alert("Đã thêm sản phẩm vào giỏ hàng");
}

function updateCart() {
  document.getElementById("cartCount").innerHTML = cart.length;
}

function showCart() {
  document.getElementById("cartModal").style.display = "flex";

  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function renderCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
    if (!item.quantity) {
      item.quantity = 1;
    }

    total += item.price * item.quantity;

    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div>
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString()}đ</p>

          <div class="cart-qty">
            <button onclick="decreaseQty(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQty(${index})">+</button>
          </div>
        </div>

    <button onclick="removeCart(${index})">Xóa</button>
  </div>
`;
  });

let ship = isFreeShip ? 0 : shippingFee;

let discountMoney = (total * currentDiscount) / 100;

let totalSpent = getCurrentUserTotalSpent();
let memberRank = getMemberRank(totalSpent);
let memberDiscountMoney = Math.round(total * memberRank.discount / 100);

let finalTotal = total - discountMoney - memberDiscountMoney + ship;
document.getElementById("cartItems").innerHTML = html;

document.getElementById("shippingFee").innerHTML =
  ship.toLocaleString() + "đ";

document.getElementById("discountMoney").innerHTML =
  discountMoney.toLocaleString() + "đ";

let memberDiscountEl = document.getElementById("memberDiscountMoney");
if (memberDiscountEl) {
  memberDiscountEl.innerHTML =
    memberDiscountMoney.toLocaleString() + "đ";
}

let memberRankEl = document.getElementById("memberRankText");
if (memberRankEl) {
  memberRankEl.innerHTML =
    memberRank.icon + " " + memberRank.name + " - giảm " + memberRank.discount + "%";
}

document.getElementById("totalPrice").innerHTML =
  finalTotal.toLocaleString() + "đ";

  localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQty(index) {
  cart[index].quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
  updateCart();
}

function removeCart(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
  updateCart();
}

function showVoucher() {
  let box = document.getElementById("voucherList");

  if (box.style.display === "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
  }
}

function selectVoucher(code) {
  document.getElementById("voucherInput").value = code;
}

function applyVoucher() {
  let code = document.getElementById("voucherInput").value.trim().toUpperCase();

  if (code === "SALE10") {
    currentDiscount = 10;
    isFreeShip = false;
    alert("Áp dụng mã SALE10 thành công");
  } 
  else if (code === "SALE20") {
    currentDiscount = 20;
    isFreeShip = false;
    alert("Áp dụng mã SALE20 thành công");
  } 
  else if (code === "FREESHIP") {
    currentDiscount = 0;
    isFreeShip = true;
    alert("Áp dụng mã FREESHIP thành công");
  } 
  else {
    alert("Mã giảm giá không hợp lệ");
    return;
  }

  renderCart();
}

async function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng trống");
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

  let total = 0;
  if (cart.length === 0) {
  document.getElementById("cartItems").innerHTML = `
    <div class="cart-empty">
      <p>Giỏ hàng của bạn đang trống.</p>
    </div>
  `;

  document.getElementById("shippingFee").innerHTML = "0đ";
  document.getElementById("discountMoney").innerHTML = "0đ";

  let memberDiscountEl = document.getElementById("memberDiscountMoney");
  if (memberDiscountEl) {
    memberDiscountEl.innerHTML = "0đ";
  }

  let memberRankEl = document.getElementById("memberRankText");
  if (memberRankEl) {
    memberRankEl.innerHTML = "👤 Thành viên thường - giảm 0%";
  }

  document.getElementById("totalPrice").innerHTML = "0đ";
  return;
}
  cart.forEach(function(item) {
    if (!item.quantity) {
      item.quantity = 1;
    }

    total += item.price * item.quantity;
  });

  let ship = isFreeShip ? 0 : shippingFee;
  let discountMoney = total * currentDiscount / 100;

  let totalSpent = getCurrentUserTotalSpent();
  let memberRank = getMemberRank(totalSpent);
  let memberDiscountMoney = Math.round(total * memberRank.discount / 100);

  let finalTotal = total - discountMoney - memberDiscountMoney + ship;

  let newOrder = {
  id: Date.now(),
  userId: currentUser.id || "",
  username: currentUser.username,
  customer: currentUser.username,
  phone: phone,
  address: address,
  payment: payment,
  date: new Date().toLocaleString("vi-VN"),
  items: [...cart],
  discount: currentDiscount,
  discountMoney: discountMoney,
  shippingFee: ship,
  memberRank: memberRank.name,
  memberDiscountPercent: memberRank.discount,
  memberDiscountMoney: memberDiscountMoney,
  total: finalTotal,
  status: "Chờ xử lý"
};

  let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];
  historyBuy.push(newOrder);
  localStorage.setItem("historyBuy", JSON.stringify(historyBuy));

  try {
    await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    });
  } catch (error) {
    console.error("Lỗi lưu đơn hàng lên API:", error);
    alert("Đơn hàng đã lưu tạm trên máy, nhưng chưa gửi được lên API.");
  }

  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
  updateCart();

  if (typeof showHistory === "function") {
    showHistory();
  }

  alert("Thanh toán thành công");

  closeCart();
}

async function showHistory() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    document.getElementById("historyBox").innerHTML =
      "<p>Vui lòng đăng nhập để xem lịch sử mua hàng.</p>";
    return;
  }

  let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

  try {
    const res = await fetch(`${API_URL}/orders`);
    const apiOrders = await res.json();

    let myApiOrders = apiOrders.filter(function(order) {
      return (
        String(order.userId) === String(currentUser.id) ||
        order.username === currentUser.username ||
        order.customer === currentUser.username
      );
    });

    historyBuy = myApiOrders.map(function(order) {
      return {
        id: order.id,
        customer: order.customer || order.username || currentUser.username,
        phone: order.phone || "",
        address: order.address || "",
        payment: order.payment || "",
        date: order.date || "",
        items: order.items || [],
        discount: order.discount || 0,
        discountMoney: order.discountMoney || order.discount || 0,
        shippingFee: order.shippingFee || 0,
        total: order.total || 0,
        status: order.status || "Chờ xử lý"
      };
    });

    localStorage.setItem("historyBuy", JSON.stringify(historyBuy));
  } catch (error) {
    console.error("Không tải được lịch sử từ API, dùng dữ liệu localStorage:", error);
  }

  let html = "";

  if (historyBuy.length === 0) {
    html = "<p>Chưa có đơn hàng nào.</p>";
  }

  historyBuy.slice().reverse().forEach(function(order) {
    html += `
      <div class="order">
        <h4>Mã đơn: ${order.id}</h4>
        <p><b>Khách hàng:</b> ${order.customer}</p>
        <p><b>Ngày mua:</b> ${order.date}</p>
        <p><b>Trạng thái:</b> ${order.status}</p>

        ${
          order.status === "Chờ xử lý"
            ? `<button onclick="cancelOrder('${order.id}')">Hủy đơn</button>`
            : ""
        }
          <button onclick="printInvoice('${order.id}')">🧾 In hóa đơn</button>

        <p><b>Tổng tiền:</b> ${Number(order.total).toLocaleString()}đ</p>

        <h5>Sản phẩm:</h5>
    `;

    if (Array.isArray(order.items)) {
      order.items.forEach(function(item) {
        html += `
          <p>
            ${item.name} - ${Number(item.price).toLocaleString()}đ x ${item.quantity || 1}
          </p>
        `;
      });
    } else {
      html += `<p>${order.items}</p>`;
    }

    html += "</div>";
  });

  document.getElementById("historyBox").innerHTML = html;
}

async function cancelOrder(orderId) {
  let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

  let order = historyBuy.find(function(o) {
    return String(o.id) === String(orderId);
  });

  if (!order) {
    alert("Không tìm thấy đơn hàng");
    return;
  }

  if (order.status !== "Chờ xử lý") {
    alert("Chỉ có thể hủy đơn khi đơn đang chờ xử lý");
    return;
  }

  if (!confirm("Bạn có chắc muốn hủy đơn hàng này không?")) {
    return;
  }

  order.status = "Đã hủy";

  localStorage.setItem("historyBuy", JSON.stringify(historyBuy));

  try {
    await fetch(`${API_URL}/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "Đã hủy"
      })
    });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái hủy lên API:", error);
    alert("Đơn đã hủy trên máy, nhưng chưa cập nhật được lên trang admin.");
  }

  showHistory();

  alert("Đã hủy đơn hàng");
}

let hasScrolledToProducts = false;

function searchBook() {
  let keyword = document.getElementById("searchInput").value
    .toLowerCase()
    .trim();

  let cards = document.querySelectorAll(".card");

  cards.forEach(function(card) {
    let title = card.querySelector("h3").innerText.toLowerCase();

    if (keyword === "" || title.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  if (keyword !== "" && !hasScrolledToProducts) {
    document.getElementById("productSection").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    hasScrolledToProducts = true;
  }

  if (keyword === "") {
    hasScrolledToProducts = false;
  }
}

function filterCategory(category) {
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let bookCategory = card.dataset.category;

    if (category === "all" || bookCategory === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function toggleBooks(className, btnId) {
  let books = document.querySelectorAll(className);

  let btn = document.getElementById(btnId);

  let isOpen = btn.innerHTML === "Thu gọn";

  books.forEach((book) => {
    book.style.display = isOpen ? "none" : "block";
  });

  btn.innerHTML = isOpen ? "Xem tất cả" : "Thu gọn";
}

// WISHLIST
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addWishlist(bookName) {
  if (wishlist.includes(bookName)) {
    alert("Sách đã có trong danh sách yêu thích!");
    return;
  }

  wishlist.push(bookName);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  document.getElementById("wishlistCount").innerHTML = wishlist.length;

  alert(bookName + " đã được thêm vào yêu thích!");
}

function showWishlist() {
  let wishlistItems = document.getElementById("wishlistItems");

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
      <div class="wishlist-empty">
        <div class="wishlist-empty-icon">♡</div>
        <h3>Chưa có sách yêu thích</h3>
        <p>Hãy bấm nút ❤️ Yêu thích ở các quyển sách bạn muốn lưu lại.</p>
      </div>
    `;
  } else {
    let html = `
      <div class="wishlist-summary">
        Bạn đang có <b>${wishlist.length}</b> sách trong danh sách yêu thích
      </div>

      <div class="wishlist-list">
    `;

    for (let i = 0; i < wishlist.length; i++) {
      html += `
        <div class="wishlist-card">
          <div class="wishlist-icon">❤️</div>

          <div class="wishlist-info">
            <h4>${wishlist[i]}</h4>
            <p>Sách đã được lưu vào danh sách yêu thích</p>
          </div>

          <button class="wishlist-remove-btn" onclick="removeWishlist(${i})">
            Xóa
          </button>
        </div>
      `;
    }

    html += `</div>`;

    wishlistItems.innerHTML = html;
  }

  document.getElementById("wishlistModal").style.display = "flex";
}

function closeWishlist() {
  document.getElementById("wishlistModal").style.display = "none";
}

function removeWishlist(index) {
  wishlist.splice(index, 1);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  document.getElementById("wishlistCount").innerHTML = wishlist.length;

  showWishlist();
}

// ĐÁNH GIÁ

function renderReview(box, data) {
  let commentList = box.querySelector(".comment-list");

  let div = document.createElement("div");

  div.className = "comment-item";

  div.innerHTML = `
        <strong>${data.name}</strong>

        <div class="comment-rating">
            ${"★".repeat(data.rating)}
        </div>

        <p>${data.comment}</p>

        <div class="comment-date">
            ${data.date}
        </div>

        <button
            class="delete-review"
            onclick="deleteReview(this)"
        >
            Xóa
        </button>
    `;

  commentList.prepend(div);
}

function deleteReview(btn) {
  if (confirm("Xóa bình luận này?")) {
    btn.parentElement.remove();
  }
}
  
// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode"),
  );
}

function filterCategory(category) {
  const books = document.querySelectorAll(".card");

  // Loại bỏ các class ẩn để đảm bảo tất cả sách có thể hiển thị khi lọc
  books.forEach((book) => {
    book.classList.remove(
      "hidden-featured",
      "hidden-new",
      "hidden-sale",
      "hidden-classic",
    );

    const bookCategories = book.getAttribute("data-category");

    if (category === "all") {
      book.style.display = "block";
    } else {
      // Kiểm tra nếu danh mục của sách chứa category được chọn
      if (bookCategories && bookCategories.includes(category)) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    }
  });

  // Cuộn trang xuống khu vực danh sách sách để người dùng thấy kết quả
  document.getElementById("bookGrid").scrollIntoView({ behavior: "smooth" });
}

// CHUYỂN TRANG
function goToDetail(
  name,
  image,
  price,
  author,
  publisher,
  desc
){

  let book = {

    name: name,

    image: image,

    price: price,

    author: author,

    publisher: publisher,

    desc: desc
  };

  // lưu sách đang chọn
  localStorage.setItem(
    "bookDetail",
    JSON.stringify(book)
  );

  // chuyển trang
  window.location.href =
    "book-detail.html";
}

function sortBooks() {
  let sortValue = document.getElementById("sortSelect").value;
  let grid = document.getElementById("bookGrid");
  let cards = Array.from(grid.querySelectorAll(".card"));

  cards.sort(function(a, b) {
    let priceA = Number(a.getAttribute("data-price"));
    let priceB = Number(b.getAttribute("data-price"));

    let nameA = a.querySelector("h3").innerText;
    let nameB = b.querySelector("h3").innerText;

    if (sortValue === "price-asc") {
      return priceA - priceB;
    }

    if (sortValue === "price-desc") {
      return priceB - priceA;
    }

    if (sortValue === "name-asc") {
      return nameA.localeCompare(nameB);
    }

    return 0;
  });

  cards.forEach(function(card) {
    grid.appendChild(card);
  });

  filterByPrice();
}

function filterByPrice() {
  let value = document.getElementById("priceFilter").value;

  let cards = document.querySelectorAll("#bookGrid .card");

  cards.forEach(function(card) {
    let price = Number(card.dataset.price);

    if (value === "") {
      card.style.display = "block";
    } 
    else if (value === "under100") {
      card.style.display = price < 100000 ? "block" : "none";
    } 
    else if (value === "100to120") {
      card.style.display = price >= 100000 && price <= 120000 ? "block" : "none";
    } 
    else if (value === "over120") {
      card.style.display = price > 120000 ? "block" : "none";
    }
  });
}
async function loadBooksFromAPI() {
  try {
    const res = await fetch(`${API_URL}/books`);
    const books = await res.json();

    const bookGrid = document.getElementById("bookGrid");

    if (!bookGrid) return;

    bookGrid.innerHTML = "";

    books.forEach(function(book) {
      const card = document.createElement("div");

      card.className = "card";
      card.setAttribute("data-category", book.category);
      card.setAttribute("data-price", book.price);

      card.innerHTML = `
        <div class="image-wrapper">
          <img src="${book.image}">
          <span class="badge" style="background:#ef4444">Bán chạy</span>
        </div>

        <div class="p">
          <h3>${book.name}</h3>

          <p class="author">${book.author}</p>

          <div class="rating">
            <span>★</span> 5.0
            <small>(234 đánh giá)</small>
          </div>

          <div class="price">
            <strong>${Number(book.price).toLocaleString()}đ</strong>
          </div>

          <p class="sold">Đã bán 1.2k</p>

          <button class="wishlist-btn">
            ❤️ Yêu thích
          </button>

          <button class="add-cart-btn">
            Thêm vào giỏ
          </button>
        </div>
      `;

      const img = card.querySelector("img");
      img.onclick = function() {
        openBookDetail(
          book.name,
          book.image,
          Number(book.price),
          book.author,
          book.publisher,
          book.desc
        );
      };

      const wishBtn = card.querySelector(".wishlist-btn");
      wishBtn.onclick = function() {
        addWishlist(book.name);
      };

      const cartBtn = card.querySelector(".add-cart-btn");
      cartBtn.onclick = function() {
        addToCart(book.name, Number(book.price), book.image);
      };

      bookGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Lỗi tải sách từ API:", error);
    alert("Không tải được danh sách sách từ API. Hãy kiểm tra json-server đã chạy chưa.");
  }
}
window.onload = function () {
  updateCart();
  showUser();

  const wishlistCount = document.getElementById("wishlistCount");
  if (wishlistCount) {
    wishlistCount.innerHTML = wishlist.length;
  }

  if (typeof showHistory === "function") {
    showHistory();
  }

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  loadBooksFromAPI();
};

function showHistoryModal() {
  document.getElementById("historyModal").style.display = "flex";
  showHistory();
}

function closeHistoryModal() {
  document.getElementById("historyModal").style.display = "none";
}
function openBookDetail(name, image, price, author, publisher, desc) {
  let book = {
    name: name,
    image: image,
    price: price,
    author: author,
    publisher: publisher,
    desc: desc
  };

  localStorage.setItem("bookDetail", JSON.stringify(book));

  window.location.href = "book-detail.html";
}

function printInvoice(orderId) {
  let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

  let order = historyBuy.find(function(o) {
    return String(o.id) === String(orderId);
  });

  if (!order) {
    alert("Không tìm thấy đơn hàng để in hóa đơn");
    return;
  }

  let itemsHtml = "";

  if (Array.isArray(order.items)) {
    order.items.forEach(function(item) {
      itemsHtml += `
        <tr>
          <td>${item.name}</td>
          <td>${Number(item.price).toLocaleString()}đ</td>
          <td>${item.quantity || 1}</td>
          <td>${Number(item.price * (item.quantity || 1)).toLocaleString()}đ</td>
        </tr>
      `;
    });
  }

  let invoiceWindow = window.open("", "_blank");

  invoiceWindow.document.write(`
    <html>
      <head>
        <title>Hóa đơn ${order.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #111;
          }

          h1 {
            text-align: center;
            color: #2563eb;
          }

          .info {
            margin-bottom: 20px;
            line-height: 1.8;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }

          th {
            background: #f1f5f9;
          }

          .total {
            text-align: right;
            margin-top: 20px;
            font-size: 22px;
            font-weight: bold;
            color: #ef4444;
          }

          .footer {
            margin-top: 40px;
            text-align: center;
            color: #666;
          }

          @media print {
            button {
              display: none;
            }
          }
        </style>
      </head>

      <body>
        <h1>HÓA ĐƠN MUA SÁCH</h1>

        <div class="info">
          <p><b>Mã đơn hàng:</b> ${order.id}</p>
          <p><b>Khách hàng:</b> ${order.customer || order.username || "Chưa cập nhật"}</p>
          <p><b>Số điện thoại:</b> ${order.phone || "Chưa cập nhật"}</p>
          <p><b>Địa chỉ:</b> ${order.address || "Chưa cập nhật"}</p>
          <p><b>Phương thức thanh toán:</b> ${order.payment || "Chưa cập nhật"}</p>
          <p><b>Ngày đặt:</b> ${order.date || "Chưa cập nhật"}</p>
          <p><b>Trạng thái:</b> ${order.status || "Chờ xử lý"}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="total">
          Tổng tiền: ${Number(order.total || 0).toLocaleString()}đ
        </div>

        <div class="footer">
          <p>Cảm ơn quý khách đã mua hàng tại BookStore!</p>
        </div>

        <button onclick="window.print()">In hóa đơn</button>
      </body>
    </html>
  `);

  invoiceWindow.document.close();
}
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
function showMemberInfo() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Vui lòng đăng nhập để xem thông tin hội viên");
    return;
  }

  let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

  let myOrders = historyBuy.filter(function(order) {
    return (
      order.customer === currentUser.username ||
      order.username === currentUser.username ||
      String(order.userId) === String(currentUser.id)
    );
  });

  let validOrders = myOrders.filter(function(order) {
    return order.status !== "Đã hủy";
  });

  let totalSpent = validOrders.reduce(function(sum, order) {
    return sum + Number(order.total || 0);
  }, 0);

  let rank = getMemberRank(totalSpent);

  alert(
    rank.icon + " " + rank.name +
    "\nTổng chi tiêu: " + totalSpent.toLocaleString() + "đ" +
    "\nƯu đãi hội viên: Giảm " + rank.discount + "%"
  );
}