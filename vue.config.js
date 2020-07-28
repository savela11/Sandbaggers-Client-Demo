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
  pwa: {
    name: 'Sandbagger',
    themeColor: '#516444',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#516444',

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [/\.map$/, /manifest\.json$/],
    },

    icons: [
      {
        src: './SandbaggerLogo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    iconPaths: {
      favicon32: './SandbaggerLogo.png',
      favicon16: './SandbaggerLogo.png',
      appleTouchIcon: './SandbaggerLogo.png',
      maskIcon: './SandbaggerLogo.png',
      msTileImage: './SandbaggerLogo.png',
    },
  },
}
