// ========== TESTIMONIALS.JS - Rotating Testimonials Slider ==========

document.addEventListener('DOMContentLoaded', function() {
    const testimonialSection = document.querySelector('.testimonials');
    
    if (testimonialSection) {
        initTestimonials();
    }
});

// ========== TESTIMONIALS DATA ==========
const testimonialsData = [
    {
        name: "Sarah Johnson",
        service: "Swedish Massage",
        rating: 5,
        text: "Absolutely incredible experience! The therapists at DBest truly live up to their name. My Swedish massage was perfectly tailored to my needs, and I left feeling completely renewed. This is now my go-to spot in Houston!",
        date: "2 weeks ago"
    },
    {
        name: "Michael Chen",
        service: "Deep Tissue Massage",
        rating: 5,
        text: "I've been dealing with chronic back pain for years, and the deep tissue massage here has been life-changing. The therapist was knowledgeable, professional, and really knew how to target my problem areas. Highly recommend!",
        date: "1 month ago"
    },
    {
        name: "Emily Rodriguez",
        service: "Hot Stone Therapy",
        rating: 5,
        text: "The hot stone therapy was pure bliss! The combination of heat and expert massage technique melted away all my stress. The atmosphere is so peaceful, and the staff is incredibly welcoming. D Best indeed!",
        date: "3 weeks ago"
    },
    {
        name: "David Thompson",
        service: "Aromatherapy Massage",
        rating: 5,
        text: "My wife and I both got aromatherapy massages, and we couldn't be happier. The essential oils were divine, and the whole experience was so relaxing. We're already planning our next visit!",
        date: "1 week ago"
    },
    {
        name: "Jennifer Martinez",
        service: "Custom Wellness Session",
        rating: 5,
        text: "I wasn't sure which massage to try, so they created a custom session for me. It was perfect! They listened to exactly what I needed and delivered an amazing experience. Best massage I've ever had!",
        date: "2 days ago"
    }
];

// ========== INITIALIZE TESTIMONIALS SLIDER ==========
function initTestimonials() {
    let currentIndex = 0;
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    // Display first testimonial
    displayTestimonial(currentIndex);
    
    // Create navigation dots
    createDots();
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
        displayTestimonial(currentIndex);
        updateDots(currentIndex);
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonialsData.length;
        displayTestimonial(currentIndex);
        updateDots(currentIndex);
    });
    
    // Auto-rotate every 6 seconds
    let autoRotate = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonialsData.length;
        displayTestimonial(currentIndex);
        updateDots(currentIndex);
    }, 6000);
    
    // Pause auto-rotate on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoRotate);
    });
    
    slider.addEventListener('mouseleave', function() {
        autoRotate = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonialsData.length;
            displayTestimonial(currentIndex);
            updateDots(currentIndex);
        }, 6000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (slider.matches(':hover')) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
    
    // Dot navigation
    function createDots() {
        testimonialsData.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            
            dot.addEventListener('click', function() {
                currentIndex = index;
                displayTestimonial(currentIndex);
                updateDots(currentIndex);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        updateDots(0);
    }
    
    function updateDots(activeIndex) {
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// ========== DISPLAY TESTIMONIAL ==========
function displayTestimonial(index) {
    const testimonial = testimonialsData[index];
    const slider = document.querySelector('.testimonials-slider');
    
    // Create stars
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
    
    // Update content with fade effect
    slider.style.opacity = '0';
    
    setTimeout(() => {
        slider.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-stars">${stars}</div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <p class="testimonial-name">${testimonial.name}</p>
                    <p class="testimonial-service">${testimonial.service}</p>
                    <p class="testimonial-date">${testimonial.date}</p>
                </div>
            </div>
        `;
        slider.style.opacity = '1';
    }, 300);
}

// ========== ADD TESTIMONIALS COUNTER ==========
document.addEventListener('DOMContentLoaded', function() {
    const testimonialSection = document.querySelector('.testimonials');
    
    if (testimonialSection) {
        const counter = document.createElement('div');
        counter.className = 'testimonials-counter';
        counter.innerHTML = `
            <p><strong>${testimonialsData.length}</strong> Happy Clients Sharing Their Experience</p>
        `;
        
        testimonialSection.insertBefore(counter, testimonialSection.firstChild);
    }
});