"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

const mode = process.env.NODE_ENV || "development";
const development = mode === "development";

const config = {
  mode,
  entry: "./src/client.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      publicPath: "/assets/",
      template: "./templates/index.html",
    }),
    new ReactServerWebpackPlugin({ isServer: false }),
  ],
  output: {
    chunkFilename: development
      ? "[id].chunk.js"
      : "[id].[contenthash].chunk.js",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  optimization: {
    runtimeChunk: "single",
    //    runtimeChunk: "single",
    //    splitChunks: {
    //      cacheGroups: {
    //        react: {
    //          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //          name: "react",
    //          chunks: "all",
    //        },
    //      },
    //    },
  },
  devtool: development ? "cheap-module-source-map" : "source-map",
};

module.exports = config;
