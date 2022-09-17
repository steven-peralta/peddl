module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ['airbnb-typescript-prettier'],
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
    'no-console': 'off',
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
