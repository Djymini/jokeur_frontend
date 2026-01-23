import type { Config } from 'jest';

const config: Config = {
  rootDir: '../../../',
  preset: 'jest-preset-angular',
  displayName: 'unit',

  testMatch: ['<rootDir>/src/tests/unit/**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],

  testEnvironment: 'jsdom',

  clearMocks: true,
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage/unit',
  coverageReporters: ['html', 'text-summary'],

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default config;
