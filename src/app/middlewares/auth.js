const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');


module.exports = (req, res, next) => { //Su o usuario estiver pronto para ir para o outro controller se ele nao for chamado ele para por aqui
  const authHeader = req.headers.authorization;

//=========================== Verificaçoes mais leves que nao exijem muito da maquina para que o token passe por um primeiro filtro
  if (!authHeader) //se nao autorizacdo indica uma mensagem de console.error();
      return res.status(401).send({ error: 'No token provided' });
 //exemplo de formato de token.: Bearer vvfdhv212983712vvfdhv2171820932gbajst
const parts = authHeader.split(' '); //para dividir meu token en duas parte exnplo  Bearer      vvfdhv212983712vvfdhv2171820932gbajst

if (!parts.lenght === 2) //se ele nao segue esse padrao eu envio um erro
return res.status(401).send({ error: 'Token error' });

const [ scheme, token ] = parts; //desestruturando para recebner em duas partes o token
//verificando se começa com Bearer rejex ! sinal de negativo  / iniciando minha rejex ^ Bearer    a palavra que eu busco $  para indicar o final ^
if (!/^Bearer$/i.test(scheme)) //testando meu scheme para ver se tem a palavra Bearer escrita
     return res.status(401).send({ error : 'Token malformatted' });

jwt.verify(token, authConfig.secret, (err, decoded) => { // uma verificaçao para ver se meu token bate com o token do segredo
 if (err) return res.status(401).send({ error: 'Token invalid' });

req.userId = decoded.id; // se le passa pela verificaçao isso retorn o id do usuario
return next();
});
};
