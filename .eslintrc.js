module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ["@charrue/base", "@charrue/vue2"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": "off",
    "no-param-reassign": "off",
    eqeqeq: "off",
    "no-underscore-dangle": "off",
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    "import/core-modules": ["windi.css"],
  },
};
