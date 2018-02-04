/* eslint-disable import/no-commonjs, import/unambiguous */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const themes = ['bos', 'lbg', 'halifax'];

const defaultConfig = {
  devServer: {
    hotOnly: true,
    inline: true,
    compress: true,
    contentBase: path.join(__dirname, 'demo'),
    overlay: {
      warnings: true,
      errors: true
    },
    watchContentBase: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
        { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
        {test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=/assets/img/[name].[ext]"},
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              sourceMap: true,
              localIdentName: '[hash:base64:5]'
            }
          },
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        resourceQuery: /^\?raw$/,
        use: 'raw-loader'
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  }
};

module.exports = themes.map((theme) => Object.assign({}, defaultConfig, {
  entry: {
    [theme]: [
      // 'react-hot-loader/patch',
      './demo/index.js'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.${theme}.html`,
      template: `demo/template-${theme}.html`,
      inject: 'body'
    }),
    new webpack.NormalModuleReplacementPlugin(/\[\[theme\]\]/, (resource) => {
      resource.request = resource.request.replace('[[theme]]', theme);
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}));
