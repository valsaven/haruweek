const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port 3000...'));

const today = new Date().getDay();

app.get('/', function (req, res) {
  res.sendfile(`public/${today}.jpg`);
});
