const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = merge(common, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ]
  }
});
