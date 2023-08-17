const express = require('express')
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const clint = redis.createClient(REDIS_PORT);

const app = express();

// Set response
function setResponse(id, dataTitle) {
    return `<h2>Id ${id} for the title of "${dataTitle}" showed here</h2>`;
  }

async function getRepos(req, res, next) {
    try{
        console.log('Fetching data....')

        const { id } = req.params;

        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {Method: 'GET'})
        const data = await response.json();

        const dataTitle = data.title;
        // console.log("Title from all data are:-->>", dataTitle)

        // Set data to Redis
        // await client.connect()
        clint.setEx(id, "ex", 3600, dataTitle)

        res.send(setResponse(id, dataTitle));

    } catch (err){
        console.error(err);
        res.status(500)

    }
}

// Cache middleware
 function cache(req, res, next) {
    const { id } = req.params;
  
    //  client.connect()
    clint.get(id, (err, data) => {
        console.log("Data from cash:", data)
      if (err) throw err;
  
      if (data !== null) {
        res.send(setResponse(id, data));
      } else {
        next();
      }
    });
  }

app.get('/fakedata/:id', cache, getRepos)

app.listen(5000, ()=> {
    console.log(`App listening on the port ${PORT}`)
});