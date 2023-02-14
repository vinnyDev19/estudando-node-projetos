const express = require('express')
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    partialsDir : ['views/partials'],
})
app.engine('handlebars', hbs.engine)
app.set('view engine','handlebars')
app.use(express.static('public'))

const products = [
    {   
        id:'1',
        title:'Xbox 360',
        body: 'Xbox 360 Elite Edition, o melhor do mercado!',
        price:'R$ '+ 3000 + ' Reais',
    },
    {   
        id:'2',
        title:'PlayStation 5',
        body: 'PlayStation 5 Elite Edition, o melhor do mercado!',
        price:'R$ '+ 4000 + ' Reais' ,
    },
];

app.get('/', (req,res)=>{
    res.render('home',{products})
})

app.get('/produto/:id',(req,res) =>{
    const produto = products[req.params.id - 1]
    
    res.render('produtos',{produto}) 
})


app.listen(port,()=>{
    console.log('listening on port',port);
})