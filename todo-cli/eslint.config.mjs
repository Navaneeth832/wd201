import eslint from 'eslint';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
      'no-unused-vars': 'warn',
    },
  },
];
