module.exports = {
  extends: '../common/.eslintrc.js',
  env: {
    browser: false,
  },
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
    'dot-notation': 'off',
  },
};
