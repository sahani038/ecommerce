let currentIndex = 0;
const images = document.querySelectorAll('.image-slider img');
const previewImages = document.querySelectorAll('.preview-grid img');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const addToCartButton = document.querySelector('.add-to-cart');
const buyNowButton = document.querySelector('.buy-now');

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImages();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImages();
}

function showImage(index) {
    currentIndex = index;
    updateImages();
}

function updateImages() {
    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentIndex);
        previewImages[index].classList.toggle('active-preview', index === currentIndex);
    });
}

function getProductDetails() {
    const name = document.querySelector('h1').textContent;
    const priceElement = document.querySelector('.price');
    const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
    return { name, price };
}

function addToCart() {
    const { name, price } = getProductDetails();
    const product = {
        name: name,
        price: price,
        image: images[currentIndex].src,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);

    window.location.href = '..//cart.html';
}

function buyNow() {
    const { name, price } = getProductDetails();
    const product = {
        name: name,
        price: price,
        image: images[currentIndex].src,
        quantity: 1
    };

    localStorage.setItem('checkoutItem', JSON.stringify(product));
    window.location.href = '..//checkout.html';
}

// Event Listeners
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);
previewImages.forEach((img, index) => {
    img.addEventListener('click', () => showImage(index));
});
addToCartButton.addEventListener('click', addToCart);
buyNowButton.addEventListener('click', buyNow);

// Initialize the image display
updateImages();