var webpack = require('webpack');
var webpackCommon = require('./webpack.common');

var cfg = webpackCommon('development');

cfg.devtool = 'inline-source-map';
cfg.entry.app.splice(0, 0, 'webpack-hot-middleware/client?reload=true');
cfg.plugins.splice(1, 0,
  new webpack.HotModuleReplacementPlugin()
);

module.exports = cfg;
