// ========== GALLERY.JS - Image Lightbox Functionality ==========

document.addEventListener('DOMContentLoaded', function() {
    initLightbox();
});

// ========== INITIALIZE LIGHTBOX ==========
function initLightbox() {
    // Get all images that should open in lightbox
    const images = document.querySelectorAll('.service-card img, .service-item img, .contact-image img');
    
    // Create lightbox container
    const lightbox = createLightboxContainer();
    document.body.appendChild(lightbox);
    
    // Add click handlers to images
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.setAttribute('data-lightbox-index', index);
        
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
        
        // Add keyboard support
        img.setAttribute('tabindex', '0');
        img.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(this.src, this.alt);
            }
        });
    });
}

// ========== CREATE LIGHTBOX CONTAINER ==========
function createLightboxContainer() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    
    // Close lightbox when clicking close button
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    return lightbox;
}

// ========== OPEN LIGHTBOX ==========
function openLightbox(imageSrc, imageAlt) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    // Set image and caption
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    lightboxCaption.textContent = imageAlt;
    
    // Show lightbox
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus on close button for accessibility
    setTimeout(() => {
        lightbox.querySelector('.lightbox-close').focus();
    }, 100);
}

// ========== CLOSE LIGHTBOX ==========
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// ========== ADD IMAGE ZOOM ON HOVER (OPTIONAL ENHANCEMENT) ==========
document.addEventListener('DOMContentLoaded', function() {
    const serviceImages = document.querySelectorAll('.service-card img, .service-item img');
    
    serviceImages.forEach(img => {
        // Add zoom hint
        const zoomHint = document.createElement('div');
        zoomHint.className = 'zoom-hint';
        zoomHint.innerHTML = '🔍 Click to enlarge';
        
        img.parentElement.style.position = 'relative';
        img.parentElement.appendChild(zoomHint);
        
        // Show/hide hint on hover
        img.addEventListener('mouseenter', function() {
            zoomHint.style.opacity = '1';
        });
        
        img.addEventListener('mouseleave', function() {
            zoomHint.style.opacity = '0';
        });
    });
});