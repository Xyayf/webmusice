const path = require('path')
module.exports = {
  devServer: {
    open: true,
    proxy: {
      'netease-api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/netease-api': ''
        }
      }
    },
    port: 8888
  },
  // css: {
  //   loaderOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //       modifyVars: {
  //         'theme-color': '#254184' // 全局主色
  //       }
  //     }
  //   }
  // }
  pluginOptions: {

    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/variable.less')] // 引入全局样式变量
    }
  }
}
