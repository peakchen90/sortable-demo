module.exports = {
  publicPath: '',
  chainWebpack: (config) => {
    config.resolve.extensions.add('.vue');
  },
};
