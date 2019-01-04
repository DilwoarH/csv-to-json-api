const express = require('express')
const app = express()
const serverless = require('serverless-http')
const request=require('request')
const csv=require('csvtojson')

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/', function (req, res) {
  if (!req.query.csv) return res.send('Please pass in CSV url');

  csv()
  .fromStream(request.get(req.query.csv))
  .then((json)=>{
    res.send(json)
  });
})

module.exports.handler = serverless(app)