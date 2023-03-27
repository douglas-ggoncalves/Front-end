var fs = require("fs");


class Teste {
    Read(){
        fs.readFile("./douglas.txt", {encoding: 'utf-8'}, (err, data) => {
            if(err){
                console.log("Ocorreu uma falha durante a leitura do arquivo.");
            } else{
                console.log(data)
            }
        })
    }
}


module.exports = new Teste();