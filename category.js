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

const categoryTitle = document.getElementById('category-title');
const productsContainer = document.getElementById('category-products');
const selectedCategory = localStorage.getItem('selectedCategory');

if (!selectedCategory) {
  categoryTitle.innerText = "No category selected.";
} else {
  categoryTitle.innerText = `Category: ${selectedCategory}`;

  fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
    .then(res => res.json())
    .then(data => {
      const products = data.products;

      productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
          <img src="${product.thumbnail}" alt="${product.title}" />
          <h4>${product.title}</h4>
          <p>${product.price} EGP</p>
          <button onclick="viewProduct(${product.id})">View</button>
        </div>
      `).join('');
    })
    .catch(err => {
      productsContainer.innerHTML = `<p>Error loading products.</p>`;
    });
}

function viewProduct(id) {
  localStorage.setItem('selectedProductId', id);
  window.location.href = 'product.html';
}



