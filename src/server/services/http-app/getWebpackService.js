/* eslint-disable global-require, import/no-extraneous-dependencies */
import path from 'path';
import appRootPath from 'app-root-path';
import webpack from 'webpack';

const appRoot = appRootPath.resolve('./');

export default () => {
  let config = null;
  let compiler = null;
  let middlewarePromise = Promise.resolve();
  let compileDonePromise = Promise.resolve();

  try {
    const koaWebpack = require('koa-webpack');
    const colorsSupported = require('supports-color');
    config = require(path.join(appRoot, 'webpack/webpack.dev')); // eslint-disable-line import/no-dynamic-require
    // console.log('config.output.publicPath :', config.output.publicPath); // eslint-disable-line no-console
    compiler = webpack(config);
    middlewarePromise = koaWebpack({
      compiler,
      devMiddleware: {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false,
        },
        publicPath: config.output.publicPath,
      },
      hotClient: {
        port: 18080,
      },
    });
    compileDonePromise = new Promise((resolve) => {
      let resolveOnce = (stats) => {
        resolve(stats);
        resolveOnce = () => {};
      };
      compiler.plugin('done', resolveOnce);
    });
  } catch (e) {
    console.warn('Failed to start webpack promise:', e);
    webpack = null;
    config = null;
    compiler = null;
    middlewarePromise = Promise.resolve();
    compileDonePromise = Promise.resolve();
  }

  return {
    webpack,
    config,
    compiler,
    middlewarePromise,
    compileDonePromise,
  };
}
