const path = require('path');
const nodeExternals = require('webpack-node-externals');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: '../dist/app.js',
  output: {
    path: path.resolve(__dirname, '../webpack-dist'),
    filename: 'server.bundle.js'
  },
  externals: [nodeExternals()],
  plugins: [
    new copyPlugin([
      { from: path.resolve(__dirname, './package.prod.json'), to: path.resolve(__dirname, '../webpack-dist/package.json') },
    ]),
  ],
};