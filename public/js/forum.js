// Dados simulados para o estado da aplicação e informações do usuário
let isLoggedIn = false; // Estado de login do usuário
let currentUser = ''; // Nome do usuário logado

// Variáveis de controle para paginação, ordenação e seleção de tópico
let currentPage = 1; // Página atual da lista de tópicos
let itemsPerPage = 10; // Quantidade de tópicos por página
let currentSort = 'recent'; // Critério de ordenação atual (recent, popular, answered)
let currentTopicId = null; // ID do tópico atualmente aberto no modal

// Dados de exemplo para tópicos do fórum
let topics = [
    {
        id: 1,
        title: "Como a Nova Lei de Licitações impacta pequenas empresas?",
        description: "Gostaria de entender melhor como a Lei 14.133/2021 afeta especificamente as Micro e Pequenas Empresas. Quais são as principais mudanças e oportunidades?",
        author: "João Silva",
        category: "legislacao",
        date: "2024-05-15",
        responses: 125,
        views: 450,
        lastActivity: "2024-05-20"
    },
    {
        id: 2,
        title: "Ferramentas de IA para otimização de processos de compra",
        description: "Quais ferramentas de inteligência artificial vocês recomendam para análise de propostas e gestão de contratos em órgãos públicos?",
        author: "Maria Souza",
        category: "tecnologia",
        date: "2024-05-10",
        responses: 87,
        views: 320,
        lastActivity: "2024-05-18"
    },
    {
        id: 3,
        title: "Dicas para servidores: como se capacitar em gestão de contratos?",
        description: "Estou buscando cursos, manuais e melhores práticas para aperfeiçoamento profissional na área de gestão de contratos públicos.",
        author: "Pedro Costa",
        category: "capacitacao",
        date: "2024-05-01",
        responses: 60,
        views: 280,
        lastActivity: "2024-05-15"
    },
    {
        id: 4,
        title: "Registro de Preços: dúvidas sobre validade e renovação",
        description: "Tenho algumas dúvidas sobre os prazos de validade do registro de preços e procedimentos para renovação. Alguém pode esclarecer?",
        author: "Ana Oliveira",
        category: "duvidas",
        date: "2024-04-25",
        responses: 42,
        views: 190,
        lastActivity: "2024-05-12"
    },
    {
        id: 5,
        title: "Experiências com o ComprasNet 4.0",
        description: "Como tem sido a experiência de vocês com a nova versão do portal de compras? Quais melhorias notaram?",
        author: "Carlos Santos",
        category: "tecnologia",
        date: "2024-04-20",
        responses: 35,
        views: 150,
        lastActivity: "2024-05-10"
    }
];

// Dados de exemplo para respostas, organizados por ID do tópico
let responses = {
    1: [
        {
            id: 1,
            author: "Maria Fernanda",
            date: "2024-05-16",
            text: "Excelente pergunta! A nova lei trouxe várias facilidades para MEIs e EPPs, como a possibilidade de comprovação da regularidade fiscal até o momento da assinatura do contrato."
        },
        {
            id: 2,
            author: "Roberto Lima",
            date: "2024-05-17",
            text: "Complementando a resposta anterior, também temos o benefício da cota de até 25% para ME/EPP em itens de natureza divisível. Isso é uma grande oportunidade!"
        }
    ],
    2: [
        {
            id: 3,
            author: "Tech Specialist",
            date: "2024-05-11",
            text: "Recomendo dar uma olhada na plataforma COMPR IA do governo do RN. Tem funcionalidades interessantes para análise automatizada de propostas."
        }
    ]
};

/**
 * Alterna o estado de login do usuário (simulação).
 * Atualiza a interface do usuário com base no estado de login.
 */
function toggleLogin() {
    isLoggedIn = !isLoggedIn; // Inverte o estado de login
    if (isLoggedIn) {
        currentUser = 'Usuário Demo'; // Define um usuário de demonstração
        // Oculta o botão de login e mostra as informações do usuário
        document.getElementById('login-btn').classList.add('hidden');
        document.getElementById('user-info').classList.remove('hidden');
        document.getElementById('username').textContent = currentUser;
        // Mostra o botão "Novo Tópico" e a seção de criação de tópico
        document.getElementById('new-topic-btn').classList.remove('hidden');
        document.getElementById('create-topic-section').classList.remove('hidden');
        // Oculta a mensagem para usuários não logados
        document.getElementById('login-message').style.display = 'none';
    } else {
        currentUser = ''; // Limpa o usuário atual
        // Mostra o botão de login e oculta as informações do usuário
        document.getElementById('login-btn').classList.remove('hidden');
        document.getElementById('user-info').classList.add('hidden');
        // Oculta o botão "Novo Tópico" e a seção de criação de tópico
        document.getElementById('new-topic-btn').classList.add('hidden');
        document.getElementById('create-topic-section').classList.add('hidden');
        // Mostra a mensagem para usuários não logados
        document.getElementById('login-message').style.display = 'block';
    }
}

/**
 * Formata uma string de data para o formato localizado (DD/MM/AAAA).
 * @param {string} dateString - A string de data no formato "AAAA-MM-DD".
 * @returns {string} A data formatada.
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

/**
 * Renderiza os tópicos na tela com base nos filtros e ordenação atuais.
 */
function renderTopics() {
    const container = document.getElementById('topics-container');
    const filteredTopics = filterAndSortTopics(); // Aplica filtros e ordenação
    const startIndex = (currentPage - 1) * itemsPerPage; // Calcula o índice inicial para a página atual
    const endIndex = startIndex + itemsPerPage; // Calcula o índice final
    const topicsToShow = filteredTopics.slice(startIndex, endIndex); // Obtém os tópicos para a página atual

    // Gera o HTML para cada tópico e insere no contêiner
    container.innerHTML = topicsToShow.map(topic => `
        <div class="forum-card bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer" onclick="openTopicDetail(${topic.id})">
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-800 hover:text-blue-600 transition">${topic.title}</h3>
                    <p class="text-gray-600 mt-2 line-clamp-2">${topic.description}</p>
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-4">${getCategoryLabel(topic.category)}</span>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-4">
                    <span><i class="fas fa-user mr-1"></i>${topic.author}</span>
                    <span><i class="fas fa-calendar mr-1"></i>${formatDate(topic.date)}</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span><i class="fas fa-comments mr-1"></i>${topic.responses}</span>
                    <span><i class="fas fa-eye mr-1"></i>${topic.views}</span>
                </div>
            </div>
        </div>
    `).join('');

    renderPagination(filteredTopics.length); // Renderiza os botões de paginação
}

/**
 * Aplica os filtros de busca e categoria, e a ordenação aos tópicos.
 * @returns {Array} Uma nova array de tópicos filtrados e ordenados.
 */
function filterAndSortTopics() {
    let filtered = [...topics]; // Cria uma cópia da array de tópicos para não modificar a original

    // Filtro de busca por texto no título ou descrição
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(topic =>
            topic.title.toLowerCase().includes(searchTerm) ||
            topic.description.toLowerCase().includes(searchTerm)
        );
    }

    // Filtro por categoria selecionada
    const categoryFilter = document.getElementById('filter-category').value;
    if (categoryFilter) {
        filtered = filtered.filter(topic => topic.category === categoryFilter);
    }

    // Ordenação dos tópicos com base no critério atual
    switch (currentSort) {
        case 'recent':
            // Ordena por data, do mais recente para o mais antigo
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'popular':
            // Ordena por número de visualizações, do maior para o menor
            filtered.sort((a, b) => b.views - a.views);
            break;
        case 'answered':
            // Ordena por número de respostas, do maior para o menor
            filtered.sort((a, b) => b.responses - a.responses);
            break;
    }

    return filtered;
}

/**
 * Renderiza os botões de paginação com base no número total de itens.
 * @param {number} totalItems - O número total de tópicos após a filtragem.
 */
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calcula o número total de páginas
    const paginationContainer = document.getElementById('page-numbers');

    let paginationHTML = '';
    // Cria um botão para cada página
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="pagination-btn px-3 py-2 border border-gray-300 rounded-lg ${i === currentPage ? 'bg-blue-600 text-white' : ''}"
                    onclick="changePage(${i})">${i}</button>
        `;
    }

    paginationContainer.innerHTML = paginationHTML; // Insere os botões no HTML
}

/**
 * Altera a página atual e renderiza os tópicos novamente.
 * @param {number|string} page - O número da página ou 'prev'/'next' para navegar.
 */
function changePage(page) {
    if (page === 'prev' && currentPage > 1) {
        currentPage--; // Volta para a página anterior
    } else if (page === 'next') {
        const totalPages = Math.ceil(filterAndSortTopics().length / itemsPerPage);
        if (currentPage < totalPages) currentPage++; // Avança para a próxima página
    } else if (typeof page === 'number') {
        currentPage = page; // Define a página diretamente pelo número
    }
    renderTopics(); // Renderiza os tópicos da nova página
}

/**
 * Retorna o rótulo amigável para uma dada categoria.
 * @param {string} category - A chave da categoria.
 * @returns {string} O rótulo da categoria.
 */
function getCategoryLabel(category) {
    const labels = {
        'geral': 'Geral',
        'legislacao': 'Legislação',
        'capacitacao': 'Capacitação',
        'tecnologia': 'Tecnologia',
        'duvidas': 'Dúvidas'
    };
    return labels[category] || 'Geral'; // Retorna o rótulo ou 'Geral' como padrão
}

/**
 * Abre o modal de detalhes do tópico e preenche com as informações do tópico selecionado.
 * @param {number} topicId - O ID do tópico a ser exibido.
 */
function openTopicDetail(topicId) {
    currentTopicId = topicId; // Armazena o ID do tópico aberto
    const topic = topics.find(t => t.id === topicId); // Encontra o tópico pelos dados simulados
    const topicResponses = responses[topicId] || []; // Obtém as respostas para este tópico

    // Preenche o modal com o título, metadados e descrição do tópico
    document.getElementById('modal-topic-title').textContent = topic.title || 'Título do tópico';
    document.getElementById('modal-topic-meta').innerHTML = `
        <div class="flex items-center space-x-4">
            <span><i class="fas fa-user mr-1"></i>${topic.author}</span>
            <span><i class="fas fa-calendar mr-1"></i>${formatDate(topic.date)}</span>
            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${getCategoryLabel(topic.category)}</span>
        </div>
    `;
    document.getElementById('modal-topic-description').textContent = topic.description;
    document.getElementById('responses-count').textContent = topicResponses.length; // Atualiza a contagem de respostas

    // Renderiza a lista de respostas para o tópico
    const responsesList = document.getElementById('responses-list');
    responsesList.innerHTML = topicResponses.map(response => `
        <div class="response-item bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        ${response.author.charAt(0)} </div>
                    <span class="font-medium">${response.author}</span>
                </div>
                <span class="text-sm text-gray-500">${formatDate(response.date)}</span>
            </div>
            <p class="text-gray-700">${response.text}</p>
        </div>
    `).join('');

    // Controla a visibilidade do formulário de resposta e da mensagem de login no modal
    if (isLoggedIn) {
        document.getElementById('response-form-section').classList.remove('hidden');
        document.getElementById('response-login-message').style.display = 'none';
    } else {
        document.getElementById('response-form-section').classList.add('hidden');
        document.getElementById('response-login-message').style.display = 'block';
    }

    document.getElementById('topic-detail-modal').classList.add('active'); // Torna o modal visível
}

// --- Listeners de Eventos ---

// Adiciona listeners quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Listener para os botões de Login/Logout
    document.getElementById('login-btn').addEventListener('click', toggleLogin);
    document.getElementById('logout-btn').addEventListener('click', toggleLogin);
    document.getElementById('logout-btn').setAttribute('aria-label', 'Sair do sistema');

    // Listeners para os campos de busca e filtro de categoria
    document.getElementById('search-input').addEventListener('input', () => {
        currentPage = 1; // Reseta a página para a primeira
        renderTopics(); // Renderiza os tópicos com os novos filtros
    });

    document.getElementById('filter-category').addEventListener('change', () => {
        currentPage = 1; // Reseta a página para a primeira
        renderTopics(); // Renderiza os tópicos com a nova categoria
    });

    // Listeners para os botões de ordenação
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe 'filter-active' de todos os botões de ordenação
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('filter-active'));
            // Adiciona a classe 'filter-active' ao botão clicado
            this.classList.add('filter-active');
            currentSort = this.dataset.sort; // Atualiza o critério de ordenação
            currentPage = 1; // Reseta a página para a primeira
            renderTopics(); // Renderiza os tópicos com a nova ordenação
        });
    });

    // Listener para o botão 'Limpar Filtros'
    document.getElementById('clear-filters').addEventListener('click', function() {
        document.getElementById('search-input').value = ''; // Limpa o campo de busca
        document.getElementById('filter-category').value = ''; // Reseta a categoria para 'Todas'
        // Reseta o estilo dos botões de ordenação e define 'recent' como ativo
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('filter-active'));
        document.querySelector('[data-sort="recent"]').classList.add('filter-active');
        currentSort = 'recent'; // Reseta o critério de ordenação
        currentPage = 1; // Reseta a página para a primeira
        renderTopics(); // Renderiza os tópicos sem filtros
    });

    // Listener para o botão 'Fechar Modal'
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('topic-detail-modal').classList.remove('active'); // Oculta o modal
    });
    document.getElementById('close-modal').setAttribute('aria-label', 'Fechar modal');

    // Listener para o botão 'Novo Tópico'
    document.getElementById('new-topic-btn').addEventListener('click', function() {
        // Rola suavemente para a seção de criação de tópico
        document.getElementById('create-topic-section').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('new-topic-btn').setAttribute('aria-label', 'Criar novo tópico');

    // Listener para o formulário de criação de novo tópico
    document.getElementById('new-topic-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        const title = document.getElementById('topic-title').value;
        const category = document.getElementById('topic-category').value;
        const description = document.getElementById('topic-description').value;

        // Cria um novo objeto de tópico
        const newTopic = {
            id: topics.length + 1, // ID simples baseado no tamanho da array
            title,
            description,
            author: currentUser, // Usa o nome do usuário logado
            category,
            date: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
            responses: 0,
            views: 1,
            lastActivity: new Date().toISOString().split('T')[0]
        };

        topics.unshift(newTopic); // Adiciona o novo tópico no início da lista
        this.reset(); // Limpa os campos do formulário
        renderTopics(); // Renderiza a lista de tópicos atualizada

        alert('Tópico criado com sucesso!'); // Feedback para o usuário
    });

    // Listener para o formulário de resposta a um tópico
    document.getElementById('response-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        const text = document.getElementById('response-text').value;

        // Garante que existe uma array de respostas para o tópico atual
        if (!responses[currentTopicId]) {
            responses[currentTopicId] = [];
        }

        // Cria um novo objeto de resposta
        const newResponse = {
            id: Date.now(), // ID único baseado no timestamp
            author: currentUser, // Usa o nome do usuário logado
            date: new Date().toISOString().split('T')[0], // Data atual
            text
        };

        responses[currentTopicId].push(newResponse); // Adiciona a nova resposta ao tópico

        // Atualiza a contagem de respostas no tópico original
        const topic = topics.find(t => t.id === currentTopicId);
        if (topic) {
            topic.responses++;
            topic.lastActivity = new Date().toISOString().split('T')[0]; // Atualiza última atividade
        }

        this.reset(); // Limpa o campo de texto da resposta
        openTopicDetail(currentTopicId); // Reabre o modal para exibir a nova resposta
        renderTopics(); // Atualiza a lista principal de tópicos (para refletir a nova contagem de respostas)
    });

    // Listeners para os botões de navegação da paginação (Anterior/Próximo)
    document.querySelector('[data-page="prev"]').addEventListener('click', () => changePage('prev'));
    document.querySelector('[data-page="next"]').addEventListener('click', () => changePage('next'));

    // Renderização inicial dos tópicos ao carregar a página
    renderTopics();
});

