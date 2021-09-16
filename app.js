import fetch from 'node-fetch';
import express from 'express';
const TARGET_SERVER = "team-1-reliability-server.mkrs.link"
var app = express();
// const body = {a: 1};


app.get('/*', async (req, res) => {
  let requestPath = req.originalUrl // => e.g. /hospitals
  console.log(`:: GET ${requestPath}`) // => :: GET ${/hospitals}

  let attemptsLeft = 3;
  let upstreamResponse; // -> response from HOSP Server

  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${requestPath}`;
		// e.g. http://ec2-url/hospitals

    console.log(`:: Attempt ${3 - attemptsLeft}: ${upstream}`)

    attemptsLeft = attemptsLeft - 1

    upstreamResponse = await fetch(upstream, {
      headers: { 
				'Authorization': req.header('Authorization')
		 }
    })
// Perform GET request against http://ec2-url/hospitals, with authentication credentials needed (as per the HOSP API documentation)

    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text()
      res.header('Content-Type', upstreamResponse.headers.get('content-type'))
         .status(upstreamResponse.status) // -> 200
         .send(text) /*
{
  "id": 1,
  "name": "Jimbo Hospital",
  "created_at": "2021-03-06T15:46:28.245Z",
  "updated_at": "2021-03-06T15:46:28.245Z",
  "url": "http://localhost:3000/hospitals/1.json"
}
					*/
      console.log(":: Successful! GET")
      return
    }
  }
  console.log(`:: Failed GET ${requestPath}`)
  res.status(upstreamResponse.status).send(await upstreamResponse.text())
})

app.post('/*', async (req, res) => {
  let requestPath = req.originalUrl // => e.g. /hospitals
  console.log(`:: POST ${requestPath}`) // => :: GET ${/hospitals}


  let attemptsLeft = 3;
  let upstreamResponse; // -> response from HOSP Server

  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${requestPath}`;
		// e.g. http://ec2-url/hospitals

    console.log(`:: Attempt ${3 - attemptsLeft}: ${upstream}`)

    attemptsLeft = attemptsLeft - 1

    upstreamResponse = await fetch(upstream, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': req.header('Content-Type'),
    
        'Authorization': req.header('Authorization')                          
    }
    });

    console.log(upstreamResponse.status)
    console.log(await upstreamResponse.text())
   
// Perform GET request against http://ec2-url/hospitals, with authentication credentials needed (as per the HOSP API documentation)

    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text()
      res.header('Content-Type', upstreamResponse.headers.get('content-type'))
         .status(upstreamResponse.status) // -> 200
         .send(text) /*
{
  "id": 1,
  "name": "Jimbo Hospital",
  "created_at": "2021-03-06T15:46:28.245Z",
  "updated_at": "2021-03-06T15:46:28.245Z",
  "url": "http://localhost:3000/hospitals/1.json"
}
					*/
      console.log(":: Successful POST!")
      return
    }
  }
  console.log(`:: Failed POST ${requestPath}`)
  res.status(upstreamResponse.status).send(await upstreamResponse.text())
})

app.listen('80', function () {
  console.log('Listening on port 80!');
});