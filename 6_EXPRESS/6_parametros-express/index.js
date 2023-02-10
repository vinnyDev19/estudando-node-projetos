const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const pastaBase = path.join(__dirname, 'templates')

app.get('/users/:id', (req,res)=>{
    const id = req.params.id;
    console.log('Estamos buscando pelo Usuário ' , id);
    res.sendFile(`${pastaBase}/users.html`)
})

app.get('/', (req,res)=>{
    res.sendFile(`${pastaBase}/index.html`)
})
app.listen(port);