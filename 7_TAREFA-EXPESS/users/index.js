const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

const pastaBase = path.join(__dirname, '../templates')

router.get('/add', (req,res)=>{
    res.sendFile(`${pastaBase}/adduser.html`)
})

router.post('/save',(req,res)=>{

    const nome = req.body.nome;
    const idade = req.body.idade;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    console.log(`Nome: ${nome} idade: ${idade} endereco: ${endereco} cidade: ${cidade}`)
    res.sendFile(`${pastaBase}/adduser.html`)
})

module.exports = router;