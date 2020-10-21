// http请求 | 服务端环境准备
const http = require('http');

http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('X-Foo', 'bar');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(`
    <html>
        <head>
            <style>
            #container {
                width: 500px;
                height: 300px;
                display: flex;
            }
            #container #myid {
                width: 200px;
            }
            #container .c1 {
                flex: 1;
            }
            </style>
        </head>
        <body>
            <div id="container">
                <img id="myId" />
                <div class="c1"/>
            </div>
        </body>
    </html>
    `);
}).listen(8088);

console.log("Server started");