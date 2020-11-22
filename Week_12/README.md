#### 学习笔记  
##### 组件化    
* 组件的基本知识 | 为组件添加JSX语法  
  - 配置JSX环境步骤： 
  1. npm init
  2. npm install -g webpack webpack-cli
  3. npm install --save-dev webpack babel-loader
  4. 创建webpack.config.js。配置entry，创建main.js
  ```
    module.exports = {
        entry: "./main.js",
    }
  ```
  5. npm install --save-dev @babel/core @babel/preset-env 
  6. 配置babel-loader
  ```
  module.exports = {
    entry: "./main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
        ]
    }
  }
  ```
  7. 配置mode（影响代码压缩率）
  8. npm install --save-dev @babel/plugin-transform-react-jsx
  9. 配置plugin
  ```
  options: {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-transform-react-jsx"]
  }
  ```