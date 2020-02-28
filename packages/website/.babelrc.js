const rootImportOpts = {
  root: __dirname,
  rootPathPrefix: '~/',
  rootPathSuffix: './',
};

module.exports = {
  presets: ['next/babel'],
  plugins: [['babel-plugin-root-import']],
};
