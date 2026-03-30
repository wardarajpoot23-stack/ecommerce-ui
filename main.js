function money(value) {
  return "$" + value.toFixed(2);
}

function parsePrice(text) {
  return Number(text.replace(/[^0-9.-]/g, "")) || 0;
}

const cartCard = document.getElementById("cartCard");
const cartTitle = document.getElementById("cartTitle");
const subtotalValue = document.getElementById("subtotalValue");
const discountValue = document.getElementById("discountValue");
const taxValue = document.getElementById("taxValue");
const totalValue = document.getElementById("totalValue");
const removeAllBtn = document.getElementById("removeAllBtn");
const savedGrid = document.getElementById("savedGrid");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponInput = document.getElementById("couponInput");
const checkoutBtn = document.getElementById("checkoutBtn");

let discount = 60;
let couponApplied = false;

function cartItems() {
  return Array.from(document.querySelectorAll(".cart-item"));
}

function syncLastBorder() {
  cartItems().forEach((item) => item.classList.remove("cart-item-last"));
  const items = cartItems();
  if (items.length) {
    items[items.length - 1].classList.add("cart-item-last");
  }
}

function updateTotals() {
  const items = cartItems();
  const count = items.length;
  let subtotal = 0;

  items.forEach((item) => {
    const price = Number(item.dataset.price);
    const qty = Number(item.dataset.qty);
    subtotal += price * qty;
  });

  const tax = subtotal > 0 ? 14 : 0;
  const finalDiscount = subtotal > 0 ? discount : 0;
  const total = Math.max(0, subtotal - finalDiscount + tax);

  cartTitle.textContent = `My cart (${count})`;
  subtotalValue.textContent = money(subtotal);
  discountValue.textContent = `- ${money(finalDiscount)}`;
  taxValue.textContent = `+ ${money(tax)}`;
  totalValue.textContent = money(total);
}

function toSaved(item) {
  const img = item.querySelector("img").getAttribute("src");
  const title = item.querySelector("h3").textContent;
  const price = item.dataset.price;

  const card = document.createElement("article");
  card.className = "saved-item";
  card.dataset.price = price;
  card.innerHTML = `
    <div class="saved-thumb"><img src="${img}" alt="Saved product"></div>
    <div class="saved-price">${money(Number(price))}</div>
    <p>${title}</p>
    <button class="btn btn-light btn-blue js-move-to-cart">Move to cart</button>
  `;
  savedGrid.prepend(card);
}

function toCart(savedItem) {
  const img = savedItem.querySelector("img").getAttribute("src");
  const title = savedItem.querySelector("p").textContent;
  const price = parsePrice(savedItem.querySelector(".saved-price").textContent);

  const article = document.createElement("article");
  article.className = "cart-item";
  article.dataset.id = "item-" + Date.now();
  article.dataset.price = String(price);
  article.dataset.qty = "1";
  article.innerHTML = `
    <div class="item-main">
      <div class="thumb-wrap"><img src="${img}" alt="Cart item"></div>
      <div class="item-copy">
        <h3>${title}</h3>
        <p>Size: medium, Color: blue, Material: Plastic</p>
        <p>Seller: Artel Market</p>
        <div class="item-actions">
          <button class="btn btn-danger-light js-remove">Remove</button>
          <button class="btn btn-light btn-blue js-save">Save for later</button>
        </div>
      </div>
    </div>
    <div class="item-price js-item-price">${money(price)}</div>
    <div class="item-qty-wrap">
      <button class="qty-btn js-dec">-</button>
      <div class="item-qty js-qty">Qty: 1</div>
      <button class="qty-btn js-inc">+</button>
    </div>
  `;

  const cartFoot = cartCard.querySelector(".cart-foot");
  cartCard.insertBefore(article, cartFoot);
  syncLastBorder();
  updateTotals();
}

document.addEventListener("click", (event) => {
  const inc = event.target.closest(".js-inc");
  const dec = event.target.closest(".js-dec");
  const remove = event.target.closest(".js-remove");
  const save = event.target.closest(".js-save");
  const move = event.target.closest(".js-move-to-cart");

  if (inc || dec || remove || save) {
    const item = event.target.closest(".cart-item");
    if (!item) return;

    if (inc) {
      item.dataset.qty = String(Number(item.dataset.qty) + 1);
      item.querySelector(".js-qty").textContent = `Qty: ${item.dataset.qty}`;
      updateTotals();
      return;
    }

    if (dec) {
      const next = Math.max(1, Number(item.dataset.qty) - 1);
      item.dataset.qty = String(next);
      item.querySelector(".js-qty").textContent = `Qty: ${item.dataset.qty}`;
      updateTotals();
      return;
    }

    if (save) {
      toSaved(item);
      item.remove();
      syncLastBorder();
      updateTotals();
      return;
    }

    if (remove) {
      item.remove();
      syncLastBorder();
      updateTotals();
      return;
    }
  }

  if (move) {
    const savedItem = event.target.closest(".saved-item");
    if (!savedItem) return;
    toCart(savedItem);
    savedItem.remove();
  }
});

removeAllBtn.addEventListener("click", () => {
  cartItems().forEach((item) => item.remove());
  syncLastBorder();
  updateTotals();
});

applyCouponBtn.addEventListener("click", () => {
  if (couponApplied) return;
  const code = couponInput.value.trim().toUpperCase();
  if (!code) return;
  discount += 40;
  couponApplied = true;
  applyCouponBtn.textContent = "Applied";
  applyCouponBtn.disabled = true;
  updateTotals();
});

checkoutBtn.addEventListener("click", () => {
  checkoutBtn.textContent = "Processing...";
  checkoutBtn.disabled = true;
  setTimeout(() => {
    checkoutBtn.textContent = "Checkout";
    checkoutBtn.disabled = false;
  }, 900);
});

syncLastBorder();
updateTotals();
