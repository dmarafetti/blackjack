module.exports = {
  preset: 'jest-puppeteer',
  roots: [ 'specs' ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/specs/mocks/index.js'],
};
