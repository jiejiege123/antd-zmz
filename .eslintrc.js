module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  // extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2016,
    // sourceType: "module"
  },
  rules: {
    indent: ['error', 2],
    // "linebreak-style": ["error", "unix"],
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
    // 关闭console提示( Unexpected console statement)
    'no-console': 'off',
    // 关闭定义了，但没调用(** is defind but never used)
    'no-unused-vars': 'off',
  },
};
