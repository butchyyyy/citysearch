const webpack = require("webpack")
const merge = require("webpack-merge")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const CommonConfig = require("./webpack.common")

const output = merge(CommonConfig, {
  mode: "production",
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
      append: false
    }),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|json)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ],
})

module.exports = output