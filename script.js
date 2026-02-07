// Page navigation
function showPage(pageId) {
    // Hide all page sections
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId === 'contact') {
                // Scroll to footer
                document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
            } else {
                const targetSection = document.querySelector('#' + targetId);
                if (targetSection) {
                    const offset = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    // Use a generous rootMargin so elements start animating BEFORE they enter the viewport
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px 100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation (faster transition)
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(section);
    });

    // Animate science cards on scroll (cap stagger at 0.05s)
    const scienceCards = document.querySelectorAll('.science-card');
    scienceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        const delay = Math.min(index * 0.05, 0.15);
        card.style.transition = `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`;
        observer.observe(card);
    });

    // Animate team members (cap stagger so later members don't wait forever)
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        const delay = Math.min(index * 0.04, 0.2);
        member.style.transition = `opacity 0.35s ease ${delay}s, transform 0.35s ease ${delay}s`;
        observer.observe(member);
    });

    // Animate accomplishment cards (cap stagger)
    const accomplishmentCards = document.querySelectorAll('.accomplishment-card');
    accomplishmentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        const delay = Math.min(index * 0.05, 0.2);
        card.style.transition = `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`;
        observer.observe(card);
    });
    
    // Button click animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mobile menu toggle (for future mobile responsiveness)
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.fontSize = '1.5rem';
        mobileMenuBtn.style.cursor = 'pointer';
        mobileMenuBtn.style.color = '#333';
        
        nav.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });
        
        // Show/hide mobile menu button based on screen size
        function checkMobileMenu() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navLinks.style.display = navLinks.classList.contains('mobile-active') ? 'flex' : 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                navLinks.style.display = 'flex';
                navLinks.classList.remove('mobile-active');
            }
        }
        
        window.addEventListener('resize', checkMobileMenu);
        checkMobileMenu();
    }
    
    createMobileMenu();
    
    // Add stats counter animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat h3');
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    // Only animate numbers
                    if (!isNaN(parseInt(finalValue))) {
                        const startValue = 0;
                        const increment = parseInt(finalValue) / 50;
                        let currentValue = startValue;
                        
                        const timer = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= parseInt(finalValue)) {
                                target.textContent = finalValue;
                                clearInterval(timer);
                            } else {
                                target.textContent = Math.floor(currentValue).toString();
                            }
                        }, 30);
                        
                        observer.unobserve(target);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
    animateStats();
    
    // Parallax effect for hero section (throttled with requestAnimationFrame)
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const heroHeight = hero.offsetHeight;

                    if (scrolled < heroHeight) {
                        const parallaxSpeed = 0.5;
                        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                        heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed * 0.8}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    parallaxEffect();
    
    // Initialize with home page
    showPage('home');
});

// Add smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.tech-feature, .about-content, .footer-section');

    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 100px 0px' });

    reveals.forEach(element => observer.observe(element));
}

// Call reveal animation after DOM content is loaded
document.addEventListener('DOMContentLoaded', revealOnScroll);