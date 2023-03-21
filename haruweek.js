import http from 'http';
import path from 'path';
import { promises as fsPromises, createReadStream } from 'fs';

const port = process.env.PORT || 3000;

console.log(`Listening on port ${port}...`);

const setHeaders = (res, contentType, contentLength) => {
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': contentLength
  });
};

const requestListener = async (req, res) => {
  const today = new Date().getDay();
  const filePath = path.join(process.cwd(), `public/${today}.jpg`);

  try {
    const stat = await fsPromises.stat(filePath);
    setHeaders(res, 'image/jpeg', stat.size);

    const readStream = createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
};

http.createServer(requestListener).listen(port);
