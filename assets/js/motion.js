/* Scroll-triggered motion for case studies and the homepage.
   Every effect is opt-in from JS: if this file fails or the visitor prefers
   reduced motion, content renders in its final state with nothing hidden. */
(function () {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var root = document.documentElement;
    root.classList.add('motion-on');

    function onceInView(el, fn, threshold) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { io.disconnect(); fn(el); }
            });
        }, { threshold: threshold || 0.2 });
        io.observe(el);
    }

    function belowFold(el) {
        return el.getBoundingClientRect().top > window.innerHeight * 0.9;
    }

    // 1. Fade and rise. Only things that start below the fold, so nothing
    //    the visitor can already see ever blinks out. Checked on scroll
    //    rather than with an observer, so anything jumped past (fast scroll,
    //    anchor link, find in page) still shows up instead of staying hidden.
    var revealSel = '.image-band, .research-band, .comparison-table, .cards-3, .testing-results-row, .research-quote, .case-study-card';
    var pending = [];
    document.querySelectorAll(revealSel).forEach(function (el) {
        if (!belowFold(el)) return;
        el.classList.add('reveal');
        pending.push(el);
    });
    var ticking = false;
    function checkReveals() {
        ticking = false;
        pending = pending.filter(function (el) {
            if (el.getBoundingClientRect().top > window.innerHeight * 0.92) return true;
            el.classList.add('in-view');
            // Hand the element back to its own styles (hover lifts etc.) once settled.
            setTimeout(function () { el.classList.remove('reveal', 'in-view'); }, 900);
            return false;
        });
        if (!pending.length) {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        }
    }
    function onScroll() {
        if (!ticking) { ticking = true; requestAnimationFrame(checkReveals); }
    }
    if (pending.length) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
    }

    // 2. Bars grow from the baseline when the chart scrolls into view.
    document.querySelectorAll('.bar-chart').forEach(function (chart) {
        chart.classList.add('bars-pending');
        onceInView(chart, function (c) { c.classList.add('bars-in'); }, 0.4);
    });

    // 3. Flow reorder. The "After" row starts in the old order and the moved
    //    steps slide into their new places, so the change itself is visible.
    document.querySelectorAll('.flow-compare').forEach(function (flow) {
        var rows = flow.querySelectorAll('.flow-row');
        if (rows.length < 2) return;
        var moved = rows[rows.length - 1].querySelectorAll('.is-moved');
        if (moved.length !== 2) return;
        var a = moved[0], b = moved[1];

        var settled = false;
        function swapOffsets() {
            if (settled) return;
            a.style.transform = '';
            b.style.transform = '';
            var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
            a.style.transform = 'translate(' + (rb.left - ra.left) + 'px,' + (rb.top - ra.top) + 'px)';
            b.style.transform = 'translate(' + (ra.left - rb.left) + 'px,' + (ra.top - rb.top) + 'px)';
        }

        flow.classList.add('flow-pending');
        swapOffsets();
        // Fonts and images can shift layout after first paint; re-measure.
        window.addEventListener('load', swapOffsets);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(swapOffsets);
        onceInView(flow, function (f) {
            setTimeout(function () {
                settled = true;
                f.classList.add('flow-in');
                a.style.transform = '';
                b.style.transform = '';
            }, 450);
        }, 0.6);
    });
})();
