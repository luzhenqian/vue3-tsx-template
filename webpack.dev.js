const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist')
    },
    compress: true,
    port: 9000,
    historyApiFallback: {
      rewrites: [
        {
          from: /\.(js|css)/,
          to: function(context) {
            const pathname = context.parsedUrl.pathname
            const pathTmp = pathname.split('/')
            const len = pathTmp.length
            return `/${pathTmp[len - 2]}/${pathTmp[len - 1]}`
          }
        }
      ]
    },
    hot: true,
  }
})
