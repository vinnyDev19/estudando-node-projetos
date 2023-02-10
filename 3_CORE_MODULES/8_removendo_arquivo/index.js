const fs = require('fs');
fs.unlink('novoArquivo.txt','Kuruyama.txt',function(err){
    if (err){
        console.log(err)
        return
    }
    console.log('Arquivo removido!')
})