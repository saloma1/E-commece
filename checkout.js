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


document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (name && email && address && city && phone) {
    alert(`Thank you, ${name}! Your order has been placed.`);
    // ممكن هنا تحفظي البيانات لو هتستخدميها بعدين
    window.location.href = "index.html"; // أو أي صفحة تانية بعد التأكيد
  } else {
    alert("Please fill in all fields.");
  }
});
// ✅ Load product details
fetch('https://dummyjson.com/products/' + localStorage.getItem('selectedProductId'))
  .then(response => response.json())
  .then(data => {
    // Populate the checkout form with product details
    document.getElementById('product-name').innerText = data.name;
    document.getElementById('product-price').innerText = '$' + data.price;
  })
  .catch(error => console.error('Error fetching product details:', error));