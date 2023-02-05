const chalk = require('chalk');
const nota = 8; 


if(nota >= 7){
    console.log(chalk.bgGreen.bold('Parabéns! Você está aprovado!'))
}
else{
    console.log(chalk.bgRed('Reprovado!'))
}