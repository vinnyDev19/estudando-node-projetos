const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars')


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
    const user = {
        name: 'Vinicius',
        surname:'Vieira'
    }
    res.render('home',{user:user})
})

app.listen(port)

