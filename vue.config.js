module.exports = {
  outputDir: 'C:\\Users\\savel\\source\\repos\\client\\dist',
  devServer: {
    proxy: {
      '^/api': {
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api',
        },
        target: 'https://localhost:5001',
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/styles/_globals.scss";',
      },
    },
  },
  transpileDependencies: [],
}
