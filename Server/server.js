const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

const port = 3000
const bodyParser = require('body-parser');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api', (req, res) => {
  console.log(req.body)
  res.status(200).json({ result: req.body.text });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})