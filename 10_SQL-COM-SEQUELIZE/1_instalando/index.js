const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const conn = require('./db/conn');
const User = require('./models/User')
const Address = require('./models/Address')


app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars');
app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true,
}))
app.use(express.json())

app.get('/', async (req,res)=>{
   const users = await User.findAll({raw:true})
   if(users.newsletter == 1)
   {
    users.newsletter = "Receber"
   }
   else
   {
    users.newsletter = "Não Receber"

   }
    res.render('home', {users:users})
})

app.get('/users/:id', async (req, res)=>{
    const id = req.params.id;

    const user = await User.findOne({raw:true, where: {id:id}})
    res.render('userview',{user} )
})
app.get('/remove/user/:id', async (req, res)=>{
    const id = req.params.id;

    const user = await User.destroy({ where: {id:id}})
    res.redirect('/')
})

app.post('/address/delete', async (req, res)=>{

    const id = req.body.id;
    const UserId = req.body.UserId;
    console.log(id,UserId)
    await Address.destroy({where: {id:id}})
    res.redirect(`/edit/user/${UserId}`)
})

app.get('/edit/user/:id', async (req, res)=>{
    const id = req.params.id;

    const user = await User.findOne({ include:Address ,where: {id:id}})

    res.render('edituser',{user:user.get({plain:true})})
})
app.post('/users/edit', async (req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;
    if(newsletter === 'on'){
        newsletter = true
    }
    else{
        newsletter = false
    }
    const dataUser = {
        id,
        name,
        occupation,
        newsletter,
    }
    await User.update(dataUser , {where: {id:id}})
    res.redirect('/')
})

//conexão com o banco
app.get('/add/user', async (req,res)=>{
    res.render('adduser')
})

app.post('/users/create',async (req,res)=>{
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;
    if(newsletter === 'on'){
        newsletter = true
    }
    else{
        newsletter = false
    }
    await User.create({name, occupation, newsletter})

    res.redirect('/')
})
app.post('/address/create', async (req,res)=>{
    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
   

    const address = {
        UserId,
        street,
        number,
        city
    }

    await Address.create(address)
    res.redirect(`/edit/user/${UserId}`)
})
    
    
       conn
       .sync({force:true})
       .then(()=>{
        app.listen(3000)
       }).catch((err)=>{
        console.log(err);
       })
 



