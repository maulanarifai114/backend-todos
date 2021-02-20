const { response, reject } = require('../../helpers/helper')
const { deleteUsers } = require('../../models/admin')

exports.deleteUsers = (req, res) => {
  if (req.id.toString() === process.env.ADMIN) {
    deleteUsers(req.body.join())
      .then((result) => {
        result.affectedRows >= 1
          ? response(res, 'Success Delete Users', 200, null)
          : reject(res, null, 400, 'Failed Delete Users')
      })
      .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
  } else if (req.id.toString() !== process.env.ADMIN) {
    reject(res, null, 401, 'You are not an Administrator')
  }
}
