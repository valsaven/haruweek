const http = require('http');
const fileSystem = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

console.log(`Listening on port ${port}...`);

const requestListener = function (req, res) {
  const today = new Date().getDay();

  const filePath = path.join(__dirname, `public/${today}.jpg`);
  const stat = fileSystem.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Content-Length': stat.size
  });

  const readStream = fileSystem.createReadStream(filePath);
  readStream.pipe(res);
}

http.createServer(requestListener).listen(port);
