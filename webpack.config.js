const path = require('path')

module.exports = {
  entry: './src/main.js',
  module: {
    rules: []
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devserver: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
  }
}
