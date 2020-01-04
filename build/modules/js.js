module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'eslint-loader',
              options: {
                enforce: 'pre',
              }
            },
            {
              loader: 'babel-loader',
              options: {
                exclude: '/node_modules/'
              }
            }
          ]
        }









        // {
        //   enforce: 'pre',
        //   test: /\.js$/,
        //   loader: 'eslint-loader'
        // },
        // {
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   exclude: '/node_modules/'
        // }
      ]
    }
  }
}