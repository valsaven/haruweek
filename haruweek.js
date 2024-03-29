import http from 'http';
import path from 'path';
import { promises as fsPromises, createReadStream } from 'fs';

const port = process.env.PORT || 3000;

const requestListener = async (req, res) => {
  const today = new Date().getDay();
  const filePath = path.join(process.cwd(), `public/${today}.jpg`);

  try {
    const stat = await fsPromises.stat(filePath);
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': stat.size
    });

    const readStream = createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
};

http.createServer(requestListener).listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
