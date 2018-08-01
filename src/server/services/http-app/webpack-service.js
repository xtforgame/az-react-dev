/* eslint-disable global-require, import/no-extraneous-dependencies */
import path from 'path';
import appRootPath from 'app-root-path';

const appRoot = appRootPath.resolve('./');

function getWebpackService() {
  let webpack = null;
  let config = null;
  let compiler = null;
  let middlewares = [];

  try {
    webpack = require('webpack');
    const middleware = require('koa-webpack');
    const colorsSupported = require('supports-color');
    config = require(path.join(appRoot, 'webpack/webpack.dev')); // eslint-disable-line import/no-dynamic-require
    console.log('config.output.publicPath :', config.output.publicPath); // eslint-disable-line no-console
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
    console.warn('Failed to start webpack middlewares:', e);
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
