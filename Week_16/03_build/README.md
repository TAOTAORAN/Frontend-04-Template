#### 学习笔记  
##### 工具链    
* 初始化构建 | build工具(为开发和发布)  
  - Webpack：最初是为把一个node代码打包成一个浏览器可用的代码，没有考虑html的因素，所以最终一定要打包成一个js文件然后再拿html手工引用这个js文件。
  1. 安装：webpack-cli、webpack(推荐npx，不会出现重复安装的情况)
  2. loader
  - babel：新版js编译成老版本js
  1. 配置：.babelIrc(可以自己写，可以引入@babel/preset-env)
  2. 使用：babel ./sample.js（重定向输出文件：babel ./sample.js >sample.txt）
  ```
  {
    "presets": "@babel/preset-env"
  }
  ```