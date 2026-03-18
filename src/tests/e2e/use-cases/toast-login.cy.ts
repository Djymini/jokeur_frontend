import { environment } from '../../../environments/environment';

describe('Toasts - Login', () => {
  it('Display success toazst after navigate to dashboard', () => {
    cy.intercept('POST', `${environment.apiUrl}auth/login`, {
      fixture: 'auth.json',
      statusCode: 200,
    }).as('login');

    // stubs dashboard (évite les 401)
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

    // attendre la navigation
    cy.location('pathname', { timeout: 10000 }).should('eq', '/dashboard');

    cy.get('[data-sonner-toast]').contains('Connexion réussie.').should('exist');
  });
});
