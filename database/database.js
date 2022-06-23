const Sequelize = (require('sequelize'));

const connection = new Sequelize('guiaperguntas','root','raquel69',{
    host: 'localhost',
    dialect:'mysql'
});
 module.exports = connection;