const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const router = require('./routes/router');

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

app.listen(9999, () => {
  console.log('success listen...');
});
