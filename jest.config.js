module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Look for .test.ts or .spec.ts files
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore these directories
  };
  