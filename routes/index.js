const express = require('express')
const router = express.Router()

const users = require('./users')
const todo = require('./todo')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Donee Me' })
})

router.use(users)
router.use(todo)

module.exports = router
