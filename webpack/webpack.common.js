var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var gulpConfig = require('../.azdata/gulp-config');

var baseFolderName = 'assets';
var projRoot  = path.resolve(__dirname, '..');

var commonConfig = gulpConfig.getSubmodule('commonLibrary');
var commonConfigJsEntryFolder = commonConfig.joinPathByKeys(['entry', 'js']);

var frontEndConfig = gulpConfig.getSubmodule('frontEnd');
var frontEndJsEntryFolder = frontEndConfig.joinPathByKeys(['entry', 'js']);
var frontEndJsEntryFilename = frontEndConfig.joinPathByKeys(['entry', 'js', 'filename']);
var frontEndJsPublicFolder = frontEndConfig.joinPathByKeys(['entry', 'static']);
var frontEndJsOutputFolder = frontEndConfig.joinPathByKeys(['output', 'default']);

module.exports = function({ mode }) {
  return {
    mode,
    devtool: 'inline-source-map',
    entry: {
      app: [
        path.resolve(projRoot, frontEndJsEntryFilename),
      ],
    },
    output: {
      // path: path.resolve(projRoot, frontEndJsPublicFolder),
      path: path.resolve(projRoot, frontEndJsOutputFolder),
      pathinfo: mode === 'development',
      filename: baseFolderName + '/js/[name].js',
      publicPath: '/',
    },
    resolve: {
      // extensions: ['', '.jsx', '.js', '.scss', '.css', '.json', '.md'],
      alias: {},
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [
            path.resolve(projRoot, frontEndJsEntryFolder),
            path.resolve(projRoot, commonConfigJsEntryFolder),
          ],
          use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['defaults', 'not dead'],
                  },
                }],
                '@babel/typescript',
                '@babel/preset-react',
              ],
              plugins: [
                ['@babel/proposal-decorators', { decoratorsBeforeExport: true }],
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
              ],
            },
          }],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(jpg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: baseFolderName + '/images/[name].[ext]',
            },
          }],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              // name: baseFolderName + '/fonts/[name].[ext]',
              name: baseFolderName + '/fonts/[hash].[ext]',
            },
          }],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify(mode)}}),
      new CopyWebpackPlugin([
        {
          from: path.resolve(projRoot, frontEndJsPublicFolder),
          to: path.resolve(projRoot, frontEndJsOutputFolder),
        },
      ]),
      new HtmlWebpackPlugin({
        chunks: ['app'],
        template: path.resolve(projRoot, frontEndJsEntryFolder, 'index.html'),
        filename: 'index.html',
      }),
    ],
  };
};
