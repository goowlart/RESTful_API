const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

//Schem c'est comme les champs de données de ma base de données
const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    require: true, //definido como obrigatorio
  },
  prenom: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true, //para que seja unico
    required: true,
    lowercase: true, //para que passe em minusculo
  },
  password: {
    type: String,
    require: true,
    select: false, //para quan quando eu faça uma buca esses dados nao apareçao
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
  select: false,
  },
  createdAt: {
    type: Date, //por defeiuto o momento em que ela for criada
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) { //function para a criptografia da senha ## chasch
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model('User', UserSchema); //definir o model

module.exports = User; //export do model
