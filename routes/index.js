const express = require('express')
const users = require('./users')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Donee Me' })
})

router.use(users)
module.exports = router
