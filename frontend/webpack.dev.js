const webpack = require("webpack")
const merge = require("webpack-merge")
const CommonConfig = require("./webpack.common")

const path = require("path")

const output = merge.strategy({
                                entry: "replace",
                              })
(CommonConfig, {
  entry: [
    "babel-polyfill",
    "react-hot-loader/patch",
    "index.tsx",
  ],
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "dist"),
    proxy: [
      {
        context: ["/cities/**", "/config/**"],
        target: "http://localhost:8090/",
        secure: false,
        changeOrigin: true,
      },
    ],
  },
  mode: "development",
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})

module.exports = output