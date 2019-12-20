module.exports = function () {
  return {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    options: {
      // name: `${PATHS.assets}fonts/[folder]/[name].[ext]`
      name: `assets/fonts/[folder]/[name].[ext]`

      // создает папку [folder] в любом случае, даже fonts/
      // name: `${PATHS.assets}fonts/[folder]/[name].[ext]` // 

      // вставляет в корень dist
      // name: `[name].[ext]` 
      // [path]
    }
  }
}