const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.m.common.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  // mode: 'production',
  mode: 'development',
  plugins: []
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
