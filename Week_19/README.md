#### 学习笔记  
##### 工具链    
* 持续集成 | 发布前检查  
  - 持续集成一般包含两个概念：
  1. daily build
  2. build verification test(其实是一种冒烟测试)
  - 前端持续集成：
    - git hooks：在.git文件中，可以看到hooks文件。.sample不会被实际执行，它是一个Linux的可执行文件。当去掉.sample后缀它就变成了一个pre commit的hook。
    1. 客户端相关的hooks：pre-commit.sample、pre-push.sample
    2. 服务端相关的hooks：pre-receive.sample、
    - ESLint
    - PhantomJs(无头浏览器，过于老旧，目前推荐chrome的headless模式)