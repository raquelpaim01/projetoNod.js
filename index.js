const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas");
const Resposta = require('./database/Resposta');
const res = require("express/lib/response");

//conexão com o banco
connection
    .authenticate()
        .then(()=>{
            console.log("conexão enviada com sucesso!");
        })
        .catch((msgErro)=>{
            console.log(msgErro);
        })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');

app.use(express.static('public'));

//body parser 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas

app.get("/",(req, res) => {
    Pergunta.findAll(({raw: true, order:[
        ['id','DESC']
    ]})).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{
    var titulo= req.body.titulo;
    var descricao= req.body.descricao;
    Pergunta.create({
        title:titulo,
        description:descricao
    }).then(()=>{
        res.redirect("/");
   });
    
});
app.get("/pergunta/:id",(req ,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ 
                    ['id','DESC'] 
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});


app.listen(8181,()=>{console.log("App rodando!");});