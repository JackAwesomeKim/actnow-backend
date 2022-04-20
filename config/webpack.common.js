const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./paths');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
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

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
}
