var webpack = require('webpack')
var config = {
   entry: ['babel-polyfill','./public/app/main.js'],
	
   output: {
      path:'./public',
      filename: 'index.min.js',
   },
   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              plugins: ['transform-decorators-legacy',"transform-class-properties"],
              presets: ['es2015', 'react',"stage-0"]
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