import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  clearMocks: true,
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default config;
