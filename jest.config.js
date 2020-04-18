module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js?$": "ts-jest",
  },
  testMatch: ["**/*.(test|spec).(ts|tsx|js)"],
  globals: {
    "ts-jest": {
      babelConfig: true,
      diagnostics: false,
      tsConfig: "jest.tsconfig.json",
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/", "enzyme.js"],
  setupFilesAfterEnv: [
    "<rootDir>/enzyme.js",
    "<rootDir>/testUtil/test-setup.js",
  ],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/mocks.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/mocks.js",
  },
};
