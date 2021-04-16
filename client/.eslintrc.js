module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    semi: [
      'error',
      'always',
    ],
    'no-trailing-spaces': 0,
    'keyword-spacing': 0,
    'no-unused-vars': 0,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 0,
    'eol-last': 0,
    'linebreak-style': 0,
    'new-cap': 0,
    'require-jsdoc': 0,
    'no-throw-literal': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'eqeqeq': 0,
    'no-param-reassign': [2, { props: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-use-before-define': ['error', { variables: false }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
