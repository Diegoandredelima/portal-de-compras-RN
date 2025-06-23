document.addEventListener('DOMContentLoaded', function () {
    // Lógica para o menu off-canvas
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const offcanvasBackdrop = document.getElementById('offcanvas-backdrop');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            offcanvasMenu.classList.add('active');
            offcanvasBackdrop.classList.add('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            offcanvasMenu.classList.remove('active');
            offcanvasBackdrop.classList.remove('active');
        });
    }

    if (offcanvasBackdrop) {
        offcanvasBackdrop.addEventListener('click', () => {
            offcanvasMenu.classList.remove('active');
            offcanvasBackdrop.classList.remove('active');
        });
    }

    // Lógica do Carrossel
    const carousel = document.getElementById('image-carousel');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    if (carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        let currentIndex = 0;
        let intervalId;

        // Criar indicadores
        for (let i = 0; i < totalItems; i++) {
            const button = document.createElement('button');
            button.classList.add('carousel-indicator');
            if (i === 0) button.classList.add('active');
            button.setAttribute('data-index', i);
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                goToSlide(index);
            });
            indicatorsContainer.appendChild(button);
        }
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetInterval();
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }

        function startInterval() {
            intervalId = setInterval(showNext, 5000); // Muda a cada 5 segundos
        }

        function resetInterval() {
            clearInterval(intervalId);
            startInterval();
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                showPrev();
                resetInterval();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                showNext();
                resetInterval();
            });
        }

        startInterval();
    }
});
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
// Instanciação do Carrossel do Gov.br Design System
    // Garanta que 'core.min.js' seja carregado antes deste script.
    if (typeof core !== 'undefined' && typeof core.BRCarousel !== 'undefined') {
      const carouselList = [];
      for (const brCarousel of window.document.querySelectorAll('.br-carousel')) {
          carouselList.push(new core.BRCarousel('br-carousel', brCarousel));
      }
      console.log("Carrossel do Gov.br Design System instanciado.");
  } else {
      console.warn("Objeto 'core' ou 'BRCarousel' não encontrado. Verifique a importação de core.min.js.");
  }
  // Outras inicializações
  initCarousel();
  initSearch(); // Garante que a função de busca seja inicializada
});
