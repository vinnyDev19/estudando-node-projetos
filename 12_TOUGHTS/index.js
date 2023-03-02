const express = require('express')
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const exphbs = require('express-handlebars');
const conn = require('./db/conn')
const flash = require('express-flash')


//controller

const ToughtController = require('./controllers/ToughtController') 
const toughtsRoutes = require('./routes/ToughtsRoutes')
const authRoutes = require('./routes/AuthRoutes')
// models

const Tought = require('./models/Toughts');
const User = require('./models/User');

//template engine
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs.engine())

//receber resposta do body
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// session middleware
app.use(
    session({
        name:'session',
        secret:'nosso_secret',
        resave:false,
        saveUninitialized:false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(),'sessions'),
        }),
        cookie:{
            secure:false,
            maxAge:360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }))
    //flash menssage

    app.use(flash())

    //set session to res
    app.use((req,res, next)=>{
        if(req.session.userid){
            res.locals.session = req.session
        }
        next();
    })

    // Routes
    app.use('/toughts', toughtsRoutes)
    app.use('/', authRoutes)

    app.get('/', ToughtController.showToughts)
conn 
.sync({force:true})
.then(()=>{
    app.listen(3000)
})
.catch((erro)=>{
    console.error(erro)
})