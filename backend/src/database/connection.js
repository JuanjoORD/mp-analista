const Sequelize = require('sequelize')
const config = require('../config');


const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
   host: config.dbHost,
   dialect: 'mssql',
   port: '1433'
});

const branchModel = require('../models/Branch');

const Branch = branchModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
    console.log('Sync done!!')
}).catch(err => console.log(err));


module.exports = {
    Branch
}
