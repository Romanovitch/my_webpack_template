const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge')

const PATHS = require('./modules/myPATHS') 
const jsMod = require('./modules/js') 
const fontsMod = require('./modules/fonts') 
const imagesMod = require('./modules/images') 
const scssMod = require('./modules/scss') 
const cssMod = require('./modules/css') 
const htmlMod = require('./modules/html') 

// console.log('++', PATHS)

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const


// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = PATHS.src
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

// const ANY_PAGES_DIR = PATHS.anyPages
// const anyPAGES = fs.readdirSync(ANY_PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

module.exports = merge([
  {
    externals: {
      paths: PATHS
    }
  },
  {
    entry: {
      // app: PATHS.src,
      index: './src/index',
      // about: './src/third',
      // module: `${PATHS.src}/third.js`,
    }
  },
  {
    output: {
      path: PATHS.dist,
      filename: `${PATHS.assets}js/[name].js`,
      // filename: `${PATHS.assets}js/[name].[hash].js`, // +hash к имени файла
      library: `${PATHS.assets}js/[name]`,
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

      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
  
      // Automatic creation any html pages (Don't forget to RERUN dev server)
      // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
      // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
      ...PAGES.map(page => new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page}`
      })),

      // ...anyPAGES.map(page => new HtmlWebpackPlugin({
      //   template: `${PAGES_DIR}/${page}`,
      //   filename: `./${page}`
      // })),

      new CleanWebpackPlugin(),
      // new CleanWebpackPlugin(['../dist']), //! чегото не работает
      
    ]
  }
])

