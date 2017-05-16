var webpack = require('webpack');
var path = require('path');

var config = {
  context: path.join(__dirname + '/public'),
  entry: [
    'babel-polyfill', 
    './app/main.js'
  ],
  output: {
    path: './public',
    filename: 'index.min.js',
  },
  module: {
    loaders: [{
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            'transform-decorators-legacy', 'transform-class-properties'
          ],
          presets: ['es2015', 'react', 'stage-0']
        }
      }, {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy', 'transform-class-properties'],
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false,
    //     },
    //     output: {
    //         comments: false,
    //     },
    // }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.DefinePlugin({
    //     'process.env': {
    //         'NODE_ENV': JSON.stringify('production')
    //     }
    // })
  ]
}

module.exports = config;