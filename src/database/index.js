const mongoose = require('mongoose'); //ele exporta do database que ja esta configurado

mongoose.connect('mongodb://localhost/noderest', {
  //useMongoClient: true
}); // define a name for my database (in this case mine is called NODEREST)
mongoose.Promise = global.Promise;

module.exports = mongoose;
