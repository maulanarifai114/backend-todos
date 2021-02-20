const { response, reject } = require('../../helpers/helper')
const { deleteLabels } = require('../../models/labels')

exports.deleteLabels = (req, res) => {
  if (req.id.toString() === process.env.ADMIN) {
    deleteLabels(req.body.join())
      .then((result) => {
        result.affectedRows >= 1
          ? response(res, 'Success Delete Label', 200, null)
          : reject(res, null, 400, 'Failed Delete Label')
      })
      .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
  } else if (req.id.toString() !== process.env.ADMIN) {
    reject(res, null, 401, 'You are not an Administrator')
  }
}
