const { response, reject } = require('../../helpers/helper')
const { createLabel } = require('../../models/labels')

exports.createLabel = (req, res) => {
  if (req.id.toString() === process.env.ADMIN) {
    const { label, description, color } = req.body
    createLabel({ label, description, color })
      .then((result) => {
        result.affectedRows >= 1
          ? response(res, 'Success Create Label', 201, null)
          : reject(res, null, 400, 'Failed Create Label')
      })
      .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
  } else {
    reject(res, null, 401, 'You are not an Administrator')
  }
}
