/**
 * @charset "UTF-8";
 * @description: Script para interatividade e gestão do Fórum de Compras Governamentais.
 * @version: 1.2
 * @date: 2025-07-18
 *
 * Estrutura do Script:
 * 1. ESTADO DA APLICAÇÃO
 * 2. DADOS SIMULADOS
 * 3. ELEMENTOS DO DOM
 * 4. FUNÇÕES DE INICIALIZAÇÃO
 * 5. FUNÇÕES DE RENDERIZAÇÃO
 * 6. FUNÇÕES DE EVENTOS (HANDLERS)
 * 7. FUNÇÕES DE LÓGICA (MODAL)
 * 8. FUNÇÕES DE AUTENTICAÇÃO E INTERAÇÃO
 * 9. INICIALIZAÇÃO
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===================================================================
    // 1. ESTADO DA APLICAÇÃO
    // ===================================================================
    let isLoggedIn = false;
    let currentTopicId = null;
    let userInteractions = JSON.parse(localStorage.getItem('userInteractions')) || {};
    let currentPage = 1;
    const topicsPerPage = 5;

    // ===================================================================
    // 2. DADOS SIMULADOS
    // ===================================================================
    const categories = {
        'legislacao': 'Legislação e Normas',
        'planejamento': 'Planejamento das Contratações',
        'modalidades': 'Modalidades de Licitação',
        'gestao': 'Gestão de Contratos',
        'transparencia': 'Transparência e Controle Social',
        'fiscalizacao': 'Fiscalização e Auditoria',
        'inovacao': 'Inovação e Tecnologia',
        'capacitacao': 'Capacitação Profissional',
        'fornecedores': 'Acesso de Fornecedores',
        'analise': 'Análise de Dados e BI',
        'sustentabilidade': 'Sustentabilidade nas Contratações',
        'duvidas': 'Dúvidas Frequentes',
    };

    let topics = [
        { id: 1, category: 'legislacao', title: "Lei 14.133 - Esclarecimentos sobre valores limite", description: "Análise aprofundada das novas regras para contratação direta e suas implicações práticas para gestores e fornecedores.", date: "2025-07-15", likes: 112, dislikes: 5, comments: [
            { author: "Pregoeiro_Master", text: "Excelente resumo! A dispensa eletrônica tem sido um desafio, mas o novo decreto ajuda a clarear os pontos." },
            { author: "Auditora_TCU", text: "Atenção ao Art. 75. Muitos órgãos ainda erram no somatório de despesas para evitar o fracionamento." },
            { author: "Fornecedor_PE", text: "@Pregoeiro_Master, qual a sua interpretação sobre a necessidade de 3 cotações para dispensas de baixo valor?" },
            { author: "Pregoeiro_Master", text: "@Fornecedor_PE, a jurisprudência recente do TCU (Acórdão 1234/2025) flexibilizou, mas a boa prática recomenda manter as cotações para garantir o preço de mercado." }
        ]},
        { id: 2, category: 'planejamento', title: "ETP Digital - Dicas sobre sistema Compras.gov.br", description: "Passo a passo e boas práticas para a criação de um Estudo Técnico Preliminar eficiente no novo sistema do governo federal.", date: "2025-07-14", likes: 98, dislikes: 2, comments: [
            { author: "Gestora_Contratos", text: "O sistema ainda é instável, mas a padronização do ETP ajuda muito na análise." },
            { author: "Consultor_SEGES", text: "Dica de ouro: preencham a seção de 'Resultados Pretendidos' com métricas claras. Isso facilita a fiscalização do contrato depois." },
            { author: "Servidor_Novo", text: "Alguém tem um modelo de ETP para aquisição de software como serviço (SaaS)?" },
            { author: "Gestora_Contratos", text: "@Servidor_Novo, tenho um ótimo! Me envie uma mensagem direta que compartilho o template." }
        ]},
        { id: 3, category: 'modalidades', title: "Diálogo Competitivo - Comparações com outras modalidades", description: "Discussão sobre os cenários ideais para aplicação da nova modalidade de licitação, focando em inovação e soluções complexas.", date: "2025-07-12", likes: 150, dislikes: 8, comments: [
            { author: "Juliana_S", text: "Excelente para soluções que o mercado precisa desenvolver. Usamos para um sistema de logística e foi um sucesso." },
            { author: "Advogado_Publico", text: "O desafio é a fase de diálogo. Exige muita preparação da equipe técnica para não direcionar a solução." },
            { author: "Empresario_Inovador", text: "Do lado do fornecedor, é uma ótima oportunidade de apresentar soluções criativas que não se encaixam no pregão tradicional." }
        ]},
        { id: 4, category: 'gestao', title: "Fiscalização Contratos - Práticas de acompanhamento", description: "Como garantir a qualidade e o cumprimento das obrigações em contratos de serviços contínuos, como limpeza e vigilância.", date: "2025-07-10", likes: 85, dislikes: 1, comments: [
            { author: "Fiscal_Contrato_RN", text: "Uso um checklist mensal e faço reuniões trimestrais com a empresa. Ajuda a corrigir desvios rapidamente." },
            { author: "Preposto_EmpresaX", text: "Uma comunicação clara entre fiscal e preposto é a chave. Muitos problemas são resolvidos com uma simples ligação." },
            { author: "Auditor_CGU", text: "Lembrem-se de registrar tudo no processo! O que não está nos autos, não existe para o controle. Fotos, relatórios, atas de reunião são fundamentais." }
        ]},
        { id: 5, category: 'transparencia', title: "PNCP Transparência - Integração de sistemas", description: "Vantagens e desafios do Portal Nacional de Contratações Públicas como ferramenta de controle social e integração de dados.", date: "2025-07-09", likes: 180, dislikes: 3, comments: [
            { author: "Marcos_A", text: "Facilitou muito a vida do cidadão fiscalizador! Agora consigo ver as compras do meu município em um só lugar." },
            { author: "Beatriz_C", text: "A integração com os sistemas municipais ainda é um desafio. Muitos dados chegam com atraso ou incompletos." },
            { author: "Desenvolvedor_Gov", text: "Estamos trabalhando em novas APIs para facilitar o envio de dados pelos municípios. A versão 2.0 da API de integração será lançada em breve." }
        ]},
        { id: 6, category: 'fiscalizacao', title: "TCU Licitações TI - Erros comuns e como evitar", description: "Análise dos apontamentos mais frequentes do Tribunal de Contas da União em aquisições de tecnologia da informação.", date: "2025-07-08", likes: 250, dislikes: 10, comments: [
            { author: "Auditor_TCU_TI", text: "O erro número 1 ainda é a pesquisa de preços deficiente. Copiar e colar preços de outros editais sem uma análise crítica é pedir para ter a licitação suspensa." },
            { author: "Gerente_TI_Gov", text: "Outro ponto é o excesso de especificações restritivas. O TR deve focar no problema a ser resolvido, não em uma marca ou produto específico." },
            { author: "Consultora_LicitaTI", text: "@Gerente_TI_Gov, exatamente! E não se esqueçam da análise de riscos de segurança da informação, um item cada vez mais cobrado pelo TCU." }
        ]},
        { id: 7, category: 'inovacao', title: "Uso de Inteligência Artificial para pesquisa de preços", description: "Explorando ferramentas e métodos de IA para otimizar e dar mais segurança à fase de pesquisa mercadológica.", date: "2025-07-05", likes: 133, dislikes: 4, comments: [] },
        { id: 8, category: 'capacitacao', title: "Melhores cursos e certificações para pregoeiros em 2025", description: "Quais as qualificações mais exigidas e valorizadas para os profissionais que atuam na linha de frente das licitações?", date: "2025-07-02", likes: 78, dislikes: 0, comments: [] },
        { id: 9, category: 'fornecedores', title: "Como micro e pequenas empresas podem vender mais para o governo?", description: "Dicas práticas sobre o tratamento diferenciado em licitações e como aproveitar as oportunidades.", date: "2025-06-30", likes: 190, dislikes: 2, comments: [] },
        { id: 10, category: 'analise', title: "Criando dashboards de compras públicas com Power BI", description: "Um guia inicial para conectar fontes de dados abertos e criar indicadores de eficiência e economicidade.", date: "2025-06-28", likes: 210, dislikes: 7, comments: [] },
        { id: 11, category: 'sustentabilidade', title: "Critérios de sustentabilidade em editais: como aplicar?", description: "Exemplos práticos de como incluir requisitos de sustentabilidade ambiental e social nas contratações.", date: "2025-06-25", likes: 165, dislikes: 6, comments: [] },
        { id: 12, category: 'duvidas', title: "Posso ser penalizado por um erro no Termo de Referência?", description: "Discussão sobre a responsabilidade dos agentes públicos na fase de planejamento da contratação.", date: "2025-06-22", likes: 95, dislikes: 1, comments: [] },
    ];

    // ===================================================================
    // 3. ELEMENTOS DO DOM
    // ===================================================================
    const authContainer = document.getElementById('auth-container');
    const loginNoticeBox = document.getElementById('login-notice-box');
    const loginBtn = document.getElementById('login-btn');
    const topicsContainer = document.getElementById('topics-container');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const categorySelect = document.getElementById('category-select');
    const paginationContainer = document.getElementById('pagination-container');
    const modal = document.getElementById('topic-modal');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const offcanvasMenu = document.getElementById('offcanvas-menu');

    // ===================================================================
    // 4. FUNÇÕES DE INICIALIZAÇÃO
    // ===================================================================

    /**
     * Popula o select de categorias com base nos dados simulados.
     */
    const initializeCategories = () => {
        categorySelect.innerHTML = '<option value="all">Todas as Categorias</option>';
        for (const key in categories) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = categories[key];
            categorySelect.appendChild(option);
        }
    };

    // ===================================================================
    // 5. FUNÇÕES DE RENDERIZAÇÃO
    // ===================================================================

    /**
     * Ponto central de renderização. Aplica todos os filtros, ordenação e 
     * paginação, e então chama as funções para renderizar os tópicos e a paginação.
     */
    const applyFiltersAndRender = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = categorySelect.value;
        const sortBy = sortSelect.value;

        let filteredTopics = topics.filter(topic => {
            const matchesSearch = topic.title.toLowerCase().includes(searchTerm) || topic.description.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        filteredTopics.sort((a, b) => {
            switch (sortBy) {
                case 'popular': return (b.likes - b.dislikes) - (a.likes - a.dislikes);
                case 'replies': return b.comments.length - a.comments.length;
                case 'recent':
                default: return new Date(b.date) - new Date(a.date);
            }
        });

        renderTopics(filteredTopics);
        renderPagination(filteredTopics.length, filteredTopics);
    };

    /**
     * Renderiza a lista de tópicos no container principal.
     * @param {Array} filteredTopics - A lista de tópicos filtrados e ordenados.
     */
    const renderTopics = (filteredTopics) => {
        const startIndex = (currentPage - 1) * topicsPerPage;
        const endIndex = startIndex + topicsPerPage;
        const paginatedTopics = filteredTopics.slice(startIndex, endIndex);

        if (paginatedTopics.length === 0) {
            topicsContainer.innerHTML = `<div class="text-center p-8 bg-gray-50 rounded-lg"><p class="text-gray-600">Nenhum tópico encontrado com os filtros atuais.</p></div>`;
            return;
        }

        topicsContainer.innerHTML = paginatedTopics.map(topic => {
            const isHot = topic.comments.length > 3 || topic.likes > 150;
            const userVote = userInteractions[topic.id];

            return `
            <div class="topic-card">
                <div class="topic-card-clickable" onclick="openTopic(${topic.id})">
                    <div class="flex justify-between items-start">
                         <h3 class="font-bold text-lg text-gray-800 mb-2 pr-4">${topic.title}</h3>
                         ${isHot ? '<i class="fas fa-fire fire-icon"></i>' : ''}
                    </div>
                    <p class="text-gray-600 text-sm mb-4">${topic.description}</p>
                </div>
                <div class="flex justify-between items-center border-t border-gray-100 px-6 py-3">
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                         <span title="Comentários"><i class="fas fa-comments mr-1"></i> ${topic.comments.length}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button class="interaction-btn ${userVote === 'like' ? 'active' : ''}" onclick="handleInteraction(${topic.id}, 'like', event)" ${!isLoggedIn ? 'disabled' : ''}>
                            <i class="fas fa-thumbs-up"></i> <span id="likes-${topic.id}">${topic.likes}</span>
                        </button>
                        <button class="interaction-btn ${userVote === 'dislike' ? 'active' : ''}" onclick="handleInteraction(${topic.id}, 'dislike', event)" ${!isLoggedIn ? 'disabled' : ''}>
                            <i class="fas fa-thumbs-down"></i> <span id="dislikes-${topic.id}">${topic.dislikes}</span>
                        </button>
                    </div>
                </div>
            </div>`;
        }).join('');
    };
    
    /**
     * Renderiza os controles de paginação.
     * @param {number} totalTopics - O número total de tópicos (usado para calcular o total de páginas).
     * @param {Array} filteredTopics - A lista completa de tópicos após filtros (para navegação).
     */
    const renderPagination = (totalTopics, filteredTopics) => {
        const totalPages = Math.ceil(totalTopics / topicsPerPage);
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        let paginationHTML = `
            <button id="prev-page-btn" class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-arrow-left mr-2"></i> Anterior
            </button>
            <span class="text-sm text-gray-600">Página ${currentPage} de ${totalPages}</span>
            <button id="next-page-btn" class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''}>
                Próxima <i class="fas fa-arrow-right ml-2"></i>
            </button>`;
        
        paginationContainer.innerHTML = paginationHTML;

        document.getElementById('prev-page-btn').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTopics(filteredTopics);
                renderPagination(totalTopics, filteredTopics);
            }
        });

        document.getElementById('next-page-btn').addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTopics(filteredTopics);
                renderPagination(totalTopics, filteredTopics);
            }
        });
    };

    /**
     * Renderiza o conteúdo principal dentro do modal (descrição, comentários, formulário de resposta).
     * @param {object} topic - O objeto do tópico a ser exibido.
     */
    const renderModalContent = (topic) => {
         document.getElementById('modal-title').textContent = topic.title;
         document.getElementById('modal-content-body').innerHTML = `<p class="text-gray-700 leading-relaxed">${topic.description}</p>`;
         renderComments(topic);
         renderReplyForm(topic);
    };

    /**
     * Renderiza a seção de comentários de um tópico.
     * @param {object} topic - O tópico cujos comentários serão renderizados.
     */
    const renderComments = (topic) => {
        const commentsSection = document.getElementById('comments-section');
        let commentsHtml = `<h3 class="text-lg font-semibold mb-4 text-gray-800">Discussão</h3>`;
        if (topic.comments.length === 0) {
            commentsHtml += `<p class="text-gray-500 text-sm">Nenhum comentário ainda.</p>`;
        } else {
            commentsHtml += topic.comments.map(comment => `
                <div class="py-4 border-b border-gray-200 last:border-b-0">
                    <p class="font-semibold text-gray-700">${comment.author}</p>
                    <p class="text-gray-600 mt-1">${comment.text}</p>
                </div>`).join('');
        }
        commentsSection.innerHTML = commentsHtml;
    };

    /**
     * Renderiza o formulário de resposta no modal, se o usuário estiver logado.
     * @param {object} topic - O tópico ao qual o usuário pode responder.
     */
    const renderReplyForm = (topic) => {
        const container = document.getElementById('reply-form-container');
        if (isLoggedIn) {
            container.innerHTML = `
                <form id="reply-form">
                    <h4 class="font-semibold mb-3 text-gray-800">Sua Resposta</h4>
                    <textarea id="reply-textarea" class="form-textarea" rows="3" placeholder="Digite sua resposta..." required></textarea>
                    <div class="mt-3 text-right">
                        <button type="submit" class="btn-secondary">Enviar Resposta</button>
                    </div>
                </form>`;
            document.getElementById('reply-form').addEventListener('submit', (e) => {
                e.preventDefault();
                submitReply(topic.id);
            });
        } else {
            container.innerHTML = `<div class="bg-gray-100 p-4 rounded-lg text-center text-sm">Faça login para responder.</div>`;
        }
    };

    // ===================================================================
    // 6. FUNÇÕES DE EVENTOS (HANDLERS)
    // ===================================================================

    /**
     * Manipula a mudança nos filtros de busca, categoria ou ordenação.
     */
    const handleFilterChange = () => {
        currentPage = 1; // Reseta para a primeira página ao mudar filtros
        applyFiltersAndRender();
    };

    /**
     * Manipula a interação do usuário (like/dislike) em um tópico.
     * @param {number} topicId - O ID do tópico.
     * @param {string} type - O tipo de interação ('like' ou 'dislike').
     * @param {Event} event - O objeto do evento para parar a propagação.
     */
    window.handleInteraction = (topicId, type, event) => {
        event.stopPropagation(); // Impede que o modal abra ao clicar no botão
        if (!isLoggedIn) return;

        const topic = topics.find(t => t.id === topicId);
        const currentVote = userInteractions[topicId];

        if (currentVote === type) { // Clicou no mesmo botão de novo (remover voto)
            delete userInteractions[topicId];
            topic[type + 's']--;
        } else {
            if (currentVote) { // Trocando o voto (e.g., de like para dislike)
                topic[currentVote + 's']--;
            }
            topic[type + 's']++;
            userInteractions[topicId] = type;
        }

        localStorage.setItem('userInteractions', JSON.stringify(userInteractions));
        applyFiltersAndRender(); // Re-renderiza para atualizar o estado dos botões e contagens
    };

    // ===================================================================
    // 7. FUNÇÕES DE LÓGICA (MODAL)
    // ===================================================================

    /**
     * Abre o modal com os detalhes de um tópico específico.
     * @param {number} topicId - O ID do tópico a ser aberto.
     */
    window.openTopic = (topicId) => {
        currentTopicId = topicId;
        const topic = topics.find(t => t.id === topicId);
        renderModalContent(topic);
        modal.classList.add('active');
    };

    /**
     * Fecha o modal de tópico.
     */
    window.closeModal = () => {
        modal.classList.remove('active');
        currentTopicId = null;
    };

    // ===================================================================
    // 8. FUNÇÕES DE AUTENTICAÇÃO E INTERAÇÃO
    // ===================================================================

    /**
     * Simula o login do usuário.
     */
    const handleLogin = () => {
        isLoggedIn = true;
        updateUI();
    };

    /**
     * Simula o logout do usuário.
     */
    const handleLogout = () => {
        isLoggedIn = false;
        userInteractions = {};
        localStorage.removeItem('userInteractions');
        updateUI();
    };

    /**
     * Atualiza a interface do usuário com base no estado de login.
     */
    const updateUI = () => {
        if (isLoggedIn) {
            loginNoticeBox.classList.add('hidden');
            authContainer.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="text-sm font-medium text-gray-700">Bem-vindo, Usuário Teste!</span>
                    <button id="logout-btn" class="btn-secondary text-sm !py-2 !px-3">Sair</button>
                </div>`;
            document.getElementById('logout-btn').addEventListener('click', handleLogout);
        } else {
            loginNoticeBox.classList.remove('hidden');
            authContainer.innerHTML = ''; // Limpa a área de autenticação
        }
        applyFiltersAndRender();
    };

    /**
     * Submete uma nova resposta a um tópico.
     * @param {number} topicId - O ID do tópico que está sendo respondido.
     */
    const submitReply = (topicId) => {
        const textarea = document.getElementById('reply-textarea');
        const text = textarea.value.trim();
        if (!text) return;
        
        const topic = topics.find(t => t.id === topicId);
        topic.comments.push({ author: 'Usuário Teste', text: text });
        
        renderModalContent(topic);
        applyFiltersAndRender(); // Atualiza a contagem de comentários na página principal
    };

    // ===================================================================
    // 9. INICIALIZAÇÃO
    // ===================================================================

    /**
     * Ponto de entrada: adiciona os event listeners e renderiza o estado inicial.
     */
    const initializeForum = () => {
        // Adiciona listeners para os controles principais
        loginBtn.addEventListener('click', handleLogin);
        searchInput.addEventListener('input', handleFilterChange);
        sortSelect.addEventListener('change', handleFilterChange);
        categorySelect.addEventListener('change', handleFilterChange);

        // Adiciona listeners para o menu off-canvas
        menuToggle.addEventListener('click', () => offcanvasMenu.classList.add('open'));
        closeMenu.addEventListener('click', () => offcanvasMenu.classList.remove('open'));

        // Listener para fechar o modal clicando fora dele
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Configuração inicial
        initializeCategories();
        updateUI(); // Renderiza o estado inicial (deslogado)
    };

    // Inicia a aplicação
    initializeForum();
});
