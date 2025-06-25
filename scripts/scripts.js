import { licitacaoService } from './services.js'; // Assuming services.js is in the same directory
import { Notification } from './notifications.js'; // Assuming notifications.js is in the same directory
const notification = new Notification(); // Create an instance for use in this file

// The showPage function is commented out as it targets '.page' elements not found in the current multi-HTML-file structure. It might be legacy code.
/*
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
*/
// Menu off-canvas
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');
  const offcanvasMenu = document.getElementById('offcanvas-menu');
  const offcanvasBackdrop = document.getElementById('offcanvas-backdrop');

  menuToggle.addEventListener('click', function () {
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
});

// Função para inicializar o carrossel
function initCarousel() {
  // Placeholder: Actual carousel implementation (e.g., slide logic, navigation) is needed here.
  console.log('Carrossel inicializado');
}

// Função para inicializar a busca
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase();
      // Placeholder: Actual search logic (e.g., filtering, API calls) is needed here.
      console.log('Termo de busca:', searchTerm);
    });
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
  initCarousel();
  initSearch();
});

// Example of API call with error handling
async function exampleFetchLicitacoes() {
  try {
    const params = {}; // Example parameters
    const data = await licitacaoService.list(params);
    console.log('Licitações recebidas:', data);
    notification.success('Licitações carregadas com sucesso!');
    // Further processing of data would go here
  } catch (error) {
    console.error('Falha ao buscar licitações:', error);
    notification.error(
      `Erro ao carregar licitações: ${error.message}. Verifique o console para mais detalhes.`,
    );
  }
}

// Example of how to call it (optional, can be commented out)
// document.addEventListener('DOMContentLoaded', () => {
// // exampleFetchLicitacoes(); // Call example function on page load or based on an event
// });
