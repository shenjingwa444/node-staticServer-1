import * as http from 'http';

const server = http.createServer();

server.on('request', (request, response) => {
  console.log(request.method);
  console.log(request.url);
  console.log(request.headers);
  const array = [];
  request.on('data', (chunk) => {
    array.push(chunk);
  });
  request.on('end', () => {
    const body = Buffer.concat(array).toString();
    console.log('body');
    console.log(body);

    response.setHeader('x-jason','little funny')
    console.log(response.getHeader('x-jason'));
    response.statusCode = 404
    response.write('1')
    response.write('23')
    response.end();
  });
});

server.listen(8888);