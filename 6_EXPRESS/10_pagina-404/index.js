const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const pastaBase = path.join(__dirname, 'templates')
const usersRounter = require ('./users')
app.use(
    express.urlencoded({
        extended: true,
    }),
)
//arquivos staticos
app.use(express.static('public'))

app.use(express.json())

app.use('/users', usersRounter)

app.get('/', (req,res)=>{
    res.sendFile(`${pastaBase}/index.html`)
})
app.use(function(req, res, next){
    res.status(404).sendFile(`${pastaBase}/404.html`)
}) 
app.listen(port);

