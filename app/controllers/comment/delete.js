const fs = require('fs')
const model = require('../../models/comment.js')

const picsDir = require('path').dirname(require.main.filename) + '/pictures/'

function error(res, error, status) {
  res.status(status)
  res.json({
    success: false,
    error
  })
}

module.exports = (req, res) => {
  if (typeof req.params.id !== 'string' || req.params.id.length === '') {
    return error(res, 'Wrong id', '403')
  }

  model.delete(req.params.id).then(result => {
    res.json({
      success: true
    })
  }).catch(err => {
    console.log(err)
    error(res, 'Internal server error', 500)
  })
}
