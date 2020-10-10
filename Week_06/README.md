#### 学习笔记  
##### 浏览器工作原理    
* 状态机 | 有限状态机  
  - 每个状态都是一个机器 
    - 每个机器里可以做计算、存储、输出
    - 所有机器接收得输入是一致的
    - 状态机里的每一个机器没有状态，如果用函数表示的话，它应该是纯函数（无副作用）
  - 每个机器都知道下一个状态 
    - 每个机器都有确定的下一个状态（Moore型）
    - 每个机器根据输入决定下一个状态（Mealy型）
* 浏览器工作原理 | 基础知识  
  - TCP（计算机软件所使用）与IP  
    - 流
    - 端口：决定网卡中哪一个数据被哪一个软件使用
    - 对应到node中所依赖的库：require('net')
    - 包
    - IP地址
    - 对应到node底层中所调用C++的库：libnet（负责构造IP包并发送）/libpcap（负责从网卡抓取所有流经你网卡的IP包）
  - http（request和response一一对应） 
    - Request  
      - Request line：method(POST/GET...)，Path(默认为'/')，HTTP，HTTP version. 如：POST/HTTP/1.1
      - Headers：多行，行数不固定，每行是键值对的形式，以空行为结束标志。
      - body：由Content-type规定格式
      - 换行符：\r\n
    - Response
      - status line：由HTTP版本号，HTTP状态码，HTTP状态文本组成。 如HTTP/1.1 200 OK
      - Headers：多行，行数不固定，每行是键值对的形式，以空行为结束标志
      - body：由Content-type规定格式，node默认返回chunked body
