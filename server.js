const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded());
app.use(express.json());

const nodeHtmlToImage = require('node-html-to-image')


app.post('/', function (req, res) {
  if(req.body.hasOwnProperty("film1") && req.body.hasOwnProperty("film2")){
    nodeHtmlToImage({
      output: './image.png',
      html: '<html><body>Hello world2!</body></html>'
    })
    .then(() => {
      console.log('The image was created successfully!')
      return res.status(200).json({
        status: "success",
        message: "Infography"
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