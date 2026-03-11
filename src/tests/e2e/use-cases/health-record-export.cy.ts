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
  });

  const login = (): void => {
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
  };

  const navigateToAnimalDetail = (): void => {
    cy.contains('Medor').closest('div.rounded-lg').find('a[title="Voir les détails"]')
      .click();
    cy.wait('@healthRecordDetailRequest');
    cy.contains('Exporter').should('be.visible');
  };

  it('should open export modal when clicking Exporter', () => {
    login();
    navigateToAnimalDetail();

    cy.contains('Exporter').click();
    cy.contains('Exporter la fiche santé').should('be.visible');
  });

  it('should show validation errors when submitting empty export form', () => {
    login();
    navigateToAnimalDetail();

    cy.contains('Exporter').click();
    cy.get('button[type="submit"]').click();
    cy.contains('Format').should('be.visible');
  });

  it('should show error when date is in the future', () => {
    login();
    navigateToAnimalDetail();

    cy.contains('Exporter').click();
    cy.get('input[id="from"]').type('2099-01-01');
    cy.get('button[type="submit"]').click();
    cy.contains('Du').parent().find('[data-error], .error, [class*="error"]')
      .should('be.visible');
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
    cy.get('input[id="from"]').type('2024-01-01');
    cy.get('input[id="to"]').type('2024-12-31');
    cy.get('button[type="submit"]').click();
    cy.wait('@exportPdfRequest');
    cy.contains('Export généré avec succès').should('be.visible');
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
    cy.get('input[id="from"]').type('2024-01-01');
    cy.get('input[id="to"]').type('2024-12-31');
    cy.get('button[type="submit"]').click();
    cy.wait('@exportXlsxRequest');
    cy.contains('Export généré avec succès').should('be.visible');
  });
});
