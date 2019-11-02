module.exports = {
  publicPath: '',
  outputDir: 'docs',
  chainWebpack: (config) => {
    config.resolve.extensions.add('.vue');
  },
};
