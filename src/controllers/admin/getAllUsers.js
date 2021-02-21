const { response, reject } = require('../../helpers/helper')
const { getAllUsers } = require('../../models/admin')

exports.getAllUsers = (req, res) => {
  if (req.id.toString() === process.env.ADMIN) {
    getAllUsers(req.id)
      .then((result) => {
        result.length === 0
          ? response(res, 'Users is empty', 200, null)
          : response(res, result, 200, null)
      })
      .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
  } else {
    reject(res, null, 401, 'You are not an Administrator')
  }
}
