const express = require('express')
const { 
  signIn,
  register,
} = require('./../controllers/userController')

const router = express.Router();

router.post('/sign-in', 
  signIn
);

router.post('/register', 
  register
);

module.exports = router
