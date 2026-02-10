import type { Config } from 'jest';

const config: Config = {
  rootDir: '../../../',
  preset: 'jest-preset-angular',
  displayName: 'integration',

  testMatch: ['<rootDir>/src/tests/integration/**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],

  testEnvironment: 'jsdom', // ou 'node' si API pure

  clearMocks: true,
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage/integration',
  coverageReporters: ['html', 'text-summary'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/',
  },

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default config;
