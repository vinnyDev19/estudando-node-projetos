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
app.use(express.json())

app.use('/users', usersRounter)

app.get('/', (req,res)=>{
    res.sendFile(`${pastaBase}/index.html`)
})
app.listen(port);

