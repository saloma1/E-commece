// show the shop list 
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("dropdownBtn");
    const dropdown = document.getElementById("dropdownList");

    button.addEventListener("click", function() {
        dropdown.classList.toggle("show");
    });

    document.addEventListener("click", function(event) {
        if (!event.target.closest(".dropdown")) {
            dropdown.classList.remove("show");
        }
    });

});


const cartItemsContainer = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" />
      <div class="cart-details">
        <h4>${item.title}</h4>
        <p>Size: ${item.size || "Large"}</p>
        <p>Color: ${item.color || "White"}</p>
        <p>$${item.price}</p>
      </div>
      <div class="cart-actions">
        <div class="quantity-control">
          <button onclick="updateQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <div class="delete-btn" onclick="removeItem(${index})">🗑️</div>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  document.getElementById("subtotal").textContent = subtotal;
  const discount = subtotal * 0.2;
  document.getElementById("discount").textContent = `-$${discount.toFixed(0)}`;
  document.getElementById("total").textContent = (subtotal - discount + 15).toFixed(0);
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

renderCart();
