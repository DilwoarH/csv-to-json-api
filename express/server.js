'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const request=require('request');
const csv=require('csvtojson');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.query.csv) return res.send('Please pass in CSV url');

  csv()
  .fromStream(request.get(req.query.csv))
  .then((json)=>{
    res.write(json)
  });
  
  res.end();
});

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
