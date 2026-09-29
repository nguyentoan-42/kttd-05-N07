const API_URL = "http://localhost:3000";
// ── ADMIN AUTH GUARD ──
(function() {
  if (!window.location.pathname.endsWith("admin.html")) return;
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!user || user.role !== "admin") {
    alert("Bạn không có quyền truy cập trang quản trị!");
    window.location.replace("index.html");
  }
})();

// ── DATA ──
const booksData = [
  { id: 1, name: 'Lời Thứ Tội', author: 'Nguyễn Nhật Ánh', cat: 'Văn học', price: 89000, origPrice: 109000, stock: 45, sold: 312, status: 'Còn hàng' },
  { id: 2, name: 'Atomic Habits', author: 'James Clear', cat: 'Kỹ năng sống', price: 120000, origPrice: 150000, stock: 78, sold: 587, status: 'Còn hàng' },
  { id: 3, name: 'Đắc Nhân Tâm', author: 'Dale Carnegie', cat: 'Kỹ năng sống', price: 95000, origPrice: 115000, stock: 0, sold: 1240, status: 'Hết hàng' },
  { id: 4, name: 'Mindset - Tư Duy Thành Công', author: 'Carol S. Dweck', cat: 'Kỹ năng sống', price: 108000, origPrice: 130000, stock: 32, sold: 405, status: 'Còn hàng' },
  { id: 5, name: 'Harry Potter 1', author: 'J.K. Rowling', cat: 'Văn học', price: 135000, origPrice: 165000, stock: 20, sold: 890, status: 'Còn hàng' },
  { id: 6, name: 'Doraemon Tập 1', author: 'Fujiko F. Fujio', cat: 'Manga', price: 35000, origPrice: 40000, stock: 150, sold: 2100, status: 'Còn hàng' },
  { id: 7, name: 'English Grammar In Use', author: 'Raymond Murphy', cat: 'Ngoại ngữ', price: 185000, origPrice: 210000, stock: 55, sold: 320, status: 'Còn hàng' },
  { id: 8, name: 'Bí Mật Tư Duy Triệu Phú', author: 'T. Harv Eker', cat: 'Kỹ năng sống', price: 99000, origPrice: 120000, stock: 0, sold: 678, status: 'Hết hàng' },
  { id: 9, name: 'Tuổi Thơ Dữ Dội', author: 'Phùng Quán', cat: 'Văn học', price: 75000, origPrice: 90000, stock: 30, sold: 210, status: 'Còn hàng' },
  { id: 10, name: 'Cây Cam Ngọt Của Tôi', author: 'José Mauro de Vasconcelos', cat: 'Văn học', price: 85000, origPrice: 100000, stock: 60, sold: 450, status: 'Còn hàng' },
  { id: 11, name: 'Nhà Giả Kim', author: 'Paulo Coelho', cat: 'Văn học', price: 79000, origPrice: 95000, stock: 40, sold: 780, status: 'Còn hàng' },
  { id: 12, name: 'Sapiens', author: 'Yuval Noah Harari', cat: 'Khoa học', price: 199000, origPrice: 240000, stock: 15, sold: 330, status: 'Còn hàng' },
];

let ordersData = [
  { id: 'FHS-001', customer: 'Nguyễn Văn A', phone: '0901 111 222', address: '12 Lê Lợi, Q1, TP.HCM', items: 'Atomic Habits, Đắc Nhân Tâm', total: 215000, date: '19/05/2026', status: 'Chờ xử lý', note: '' },
  { id: 'FHS-002', customer: 'Trần Thị B', phone: '0912 333 444', address: '45 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội', items: 'Harry Potter 1', total: 135000, date: '18/05/2026', status: 'Đang giao', note: '' },
  { id: 'FHS-003', customer: 'Lê Văn C', phone: '0923 555 666', address: '78 Nguyễn Huệ, Đà Nẵng', items: 'Doraemon Tập 1 x3', total: 105000, date: '18/05/2026', status: 'Hoàn thành', note: '' },
  { id: 'FHS-004', customer: 'Phạm Thu D', phone: '0934 777 888', address: '23 Hùng Vương, Cần Thơ', items: 'English Grammar In Use', total: 185000, date: '17/05/2026', status: 'Đã hủy', note: 'Khách hàng đổi ý' },
  { id: 'FHS-005', customer: 'Hoàng Minh E', phone: '0945 999 000', address: '56 Điện Biên Phủ, Q3, TP.HCM', items: 'Mindset, Lời Thứ Tội', total: 197000, date: '17/05/2026', status: 'Đang giao', note: '' },
  { id: 'FHS-006', customer: 'Vũ Quỳnh F', phone: '0956 111 333', address: '90 Bà Triệu, Hai Bà Trưng, Hà Nội', items: 'Bí Mật Tư Duy', total: 99000, date: '16/05/2026', status: 'Hoàn thành', note: '' },
  { id: 'FHS-007', customer: 'Đỗ Hương G', phone: '0967 222 444', address: '34 Lý Thường Kiệt, Huế', items: 'Atomic Habits', total: 120000, date: '15/05/2026', status: 'Chờ xử lý', note: '' },
  { id: 'FHS-008', customer: 'Bùi Thanh H', phone: '0978 333 555', address: '67 Trường Chinh, Đống Đa, Hà Nội', items: 'Doraemon x5', total: 175000, date: '15/05/2026', status: 'Hoàn thành', note: '' },
  { id: 'FHS-009', customer: 'Ngô Thu I', phone: '0989 444 666', address: '11 Nguyễn Trãi, Q5, TP.HCM', items: 'Nhà Giả Kim, Cây Cam Ngọt', total: 164000, date: '14/05/2026', status: 'Hoàn thành', note: '' },
  { id: 'FHS-010', customer: 'Đinh Văn K', phone: '0901 555 777', address: '22 Lê Duẩn, Thanh Khê, Đà Nẵng', items: 'Sapiens', total: 199000, date: '14/05/2026', status: 'Đang giao', note: '' },
  { id: 'FHS-011', customer: 'Trương Thị L', phone: '0912 666 888', address: '88 Phan Đình Phùng, Hà Nội', items: 'Tuổi Thơ Dữ Dội x2', total: 150000, date: '13/05/2026', status: 'Chờ xử lý', note: 'Giao buổi sáng' },
  { id: 'FHS-012', customer: 'Mai Anh M', phone: '0923 777 999', address: '44 Võ Văn Tần, Q3, TP.HCM', items: 'English Grammar In Use', total: 185000, date: '12/05/2026', status: 'Hoàn thành', note: '' },
];

const usersData = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an@gmail.com', phone: '0901 111 222', role: 'Khách hàng', date: '01/01/2025', status: 'Hoạt động' },
  { id: 2, name: 'Trần Bích Loan', email: 'loan@gmail.com', phone: '0912 333 444', role: 'Khách hàng', date: '05/02/2025', status: 'Hoạt động' },
  { id: 3, name: 'Lê Minh Tuấn', email: 'tuan@gmail.com', phone: '0923 555 666', role: 'Admin', date: '01/01/2024', status: 'Hoạt động' },
  { id: 4, name: 'Phạm Hồng Nhung', email: 'nhung@gmail.com', phone: '0934 777 888', role: 'Khách hàng', date: '10/03/2025', status: 'Bị khóa' },
  { id: 5, name: 'Hoàng Anh Tuấn', email: 'hatuan@gmail.com', phone: '0945 999 000', role: 'Khách hàng', date: '20/04/2025', status: 'Hoạt động' },
  { id: 6, name: 'Vũ Thanh Trang', email: 'trang@gmail.com', phone: '0956 111 333', role: 'Khách hàng', date: '01/05/2025', status: 'Hoạt động' },
];

const categoriesData = [
  { id: 1, name: 'Văn học', count: 28, status: 'Hiển thị' },
  { id: 2, name: 'Kỹ năng sống', count: 35, status: 'Hiển thị' },
  { id: 3, name: 'Ngoại ngữ', count: 22, status: 'Hiển thị' },
  { id: 4, name: 'Thiếu nhi', count: 18, status: 'Hiển thị' },
  { id: 5, name: 'Manga', count: 31, status: 'Hiển thị' },
  { id: 6, name: 'Khoa học', count: 8, status: 'Ẩn' },
];

let currentEditBook = null;
let currentEditUser = null;
let currentEditOrder = null;
let currentEditCategory = null;

function saveAdminBooks() {
  localStorage.setItem("adminBooks", JSON.stringify(booksData));
}

// ── PAGINATION STATE ──
const pagination = {
  orders: { page: 1, perPage: 6 },
  books: { page: 1, perPage: 8 },
};
let filteredOrders = [...ordersData];
function loadClientOrdersToAdmin() {
  let historyBuy = JSON.parse(localStorage.getItem("historyBuy")) || [];

  historyBuy.forEach(function(order) {
    let exist = ordersData.find(function(o) {
      return String(o.id) === String(order.id);
    });

    if (!exist) {
      let itemsText = order.items.map(function(item) {
        return item.name + " x" + (item.quantity || 1);
      }).join(", ");

      ordersData.unshift({
        id: String(order.id),
        customer: order.customer || "Khách hàng",
        phone: order.phone || "Chưa cập nhật",
        address: order.address || "Chưa cập nhật",
        items: itemsText,
        total: order.total || 0,
        date: order.date || new Date().toLocaleString(),
        status: order.status || "Chờ xử lý",
        note: "Đơn từ trang khách hàng"
      });
    }
  });

  filteredOrders = [...ordersData];
}
let filteredBooks = [...booksData];

// ── RENDER BOOKS ──
function renderBooks(data) {
  filteredBooks = data;
  const { page, perPage } = pagination.books;
  const total = Math.ceil(data.length / perPage);
  pagination.books.page = Math.min(page, total || 1);
  const start = (pagination.books.page - 1) * perPage;
  const slice = data.slice(start, start + perPage);

  const tbody = document.getElementById('books-tbody');
  tbody.innerHTML = slice.map((b, i) => `
    <tr>
      <td>${start + i + 1}</td>
      <td>
        <div class="book-info">
          <div class="book-thumb">📖</div>
          <div>
            <div class="book-name">${b.name}</div>
            <div class="book-author">${b.author}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-pending" style="font-size:11px">${b.cat}</span></td>
      <td><strong>${b.price.toLocaleString()}đ</strong><br><small style="text-decoration:line-through;color:var(--text-muted)">${b.origPrice.toLocaleString()}đ</small></td>
      <td><span style="color:${b.stock === 0 ? 'var(--primary)' : 'var(--accent2)'}; font-weight:700">${b.stock}</span></td>
      <td>${b.sold.toLocaleString()}</td>
      <td><span class="badge ${b.status === 'Còn hàng' ? 'badge-done' : 'badge-cancelled'}">${b.status}</span></td>
      <td>
        <button class="btn btn-success btn-sm" onclick="editBook(${b.id})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteBook(${b.id})">🗑️</button>
      </td>
    </tr>
  `).join('');

  renderPagination('books-pagination', pagination.books.page, total, (p) => {
    pagination.books.page = p;
    renderBooks(filteredBooks);
  });
}

function filterBooks(q) {
  const filtered = booksData.filter(b =>
    b.name.toLowerCase().includes(q.toLowerCase()) ||
    b.author.toLowerCase().includes(q.toLowerCase())
  );
  pagination.books.page = 1;
  renderBooks(filtered);
}

function filterByCategory(cat) {
  const filtered = cat ? booksData.filter(b => b.cat === cat) : booksData;
  pagination.books.page = 1;
  renderBooks(filtered);
}

function editBook(id) {
  const b = booksData.find(x => x.id === id);
  if (!b) return;
  document.getElementById('input-bookname').value = b.name;
  document.getElementById('input-author').value = b.author;
  document.getElementById('input-price').value = b.price;
  document.getElementById('input-orig-price').value = b.origPrice;
  document.getElementById('input-stock').value = b.stock;
  currentEditBook = id;
  openModal('modal-add-book');
}

function deleteBook(id) {
  const idx = booksData.findIndex(x => x.id === id);
  if (idx > -1) {
    booksData.splice(idx, 1);
    renderBooks(booksData);
    saveAdminBooks();
    showToast('Đã xóa sách!', 'error');
  }
}

function saveBook() {
  const name = document.getElementById('input-bookname').value.trim();
  if (!name) { showToast('Vui lòng nhập tên sách!', 'error'); return; }
  if (currentEditBook) {
    const b = booksData.find(x => x.id === currentEditBook);
    if (b) {
      b.name = name;
      b.author = document.getElementById('input-author').value;
      b.price = parseInt(document.getElementById('input-price').value) || 0;
      b.origPrice = parseInt(document.getElementById('input-orig-price').value) || 0;
      b.stock = parseInt(document.getElementById('input-stock').value) || 0;
    }
    showToast('Cập nhật sách thành công!', 'success');
  } else {
    booksData.push({
      id: Date.now(), name,
      author: document.getElementById('input-author').value || 'Chưa rõ',
      cat: document.getElementById('input-category').value,
      price: parseInt(document.getElementById('input-price').value) || 0,
      origPrice: parseInt(document.getElementById('input-orig-price').value) || 0,
      stock: parseInt(document.getElementById('input-stock').value) || 0,
      sold: 0, status: document.getElementById('input-status').value
    });
    showToast('Thêm sách thành công!', 'success');
  }
  renderBooks(booksData);
  saveAdminBooks();
  closeModal('modal-add-book');
  currentEditBook = null;
}

async function loadOrdersFromAPI() {
  try {
    const res = await fetch(`${API_URL}/orders`);
    const apiOrders = await res.json();

    const formattedOrders = apiOrders.map(order => {
      let itemsText = "";

      if (Array.isArray(order.items)) {
        itemsText = order.items.map(item => {
          return item.name + " x" + (item.quantity || 1);
        }).join(", ");
      } else {
        itemsText = order.items || "Chưa có sản phẩm";
      }

      return {
        id: String(order.id),
        customer: order.customer || order.username || "Khách hàng",
        phone: order.phone || "Chưa cập nhật",
        address: order.address || "Chưa cập nhật",
        items: itemsText,
        total: order.total || 0,
        date: order.date || "Chưa cập nhật",
        status: order.status || "Chờ xử lý",
        note: order.note || "Đơn hàng từ API",
        source: "api"
      };
    });

    ordersData = ordersData.filter(order => order.source !== "api");

    ordersData.unshift(...formattedOrders);

    filteredOrders = [...ordersData];

    renderOrders(filteredOrders);
  } catch (error) {
    console.error("Lỗi tải đơn hàng từ API:", error);
    showToast("Không tải được đơn hàng từ API", "error");
  }
}

// ── RENDER ORDERS ──
function renderOrders(data) {
  filteredOrders = data;
  const { page, perPage } = pagination.orders;
  const total = Math.ceil(data.length / perPage);
  pagination.orders.page = Math.min(page, total || 1);
  const start = (pagination.orders.page - 1) * perPage;
  const slice = data.slice(start, start + perPage);

  const statusClass = {
    'Chờ xử lý': 'badge-pending',
    'Đang giao': 'badge-shipping',
    'Hoàn thành': 'badge-done',
    'Đã hủy': 'badge-cancelled'
  };
  document.getElementById('orders-tbody').innerHTML = slice.map(o => `
    <tr>
      <td><strong style="color:var(--primary)">${o.id}</strong></td>
      <td>
        <div style="font-weight:600">${o.customer}</div>
        <div style="font-size:11px;color:var(--text-muted)">${o.phone}</div>
      </td>
      <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${o.items}">${o.items}</td>
      <td><strong>${o.total.toLocaleString()}đ</strong></td>
      <td>${o.date}</td>
      <td><span class="badge ${statusClass[o.status] || ''}">${o.status}</span></td>
      <td style="white-space:nowrap">
        <button class="btn btn-success btn-sm" onclick="editOrder('${o.id}')" title="Chỉnh sửa">✏️</button>
        ${o.status !== 'Đã hủy' && o.status !== 'Hoàn thành' ? `<button class="btn btn-warning btn-sm" onclick="cancelOrder('${o.id}')" title="Hủy đơn">🚫 Hủy</button>` : ''}
      </td>
    </tr>
  `).join('');

  renderPagination('orders-pagination', pagination.orders.page, total, (p) => {
    pagination.orders.page = p;
    renderOrders(filteredOrders);
  });
}

function filterOrders() {
  const q = (document.getElementById('orders-search')?.value || '').toLowerCase().trim();
  const status = document.getElementById('orders-status')?.value || '';
  const dateFrom = document.getElementById('orders-date-from')?.value || '';
  const dateTo = document.getElementById('orders-date-to')?.value || '';

  const filtered = ordersData.filter(o => {
    const matchQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || (o.phone && o.phone.toLowerCase().includes(q));
    const matchStatus = !status || o.status === status;
    let matchDate = true;
    if (dateFrom || dateTo) {
      const parts = (o.date || '').split('/');
      const oDate = parts.length === 3 ? new Date(parts[2], parts[1] - 1, parts[0]) : null;
      if (oDate) {
        if (dateFrom) matchDate = matchDate && oDate >= new Date(dateFrom);
        if (dateTo)   matchDate = matchDate && oDate <= new Date(dateTo);
      }
    }
    return matchQ && matchStatus && matchDate;
  });
  pagination.orders.page = 1;
  renderOrders(filtered);
}

// ── EDIT ORDER ──
function editOrder(id) {
  const o = ordersData.find(x => x.id === id);
  if (!o) return;
  document.getElementById('order-id-display').textContent = o.id;
  document.getElementById('order-customer').value = o.customer;
  document.getElementById('order-phone').value = o.phone || '';
  document.getElementById('order-address').value = o.address || '';
  document.getElementById('order-items').value = o.items;
  document.getElementById('order-total').value = o.total;
  document.getElementById('order-date').value = o.date;
  document.getElementById('order-status').value = o.status;
  document.getElementById('order-note').value = o.note || '';
  currentEditOrder = id;
  openModal('modal-edit-order');
}
function addOrder() {

  currentEditOrder = null;

  document.getElementById('order-id-display').textContent =
    'Tạo mới';

  document.getElementById('order-customer').value = '';
  document.getElementById('order-phone').value = '';
  document.getElementById('order-address').value = '';
  document.getElementById('order-items').value = '';
  document.getElementById('order-total').value = '';
  document.getElementById('order-date').value = '';
  document.getElementById('order-status').value = 'Chờ xử lý';
  document.getElementById('order-note').value = '';

  openModal('modal-edit-order');
}

function saveOrder() {

  const customer =
    document.getElementById('order-customer').value.trim();

  if (!customer) {
    showToast('Vui lòng nhập tên khách hàng!', 'error');
    return;
  }

  const data = {
    customer,
    phone: document.getElementById('order-phone').value.trim(),
    address: document.getElementById('order-address').value.trim(),
    items: document.getElementById('order-items').value.trim(),
    total: parseInt(document.getElementById('order-total').value) || 0,
    date: document.getElementById('order-date').value.trim(),
    status: document.getElementById('order-status').value,
    note: document.getElementById('order-note').value.trim(),
  };

  if (currentEditOrder) {

    const o = ordersData.find(
      x => x.id === currentEditOrder
    );

    if (o) {
      Object.assign(o, data);
    }

    showToast('Cập nhật đơn hàng thành công!', 'success');

  } else {

    ordersData.unshift({
      id: 'FHS-' + Date.now(),
      ...data
    });

    showToast('Thêm đơn hàng thành công!', 'success');
  }

  renderOrders(ordersData);

  closeModal('modal-edit-order');

  currentEditOrder = null;
}

function deleteOrder(id) {
  const idx = ordersData.findIndex(x => x.id === id);
  if (idx > -1) {
    ordersData.splice(idx, 1);
    filteredOrders = filteredOrders.filter(x => x.id !== id);
    renderOrders(filteredOrders);
    showToast('Đã xóa đơn hàng!', 'error');
  }
}

let _cancelOrderId = null;
function cancelOrder(id) {
  const o = ordersData.find(x => x.id === id);
  if (!o) return;
  _cancelOrderId = id;
  document.getElementById('cancel-order-desc').textContent = `Đơn hàng ${o.id} — ${o.customer} (${o.total.toLocaleString()}đ)`;
  document.getElementById('cancel-order-reason').value = '';
  document.getElementById('cancel-order-error').style.display = 'none';
  clearChips('cancel-order-chips');
  document.getElementById('modal-cancel-order').classList.add('open');
}
function confirmCancelOrder() {
  const reason = document.getElementById('cancel-order-reason').value.trim();
  if (!reason) {
    document.getElementById('cancel-order-error').style.display = 'block';
    return;
  }
  const o = ordersData.find(x => x.id === _cancelOrderId);
  if (!o) return;
  o.status = 'Đã hủy';
  o.cancelReason = reason;
  closeModal('modal-cancel-order');
  const filtered = filteredOrders.map(x => x.id === _cancelOrderId ? o : x);
  renderOrders(filtered);
  showToast(`Đã hủy đơn hàng ${o.id}!`, 'error');
  _cancelOrderId = null;
}

// ── PAGINATION HELPER ──
function renderPagination(containerId, currentPage, totalPages, onPageChange) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="(${onPageChange.toString()})(${currentPage - 1})">‹</button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="(${onPageChange.toString()})(${i})">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span class="page-dots">…</span>`;
    }
  }

  html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="(${onPageChange.toString()})(${currentPage + 1})">›</button>`;
  container.innerHTML = html;
}

// ── USERS PAGINATION STATE ──
const usersPagination = { page: 1, perPage: 6 };
let filteredUsers = [...usersData];

function filterAndRenderUsers() {
  const search = (document.getElementById('users-search')?.value || '').toLowerCase();
  const role = document.getElementById('users-filter-role')?.value || '';
  const status = document.getElementById('users-filter-status')?.value || '';

  filteredUsers = usersData.filter(u => {
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search) ||
      u.phone.includes(search);
    const matchRole = !role || u.role === role;
    const matchStatus = !status || u.status === status;
    return matchSearch && matchRole && matchStatus;
  });

  usersPagination.page = 1;
  renderUsers();
}

// ── RENDER USERS ──
function renderUsers() {
  const total = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(total / usersPagination.perPage));
  if (usersPagination.page > totalPages) usersPagination.page = totalPages;

  const start = (usersPagination.page - 1) * usersPagination.perPage;
  const pageData = filteredUsers.slice(start, start + usersPagination.perPage);

  const label = document.getElementById('users-count-label');
  if (label) label.textContent = `Hiển thị ${start + 1}–${Math.min(start + usersPagination.perPage, total)} / ${total} tài khoản`;

  document.getElementById('users-tbody').innerHTML = pageData.length
    ? pageData.map((u, i) => `
      <tr>
        <td>${start + i + 1}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:12px;flex-shrink:0">${u.name.charAt(0)}</div>
            <span style="font-weight:600">${u.name}</span>
          </div>
        </td>
        <td>${u.email}</td>
        <td>${u.phone}</td>
        <td><span class="badge ${u.role === 'Admin' ? 'badge-cancelled' : 'badge-pending'}">${u.role}</span></td>
        <td>${u.date}</td>
        <td><span class="badge ${u.status === 'Hoạt động' ? 'badge-active' : 'badge-inactive'}">${u.status}</span></td>
        <td>
          <button class="btn btn-success btn-sm" onclick="editUser(${u.id})" title="Chỉnh sửa">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="toggleUserStatus(${u.id})" title="${u.status === 'Hoạt động' ? 'Khóa tài khoản' : 'Mở khóa'}">${u.status === 'Hoạt động' ? '🔒' : '🔓'}</button>
        </td>
      </tr>
    `).join('')
    : `<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:24px">Không tìm thấy tài khoản nào.</td></tr>`;

  // Render pagination
  const container = document.getElementById('users-pagination');
  if (!container) return;
  let html = `<button class="page-btn" ${usersPagination.page === 1 ? 'disabled' : ''} onclick="usersGoPage(${usersPagination.page - 1})">‹</button>`;
  for (let p = 1; p <= totalPages; p++) {
    html += `<button class="page-btn ${p === usersPagination.page ? 'active' : ''}" onclick="usersGoPage(${p})">${p}</button>`;
  }
  html += `<button class="page-btn" ${usersPagination.page === totalPages ? 'disabled' : ''} onclick="usersGoPage(${usersPagination.page + 1})">›</button>`;
  container.innerHTML = html;
}

function usersGoPage(p) {
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPagination.perPage));
  if (p < 1 || p > totalPages) return;
  usersPagination.page = p;
  renderUsers();
}

let _lockUserId = null;
function toggleUserStatus(id) {
  const u = usersData.find(x => x.id === id);
  if (!u) return;
  _lockUserId = id;
  const isLocking = u.status === 'Hoạt động';
  const title = isLocking ? 'Xác nhận khóa tài khoản' : 'Xác nhận mở khóa tài khoản';
  const icon = isLocking ? '🔒' : '🔓';
  document.getElementById('lock-user-title').textContent = title;
  document.querySelector('#modal-lock-user .modal-icon').textContent = icon;
  document.getElementById('lock-user-desc').textContent = `Tài khoản: ${u.name} (${u.email})`;
  document.getElementById('lock-user-reason').value = '';
  document.getElementById('lock-user-error').style.display = 'none';
  clearChips('lock-user-chips');
  // Adjust chips label & confirm button for lock vs unlock
  const reasonGroup = document.getElementById('lock-user-reason-group');
  const confirmBtn = document.getElementById('lock-user-confirm-btn');
  const reasonArea = document.getElementById('lock-user-reason');
  if (isLocking) {
    reasonGroup.style.display = 'block';
    document.querySelector('#lock-user-chips').innerHTML = `
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Vi phạm nội quy</button>
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Tài khoản giả mạo</button>
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Yêu cầu từ người dùng</button>
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Gian lận thanh toán</button>
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Khác</button>
    `;
    reasonArea.placeholder = 'Nhập lý do khóa tài khoản...';
    document.querySelector('#lock-user-reason-group label').innerHTML = 'Lý do khóa <span style="color:var(--primary)">*</span>';
    confirmBtn.className = 'btn btn-danger';
    confirmBtn.textContent = '🔒 Xác nhận khóa';
  } else {
    reasonGroup.style.display = 'block';
    document.querySelector('#lock-user-chips').innerHTML = `
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Đã xử lý vi phạm</button>
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Xác minh danh tính</button>
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Yêu cầu từ người dùng</button>
      <button type="button" class="chip" onclick="selectChip(this,'lock-user-chips','lock-user-reason')">Khác</button>
    `;
    reasonArea.placeholder = 'Nhập lý do mở khóa...';
    document.querySelector('#lock-user-reason-group label').innerHTML = 'Lý do mở khóa <span style="color:var(--primary)">*</span>';
    confirmBtn.className = 'btn btn-success';
    confirmBtn.textContent = '🔓 Xác nhận mở khóa';
  }
  document.getElementById('modal-lock-user').classList.add('open');
}
function confirmToggleUserStatus() {
  const reason = document.getElementById('lock-user-reason').value.trim();
  if (!reason) {
    document.getElementById('lock-user-error').style.display = 'block';
    return;
  }
  const u = usersData.find(x => x.id === _lockUserId);
  if (!u) return;
  const wasActive = u.status === 'Hoạt động';
  u.status = wasActive ? 'Bị khóa' : 'Hoạt động';
  u.lockReason = wasActive ? reason : null;
  closeModal('modal-lock-user');
  filterAndRenderUsers();
  showToast(`Tài khoản "${u.name}" đã được ${wasActive ? 'khóa' : 'mở khóa'}!`, wasActive ? 'error' : 'success');
  _lockUserId = null;
}

function deleteUser(id) {
  const u = usersData.find(x => x.id === id);
  if (!u) return;
  if (!confirm(`Bạn có chắc muốn xóa tài khoản "${u.name}" không?\nHành động này không thể hoàn tác.`)) return;
  const idx = usersData.findIndex(x => x.id === id);
  if (idx !== -1) usersData.splice(idx, 1);
  filterAndRenderUsers();
  showToast(`Đã xóa tài khoản "${u.name}"!`, 'error');
}

function editUser(id) {
  const u = usersData.find(x => x.id === id);
  if (!u) return;
  document.getElementById('user-name').value = u.name;
  document.getElementById('user-email').value = u.email;
  document.getElementById('user-phone').value = u.phone;
  document.getElementById('user-role').value = u.role;
  document.getElementById('user-status').value = u.status;
  currentEditUser = id;
  openModal('modal-add-user');
}

function saveUser() {
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const phone = document.getElementById('user-phone').value.trim();
  const role = document.getElementById('user-role').value;
  const status = document.getElementById('user-status').value;
  if (!name) { showToast('Vui lòng nhập tên!', 'error'); return; }
  if (currentEditUser) {
    const u = usersData.find(x => x.id === currentEditUser);
    if (u) { u.name = name; u.email = email; u.phone = phone; u.role = role; u.status = status; }
    showToast('Cập nhật tài khoản thành công!', 'success');
  } else {
    usersData.push({ id: Date.now(), name, email, phone, role, date: new Date().toLocaleDateString('vi-VN'), status });
    showToast('Thêm tài khoản thành công!', 'success');
  }
  filterAndRenderUsers();
  closeModal('modal-add-user');
  currentEditUser = null;
}

// ── RENDER CATEGORIES ──
function renderCategories() {
  document.getElementById('cat-tbody').innerHTML = categoriesData.map((c, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${c.name}</strong></td>
      <td>${c.count}</td>
      <td>
        <span class="badge ${c.status === 'Hiển thị'
      ? 'badge-active'
      : 'badge-inactive'}">
          ${c.status}
        </span>
      </td>
      <td>
        <button class="btn btn-success btn-sm"
          onclick="editCategory(${c.id})">
          ✏️
        </button>

        <button class="btn btn-danger btn-sm"
          onclick="deleteCategory(${c.id})">
          🗑️
        </button>
      </td>
    </tr>
  `).join('');
}
function editCategory(id) {
  const c = categoriesData.find(x => x.id === id);

  if (!c) return;

  document.getElementById('cat-name').value = c.name;
  document.getElementById('cat-count').value = c.count;
  document.getElementById('cat-status').value = c.status;

  currentEditCategory = id;

  openModal('modal-category');
}

function deleteCategory(id) {
  const idx = categoriesData.findIndex(x => x.id === id);

  if (idx > -1) {
    categoriesData.splice(idx, 1);

    renderCategories();

    showToast('Đã xóa danh mục!', 'error');
  }
}
function saveCategory() {

  const name = document.getElementById('cat-name').value.trim();
  const count = parseInt(document.getElementById('cat-count').value) || 0;
  const status = document.getElementById('cat-status').value;

  if (!name) {
    showToast('Vui lòng nhập tên danh mục!', 'error');
    return;
  }

  if (currentEditCategory) {

    const c = categoriesData.find(x => x.id === currentEditCategory);

    if (c) {
      c.name = name;
      c.count = count;
      c.status = status;
    }

    showToast('Cập nhật danh mục thành công!', 'success');

  } else {

    categoriesData.push({
      id: Date.now(),
      name,
      count,
      status
    });

    showToast('Thêm danh mục thành công!', 'success');
  }

  renderCategories();

  closeModal('modal-category');

  currentEditCategory = null;
}

// ── TOP BOOKS ──
function renderTopBooks() {
  const sorted = [...booksData].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const max = sorted[0].sold;
  const rankClass = ['gold', 'silver', 'bronze', '', ''];
  document.getElementById('topBooksContainer').innerHTML = sorted.map((b, i) => `
    <div class="top-book-item">
      <div class="top-rank ${rankClass[i]}">${i + 1}</div>
      <div style="flex:1">
        <div class="top-book-name">${b.name}</div>
        <div class="top-book-bar"><div class="top-book-bar-fill" style="width:${(b.sold / max * 100).toFixed(0)}%"></div></div>
      </div>
      <div class="top-book-sold">${b.sold.toLocaleString()} cuốn</div>
    </div>
  `).join('');
}

// ── CHARTS ──
function initCharts() {
  new Chart(document.getElementById('revenueChart'), {
    type: 'bar',
    data: {
      labels: ['Tháng 12', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
      datasets: [{
        label: 'Doanh Thu (triệu đ)',
        data: [85, 92, 78, 110, 115, 128],
        backgroundColor: 'rgba(192,57,43,0.15)',
        borderColor: '#c0392b',
        borderWidth: 2,
        borderRadius: 6,
        fill: true,
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.05)' } }, x: { grid: { display: false } } } }
  });

  new Chart(document.getElementById('categoryChart'), {
    type: 'doughnut',
    data: {
      labels: categoriesData.map(c => c.name),
      datasets: [{ data: categoriesData.map(c => c.count), backgroundColor: ['#c0392b', '#f39c12', '#27ae60', '#2980b9', '#8e44ad', '#16a085'], borderWidth: 2, borderColor: '#fff' }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } } }
  });

  const statusCounts = { 'Chờ xử lý': 0, 'Đang giao': 0, 'Hoàn thành': 0, 'Đã hủy': 0 };
  ordersData.forEach(o => statusCounts[o.status]++);
  new Chart(document.getElementById('orderStatusChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{ data: Object.values(statusCounts), backgroundColor: ['#f39c12', '#2980b9', '#27ae60', '#c0392b'], borderWidth: 2, borderColor: '#fff' }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } } }
  });
}

function initCatChart() {
  if (document.getElementById('catPieChart')._chart) return;
  new Chart(document.getElementById('catPieChart'), {
    type: 'pie',
    data: {
      labels: categoriesData.map(c => c.name),
      datasets: [{ data: categoriesData.map(c => c.count), backgroundColor: ['#c0392b', '#f39c12', '#27ae60', '#2980b9', '#8e44ad', '#16a085'], borderWidth: 2, borderColor: '#fff' }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
  document.getElementById('catPieChart')._chart = true;
}

// ── TABS ──
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');

  document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));

  const titles = {
    dashboard: 'Dashboard',
    books: 'Quản Lý Sách',
    orders: 'Quản Lý Đơn Hàng',
    users: 'Quản Lý Tài Khoản',
    categories: 'Quản Lý Danh Mục'
  };

  const subs = {
    dashboard: 'Tổng quan hệ thống',
    books: 'Thêm, sửa, xóa sách',
    orders: 'Xem và cập nhật đơn hàng',
    users: 'Quản lý tài khoản người dùng',
    categories: 'Quản lý danh mục sách'
  };

  document.getElementById('topbar-title-text').textContent = titles[name];
  document.getElementById('topbar-subtitle').textContent = subs[name] + ' - Hôm nay: 19/05/2026';

  if (name === 'categories') initCatChart();

}

// ── MODAL ──
function openModal(id) { document.getElementById(id).classList.add('open'); }
function selectChip(el, chipsId, textareaId) {
  document.querySelectorAll(`#${chipsId} .chip`).forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(textareaId).value = el.textContent;
  const errId = chipsId.replace('-chips', '-error');
  const errEl = document.getElementById(errId);
  if (errEl) errEl.style.display = 'none';
}
function clearChips(chipsId) {
  document.querySelectorAll(`#${chipsId} .chip`).forEach(c => c.classList.remove('active'));
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); currentEditBook = null; currentEditOrder = null; }
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
});

// ── TOAST ──
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'error' : ''}`;
  toast.innerHTML = `${type === 'success' ? '✅' : '❌'} ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.style.opacity = '0', 2500);
  setTimeout(() => toast.remove(), 2900);
}

// ── INIT ──
let adminLoaded = false;

function initAdmin() {
  loadClientOrdersToAdmin();

  renderBooks(booksData);
  renderOrders(ordersData);
  filterAndRenderUsers();
  renderCategories();
  renderTopBooks();

  loadOrdersFromAPI();

  if (!adminLoaded) {
    if (typeof Chart !== "undefined") {
      initCharts();
    }
    adminLoaded = true;
  }
}
initAdmin();