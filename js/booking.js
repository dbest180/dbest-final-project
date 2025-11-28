// ========== BOOKING.JS - Appointment Booking System ==========

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        initBookingForm();
    }
});

// ========== INITIALIZE BOOKING FORM ==========
function initBookingForm() {
    const form = document.getElementById('booking-form');
    const serviceSelect = document.getElementById('service');
    const dateInput = document.getElementById('appointment-date');
    const timeSelect = document.getElementById('appointment-time');
    const phoneInput = document.getElementById('phone');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Populate time slots
    populateTimeSlots();
    
    // Format phone number as user types
    phoneInput.addEventListener('input', function(e) {
        const formatted = formatPhoneNumber(e.target.value);
        e.target.value = formatted;
    });
    
    // Update available times based on selected date
    dateInput.addEventListener('change', function() {
        populateTimeSlots();
    });
    
    // Handle form submission
    form.addEventListener('submit', handleBookingSubmit);
}

// ========== POPULATE TIME SLOTS ==========
function populateTimeSlots() {
    const dateInput = document.getElementById('appointment-date');
    const timeSelect = document.getElementById('appointment-time');
    const selectedDate = new Date(dateInput.value + 'T00:00:00');
    const day = selectedDate.getDay();
    
    // Clear existing options
    timeSelect.innerHTML = '<option value="">Select a time</option>';
    
    // Determine hours based on day of week
    let startHour, endHour;
    if (day >= 1 && day <= 5) { // Monday - Friday
        startHour = 9;
        endHour = 20;
    } else if (day === 6) { // Saturday
        startHour = 10;
        endHour = 18;
    } else if (day === 0) { // Sunday
        startHour = 11;
        endHour = 17;
    }
    
    // Generate time slots (every 30 minutes)
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute of [0, 30]) {
            const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const displayTime = formatTime(hour, minute);
            
            const option = document.createElement('option');
            option.value = timeValue;
            option.textContent = displayTime;
            timeSelect.appendChild(option);
        }
    }
}

// ========== FORMAT TIME FOR DISPLAY ==========
function formatTime(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
}

// ========== HANDLE FORM SUBMISSION ==========
function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: document.getElementById('appointment-date').value,
        time: document.getElementById('appointment-time').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!validateBookingForm(formData)) {
        return;
    }
    
    // Save booking to localStorage (simulated database)
    saveBooking(formData);
    
    // Show confirmation
    showBookingConfirmation(formData);
    
    // Reset form
    e.target.reset();
}

// ========== VALIDATE BOOKING FORM ==========
function validateBookingForm(data) {
    const errors = [];
    
    // Name validation
    if (data.name.trim().length < 2) {
        errors.push('Please enter your full name');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (must have 10 digits)
    const phoneDigits = data.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        errors.push('Please enter a valid 10-digit phone number');
    }
    
    // Service validation
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    // Date validation
    if (!data.date) {
        errors.push('Please select an appointment date');
    }
    
    // Time validation
    if (!data.time) {
        errors.push('Please select an appointment time');
    }
    
    // Display errors if any
    if (errors.length > 0) {
        showErrors(errors);
        return false;
    }
    
    return true;
}

// ========== SHOW VALIDATION ERRORS ==========
function showErrors(errors) {
    // Remove existing error display
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error display
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <h4>Please correct the following:</h4>
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    
    // Insert before form
    const form = document.getElementById('booking-form');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.classList.add('fade-out');
        setTimeout(() => errorDiv.remove(), 500);
    }, 5000);
}

// ========== SAVE BOOKING TO LOCALSTORAGE ==========
function saveBooking(booking) {
    // Get existing bookings
    let bookings = JSON.parse(localStorage.getItem('dbest_bookings') || '[]');
    
    // Add new booking
    bookings.push(booking);
    
    // Save back to localStorage
    localStorage.setItem('dbest_bookings', JSON.stringify(bookings));
}

// ========== SHOW BOOKING CONFIRMATION ==========
function showBookingConfirmation(booking) {
    // Format date for display
    const date = new Date(booking.date + 'T00:00:00');
    const dateString = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Create confirmation modal
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-header">
                <span class="checkmark">✓</span>
                <h3>Booking Confirmed!</h3>
            </div>
            <div class="confirmation-details">
                <p><strong>Name:</strong> ${booking.name}</p>
                <p><strong>Service:</strong> ${booking.service}</p>
                <p><strong>Date:</strong> ${dateString}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
            </div>
            <p class="confirmation-note">
                We've received your appointment request. You'll receive a confirmation email at ${booking.email} shortly. 
                If you need to make changes, please call us at (713) 555-BEST.
            </p>
            <button class="confirmation-close" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 500);
    }, 10000);
}

// ========== UTILITY: FORMAT PHONE NUMBER ==========
function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length >= 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length >= 3) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    return cleaned;
}