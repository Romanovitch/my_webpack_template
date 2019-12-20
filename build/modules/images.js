module.exports = function () {
  return {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          // name: `${PATHS.assets}img/[name].[ext]`,
          name: `assets/img/[name].[ext]`,

          // вставляет в корень dist
          // name: '[name].[ext]',

          // outputPath: './',
          // useRelativePath: true
        }
      } 
    ]
  }
}