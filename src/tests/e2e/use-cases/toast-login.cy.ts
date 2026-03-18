import { environment } from '../../../environments/environment';

describe('Toasts - Login', () => {
  it('Displays successful toast after navigate to dashboard', () => {
    cy.intercept('POST', `${environment.apiUrl}auth/login`, {
      fixture: 'auth.json',
      statusCode: 200,
    }).as('login');

    // évite les 401
    cy.intercept('GET', '**/appointment*', {
      statusCode: 200,
      body: { content: [], totalElements: 0 },
    });
    cy.intercept('GET', '**/health-records*', { statusCode: 200, body: [] });
    cy.intercept('GET', '**/reminder*', {
      statusCode: 200,
      body: { content: [], totalElements: 0 },
    });
    cy.intercept('GET', '**/news*', { statusCode: 200, body: { content: [], totalElements: 0 } });
    cy.intercept('GET', '**/form-options*', { statusCode: 200, body: {} });

    cy.visit('/login');

    cy.get('#email').should('not.be.disabled').type('test@mail.com');
    cy.get('#password').should('not.be.disabled').type('goodPassword123!');
    cy.contains('button', 'Connexion').click();

    cy.wait('@login');

    cy.location('pathname', { timeout: 10000 }).should('eq', '/dashboard');

    cy.get('[data-sonner-toast]').contains('Connexion réussie.').should('exist');
  });

  it('Displays error toast when login failed', () => {
    cy.intercept('POST', `${environment.apiUrl}/auth/login`, {
      statusCode: 401,
      body: { error: 'UNAUTHORIZED', message: 'Email ou mot de passe incorrect' },
    }).as('loginFail');

    cy.visit('/login');

    cy.get('#email').should('not.be.disabled').type('test@mail.com');
    cy.get('#password').should('not.be.disabled').type('wrongPassword!');
    cy.contains('button', 'Connexion').click();

    cy.wait('@loginFail');

    // on reste sur la page login
    cy.location('pathname').should('eq', '/login');

    // toast existe
    cy.get('[data-sonner-toast]').contains('Email ou mot de passe incorrect.').should('exist');
  });

});
