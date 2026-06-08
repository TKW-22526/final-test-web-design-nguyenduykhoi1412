/* ========== SCROLL REVEAL ========== */

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: .1, rootMargin: "0px 0px -40px 0px" });

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(el => {
        revealObserver.observe(el);
    });
});

/* ========== MOBILE MENU ========== */

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("show");
}

document.addEventListener("click", (e) => {
    const nav = document.getElementById("navMenu");
    const toggle = document.querySelector(".menu-toggle");
    if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("show");
    }
});

/* ========== TOAST ========== */

function showToast(message, type) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }
    const icons = {
        success: "fa-circle-check",
        error: "fa-circle-xmark",
        info: "fa-circle-info",
        warning: "fa-triangle-exclamation"
    };
    const colors = {
        success: "#0a8f4d",
        error: "#e74c3c",
        info: "#3498db",
        warning: "#f39c12"
    };
    const icon = icons[type] || icons.success;
    const color = colors[type] || colors.success;
    const item = document.createElement("div");
    item.className = "toast-item toast-in";
    item.style.borderLeft = "4px solid " + color;
    item.innerHTML = '<i class="fa-solid ' + icon + '" style="color:' + color + '"></i> ' + message;
    toast.appendChild(item);
    setTimeout(() => {
        item.style.animation = "toastOut .35s ease forwards";
        setTimeout(() => item.remove(), 350);
    }, 2800);
}

/* ========== AI CHAT ========== */

function chatAI() {
    const input = document.getElementById("question");
    if (!input) return;
    const q = input.value.toLowerCase().trim();
    const answer = document.getElementById("answer");
    const chatBox = document.querySelector(".chat-card");
    if (!answer) return;
    if (!q) {
        answer.style.display = "block";
        answer.innerHTML = "<strong>Bạn:</strong> (trống)<br><strong>🤖 AI:</strong> Vui lòng nhập triệu chứng của bạn.";
        answer.className = "chat-msg user";
        return;
    }
    let result = "";
    if (q.includes("ho")) {
        result = "Bạn có thể tham khảo thuốc giảm ho. Nếu ho kéo dài trên 7 ngày hãy gặp bác sĩ.";
    } else if (q.includes("sốt") || q.includes("nóng")) {
        result = "Bạn nên nghỉ ngơi, uống nhiều nước. Nếu sốt trên 39°C nên đến cơ sở y tế ngay.";
    } else if (q.includes("đau đầu") || q.includes("nhức đầu")) {
        result = "Bạn có thể tham khảo Paracetamol. Nghỉ ngơi ở nơi yên tĩnh, tránh ánh sáng mạnh.";
    } else if (q.includes("đau bụng") || q.includes("tiêu chảy")) {
        result = "Ăn thức ăn nhẹ, uống nhiều nước điện giải. Tránh đồ dầu mỡ và cay nóng.";
    } else if (q.includes("dị ứng") || q.includes("mề đay")) {
        result = "Tránh tác nhân gây dị ứng. Tham khảo ý kiến dược sĩ về thuốc kháng histamin.";
    } else if (q.includes("cảm") || q.includes("cúm")) {
        result = "Nghỉ ngơi, uống nhiều nước ấm, bổ sung vitamin C. Có thể dùng thuốc cảm thông thường.";
    } else if (q.includes("mất ngủ")) {
        result = "Hạn chế caffeine buổi tối, tạo thói quen ngủ đều đặn. Tham khảo bác sĩ nếu kéo dài.";
    } else if (q.includes("huyết áp")) {
        result = "Theo dõi huyết áp thường xuyên. Duy trì chế độ ăn nhạt, tập thể dục đều, hạn chế stress.";
    } else {
        result = "Xin lỗi, AI chưa hiểu rõ triệu chứng. Vui lòng liên hệ dược sĩ để được tư vấn chi tiết.";
    }
    answer.style.display = "block";
    answer.innerHTML = "<strong>Bạn:</strong> " + input.value + "<br><strong>🤖 AI:</strong> " + result;
    answer.className = "chat-msg user";
    input.value = "";
    if (chatBox) chatBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function handleChatKey(e) {
    if (e.key === "Enter") chatAI();
}

function setHint(text) {
    document.getElementById("question").value = text;
    chatAI();
}

/* ========== DARK MODE ========== */

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    const icon = document.querySelector(".theme-fab i");
    if (icon) icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        const icon = document.querySelector(".theme-fab i");
        if (icon) icon.className = "fa-solid fa-sun";
    }
}
loadTheme();

/* ========== SENIOR MODE ========== */

function checkAge() {
    const age = document.getElementById("age");
    if (!age) return;
    const value = Number(age.value);
    if (!age.value.trim() || isNaN(value) || value < 1) {
        showToast("⚠️ Vui lòng nhập tuổi hợp lệ!", "warning");
        return;
    }
    const status = document.getElementById("ageStatus");
    if (value >= 50) {
        document.body.classList.add("senior");
        if (status) {
            status.style.display = "block";
            status.className = "status-msg success";
            status.innerHTML = "✅ Đã bật chế độ người cao tuổi - Giao diện đã được phóng to.";
        }
        showToast("👴 Đã bật chế độ người cao tuổi!", "success");
    } else {
        document.body.classList.remove("senior");
        if (status) {
            status.style.display = "block";
            status.className = "status-msg success";
            status.innerHTML = "ℹ️ Tuổi của bạn dưới 50, giao diện giữ nguyên.";
        }
    }
}

/* ========== MEDICINE HISTORY ========== */

function saveMedicine(name) {
    const list = JSON.parse(localStorage.getItem("medicineHistory")) || [];
    list.push({ medicine: name, date: new Date().toLocaleDateString() });
    localStorage.setItem("medicineHistory", JSON.stringify(list));
    showToast("💊 Đã lưu lịch sử thuốc: " + name, "success");
}

function showHistory() {
    const box = document.getElementById("history");
    if (!box) return;
    const list = JSON.parse(localStorage.getItem("medicineHistory")) || [];
    if (list.length === 0) {
        box.innerHTML = "<li>Chưa có lịch sử thuốc.</li>";
        return;
    }
    box.innerHTML = list.map(item =>
        "<li><strong>" + item.medicine + "</strong> - " + item.date + "</li>"
    ).join("");
}

/* ========== CART ========== */

const productPrices = {
    "Paracetamol": 25000, "Paracetamol 500mg": 25000,
    "Ibuprofen": 45000, "Ibuprofen 400mg": 45000,
    "Aspirin": 35000, "Aspirin 80mg": 35000,
    "Antibi": 65000,
    "Amoxicillin": 85000, "Amoxicillin 500mg": 85000,
    "Azithromycin": 120000, "Azithromycin 250mg": 120000,
    "Vitamin C": 70000, "Vitamin C 500mg": 70000,
    "Canxi": 120000, "Canxi 500mg": 120000,
    "Vitamin B Complex": 90000,
    "Vitamin D3": 65000, "Vitamin D3 400IU": 65000,
    "Omega 3": 150000,
    "Men Tiêu Hóa": 55000,
    "Omeprazole": 75000, "Omeprazole 20mg": 75000,
    "Berberin": 40000,
    "Thuốc Ho Bổ Phế": 35000,
    "Siro Ho Prospan": 60000,
    "Thuốc Cảm": 28000, "Thuốc Cảm Tổng Hợp": 28000,
    "Cetirizin": 40000, "Cetirizin 10mg": 40000,
    "Loratadin": 55000, "Loratadin 10mg": 55000,
    "Ginkgo Biloba": 200000, "Ginkgo Biloba 120mg": 200000,
    "Coenzyme Q10": 250000,
    "Dầu Gió": 25000,
    "Cao Xương Khớp": 80000,
    "Trà Nhân Trần": 45000,
    "Nhiệt Kế Điện Tử": 180000,
    "Máy Đo Đường Huyết": 790000,
    "Băng Cá Nhân": 25000,
    "Nước Muối Sinh Lý": 15000,
    "Bông Y Tế": 30000,
    "Khẩu Trang Y Tế": 45000,
    "BCS Cao Cấp": 85000,
    "Găng Tay Y Tế": 35000
};

let cart = [];

function addCart(name) {
    const price = productPrices[name] || 0;
    const idx = cart.findIndex(item => item.name === name);
    if (idx >= 0) {
        cart[idx].qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    showToast("✅ " + name + " đã được thêm vào giỏ hàng!", "success");
}

function removeCartItem(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    renderCart();
    showToast("🗑️ Đã xóa " + name + " khỏi giỏ hàng", "warning");
}

function updateQty(name, delta) {
    const idx = cart.findIndex(item => item.name === name);
    if (idx < 0) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
        cart.splice(idx, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    renderCart();
}

function getTotal() {
    return cart.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);
}

function formatPrice(num) {
    return (num || 0).toLocaleString("vi-VN") + " <small>VNĐ</small>";
}

function updateCart() {
    const count = document.getElementById("cartCount");
    if (!count) return;
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    count.innerHTML = data.reduce((s, i) => s + i.qty, 0);
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart();
}
loadCart();

function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    updateCart();
    showToast("🗑️ Đã xóa toàn bộ giỏ hàng!", "warning");
}

/* ========== CART MODAL ========== */

function showCart() {
    let overlay = document.getElementById("cartOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "cartOverlay";
        overlay.className = "cart-overlay";
        overlay.onclick = function(e) { if (e.target === this) closeCart(); };
        overlay.innerHTML = `
            <div class="cart-modal">
                <div class="cart-header">
                    <h2><i class="fa-solid fa-cart-shopping"></i> Giỏ Hàng</h2>
                    <button class="cart-close" onclick="closeCart()">&times;</button>
                </div>
                <div class="cart-body" id="cartBody">
                    <p style="text-align:center;color:var(--gray-500);padding:40px 0;">Giỏ hàng trống</p>
                </div>
                <div class="cart-footer" id="cartFooter" style="display:none;">
                    <div class="cart-total">
                        <span>Tổng cộng:</span>
                        <span class="cart-total-amount" id="cartTotal">0 VNĐ</span>
                    </div>
                    <button class="btn btn-primary" onclick="checkout()" style="width:100%;justify-content:center;">
                        <i class="fa-solid fa-credit-card"></i> Thanh toán
                    </button>
                    <button class="btn btn-outline" onclick="clearCart();renderCart();closeCart();" style="width:100%;justify-content:center;margin-top:8px;">
                        <i class="fa-solid fa-trash"></i> Xóa giỏ hàng
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    renderCart();
    overlay.style.display = "flex";
}

function closeCart() {
    const overlay = document.getElementById("cartOverlay");
    if (overlay) overlay.style.display = "none";
}

function renderCart() {
    const body = document.getElementById("cartBody");
    const footer = document.getElementById("cartFooter");
    const totalEl = document.getElementById("cartTotal");
    if (!body) return;
    if (cart.length === 0) {
        body.innerHTML = '<p style="text-align:center;color:var(--gray-500);padding:40px 0;"><i class="fa-solid fa-cart-empty" style="font-size:48px;display:block;margin-bottom:16px;opacity:.3;"></i>Giỏ hàng trống</p>';
        if (footer) footer.style.display = "none";
        return;
    }
    let html = "";
    cart.forEach(item => {
        const itemTotal = (item.price || 0) * item.qty;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                </div>
                <div class="cart-item-qty">
                    <button class="cart-qty-btn" onclick="updateQty('${item.name.replace(/'/g, "\\'")}', -1)">−</button>
                    <span>${item.qty}</span>
                    <button class="cart-qty-btn" onclick="updateQty('${item.name.replace(/'/g, "\\'")}', 1)">+</button>
                </div>
                <div class="cart-item-total">${formatPrice(itemTotal)}</div>
                <button class="cart-item-remove" onclick="removeCartItem('${item.name.replace(/'/g, "\\'")}')" title="Xóa">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
    });
    body.innerHTML = html;
    if (footer) {
        footer.style.display = "block";
        if (totalEl) totalEl.innerHTML = formatPrice(getTotal());
    }
}

function checkout() {
    if (cart.length === 0) {
        showToast("⚠️ Giỏ hàng trống!", "warning");
        return;
    }
    const total = getTotal();
    closeCart();
    showToast("🎉 Đặt hàng thành công! Tổng tiền: " + total.toLocaleString("vi-VN") + "đ. Cảm ơn bạn!", "success");
    clearCart();
    updateCart();
}

/* ========== SEARCH ========== */

function searchMedicine() {
    const input = document.getElementById("search");
    if (!input) return;
    const value = input.value.toLowerCase();
    document.querySelectorAll(".product-card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(value) ? "block" : "none";
    });
}

/* ========== PRODUCT FILTER (PRICE) ========== */

function filterProducts() {
    const filter = document.getElementById("priceFilter");
    if (!filter) return;
    const value = filter.value;
    document.querySelectorAll(".product-card").forEach(card => {
        const priceEl = card.querySelector(".price");
        if (!priceEl) return;
        const price = parseInt(priceEl.innerText.replace(/\D/g, ""));
        if (value === "all") { card.style.display = "block"; return; }
        if (value === "low") { card.style.display = price < 100000 ? "block" : "none"; return; }
        if (value === "mid") { card.style.display = (price >= 100000 && price <= 300000) ? "block" : "none"; return; }
        if (value === "high") { card.style.display = price > 300000 ? "block" : "none"; }
    });
    const activePill = document.querySelector(".filter-pill.active");
    if (activePill) applyCategoryFilter(activePill.getAttribute("data-cat"));
    updateProductCount();
}

/* ========== CATEGORY FILTER (PILLS) ========== */

let currentCategory = "all";

function filterByCategoryPill(el) {
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    el.classList.add("active");
    currentCategory = el.getAttribute("data-cat");
    applyCategoryFilter(currentCategory);
    const priceFilter = document.getElementById("priceFilter");
    if (priceFilter) priceFilter.value = "all";
    updateProductCount();
}

function applyCategoryFilter(catValue) {
    const priceFilter = document.getElementById("priceFilter");
    const priceValue = priceFilter ? priceFilter.value : "all";
    document.querySelectorAll(".product-card").forEach(card => {
        const cardCat = card.getAttribute("data-cat");
        const catMatch = catValue === "all" || cardCat === catValue;
        if (!catMatch) { card.style.display = "none"; return; }
        if (priceValue === "all") { card.style.display = "block"; return; }
        const priceEl = card.querySelector(".price");
        if (!priceEl) return;
        const price = parseInt(priceEl.innerText.replace(/\D/g, ""));
        if (priceValue === "low") { card.style.display = price < 100000 ? "block" : "none"; }
        else if (priceValue === "mid") { card.style.display = (price >= 100000 && price <= 300000) ? "block" : "none"; }
        else if (priceValue === "high") { card.style.display = price > 300000 ? "block" : "none"; }
        else { card.style.display = "block"; }
    });
    document.querySelectorAll(".category-section").forEach(section => {
        const sectionCat = section.getAttribute("data-cat");
        const hasVisible = Array.from(section.querySelectorAll(".product-card")).some(c => c.style.display !== "none");
        section.style.display = (catValue === "all" || sectionCat === catValue) && hasVisible ? "block" : "none";
    });
}

function updateProductCount() {
    const countEl = document.getElementById("visibleCount");
    if (!countEl) return;
    const visible = document.querySelectorAll('.product-card[style*="display: block"], .product-card:not([style*="display: none"])');
    const count = Array.from(visible).filter(c => c.style.display !== "none").length;
    countEl.textContent = count || document.querySelectorAll(".product-card").length;
}

/* ========== OLD CATEGORY FILTER (kept for compatibility) ========== */

function filterByCategory() {
    const activePill = document.querySelector(".filter-pill.active");
    if (activePill) {
        currentCategory = activePill.getAttribute("data-cat");
        applyCategoryFilter(currentCategory);
    }
    updateProductCount();
}

/* ========== RATING ========== */

function rateProduct(star) {
    const rating = document.getElementById("rating");
    if (!rating) return;
    let stars = "";
    for (let i = 1; i <= star; i++) stars += "⭐";
    rating.innerHTML = stars;
    localStorage.setItem("rating", star);
}

function loadRating() {
    const value = localStorage.getItem("rating");
    if (!value) return;
    const rating = document.getElementById("rating");
    if (!rating) return;
    let stars = "";
    for (let i = 0; i < value; i++) stars += "⭐";
    rating.innerHTML = stars;
}
loadRating();

/* ========== REMINDER ========== */

function addReminder() {
    const medicine = document.getElementById("medicineName");
    const time = document.getElementById("medicineTime");
    if (!medicine || !time || !medicine.value || !time.value) {
        showToast("⚠️ Vui lòng nhập đầy đủ thông tin!", "warning");
        return;
    }
    const data = JSON.parse(localStorage.getItem("reminders")) || [];
    data.push({ name: medicine.value, time: time.value });
    localStorage.setItem("reminders", JSON.stringify(data));
    showToast("⏰ Đã lưu lịch uống thuốc!", "success");
    showReminder();
    medicine.value = "";
    time.value = "";
}

function showReminder() {
    const box = document.getElementById("reminderList");
    if (!box) return;
    const data = JSON.parse(localStorage.getItem("reminders")) || [];
    if (data.length === 0) {
        box.innerHTML = "<li>Chưa có nhắc lịch.</li>";
        return;
    }
    box.innerHTML = data.map(item =>
        "<li><strong>" + item.name + "</strong> - " + item.time + "</li>"
    ).join("");
}
showReminder();

/* ========== CLOCK ========== */

function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;
    clock.innerHTML = new Date().toLocaleString("vi-VN");
}
setInterval(updateClock, 1000);

/* ========== PROMOTION ========== */

function showPromotion() {
    const popup = document.getElementById("promotionPopup");
    if (popup) popup.style.display = "flex";
}

function closePromotion() {
    const popup = document.getElementById("promotionPopup");
    if (popup) popup.style.display = "none";
}

setTimeout(showPromotion, 5000);

/* ========== BACK TO TOP ========== */

window.addEventListener("scroll", () => {
    const btn = document.getElementById("topBtn");
    if (btn) btn.style.display = document.documentElement.scrollTop > 300 ? "flex" : "none";
});

function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ========== COUNTER ========== */

function counter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let count = 0;
    const speed = Math.ceil(target / 100);
    const interval = setInterval(() => {
        count += speed;
        if (count >= target) { count = target; clearInterval(interval); }
        el.innerHTML = count;
    }, 20);
}

window.onload = function () {
    counter("customerCount", 5000);
    counter("productCount", 250);
    counter("supportCount", 24);
};

/* ========== WELCOME TOAST ========== */

(function welcomeUser() {
    if (!localStorage.getItem("visited")) {
        setTimeout(() => {
            showToast("👋 Chào mừng bạn đến với Nhà Thuốc Duy Khôi - Smart Pharmacy 4.0!", "info");
        }, 1500);
        localStorage.setItem("visited", "true");
    }
})();

/* ========== AUTH ========== */

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (!loginForm || !registerForm) return;

    loginForm.style.display = tab === 'login' ? 'block' : 'none';
    registerForm.style.display = tab === 'register' ? 'block' : 'none';

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const btns = document.querySelectorAll('.tab-btn');
    if (tab === 'login' && btns[0]) btns[0].classList.add('active');
    else if (tab === 'register' && btns[1]) btns[1].classList.add('active');

    const footer = document.getElementById('authFooter');
    if (footer) {
        if (tab === 'login') {
            footer.innerHTML = 'Chưa có tài khoản? <a href="#" onclick="switchAuthTab(\'register\');return false">Đăng ký ngay</a>';
        } else {
            footer.innerHTML = 'Đã có tài khoản? <a href="#" onclick="switchAuthTab(\'login\');return false">Đăng nhập</a>';
        }
    }
}

function handleLogin() {
    const email = document.getElementById('loginEmail');
    if (!email || !email.value.trim()) {
        showToast('⚠️ Vui lòng nhập email', 'warning');
        email?.focus();
        return;
    }
    const name = email.value.trim().split('@')[0];
    localStorage.setItem('authUser', JSON.stringify({ name, email: email.value.trim(), loggedIn: true }));
    showToast('✅ Đăng nhập thành công!', 'success');
    setTimeout(() => { window.location.href = '../index.html'; }, 1200);
}

function handleRegister() {
    const name = document.getElementById('regName');
    const email = document.getElementById('regEmail');
    const pass = document.getElementById('regPass');
    const confirm = document.getElementById('regConfirm');

    if (!name || !name.value.trim()) { showToast('⚠️ Vui lòng nhập họ tên', 'warning'); name?.focus(); return; }
    if (!email || !email.value.trim()) { showToast('⚠️ Vui lòng nhập email', 'warning'); email?.focus(); return; }
    if (!pass || pass.value.length < 6) { showToast('⚠️ Mật khẩu phải có ít nhất 6 ký tự', 'warning'); pass?.focus(); return; }
    if (pass.value !== confirm.value) { showToast('⚠️ Mật khẩu xác nhận không khớp', 'warning'); confirm?.focus(); return; }
    if (!document.getElementById('agreeTerms')?.checked) {
        showToast('⚠️ Vui lòng đồng ý với điều khoản sử dụng', 'warning');
        return;
    }

    localStorage.setItem('authUser', JSON.stringify({ name: name.value.trim(), email: email.value.trim(), loggedIn: true }));
    showToast('✅ Đăng ký thành công!', 'success');
    setTimeout(() => { window.location.href = '../index.html'; }, 1200);
}

function checkAuth() {
    const data = localStorage.getItem('authUser');
    const greet = document.getElementById('userGreeting');
    const nameEl = document.getElementById('userName');

    if (data && greet) {
        const user = JSON.parse(data);
        greet.style.display = 'flex';
        nameEl.textContent = user.name;
    }
}

function logout() {
    localStorage.removeItem('authUser');
    showToast('👋 Đã đăng xuất', 'info');
    const greet = document.getElementById('userGreeting');
    if (greet) greet.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", checkAuth);
