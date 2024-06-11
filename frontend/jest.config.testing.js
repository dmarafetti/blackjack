module.exports = {
    roots: ['test'],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|ts|tsx)$": "babel-jest"
    },
    setupFiles: ['<rootDir>/jest.setup.js']
};
