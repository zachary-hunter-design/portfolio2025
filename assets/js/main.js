// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .hero-content').forEach(el => {
    observer.observe(el);
});

// highlighter code

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer to detect when elements enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all highlight spans in the same paragraph
                const paragraph = entry.target.closest('p');
                if (paragraph) {
                    const highlights = Array.from(paragraph.querySelectorAll('.highlight:not(.active)'));
                    
                    // Find the index of the current entry in the highlights array
                    const currentIndex = highlights.indexOf(entry.target);
                    
                    if (currentIndex !== -1) {
                        // Activate current highlight
                        entry.target.classList.add('active');
                        
                        // Activate next highlights with a delay to create sequence
                        let delay = 600; // milliseconds between highlights
                        
                        for (let i = currentIndex + 1; i < highlights.length; i++) {
                            setTimeout(() => {
                                highlights[i].classList.add('active');
                            }, (i - currentIndex) * delay);
                        }
                    }
                } else {
                    // If not in a paragraph, just activate this one
                    entry.target.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '0px 0px -100px 0px' // Adjust this to trigger earlier/later
    });
    
    // Observe all highlight elements
    document.querySelectorAll('.highlight').forEach(el => {
        observer.observe(el);
    });
});