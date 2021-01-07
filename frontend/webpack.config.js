const webpack = require('webpack')

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  externals: {
    'crypto': 'crypto'
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/,
  }
};
