import * as http from 'http';
import * as p from 'path';
import * as fs from 'fs';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');  // __dirname 表示当前文件所在目录
server.on('request', (request, response) => {
  const {method, url:path, headers} = request;
  const {pathname,search} = new URL(path,'http://localhost:8888/')
  switch (pathname) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    case '/style.css':
      response.setHeader('Content-Type', 'text/css;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
  }
});

server.listen(8888);