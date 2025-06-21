document.addEventListener('DOMContentLoaded', function() {
  const topicList = document.getElementById('topic-list');
  const newTopicForm = document.getElementById('new-topic-form');
  const modalOverlay = document.getElementById('topic-detail-modal');
  const modalCloseButton = modalOverlay.querySelector('.modal-close-button');
  const modalTopicTitle = document.getElementById('modal-topic-title');
  const modalTopicMeta = document.getElementById('modal-topic-meta');
  const modalTopicDescription = document.getElementById('modal-topic-description');
  const qaList = document.getElementById('qa-list');
  const newResponseText = document.getElementById('new-response-text');
  const newResponseLink = document.getElementById('new-response-link');
  const submitResponseButton = document.getElementById('submit-response');

  let currentTopicId = null; // Para controlar qual tópico está aberto no modal

  // Array para armazenar os tópicos (simulando um banco de dados local)
  // Inicialize com os tópicos existentes no HTML para facilitar a visualização
  const topics = [
      {
          id: 1,
          title: "Como a Nova Lei de Licitações impacta pequenas empresas?",
          description: "Dúvidas sobre os requisitos e oportunidades para MEIs e EPPs com a Lei nº 14.133/2021. Quais os principais pontos de atenção e como se preparar para as mudanças?",
          author: "João Silva",
          email: "joao.silva@example.com",
          date: "15/05/2024",
          likes: 120,
          dislikes: 5,
          responses: [
              {
                  text: "Ótima pergunta! A nova lei foca na transparência e planejamento. Para MEIs, o sistema agora permite participação mais simplificada em alguns tipos de licitação.",
                  author: "Servidor Público",
                  link: "https://www.gov.br/compras",
                  likes: 5,
                  dislikes: 0
              },
              {
                  text: "Recomendo consultar os cadernos técnicos do Ministério da Economia sobre a Lei 14.133. Eles têm guias práticos para fornecedores.",
                  author: "Ana Formiga",
                  link: "https://www.gov.br/compras/pt-br/nllc",
                  likes: 3,
                  dislikes: 0
              }
          ]
      },
      {
          id: 2,
          title: "Ferramentas de IA para otimização de processos de compra",
          description: "Quais inteligências artificiais ou softwares baseados em IA podem ajudar na análise de propostas, gestão de contratos e otimização de estoque no setor público?",
          author: "Maria Souza",
          email: "maria.souza@example.com",
          date: "10/05/2024",
          likes: 85,
          dislikes: 2,
          responses: [
              {
                  text: "Já vi algumas soluções que usam IA para analisar cláusulas contratuais e identificar riscos. Seria interessante um piloto em algum órgão.",
                  author: "Carlos P. Neto",
                  link: "",
                  likes: 2,
                  dislikes: 0
              }
          ]
      },
      {
          id: 3,
          title: "Dicas para servidores: como se capacitar em gestão de contratos?",
          description: "Procuro recomendações de cursos, manuais e melhores práticas para aperfeiçoamento profissional na área de gestão e fiscalização de contratos administrativos.",
          author: "Pedro Costa",
          email: "pedro.costa@example.com",
          date: "01/05/2024",
          likes: 60,
          dislikes: 0,
          responses: [
              {
                  text: "A Escola Nacional de Administração Pública (ENAP) tem ótimos cursos online gratuitos sobre o tema.",
                  author: "Fernanda G. Dias",
                  link: "https://www.enap.gov.br/pt/cursos",
                  likes: 10,
                  dislikes: 0
              }
          ]
      }
  ];

  // Função para renderizar um tópico na lista
  function renderTopic(topic) {
      const topicCard = document.createElement('div');
      topicCard.className = 'topic-card bg-white p-5 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between';
      topicCard.innerHTML = `
          <div class="md:flex-grow">
              <h3 class="text-xl font-semibold text-primary-color cursor-pointer hover:underline" data-topic-id="${topic.id}">${topic.title}</h3>
              <p class="text-sm text-gray-600 mt-1">por <span class="font-medium">${topic.author}</span> em ${topic.date}</p>
              <p class="text-gray-700 text-sm mt-2">${topic.description.substring(0, 150)}${topic.description.length > 150 ? '...' : ''}</p>
          </div>
          <div class="topic-interactions flex items-center space-x-4 mt-4 md:mt-0 md:ml-4">
              <button class="like-button text-gray-500 hover:text-green-600 transition-colors" data-topic-id="${topic.id}" aria-label="Curtir"><i class="fas fa-thumbs-up"></i> <span class="like-count">${topic.likes}</span></button>
              <button class="dislike-button text-gray-500 hover:text-red-600 transition-colors" data-topic-id="${topic.id}" aria-label="Não curtir"><i class="fas fa-thumbs-down"></i> <span class="dislike-count">${topic.dislikes}</span></button>
              <span class="total-interactions text-lg font-bold text-dark-blue">${topic.likes + topic.dislikes}</span>
          </div>
      `;
      topicList.appendChild(topicCard);

      // Adiciona event listeners para os botões de like/dislike e para o clique no título
      topicCard.querySelector('.like-button').addEventListener('click', () => handleLikeDislike(topic.id, 'like'));
      topicCard.querySelector('.dislike-button').addEventListener('click', () => handleLikeDislike(topic.id, 'dislike'));
      topicCard.querySelector('h3').addEventListener('click', () => openTopicDetailModal(topic.id));
  }

  // Função para ordenar e exibir todos os tópicos
  function displayTopics() {
      topicList.innerHTML = ''; // Limpa a lista antes de renderizar
      // Ordena por total de interações (likes + dislikes) do maior para o menor
      const sortedTopics = [...topics].sort((a, b) => (b.likes + b.dislikes) - (a.likes + a.dislikes));
      sortedTopics.forEach(renderTopic);
  }

  // Manipula likes e dislikes
  function handleLikeDislike(id, type) {
      const topic = topics.find(t => t.id === id);
      if (topic) {
          if (type === 'like') {
              topic.likes++;
          } else if (type === 'dislike') {
              topic.dislikes++;
          }
          displayTopics(); // Re-renderiza para atualizar contadores e ordem
      }
  }

  // Abre o modal de detalhes do tópico
  function openTopicDetailModal(id) {
      const topic = topics.find(t => t.id === id);
      if (topic) {
          currentTopicId = id;
          modalTopicTitle.textContent = topic.title;
          modalTopicMeta.textContent = `por ${topic.author} em ${topic.date}`;
          modalTopicDescription.textContent = topic.description;
          renderResponses(topic.responses);
          modalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden'; // Evita rolagem do body
      }
  }

  // Renderiza as respostas no modal
  function renderResponses(responses) {
      qaList.innerHTML = ''; // Limpa as respostas existentes
      if (responses.length === 0) {
          qaList.innerHTML = '<p class="text-gray-500">Nenhuma resposta ainda. Seja o primeiro a contribuir!</p>';
      } else {
          responses.forEach(response => {
              const qaItem = document.createElement('div');
              qaItem.className = 'qa-item bg-gray-50 p-4 rounded-md shadow-sm';
              qaItem.innerHTML = `
                  <p class="text-gray-800 mb-2">"${response.text}"</p>
                  <p class="text-sm text-gray-600">Resposta de: <span class="font-medium">${response.author}</span> ${response.link ? `- <a href="${response.link}" target="_blank" class="text-primary-color hover:underline">Link útil</a>` : ''}</p>
                  <div class="response-interactions flex items-center space-x-3 mt-3">
                      <button class="like-button-response text-gray-500 hover:text-green-600 transition-colors" data-response-id="${response.id || Math.random()}" data-type="like"><i class="fas fa-thumbs-up"></i> <span>${response.likes}</span></button>
                      <button class="dislike-button-response text-gray-500 hover:text-red-600 transition-colors" data-response-id="${response.id || Math.random()}" data-type="dislike"><i class="fas fa-thumbs-down"></i> <span>${response.dislikes}</span></button>
                  </div>
              `;
              qaList.appendChild(qaItem);

              // Adiciona event listeners para likes/dislikes das respostas
              qaItem.querySelector('.like-button-response').addEventListener('click', (e) => handleResponseLikeDislike(e.currentTarget, 'like', topic.id, response));
              qaItem.querySelector('.dislike-button-response').addEventListener('click', (e) => handleResponseLikeDislike(e.currentTarget, 'dislike', topic.id, response));
          });
      }
  }

  // Manipula likes/dislikes de respostas (simulado, não persistente no array 'topics' de forma complexa)
  function handleResponseLikeDislike(button, type, topicId, responseObj) {
      if (type === 'like') {
          responseObj.likes = (responseObj.likes || 0) + 1;
      } else {
          responseObj.dislikes = (responseObj.dislikes || 0) + 1;
      }
      // Atualiza o DOM diretamente para a resposta clicada
      button.querySelector('span').textContent = (type === 'like' ? responseObj.likes : responseObj.dislikes);
  }


  // Fecha o modal
  modalCloseButton.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restaura rolagem do body
      currentTopicId = null;
      newResponseText.value = '';
      newResponseLink.value = '';
  });

  // Fechar modal ao clicar fora dele
  modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
          document.body.style.overflow = '';
          currentTopicId = null;
          newResponseText.value = '';
          newResponseLink.value = '';
      }
  });

  // Envio de nova resposta no modal
  submitResponseButton.addEventListener('click', () => {
      if (currentTopicId === null) return; // Garante que um tópico esteja selecionado

      const responseText = newResponseText.value.trim();
      const responseLink = newResponseLink.value.trim();
      const topic = topics.find(t => t.id === currentTopicId);

      if (responseText && topic) {
          const newResponse = {
              text: responseText,
              author: "Usuário Anônimo", // Poderia ser o nome do usuário logado
              link: responseLink,
              likes: 0,
              dislikes: 0
          };
          topic.responses.push(newResponse);
          renderResponses(topic.responses); // Re-renderiza as respostas no modal
          newResponseText.value = '';
          newResponseLink.value = '';
          // Pode adicionar uma mensagem de sucesso aqui
      } else {
          alert('Por favor, digite uma resposta.');
      }
  });

  // Adiciona novo tópico via formulário
  newTopicForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const userName = document.getElementById('user-name').value.trim();
      const userEmail = document.getElementById('user-email').value.trim();
      const topicTitle = document.getElementById('topic-title').value.trim();
      const topicDescription = document.getElementById('topic-description').value.trim();

      if (userName && userEmail && topicTitle && topicDescription) {
          const newTopic = {
              id: topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1, // Gera um ID único
              title: topicTitle,
              description: topicDescription,
              author: userName,
              email: userEmail,
              date: new Date().toLocaleDateString('pt-BR'),
              likes: 0,
              dislikes: 0,
              responses: []
          };

          topics.push(newTopic);
          displayTopics(); // Re-renderiza para incluir o novo tópico
          newTopicForm.reset(); // Limpa o formulário
          alert('Tópico criado com sucesso!');
      } else {
          alert('Por favor, preencha todos os campos obrigatórios.');
      }
  });

  // Inicializa a exibição dos tópicos quando a página carrega
  displayTopics();

  // Funções do menu off-canvas (copiado de scripts.js para garantir que funcione nesta página)
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

      const menuLinks = offcanvasMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
          link.addEventListener('click', closeOffcanvasMenu);
      });
  }

  // Função placeholder para redefinir cookies (copiado de scripts.js)
  window._redefinirCookies = function() {
      console.log("Função para redefinir cookies foi chamada. Implemente a lógica real aqui.");
      alert("Cookies redefinidos! Você pode precisar recarregar a página.");
  };

  // Note: initCarousel and initSearch from scripts.js are not directly used in forum.html
  // but scripts.js is still linked. If these functions are needed, integrate them here.
});
