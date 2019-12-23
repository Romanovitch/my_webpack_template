const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devServerMod = require('./build/modules/devserver')
const scssMod = require('./build/modules/scss') 

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: './assets/'
}

const PAGES_DIR = PATHS.src
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

const devServer = {
  devServer: {
    contentBase: PATHS.dist,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

const js = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
}

const fonts = {
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: `${PATHS.assets}fonts/[folder]/[name].[ext]`
        }
      }
    ]
  }
}

const images = {
  module: {
    rules: [
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
      }
    ]
  }
}

const scss = {
  module: {
    rules: [
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
      }
    ]
  }
}

const css = {
  module: {
    rules: [
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
      }
    ]
  }
}

const html = {
  module: {
    rules: [
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
  }
}

const common = merge([
  {
    entry: {
      app: PATHS.src,
    },
    output: {
      filename: `${PATHS.assets}js/[name].js`,
      path: PATHS.dist,
      publicPath: '/'
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   template: './src/index.html'
      // }),
      ...PAGES.map(page => new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page}`
      }))
    ]
  },
  // js,
  // fonts,
  // images,
  // scss,
  // css,
  // html
])

module.exports = function(env) {
  if (env === 'production'){
    return merge([
      common,
      js,
      fonts,
      images,
      // scss,
      scssMod(),
      css,
      html
    ])
  };
  if (env === 'development') {
    return merge([
      common,
      js,
      fonts,
      images,
      // scss,
      scssMod(),
      css,
      html,
      devServerMod(),
      // devServer
    ])
  }
}