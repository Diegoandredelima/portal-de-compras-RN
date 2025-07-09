// Dados dos temas para facilitar a navegação
const themes = {
    'central-compras': 'Central de Compras',
    'secretaria-administracao': 'Secretaria de Estado da Administração',
    'fornecedor': 'Fornecedor',
    'me-epp': 'ME/EPP',
    'contrata-brasil': 'Contrata+Brasil',
    'lei-14133': 'Lei 14.133/2021',
    'decreto-32449': 'Decreto Estadual 32.449',
    'dispensa-licitacao': 'Dispensa de Licitação',
    'pregao-eletronico': 'Pregão Eletrônico',
    'inexigibilidade': 'Inexigibilidade de Licitação'
};

// Função para mostrar um tema específico
function showTheme(themeId) {
    // Ocultar todos os conteúdos
    document.querySelectorAll('.theme-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Mostrar o conteúdo selecionado
    const selectedContent = document.getElementById(themeId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
        selectedContent.classList.add('fade-in');
    }
    
    // Atualizar navegação ativa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Marcar o item atual como ativo
    event.target.classList.add('active');
    
    // Fechar sidebar em mobile
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
    
    // Limpar busca
    document.getElementById('searchInput').value = '';
    document.getElementById('no-results').style.display = 'none';
}

// Função para toggle do acordeão
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.accordion-icon');
    const allHeaders = document.querySelectorAll('.accordion-header');
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('.accordion-icon');
    
    // Fechar todos os outros acordeões
    allHeaders.forEach((h, index) => {
        if (h !== header) {
            h.classList.remove('active');
            allContents[index].style.display = 'none';
            allIcons[index].classList.remove('rotated');
        }
    });
    
    // Toggle do acordeão clicado
    if (content.style.display === 'block') {
        content.style.display = 'none';
        header.classList.remove('active');
        icon.classList.remove('rotated');
    } else {
        content.style.display = 'block';
        header.classList.add('active');
        icon.classList.add('rotated');
    }
}

// Função para toggle da sidebar mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    } else {
        sidebar.classList.add('open');
        overlay.classList.add('show');
    }
}

// Função de busca
function searchFAQ() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let hasResults = false;
    
    if (searchTerm.length < 3) {
        // Se a busca for muito curta, mostrar tema atual
        document.getElementById('no-results').style.display = 'none';
        return;
    }
    
    // Ocultar todos os conteúdos
    document.querySelectorAll('.theme-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Buscar em todos os temas
    Object.keys(themes).forEach(themeId => {
        const themeContent = document.getElementById(themeId);
        const questions = themeContent.querySelectorAll('.accordion-header h3');
        const answers = themeContent.querySelectorAll('.accordion-content p');
        
        let themeHasResults = false;
        
        // Verificar perguntas
        questions.forEach((question, index) => {
            const questionText = question.textContent.toLowerCase();
            const answerText = answers[index].textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                themeHasResults = true;
                hasResults = true;
                
                // Destacar termo encontrado
                question.innerHTML = highlightText(question.textContent, searchTerm);
                answers[index].innerHTML = highlightText(answers[index].textContent, searchTerm);
            }
        });
        
        // Mostrar tema se tiver resultados
        if (themeHasResults) {
            themeContent.style.display = 'block';
        }
    });
    
    // Mostrar mensagem se não houver resultados
    if (!hasResults) {
        document.getElementById('no-results').style.display = 'block';
    } else {
        document.getElementById('no-results').style.display = 'none';
    }
}

// Função para destacar texto da busca
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Configurar busca
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchFAQ();
        }, 300);
    });
    
    // Configurar busca ao pressionar Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchFAQ();
        }
    });
    
    // Fechar sidebar ao clicar fora em mobile
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const mobileButton = document.querySelector('.md\\:hidden');
        
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileButton.contains(e.target) && 
            sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });
    
    // Mostrar primeiro tema por padrão
    showTheme('central-compras');
});

// Ajustar layout em mudança de tamanho da tela
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }
});