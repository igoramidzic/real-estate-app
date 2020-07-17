const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, './dist/web_app')));

app.use('**', express.static(path.join(__dirname, './dist/web_app')))

app.listen(PORT, () => {
  console.log('Running server on port:', PORT);
});
