// 开发配置

const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    conterBase: '../public',
    port: 9527,
    open: 'http://localhost:9527',
    host: '0.0.0.0'
  },
  output: {
    filename: 'js/[name].[hash:5].js',
    path: path.resolve(__dirname, '../dist')
  }
})