const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded());
app.use(express.json());

app.post('/', function (req, res) {
  console.log(req.body)
  if(req.body.hasOwnProperty("film1") && req.body.hasOwnProperty("film2")){
    return res.status(200).json({
      status: "success",
      message: "Infography"
    }) 
  }
  return res.status(402).json({
    status: "fail",
    message: "Les données envoyées sont incorrects"
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);