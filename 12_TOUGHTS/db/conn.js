const {Sequelize} = require  ('sequelize');

const sequelize = new Sequelize('toughts', 'root', '', {
    host:'localhost',
    dialect:'mysql'
})

try{
    sequelize.authenticate();
    console.log('Conectado ao MySQL');
}
catch(error){
 console.log(error);
 return
}

module.exports = sequelize;