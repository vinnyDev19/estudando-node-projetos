const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([{
    name : 'nome',
    message:'Qual seu nome'
},
{
    name:'idade',
    message:'Qual a sua idade?'
}]).then((resposta)=>{
    if(!resposta.nome || !resposta.idade){
        throw new Error(chalk.bgRed("Os campos são obrigatórios"))
    }
    else{
        console.log(chalk.bgGreen.black(`Seu nome é ${resposta.nome} e sua idade é ${resposta.idade} anos`))
    }
  
})

