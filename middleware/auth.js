const jwt = require('jsonwebtoken');
const secret = "secret"
// const AccessControl = require("./AccessControl")
// const ac = new AccessControl(grants)
const AccessControl = require('accesscontrol')
const ac = new AccessControl()
ac.grant('user')
  .createOwn('post')
  .deleteOwn('post')
  .updateOwn('post')
  .readOwn('post')
  .createOwn('comment')
  .deleteOwn('comment')
  .updateOwn('comment')
  .read('comment')
.grant('admin')
  .extend('user')
  .updateAny('post')
  .deleteAny('post')
  .updateAny('comment')
  .deleteAny('comment')


module.exports = {
    user: (req, res, next) => {

  
      if(!req.headers.authorization) {
         
       return res.sendStatus(401)
      }
      const token = req.headers.authorization.replace('Bearer ', '');

      try {
        const payload = jwt.verify(token, secret)
        req.user = payload

        next()
      } catch (error) {
          console.log(error)
        res.sendStatus(401)
      }
  },
  admin: (req, res, next) => {
    if(!req.headers.authorization) {
      
    return res.sendStatus(401)
    }
    const token = req.headers.authorization.replace('Bearer ', '');

    try {
      const payload = jwt.verify(token, secret)
      console.log(payload)
      if(payload.role != 'admin') {
        return res.sendStatus(401)
      }
      req.user = payload

      next()
    } catch (error) {
        console.log(error)
      res.sendStatus(401)
    }
  }
}
