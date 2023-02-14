const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars')


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})
app.get('/', (req,res)=>{
    const user = {
        name: 'Vinicius',
        surname:'Vieira'
    }
    const auth = false;
    const approved = true;
    res.render('home',{user:user, auth, approved})
})
app.get('/post', (req,res)=>{
const  post = {
    title : 'Aprender Node.js',
    category: 'JavaScript',
    age:'30',
    body:'Este artigo vai te ajudar a aprender Node.js...',
    comments:4,
}
res.render('blogpost',{post})

})

app.listen(port)

