import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

function resolve(src: string): string {
  return path.join(__dirname, src);
}

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: resolve('./src/main.ts'),
  output: {
    path: resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TypeScript',
      template: resolve('./index.html'),
      favicon: resolve('./favicon.ico'),
      inject: true,
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    // open: true,
    static: {
      directory: resolve('./dist'),
    },
    compress: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};

export default config;

/**
 * 为何 webppack 支持 ts 格式的配置文件呢？
 * 因为安装了 ts-node，ts-node 修改了 NodeJs 的 require 加载器
 * require ts 文件时，在内部会先将 ts 编译为 js 文件后再执行
 * webpack 内部是通过 require 加载配置文件中的配置选项对象的
 */
