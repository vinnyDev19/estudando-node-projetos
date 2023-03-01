const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('nodesequelize', 'root','', {
    host: 'localhost',
    dialect:'mysql'
})
// try{
//  sequelize.authenticate()
//  console.log('Conectado ao banco com sucesso')
// }
// catch(err){
//     console.log(err)
// }

module.exports = sequelize;