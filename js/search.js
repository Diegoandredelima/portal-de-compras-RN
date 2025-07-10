document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input-field');
    const resultsContainer = document.getElementById('search-results-container');

    if (!searchInput || !resultsContainer) {
        return;
    }

    const pagesToSearch = [
        'Index.html',
        'pages/Fornecedor.html',
        'pages/Servidor.html',
        'pages/Cidadao.html',
        'pages/Capacite-se.html',
        'pages/Legislacao.html',
        'pages/Manuais.html',
        'pages/Oportunidades.html',
        'pages/Artigos.html',
        'pages/Noticias.html',
        'pages/Forum.html',
        'pages/Institucional.html',
        'pages/Compr-ia.html'
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

            setTimeout(() => {
                if (!foundResults) {
                    resultsContainer.innerHTML += '<p>Nenhum resultado encontrado.</p>';
                }
            }, 1000);
        }
    });
});
