class TextHighlighter {
    constructor() {
        this.elements = [];
        this.highlightedElements = new Set();
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.elements = Array.from(document.querySelectorAll('.highlight-text'));
        if (this.elements.length === 0) return;

        // Respect user motion preferences: show highlights at rest, skip the reveal animation.
        if (this.reduceMotion) {
            this.elements.forEach(el => el.classList.add('highlighted'));
            return;
        }

        this.setupObserver();
        this.highlightInitialElements();
    }

    setupObserver() {
        const options = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            // Stagger reveals when multiple highlights enter the trigger zone in the same batch.
            let staggerIndex = 0;
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.highlightedElements.has(entry.target)) {
                    const delay = staggerIndex * 120;
                    staggerIndex++;
                    if (delay === 0) {
                        this.highlightElement(entry.target);
                    } else {
                        setTimeout(() => this.highlightElement(entry.target), delay);
                    }
                }
            });
        }, options);

        this.elements.forEach(element => this.observer.observe(element));
    }

    highlightInitialElements() {
        const topHalf = window.innerHeight * 0.5;
        this.elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= topHalf) {
                this.highlightElement(element);
            }
        });
    }

    highlightElement(element) {
        if (this.highlightedElements.has(element)) return;
        this.highlightedElements.add(element);
        element.classList.add('highlighted');
        this.observer?.unobserve(element);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TextHighlighter());
} else {
    new TextHighlighter();
}
