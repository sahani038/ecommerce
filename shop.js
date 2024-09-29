const products = [
    { id: 1, name: " White T-shirt", image: "./image/1.png", price: 499, rating: 4.5, category: "tops", size: "m", color: "white", style: "casual" },
    { id: 2, name: "White shoes", image: "./image/7.jpg", price: 599, rating: 4.0, category: "accessories", size: "m", color: "white", style: "sporty" },
    { id: 3, name: "Crop Top", image: "./image/4.png", price: 499, rating: 5.0, category: "tops", size: "s", color: "white", style: "casual" },
    { id: 4, name: "Green Pant", image: "./image/1.jpg", price: 899, rating: 4.2, category: "bottoms", size: "l", color: "green", style: "casual" },
    { id: 5, name: "Half Shirt", image: "./image/2.webp", price: 599, rating: 4.7, category: "tops", size: "m", color: "purple", style: "casual" },
    { id: 6, name: "woman Jeans", image: "./image/wj.png", price: 199, rating: 4.3, category: "bottoms", size: "m", color: "blue", style: "casual" },
    { id: 7, name: "Kids White Tshirt", image: "./image/7.png", price: 299, rating: 4.1, category: "tops", size: "m", color: "white", style: "casual" },
    { id: 8, name: "White Tshirt-Men", image: "./image/5.png", price: 299, rating: 4.6, category: "tops", size: "m", color: "white", style: "sporty" },
    { id: 9, name: "Pink frok", image: "./image/8.png", price: 199, rating: 4.5, category: "dresses", size: "m", color: "pink", style: "casual" },
    { id: 10, name: "Jacket", image: "./image/9.png", price: 699, rating: 4.4, category: "bottoms", size: "m", color: "green", style: "casual" },
    { id: 11, name: "Red shirt", image: "./image/2.png", price: 399, rating: 4.4, category: "bottoms", size: "s", color: "red", style: "casual" },
    { id: 12, name: "White tshirt", image: "./image/1.png", price: 299, rating: 4.4, category: "bottoms", size: "l", color: "white", style: "casual" },
    { id: 13, name: " Two set Dress", image: "./image/12.png", price: 499, rating: 4.4, category: "bottoms", size: "m", color: "white", style: "casual" },
    { id: 14, name: "Shoes", image: "./image/14.webp", price: 1299, rating: 4.4, category: "bottoms", size: "xl", color: "white", style: "sporty" },
];

let currentPage = 0;
const itemsPerPage = 8;
let filteredProducts = [...products];

function applyFilters() {
    const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;
    const categories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
    const sizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(el => el.value);
    const colors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(el => el.value);
    const styles = Array.from(document.querySelectorAll('input[name="style"]:checked')).map(el => el.value);

    filteredProducts = products.filter(product => 
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (categories.length === 0 || categories.includes(product.category)) &&
        (sizes.length === 0 || sizes.includes(product.size)) &&
        (colors.length === 0 || colors.includes(product.color)) &&
        (styles.length === 0 || styles.includes(product.style))
    );

    currentPage = 0;
    displayProducts();
}

function displayProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = filteredProducts.slice(start, end);
    grid.innerHTML = '';

    pageProducts.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        
        // Generate star rating
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        let starsHtml = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<i class="material-icons orange-star">star</i>';
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += '<i class="material-icons orange-star">star_half</i>';
            } else {
                starsHtml += '<i class="material-icons orange-star">star_border</i>';
            }
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p><i class="material-icons rupee ">currency_rupee</i>${product.price.toFixed(2)}</p>
                <div class="star-rating">${starsHtml}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `./product/product${product.id}.html`;
        });
        grid.appendChild(card);
    });

    const loading = document.getElementById("loading");
    if (loading) {
        loading.style.display = pageProducts.length ? 'none' : 'block';
    }

    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    if (prevPageBtn) prevPageBtn.disabled = currentPage === 0;
    if (nextPageBtn) nextPageBtn.disabled = end >= filteredProducts.length;
}

function addEventListeners() {
    const loadMoreBtn = document.getElementById("loadMore");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            currentPage++;
            displayProducts();
        });
    }

    const prevPageBtn = document.getElementById("prevPage");
    if (prevPageBtn) {
        prevPageBtn.addEventListener("click", () => {
            if (currentPage > 0) {
                currentPage--;
                displayProducts();
            }
        });
    }

    const nextPageBtn = document.getElementById("nextPage");
    if (nextPageBtn) {
        nextPageBtn.addEventListener("click", () => {
            if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage) - 1) {
                currentPage++;
                displayProducts();
            }
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    const navWindow = document.getElementById("navWindow");
    if (menuToggle && navWindow) {
        menuToggle.addEventListener("click", () => {
            navWindow.classList.toggle("active");
        });
    }

    const closeNav = document.getElementById("closeNav");
    if (closeNav && navWindow) {
        closeNav.addEventListener("click", () => {
            navWindow.classList.remove("active");
        });
    }

    const filterToggle = document.getElementById("filterToggle");
    const closeFilters = document.getElementById("closeFilters");
    const filters = document.getElementById("filters");
    const productsSection = document.querySelector(".products");

    function toggleFilters() {
        if (!filters || !filterToggle || !productsSection) return;

        const isFilterVisible = filters.style.display === "block";
        filters.style.display = isFilterVisible ? "none" : "block";
        filterToggle.textContent = isFilterVisible ? "Show Filters" : "Hide Filters";
        filterToggle.setAttribute("aria-expanded", (!isFilterVisible).toString());

        if (window.innerWidth > 768) {
            productsSection.style.marginLeft = isFilterVisible ? "0" : "20px";
        } else {
            productsSection.style.marginLeft = "0";
        }
    }

    if (filterToggle) filterToggle.addEventListener("click", toggleFilters);
    if (closeFilters) closeFilters.addEventListener("click", toggleFilters);

    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }

    const addToCartBtn = document.getElementById('addToCart');
    const quantityInput = document.getElementById('quantity');
    const cartStatus = document.getElementById('cartStatus');
    if (addToCartBtn && quantityInput && cartStatus) {
        let cartCount = 0;
        addToCartBtn.addEventListener('click', function () {
            const quantity = parseInt(quantityInput.value);
            cartCount += quantity;
            cartStatus.textContent = `Cart: ${cartCount} items`;
        });
    }
}

function updateFilterVisibility() {
    const filterToggle = document.getElementById("filterToggle");
    const filters = document.getElementById("filters");
    const productsSection = document.querySelector(".products");

    if (!filterToggle || !filters || !productsSection) return;

    if (window.innerWidth > 768) {
        filterToggle.style.display = "inline-block";
        filters.style.display = "none";
        productsSection.style.marginLeft = "0";
        filterToggle.textContent = "Show Filters";
        filterToggle.setAttribute("aria-expanded", "false");
    } else {
        filterToggle.style.display = "inline-block";
        filters.style.display = "none";
        productsSection.style.marginLeft = "0";
        filterToggle.textContent = "Show Filters";
        filterToggle.setAttribute("aria-expanded", "false");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
    updateFilterVisibility();
    displayProducts();
});

window.addEventListener("resize", updateFilterVisibility);