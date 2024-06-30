const path = require('path')
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: "./src/index.js",
  resolveLoader: {
    modules: [
      path.resolve(__dirname, './loaders'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(m?js|jsx?|tsx?)$/,
        use: [
          {
            loader: 'a-loader',
          },
          {
            loader: 'b-loader',
          },
        ],
        exclude: /node_modules/,
      }
    ]
  }
}