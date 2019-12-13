  
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
var cors = require('cors');
const db = require('./queries')


app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  
app.get('/posts', db.getPosts)

app.post('/submit', db.checkCredentials)

app.post('/post', db.newPost)

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

