const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const paths = require('./paths');
const webpack = require('webpack');

const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  devtool: 'inline-source-map',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000']
    })
  ],

  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    filename: 'server.js',
    path: paths.build,
    publicPath: '/',
  },
  
  // Customize the webpack build process
  plugins: [
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
    }),
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
  ],
  mode: 'development',

  resolve: {
    alias: {
      '@': paths.src,
    },
  },
}