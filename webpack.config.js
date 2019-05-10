const path = require('path');
const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//把文件里的 CSS 提取到单独的文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//第三方库也做了环境区分的优化,为了优化大小和性能
const DefinePlugin = require('webpack/lib/DefinePlugin');
const url = require('url');
const publicPath = '';//发布的index.html文件的引用地址

module.exports = (options = {}) => ({//运行webpack时候设置 --env.dev --env.bao=foo则{dev:true,bao:"foo"}
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    //path:通过HtmlWebpackPlugin插件生成的html文件存放在这个目录下面
    path: resolve(__dirname, 'dist'),
    //filename:编译生成的js文件存放到根目录下面的js目录下面,如果js目录不存在则自动创建
    filename: options.dev ? '[name].js' : 'js/[name].js?[chunkhash]',
    /*
     * chunkFilename用来打包require.ensure方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件
     * 比如在main.js文件中,require.ensure([],function(require){alert(11);}),这样不会打包块文件
     * 只有这样才会打包生成块文件require.ensure([],function(require){alert(11);require('./greeter')})
     * 或者这样require.ensure(['./greeter'],function(require){alert(11);})
     * chunk的hash值只有在require.ensure中引入的模块发生变化,hash值才会改变
     * 注意:对于不是在ensure方法中引入的模块,此属性不会生效,只能用CommonsChunkPlugin插件来提取
     * */
    chunkFilename: options.dev ? '[id].js': 'js/[id].js?[chunkhash]',
    //用于处理静态资源的引用地址问题
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [
      {
      test: /\.vue$/,
      use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|less|scss)$/,
        use:ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[{ loader:'css-loader',options:{minimize:true}}, 'postcss-loader']
        }),
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,//小于10kb左右
            name:options.dev ? '[name].[ext]' : '/fonts/[name]_[contenthash].[ext]'//路径问题
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,//压缩图片和雪碧图
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,//小于10kb左右
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: options.dev ? '[name].css': 'css/[name].css?[contenthash]'//[name]_[contenthash:8].css
    }),
  /**
   * name和names的区别，vendor是抽取出代码中的公共代码，webpack的运行文件会被从vendor中再次抽出，生成一个manifest.js文件
   * name的写法：
   * new CommonsChunkPlugin({ name: 'vendor' }),
   * new CommonsChunkPlugin({ name: 'manifest', chunks: ['vendor'] }),
   */
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      favicon:'src/assets/favicon.ico'//开发模式下，用localhost不显示ico，用127.0.0.1可以
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      'process.env': {
        NODE_ENV: options.dev ? JSON.stringify('development'): JSON.stringify('production')
      }
    }),
  ],
  resolve: {
    modules: [resolve(__dirname, 'node_modules')],
    alias: {
      '~': resolve(__dirname, 'src')
    },
    //在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    extensions: ['.js', '.vue', '.json', '.css'],
    //当 target 为 web 或者 webworker 时，值是 ["browser", "module", "main"];当 target 为其它情况时，值是 ["module", "main"]
    mainFields: ['browser', "module",'main'],
  },
  devServer: {
    host: '127.0.0.1',
    port: options.dev ? 8888 : 8889,
    https: false,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        //secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: false,//解决跨域 true
        pathRewrite: {// /api/xxx 现在会被代理到请求 http://127.0.0.1:8080/xxx
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    },
    compress: true,// 是否开启 gzip 压缩,200时候response会显示Content-Encoding: gzip,304时候不会显示
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
});
