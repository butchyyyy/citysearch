const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWerbpackPlugin = require("copy-webpack-plugin")
const path = require("path")

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./static/index.html",
  filename: "index.html",
  inject: "body",
})

const CopyWebpackPluginConfig = new CopyWerbpackPlugin([
  {context: "static/images/", from: "**/*", to: "static/images"}
])

module.exports = {
  entry: [
    "babel-polyfill",
    "index.tsx",
  ],
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {test: /\.(ts|tsx)$/, use: ["babel-loader", "ts-loader"], exclude: "/node_modules/"},
      {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
      {test: /\.css$/, use: ["style-loader", "css-loader"]},
      {test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/, loader: "url-loader?limit=100000"}
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".less"],
    modules: ["src", "node_modules"],
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    }),
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig,
  ],
}