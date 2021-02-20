const { response, reject } = require('../../helpers/helper')
const { updateUsers } = require('../../models/admin')
const { checkUsername } = require('../../models/users')
const bcrypt = require('bcryptjs')

const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(pass, salt)
  return hash
}

exports.updateUsers = (req, res) => {
  if (req.id.toString() === process.env.ADMIN) {
    const { username, password, id } = req.body
    const data = {}
    id !== '' ? true : reject(res, null, 401, 'Id must be filled')
    username !== '' ? (data.username = username) : false
    password !== '' ? (data.password = hashPassword(password)) : false
    checkUsername(username)
      .then((result) =>
        result.length > 0
          ? reject(res, null, 401, 'Username is already registered')
          : updateUsers(data, id)
              .then((result) =>
                result.affectedRows >= 1
                  ? response(res, 'Success Update User', 200, null)
                  : reject(res, null, 400, 'User not found')
              )
              .catch((err) =>
                reject(res, null, 500, { msg: 'Database is error', err })
              )
      )
      .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
  } else if (req.id.toString() !== process.env.ADMIN) {
    reject(res, null, 401, 'You are not an Administrator')
  }
}
