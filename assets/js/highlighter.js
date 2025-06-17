// Configuration
const config = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
    delayBetweenHighlights: 400,
    debug: false
};

// Initialize when DOM is loaded
function initHighlights() {
    // Store all highlight elements
    const allHighlights = Array.from(document.querySelectorAll('.highlight'));
    let activeParagraphs = new Set();
    
    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const highlight = entry.target;
                const paragraph = highlight.closest('p, h1, h2, h3, h4, h5, h6, section, div');
                
                if (paragraph && !activeParagraphs.has(paragraph)) {
                    activeParagraphs.add(paragraph);
                    const paragraphHighlights = Array.from(paragraph.querySelectorAll('.highlight:not(.active)'));
                    
                    paragraphHighlights.forEach((hl, index) => {
                        setTimeout(() => {
                            hl.classList.add('active');
                            if (config.debug) console.log('Activated highlight:', hl.textContent);
                        }, index * config.delayBetweenHighlights);
                    });
                } else if (!paragraph) {
                    highlight.classList.add('active');
                    if (config.debug) console.log('Activated standalone highlight:', highlight.textContent);
                }
            }
        });
    }, {
        threshold: config.threshold,
        rootMargin: config.rootMargin
    });
    
    // Observe all highlight elements
    allHighlights.forEach(el => {
        observer.observe(el);
    });
    
    // Debug functions
    if (document.getElementById('resetHighlights')) {
        document.getElementById('resetHighlights').addEventListener('click', () => {
            allHighlights.forEach(el => el.classList.remove('active'));
            activeParagraphs.clear();
            if (config.debug) console.log('All highlights reset');
        });
    }
    
    if (document.getElementById('triggerAll')) {
        document.getElementById('triggerAll').addEventListener('click', () => {
            allHighlights.forEach((el, index) => {
                setTimeout(() => el.classList.add('active'), index * 100);
            });
        });
    }
    
    // Print support
    window.matchMedia('print').addListener((mq) => {
        if (mq.matches) allHighlights.forEach(el => el.classList.add('active'));
    });
}

// Start the highlighting system
document.addEventListener('DOMContentLoaded', initHighlights);