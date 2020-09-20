#### 学习笔记  
##### JS语言通识    
* JS语言通识|泛用语言分类方法  
  - 非形式语言：中文、英文...
  - 形式语言（乔姆斯基谱系，存在包含关系:3型 ∈ 2型 ∈ 1型 ∈ 0型）  
    - 0型：无限制文法，包含所有文法  
    - 1型：上下文相关文法，生成上下文相关语言  
    - 2型：上下文无关文法，生成上下文无关语言
    - 3型：正则文法，生成正则语言  
* [JS语言通识|什么是产生式]()  
  - 产生式(Backus-Naur Form，BNF)  
  - 巴科斯诺尔范式（Backus-Naur form）  
*  JS语言通识|形式语言的分类
   - 按用途  
     - 数据描述语言
     - 编程语言 
   - 按表达方式  
     - 声明式语言
     - 命令式语言
*  JS语言通识|编程语言的性质  
   - 图灵完备性
   - 动态和静态
   - 类型系统
     -  动态类型系统/静态类型系统
     -  强类型/弱类型
     -  复合类型
     -  子类型
     -  泛型
*  JS语言通识|一般命令式编程语言的设计方式  
    五层结构：  
     -  Atom  
        - Identifier
        - Literal 
     -  Expression
        - Atom
        - Operator
        - Punctuator
     -  Statement
        - Expression
        - Keyword
        - Punctuator
     -  Structure
        - Function
        - Class
        - Process
        - Namespace
        - ...
     -  Program
        - Program
        - Module
        - Package
        - Library

##### JS类型

相关知识点：  
1. [图灵完备性](https://zh.wikipedia.org/wiki/%E5%9C%96%E9%9D%88%E5%AE%8C%E5%82%99%E6%80%A7)
2. [图灵机](https://zh.wikipedia.org/wiki/%E5%9B%BE%E7%81%B5%E6%9C%BA)
3. [静态语言和动态语言](https://www.cnblogs.com/raind/p/8551791.html)
4. 强类型/弱类型
5. [协变与逆变](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html)