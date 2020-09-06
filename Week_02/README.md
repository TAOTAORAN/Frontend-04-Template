####学习笔记  
#####寻路
* [寻路|实现地图编辑器](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/01_map/index1.html)
 - 实现：绘制100 * 100 的地图，地图上左键绘制障碍，右键清除障碍，有保存功能。
* [寻路|广度优先搜索](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/01_map/index2.html)
 - 实现：给出指定起点到终点可以走的路径集合。
 - 思路：
        1.本质上是解决从起点到终点可以怎么走的问题。
        2.缩小问题范围，先思考，第一步能怎么走，第二步、第三步...
        3.可以看作不断把能走到的点的集合补充的过程。
* [寻路|通过异步编程可视化寻路算法](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/01_map/index3.html)
 - 实现：通过异步编程，结合可视化的方式，调试代码，降低代码理解成本。
 - 核心代码：    
        function sleep (t) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, t);
            })
        }
* [寻路|处理路径问题](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/01_map/index4.htm)  
  - 实现：给出指定起点到终点的路径。
* [寻路|启发式搜索 改造数据结构](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/01_map/index5.html)  
  - 实现：设计Sorted数据结构
* [寻路|启发式搜索 优化寻路](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/01_map/index6.html)  
  - 实现：通过Sorted优化寻路

#####使用LL算法构建AST
* [使用LL算法构建AST | 正则表达式](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/02_LL/index1.html)
* [使用LL算法构建AST | LL词法分析](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/02_LL/index2.html)
* [使用LL算法构建AST | LL语法分析MultiplicativeExpression](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/02_LL/index3.html)
* [使用LL算法构建AST | LL语法分析AdditiveExpression & Expression](https://github.com/TAOTAORAN/Frontend-04-Template/blob/master/Week_02/02_LL/index4.html)

相关知识点: [RegExp.prototype.exec()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)