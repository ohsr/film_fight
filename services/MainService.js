const axios = require("axios");
const nodeHtmlToImage = require('node-html-to-image')
const {mainTemplate} = require("./../templates/mainTemplate");

require('dotenv').config()

class MainService{

    getHtmlDesign(){
        return mainTemplate()
    }
    createImage(){
        return new Promise((resolve,reject)=>{
            nodeHtmlToImage({
                //output: `./picture/${Math.floor(Date.now() / 1000)}.png`,
                output: `./pictures/file.png`,
                html: this.getHtmlDesign()
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
                const error = (err.hasOwnProperty("response") ? err.response : err);
                console.log(error);
                reject(error)
            })
        })
    }
}

module.exports = MainService;