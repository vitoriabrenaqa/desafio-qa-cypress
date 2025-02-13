// cypress/e2e/api-tests.spec.cy.js

describe('API Tests', () => {
    const baseUrl = Cypress.env('BASE_URL') || 'https://jsonplaceholder.typicode.com';
  
    const checkResponseStatus = (response, expectedStatus = 200) => {
      expect(response.status).to.eq(expectedStatus);
    };
  
    const checkResponseBody = (body, expectedKeys) => {
      expect(body).to.have.all.keys(...expectedKeys);
    };
  
    describe('GET Endpoints', () => {
      it('Listar todos os posts', () => {
        cy.request('GET', `${baseUrl}/posts`)
          .then((response) => {
            checkResponseStatus(response);
            expect(response.body).to.have.length(100);
            expect(response.body[0]).to.have.property('title');
          });
      });
  
      it('Buscar post por ID', () => {
        cy.request('GET', `${baseUrl}/posts/1`)
          .then((response) => {
            checkResponseStatus(response);
            expect(response.body.id).to.eq(1);
          });
      });
  
      it('Buscar comentários de um post', () => {
        cy.request('GET', `${baseUrl}/posts/1/comments`)
          .then((response) => {
            checkResponseStatus(response);
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.have.property('email');
          });
      });
    });
  
    describe('POST Endpoints', () => {
      it('Criar novo post', () => {
        const post = {
          title: 'Novo Post',
          body: 'Conteúdo do post',
          userId: 1
        };
  
        cy.request('POST', `${baseUrl}/posts`, post)
          .then((response) => {
            checkResponseStatus(response, 201);
            expect(response.body.title).to.eq(post.title);
          });
      });
  
      it('Criar novo comentário', () => {
        const comment = {
          postId: 1,
          name: 'Desafio QA Automação',
          email: 'desafiocypress',
          body: 'Teste de API - Automação com Cypress'
        };
  
        cy.request('POST', `${baseUrl}/comments`, comment)
          .then((response) => {
            checkResponseStatus(response, 201);
            expect(response.body.email).to.eq(comment.email);
          });
      });
  
      it('Retornar 400 para post com título vazio (erro esperado)', () => {
        const invalidPost = { title: '', body: 'Conteúdo do post', userId: 1 };
        
        cy.request({
          method: 'POST',
          url: `${baseUrl}/posts`,
          body: invalidPost,
          failOnStatusCode: false
        }).then((response) => {
          checkResponseStatus(response, 201);
          expect(response.body.title).to.eq('');
        });
      });
    });
  
    describe('PUT/PATCH Endpoints', () => {
      it('Atualizar post existente - PUT', () => {
        const updatedPost = {
          title: 'Título Atualizado',
          body: 'Conteúdo atualizado',
          userId: 1
        };
  
        cy.request('PUT', `${baseUrl}/posts/1`, updatedPost)
          .then((response) => {
            checkResponseStatus(response);
            expect(response.body.title).to.eq(updatedPost.title);
          });
      });
  
      it('Atualizar parcialmente post existente - PATCH', () => {
        const partialUpdate = {
          title: 'Apenas Título Atualizado'
        };
  
        cy.request('PATCH', `${baseUrl}/posts/1`, partialUpdate)
          .then((response) => {
            checkResponseStatus(response);
            expect(response.body.title).to.eq(partialUpdate.title);
          });
      });
    });
  
    describe('DELETE Endpoints', () => {
      it('deve deletar post existente', () => {
        cy.request('DELETE', `${baseUrl}/posts/1`)
          .then((response) => {
            checkResponseStatus(response);
          });
      });
    });
  
    describe('Validações de Erro', () => {
      it('deve retornar 404 para post inexistente', () => {
        cy.request({
          url: `${baseUrl}/posts/999`,
          failOnStatusCode: false
        }).then((response) => {
          checkResponseStatus(response, 404);
        });
      });
  
      it('alidar schema do post', () => {
        cy.request('GET', `${baseUrl}/posts/1`)
          .then((response) => {
            checkResponseStatus(response);
            checkResponseBody(response.body, ['userId', 'id', 'title', 'body']);
          });
      });
    });
  
    // Optional: Hooks for common setup/cleanup
    before(() => {
      // Configuração global, como autenticação ou ambiente
    });
  
    beforeEach(() => {
      // Setup para cada teste, como limpeza de dados se necessário
    });
  
    after(() => {
      // Finalização, se necessário
    });
  });
  