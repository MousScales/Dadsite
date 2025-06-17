// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Show the first slide
    slides[0].classList.add('active');
    
    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Initialize slideshow when the page loads
window.addEventListener('load', initSlideshow);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add shadow to navigation on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Product Gallery
function initializeProductGallery() {
    const productGrid = document.querySelector('.product-grid');
    const imageFiles = [
        'IMG_3894.jpg', 'IMG_3895.jpg', 'IMG_3896.jpg', 'IMG_3897.jpg', 'IMG_3898.jpg',
        'IMG_3899.jpg', 'IMG_3900.jpg', 'IMG_3901.jpg', 'IMG_3902.jpg', 'IMG_3903.jpg',
        'IMG_3904.jpg', 'IMG_3905.jpg', 'IMG_3906.jpg', 'IMG_3908.jpg', 'IMG_3909.jpg',
        'IMG_3910.jpg', 'IMG_3911.jpg', 'IMG_3912.jpg', 'IMG_3913.jpg', 'IMG_3916.jpg',
        'IMG_3917.jpg', 'IMG_3918.jpg', 'IMG_3919.jpg', 'IMG_3920.jpg', 'IMG_3921.jpg',
        'IMG_3922.jpg', 'IMG_3923.jpg', 'IMG_3924.jpg', 'IMG_3925.jpg', 'IMG_3926.jpg',
        'IMG_3927.jpg', 'IMG_3929.jpg', 'IMG_3930.jpg', 'IMG_3931.jpg', 'IMG_3932.jpg',
        'IMG_3933.jpg', 'IMG_3934.jpg', 'IMG_3935.jpg', 'IMG_3936.jpg'
    ];

    // Clear existing content
    productGrid.innerHTML = '';

    // Create pages with exactly 9 products each (3x3)
    const productsPerPage = 9;
    const pages = Math.ceil(imageFiles.length / productsPerPage);

    for (let i = 0; i < pages; i++) {
        const page = document.createElement('div');
        page.className = `product-grid-page ${i === 0 ? 'active' : ''}`;
        
        const startIdx = i * productsPerPage;
        const endIdx = Math.min(startIdx + productsPerPage, imageFiles.length);
        
        // Fill the page with 9 items, use empty placeholders if needed
        for (let j = 0; j < productsPerPage; j++) {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            if (startIdx + j < endIdx) {
                const img = document.createElement('img');
                img.className = 'product-image';
                img.src = `Images/Products/${imageFiles[startIdx + j]}`;
                img.alt = `Product ${startIdx + j + 1}`;
                img.dataset.index = startIdx + j;
                card.appendChild(img);
            } else {
                // Add empty space to maintain 3x3 grid
                card.style.visibility = 'hidden';
            }
            
            page.appendChild(card);
        }
        
        productGrid.appendChild(page);
    }

    // Create navigation dots
    const navigation = document.createElement('div');
    navigation.className = 'carousel-navigation';
    
    for (let i = 0; i < pages; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showPage(i));
        navigation.appendChild(dot);
    }
    
    productGrid.parentElement.appendChild(navigation);

    // Add navigation buttons
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentPage = 0;

    function showPage(pageIndex) {
        const allPages = document.querySelectorAll('.product-grid-page');
        const allDots = document.querySelectorAll('.carousel-dot');
        
        allPages.forEach(page => page.classList.remove('active'));
        allDots.forEach(dot => dot.classList.remove('active'));
        
        allPages[pageIndex].classList.add('active');
        allDots[pageIndex].classList.add('active');
        currentPage = pageIndex;
    }

    prevButton.addEventListener('click', () => {
        const newPage = (currentPage - 1 + pages) % pages;
        showPage(newPage);
    });

    nextButton.addEventListener('click', () => {
        const newPage = (currentPage + 1) % pages;
        showPage(newPage);
    });

    // Image Popup Functionality
    const popup = document.querySelector('.image-popup-overlay');
    const popupImage = popup.querySelector('.popup-image');
    const closePopup = popup.querySelector('.close-popup');
    const popupPrev = popup.querySelector('.popup-prev');
    const popupNext = popup.querySelector('.popup-next');
    let currentImageIndex = 0;

    function showPopupImage(index) {
        currentImageIndex = index;
        popupImage.src = `Images/Products/${imageFiles[index]}`;
        popup.classList.add('active');
    }

    function hidePopup() {
        popup.classList.remove('active');
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageFiles.length;
        popupImage.src = `Images/Products/${imageFiles[currentImageIndex]}`;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageFiles.length) % imageFiles.length;
        popupImage.src = `Images/Products/${imageFiles[currentImageIndex]}`;
    }

    // Add click event listeners for popup functionality
    productGrid.addEventListener('click', (e) => {
        const clickedImage = e.target.closest('.product-image');
        if (clickedImage) {
            const index = parseInt(clickedImage.dataset.index);
            showPopupImage(index);
        }
    });

    closePopup.addEventListener('click', hidePopup);
    popupNext.addEventListener('click', showNextImage);
    popupPrev.addEventListener('click', showPrevImage);

    // Close popup when clicking outside the image
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            hidePopup();
        }
    });

    // Keyboard navigation for popup
    document.addEventListener('keydown', (e) => {
        if (!popup.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                hidePopup();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
}

// Initialize the product gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeProductGallery();
});

// Add styles for product cards
const style = document.createElement('style');
style.textContent = `
    .product-card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .product-card:hover {
        transform: translateY(-5px);
    }

    .product-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .product-card h3 {
        padding: 1rem;
        margin: 0;
        font-size: 1.2rem;
    }

    .product-card p {
        padding: 0 1rem 1rem;
        color: #666;
    }
`;
document.head.appendChild(style); 