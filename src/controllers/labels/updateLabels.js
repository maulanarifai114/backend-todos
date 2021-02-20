const { response, reject } = require('../../helpers/helper')
const { updateLabels } = require('../../models/labels')

exports.updateLabels = (req, res) => {
  if (req.id.toString() === process.env.ADMIN) {
    const { label, description, color, id } = req.body
    updateLabels({ label, description, color }, id)
      .then((result) => {
        result.affectedRows >= 1
          ? response(res, 'Success Update Label', 200, null)
          : reject(res, null, 400, 'Failed Update Label')
      })
      .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
  } else if (req.id.toString() !== process.env.ADMIN) {
    reject(res, null, 401, 'You are not an Administrator')
  }
}
