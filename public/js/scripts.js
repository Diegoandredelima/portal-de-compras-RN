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

// Função para inicializar o carrossel (mantida como estava)
function initCarousel() {
  // Implementação do carrossel aqui
  console.log('Carrossel inicializado');
}

// Função para inicializar a busca
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const servicoCards = document.querySelectorAll('.servico-card'); // Seleciona todos os cartões de serviço

  if (searchInput && servicoCards.length > 0) {
      searchInput.addEventListener('input', function(e) {
          const searchTerm = e.target.value.toLowerCase().trim(); // Pega o termo de busca, em minúsculas e sem espaços extras

          servicoCards.forEach(card => {
              const titleElement = card.querySelector('.servico-title');
              const descriptionElement = card.querySelector('.servico-description');

              // Verifica se os elementos de título e descrição existem no cartão
              if (titleElement && descriptionElement) {
                  const cardTitle = titleElement.textContent.toLowerCase();
                  const cardDescription = descriptionElement.textContent.toLowerCase();

                  // Se o termo de busca estiver vazio, mostra todos os cartões
                  if (searchTerm === '') {
                      card.style.display = 'flex'; // ou 'block', dependendo do seu display original
                  } else {
                      // Verifica se o termo de busca está presente no título ou na descrição do cartão
                      if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
                          card.style.display = 'flex'; // Mostra o cartão
                      } else {
                          card.style.display = 'none'; // Esconde o cartão
                      }
                  }
              }
          });
      });
  } else {
      console.warn("Input de busca ou cartões de serviço não encontrados para inicializar a busca.");
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
          document.body.style.overflow = 'hidden'; // Impede rolagem do body quando o menu está aberto
      });

      function closeOffcanvasMenu() {
          offcanvasMenu.classList.remove('active');
          offcanvasBackdrop.classList.remove('active');
          document.body.style.overflow = ''; // Restaura rolagem do body
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
  initSearch(); // Garante que a função de busca seja inicializada
});
