const express = require('express');
const path = require('path');
const router = express.Router()
const pastaBase = path.join(__dirname, '../templates')


router.get('/add', (req,res)=>{
    res.sendFile(`${pastaBase}/userform.html`)
    })
    
    router.post('/save',(req,res)=>{
    
        console.log(req.body)
        const name = req.body.name
        const age = req.body.age
        console.log(`O nome do usário é ${name} e a idade é ${age} anos`)
        res.sendFile(`${pastaBase}/userform.html`)
    
    })
    
    router.get('/:id', (req,res)=>{
        const id = req.params.id;
        console.log('Estamos buscando pelo Usuário ' , id);
        res.sendFile(`${pastaBase}/users.html`)
    })

    module.exports = router