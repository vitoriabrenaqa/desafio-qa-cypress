// cypress/e2e/api-tests.spec.cy.js

describe('API Tests', () => {
  describe('GET Endpoints', () => {
    it('deve listar todos os posts', () => {
      cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.length(100)
          expect(response.body[0]).to.have.property('title')
        })
    })

    it('deve buscar post por ID', () => {
      cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.id).to.eq(1)
        })
    })

    it('deve buscar comentários de um post', () => {
      cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1/comments')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('array')
          expect(response.body[0]).to.have.property('email')
        })
    })
  })

  describe('POST Endpoints', () => {
    it('deve criar novo post', () => {
      const post = {
        title: 'Novo Post',
        body: 'Conteúdo do post',
        userId: 1
      }

      cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', post)
        .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.title).to.eq(post.title)
        })
    })

    it('deve criar novo comentário', () => {
      const comment = {
        postId: 1,
        name: 'Teste',
        email: 'teste@teste.com',
        body: 'Comentário de teste'
      }

      cy.request('POST', 'https://jsonplaceholder.typicode.com/comments', comment)
        .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.email).to.eq(comment.email)
        })
    })
  })

  describe('PUT/PATCH Endpoints', () => {
    it('deve atualizar post existente - PUT', () => {
      const updatedPost = {
        title: 'Título Atualizado',
        body: 'Conteúdo atualizado',
        userId: 1
      }

      cy.request('PUT', 'https://jsonplaceholder.typicode.com/posts/1', updatedPost)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.title).to.eq(updatedPost.title)
        })
    })

    it('deve atualizar parcialmente post existente - PATCH', () => {
      const partialUpdate = {
        title: 'Apenas Título Atualizado'
      }

      cy.request('PATCH', 'https://jsonplaceholder.typicode.com/posts/1', partialUpdate)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.title).to.eq(partialUpdate.title)
        })
    })
  })

  describe('DELETE Endpoints', () => {
    it('deve deletar post existente', () => {
      cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
          expect(response.status).to.eq(200)
        })
    })
  })

  describe('Validações de Erro', () => {
    it('deve retornar 404 para post inexistente', () => {
      cy.request({
        url: 'https://jsonplaceholder.typicode.com/posts/999',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })

    it('deve validar schema do post', () => {
      cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
          expect(response.body).to.have.all.keys('userId', 'id', 'title', 'body')
        })
    })
  })
})
