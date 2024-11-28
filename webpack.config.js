const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'electron-main',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_ELECTRON': JSON.stringify(true)
    })
  ]
};
