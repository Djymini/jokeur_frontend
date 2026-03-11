import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'src/tests/e2e/use-cases/**/*.cy.ts',
    supportFile: 'src/tests/e2e/support/e2e.ts',
    fixturesFolder: 'src/tests/e2e/fixtures',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
