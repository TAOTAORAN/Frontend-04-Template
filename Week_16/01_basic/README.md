#### 学习笔记  
##### 工具链    
* 初始化构建 | 初始化工具Yeoman  
  - 初始化项目的创建模板配置步骤（[参考文档](https://yeoman.io/authoring/index.html)）： 
  1. npm init
  2. npm install yeoman-generator
  3. npm install --save-dev webpack babel-loader
  4. 配置generators/app/index.js
  5. npm link
  6. 执行yo tool-chain（使用yeoman运行，package.json name必须以"generator-"开头）
  - Yeoman核心：  
  1. [Interacting with the file system](https://yeoman.io/authoring/file-system.html)
  2. [MANAGING DEPENDENCIES](https://yeoman.io/authoring/dependencies.html)