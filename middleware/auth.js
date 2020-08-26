const jwt = require('jsonwebtoken');
const secret = "secret"

module.exports = function auth(req, res, next) {
    if(!req.headers.authorization) {
        console.log()
     return res.sendStatus(403)
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, secret)
      req.user = payload
      next()
    } catch (error) {
        console.log(error)
      res.sendStatus(403)
    }
}