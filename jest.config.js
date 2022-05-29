module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js"],
  testMatch: ["src/**/*.js?(x)", "**/?(*.)+(test).js?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  /* verbose: false, */
};
