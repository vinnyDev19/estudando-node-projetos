const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const pastaBase = path.join(__dirname, 'templates')

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())


app.get('/users/add', (req,res)=>{
res.sendFile(`${pastaBase}/userform.html`)
})

app.post('/users/save',(req,res)=>{

    console.log(req.body)
    const name = req.body.name
    const age = req.body.age
    console.log(`O nome do usário é ${name} e a idade é ${age} anos`)
    res.sendFile(`${pastaBase}/userform.html`)

})

app.get('/users/:id', (req,res)=>{
    const id = req.params.id;
    console.log('Estamos buscando pelo Usuário ' , id);
    res.sendFile(`${pastaBase}/users.html`)
})

app.get('/', (req,res)=>{
    res.sendFile(`${pastaBase}/index.html`)
})
app.listen(port);

