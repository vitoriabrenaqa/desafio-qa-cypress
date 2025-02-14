// cypress/integration/devfinance.spec.js

describe('Dev Finance - Testes Funcionais', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.clearLocalStorage()
  })

  // Funções auxiliares
  const addTransaction = (description, amount, date) => {
    cy.get('a.button.new').click()
    cy.get('#description').type(description)
    cy.get('#amount').type(amount)
    cy.get('#date').type(date)
    cy.contains('button', 'Salvar').click()
  }

  // Cenário 1: Adicionar uma nova transação de entrada
  it('Deve adicionar uma nova transação de entrada com sucesso', () => {
    addTransaction('Salário', '5000', '2025-02-13')
    
    cy.contains('tbody tr', 'Salário').should('exist')
    cy.get('tbody tr').first()
      .should('include.text', '5.000')
  })

  // Cenário 2: Adicionar e remover uma transação de saída
it('Deve adicionar e remover uma transação de saída com sucesso', () => {
  addTransaction('Conta de Luz', '-150', '2025-02-13')
  
  // Verifica se a transação foi adicionada
  cy.contains('tbody tr', 'Conta de Luz').should('exist')

  // Verifica o valor da transação
  cy.contains('tbody tr', 'Conta de Luz')
    .find('td.data-table__price-expense') // Seleciona o <td> com a classe correta
    .should('have.text', '-R$ 150,00') // Verifica o texto do valor

  // Remove a transação
  cy.contains('tbody tr', 'Conta de Luz')
  .find('img')
  .eq(1) // Seleciona o segundo <img>
  .click({ force: true });

  // Verifica se a transação foi removida
  cy.contains('tbody tr', 'Conta de Luz').should('not.exist')
})

  // Cenário 3: Validar campos obrigatórios do formulário
  it('Deve validar campos obrigatórios ao tentar salvar transação vazia', () => {
    cy.get('a.button.new').click()
    // Tenta submeter o formulário vazio
    cy.contains('button', 'Salvar').click()
    
    // Verifica se o formulário não foi submetido
    cy.get('table tbody tr').should('not.exist')
  })

  // Cenário 4: Verificar persistência dos dados após reload
  it('Deve manter os dados após recarregar a página', () => {
    addTransaction('Teste Persistência', '1000', '2025-02-13')
    
    cy.reload()
    
    cy.contains('tbody tr', 'Teste Persistência').should('exist')
    cy.get('tbody tr').first()
      .should('include.text', '1.000')
  })

  // Cenário 5: Testar cálculos com múltiplas transações
  it('Deve calcular corretamente o balanço com múltiplas transações', () => {
    addTransaction('Salário', '3000', '2025-02-13')
    addTransaction('Aluguel', '-1000', '2025-02-13')
    addTransaction('Freelance', '500', '2025-02-13')
    addTransaction('Conta de Luz', '-150', '2025-02-13')

    cy.get('tbody tr').should('have.length', 4)

    // Verifica os totais
    cy.get('.card').then($cards => {
      const cardTexts = Array.from($cards).map(card => card.innerText)
      
      // Verifica se os textos dos cards contêm os valores esperados
      const containsValue = (texts, value) => 
        texts.some(text => text.includes(value.toString()))

      expect(containsValue(cardTexts, '3.500')).to.be.true // Entradas
      expect(containsValue(cardTexts, '1.150')).to.be.true // Saídas
      expect(containsValue(cardTexts, '2.350')).to.be.true // Total
    })
  })

  // Cenário 6: Testar validações de entrada de dados
  it('Deve validar a entrada de dados no formulário', () => {
    cy.get('a.button.new').click()

    // Tenta salvar sem preencher nada
    cy.contains('button', 'Salvar').click()
    cy.get('table tbody tr').should('not.exist')

    // Testa entrada inválida no campo de valor
    cy.get('#description').type('Teste')
    cy.get('#amount').type('abc')
    cy.get('#date').type('2025-02-13')
    cy.contains('button', 'Salvar').click()
    cy.get('table tbody tr').should('not.exist')

    // Testa data válida
    cy.get('#amount').clear().type('100')
    cy.get('#date').clear().type('2025-02-13')
    cy.contains('button', 'Salvar').click()
    cy.contains('tbody tr', 'Teste').should('exist')
  })
})