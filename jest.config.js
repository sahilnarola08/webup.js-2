const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "@fontsource": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@fontsource/)"],
  testEnvironment: "jest-environment-jsdom",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.[jt]sx?$",
  collectCoverage: true,
  coverageReporters: ["text", "cobertura", "html"],
  coverageDirectory: "target/tests/unit/coverage",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
  collectCoverageFrom: ["**/*.tsx", "**/*.ts", "!**/*.d.ts"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "target/tests/unit/junit/",
        outputName: "junit.xml",
        classNameTemplate: "{classname}",
        titleTemplate: "{classname} - {title}",
      },
    ],
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Jest Unit Test Report",
        outputPath: "target/tests/unit/html/index.html",
        includeFailureMsg: true,
        includeSuiteFailure: true,
        dateFormat: "dd-mm-yyyy HH:MM:ss",
      },
    ],
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
