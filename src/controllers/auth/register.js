const { checkUsername, registerUser } = require('../../models/users')
const { response, reject } = require('../../helpers/helper')
const bcrypt = require('bcryptjs')

exports.register = (req, res) => {
  const { username, password } = req.body
  if (username === '' || password === '') {
    reject(res, null, 401, 'Cannot register, some or all field is empty')
  } else if (password.length < 8) {
    reject(res, null, 401, 'Password must be 8 character length')
  } else {
    checkUsername(username)
      .then((result) => {
        if (result.length > 0) {
          return reject(res, null, 401, 'Username is already registered')
        } else {
          bcrypt.genSalt(10, function (err, salt) {
            if (err) {
              reject(res, null, 401, { msg: 'Error generate salt', err })
            } else {
              bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                  reject(res, null, 401, { msg: 'Error hash password', err })
                } else {
                  const data = { username, password: hash }
                  registerUser(data)
                    .then(() => response(res, 'Success Register', 200, null))
                    .catch((err) =>
                      reject(res, null, 401, { msg: 'Failed Register', err })
                    )
                }
              })
            }
          })
        }
      })
      .catch((err) =>
        reject(res, null, 500, { msg: 'Database is error', err })
      )
  }
}
