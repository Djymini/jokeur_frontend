import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    supportFile: "src/tests/e2e/support/e2e.ts",
    specPattern: "src/tests/e2e/use-cases/**/*.cy.ts",
    fixturesFolder: "src/tests/e2e/fixtures",
    setupNodeEvents(on, config) {},
  },
});
