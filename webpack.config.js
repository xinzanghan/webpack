// webpack  是node写出来的 需要用node的写法
let path = require("path"); // 自带 不需要安装
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  devServer: {
    //开发服务器的配置
    port: 3000, // 指定端口号
    progress: true, //打包进度条 是否显示
    contentBase: "./build", //指向文件打包目录
    compress: true, // 启动压缩
  },
  mode: "production", // 模式  默认两种  生产环境production  开发模式 development
  entry: "./src/index.js", // 入口
  output: {
    filename: "bundle.[hash:8].js", //打包后的文件名  [hash]每次修改的时候 都产生一个新的路径
    path: path.resolve(__dirname, "build"),
    // 路径必须是绝对路径  path.resolve()将相对路径 解析为绝对路径 __dirname值当前目录下 相当于@
  },
  plugins: [
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true, // 删除html文件中的双引号
        collapseWhitespace: true, //  折叠空行
      },
      hash: true, //显示哈希戳
    }),
  ],
  module: {
    // 模块
    rules: [
      // 规则  css-loader  负责解析@import这种语法的
      //style-loader  他是把css插入到head标签中
      // loader特点  希望功能单一  一个loader只负责一个功能
      // loader用法  字符串只用一个loader
      // 多个loader 需要用数组[]
      //loader的顺序 默认从右向左执行  还有一种 是从下到上执行
      // loader还可以写成对象方式  好处是可以传参
      // { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        //可以处理less文件
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: "top", //style标签 会插入到顶部  如果自己写的样式层级最高 需要配置此项
            },
          },
          "css-loader",
        ],
      },
      {
        //可以处理less文件 sass  stylus  node-sass sass-loader
        // stylus stylus-loader
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: "top", //style标签 会插入到顶部  如果自己写的样式层级最高 需要配置此项
            },
          },
          "css-loader", // 解析路径 @import
          "less-loader", // 把 less->css
        ],
      },
    ],
  },
};
