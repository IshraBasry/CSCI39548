let cart = [];

function addToCart(name, price) {
  let item = cart.find(i => i.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });
  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function updateCart() {
  let cartItems = document.getElementById("cart-items");
  let totalDisplay = document.getElementById("cart-total");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        ${item.name} ($${item.price}) x ${item.quantity}
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      </div>
    `;
  });

  totalDisplay.innerText = "Total: $" + total;
}

function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}