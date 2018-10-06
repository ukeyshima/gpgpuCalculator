require('babel-core/register'); 
require('babel-polyfill'); 

const path = require('path');
const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "docs");

module.exports={
  entry: [src + "/main.jsx"],
  output: {
    path: dist,
    filename: "[name].bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    host: "0.0.0.0",
    contentBase: dist,
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(ttf|jpg|png)$/,
        loader: "url-loader"
      },
      {
        test: /\.glsl$/,
        loader: "glsl-loader"
      },
      {
        test:/\.json$/,
        loader:"json-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
};