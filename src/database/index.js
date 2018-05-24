const mongoose = require('mongoose'); //ele exporta do database que ja esta configurado

mongoose.connect('mongodb://localhost/noderest', {
  //useMongoClient: true
}); //définir un nom pour ma base de données (dans ce cas la mienne s'appele NODEREST)
mongoose.Promise = global.Promise; // Par defaut dans le mangoose

module.exports = mongoose;
