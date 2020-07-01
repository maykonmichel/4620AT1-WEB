module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  globals: {
    'localStorage': 'true',
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-console': 'error',
  },
};
