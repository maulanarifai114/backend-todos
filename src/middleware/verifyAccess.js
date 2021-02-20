const jwt = require('jsonwebtoken')
const helper = require('../helpers/helper')

const verify = {
  verifyAccess(req, res, next) {
    const authorization = req.headers.authorization
    if (!authorization) {
      return helper.reject(res, null, 401, 'Server need token')
    }
    const header = authorization.split(' ')
    const token = header[1]
    // JWT Verify
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return helper.reject(res, null, 401, 'Invalid Token')
        } else if (err.name === 'TokenExpiredError') {
          return helper.reject(res, null, 401, 'Token Expired')
        }
      } else {
        req.id = decoded.id
        next()
      }
    })
  },
}

module.exports = verify
