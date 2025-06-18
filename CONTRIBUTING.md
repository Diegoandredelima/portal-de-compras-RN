# Guia de Contribuição

Obrigado por considerar contribuir com o Portal de Compras Governamentais do Estado do Rio Grande do Norte! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## Como Contribuir

### 1. Configuração do Ambiente

1. Faça um fork do repositório
2. Clone o fork localmente:
```bash
git clone https://github.com/seu-usuario/portal-compras-governamentais.git
```
3. Adicione o repositório original como upstream:
```bash
git remote add upstream https://github.com/governo-rn/portal-compras-governamentais.git
```

### 2. Fluxo de Trabalho

1. Crie uma branch para sua feature:
```bash
git checkout -b feature/nova-feature
```

2. Faça suas alterações e commits:
```bash
git add .
git commit -m "Descrição das alterações"
```

3. Mantenha sua branch atualizada:
```bash
git fetch upstream
git rebase upstream/main
```

4. Envie suas alterações:
```bash
git push origin feature/nova-feature
```

5. Abra um Pull Request no GitHub

### 3. Padrões de Código

#### HTML
- Use HTML5 semântico
- Mantenha a estrutura consistente
- Inclua atributos alt em imagens
- Use classes descritivas

#### CSS
- Siga o padrão BEM para nomenclatura
- Mantenha a especificidade baixa
- Use variáveis CSS para cores e valores comuns
- Organize as regras por componente

#### JavaScript
- Use ES6+ quando possível
- Siga o padrão de módulos
- Documente funções e classes
- Mantenha o código DRY

### 4. Testes

- Teste suas alterações em diferentes navegadores
- Verifique a responsividade
- Teste a acessibilidade
- Execute os testes automatizados (quando disponíveis)

### 5. Documentação

- Atualize a documentação quando necessário
- Inclua comentários em código complexo
- Documente novas funcionalidades
- Mantenha o README atualizado

### 6. Pull Requests

1. Descreva claramente as alterações
2. Inclua screenshots quando relevante
3. Referencie issues relacionadas
4. Certifique-se de que todos os testes passam

### 7. Código de Conduta

- Seja respeitoso e profissional
- Mantenha o foco no projeto
- Aceite críticas construtivas
- Ajude outros contribuidores

## Processo de Revisão

1. Um mantenedor revisará seu PR
2. Podem ser solicitadas alterações
3. Após aprovado, seu PR será mesclado
4. Você receberá crédito por sua contribuição

## Suporte

Se precisar de ajuda:
- Abra uma issue no GitHub
- Consulte a documentação
- Entre em contato com a equipe

## Licença

Ao contribuir, você concorda em licenciar suas contribuições sob a mesma licença do projeto. 