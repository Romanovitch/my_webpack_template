module.exports = function () {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: '/node_modules/'
  }
}