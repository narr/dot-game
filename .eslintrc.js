module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  env: { browser: true, es6: true, node: true },
  rules: {
    'max-lines': [
      'error',
      { max: 400, skipComments: true, skipBlankLines: true },
    ],
    'no-console': 'error',
    'no-param-reassign': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'cypress/no-unnecessary-waiting': 'off',
  },
};
