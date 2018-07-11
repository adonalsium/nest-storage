var path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

var config = {
    entry: './frontend/javascripts/App.js',
    output: {
       path: path.resolve(__dirname, "build"),
       filename: 'bundle.js',
    },
    devServer: {
       inline: true,
       port: 8080
    },
    module: {
       rules: [
        {
          test: /\.css$/,
          use: ['style-loader','css-loader'],
          include: [/frontend/, /node_modules/]
        },{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react']
          }
        }
       ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./frontend/htmls/index.html",
        filename: "./index.html"
      })
    ]
 }
 module.exports = config;