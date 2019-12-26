module.exports = function (PATHS) {
  return {
    devServer: {
      
    contentBase: PATHS.dist,
      // contentBase: baseWebpackConfig.externals.paths.dist,
      port: 8081,
      overlay: {
        warnings: true,
        errors: true
      }
    }
  //   devServer: {
  //     stats: 'errors-only',
  //     port: 9000
  // }
  }
}