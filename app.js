const express = require('express');
const app = express();
// const https = require('https');
const http = require('http');

const url = 'http://team-1-reliability-server.mkrs.link';

app.get('/', function (req, res) {
http.get(url, function(res) {
  console.log('Status code: ', res.statusCode);
  
  if(res.statusCode !== 200) {
    var times = 3;
    for(var i=0; i < times; i++){
      console.log('Something here');
      http.get(url);
    }
  }

}).on('error', function(e) {
  console.error(e);
});
res.send('Team 1');
});

app.listen(80, function () {
  console.log('Listening on port 80!');
});