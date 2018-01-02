/* eslint-disable global-require */

function getWebpackService() {
  let webpack = null;
  let config = null;
  let compiler = null;
  let middlewares = [];

  try {
    webpack = require('webpack');
    const middleware = require('koa-webpack');
    const colorsSupported = require('supports-color');
    config = require('../../../../webpack/webpack.config');
    console.log('config.output.publicPath :', config.output.publicPath);
    compiler = webpack(config);
    const webpackMiddleware = middleware({
      compiler,
      dev: {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false,
        },
        publicPath: config.output.publicPath,
      },
    });

    middlewares = [webpackMiddleware];
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
