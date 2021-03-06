var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    rally: ['babel-polyfill',
      path.resolve(__dirname, 'config/rally.js'),
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  output: {
    publicPath: "http://localhost:9999/bundle",
    path: path.join(__dirname, "/bundle"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js",
    pathinfo: true
  },
  //enable sourceMap
  // devtool: 'source-map',
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [
      path.resolve(__dirname, './node_modules/quill/dist/quill.js')
    ],
    loaders: [
      {
        test: /\.jsx$/,
        exclude: path.resolve(__dirname, './node_modules/'),
        loader: 'jsx-loader'
      }, {
        test: /\.js|jsx$/,
        exclude: path.resolve(__dirname, './node_modules/'),
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
  /**
   * prod need change to false
   */
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, 'bundle'),
      manifest: require('./bundle/vendor-manifest.json'),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './views/rally.html'),
      template: path.resolve(__dirname, './views/index.html'),
      inject: 'body',
      hash: true,
      cache: true,
      chunks: ['rally'],
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // })
  ]
};