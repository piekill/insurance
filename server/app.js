const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const router = require('./routes/router');
const config = require('./controller/config');

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(router);

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html);
});

if (config.secure) {
  const privateKey = fs.readFileSync(config.keyfile, 'utf8');
  const certificate = fs.readFileSync(config.certfile, 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(443);

  http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(80);
} else {
  app.listen(9999, () => {
    console.log('success listen...');
  });
}
