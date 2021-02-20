const { actionQuery } = require('../helpers/helper')

const auth = {
  checkUsername: (username) => {
    return actionQuery('SELECT * FROM users WHERE username = ?', username)
  },
  registerUser: (data) => {
    return actionQuery('INSERT INTO users SET ?', data)
  }
}
module.exports = auth
