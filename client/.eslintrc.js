module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:json/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier'],
  rules: {
    // downgraded rules
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'react/jsx-wrap-multilines': ['error', { prop: 'ignore' }],
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'no-plusplus': 'off',
    // custom rules (to be kept even without airbnb config)
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'always' }],
    curly: ['error', 'multi-line'],
    'no-var': 'error',
    // disabled for ease of development (should be changed eventually)
    'no-unused-vars': 'warn',
  },
};
