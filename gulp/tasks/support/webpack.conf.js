module.exports = function (config) {
  return {
    output: {
      filename: config.src.out
    },
    module: {
      preLoaders: [],
      loaders: [{
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'babel'
      }]
    },
    resolve: {
      alias: {
        src: config.src.root
      }
    },
    devtool: 'source-map'
  };
};
