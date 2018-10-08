'use strict'

const jwt = require('../utils/jwt')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'Unauthorize' })
  }

  const token = req.headers.authorization.split(' ')[1]

  jwt.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = isAuth