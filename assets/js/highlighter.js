class TextHighlighter {
    constructor() {
        this.elements = [];
        this.highlightedElements = new Set();
        this.init();
    }

    init() {
        // Find all highlight elements
        this.elements = Array.from(document.querySelectorAll('.highlight-text'));
        
        if (this.elements.length === 0) return;

        // Set up intersection observer for top half of viewport
        this.setupObserver();
        
        // Immediately highlight anything already in the top half
        this.highlightInitialElements();
    }

    setupObserver() {
        const options = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when element is in top half
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.highlightedElements.has(entry.target)) {
                    this.highlightElement(entry.target);
                }
            });
        }, options);

        // Observe all elements
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    highlightInitialElements() {
        // Immediately highlight anything in the top half of viewport
        const viewportHeight = window.innerHeight;
        const topHalf = viewportHeight * 0.5;

        this.elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            // Check if element is in top half of viewport
            if (rect.top >= 0 && rect.top <= topHalf) {
                this.highlightElement(element);
            }
        });
    }

    highlightElement(element) {
        // Prevent double highlighting
        if (this.highlightedElements.has(element)) return;

        // Mark as highlighted
        this.highlightedElements.add(element);
        
        // Add highlight class with small delay for smooth effect
        setTimeout(() => {
            element.classList.add('highlighted');
        }, 50);

        // Stop observing this element since it's now highlighted
        this.observer.unobserve(element);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TextHighlighter();
    });
} else {
    new TextHighlighter();
}