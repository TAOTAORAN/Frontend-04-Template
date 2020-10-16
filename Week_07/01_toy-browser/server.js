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
                body div #img {
                    width: 100px;
                    background-color: #ff5000;
                }
                body div img {
                    width: 300px;
                    background-color: #ff1111;
                }
            </style>
        </head>
        <body>
            <div>
                <img id="img" />
                <img />
            </div>
        </body>
    </html>
    `);
}).listen(8088);

console.log("Server started");