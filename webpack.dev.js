const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');

module.exports = () => webpackMerge(commonConf(), {
  mode: "development",
  devtool: 'source-map',
});
