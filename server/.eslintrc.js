module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    curly: ['error', 'multi-line'],
    'no-var': 'error',
    'no-unused-vars': 'warn', // for ease of development (should be changed eventually)
  },
};
