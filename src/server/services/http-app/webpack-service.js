/* eslint-disable global-require */

function getWebpackService() {
  let webpack = null;
  let config = null;
  let compiler = null;
  let middlewares = [];

  try {
    webpack = require('webpack');
    const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
    const colorsSupported = require('supports-color');
    config = require('../../../../webpack/webpack.config');

    compiler = webpack(config);
    const webpackDevMiddleware = devMiddleware(compiler, {
      stats: {
        colors: colorsSupported,
        chunks: false,
        modules: false,
      },
      publicPath: config.output.publicPath,
    });

    const webpackHotMiddleware = hotMiddleware(compiler);
    middlewares = [webpackDevMiddleware, webpackHotMiddleware];
  } catch (e) {
    console.log('Failed to start webpack middlewares:', e);
    webpack = null;
    config = null;
    compiler = null;
    middlewares = [];
  }

  return {
    webpack,
    config,
    compiler,
    middlewares,
  };
}

export {
  getWebpackService as default,
};
