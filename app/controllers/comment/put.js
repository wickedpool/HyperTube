const model = require('../../models/comment.js')

function error (res, error, status) {
  res.status(status)
  res.json({
    success: false,
    error
  })
}

module.exports = (req, res) => {
  if (typeof req.params.id !== 'string' || req.params.id.length !== 36) {
    return error(res, 'Wrong id', '403')
  }
  if (typeof req.body.comment !== 'string' || req.body.comment === '') {
    return error(res, 'Bad comment', 403)
  }

  model.add({
    userId: req.user.id,
    movieId: req.params.id,
    text: req.body.comment
  }).then(result => {
    res.json({
      success: true,
      result
    })
  }).catch(err => {
    console.log(err)
    error(res, 'Internal server error', 500)
  })
}
