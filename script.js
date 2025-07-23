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

//get the data 
// get the data
fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
    const products = data.products;
    displaySection(products, 'New Arrivals', 'new-arrivals', 0, 5);
    displaySection(products, 'Top Selling', 'top-selling', 5, 10);
        });

// show the products in the section
function displaySection(products, sectionTitle, containerId, start = 0, end = 5) {
    const container = document.getElementById(containerId);
    const section = document.createElement('div');
    section.classList.add('section');

    const title = document.createElement('h2');
    title.textContent = sectionTitle;
    title.classList.add('section-title');

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card-wrapper');

    products.slice(start, end).forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <p>${product.title}</p>
        <p>$${product.price}</p>
    `;

    card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" >
        <p>${product.title}</p>
        <p>$${product.price}</p>
`;

    card.addEventListener('click', () => {
        localStorage.setItem('selectedProductId', product.id);
        window.location.href = 'product.html';
});


        cardWrapper.appendChild(card);
    });

    section.appendChild(title);
    section.appendChild(cardWrapper);
    container.appendChild(section);
}

//when i press any category it goes to it 

const categoryCards = document.querySelectorAll('.category-card, .category-cards');

categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const selectedCategory = card.getAttribute('data-category');
    localStorage.setItem('selectedCategory', selectedCategory);
    window.location.href = 'category.html'; 
  });
});
