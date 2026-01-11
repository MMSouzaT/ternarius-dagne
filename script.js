// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Property Filters
    const tipoFilter = document.getElementById('tipo-filter');
    const transacaoFilter = document.getElementById('transacao-filter');
    const propertyCards = document.querySelectorAll('.property-card');

    function filterProperties() {
        const tipoValue = tipoFilter ? tipoFilter.value : '';
        const transacaoValue = transacaoFilter ? transacaoFilter.value : '';

        propertyCards.forEach(card => {
            const cardTipo = card.getAttribute('data-tipo');
            const cardTransacao = card.getAttribute('data-transacao');
            
            const tipoMatch = !tipoValue || cardTipo === tipoValue;
            const transacaoMatch = !transacaoValue || cardTransacao === transacaoValue;

            if (tipoMatch && transacaoMatch) {
                card.style.display = 'block';
                // Add animation
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (tipoFilter) {
        tipoFilter.addEventListener('change', filterProperties);
    }

    if (transacaoFilter) {
        transacaoFilter.addEventListener('change', filterProperties);
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !phone || !subject || !message) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Por favor, insira um email válido.';
                return;
            }

            // Simulate form submission for demonstration purposes
            // NOTE: In production, replace this with a backend API call:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, phone, subject, message })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     formMessage.className = 'form-message success';
            //     formMessage.textContent = data.message;
            // })
            // .catch(error => {
            //     formMessage.className = 'form-message error';
            //     formMessage.textContent = 'Erro ao enviar mensagem. Tente novamente.';
            // });
            
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            
            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Validate that href is not just '#' and contains a valid selector
            if (href && href !== '#' && href.length > 1) {
                try {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } catch (error) {
                    // Invalid selector, ignore the click event
                    // In development, you might want to log this for debugging
                }
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards, property cards, and other elements
    const animatedElements = document.querySelectorAll('.service-card, .property-card, .feature, .value-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // WhatsApp button hover effect enhancement
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        whatsappButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Header hide/show on scroll with performance optimization
    // Uses requestAnimationFrame to throttle scroll events for better performance
    // Hides header when scrolling down, shows when scrolling up
    let lastScrollTop = 0;
    let ticking = false;
    const header = document.querySelector('header');
    
    function handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });

    header.style.transition = 'transform 0.3s ease';
});
