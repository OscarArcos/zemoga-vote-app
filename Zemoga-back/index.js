const express = require('express');
const app = express();
const { config } = require('./config/index');
const peopleApi = require('./routes/people.js');

// body Parser
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

peopleApi(app);

app.listen(config.port, function () {
  console.log(`listening http://localhost:${config.port}`);
});
