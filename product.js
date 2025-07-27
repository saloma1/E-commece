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


const productId = localStorage.getItem('selectedProductId');
const container = document.getElementById('product-details');

if (!productId) {
    window.location.href = 'index.html';
}

fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
        const images = product.images.map(
            img => `<img src="${img}" class="thumb" onclick="changeMainImage('${img}')"/>`
        ).join('');

        const productHTML = `
            <div class="product-page">
                <div class="images">
                    <img src="${product.thumbnail}" id="main-img" class="main-image"/>
                    <div class="thumbnails">${images}</div>
                </div>

                <div class="info">
                    <h1>${product.title}</h1>
                    <div class="rating">⭐ ${product.rating}</div>
                    <p class="price">$${product.price} <span class="old-price">$${product.price + 40}</span></p>

                    <p>${product.description}</p>
                    <button id="add-to-cart">Add to Cart</button>
                </div>
            </div>

            <div class="tabs">
                <button class="tab-button active" onclick="showTab('details')">Product Details</button>
                <button class="tab-button" onclick="showTab('reviews')">Rating & Reviews</button>
                <button class="tab-button" onclick="showTab('faqs')">FAQs</button>
            </div>

            <div id="tab-content">
                <div id="details" class="tab-content active">
                    <h3>About this product</h3>
                    <p>${product.description}</p>
                </div>

                <div id="reviews" class="tab-content">
                    <h3>Customer Reviews</h3>
                    <div id="reviews-container">Loading reviews...</div>
                </div>

                <div id="faqs" class="tab-content">
                    <h3>FAQs</h3>
                    <p><strong>Q: Is it machine washable?</strong><br/>A: Yes, it's fully machine washable.</p>
                    <p><strong>Q: Does it shrink after washing?</strong><br/>A: Not if washed in cold water and air dried.</p>
                </div>
            </div>
        `;

        container.innerHTML = productHTML;

        //  Show real reviews from API or fallback message
        const reviewsContainer = document.getElementById('reviews-container');
        if (product.reviews && product.reviews.length > 0) {
            const reviewsHTML = product.reviews.map(r => `
                <div class="review">
                    <strong>${r.reviewerName}</strong> ${'⭐'.repeat(r.rating)}<br/>
                    "${r.comment}"
                </div>
            `).join('');
            reviewsContainer.innerHTML = reviewsHTML;
        } else {
            reviewsContainer.innerHTML = `<p>No reviews available.</p>`;
        }

        //  Add to cart
        document.getElementById('add-to-cart').addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const exists = cart.find(item => item.id === product.id);

            if (!exists) {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1
                });
            } else {
                const confirmIncrease = window.confirm('Already in cart. Increase quantity?');
                if (confirmIncrease) {
                    exists.quantity += 1;
                } else {
                    return;
                }
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart ✅');
        });

        //  Load suggested products
        fetch('https://dummyjson.com/products?limit=4&skip=10')
            .then(res => res.json())
            .then(data => {
                const suggestions = data.products.map(p => `
                    <div class="suggested-item" onclick="selectSuggestedProduct(${p.id})">
                        <img src="${p.thumbnail}" alt="${p.title}" />
                        <h4>${p.title}</h4>
                        <p>$${p.price}</p>
                    </div>
                `).join('');

                const suggestionsWrapper = document.createElement('div');
                suggestionsWrapper.innerHTML = `
                    <h2>You Might Also Like</h2>
                    <div class="suggested-container">${suggestions}</div>
                `;
                container.appendChild(suggestionsWrapper);
            });
    });

//  Change main image
function changeMainImage(src) {
    document.getElementById('main-img').src = src;
}

//  Tabs logic
function showTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

//  Suggested product click
function selectSuggestedProduct(id) {
    localStorage.setItem('selectedProductId', id);
    location.href = 'product.html';
}
