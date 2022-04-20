
// This will be used later.

const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const path = require('path');

module.exports = merge.smart(common, {
  devtool: 'inline-source-map',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],

  // Set the mode to development or production
  mode: 'development',
})