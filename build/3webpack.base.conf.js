const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge')

const jsMod = require('./modules/js') 
const fontsMod = require('./modules/fonts') 
const imagesMod = require('./modules/images') 
const scssMod = require('./modules/scss') 
const cssMod = require('./modules/css') 
const htmlMod = require('./modules/html') 

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = PATHS.src
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

module.exports = merge([
  {
    externals: {
      paths: PATHS
    }
  },
  {
    entry: {
      app: PATHS.src,
      // module: `${PATHS.src}/your-module.js`,
    }
  },
  {
    output: {
      filename: `${PATHS.assets}js/[name].js`,
      // filename: `${PATHS.assets}js/[name].[hash].js`, // +hash к имени файла
      path: PATHS.dist,
      publicPath: '/'
    }
  },
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  },
  jsMod(),
  fontsMod(),
  imagesMod(),
  scssMod(),
  cssMod(),
  htmlMod(),
  // {
  //   module: {
  //     rules: [{

  //     }]
  //   }
  // },
  {
    resolve: {
      alias: {
        '~': PATHS.src,
        // 'vue$': 'vue/dist/vue.js',
      }
    }
  },
  {
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      // new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: `${PATHS.assets}css/[name].css`,
        // filename: `${PATHS.assets}css/[name].[hash].css`,
      }),
      new CopyWebpackPlugin([
        // { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        // { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
        { from: `${PATHS.src}/static`, to: '' },
      ]),
  
      // Automatic creation any html pages (Don't forget to RERUN dev server)
      // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
      // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
      ...PAGES.map(page => new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page}`
      })),
      new CleanWebpackPlugin(),
      // new CleanWebpackPlugin(['../dist']), //! чегото не работает
    ]
  }
])
