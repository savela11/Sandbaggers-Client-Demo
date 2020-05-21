const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, './dist'),

  devServer: {
    proxy: {
      '^/api': {
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' },
        target: 'https://localhost:5001',
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/styles/_globals.scss";',
      },
    },
  },
}
