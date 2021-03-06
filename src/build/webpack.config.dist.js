const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const resolve = require('./blocks/resolve')
const performance = require('./blocks/performance')

module.exports = {
  mode: 'production',
  resolve,
  performance,
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, '../../dist/js'),
    publicPath: '/',
    filename: 'app.js',
    library: 'VueBook',
    libraryTarget: 'umd',
  },
  stats: 'minimal',
  externals: {
    vue: 'vue'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: 'url-loader?limit=100000&name=[name].[ext]',
        exclude: path.resolve('./src/assets/svg'),
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../..') }),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: '#source-map',
}
