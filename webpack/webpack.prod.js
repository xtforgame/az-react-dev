var webpack = require('webpack');
var webpackCommon = require('./webpack.common');

var cfg = webpackCommon('production');

cfg.devtool = 'cheap-source-map';
cfg.plugins.splice(1, 0,
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.optimize.AggressiveMergingPlugin()
);

module.exports = cfg;
