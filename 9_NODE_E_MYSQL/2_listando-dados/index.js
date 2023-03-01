const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const pool = require('./db/conn');

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

    app.post('/books/insertbook', (req,res)=>{
        const title = req.body.title
        const pageqty = req.body.pageqty

        const sql = `INSERT INTO books (??,??) VALUES (?,?)`
        const data = ['title', 'pageqty',title,pageqty]
        pool.query(sql,data, (err)=>{
            if(err){
                console.error(err)
                return
            }
            res.redirect('/books')
            
        })
    })
    app.get('/books', (req,res)=>{
        const sql = 'SELECT * FROM books'
        pool.query(sql,function (err,data){
            if(err){
                console.error(err)
                return
            }
            const books = data;
            res.render('books', {books})
        })  
    })
    app.get('/books/:id',(req,res)=>{
        const id = req.params.id;
        const sql = `SELECT * FROM books WHERE ?? = ?`
        const data = ['idbooks',id]
        pool.query(sql,data,function (err,data){
            if(err){
                console.log(err);
                return;
            }
            const book = data[0]
            res.render('book', {book})
        })
    })

    app.get('/books/edit/:id',(req,res)=>{
        const id = req.params.id;
        const sql = `SELECT * FROM books WHERE ?? = ?`
        const data = ['idbooks',id]
        pool.query(sql,data,function (err,data){
           if(err)
           {
            console.log(err);
            return
           }
            const book = data[0]
            res.render('editbook', {book})
        })
    
    })
    app.post('/books/update',(req,res)=>{
        const id = req.body.id;
        const title = req.body.title;
        const pageqty = req.body.pageqty;

        const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
        const data = ['title', title, 'pageqty',pageqty, 'idbooks', id]
        pool.query(sql, data, function (err){
            if(err){
                console.log(err);
                return
            }
            res.redirect('/books')
        })
    })
    app.post('/book/remove/:id',(req,res)=>{
        const id = req.params.id;
        const sql = `DELETE FROM books WHERE ?? = ?`
        const data = ['idbooks', id]
        pool.query(sql,data,function (err){
            if(err){
                console.log(err);
            }
            res.redirect('/books')
        })
    })
    
        app.listen(3000)
 



