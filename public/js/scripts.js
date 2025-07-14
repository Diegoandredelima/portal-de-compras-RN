// Global variable to track the currently loaded page's logical ID
let currentLoadedPageLogicalId = 'home';

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Global function to determine and get category badge class
function getCategoryBadgeClass(category) {
    switch(category) {
        case 'comunicado': return 'badge-info';
        case 'noticia': return 'badge-success';
        case 'evento': return 'badge-warning';
        case 'legislacao': return 'badge-info';
        case 'duvidas-lei': return 'badge-info';
        case 'melhores-praticas': return 'badge-success';
        case 'problemas-tecnicos': return 'badge-warning';
        case 'sugestoes': return 'badge-info';
        case 'geral': return 'badge-info';
        case 'duvidas': return 'badge-info';
        default: return 'badge-info';
    }
}

// Global function to determine and get category name
function getCategoryName(category) {
    switch(category) {
        case 'comunicado': return 'Comunicado';
        case 'noticia': return 'Notícia';
        case 'evento': return 'Evento';
        case 'legislacao': return 'Legislação';
        case 'duvidas-lei': return 'Dúvidas Lei';
        case 'melhores-praticas': return 'Melhores Práticas';
        case 'problemas-tecnicos': return 'Problemas Técnicos';
        case 'sugestoes': return 'Sugestões';
        case 'geral': return 'Geral';
        case 'duvidas': return 'Dúvidas';
        default: return 'Geral';
    }
}
class BrCarousel {
    constructor(element) {
        this.carousel = element;
        this.stage = element.querySelector('.br-carousel__stage');
        this.items = element.querySelectorAll('.br-carousel__item');
        this.indicators = element.querySelectorAll('.br-carousel__indicator');
        this.prevBtn = element.querySelector('.br-carousel__btn--prev');
        this.nextBtn = element.querySelector('.br-carousel__btn--next');
        this.playPauseBtn = element.querySelector('#play-pause-btn');
        this.playIcon = element.querySelector('#play-icon');
        this.pauseIcon = element.querySelector('#pause-icon');
        
        this.currentSlide = 0;
        this.totalSlides = this.items.length;
        this.isPlaying = true;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoplay();
        this.updateIndicators();
    }

    setupEventListeners() {
        // Navegação
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Controle de reprodução
        this.playPauseBtn.addEventListener('click', () => this.toggleAutoplay());

        // Pausar no hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carousel.addEventListener('mouseleave', () => {
            if (this.isPlaying) {
                this.startAutoplay();
            }
        });

        // Teclado
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // Touch/swipe
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Verificar se é um swipe horizontal
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
        this.updateIndicators();
        this.resetAutoplay();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.updateIndicators();
        this.resetAutoplay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        this.updateIndicators();
        this.resetAutoplay();
    }

    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        this.stage.style.transform = `translateX(${translateX}%)`;
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoplay() {
        if (!this.isPlaying) return;
        
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resetAutoplay() {
        this.pauseAutoplay();
        if (this.isPlaying) {
            this.startAutoplay();
        }
    }

    toggleAutoplay() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.startAutoplay();
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
            this.playPauseBtn.setAttribute('aria-label', 'Pausar reprodução automática');
        } else {
            this.pauseAutoplay();
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            this.playPauseBtn.setAttribute('aria-label', 'Iniciar reprodução automática');
        }
    }
}

// Inicializar o carrossel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    if (carousel) {
        new BrCarousel(carousel);
    }
});

// Function to handle vote clicks (simulation) - Can be moved to forum.js if only forum uses it
function handleVote(button, type) {
    const span = button.querySelector('span');
    let currentCount = parseInt(span.innerText, 10);

    // Simple toggle logic for demo
    if (!button.classList.contains('active')) {
        span.innerText = currentCount + 1;
        button.classList.add('active');
        if (type === 'like') {
            button.classList.add('liked');
        } else {
             button.classList.add('disliked');
        }
    } else {
        span.innerText = currentCount - 1;
        button.classList.remove('active', 'liked', 'disliked');
    }
}

// Core function to load page content dynamically
async function loadPage(pagePath, logicalId, params = null) {
    const pageContentWrapper = document.getElementById('page-content-wrapper');
    if (!pageContentWrapper) {
        console.error('Page content wrapper not found.');
        return;
    }

    try {
        const response = await fetch(pagePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        pageContentWrapper.innerHTML = htmlContent;

        currentLoadedPageLogicalId = logicalId; // Update global state
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top

        // Initialize scripts relevant to the loaded page
        initializePageScripts(params);

    } catch (error) {
        console.error('Failed to load page:', error);
        pageContentWrapper.innerHTML = '<p class="text-red-600">Erro ao carregar a página.</p>';
    }
}

// Function to initialize scripts based on the loaded page
function initializePageScripts(params = null) {
    // News Page Initialization
    if (currentLoadedPageLogicalId === 'noticias') {
        if (typeof initNewsPage === 'function') {
            initNewsPage();
        }
    }
    // News Detail Page Initialization
    else if (currentLoadedPageLogicalId === 'noticia_detalhe') {
        if (typeof showNewsDetail === 'function' && params) {
            showNewsDetail(params); // params should be newsId
        }
    }
    // Forum Page Initialization
    else if (currentLoadedPageLogicalId === 'forum') {
        if (typeof initForumPage === 'function') {
            initForumPage();
        }
    }
    // Forum Topic Detail Page Initialization
    else if (currentLoadedPageLogicalId === 'forum_topic_detalhe') {
        if (typeof showForumTopicDetail === 'function' && params) {
            showForumTopicDetail(params); // params should be topicId
        }
    }
    // New Topic Page Initialization
    else if (currentLoadedPageLogicalId === 'forum_novo_topico') {
        if (typeof initNewTopicPage === 'function') {
            initNewTopicPage();
        }
    }
    // Add other page-specific initializations here as needed
}


document.addEventListener('DOMContentLoaded', function() {
    // Off-canvas menu toggle logic
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const offcanvasBackdrop = document.getElementById('offcanvas-backdrop');

    menuToggle.addEventListener('click', function() {
        offcanvasMenu.classList.add('active');
        offcanvasBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeOffcanvasMenu() {
        offcanvasMenu.classList.remove('active');
        offcanvasBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeMenu.addEventListener('click', closeOffcanvasMenu);
    offcanvasBackdrop.addEventListener('click', closeOffcanvasMenu);

    // Close menu when clicking a link in the menu
    const menuLinks = offcanvasMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeOffcanvasMenu);
    });

    // Initial page load (loads home.html into the content wrapper)
    loadPage('pages/home.html', 'home');
});

// Botões para a pagina legislação
document.addEventListener('DOMContentLoaded', function () {
    const filterContainer = document.getElementById('legislation-filter');
    if (!filterContainer) return;

    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const contentBlocks = document.querySelectorAll('.legislation-content');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            contentBlocks.forEach(block => {
                if (filter === 'all' || block.getAttribute('data-category') === filter) {
                    block.classList.remove('hidden');
                } else {
                    block.classList.add('hidden');
                }
            });
        });
    });
});

// Expose loadPage to the global scope for onclick attributes
window.loadPage = loadPage;
window.formatDate = formatDate;
window.getCategoryBadgeClass = getCategoryBadgeClass;
window.getCategoryName = getCategoryName;
window.handleVote = handleVote; // Keep handleVote global if used outside forum.js
