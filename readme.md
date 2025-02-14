# Desafio de Automação com Cypress

[![Cypress](https://img.shields.io/badge/Cypress-v10.0-blue)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-v16.0-brightgreen)](https://nodejs.org/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-blueviolet)](https://github.com/vitoriabrenaqa/desafio-qa-cypress)

Este repositório contém a solução para o desafio de automação utilizando **Cypress**. O desafio consiste em:

- **Testes Funcionais**: Automatização de cenários de teste para o site Dev Finance.
- **Testes de API**: Automatização de cenários de teste para a API pública **JSONPlaceholder**.

---
## Cenários de Teste

### Testes Funcionais (Dev Finance)

Foram implementados 6 cenários de teste para o site **Dev Finance**:

- **Adicionar uma nova transação de entrada**: Verifica se uma transação de entrada é adicionada corretamente e exibida na tabela.
- **Adicionar e remover uma transação de saída**: Adiciona uma transação de saída, verifica sua exibição e a remove.
- **Validar campos obrigatórios do formulário**: Verifica se os campos do formulário são obrigatórios e se o formulário não é submetido sem preenchimento.
- **Verificar persistência dos dados após recarregar a página**: Adiciona uma transação e verifica se ela persiste após recarregar a página.
- **Testar cálculos com múltiplas transações**: Adiciona várias transações e verifica se os totais de entradas, saídas e saldo são calculados corretamente.
- **Testar validações de entrada de dados**: Verifica a validação de campos inválidos no formulário.

### Testes de API (JSONPlaceholder)

Foram implementados 10 cenários de teste para a API **JSONPlaceholder**:

- **Listar todos os posts**: Verifica se a lista de posts é retornada com sucesso.
- **Buscar post por ID**: Verifica se um post específico é retornado com base no ID.
- **Buscar comentários de um post**: Verifica se os comentários de um post são retornados com sucesso.
- **Criar novo post**: Verifica se um novo post é criado com sucesso.
- **Criar novo comentário**: Verifica se um novo comentário é criado com sucesso.
- **Atualizar post existente (PUT)**: Verifica se um post existente é atualizado com sucesso.
- **Atualizar parcialmente post existente (PATCH)**: Verifica se um post existente é parcialmente atualizado com sucesso.
- **Deletar post existente**: Verifica se um post existente é deletado com sucesso.
- **Retornar 404 para post inexistente**: Verifica se a API retorna 404 para um post que não existe.
- **Validar schema do post**: Verifica se o schema do post retornado está correto.

---

## Como Executar os Testes

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado. Você pode baixá-lo [aqui](https://nodejs.org/).
- **Cypress**: Instale o Cypress globalmente ou como dependência do projeto.

### Passos para Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/vitoriabrenaqa/desafio-qa-cypress.git
   cd desafio-qa-cypress
2. Instale as dependências:

    ```bash
    npm install
3. Para abrir o Cypress no modo interativo:

    ```bash
    npx cypress open
4. Para executar os testes no terminal:

    ```bash
    npx cypress run
---
## Resultados Esperados
    
Testes Funcionais: Todos os 6 cenários devem passar, validando as funcionalidades do site Dev Finance.
Testes de API: Todos os 10 cenários devem passar, validando os endpoints da API JSONPlaceholder.

---
## Dependências
    
Cypress: Framework de automação de testes.
JSONPlaceholder: API pública utilizada para os testes de API.

---
## Autor
Vitória Brena

---
## Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
