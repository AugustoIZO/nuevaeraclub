document.addEventListener('DOMContentLoaded', function() {
    // Load dynamic content from admin panel
    loadDynamicContent();
    
    // Escuchar cambios desde el panel de administración
    window.addEventListener('adminDataUpdated', function(e) {
        console.log('Datos actualizados desde admin, recargando contenido...');
        loadDynamicContent();
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }

    // Sticky Header
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.padding = '10px 0';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.padding = '15px 0';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }
                
                // Scroll to the element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Event Slider
    const eventsSlider = document.querySelector('.events-slider');
    const prevEventBtn = document.querySelector('.events .prev-btn');
    const nextEventBtn = document.querySelector('.events .next-btn');
    
    if (eventsSlider && prevEventBtn && nextEventBtn) {
        const eventCards = document.querySelectorAll('.event-card');
        let eventCurrentIndex = 0;
        const eventCardWidth = eventCards[0].offsetWidth + 30; // Card width + gap
        const eventMaxIndex = Math.max(0, eventCards.length - Math.floor(eventsSlider.offsetWidth / eventCardWidth));
        
        // Update slider position
        function updateEventsSliderPosition() {
            eventsSlider.style.transform = `translateX(-${eventCurrentIndex * eventCardWidth}px)`;
        }
        
        // Event buttons click handlers
        prevEventBtn.addEventListener('click', function() {
            if (eventCurrentIndex > 0) {
                eventCurrentIndex--;
                updateEventsSliderPosition();
            }
        });
        
        nextEventBtn.addEventListener('click', function() {
            if (eventCurrentIndex < eventMaxIndex) {
                eventCurrentIndex++;
                updateEventsSliderPosition();
            }
        });
        
        // Initial position
        updateEventsSliderPosition();
        
        // Resize handling
        window.addEventListener('resize', function() {
            const newMaxIndex = Math.max(0, eventCards.length - Math.floor(eventsSlider.offsetWidth / eventCardWidth));
            eventCurrentIndex = Math.min(eventCurrentIndex, newMaxIndex);
            updateEventsSliderPosition();
        });
    }

    // Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const prevTestimonialBtn = document.querySelector('.testimonials .prev-btn');
    const nextTestimonialBtn = document.querySelector('.testimonials .next-btn');
    
    if (testimonialSlider && prevTestimonialBtn && nextTestimonialBtn) {
        const testimonials = document.querySelectorAll('.testimonial');
        let testimonialCurrentIndex = 0;
        const testimonialWidth = testimonials[0].offsetWidth + 30; // Card width + gap
        const testimonialMaxIndex = Math.max(0, testimonials.length - Math.floor(testimonialSlider.offsetWidth / testimonialWidth));
        
        // Update slider position
        function updateTestimonialSliderPosition() {
            testimonialSlider.style.transform = `translateX(-${testimonialCurrentIndex * testimonialWidth}px)`;
        }
        
        // Testimonial buttons click handlers
        prevTestimonialBtn.addEventListener('click', function() {
            if (testimonialCurrentIndex > 0) {
                testimonialCurrentIndex--;
                updateTestimonialSliderPosition();
            }
        });
        
        nextTestimonialBtn.addEventListener('click', function() {
            if (testimonialCurrentIndex < testimonialMaxIndex) {
                testimonialCurrentIndex++;
                updateTestimonialSliderPosition();
            }
        });
        
        // Initial position
        updateTestimonialSliderPosition();
        
        // Resize handling
        window.addEventListener('resize', function() {
            const newMaxIndex = Math.max(0, testimonials.length - Math.floor(testimonialSlider.offsetWidth / testimonialWidth));
            testimonialCurrentIndex = Math.min(testimonialCurrentIndex, newMaxIndex);
            updateTestimonialSliderPosition();
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos obligatorios');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Formulario enviado:', { name, email, phone, subject, message });
            
            // Show success message
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            
            // Clear form
            contactForm.reset();
        });
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.activity-card, .about-image, .about-text, .gallery-item');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function checkAnimations() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize element styles
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check animations on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Check animations on page load
    checkAnimations();

    // Gallery Lightbox (simple version)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '2000';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = imgSrc;
            lightboxImg.style.maxWidth = '90%';
            lightboxImg.style.maxHeight = '90%';
            lightboxImg.style.border = '3px solid white';
            lightboxImg.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
            
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '30px';
            closeBtn.style.color = 'white';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.cursor = 'pointer';
            
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            // Prevent scrolling while lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Close lightbox on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
        });
    });
});

// Load dynamic content from admin panel
function loadDynamicContent() {
    loadDynamicEvents();
    loadDynamicActivities();
    loadDynamicConfiguration();
}

// Load events from JSON file
async function loadDynamicEvents() {
    try {
        // Cargar eventos desde el archivo JSON compartido
        const events = await window.dataSync.loadEvents();
        const eventsSlider = document.querySelector('.events-slider');
        
        if (!eventsSlider) return;
        
        // Filtrar solo eventos futuros (incluye el día actual)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
        
        const futureEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today; // Incluye eventos de hoy
        });
        
        // Si no hay eventos futuros, mostrar mensaje
        if (futureEvents.length === 0) {
            eventsSlider.innerHTML = `
                <div class="no-events-message" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-calendar-times" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3>No hay eventos próximos</h3>
                    <p>Mantente atento a nuestras redes sociales para próximos anuncios</p>
                </div>
            `;
            return;
        }
    
        eventsSlider.innerHTML = futureEvents.map(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleDateString('es-ES', { month: 'short' });
            
            return `
                <div class="event-card">
                    <div class="event-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p class="event-time"><i class="far fa-clock"></i> ${event.time}</p>
                        <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <p class="event-description">${event.description || ''}</p>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Load activities from JSON file
async function loadDynamicActivities() {
    try {
        const activities = await window.dataSync.loadActivities();
        const activitiesGrid = document.querySelector('.activities-grid');
        
        if (!activitiesGrid || activities.length === 0) return;
        
        activitiesGrid.innerHTML = activities.map(activity => `
            <div class="activity-card">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <h3>${activity.name}</h3>
                <p>${activity.description || ''}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading activities:', error);
    }
}

// Load configuration from localStorage
function loadDynamicConfiguration() {
    const config = JSON.parse(localStorage.getItem('clubConfig'));
    
    if (!config) return;
    
    // Update club name in header
    const logoElement = document.querySelector('.logo h1');
    if (logoElement) {
        logoElement.textContent = config.name;
    }
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-content h1');
    const heroDescription = document.querySelector('.hero-content p');
    if (heroTitle) {
        heroTitle.textContent = `Bienvenidos a ${config.name}`;
    }
    if (heroDescription) {
        heroDescription.textContent = config.description;
    }
    
    // Update contact information
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        const text = item.querySelector('p');
        
        if (icon && text) {
            if (icon.classList.contains('fa-phone')) {
                text.textContent = config.phone;
            } else if (icon.classList.contains('fa-envelope')) {
                text.textContent = config.email;
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                text.textContent = config.address;
            }
        }
    });
    
    // Update footer
    const footerLogo = document.querySelector('.footer-logo h2');
    const footerDescription = document.querySelector('.footer-logo p');
    if (footerLogo) {
        footerLogo.textContent = config.name;
    }
    if (footerDescription) {
        footerDescription.textContent = config.description;
    }
}
