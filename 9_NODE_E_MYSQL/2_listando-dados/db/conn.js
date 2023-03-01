const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit:10,
    user: 'root',
    host: 'localhost',
    password:'',
    database:'nodemysql'
})
console.log('Conexão estabelecida!')
module.exports = pool