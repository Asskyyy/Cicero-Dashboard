const path = require('path');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    ignores: ['.next/**', 'node_modules/**', '../backend/**'],
  },
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('plugin:prettier/recommended'),
];
