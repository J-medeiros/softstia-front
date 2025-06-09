module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Opcional para configurações adicionais
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
sss