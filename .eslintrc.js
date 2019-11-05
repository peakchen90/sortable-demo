module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'import/extensions': ['error', 'always', {
      'vue': 'never',
      'js': 'never',
      'json': 'never',
    }],
    'global-require': 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'max-len': 'off',
    'arrow-body-style': 'off',
    'consistent-return': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
