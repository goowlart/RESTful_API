const express = require('express'); // require - importer le paquet EXPRESS
const bodyParser = require('body-parser'); // require - importer le paquet BODY-PARSER

//EXPRESS est un framework pour node.JS que fait les traitement des routes et requête HTTP
//BODY-PARSER aussi un framework pour node.JS, aider à transcrire les paramètres de URL et JSONS

const app = express(); //app a aplication, ici ele est deja defini

app.use(bodyParser.json()); //je fait apple pour que le bodyParser puisse donner support á jason
app.use(bodyParser.urlencoded({ extended: false})); // pour que il puisse comprendre des paramentres URL

/*
app.get('/', (req, res) => {
  // REQ données de réquisition
  // RES est l'objet qui envoie une réponse à l'utilisateur lorsqu'il accède à cette route
res.send('OK');
});*/

require('./app/controllers/index')(app); //referenciando meu controllers

app.listen(3000); //ici je define la porte dans la quelle il va marcher
