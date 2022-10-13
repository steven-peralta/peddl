/* eslint-env node */
module.exports = {
  env: {
    node: false,
  },
  extends: ['eslint-config-airbnb', '../common/.eslintrc.js'],
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    ecmaVersion: 'latest',
  },
  settings: {
    typescript: {
      project: './',
    },
  },
  rules: {
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': 'warn',
  },
};
