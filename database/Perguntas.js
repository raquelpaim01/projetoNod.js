const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{
  
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({forse: false}).then(()=>{
    console.log("tabela criada com sucesso!");
})
    .catch((msgErro)=>{
        console.log(msgErro);
    })

module.exports = Pergunta;