const { response, reject } = require('../../helpers/helper')
const { getOneLabel } = require('../../models/labels')

exports.getOneLabel = (req, res) => {
  getOneLabel(req.params.id)
    .then((result) =>
      result.length === 0
        ? response(res, 'Labels is empty', 200, null)
        : response(res, result, 200, null)
    )
    .catch((err) => reject(res, null, 500, { msg: 'Database is error', err }))
}
