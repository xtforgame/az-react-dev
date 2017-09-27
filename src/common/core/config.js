let envName = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
let config = require(`../configs/${envName}`);
module.exports = config;
