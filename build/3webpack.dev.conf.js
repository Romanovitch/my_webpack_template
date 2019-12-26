const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./3webpack.base.conf')

const devConf = {
    // DEV config
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
}

const devServer = {
  devServer: {
    // contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

const plugins = {
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
}

const devWebpackConfig = merge([
  baseWebpackConfig,
  devServer,
  devConf,
  plugins
])

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
