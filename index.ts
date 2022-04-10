import * as http from 'http';
import * as p from 'path';
import * as fs from 'fs';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');  // __dirname 表示当前文件所在目录
server.on('request', (request, response) => {
  const {method, url: path, headers} = request;
  const {pathname, search} = new URL(path, 'http://localhost:8888/');

  //response.setHeader('Content-Type', 'text/html;charset=utf-8');
  //pathname: /index.html
  fs.readFile(p.resolve(publicDir, pathname.substring(1)), (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end();
    } else {
      response.end(data.toString());
    }
  });
});

server.listen(8888);