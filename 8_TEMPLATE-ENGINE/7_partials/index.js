const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    partialsDir:['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

app.get('/blog',(req,res)=>{
    const posts= [
        {
            title:'Aprender Node.js',
            category:'JavaScript',
            body:"Testing",
            commnets:5
        },
        {
            title:'Aprender PHP',
            category:'PHP',
            body:"Testing",
            commnets:5
        },
        {
            title:'Aprender C#',
            category:'.Net',
            body:"Testing",
            commnets:5
        },
]
    
res.render('blog', {posts})
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

