const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
console.log(args)
const nome = args["nome"]
console.log(nome)
const profissao = args["profissao"]
console.log(profissao)


console.log(`o nome dele é ${nome} e trabalha como ${profissao}` )