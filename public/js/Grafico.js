let lineChartComprasInstance = null;
        let barChartCompradoresInstance = null;
        let barChartSetoresInstance = null;
        let barChartCaronasRankInstance = null;
        let donutChartCaronasInstance = null; // Nova instância para o gráfico de rosca

        // Função para inicializar os gráficos de Compras Homologadas
        function initComprasCharts() {
            // Destruir instâncias anteriores se existirem para evitar duplicatas
            if (lineChartComprasInstance) lineChartComprasInstance.destroy();
            if (barChartCompradoresInstance) barChartCompradoresInstance.destroy();
            if (barChartSetoresInstance) barChartSetoresInstance.destroy();

            // Dados para o gráfico de linha (acompanhamento anual)
            const dataLineChart = {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Valor Homologado (R$ Bilhões)',
                    data: [2.5, 2.8, 3.1, 2.9, 3.5, 3.8, 4.2, 3.9, 3.7, 3.3, 3.0, 2.6], // Dados de exemplo
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            };

            // Configuração do gráfico de linha
            const configLineChart = {
                type: 'line',
                data: dataLineChart,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Valor (R$ Bilhões)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value + 'bi';
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Mês'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(context.parsed.y * 1000000000);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            };

            // Inicializa o gráfico de linha
            const lineChartCtx = document.getElementById('lineChartCompras');
            if (lineChartCtx) {
                lineChartComprasInstance = new Chart(lineChartCtx.getContext('2d'), configLineChart);
            }


            // Dados para o gráfico de barra (Maiores Compradores)
            const dataBarChartCompradores = {
                labels: ['Secretaria de Saúde', 'Secretaria de Educação', 'Secretaria de Segurança', 'Secretaria de Infraestrutura', 'Secretaria de Administração'],
                datasets: [{
                    label: 'Valor (R$ Milhões)',
                    data: [850, 720, 600, 550, 480], // Dados de exemplo
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };

            // Configuração do gráfico de barra (Maiores Compradores)
            const configBarChartCompradores = {
                type: 'bar',
                data: dataBarChartCompradores,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y', // Barras horizontais
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Valor (R$ Milhões)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value + 'M';
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Comprador'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.x !== null) {
                                        label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(context.parsed.x * 1000000);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            };

            // Inicializa o gráfico de barra (Maiores Compradores)
            const barChartCompradoresCtx = document.getElementById('barChartCompradores');
            if (barChartCompradoresCtx) {
                barChartCompradoresInstance = new Chart(barChartCompradoresCtx.getContext('2d'), configBarChartCompradores);
            }


            // Dados para o gráfico de barra (Setores com Mais Compras)
            const dataBarChartSetores = {
                labels: ['Saúde', 'Educação', 'Tecnologia', 'Infraestrutura', 'Serviços Gerais'],
                datasets: [{
                    label: 'Valor (R$ Milhões)',
                    data: [900, 780, 650, 580, 500], // Dados de exemplo
                    backgroundColor: 'rgba(153, 102, 255, 0.8)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            };

            // Configuração do gráfico de barra (Setores com Mais Compras)
            const configBarChartSetores = {
                type: 'bar',
                data: dataBarChartSetores,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y', // Barras horizontais
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Valor (R$ Milhões)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value + 'M';
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Setor'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.x !== null) {
                                        label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(context.parsed.x * 1000000);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            };

            // Inicializa o gráfico de barra (Setores com Mais Compras)
            const barChartSetoresCtx = document.getElementById('barChartSetores');
            if (barChartSetoresCtx) {
                barChartSetoresInstance = new Chart(barChartSetoresCtx.getContext('2d'), configBarChartSetores);
            }
        }

        // Função para inicializar os gráficos de Adesões/Caronas
        function initAdesoesCharts() {
            // Destruir instâncias anteriores se existirem
            if (barChartCaronasRankInstance) barChartCaronasRankInstance.destroy();
            if (donutChartCaronasInstance) donutChartCaronasInstance.destroy();

            // Dados para o gráfico de barra (Rank de Caronas)
            const dataBarChartCaronasRank = {
                labels: ['ARSEP-RN', 'SAPE-RN', 'SEAP-RN', 'IFESP-RN', 'SMS-PMN'],
                datasets: [{
                    label: 'Nº de Caronas',
                    data: [36, 29, 29, 25, 22], // Dados de exemplo
                    backgroundColor: [
                        getComputedStyle(document.documentElement).getPropertyValue('--info-color'),
                        getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
                        getComputedStyle(document.documentElement).getPropertyValue('--success-color'),
                        getComputedStyle(document.documentElement).getPropertyValue('--warning-color'),
                        '#6c757d' // Cor para o quinto item, se necessário
                    ].map(color => color.trim()), // Remove espaços em branco
                    borderColor: 'white',
                    borderWidth: 1
                }]
            };

            const configBarChartCaronasRank = {
                type: 'bar',
                data: dataBarChartCaronasRank,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y', // Barras horizontais
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Nº de Caronas'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Órgão'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            };

            const barChartCaronasRankCtx = document.getElementById('barChartCaronasRank');
            if (barChartCaronasRankCtx) {
                barChartCaronasRankInstance = new Chart(barChartCaronasRankCtx.getContext('2d'), configBarChartCaronasRank);
            }

            // Dados para o gráfico de rosca (Caronas Mais Requisitadas)
            const dataDonutChartCaronas = {
                labels: ['Mão de obra Terceirizada', 'Frota de Veículo', 'Material de Limpeza'],
                datasets: [{
                    data: [60, 25, 15], // Proporções em porcentagem
                    backgroundColor: [
                        getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(), // Azul escuro
                        getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim(), // Laranja
                        getComputedStyle(document.documentElement).getPropertyValue('--success-color').trim() // Verde
                    ],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            };

            const configDonutChartCaronas = {
                type: 'doughnut',
                data: dataDonutChartCaronas,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                font: {
                                    size: 14
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += context.parsed + '%';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            };

            const donutChartCaronasCtx = document.getElementById('donutChartCaronas');
            if (donutChartCaronasCtx) {
                donutChartCaronasInstance = new Chart(donutChartCaronasCtx.getContext('2d'), configDonutChartCaronas);
            }
        }

        // Função para mostrar a seção de Compras Homologadas
        function showComprasHomologadas() {
            document.getElementById('contentComprasHomologadas').classList.remove('hidden');
            document.getElementById('contentAdesoesCaronas').classList.add('hidden');
            document.getElementById('btnComprasHomologadas').classList.remove('bg-gray-300', 'text-gray-800');
            document.getElementById('btnComprasHomologadas').classList.add('bg-blue-600', 'text-white');
            document.getElementById('btnAdesoesCaronas').classList.remove('bg-blue-600', 'text-white');
            document.getElementById('btnAdesoesCaronas').classList.add('bg-gray-300', 'text-gray-800');
            initComprasCharts(); // Re-inicializa os gráficos ao mostrar a seção
        }

        // Função para mostrar a seção de Adesões/Caronas
        function showAdesoesCaronas() {
            document.getElementById('contentAdesoesCaronas').classList.remove('hidden');
            document.getElementById('contentComprasHomologadas').classList.add('hidden');
            document.getElementById('btnAdesoesCaronas').classList.remove('bg-gray-300', 'text-gray-800');
            document.getElementById('btnAdesoesCaronas').classList.add('bg-blue-600', 'text-white');
            document.getElementById('btnComprasHomologadas').classList.remove('bg-blue-600', 'text-white');
            document.getElementById('btnComprasHomologadas').classList.add('bg-gray-300', 'text-gray-800');
            initAdesoesCharts(); // Inicializa o gráfico de caronas ao mostrar a seção
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Adiciona event listeners aos botões
            document.getElementById('btnComprasHomologadas').addEventListener('click', showComprasHomologadas);
            document.getElementById('btnAdesoesCaronas').addEventListener('click', showAdesoesCaronas);

            // Mostra a seção de Compras Homologadas por padrão ao carregar a página
            showComprasHomologadas();
        });