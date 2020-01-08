const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.m.common.conf')

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

const devPlugins = {
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
  devPlugins
])

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
