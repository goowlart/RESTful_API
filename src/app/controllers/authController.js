const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const authConfig = require('../../config/auth');

const crypto = require('crypto');

const mailer = require('../../modules/mailer');

const router = express.Router();


//################################################        FUNCTION OF TOKEN GENERATION

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {  // ({ id: user.id }, )
    expiresIn: 86400, // time to token expiration 1 day
  });
}

//################################################         USER CREATION

router.post('/register', async (req, res) => {

  const {
    email
  } = req.body;

  try {
    if (await User.findOne({
        email
      })) // and if the email already exists error message
      return res.status(400).send({
        error: 'User already exists mon frère'
      });

    const user = await User.create(req.body); // takes all the parameters that the user registers and passes to the user.create
// await expects something to happen to run
    user.password = undefined;

    return res.send({
      user,
      token: generateToken({
        id: user.id
      }),
    }); // user when creating an account can already log in automatically because it receives a token
  } catch (err) {
    return res.status(400).send({
      error: 'Registrataion failed mon frère'
    });
  }
});
//################################################       USER AUTHENTICATION

router.post('/authenticate', async (req, res) => {
  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({
    email
  }).select('+password'); // this allows me to decrypt the password

  if (!user)
    return res.status(400).send({
      error: 'User not found mon frère'
    });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({
      error: 'Invalid password mon frère'
    });

  user.password = undefined; // again I hide the user's password

  res.send({
    user,
    token: generateToken({
      id: user.id
    }), // generated token for user when login
  });

});

//##############################################           PASSWORD LOSS

router.post('/forgot_password', async (req, res) => { //bug ainda nao resolvido , falta a parte de aultenticaçao do tokern
  const {
    email
  } = req.body;

  try {
    const user = await User.findOne({
      email
    });

    if (!user)

      return res.status(400).send({
        error: 'User not found mon frère'
      });

    const token = crypto.randomBytes(20).toString('hex'); // creating a token for the user can reset the password

    const now = new Date();// creating an expiration date for my token
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });

    mailer.sendMail({
      to: email,
      from: 'goowlart@gmail.com',
      template: 'auth/forgot_password',
      context: { token },
    }, (err) => {
      if (err)
        return res.status(400).send({erro: ' Error on forgot password, try again'});

      return res.send();
    })
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: 'Error on forgot password, try again'
    });
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
