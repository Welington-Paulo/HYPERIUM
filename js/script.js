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
    // (Lógica do carrossel permanece a mesma da última versão)
    const carousels = document.querySelectorAll('.catalog-category');
    carousels.forEach((carouselCategory) => {
        const scrollableArea = carouselCategory.querySelector('.game-grid-scrollable-area');
        const grid = carouselCategory.querySelector('.game-grid');
        const prevButton = carouselCategory.querySelector('.prev-button');
        const nextButton = carouselCategory.querySelector('.next-button');

        if (!scrollableArea || !grid || !prevButton || !nextButton) { return; }
        let scrollAmount = 0;
        function calculateScrollAmount() {
            const firstCard = grid.querySelector('.game-card');
            if (firstCard) {
                const gridGap = parseFloat(window.getComputedStyle(grid).gap) || 25;
                scrollAmount = firstCard.offsetWidth + gridGap;
            } else { scrollAmount = 300 + 25; }
        }
        function updateButtonStates() {
            if (!scrollableArea.clientWidth || !grid.scrollWidth) return;
            const currentScrollLeft = Math.round(scrollableArea.scrollLeft);
            const maxScrollLeft = Math.round(grid.scrollWidth - scrollableArea.clientWidth);
            prevButton.disabled = currentScrollLeft <= 0;
            nextButton.disabled = currentScrollLeft >= maxScrollLeft - 1;
        }
        calculateScrollAmount();
        setTimeout(updateButtonStates, 150);
        prevButton.addEventListener('click', () => scrollableArea.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
        nextButton.addEventListener('click', () => scrollableArea.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
        let scrollTimer;
        scrollableArea.addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(updateButtonStates, 60); });
        const resizeObserver = new ResizeObserver(() => { calculateScrollAmount(); updateButtonStates(); });
        resizeObserver.observe(scrollableArea);
        const firstCardForObserver = grid.querySelector('.game-card');
        if (firstCardForObserver) resizeObserver.observe(firstCardForObserver);
    });

    // --- GERENCIAMENTO DE LOGIN NO HEADER (DESKTOP E MOBILE) ---
    // (Lógica de login/logout permanece a mesma da última versão)
    const loginLinkDesktop = document.getElementById('loginLinkDesktop');
    const userDropdownContainerDesktop = document.getElementById('userDropdownContainerDesktop');
    const userProfileNameDisplayDesktop = document.getElementById('userProfileNameDisplayDesktop');
    const userProfileBtnDesktop = document.getElementById('userProfileBtnDesktop');
    const dropdownMenuDesktop = document.getElementById('dropdownMenuDesktop');
    const logoutBtnDesktop = document.getElementById('logoutBtnDesktop');

    const loginLinkMobile = document.getElementById('loginLinkMobile');
    const userDropdownContainerMobile = document.getElementById('userDropdownContainerMobile');
    const userProfileNameDisplayMobile = document.getElementById('userProfileNameDisplayMobile');
    const userProfileBtnMobile = document.getElementById('userProfileBtnMobile');
    const dropdownMenuMobile = document.getElementById('dropdownMenuMobile');
    const logoutBtnMobile = document.getElementById('logoutBtnMobile');

    function updateLoginUI(isLoggedIn, userName) {
        if (loginLinkDesktop && userDropdownContainerDesktop && userProfileNameDisplayDesktop) {
            loginLinkDesktop.classList.toggle('hidden', isLoggedIn && userName);
            userDropdownContainerDesktop.classList.toggle('hidden', !(isLoggedIn && userName));
            if (isLoggedIn && userName) userProfileNameDisplayDesktop.textContent = userName;
        }
        if (loginLinkMobile && userDropdownContainerMobile && userProfileNameDisplayMobile) {
             loginLinkMobile.classList.toggle('hidden', isLoggedIn && userName);
             userDropdownContainerMobile.classList.toggle('hidden', !(isLoggedIn && userName));
             if (isLoggedIn && userName) userProfileNameDisplayMobile.textContent = userName;
             if (!isLoggedIn && dropdownMenuMobile) dropdownMenuMobile.classList.add('hidden');
        }
    }
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userProfileName = localStorage.getItem('userProfileName');
        updateLoginUI(isLoggedIn, userProfileName);
    }
    function setupDropdown(btn, menu) {
        if (btn && menu) {
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', String(!isExpanded));
                menu.classList.toggle('hidden');
            });
        }
    }
    setupDropdown(userProfileBtnDesktop, dropdownMenuDesktop);
    setupDropdown(userProfileBtnMobile, dropdownMenuMobile); 
    window.addEventListener('click', (event) => {
        const closeSpecificDropdown = (menuEl, btnEl) => {
            if (menuEl && !menuEl.classList.contains('hidden')) {
                if (btnEl && !btnEl.contains(event.target) && !menuEl.contains(event.target) ) {
                    menuEl.classList.add('hidden');
                    btnEl.setAttribute('aria-expanded', 'false');
                }
            }
        };
        closeSpecificDropdown(dropdownMenuDesktop, userProfileBtnDesktop);
        closeSpecificDropdown(dropdownMenuMobile, userProfileBtnMobile);
    });
    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userProfileName');
        checkLoginStatus(); 
        if (dropdownMenuDesktop && !dropdownMenuDesktop.classList.contains('hidden')) {
            dropdownMenuDesktop.classList.add('hidden');
            if (userProfileBtnDesktop) userProfileBtnDesktop.setAttribute('aria-expanded', 'false');
        }
        if (dropdownMenuMobile && !dropdownMenuMobile.classList.contains('hidden')) {
            dropdownMenuMobile.classList.add('hidden');
            if (userProfileBtnMobile) userProfileBtnMobile.setAttribute('aria-expanded', 'false');
        }
    }
    if (logoutBtnDesktop) logoutBtnDesktop.addEventListener('click', handleLogout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', handleLogout);
    
    // --- MENU HAMBÚRGUER ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle'); // Botão no header principal
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn'); // NOVO: Botão de fechar DENTRO do overlay

    if (mobileMenuToggle && mobileMenuOverlay && mobileMenuCloseBtn) {
        const iconHamburger = mobileMenuToggle.querySelector('.icon-hamburger');
        const iconCloseInToggle = mobileMenuToggle.querySelector('.icon-close'); // Ícone X no botão de toggle original

        function openMobileMenu() {
            mobileMenuOverlay.classList.add('open');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            if (iconHamburger && iconCloseInToggle) {
                iconHamburger.classList.add('hidden');
                iconCloseInToggle.classList.remove('hidden');
            }
            document.body.classList.add('no-scroll');
        }

        function closeMobileMenu() {
            mobileMenuOverlay.classList.remove('open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            if (iconHamburger && iconCloseInToggle) {
                iconHamburger.classList.remove('hidden');
                iconCloseInToggle.classList.add('hidden');
            }
            document.body.classList.remove('no-scroll');

            // Se o dropdown do perfil mobile estiver aberto, feche-o também
            if (dropdownMenuMobile && !dropdownMenuMobile.classList.contains('hidden')) {
                dropdownMenuMobile.classList.add('hidden');
                if (userProfileBtnMobile) userProfileBtnMobile.setAttribute('aria-expanded', 'false');
            }
        }

        mobileMenuToggle.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('open')) {
                // Isso não deveria acontecer se o X dedicado estiver funcionando,
                // mas é uma salvaguarda. O X dedicado é o principal para fechar.
                // closeMobileMenu(); // Comentado, pois o X dedicado deve cuidar disso
            } else {
                openMobileMenu();
            }
        });

        mobileMenuCloseBtn.addEventListener('click', closeMobileMenu); // Novo listener para o botão X dedicado
    }
    
    checkLoginStatus();
});