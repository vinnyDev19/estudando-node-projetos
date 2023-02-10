const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const pastaBase = path.join(__dirname, 'templates')
const checkAuth = function(req, res, next) {
    req.authStatus = false;
    if(req.authStatus){
        console.log("Usuário Logado!")
        next();
    }
    else{
        console.log('Usuário não está logado. Faça o login para continuar')
    }
}
app.use(checkAuth)

app.get('/', (req,res)=>{
    res.sendFile(`${pastaBase}/index.html`)
})
app.listen(port);