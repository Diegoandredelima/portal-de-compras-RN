document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input-field');
    const resultsContainer = document.getElementById('search-results-container');

    if (!searchInput || !resultsContainer) {
        return;
    }

    // Detect if current page is inside /pages/
    const isInPages = window.location.pathname.includes('/pages/') || 
                      (window.location.href.indexOf('/pages/') !== -1);
    const prefix = isInPages ? '../' : './';

    const pagesToSearch = [
        { url: prefix + 'index.html', title: 'Página Inicial - Central de Compras RN' },
        { url: prefix + 'pages/fornecedor.html', title: 'Fornecedor - Como Vender para o Governo' },
        { url: prefix + 'pages/servidor.html', title: 'Servidor - Gestão e Processos de Compras' },
        { url: prefix + 'pages/cidadao.html', title: 'Cidadão - Transparência Pública e PNCP' },
        { url: prefix + 'pages/capacite-se.html', title: 'Capacite-se - Escola de Governo e Cursos' },
        { url: prefix + 'pages/legislacao.html', title: 'Legislação - Lei 14.133 e Decretos do RN' },
        { url: prefix + 'pages/oportunidade.html', title: 'Oportunidades - Licitações e ME/EPP' },
        { url: prefix + 'pages/manuais.html', title: 'Manuais, Guias e Tutoriais' },
        { url: prefix + 'pages/noticias.html', title: 'Notícias e Comunicados de Compras' },
        { url: prefix + 'pages/faqs-perguntas.html', title: 'FAQs - Perguntas Frequentes' },
        { url: prefix + 'pages/forum.html', title: 'Fórum de Compras Governamentais' },
        { url: prefix + 'pages/institucional.html', title: 'Institucional - SEAD e COMPR' },
        { url: prefix + 'pages/acesso-sistema.html', title: 'Acesso ao Sistema - Login Gov.br e Sistemas' },
        { url: prefix + 'pages/compr-ia.html', title: 'COMPR IA - Inteligência Artificial em Compras' }
    ];

    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.toLowerCase().trim();
            resultsContainer.innerHTML = '';

            if (query.length < 2) {
                return;
            }

            resultsContainer.innerHTML = '<div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4">' +
                '<h3 class="text-lg font-bold text-blue-900 mb-3"><i class="fas fa-search mr-2"></i>Resultados da Busca para "' + query + '":</h3>' +
                '<div id="search-items-list" class="space-y-2"></div>' +
                '</div>';
            
            const listContainer = document.getElementById('search-items-list');
            let foundResults = 0;
            let completedRequests = 0;

            pagesToSearch.forEach(page => {
                fetch(page.url)
                    .then(response => {
                        if (!response.ok) throw new Error('HTTP ' + response.status);
                        return response.text();
                    })
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const docTitle = doc.querySelector('title')?.innerText || page.title;
                        const bodyContent = doc.querySelector('body')?.innerText.toLowerCase() || '';

                        if (docTitle.toLowerCase().includes(query) || bodyContent.includes(query)) {
                            foundResults++;
                            const resultLink = document.createElement('a');
                            resultLink.href = page.url;
                            resultLink.className = 'block p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition text-blue-900 hover:text-blue-700 font-semibold';
                            resultLink.innerHTML = '<i class="fas fa-file-alt mr-2 text-blue-600"></i>' + docTitle;
                            listContainer.appendChild(resultLink);
                        }
                    })
                    .catch(err => {
                        console.warn('Erro ao indexar página na busca:', page.url, err);
                    })
                    .finally(() => {
                        completedRequests++;
                        if (completedRequests === pagesToSearch.length && foundResults === 0) {
                            listContainer.innerHTML = '<p class="text-gray-500 py-2">Nenhum resultado encontrado para o termo pesquisado.</p>';
                        }
                    });
            });
        }
    });
});
