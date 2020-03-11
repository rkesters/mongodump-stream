module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'mongodb',
    testEnvironmentOptions: {
        binary: {
            version: '4.2.2',
        },
        instance: {
            storageEngine: 'ephemeralForTest'
        },
        debug: false,
        autoStart: true,
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    restoreMocks: true,
    clearMocks: true,
    setupFilesAfterEnv: ['<rootDir>/__tests__/support/setupFramework.ts'],
    roots: ['<rootDir>/src', '<rootDir>/__tests__'],
    coverageReporters: ['lcov', 'cobertura'],
    coverageDirectory: '.coverage',
    coveragePathIgnorePatterns: ['/__tests__/', '/node_modules/'],
    testRegex: '(/__tests__/specs/.*)\\.[t]sx?$'
};
