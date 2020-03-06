const axios = require("axios");
const nodeHtmlToImage = require('node-html-to-image')
const {firstTemplate} = require("../templates/mainTemplates");

require('dotenv').config()

class MainService{

    getHtmlDesign(){
        return firstTemplate()
    }
    createImage(){
        return new Promise((resolve,reject)=>{
            const filename = `${Math.floor(Date.now() / 1000)}.png`;
            nodeHtmlToImage({
                output: `./pictures/${filename}`,
                html: this.getHtmlDesign()
            }).then(()=>{
                resolve(filename)
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
                return this.createImage()
            })
            .then((filename) => {
                console.log(`The file ${filename} has been created with success`)
                console.log("------------------- END Infography -------------------")
                resolve(filename);
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