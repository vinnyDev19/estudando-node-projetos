// externos
const inquirer = require('inquirer');
const chalk = require('chalk');
// internos
const fs = require('fs');
operation();
function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message:'O que você deseja fazer?',
        choices : ['Criar Conta',
                   'Consultar Saldo',
                   'Depositar',
                   'Sacar',
                   'Sair',
    ],
    }]).then((resposta)=>{
        const opcao = resposta['action']
        if(opcao === 'Criar Conta'){
            createAccount();
        }
        else if(opcao === 'Depositar'){
            deposit();
        }
        else if(opcao === 'Consultar Saldo'){ 
            getAccountBalance();
        }

        else if(opcao === 'Sacar'){
            withDraw();
        }
        else if(opcao === 'Sair'){
            console.log(chalk.bgBlue('Obrigado por usar Accounts!'))
            process.exit();
        }
    }).catch((err) => {console.log(err)})
}

// create an account

function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount();
}
function buildAccount(){

    inquirer.prompt([{
        name:'accountName',
        message:'Digite o nome da conta: '
    }]).then((resposta) => {
        const accountName = resposta['accountName'];
        console.info(accountName)
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Está conta já existe, escolha outro nome!'))
            buildAccount()
            return
        }
        fs.writeFileSync(`accounts/${accountName}.json`,'{"balance":0}', function(err){
            console.log(err)
        },
        )
        console.log(chalk.green('Parabéns sua conta foi criada!'))
        operation()
       
    }).catch((err)=>{
        console.log(err)
    })
}

// add an amount to user account

function deposit(){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome de sua conta?'
    }])
    .then((resposta)=>{
        const accountName = resposta['accountName']
        //verificar se a conta existe
        if(!checkAccount(accountName)){
            return deposit();
        }
        inquirer.prompt([{
            name:'amount',
            message:'Qual a quantia que deseja depositar?',
        }]).then((resposta)=>{
            const amount = resposta['amount']
            //add amount 
            addAmount(accountName, amount)
        }).catch((err)=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log(err)
    })
}
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed('Está conta não existe, escolha outro nome!'))
        return false
    }
    return true
}
function addAmount(accountName, amount){
    const accountData = getAccount(accountName);
    if(!amount){
        console.log(chalk.bgRed('Ocorreu um erro, tente novamente mais tarde!'))
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err){
        console.log(err)
    },
    )
    console.log(chalk.green(`Foi depositado a quantia de R$${amount} na sua conta`))
    operation()
}
function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding:'utf8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)
}

function getAccountBalance(){
 inquirer.prompt([{
    name:'accountName',
    message:'Qual nome da conta de deseja consultar?'
 }]).then((resposta)=>{
    const accountName = resposta['accountName']
    if(!checkAccount(accountName)){
        return getAccountBalance()
    }
    const accountData = getAccount(accountName)
    console.log(chalk.bgBlue.black(`O saldo de sua conta é: R$ ${accountData.balance} !`))
    operation()

 }).catch((erro)=>{
    console.log(erro)
 })
}
function withDraw(){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual nome da conta?'
    }]).then((resposta)=>{
        const accountName = resposta['accountName']
        if(!checkAccount(accountName)){
            return withDraw();
        }
        inquirer.prompt([{
            name:'amount',
            message:'Quantos você deseja sacar?',
        }]).then((resposta)=>{
            const amount = resposta['amount']
            operation()
            removeAmount(accountName,amount)
        }).catch((err)=>{
            console.log(err)
        })

    }).catch((err)=>{
        console.log(erro)
    })
}

function removeAmount(accountName,amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed('Ocorreu um erro, tente novamente mais tarde!'))
        return withDraw();
    }
    if(accountData.balance < amount){
        console.log(chalk.bgRed("Valor indisponível!"))
        return withDraw()
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData),function(err){
        console.log(err)
    })
    console.log(chalk.green(`Foi realizado um saque de R$${amount} Reais`))
}