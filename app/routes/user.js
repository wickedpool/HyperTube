const express = require('express')
const router = express.Router()

router.put('/', require('../controllers/user/signup.js'))
router.post('/', require('../controllers/user/signin.js'))

router.use(require('../utils/middleware.js')())

router.patch('/', require('../controllers/user/update.js'))

module.exports = router
