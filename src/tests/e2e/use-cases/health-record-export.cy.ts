import { environment } from '../../../environments/environment';

Cypress.on('uncaught:exception', () => false);

describe('Health record export', () => {
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
    cy.intercept('GET', environment.apiUrl + `news?page=0&size=1`, { fixture: 'news.json' }).as(
      'newsRequest',
    );
    cy.intercept('GET', environment.apiUrl + `form-options`, { fixture: 'form-option.json' }).as(
      'formOptionRequest',
    );
    cy.intercept('GET', `${environment.apiUrl}/health-records/*`, {
      fixture: 'health-record-detail.json',
    }).as('healthRecordDetailRequest');
    cy.intercept('GET', `${environment.apiUrl}/vaccines/*`, { fixture: 'vaccines.json' }).as(
      'vaccinesRequest',
    );
    cy.intercept('GET', `${environment.apiUrl}/symptom-health-records/*`, {
      fixture: 'symptom-record.json',
    }).as('symptomRecordsRequest');
    cy.intercept('GET', `${environment.apiUrl}/symptoms`, { fixture: 'symptoms.json' }).as(
      'symptomsRequest',
    );
    cy.intercept('GET', `${environment.apiUrl}/treatments/*`, { fixture: 'treatments.json' }).as(
      'treatmentsRequest',
    );
  });

  const login = (): void => {
    cy.visit('/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('jwt_token', 'fake-jwt-token-12345');
        win.localStorage.setItem(
          'user',
          JSON.stringify({
            token: 'fake-jwt-token-12345',
            id: 1,
            firstname: 'John',
            name: 'Doe',
            email: 'test@test.com',
            role: 'OWNER',
          }),
        );
      },
    });
    cy.wait([
      '@appointmentRequest',
      '@healthRecordRequest',
      '@reminderRequest',
      '@newsRequest',
      '@formOptionRequest',
    ]);
  };

  const navigateToAnimalDetail = (): void => {
    cy.contains('Medor').closest('div.animal-card').find('a').click(); // eslint-disable-line newline-per-chained-call
    cy.wait('@healthRecordDetailRequest');
    cy.wait([
      '@vaccinesRequest',
      '@symptomRecordsRequest',
      '@symptomsRequest',
      '@treatmentsRequest',
    ]);
    cy.contains('Exporter').should('be.visible');
  };

  it('should open export modal when clicking Exporter', () => {
    login();
    navigateToAnimalDetail();

    cy.contains('Exporter').click();
    cy.get('h2.title').should('be.visible').and('contain', 'Exporter la fiche santé');
  });

  it('should show validation errors when submitting empty export form', () => {
    login();
    navigateToAnimalDetail();

    cy.contains('Exporter').click();
    cy.get('form').should('be.visible').submit();
    cy.contains('Format').closest('.field').find('.error').should('be.visible'); // eslint-disable-line newline-per-chained-call
  });

  it('should show error when date is in the future', () => {
    login();
    navigateToAnimalDetail();

    cy.contains('Exporter').click();
    cy.contains('label', 'PDF').click();
    cy.get('input[id="from"]').should('not.be.disabled').type('2099-01-01');
    cy.get('input[id="to"]').should('not.be.disabled').type('2099-01-01');
    cy.get('form').submit();
    cy.contains('Du').closest('.field').find('.error').should('be.visible'); // eslint-disable-line newline-per-chained-call
  });

  it('should trigger PDF download when form is valid and PDF selected', () => {
    cy.intercept('POST', `${environment.apiUrl}/health-records/*/export/pdf`, (req) => {
      req.reply({
        statusCode: 200,
        headers: { 'Content-Type': 'application/pdf' },
        body: new Blob(['%PDF'], { type: 'application/pdf' }),
      });
    }).as('exportPdfRequest');

    login();
    navigateToAnimalDetail();

    cy.contains('Exporter').click();
    cy.contains('label', 'PDF').click();
    cy.get('input[id="from"]').should('not.be.disabled').type('2024-01-01');
    cy.get('input[id="to"]').should('not.be.disabled').type('2024-12-31');
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait('@exportPdfRequest');
    cy.contains('Export généré avec succès').should('exist');
  });

  it('should trigger XLSX download when XLSX format is selected', () => {
    cy.intercept('POST', `${environment.apiUrl}/health-records/*/export/xlsx`, (req) => {
      req.reply({
        statusCode: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        body: new Blob(['PK'], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      });
    }).as('exportXlsxRequest');

    login();
    navigateToAnimalDetail();

    cy.contains('Exporter').click();
    cy.contains('label', 'XSLX').click();
    cy.get('input[id="from"]').should('not.be.disabled').type('2024-01-01');
    cy.get('input[id="to"]').should('not.be.disabled').type('2024-12-31');
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait('@exportXlsxRequest');
    cy.contains('Export généré avec succès').should('exist');
  });
});
