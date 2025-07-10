
// Loading Screen Animation
// Robust fallback: always remove loading after 5s, even se erro

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.getElementById('progressBar');
    const companiesCount = document.getElementById('companiesCount');
    const opportunitiesCount = document.getElementById('opportunitiesCount');
    const valueCount = document.getElementById('valueCount');

    // Verificação de elementos
    if (!loadingScreen || !mainContent || !progressBar || !companiesCount || !opportunitiesCount || !valueCount) {
        console.error('Algum elemento do loading não foi encontrado no DOM.');
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainContent) mainContent.style.opacity = 1;
        return;
    }

    let progress = 0;
    let companies = 0;
    let opportunities = 0;
    let value = 0;
    let finished = false;

    // Fallback: sempre remover loading após 5s
    setTimeout(() => {
        if (!finished) {
            console.warn('Timeout: forçando saída do loading!');
            hideLoading();
        }
    }, 5000);

    function hideLoading() {
        finished = true;
        loadingScreen.classList.add('hidden');
        loadingScreen.classList.remove('active');
        mainContent.classList.add('active');
        mainContent.classList.remove('hidden');
        // Fallback CSS inline para garantir
        loadingScreen.style.display = 'none';
        mainContent.style.opacity = 1;
    }

    // Loading animation
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        companies += Math.random() * 5000;
        opportunities += Math.random() * 100;
        value += Math.random() * 1000000;

        progressBar.style.width = Math.min(progress, 100) + '%';
        companiesCount.textContent = Math.floor(companies).toLocaleString();
        opportunitiesCount.textContent = Math.floor(opportunities);
        valueCount.textContent = 'R$ ' + (value / 1000000).toFixed(1) + 'M';

        if (progress >= 100) {
            clearInterval(loadingInterval);
            // Final values
                    companiesCount.textContent = '250.594';
                    opportunitiesCount.textContent = '1.234';
                    valueCount.textContent = 'R$ 54,6M';

                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                        mainContent.classList.add('active');

                        // Initialize chart after loading
                        initializeChart();
                    }, 500);
                }
            }, 100);
        });

        // Chart initialization
        function initializeChart() {
            const ctx = document.getElementById('growthChart').getContext('2d');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                    datasets: [{
                        label: 'ME/EPP no RN',
                        data: [173255, 189650, 208420, 228340, 241123, 250594],
                        borderColor: '#1351B4',
                        backgroundColor: 'rgba(19, 81, 180, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }, {
                        label: 'MEI',
                        data: [98000, 107500, 116200, 122800, 125053, 128500],
                        borderColor: '#FF6B35',
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Evolução do Número de Empresas'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                callback: function(value) {
                                    return value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Smooth scrolling
        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            element.scrollIntoView({ behavior: 'smooth' });
        }

        // Mobile menu toggle
        function toggleMobileMenu() {
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Add CSS animation class
        const style = document.createElement('style');
        style.textContent = `
            .animate-fade-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
