// import { environment } from '../../../environments/environment';

describe('Toasts - Register', () => {
  it('affiche le toast de succès après inscription et redirige vers /login', () => {
    cy.intercept('POST', '**/auth/register', {
      statusCode: 200,
      body: { message: 'Inscription réussie.' },
    }).as('registerOk');

    cy.visit('/register');

    cy.get('#name').should('not.be.disabled').type('Doe');
    cy.get('#firstname').should('not.be.disabled').type('John');
    cy.get('#phone').should('not.be.disabled').type('0612345678');
    cy.get('#email').should('not.be.disabled').type('john.doe@mail.com');
    cy.get('#password').should('not.be.disabled').type('Password123!');
    cy.get('#confirmPassword').should('not.be.disabled').type('Password123!');
    cy.get('#acceptCGU').check({ force: true });

    cy.contains('button', "S'enregistrer").click();
    cy.wait('@registerOk');

    // si tu rediriges vers /login
    cy.location('pathname', { timeout: 10000 }).should('eq', '/login');

    // toast (exist = stable)
    cy.get('[data-sonner-toast]').contains('Inscription réussie.').should('exist');
  });
});
