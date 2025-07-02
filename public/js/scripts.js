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

// Expose loadPage to the global scope for onclick attributes
window.loadPage = loadPage;
window.formatDate = formatDate;
window.getCategoryBadgeClass = getCategoryBadgeClass;
window.getCategoryName = getCategoryName;
window.handleVote = handleVote; // Keep handleVote global if used outside forum.js
