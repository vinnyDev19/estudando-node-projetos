const fs = require('fs');
fs.rename('teste.txt','novoArquivo.txt', function(err){
    console.log(err);
})
console.log('Arquivo renomeado com sucesso!')