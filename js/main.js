
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .glass-card, .skill-category, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Background Animation (Matrix/Data Stream)

    // Background Animation (Matrix/Data Stream)
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    const columns = Math.floor(width / 20);
    const drops = [];
    const colors = ['#f9ff5e', '#ffa237', '#b57436', '#ffffff', '#f7e9b5'];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Random Katakana character
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);

            // Random color from palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillStyle = color;

            ctx.fillText(text, i * 20, drops[i] * 20);

            if (drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);


    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
});

/* Loading Screen Logic */
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const terminalOutput = document.getElementById('terminal-output');

    if (loadingScreen && terminalOutput) {
        // Initial State
        loadingScreen.style.color = '#f9ff5e';

        // Step 1: Establishing Connection (Immediate)
        terminalOutput.innerHTML = '<div class="text-secondary">> Establishing connection...</div>';

        // Step 2: Active Status (after 1s)
        setTimeout(() => {
            terminalOutput.innerHTML += '<div>> Network Status: <span class="status-active text-success">ACTIVE</span></div>';

            // Step 3: Fade out (after another 1s, total ~2s)
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        }, 1000);
    }
});




/* Cybernetic Cursor Logic */
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const body = document.body;

    // Only activate custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            // Move cursor
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Create trail
            createTrail(e.clientX, e.clientY);
        });

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .glass-card, input, textarea, .accordion-header');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                body.classList.add('hovering');
            });

            el.addEventListener('mouseleave', () => {
                body.classList.remove('hovering');
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        function createTrail(x, y) {
            // Throttle trail creation for performance
            if (Math.random() > 0.5) {
                const dot = document.createElement('div');
                dot.classList.add('trail-dot');
                dot.style.left = x + 'px';
                dot.style.top = y + 'px';
                document.body.appendChild(dot);

                // Remove after animation
                setTimeout(() => {
                    dot.remove();
                }, 500);
            }
        }
    } else {
        // Hide custom cursor on touch devices
        if (cursor) cursor.style.display = 'none';
        body.style.cursor = 'auto';
    }
});

