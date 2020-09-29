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
    // downgraded rules
    'no-plusplus': 'off',
    // custom rules (to be kept even without airbnb config)
    curly: ['error', 'multi-line'],
    'no-var': 'error',
    // disabled for ease of development (should be changed eventually)
    'no-unused-vars': 'warn',
  },
};
