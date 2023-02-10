const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req,res)=>{

    const basePasta = path.join(__dirname, 'template')
    res.sendFile(`${basePasta}/index.html`);

})

app.listen(port, ()=>{
    console.log('listening on port', port);
});