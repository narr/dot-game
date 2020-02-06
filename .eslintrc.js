module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: { browser: true, es6: true },
  rules: {
    'max-lines': [
      'error',
      { max: 400, skipComments: true, skipBlankLines: true },
    ],
    'no-console': 'error',
    'no-param-reassign': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
  },
};
