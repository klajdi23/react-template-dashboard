/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom", // Ensures Jest uses JSDOM
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(axios)/)", // Transpile axios
    ],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Jest setup file
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
