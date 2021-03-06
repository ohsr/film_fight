const express = require('express'),
http = require('http'),
fs = require('fs');
const path = require('path');
const app = express();

require('dotenv').config()
const MainService = require('./services/MainService');
const mainService = new MainService();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded());
app.use(express.json());

app.post('/', function (req, res) {
  if(req.body.hasOwnProperty("film1") && req.body.hasOwnProperty("film2")){
    mainService.buildInfography(req.body)
    .then((filename)=>{
      res.sendFile(`./pictures/${filename}`, { root: __dirname }); // Retrieve Infography file
    }).catch((err)=>{
      console.log(err)
      return res.status(402).json({
        status: "fail",
        message: "Une erreur est survenue"
      }) 
    })
  }else{
    return res.status(402).json({
      status: "fail",
      message: "Les données envoyées sont incorrects"
    })
  }
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);