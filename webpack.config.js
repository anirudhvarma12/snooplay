var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
//For GitHub pages
var GH_DIR = path.resolve(__dirname, 'docs');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: BUILD_DIR + "/bundle.js", to: GH_DIR + "/build" },
      { from: APP_DIR + "/*.html", to: GH_DIR },
      { from: APP_DIR + "/*.css", to: GH_DIR },
      { from: APP_DIR + "/icons", to: GH_DIR + "/src/icons/" }
    ])
  ]
};

module.exports = config;