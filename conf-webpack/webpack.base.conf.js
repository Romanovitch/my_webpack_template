const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge')

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

const baseConf = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
    // module: `${PATHS.src}/your-module.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    // filename: `${PATHS.assets}js/[name].[hash].js`, // +hash к имени файла
    path: PATHS.dist,
    publicPath: '/'
  },
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
}

const js = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: '/node_modules/'
}

const fonts = {
  test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file-loader',
  options: {
    name: `${PATHS.assets}fonts/[folder]/[name].[ext]`

    // создает папку [folder] в любом случае, даже fonts/
    // name: `${PATHS.assets}fonts/[folder]/[name].[ext]` // 

    // вставляет в корень dist
    // name: `[name].[ext]` 
    // [path]
  }
}

const images = {
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

const scss = {
  test: /\.scss$/,
  use: [
    'style-loader',
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { sourceMap: true }
    }, 
    {
      loader: 'postcss-loader',
      options: { sourceMap: true, config: { path: `./postcss.config.js` } }
    }, 
    {
      loader: 'sass-loader',
      options: { sourceMap: true }
    }
  ]
}

const css = {
  test: /\.css$/,
  use: [
    'style-loader',
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { sourceMap: true }
    }, 
    {
      loader: 'postcss-loader',
      options: { sourceMap: true, config: { path: `./postcss.config.js` } }
    }
  ]
}

const html = {
  test: /\.html$/,
  use: [
    {
      loader: 'html-loader',
      options: {
        pretty: true
      }
    }
  ]
}

// module.exports =  function () {
//   return merge([
//     baseConf,
//     js,
//     fonts,
//     images,
//     scss,
//     css,
//     html
//   ])
// }

// module.exports =  merge([
//     baseConf,
//     js,
//     fonts,
//     images,
//     scss,
//     css,
//     html
//   ])




module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
    // module: `${PATHS.src}/your-module.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    // filename: `${PATHS.assets}js/[name].[hash].js`, // +hash к имени файла
    path: PATHS.dist,
    publicPath: '/'
  },
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
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, 
    // {
    //   test: /\.vue$/,
    //   loader: 'vue-loader',
    //   options: {
    //     loader: {
    //       scss: 'vue-style-loader!css-loader!sass-loader'
    //     }
    //   }
    // }, 
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: `${PATHS.assets}fonts/[folder]/[name].[ext]`

        // создает папку [folder] в любом случае, даже fonts/
        // name: `${PATHS.assets}fonts/[folder]/[name].[ext]` // 

        // вставляет в корень dist
        // name: `[name].[ext]` 
        // [path]
      }
    }, 
    {
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
    }, 
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, 
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, 
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, 
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, 
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }, 
    // в html-файле позволяет писать пути 
      // к картинкам обычным способом 
      // без <img src=<%= require("./*.*.jpg") %> >
    { 
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            pretty: true
          }
        }
      ]
    }
  ]
  },
  resolve: {
    alias: {
      '~': PATHS.src,
      // 'vue$': 'vue/dist/vue.js',
    }
  },
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
  ],
}
