
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  configureWebpack: {
    plugins:[new CompressionWebpackPlugin({
      test: /\.js$|\.html$|\.css$/,
      // 超过4kb压缩
      threshold: 4096
    })]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        'element-ui': 'element-ui',
        'vue':'Vue'
      })
    } else {
      // 项目标题
      config.plugin('html').tap(args => {
        args[0].title = '前端有的玩'
        return args
      })
      config
          .entry('app')
          .clear()
          .add('./example/main.js')
    }
  },
  // 不需要生产环境的 source map
  productionSourceMap: false,
  publicPath: !isProd ? '/' : '',
  css: {
    // 是否将css 提取到独立的文件,生产环境提取，开发环境不提取
    extract: !!isProd,
    // 开发模式开启css sourcemap
    sourceMap: !isProd
  },
  devServer: {
    port: 12315
  }
}
