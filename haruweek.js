const express = require('express');
const app = express();

app.listen(3000, () => console.log('Listening on port 3000...'));

const today = new Date().getDay();

app.get('/', function (req, res) {
  res.sendfile(`public/${today}.jpg`);
});
