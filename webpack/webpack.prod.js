var webpack = require('webpack');
var webpackCommon = require('./webpack.common');
var CompressionPlugin = require('compression-webpack-plugin');

var cfg = webpackCommon('production');

cfg.devtool = 'cheap-source-map';
cfg.output.publicPath = './';
cfg.plugins.splice(1, 0,
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    test: /\.js/,
  })
);

module.exports = cfg;
