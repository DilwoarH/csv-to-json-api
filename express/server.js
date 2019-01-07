'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const csv = require('csvtojson');
const request = require('request');

const router = express.Router();
router.get('/', (req, res) => {
  console.log(req);
  console.log(req.query);
  if (!req.query.csv) return res.json({
    req: req,
    error: "Please pass in CSV url"
  });

  csv()
  .fromStream(request.get(req.query.csv))
  .then((json)=>{
    res.json(json)
  });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', router);

module.exports = app;
module.exports.handler = serverless(app);
