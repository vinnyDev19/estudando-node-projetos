const http = require('http');
const port = 3000;
const server = http.createServer((req,res)=>{
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/html');
   res.end('<h1 class="teste">Olá este é meu primeiro server com HTML!</h1> <p> testando att </p>')
})
server.listen(port, () =>{console.log('Tudo ok na porta ', port)})