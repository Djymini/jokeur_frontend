import { environment } from '../../../environments/environment';

describe('Health record', () => {
  beforeEach(() => {
    cy.intercept('POST', `${environment.apiUrl}auth/login`, { fixture: 'auth.json' }).as(
      'loginRequest',
    );

    cy.intercept('GET', environment.apiUrl + `appointment?userId=1&page=0&size=1`, {
      fixture: 'appointment.json',
    }).as('appointmentRequest');

    cy.intercept('GET', environment.apiUrl + `/health-records?userId=1`, {
      fixture: 'health-record.json',
    }).as('healthRecordRequest');

    cy.intercept('GET', environment.apiUrl + `reminder?userId=1&page=0&size=1`, {
      fixture: 'reminder.json',
    }).as('reminderRequest');

    cy.intercept('GET', environment.apiUrl + `news?page=0&size=1`, {
      fixture: 'news.json',
    }).as('newsRequest');

    cy.intercept('GET', environment.apiUrl + `form-options`, {
      fixture: 'form-option.json',
    }).as('formOptionRequest');
  });

  it('Create health record', () => {
    cy.visit('/login');

    cy.get('input[id="email"]').type('test@test.com');
    cy.get('input[id="password"]').type('P@ssword1234');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');

    cy.wait([
      '@appointmentRequest',
      '@healthRecordRequest',
      '@reminderRequest',
      '@newsRequest',
      '@formOptionRequest',
    ]);

    cy.contains('button', ' Ajouter un animal ').click();
    cy.get('input[id="petName"]').type('Milou');
    cy.get('select[id="animalType"]').select('Chien');
    cy.get('select[id="breed"]').select('Labrador');
    cy.get('select[id="sex"]').select('Femelle');
    cy.get('input[id="birthDate"]').type('1995-02-02');
    cy.get('input[id="currentWeight"]').type('12');
    cy.get('select[id="color"]').select('Noir');
    cy.get('input[id="identificationNumber"]').type('FR121212121258');
    cy.get('input[id="tattooNumber"]').type('ABC3333');
    cy.get('input[id="allergy"]').type('Aucune');

    cy.intercept('POST', `${environment.apiUrl}health-records`, {
      fixture: 'add-health-record.json',
    }).as('healthRecordPostRequest');
    cy.get('button[type="submit"]').click();
    cy.wait(['@healthRecordPostRequest']);
    cy.contains('Milou');
  });
});
