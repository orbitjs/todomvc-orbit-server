export default {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
};
