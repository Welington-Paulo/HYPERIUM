// --- SCRIPT.JS (para index.html) ---

window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- CARROSSEL ---
    const carousels = document.querySelectorAll('.catalog-category');
    carousels.forEach(carouselCategory => {
        const wrapper = carouselCategory.querySelector('.game-carousel-wrapper');
        const scrollableArea = carouselCategory.querySelector('.game-grid-scrollable-area');
        const grid = carouselCategory.querySelector('.game-grid');
        const prevButton = carouselCategory.querySelector('.prev-button');
        const nextButton = carouselCategory.querySelector('.next-button');

        if (!wrapper || !scrollableArea || !grid || !prevButton || !nextButton) {
            return;
        }

        let scrollAmount = 0;

        function calculateScrollAmount() {
            const firstCard = grid.querySelector('.game-card');
            if (firstCard) {
                const gridGap = parseFloat(window.getComputedStyle(grid).gap) || 25;
                scrollAmount = firstCard.offsetWidth + gridGap;
            } else {
                scrollAmount = 300 + 25; // Fallback
            }
        }

        function updateButtonStates() {
            if (!scrollableArea || !grid || !prevButton || !nextButton) return;
            
            const currentScrollLeft = Math.round(scrollableArea.scrollLeft);
            const maxScrollLeft = Math.round(grid.scrollWidth - scrollableArea.clientWidth);

            prevButton.disabled = currentScrollLeft <= 0;
            nextButton.disabled = currentScrollLeft >= maxScrollLeft -1;
        }
        
        calculateScrollAmount();
        updateButtonStates();

        prevButton.addEventListener('click', () => {
            scrollableArea.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            scrollableArea.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        let scrollTimer;
        scrollableArea.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(updateButtonStates, 60);
        });
        
        const resizeObserver = new ResizeObserver(() => {
            calculateScrollAmount();
            updateButtonStates();
        });

        resizeObserver.observe(scrollableArea);
        const firstCardForObserver = grid.querySelector('.game-card');
        if (firstCardForObserver) {
            resizeObserver.observe(firstCardForObserver);
        }
    });

    // --- GERENCIAMENTO DE LOGIN NO HEADER ---
    const loginLink = document.getElementById('loginLink');
    const userDropdownContainer = document.getElementById('userDropdownContainer');
    const userProfileNameDisplay = document.getElementById('userProfileNameDisplay');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userProfileName = localStorage.getItem('userProfileName');

        if (loginLink && userDropdownContainer && userProfileNameDisplay) {
            if (isLoggedIn === 'true' && userProfileName) {
                loginLink.classList.add('hidden');
                userDropdownContainer.classList.remove('hidden');
                userProfileNameDisplay.textContent = userProfileName;
            } else {
                loginLink.classList.remove('hidden');
                userDropdownContainer.classList.add('hidden');
            }
        }
    }

    if (userProfileBtn && dropdownMenu) {
        userProfileBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            const isExpanded = userProfileBtn.getAttribute('aria-expanded') === 'true';
            userProfileBtn.setAttribute('aria-expanded', String(!isExpanded));
            dropdownMenu.classList.toggle('show');
        });
    }

    window.addEventListener('click', (event) => {
        if (dropdownMenu && dropdownMenu.classList.contains('show')) {
            if (userDropdownContainer && !userDropdownContainer.contains(event.target)) {
                dropdownMenu.classList.remove('show');
                if (userProfileBtn) userProfileBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userProfileName');
            checkLoginStatus();
            if (dropdownMenu && dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
                if (userProfileBtn) userProfileBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    checkLoginStatus();
});