module.exports = function () {
  return {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          pretty: true
        }
      }
    ]
  }
}