import * as http from 'http';
import * as p from 'path';
import * as fs from 'fs';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');  // __dirname 表示当前文件所在目录
let cacheTime = 3600 * 24 * 365
server.on('request', (request, response) => {
  const {method, url: path, headers} = request;
  const {pathname, search} = new URL(path, 'http://localhost:8888/');

  if(method !== 'GET'){
    response.statusCode = 405
    response.end('Only the GET requests are supported')
    return
  }

  let filename = pathname.substring(1);
  if (filename === '') {
    filename = 'index.html';
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      console.log(error);
      if (error.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data);
        });
      } else if (error.errno === -4068) {
        response.statusCode = 403;
        response.end('Do not authorized to view file contents');
      } else {
        response.statusCode = 500;
        response.end('服务器繁忙，请稍后再试');
      }
    } else {
      response.setHeader('Cache-Control', `public,max-age=${cacheTime}`)
      response.end(data);
    }
  });
});

server.listen(8888);