const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            //ReactやモダンなJavaScriptのコードが、幅広いブラウザや環境で動作するように変換されるために指定
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    //   画像系の変換処理をしてくれるローダーもいるかな？
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({ // htmlファイルを自動生成するplugin
      template: '../dist/index.html'
    })
  ],
  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    static: {
      directory: path.resolve(__dirname, '../dist'), // 開発サーバーのコンテンツベース
    },
    // static: path.resolve(__dirname, '../dist'),
    compress: true,
    historyApiFallback: true,
    port: 8080,
    proxy: [
      {
        context: ['/insert-item'],
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    ]
  }
};