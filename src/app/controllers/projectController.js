const express = require('express');

const authMiddleware = require ('../middlewares/auth'); //importaçao do meu middlewares

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.send ({ ok: true, user: req.userId });  // req.userId  agora eu tenho essa infomaçao
});

module.exports = app => app.use('/projects', router);
