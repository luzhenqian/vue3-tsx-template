const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  entry: path.resolve(__dirname, './main.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[hash].js'
  },
  externals: {
    Vue: 'vue'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory(
              {
                "libraryName": "vant",
                "libraryDirectory": "es",
                "style": true
              }
            )],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        },
      },
      {
        test: /\.tsx$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue']
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.ejs'),
      inject: 'body'
    })
  ]
}
