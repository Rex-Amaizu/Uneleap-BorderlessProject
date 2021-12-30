module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'quotes': ['error', 'single'],
    'no-unused-vars': 0,
    'eol-last': ['error', 'never'],
    'max-len': 0,
  },
  parserOptions: {
    ecmaVersion: 2019,
  },
};