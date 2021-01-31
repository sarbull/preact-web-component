const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const configs = {
  isProd: process.env.NODE_ENV === 'production',
  version: JSON.stringify(require('./package.json').version).replace(/['"]+/g, ''),
  name: JSON.stringify(require('./package.json').name).replace(/['"]+/g, '')
}


// const isProd = process.env.NODE_ENV === 'production'

const output = 'dist';

// const version = JSON.stringify(require('./package.json').version).replace(/['"]+/g, '');
// const name = JSON.stringify(require('./package.json').name).replace(/['"]+/g, '');

let plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html'
  })
]

if (configs.isProd) {
  plugins.push(new CleanWebpackPlugin([ output ], {
    exclude: [ '.keep' ]
  }))
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, output),
    filename: `${configs.name}-v${configs.version}.js`
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  plugins: plugins,
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  }
};
