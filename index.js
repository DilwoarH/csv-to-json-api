const express = require('express')
const app = express()
const request=require('request')
const csv=require('csvtojson')
const port=process.env.PORT || 3000

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function (req, res) {
  if (!req.query.csv) return res.json({
    error: "Please pass in CSV url"
  });

  csv()
  .fromStream(request.get(req.query.csv))
  .then((json)=>{
    res.send(json)
  });
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`))