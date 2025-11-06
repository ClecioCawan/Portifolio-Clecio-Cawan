// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger
    const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
    if (mobileMenu.classList.contains('active')) {
        hamburgers[0].style.transform = 'rotate(45deg) translateY(8px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    }
});

// Smooth scroll for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add click handlers to all navigation links
document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScroll(href);
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            const hamburgers = mobileMenuBtn.querySelectorAll('hamburger');
            hamburgers[0].style.transform = 'none';
            hamburgers[1].style.opacity = '1';
            hamburgers[2].style.transform = 'none';
        }
    });
});

// Smooth scroll for hero buttons
document.querySelectorAll('.hero-buttons a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScroll(href);
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show toast notification
    showToast('Mensagem enviada com sucesso!');
    
    // Reset form
    contactForm.reset();
});

// Toast notification function
function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-card, .project-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Prevent default for empty links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

//Log welcome message
console.log('%c👋 Bem-vindo ao meu portfolio!', 'color: #7c3aed; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ usando HTML, CSS e JavaScript', 'color: #a78bfa; font-size: 14px;');
