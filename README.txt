Portal de Compras Governamentais - RN
Bem-vindo ao repositório do Portal de Compras Governamentais do Rio Grande do Norte. Este projeto tem como objetivo desenvolver um portal web para facilitar o acesso a informações e serviços relacionados às compras públicas, promovendo transparência, eficiência e colaboração entre fornecedores, servidores e cidadãos.
Descrição do Projeto
O portal é uma plataforma centralizada que oferece suporte a diferentes perfis de usuários (fornecedores, servidores e cidadãos), com funcionalidades como consulta de oportunidades, acesso a legislações, manuais, cursos de capacitação e integração com sistemas governamentais. O projeto segue as diretrizes de acessibilidade e boas práticas para portais governamentais.
Estrutura do Projeto
A estrutura de diretórios do projeto é organizada da seguinte forma:
project-root/
├── css/
│   └── styles.css             # Estilos CSS personalizados
├── js/
│   └── scripts.js            # Scripts JavaScript para interatividade
├── img/
│   ├── compr-logo.png        # Logo da Coordenadoria de Compras
│   ├── rn-governo-logo.png   # Logo do Governo do RN
│   └── (outras imagens)      # Outros arquivos de imagem
├── pages/
│   ├── index.html            # Página inicial
│   ├── fornecedor.html       # Página para fornecedores
│   ├── servidor.html         # Página para servidores
│   ├── cidadao.html          # Página para cidadãos
│   ├── capacite-se.html      # Página de capacitação
│   ├── legislacao.html       # Página de legislações
│   ├── acesso-sistema.html   # Página de acesso ao sistema
│   ├── oportunidades.html    # Página de oportunidades
│   ├── manuais.html          # Página de manuais
│   └── artigos.html          # Página de artigos (placeholder)
└── README.md                 # Este arquivo

Tecnologias Utilizadas

HTML5: Estrutura das páginas.
CSS3: Estilização com Tailwind CSS (CDN) e estilos personalizados.
JavaScript: Interatividade, como menu off-canvas e busca.
FontAwesome: Ícones para navegação e elementos visuais.
Tailwind CSS: Framework CSS para design responsivo.

Como Executar o Projeto
Pré-requisitos

Um navegador web moderno (Chrome, Firefox, Edge, etc.).
Um servidor local (opcional) para testar o projeto, como Live Server no VS Code ou ferramentas como http-server.

Passos para Executar

Clone o repositório para sua máquina local:
git clone https://github.com/seu-repositorio/portal-compras-rn.git


Navegue até o diretório do projeto:
cd portal-compras-rn


Abra o arquivo index.html em um navegador ou inicie um servidor local:
npx http-server


Acesse o portal pelo endereço indicado (geralmente http://localhost:8080).


Funcionalidades do Portal

Navegação Acessível: Menu lateral off-canvas com suporte a dispositivos móveis.
Páginas Específicas por Perfil: Conteúdo personalizado para fornecedores, servidores e cidadãos.
Capacitação: Cursos e materiais educacionais na página "Capacite-se".
Legislação: Links para documentos legais relevantes.
Oportunidades: Lista de processos de compra abertos.
Manuais: Guias práticos em formato de cards para download.
Acessibilidade: Estrutura semântica e suporte a leitores de tela.

Desenvolvimento e Colaboração
Diretrizes

Planejamento: Utilize o quadro de requisitos no workspace para gerenciar tarefas.
Design: Consulte wireframes e protótipos no quadro de Design e Prototipação.
Desenvolvimento: Divida as tarefas em front-end (HTML/CSS/JS) e back-end (futuras APIs e banco de dados).
Testes: Registre planos de teste no quadro de Testes e Validação.
Documentação: Armazene manuais e relatórios no quadro de Documentação e Entrega.

Como Contribuir

Faça um fork do repositório.

Crie uma branch para sua feature ou correção:
git checkout -b minha-feature


Commit suas alterações com mensagens claras:
git commit -m "Adiciona página de artigos"


Envie a branch para o repositório remoto:
git push origin minha-feature


Abra um Pull Request descrevendo as mudanças.


Próximos Passos

Implementar APIs RESTful para integração com sistemas governamentais.
Configurar o banco de dados para gerenciar oportunidades e usuários.
Adicionar conteúdo dinâmico à página de "Artigos".
Realizar testes de acessibilidade (WCAG 2.1).
Criar diagramas UML para processos de compra no workspace.

Contato
Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento:

Email: contato@sead.rn.gov.br
Telefone: (84) 3232-1000


© 2024 Governo do Rio Grande do Norte. Todos os direitos reservados.
