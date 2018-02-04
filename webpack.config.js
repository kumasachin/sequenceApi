/* eslint-disable import/no-commonjs, import/unambiguous */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const themes = ['bos', 'lbg', 'halifax'];

const defaultConfig = {
  devtool: 'source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ]
      },
        { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
        {test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=/assets/img/[name].[ext]"},
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 3,
                sourceMap: true,
                localIdentName: '[hash:base64:5]'
              }
            },
            'postcss-loader?sourceMap',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
        })
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  target: 'node'
};

module.exports = themes.map((theme) => Object.assign({}, defaultConfig, {
  entry: {
    [theme]: './src/index.js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.NormalModuleReplacementPlugin(/\[\[theme\]\]/, (resource) => {
      resource.request = resource.request.replace('[[theme]]', theme);
    })
  ]
})
);
