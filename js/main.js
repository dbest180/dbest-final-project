// ========== MAIN.JS - Core Functionality for All Pages ==========

// Wait for DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    initMobileMenu();
    
    // ========== BACK TO TOP BUTTON ==========
    initBackToTop();
    
    // ========== SMOOTH SCROLLING ==========
    initSmoothScroll();
    
    // ========== SCROLL ANIMATIONS ==========
    initScrollAnimations();
    
    // ========== BUSINESS HOURS STATUS ==========
    displayBusinessStatus();
});

// ========== MOBILE MENU FUNCTIONALITY ==========
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert hamburger before nav ul
    nav.insertBefore(hamburger, navUl);
    
    // Toggle menu on click
    hamburger.addEventListener('click', function() {
        navUl.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            navUl.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navUl.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchors
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ========== SCROLL ANIMATIONS (FADE IN) ==========
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .service-item, .hero, .why-dbest, .contact-intro, .callout');
    
    // Add animation class to elements
    animatedElements.forEach(el => {
        el.classList.add('fade-in-element');
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ========== BUSINESS HOURS STATUS ==========
function displayBusinessStatus() {
    // Find location on contact page
    const contactInfo = document.querySelector('.contact-info');
    if (!contactInfo) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + (minute / 60);
    
    let isOpen = false;
    let openTime = '';
    let closeTime = '';
    
    // Business hours logic
    if (day >= 1 && day <= 5) { // Monday - Friday
        openTime = '9:00 AM';
        closeTime = '8:00 PM';
        isOpen = currentTime >= 9 && currentTime < 20;
    } else if (day === 6) { // Saturday
        openTime = '10:00 AM';
        closeTime = '6:00 PM';
        isOpen = currentTime >= 10 && currentTime < 18;
    } else if (day === 0) { // Sunday
        openTime = '11:00 AM';
        closeTime = '5:00 PM';
        isOpen = currentTime >= 11 && currentTime < 17;
    }
    
    // Create status indicator
    const statusDiv = document.createElement('div');
    statusDiv.className = 'business-status';
    statusDiv.innerHTML = `
        <h3>Current Status</h3>
        <p class="status-indicator ${isOpen ? 'open' : 'closed'}">
            <span class="status-dot"></span>
            ${isOpen ? 'Open Now' : 'Closed'}
        </p>
        <p class="status-hours">Today's Hours: ${openTime} - ${closeTime}</p>
    `;
    
    // Insert after first h3
    const firstH3 = contactInfo.querySelector('h3');
    if (firstH3) {
        firstH3.parentNode.insertBefore(statusDiv, firstH3);
    }
}

// ========== UTILITY FUNCTION: Format Phone Number ==========
function formatPhoneNumber(value) {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length >= 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length >= 3) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    return cleaned;
}