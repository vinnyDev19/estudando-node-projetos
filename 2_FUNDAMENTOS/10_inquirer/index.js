const inquirer = require('inquirer');
inquirer.prompt([
{
    name:'p1',
    message: 'Qual a primeira nota?'
},
{
    name:'p2',
    message:'Qual a seguinda nota?',
},
])
.then((rp) =>{
   console.log(rp) ;
   media = (parseInt(rp.p1 ) + parseInt(rp.p2)) / 2
   console.log(media);
}).catch(err => console.error(err));