const express = require('express');
const helmet = require('helmet');
const apiInterceptor = require('./api-interceptor')
const { commonLogger } = require('./logger');

const app = express();

const port = 8080;

app.use(helmet());
app.use(apiInterceptor);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello there!'
  });
})

app.get('/simple-get', (req, res) => {
  commonLogger.info('sample log');
  res.json({
    message: 'Hello there!'
  });
});

app.post('/simple-post', (req, res) => {
  commonLogger.info('sample log');
  res.json({
    message: 'Hello there!'
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
