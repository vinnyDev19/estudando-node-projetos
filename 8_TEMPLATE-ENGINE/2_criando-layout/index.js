const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars')


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
    res.render('home')
})

app.listen(port)

