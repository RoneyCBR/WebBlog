const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html'
});

const imagesPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: 'public', to: 'dist' },
  ]
});

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '/',
              useRelativePaths: true
            },
          },
        ],
      }
    ],
  },
  plugins: [htmlPlugin,imagesPlugin],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '/': path.resolve(__dirname, 'public/'),
    },
  },
};