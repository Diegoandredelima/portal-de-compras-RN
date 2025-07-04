// Sample news data
const newsData = [
  {
      id: 1,
      title: "Governo do Estado adere Contrata+Brasil no RN em julho",
      excerpt: "Evento de adesão à plataforma do Governo Federal visa facilitar contratações públicas com MEIs, fortalecendo a economia local.",
      content: "O Governo do Estado do Rio Grande do Norte oficializou sua adesão ao programa Contrata+Brasil, uma iniciativa do Governo Federal que busca facilitar e ampliar as oportunidades de contratação de Microempreendedores Individuais (MEIs) e micro e pequenas empresas nos processos de compras públicas...",
      date: "2024-07-15",
      category: "noticia",
      image: "https://via.placeholder.com/400x200/1351B4/ffffff?text=Contrata+Brasil",
      author: "Assessoria de Comunicação"
  },
  {
      id: 2,
      title: "Saiba como as gestões municipais podem aderir ao RN+Inclusivo",
      excerpt: "Projeto do Governo do Estado viabiliza capacitações aos servidores públicos municipais",
      content: "O programa RN+Inclusivo representa uma importante iniciativa do Governo do Estado para fortalecer a capacitação de servidores públicos municipais em todo o Rio Grande do Norte...",
      date: "2024-07-10",
      category: "comunicado",
      image: "https://via.placeholder.com/400x200/5EA51D/ffffff?text=RN+Inclusivo",
      author: "SEAD"
  },
  {
      id: 3,
      title: "Nova Lei de Licitações: Principais mudanças e impactos",
      excerpt: "Entenda as principais alterações trazidas pela Lei 14.133/2021 e como elas afetam os processos de compras públicas.",
      content: "A Lei 14.133/2021, conhecida como Nova Lei de Licitações, trouxe mudanças significativas para os processos de compras públicas no Brasil...",
      date: "2024-07-05",
      category: "legislacao",
      image: "https://via.placeholder.com/400x200/FF6B35/ffffff?text=Nova+Lei",
      author: "Departamento Jurídico"
  },
  {
      id: 4,
      title: "Workshop sobre Inteligência Artificial em Compras Públicas",
      excerpt: "Evento presencial discutirá o uso de IA para otimização de processos de compras governamentais.",
      content: "Será realizado no próximo mês um workshop sobre o uso de Inteligência Artificial em processos de compras públicas...",
      date: "2024-06-28",
      category: "evento",
      image: "https://via.placeholder.com/400x200/3498db/ffffff?text=Workshop+IA",
      author: "Coordenadoria de Compras"
  },
  {
      id: 5,
      title: "Resultado do Pregão Eletrônico nº 001/2024",
      excerpt: "Divulgação do resultado da licitação para aquisição de material de escritório.",
      content: "A Coordenadoria de Compras Governamentais torna público o resultado do Pregão Eletrônico nº 001/2024...",
      date: "2024-06-25",
      category: "comunicado",
      image: "https://via.placeholder.com/400x200/FFCD07/000000?text=Pregão",
      author: "Comissão de Licitação"
  },
  {
      id: 6,
      title: "Capacitação: Gestão de Contratos Administrativos",
      excerpt: "Curso online gratuito para servidores públicos sobre gestão e fiscalização de contratos.",
      content: "A SEAD oferece curso de capacitação online sobre gestão de contratos administrativos...",
      date: "2024-06-20",
      category: "evento",
      image: "https://via.placeholder.com/400x200/9333ea/ffffff?text=Capacitação",
      author: "Escola de Governo"
  }
];

let currentPage = 1;
const itemsPerPage = 6;
let filteredNews = [...newsData];

function renderNews() {
  const container = document.getElementById('news-container');
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  container.innerHTML = currentNews.map(news => `
      <div class="news-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onclick="openModal(${news.id})">
          <img src="${news.image}" alt="${news.title}" class="w-full h-48 object-cover">
          <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                  <span class="badge ${getCategoryBadgeClass(news.category)}">${getCategoryName(news.category)}</span>
                  <span class="text-sm text-gray-500">${formatDate(news.date)}</span>
              </div>
              <h3 class="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">${news.title}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">${news.excerpt}</p>
              <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">Por: ${news.author}</span>
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Ler mais <i class="fas fa-arrow-right ml-1"></i>
                  </button>
              </div>
          </div>
      </div>
  `).join('');

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const pagination = document.getElementById('pagination');

  let paginationHTML = '';

  // Previous button
  if (currentPage > 1) {
      paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})">
          <i class="fas fa-chevron-left"></i>
      </button>`;
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === currentPage ? 'active' : '';
      paginationHTML += `<button class="pagination-btn ${activeClass}" onclick="changePage(${i})">${i}</button>`;
  }

  // Next button
  if (currentPage < totalPages) {
      paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})">
          <i class="fas fa-chevron-right"></i>
      </button>`;
  }

  pagination.innerHTML = paginationHTML;
}

function changePage(page) {
  currentPage = page;
  renderNews();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function searchNews() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const categoryFilter = document.getElementById('category').value;

  filteredNews = newsData.filter(news => {
      const matchesSearch = !searchTerm ||
          news.title.toLowerCase().includes(searchTerm) ||
          news.excerpt.toLowerCase().includes(searchTerm) ||
          news.content.toLowerCase().includes(searchTerm);

      const matchesCategory = !categoryFilter || news.category === categoryFilter;

      return matchesSearch && matchesCategory;
  });

  currentPage = 1;
  renderNews();
}

function clearSearch() {
  document.getElementById('search').value = '';
  document.getElementById('category').value = '';
  filteredNews = [...newsData];
  currentPage = 1;
  renderNews();
}

function openModal(newsId) {
  const news = newsData.find(n => n.id === newsId);
  const modal = document.getElementById('newsModal');
  const modalContent = document.getElementById('modal-content');

  modalContent.innerHTML = `
      <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
              <span class="badge ${getCategoryBadgeClass(news.category)}">${getCategoryName(news.category)}</span>
              <span class="text-sm text-gray-500">${formatDate(news.date)}</span>
          </div>
          <h1 class="text-2xl font-bold mb-4" style="color: var(--dark-blue);">${news.title}</h1>
          <div class="text-sm text-gray-600 mb-4">
              <i class="fas fa-user mr-1"></i>Por: ${news.author}
          </div>
      </div>

      <img src="${news.image}" alt="${news.title}" class="w-full h-64 object-cover rounded-lg mb-6">

      <div class="prose max-w-none mb-6">
          <p class="text-lg text-gray-700 leading-relaxed">${news.content}</p>
      </div>

      <div class="border-t pt-6">
          <h3 class="text-lg font-semibold mb-4">Compartilhar</h3>
          <div class="flex space-x-4">
              <button onclick="shareNews('facebook', ${news.id})" class="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" aria-label="Compartilhar no Facebook">
                  <i class="fab fa-facebook"></i>
                  <span>Facebook</span>
              </button>
              <button onclick="shareNews('twitter', ${news.id})" class="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500" aria-label="Compartilhar no Twitter">
                  <i class="fab fa-twitter"></i>
                  <span>Twitter</span>
              </button>
              <button onclick="shareNews('whatsapp', ${news.id})" class="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" aria-label="Compartilhar no WhatsApp">
                  <i class="fab fa-whatsapp"></i>
                  <span>WhatsApp</span>
              </button>
              <button onclick="copyLink(${news.id})" class="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700" aria-label="Copiar o link desta notícia">
                  <i class="fas fa-link"></i>
                  <span>Copiar Link</span>
              </button>
          </div>
      </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('newsModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function shareNews(platform, newsId) {
  const news = newsData.find(n => n.id === newsId);
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(news.title);
  const text = encodeURIComponent(news.excerpt);

  let shareUrl = '';

  switch(platform) {
      case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
      case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
      case 'whatsapp':
          shareUrl = `https://wa.me/?text=${title}%20${url}`;
          break;
  }

  if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

function copyLink(newsId) {
  const url = `${window.location.href}#news-${newsId}`;
  navigator.clipboard.writeText(url).then(() => {
      alert('Link copiado para a área de transferência!');
  });
}

function getCategoryBadgeClass(category) {
  switch(category) {
      case 'comunicado': return 'badge-info';
      case 'noticia': return 'badge-success';
      case 'evento': return 'badge-warning';
      case 'legislacao': return 'badge-info';
      default: return 'badge-info';
  }
}

function getCategoryName(category) {
  switch(category) {
      case 'comunicado': return 'Comunicado';
      case 'noticia': return 'Notícia';
      case 'evento': return 'Evento';
      case 'legislacao': return 'Legislação';
      default: return 'Geral';
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  });
}

// Event listeners
document.getElementById('search').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      searchNews();
  }
});

document.getElementById('category').addEventListener('change', searchNews);

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('newsModal');
  if (event.target === modal) {
      closeModal();
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  renderNews();
});
