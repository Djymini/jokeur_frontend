import { environment } from '../../../environments/environment';

describe('Toasts - Register', () => {
  const fillRegisterForm = (u: any): void => {
    cy.get('#name').should('not.be.disabled').type(u.name);
    cy.get('#firstname').should('not.be.disabled').type(u.firstname);
    cy.get('#phone').should('not.be.disabled').type('0612345678');
    cy.get('#email').should('not.be.disabled').type(u.email);

    cy.get('#password').should('not.be.disabled').type('Password123!');
    cy.get('#confirmPassword').should('not.be.disabled').type('Password123!');
    cy.get('#acceptCGU').check({ force: true });
  };

  it('Displays successful toast after register then navigate to login', () => {
    cy.intercept('POST', `${environment.apiUrl}auth/register`, {
      statusCode: 200,
      body: { message: 'Utilisateur inscrit avec succès.' },
    }).as('registerOk');

    cy.visit('/register');

    cy.fixture('auth.json').then((u) => {
      fillRegisterForm(u);
    });

    cy.contains('button', "S'enregistrer").click();
    cy.wait('@registerOk');

    cy.location('pathname', { timeout: 10000 }).should('eq', '/login');
    cy.get('[data-sonner-toast]').contains('Inscription réussie.').should('exist');
  });

  it('Displays error toast when email already used (409)', () => {
    cy.intercept('POST', `${environment.apiUrl}auth/register`, {
      statusCode: 409,
      body: {
        error: 'USER_EMAIL_ALREADY_USED',
        message: `Cet email est déjà utilisé : test@test.com`,
      },
    }).as('registerEmail409');

    cy.visit('/register');

    cy.fixture('auth.json').then((u) => {
      fillRegisterForm(u);
    });

    cy.contains('button', "S'enregistrer").click();
    cy.wait('@registerEmail409');

    cy.location('pathname').should('eq', '/register');
    cy.get('[data-sonner-toast]').contains('Cet email est déjà utilisé').should('exist');
  });
});
