module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
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
    'no-unused-vars': 1,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 0,
    'eol-last': 0,
    'linebreak-style': 0,
    'max-len': 0,
    'new-cap': 0,
    'require-jsdoc': 0,
    'no-throw-literal': 0,
    'no-plusplus': 0,
    'import/order': 0,
    'no-param-reassign': [2, { props: false }],
  },
};
