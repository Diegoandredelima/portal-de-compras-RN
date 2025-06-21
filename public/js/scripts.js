// Função para mostrar páginas
function showPage(pageId) {
    // Esconde todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostra a página selecionada
    document.getElementById(pageId).classList.add('active');
    
    // Rola para o topo
    window.scrollTo(0, 0);
}

// Função para inicializar o carrossel
function initCarousel() {
    // Implementação do carrossel aqui
    console.log('Carrossel inicializado');
}

// Função para inicializar a busca
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Implementar lógica de busca aqui
            console.log('Termo de busca:', searchTerm);
        });
    }
}

// Inicialização de todas as funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Menu off-canvas
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const offcanvasBackdrop = document.getElementById('offcanvas-backdrop');
    
    if (menuToggle && closeMenu && offcanvasMenu && offcanvasBackdrop) {
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
        
        // Fecha o menu ao clicar em um link
        const menuLinks = offcanvasMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeOffcanvasMenu);
        });
    }

    // Outras inicializações
    initCarousel();
    initSearch();
});