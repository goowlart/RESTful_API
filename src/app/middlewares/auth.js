const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

//=========================== Lighter checks that do not require too much of the machine so that the token passes through a first filter
  if (!authHeader)
      return res.status(401).send({ error: 'No token provided' });

const parts = authHeader.split(' ');

if (!parts.lenght === 2)
return res.status(401).send({ error: 'Token error' });

const [ scheme, token ] = parts;
// checking if it starts with Bearer Rejection! negative signal / initiating my rejecx ^ Bearer the word I'm looking for $ to indicate the end ^
if (!/^Bearer$/i.test(scheme))
     return res.status(401).send({ error : 'Token malformatted' });

jwt.verify(token, authConfig.secret, (err, decoded) => {
 if (err) return res.status(401).send({ error: 'Token invalid' });

req.userId = decoded.id; // if it passes through the check this returns the id of the user
return next();
});
};
