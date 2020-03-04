const axios = require("axios");
const nodeHtmlToImage = require('node-html-to-image')
require('dotenv').config()

class MainService{

    createImage(){
        return new Promise((resolve,reject)=>{
            nodeHtmlToImage({
                output: './image.png',
                html: '<html><body>Generated Infography</body></html>'
            }).then(()=>{
                resolve()
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
    buildInfography(data){
        return new Promise((resolve,reject)=>{
            axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.API_KEY}`)
            .then((response)=>{
                this.createImage()
            })
            .then(() => {
                console.log('The image was created successfully!')
                console.log("------------------- END Infography -------------------")
                resolve()
            })
            .catch((err)=>{
                let error="";
                if(err.hasOwnProperty("response")){
                    console.log(err.response);
                    error = err.response;
                }else{
                    console.log(err);
                    error = err.response;
                }
                reject(error)
            })
        })
    }
}

module.exports = MainService;