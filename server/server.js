'use strict';

const fs = require('fs');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    req.url = '/index.html';
  }
  return fs.readFile(`public${req.url}`, (err, data) => {

    if (err) {
      // print error and response with a not found code
      console.log(err);
      res.statusCode = 404;
      res.end();
    } else {
      let dotoffset = req.url.lastIndexOf('.');
      let mimetype = dotoffset == -1 ? 'text/plain' : {
        '.html' : 'text/html',
        '.ico' : 'image/x-icon',
        '.jpg' : 'image/jpeg',
        '.png' : 'image/png',
        '.gif' : 'image/gif',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
        '.map': 'application/json'
      }[req.url.substr(dotoffset)];
      res.writeHead(200, {'Content-Type': mimetype});
      res.write(data);
      res.end();
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
