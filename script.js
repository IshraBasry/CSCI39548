// ── HAMBURGER MENU ──
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('header nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');
    });

    // Close nav when a link is clicked (good UX on mobile)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            nav.classList.remove('open');
        });
    });
}


// ── SHOPPING CART ──
// Only runs on pages that have cart elements (i.e. menu.html)

let cart = []; // Array of { id, name, price, image, qty }

const cartDrawer   = document.getElementById('cart-drawer');
const cartOverlay  = document.getElementById('cart-overlay');
const cartItemsEl  = document.getElementById('cart-items');
const cartBadge    = document.getElementById('cart-badge');
const cartTotalEl  = document.getElementById('cart-total');

// Open / close helpers
function openCart() {
    if (cartDrawer) cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
}

function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
}

// Add item to cart
function addToCart(id, name, price, image) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, image, qty: 1 });
    }
    renderCart();
    openCart();
}

// Remove item from cart entirely
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Change quantity (+/-)
function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
    } else {
        renderCart();
    }
}

// Clear the whole cart
function clearCart() {
    cart = [];
    renderCart();
}

// Re-render the cart drawer contents
function renderCart() {
    if (!cartItemsEl) return;

    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    // Update badge
    if (cartBadge) cartBadge.textContent = totalItems;

    // Update total
    if (cartTotalEl) cartTotalEl.textContent = `Total: $${totalPrice.toFixed(2)}`;

    // Empty state
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>';
        return;
    }

    // Build cart rows
    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
                <span class="qty-display">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Remove">✕</button>
            </div>
        </div>
    `).join('');
}

// Wire up static buttons (cart icon, close, overlay, clear)
document.getElementById('cart-icon-btn')?.addEventListener('click', openCart);
document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
document.getElementById('clear-cart-btn')?.addEventListener('click', clearCart);

// Initialise cart display on load
renderCart();