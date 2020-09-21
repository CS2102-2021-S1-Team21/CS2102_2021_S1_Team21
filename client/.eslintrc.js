module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:json/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'always' }],
    curly: ['error', 'multi-line'],
    'no-var': 'error',
    'no-unused-vars': 'warn', // for ease of development (should be changed eventually)
  },
};
