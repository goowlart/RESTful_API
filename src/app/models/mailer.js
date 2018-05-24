const path = require('path');

const nodemailer = require('nodemailer'); //modulo de boite mail de teste

const hbs = require('nodemailer-express-handlebars'); //ele utiliza  um themplate para  é uma forma de prencher variaveis em um HTML

const { host, post, user, pass } = require('../config/mail.json'); //eu coloco minhas in fomaçoes delicadas dentro de um json

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass
  }
});

transport.use('compile', hbs({ //configuraçao do handlebars
  viewEngine: 'handlebars', //por padrao
  viewPath: path.resolve('./src/resources/mail/'), //onde vai ficar a pasta
  extName: '.html',
}));

module.exports = transport;
