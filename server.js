var http = require('http');
var url = require('url');
var bmi = require('./bmi');

function writeHeaders(res) {
  res.writeHead(200,{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST'
  });
}

http.createServer(function (req, res) {
  console.log('======================================');
  console.log(req.method + " " + req.url);
  console.log(req.headers);
  if(req.method=='POST') {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
      console.log('--------------------------------------');
      console.log(body);

      var value = null;
      var params = JSON.parse(body);
      var hw = bmi.getHeightAndWeight(params);
      var height = hw[0];
      var weight = hw[1];

      console.log("Height: " + height + "; Weight: " + weight);

      if(height && weight) {
        value = (703 * weight) / (height * height);
      }
      card = bmi.getCard(value);

      writeHeaders(res);
      res.end(JSON.stringify(card));
    });
  } else {
    // GET
    var queryData = url.parse(req.url, true).query;
    var value = null;
    var height = queryData.height;
    var weight = queryData.weight;

    console.log("Height: " + height + "; Weight: " + weight);

    if(height && weight) {
      value = (703 * weight) / (height * height);
    }
    card = bmi.getCard(value);

    writeHeaders(res);
    res.end(JSON.stringify(card));
  }
}).listen(3001);
console.log('Server running at http://localhost:3001');
