const express = require('express');
const auth = require('http-auth');
const basic = auth.basic({
  realm: 'Simon Area.',
  file: __dirname + '/.htpasswd'
});
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(auth.connect(basic));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);