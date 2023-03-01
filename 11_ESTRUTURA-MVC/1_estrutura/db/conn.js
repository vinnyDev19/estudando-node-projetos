const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root','', {
    host:'localhost',
    dialect:'mysql',
})
try{
    sequelize.authenticate()
    console.log('Conectado ao MySQL!')
}
catch(e){console.log(`Não foi possível conectar: ${e}`)}

module.exports = sequelize  