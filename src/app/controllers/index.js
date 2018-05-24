const fs = require('fs');
const path = require('path');

module.exports = app => {
  fs
  .readdirSync(__dirname)//leia um diretorio
  .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))//nao leia os arquivos que comecem com ponto e nao seja o arquivo que eu estou mechendo
  .forEach (file => require(path.resolve(__dirname, file))(app));//ele percorre todos os meus arquivos e aplica a configuraçaom da aplicaçao
};
