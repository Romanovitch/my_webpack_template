module.exports = function () {
  return {
    test: /\.css$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { sourceMap: true }
      }, 
      {
        loader: 'postcss-loader',
        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
      }
    ]
  }
}