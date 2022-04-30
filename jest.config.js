module.exports = {
    roots: ['<rootDir>'],

    coverageDirectory: 'coverage',

    collectCoverageFrom: [
        '<rootDir>/src/data/**/*.js',
        '!<rootDir>/src/data/index.js',
        '<rootDir>/src/presentation/controllers/*.js',
        '!<rootDir>/src/presentation/controllers/index.js',
    ],

    testEnvironment: 'node',

    moduleFileExtensions: ['js', 'json'],

    transform: {
        '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin',
    },
};
