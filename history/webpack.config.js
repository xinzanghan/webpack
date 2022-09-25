// webpack  是node写出来的 需要用node的写法
let path = require("path"); // 自带 不需要安装
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", // 模式  默认两种  生产环境production  开发模式 development
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
};
