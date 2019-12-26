module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            // name: `${PATHS.assets}fonts/[folder]/[name].[ext]`
            name: `./assets/fonts/[folder]/[name].[ext]`

            //
          }
        }
      ]
    }
  }
}