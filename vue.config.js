module.exports = {
  publicPath: '',
  outputDir: 'dist',
  chainWebpack: (config) => {
    config.resolve.extensions.add('.vue');
  },
};
