# Portal de Compras Governamentais - RN

Bem-vindo ao repositório do **Portal de Compras Governamentais do Rio Grande do Norte**. Este projeto visa desenvolver um portal web para facilitar o acesso a informações e serviços relacionados às compras públicas, promovendo transparência, eficiência e colaboração entre fornecedores, servidores e cidadãos.

## Descrição do Projeto
O portal é uma plataforma centralizada que oferece suporte a diferentes perfis de usuários (fornecedores, servidores e cidadãos), com funcionalidades como:
- Consulta de oportunidades
- Acesso a legislações
- Manuais
- Cursos de capacitação
- Integração com sistemas governamentais

O projeto segue as diretrizes de acessibilidade e boas práticas para portais governamentais.

## Estrutura do Projeto
A estrutura de diretórios do projeto é organizada da seguinte forma:

```
portal-de-compras-RN/
├── public/
│   ├── css/                # Estilos CSS personalizados
│   ├── fonts/              # Fontes utilizadas
│   ├── images/             # Imagens do portal
│   ├── js/                 # Scripts JavaScript para interatividade
│   └── pages/              # Páginas HTML do portal
├── scripts/                # Scripts utilitários
├── styles/                 # Estilos adicionais
├── backend-wordpress/      # Backend (WordPress)
├── ...
└── README.md               # Este arquivo
```

## Tecnologias Utilizadas
- **HTML5**: Estrutura das páginas
- **CSS3**: Estilização com Tailwind CSS (CDN) e estilos personalizados
- **JavaScript**: Interatividade, como menu off-canvas e busca
- **FontAwesome**: Ícones para navegação e elementos visuais
- **Tailwind CSS**: Framework CSS para design responsivo

## Como Executar o Projeto
### Pré-requisitos
- Um navegador web moderno (Chrome, Firefox, Edge, etc.)
- Um servidor local (opcional) para testar o projeto, como Live Server no VS Code ou ferramentas como `http-server`

### Passos para Executar
1. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/seu-repositorio/portal-compras-rn.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd portal-compras-rn
   ```
3. Abra o arquivo `public/Index.html` em um navegador **ou** inicie um servidor local:
   ```bash
   npx http-server public
   ```
4. Acesse o portal pelo endereço indicado (geralmente http://localhost:8080).

## Funcionalidades do Portal
- **Navegação Acessível**: Menu lateral off-canvas com suporte a dispositivos móveis
- **Páginas Específicas por Perfil**: Conteúdo personalizado para fornecedores, servidores e cidadãos
- **Capacitação**: Cursos e materiais educacionais na página "Capacite-se"
- **Legislação**: Links para documentos legais relevantes
- **Oportunidades**: Lista de processos de compra abertos
- **Manuais**: Guias práticos em formato de cards para download
- **Acessibilidade**: Estrutura semântica e suporte a leitores de tela

## Desenvolvimento e Colaboração
### Diretrizes
- **Planejamento**: Utilize o quadro de requisitos no workspace para gerenciar tarefas
- **Design**: Consulte wireframes e protótipos no quadro de Design e Prototipação
- **Desenvolvimento**: Divida as tarefas em front-end (HTML/CSS/JS) e back-end (futuras APIs e banco de dados)
- **Testes**: Registre planos de teste no quadro de Testes e Validação
- **Documentação**: Armazene manuais e relatórios no quadro de Documentação e Entrega

### Como Contribuir
1. Faça um fork do repositório
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações com mensagens claras:
   ```bash
   git commit -m "Adiciona página de artigos"
   ```
4. Envie a branch para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request descrevendo as mudanças

## Próximos Passos
- Implementar APIs RESTful para integração com sistemas governamentais
- Configurar o banco de dados para gerenciar oportunidades e usuários
- Adicionar conteúdo dinâmico à página de "Artigos"
- Realizar testes de acessibilidade (WCAG 2.1)
- Criar diagramas UML para processos de compra no workspace

## Contato
Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento:

- **Email:** contato@sead.rn.gov.br
- **Telefone:** (84) 3232-1000

---

© 2024 Governo do Rio Grande do Norte. Todos os direitos reservados. 
