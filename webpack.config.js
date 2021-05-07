const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/js/app.js",
    output: {
        path: path.resolve(__dirname, "src/dist"),
        filename: "bundle.js"
    },
    module: {
      rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
              }
          }
      ]
    },

    devServer: {
      contentBase: './dist'
    }
}