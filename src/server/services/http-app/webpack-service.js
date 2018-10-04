/* eslint-disable import/no-dynamic-require, global-require */
const envName = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
if (envName === 'production') {
  module.exports = () => ({});
} else {
  module.exports = require('./getWebpackService');
}
