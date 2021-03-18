module.exports = {
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:5000/api/',
    //             ws: true,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }

    //         }
    //     }
    // }

    configureWebpack: {
        resolve: {
          alias: {
            // 别名
            //vue$: "vue/dist/vue.esm.js", //加上这一句
          }
        }
      },
}