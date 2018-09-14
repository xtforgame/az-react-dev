var webpack = require('webpack');
var webpackCommon = require('./webpack.common');
var CompressionPlugin = require('compression-webpack-plugin');

var cfg = webpackCommon({
  mode: 'production',
});

cfg.devtool = 'cheap-source-map';
cfg.output.publicPath = './';
cfg.plugins.splice(1, 0,
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    test: /\.js/,
  })
);

module.exports = cfg;
