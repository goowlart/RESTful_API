const express = require('express'); //como eu vou mecher em rotas vou precisar do expresse

const bcrypt = require ('bcryptjs'); //usarei para verificaçao de usuario

const jwt = require ('jsonwebtoken'); //module para criaçao de token

const User = require('../models/User'); //chamdno o medelo que eu vou trabalhar

const authConfig = require ('../../config/auth');

const crypto = require ('crypto'); // funçao que ka vem integrada ao node

const router = express.Router(); //essa funçao cria uma rotas para os usuarios


//################################################        FUNCTION DE GENERATION DE TOKEN

function generateToken(params = {} ){ //function para gerar token de altenticaçao
  return jwt.sign(params, authConfig.secret, { //para criançao do meu token dentro do meu codigo  // para recuperaçao do id do usuarion ({ id: user.id }, )
   expiresIn: 86400, //tempo para que a senha expire  1 dia
  });
}


//################################################         USER CREATION

router.post('/register', async (req, res) => { //definindo uma rota para trabalho (nesse caso chamo de registro)
  //ler mais sobre o async
  const { email } = req.body; //recuperando o email

  try { //cria um usuario quando ele chama essa rota
    if ( await User.findOne({ email })) //e se o email ja existir mensagem de erro
      return res.status(400).send({ error: 'User already exists mon frère'});

    const user = await User.create(req.body); //pega todos os parametros que o usuario cadastrou e passa para o user.create
    //await espera alguma coisa acontecer para ser executado
   user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id : user.id }),
    }); //usurio quando cria uma conta ja pode logar automaticamente porque le recebe um token
  } catch (err) {
    return res.status(400).send({
      error: 'Registrataion failed mon frère'
    }); //me mostra se ouve um erro na hora de se enregistrar
  }
});
//################################################       USER AUTHENTICATION
router.post('/authenticate', async (req, res) => { //crinado nova route de autenticaçao do usuarion
 const { email, password } = req.body;

 const user = await User.findOne({email}).select('+password'); // isso me permete de fzaer a descriptografia do password

if (!user)
 return res.status(400).send({ error: 'User not found mon frère' });

 if (!await bcrypt.compare(password, user.password)) //se a senha bate o usuario prossegue
 return res.status(400).send({ error: 'Invalid password mon frère' }); // se nao ele recebe uma mensagem de console.error();

   user.password = undefined; //denovo eu escondo senha do usuario

res.send({
  user,
  token: generateToken({ id : user.id }), //gerado token para o usuario quando ele faz o loginb
 }); // se ele logou bem ele me retorna o usuatio

});






//##############################################            PERCA DE SENHA





router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  try {

    const user = await User.findOne({ email });
    if (!user)
    return res.status(400).send({ error: 'User not found mon frère' })

    const token = crypto.randomBytes(20).toString('hex'); //criando um token para o usuario possa resetar a senha


    const now = new Date(); //criando um data d´expiraçao para o  meu token
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id,{ //
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });
console

  } catch (err){
    res.status(400).send({error: 'Eroo on forgot password, try again mon frère'});//eu consigo passar um erro para o meu usaurio )
  }
});


module.exports = app => app.use('/auth', router);
/* Ultilizarteur de test <------
{
{
	"user": {
		"_id": "5aeafc75b544c57d14b31b2d",
		"nom": "vieiratest",
		"prenom": "alextest",
		"email": "goowlart@test2.com",
		"createdAt": "2018-05-03T12:11:33.708Z",
		"__v": 0
	}
}
}*/
