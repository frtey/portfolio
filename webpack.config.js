let mode = "development";
const webpack = require("webpack");

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode,

  target: 'node',

  // resolve: {
  //   fallback: {
  //     "fs": false,
  //     "tls": false,
  //     "net": false,
  //     "path": false,
  //     "zlib": false,
  //     "http": false,
  //     "https": false,
  //     "stream": false,
  //     "crypto": false,
  //     "buffer": false
  //   } 
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};