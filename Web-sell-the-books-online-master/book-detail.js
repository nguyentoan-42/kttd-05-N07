let currentBook = JSON.parse(localStorage.getItem("bookDetail"));

let currentDiscount = 0;

let shippingFee = 30000;

let isFreeShip = false;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// LOAD DETAIL
function loadBookDetail() {
  let book = currentBook;

  if (!book) return;

  document.getElementById("detailImage").src = book.image;

  document.getElementById("detailName").innerHTML = book.name;

  document.getElementById("detailAuthor").innerHTML = book.author;

  document.getElementById("detailPublisher").innerHTML = book.publisher;

  document.getElementById("infoAuthor").innerHTML = book.author;

  document.getElementById("infoPublisher").innerHTML = book.publisher;

  document.getElementById("detailPrice").innerHTML =
    book.price.toLocaleString() + "đ";

  document.getElementById("detailDesc").innerHTML = book.desc;

  document.getElementById("addCartBtn").onclick = function () {
    addToCart(book.name, book.price, book.image);
  };

  document.getElementById("buyNowBtn").onclick = function () {
    addToCart(book.name, book.price, book.image);
    window.location.href =
        "cart.html";
  };

  document.getElementById("wishBtn").onclick = function () {
    addWishlist(book.name);
  };
}

// ADD CART
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find((p) => p.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1,
      selected: true,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("✅ Đã thêm vào giỏ hàng");
}

// UPDATE CART
function updateCart() {
  document.getElementById("cartCount").innerHTML = cart.length;
}

// SHOW CART
function showCart() {
  document.getElementById("cartModal").style.display = "flex";

  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

// RENDER CART
function renderCart() {
  let html = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    html += `

      <div class="cart-item">

        <img src="${item.image}">

        <div class="cart-info">

          <h3>${item.name}</h3>

          <p>
            ${item.price.toLocaleString()}đ
          </p>

          <div class="qty">

            <button onclick="decreaseQty(${index})">
              -
            </button>

            <span>${item.quantity}</span>

            <button onclick="increaseQty(${index})">
              +
            </button>

          </div>

        </div>

        <button onclick="removeCart(${index})">
          Xóa
        </button>

      </div>
    `;
  });

  let ship = isFreeShip ? 0 : shippingFee;

  let discountMoney = (total * currentDiscount) / 100;

  let finalTotal = total - discountMoney + ship;

  document.getElementById("cartItems").innerHTML = html;

  document.getElementById("totalPrice").innerHTML =
    finalTotal.toLocaleString() + "đ";
  document.getElementById("shippingFee").innerHTML =
    ship.toLocaleString() + "đ";

  document.getElementById("discountMoney").innerHTML =
    discountMoney.toLocaleString() + "đ";
}

// QTY
function increaseQty(index) {
  cart[index].quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// REMOVE
function removeCart(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();

  updateCart();
}

// CHECKOUT
function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng trống");
    return;
  }

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let phone = document.getElementById("customerPhone").value.trim();
  let address = document.getElementById("customerAddress").value.trim();
  let payment = document.getElementById("paymentMethod").value;

  if (phone === "" || address === "") {
    alert("Vui lòng nhập số điện thoại và địa chỉ giao hàng");
    return;
  }

  let total = 0;

  cart.forEach(function (item) {
    total += item.price * item.quantity;
  });

  let finalTotal = total;

  if (typeof currentDiscount !== "undefined") {
    finalTotal = total - (total * currentDiscount) / 100;
  }

  let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

  let newOrder = {
    id: Date.now(),
    customer: currentUser.username,
    phone: phone,
    address: address,
    payment: payment,
    date: new Date().toLocaleString(),
    items: [...cart],
    total: finalTotal,
    status: "Chờ xử lý",
  };

  historyBuy.push(newOrder);

  localStorage.setItem("historyBuy", JSON.stringify(historyBuy));

  cart = [];

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
  updateCart();

  alert("Thanh toán thành công");
}

// WISHLIST
function addWishlist(bookName) {
  if (wishlist.includes(bookName)) {
    alert("Đã có trong yêu thích");

    return;
  }

  wishlist.push(bookName);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  alert("Đã thêm yêu thích");
}

// REVIEW
function selectRating(star, rating) {
  let box = star.closest(".review-box");

  box.dataset.rating = rating;

  let stars = box.querySelectorAll(".stars span");

  stars.forEach((s, index) => {
    s.innerHTML = index < rating ? "★" : "☆";
  });
}

function addReview(btn) {
  let box = btn.closest(".review-box");

  let name = box.querySelector(".review-name").value;

  let comment = box.querySelector(".comment-input").value;

  let rating = Number(box.dataset.rating || 0);

  if (name === "" || comment === "") {
    alert("Nhập đầy đủ");

    return;
  }

  if (rating === 0) {
    alert("Chọn số sao");

    return;
  }

  if (!currentBook) {
    alert("Không tìm thấy thông tin sách");

    return;
  }

  let today = new Date().toLocaleString();

  let reviewData = {
    bookName: currentBook.name,
    name: name,
    comment: comment,
    rating: rating,
    date: today,
  };

  let allReviews = JSON.parse(localStorage.getItem("bookReviews")) || [];

  allReviews.push(reviewData);

  localStorage.setItem("bookReviews", JSON.stringify(allReviews));

  renderReview(box, reviewData);

  updateAverage(box);

  box.querySelector(".review-name").value = "";

  box.querySelector(".comment-input").value = "";

  box.dataset.rating = 0;

  let stars = box.querySelectorAll(".stars span");

  stars.forEach(function (star) {
    star.innerHTML = "☆";
  });
}

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
  `;

  commentList.prepend(div);
}

function updateAverage(box) {
  let ratings = box.querySelectorAll(".comment-rating");

  if (ratings.length === 0) return;

  let total = 0;

  ratings.forEach((r) => {
    total += r.innerText.length;
  });

  let avg = (total / ratings.length).toFixed(1);

  box.querySelector(".avg-rating").innerText = avg;

  box.querySelector(".review-count").innerText = ratings.length;
}

function loadBookReviews() {
  let box = document.querySelector(".review-box");

  if (!box || !currentBook) return;

  let allReviews = JSON.parse(localStorage.getItem("bookReviews")) || [];

  let bookReviews = allReviews.filter(function (review) {
    return review.bookName === currentBook.name;
  });

  bookReviews.forEach(function (review) {
    renderReview(box, review);
  });

  updateAverage(box);
}

// VOUCHER
function showVoucher() {
  let box = document.getElementById("voucherList");

  box.style.display = box.style.display === "block" ? "none" : "block";
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
  } else if (code === "SALE20") {
    currentDiscount = 20;
    isFreeShip = false;
    alert("Áp dụng mã SALE20 thành công");
  } else if (code === "FREESHIP") {
    currentDiscount = 0;
    isFreeShip = true;
    alert("Áp dụng mã FREESHIP thành công");
  } else {
    alert("Mã giảm giá không hợp lệ");
    return;
  }

  renderCart();
}

// USER
function showUser() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let guestMenu = document.getElementById("guestMenu");

  let userMenu = document.getElementById("userMenu");

  let helloUser = document.getElementById("helloUser");

  if (currentUser) {
    guestMenu.style.display = "none";

    userMenu.style.display = "flex";

    helloUser.innerHTML = "Xin chào, " + currentUser.username;
  } else {
    guestMenu.style.display = "flex";

    userMenu.style.display = "none";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");

  alert("Đã đăng xuất");

  showUser();
}

// LOAD
window.onload = function () {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
  loadBookDetail();

  updateCart();

  showUser();

  loadBookReviews();
};
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode"),
  );
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