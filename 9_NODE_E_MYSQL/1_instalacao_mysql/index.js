const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const mysql = require('mysql');

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars');
app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true,
}))
app.use(express.json())

app.get('/',(req,res)=>{

    res.render('home')
})
//conexão com o banco
const conn = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:'',
        database:'nodemysql'
    }
    )
    app.post('/books/insertbook', (req,res)=>{
        const title = req.body.title
        const pageqty = req.body.pageqty

        const sql = `INSERT INTO books (title,pageqty) VALUES ('${title}','${pageqty}')`
        conn.query(sql, (err)=>{
            if(err){
                console.error(err)
            }
            res.redirect('/')
        })
    })
    conn.connect(function (err) { 
        if (err) 
        {
           console.log(err) 
        }
        console.log("Conexão com o banco estabelicida!")
        app.listen(3000)
     });
     



