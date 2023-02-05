const fs = require('fs'); //File system
fs.readFile('arquivo.txt','utf8',(erro,data)=>{
    if(erro)
{
    console.log(erro)
    return  
}
else{
    console.log(data)
}
})