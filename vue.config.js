const { defineConfig } = require('@vue/cli-service')
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 关掉map映射  生产环境中很少需要  可以减少打包之后的文件大小
  productionSourceMap: false,
  // configureWebpack: {
  //   plugins: [
  //     打包分析
  //     new BundleAnalyzerPlugin()
  //   ],
  //   引入自己的cdn
  //   externals: {
  //     moment: "moment"
  //   },
  // },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
})

// import hardPlugin from 'hard-source-webpack-plugin';
// const { resolve } = require('path')
// const hardPlugin = require('hard-source-webpack-plugin');

// module.exports = {
//   transpileDependencies: true,
//   lintOnSave: false,
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:3000",
//         changeOrigin: true
//       }
//     }
//   },
//   publicPath: './',
//   configureWebpack: {
//     plugins: [
      // new hardPlugin({
      //   // 如不加此配置  缓存文件会存储到node_modules文件夹中
      //   cacheDirectory: resolve(__dirname, "cache")
      // }),
//       new BundleAnalyzerPlugin()
//     ],
//     resolve: {
//       alias: {
//         "@c": resolve(__dirname, "src/components"),
//         "@a": resolve(__dirname, "src/assets"),
//         "@u": resolve(__dirname, "src/use"),
//         "@r": resolve(__dirname, "src/router"),
//         "@v": resolve(__dirname, "src/view"),
//         "@p": resolve(__dirname, "src/plugins"),
//         "@b": resolve(__dirname, "src/blocks"),
//         "@vp": resolve(__dirname, "src/view-provider"),
//       }
//     },

//     externals: {
//       moment: "moment"
//     },
//   }
// }
