const express = require('express');
const bodyParser = require('body-parser');

require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

var neo4j = require('neo4j-driver')

// const neo4j = require('neo4j-driver');
// var driver =    neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password123'));
// 

var driver = neo4j.driver(
  'neo4j://localhost',
  neo4j.auth.basic('neo4j', '123456')
)


var session = driver.session();


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "Api feito em NodeJS usando express e Neo4J" });
});

app.post('/login', (req, res, next) => {

  session
    .run(`MATCH(u:User {NickName: "${req.body.user}", password: "${req.body.pwd}"})  RETURN u`)
    .then(function (result) {

      const user = {
        nickName: '',
        id: null
      }

      result.records.forEach(function (record) {
        console.log('records', record);

        user.id = record._fields[0].properties.Id.low;
        user.nickName = record._fields[0].properties.NickName;

        console.log(user);
        // id = record._fields[0].Id;
        // nickName = record._fields[0].NickName;
      });
      var token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });

      session.close();

      if (user.nickName !== '')
        return res.json({ auth: true, token: token });

      return res.status(500).json({ message: 'Login inválido!' });
    })
})

app.get('/Clientes', (req, res) => {

  let query = `MATCH (n:Client) RETURN n`
  var clientesArr = [];

  session
    .run(query)
    .then(function (result) {

      result.records.forEach(function (record) {
        clientesArr.push({
          id: record._fields[0].identity.low,
          nome: record._fields[0].properties.Nome,
        });
      });
      session.close();

      if (clientesArr.length > 0)
        return res.status(200).send(clientesArr);

      return res.status(200).json({ message: 'Nenhum cliente encontrado!' });

    });
})

app.post('/Clientes', (req, res, next) => {
  // CREATE (u1:User {NickName: "Felipe", FullName: "Felipe Benevides", password:"123456", Id: 1})
  let query = `CREATE (c1:Client {Nome: "${req.body.nome}", Email: "${req.body.email}", Endereco: "${req.body.endereco}", Cidade: "${req.body.cidade}", CEP: "${req.body.cep}"})`

  session
    .run(query)
    .then(function (result) {
      // res.redirect('/Clientes');
      session.close();
      return res.status(200).json({ message: 'Cliente Criado com Sucesso!!' });
    })
})

app.put('/Clientes', (req, res) => {

  let query =
    `MATCH (c:Client) where id(c)=${req.body.id} WITH c, c {.*} as snapshot 
    SET 
    c.Nome = "${req.body.nome}", 
    c.Email = "${req.body.email}", 
    c.Endereco = "${req.body.endereco}", 
    c.Cidade = "${req.body.cidade}", 
    c.CEP = "${req.body.cep}"
    RETURN snapshot`;

console.log(query);

    session
    .run(query)
    .then(function (result) {
      // res.redirect('/Clientes');
      
      session.close();
      return res.status(200).json({ message: 'Cliente atualizado com Sucesso!!', data: bodyParser.json(result) });

    }).catch(

    )

})

app.delete('/Clientes/:id', (req, res) => {
  let id = req.params.id

  let query = `MATCH (c:Client) where id(c)= ${id} DELETE c`
  session
    .run(query)
    .then(function (result) {
      session.close();
      return res.status(200).json({ message: 'Cliente Excluido com Sucesso!!' });

    }).catch(

    )

})


app.listen(3500, () => {
  console.log("Servidor iniciado no endereço http://localhost://3500");
});