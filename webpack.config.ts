import * as path from 'path'
import * as webpack from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: path.join(__dirname, './src/main.ts'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TypeScript',
      template: path.join(__dirname, './index.html'),
      favicon: path.join(__dirname, './favicon.ico'),
      inject: true
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    // open: true,
    static: {
      directory: path.join(__dirname, './dist')
    },
    compress: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}

export default config
