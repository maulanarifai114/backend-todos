const { response, reject } = require('../../helpers/helper')
const { confirmUsers } = require('../../models/admin')

exports.confirmUsers = (req, res) => {
  if (req.id.toString() === process.env.ADMIN) {
    confirmUsers(req.body.join())
      .then((result) => {
        result.affectedRows >= 1
          ? response(res, 'Success Confirm User', 200, null)
          : reject(res, null, 400, 'Failed Confirm User')
      })
      .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
  } else if (req.id.toString() !== process.env.ADMIN) {
    reject(res, null, 401, 'You are not an Administrator')
  }
}
