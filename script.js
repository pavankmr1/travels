document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Here you would typically send the data to your server
            // For now, we'll just show a success message
            alert('Thank you for your enquiry! We will contact you soon.');
            this.reset();
        });
    }

    // Add animation to cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.card').forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Initialize all carousels with enhanced settings
    const carousels = [
        document.querySelector('#touristCarousel'),
        document.querySelector('#sedanCarousel'),
        document.querySelector('#suvCarousel')
    ];

    carousels.forEach(carousel => {
        if (carousel) {
            const carouselInstance = new bootstrap.Carousel(carousel, {
                interval: 3000,     // Change slide every 3 seconds
                wrap: true,         // Continuous loop
                keyboard: true,     // Enable keyboard navigation
                pause: 'hover',     // Pause on mouse hover
                touch: true         // Enable touch swiping on mobile
            });

            // Add smooth transition effect
            carousel.addEventListener('slide.bs.carousel', function () {
                const activeItem = this.querySelector('.carousel-item.active');
                const nextItem = this.querySelector('.carousel-item-next');
                
                if (activeItem && nextItem) {
                    activeItem.style.transition = 'transform 0.6s ease-in-out';
                    nextItem.style.transition = 'transform 0.6s ease-in-out';
                }
            });
        }
    });

    // Initialize testimonials carousel with enhanced settings
    const testimonialsCarousel = document.querySelector('#testimonialsCarousel');
    if (testimonialsCarousel) {
        const carouselInstance = new bootstrap.Carousel(testimonialsCarousel, {
            interval: 4000,     // Change slide every 4 seconds
            wrap: true,         // Continuous loop
            keyboard: true,     // Enable keyboard navigation
            pause: 'hover',     // Pause on mouse hover
            touch: true         // Enable touch swiping on mobile
        });

        // Add smooth transition effect
        testimonialsCarousel.addEventListener('slide.bs.carousel', function () {
            const activeItem = this.querySelector('.carousel-item.active');
            const nextItem = this.querySelector('.carousel-item-next');
            
            if (activeItem && nextItem) {
                activeItem.style.transition = 'transform 0.6s ease-in-out';
                nextItem.style.transition = 'transform 0.6s ease-in-out';
            }
        });

        // Ensure carousel starts automatically
        carouselInstance.cycle();
    }

    // Star Rating Functionality
    const ratingInput = document.querySelector('.rating-input');
    if (ratingInput) {
        const stars = ratingInput.querySelectorAll('i');
        let selectedRating = 0;

        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                updateStars(rating);
            });

            star.addEventListener('mouseout', function() {
                updateStars(selectedRating);
            });

            star.addEventListener('click', function() {
                selectedRating = this.getAttribute('data-rating');
                updateStars(selectedRating);
            });
        });

        function updateStars(rating) {
            stars.forEach(star => {
                const starRating = star.getAttribute('data-rating');
                if (starRating <= rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                    star.classList.add('active');
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                    star.classList.remove('active');
                }
            });
        }
    }

    // Feedback Form Submission
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('customerName').value;
            const travelType = document.getElementById('travelType').value;
            const rating = document.querySelectorAll('.rating-input i.active').length;
            const feedback = document.getElementById('feedbackText').value;

            // Create new testimonial card
            const newTestimonial = createTestimonialCard(name, travelType, rating, feedback);
            
            // Add to carousel
            addTestimonialToCarousel(newTestimonial);

            // Reset form
            this.reset();
            updateStars(0);

            // Show success message
            alert('Thank you for your feedback!');
        });
    }

    function createTestimonialCard(name, travelType, rating, feedback) {
        const stars = Array(rating).fill('<i class="fas fa-star text-warning"></i>').join('');
        const emptyStars = Array(5 - rating).fill('<i class="far fa-star text-warning"></i>').join('');

        return `
            <div class="col-md-4 mb-4">
                <div class="card testimonial-card h-100">
                    <div class="card-body">
                        <div class="testimonial-rating mb-3">
                            ${stars}${emptyStars}
                        </div>
                        <p class="card-text">"${feedback}"</p>
                        <div class="testimonial-author">
                            <strong>${name}</strong>
                            <p class="text-muted mb-0">${travelType}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function addTestimonialToCarousel(newTestimonial) {
        const carouselInner = document.querySelector('#testimonialsCarousel .carousel-inner');
        const lastCarouselItem = carouselInner.lastElementChild;
        const lastRow = lastCarouselItem.querySelector('.row');
        
        if (lastRow.children.length < 3) {
            lastRow.insertAdjacentHTML('beforeend', newTestimonial);
        } else {
            const newCarouselItem = document.createElement('div');
            newCarouselItem.className = 'carousel-item';
            newCarouselItem.innerHTML = `
                <div class="row">
                    ${newTestimonial}
                </div>
            `;
            carouselInner.appendChild(newCarouselItem);
        }
    }
}); 