module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sortable-demo/'
    : '/',
  outputDir: 'dist',
  chainWebpack: (config) => {
    config.resolve.extensions.add('.vue');
  },
};
