document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input-field');
    const resultsContainer = document.getElementById('search-results-container');

    if (!searchInput || !resultsContainer) {
        return;
    }

    const pagesToSearch = [
        'Index.html',
        'pages/Fornecedor.html',
        'pages/acesso-sistema.html',
        'pages/artigos.html',
        'pages/capacite-se.html',
        'pages/cidadao.html',
        'pages/em-construcao.html',
        'pages/forum.html',
        'pages/legislacao.html',
        'pages/manuais.html',
        'pages/oportunidades.html',
        'pages/servidor.html'
    ];

    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.toLowerCase().trim();
            resultsContainer.innerHTML = '';

            if (query.length < 2) {
                return;
            }

            resultsContainer.innerHTML = '<h3 class="text-lg font-semibold mb-2">Resultados da Busca:</h3>';
            let foundResults = false;

            pagesToSearch.forEach(pageUrl => {
                fetch(pageUrl)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const title = doc.querySelector('title')?.innerText.toLowerCase() || '';
                        const bodyContent = doc.querySelector('body')?.innerText.toLowerCase() || '';

                        if (title.includes(query) || bodyContent.includes(query)) {
                            foundResults = true;
                            const resultLink = document.createElement('a');
                            resultLink.href = pageUrl;
                            resultLink.className = 'block p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200';
                            resultLink.textContent = doc.querySelector('title')?.innerText || pageUrl;
                            resultsContainer.appendChild(resultLink);
                        }
                    })
                    .catch(err => console.error('Failed to fetch page:', pageUrl, err));
            });

            // This timeout is a simple way to wait for fetch requests to complete
            setTimeout(() => {
                if (!foundResults) {
                    resultsContainer.innerHTML += '<p>Nenhum resultado encontrado.</p>';
                }
            }, 1000);
        }
    });
});
