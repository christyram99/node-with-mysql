const UserDataServiceProvider = require('../services/database/userDataServiceProvider')
const config = require('./../config/app')
const jwt = require('jsonwebtoken')
const utils = require('../helpers/utils')
const bcrypt = require('bcrypt')

async function signIn (req, res, next) {
  try {
    const [ rows ] = await UserDataServiceProvider.login(req.body.email)
    console.log('TCL: signIn -> rows, fields', rows)
    const mainUserData = rows[0]
    console.log('TCL: signIn -> mainUserData', mainUserData)

    if (!mainUserData) {
      const respData = {
        success: false,
        message: 'Invalid credentials!'
      }

      return res.status(401).json(respData)
    }

    const match = await bcrypt.compare(req.body.password, mainUserData.password)
    if (!match) {
      const respData = {
        success: false,
        message: 'Invalid credentials!'
      }

      return res.status(401).json(respData)
    }

    const user = prepareUserDataToReturn(mainUserData)
    const token = getAccessToken(user, mainUserData.password)

    removePasswordFromUserObject(user)

    const respData = {
      success: true,
      user_details: user,
      access_token: token,
      message: 'User login success!',
    }

    return res.status(201).json(respData)
  } catch (error) {
    next(error)
  }
}

async function register (req, res, next) {
  try {
    const userData = req.body
    const user = await UserDataServiceProvider.register(userData)

    // we need to remove user password form data
    if (user.password) delete user.password

    const respData = {
      success: true,
      message: 'User created successfully',
      user,
    }

    return res.status(201).json(respData)
  } catch (err) {
    next(err)
  }
}

function getTokenSecret (password) {
  return config.jwt.token_secret + password
}

function getAccessToken (user, password) {
  return jwt.sign(user, getTokenSecret(password), {
    expiresIn: config.jwt.token_life
  })
}

function removePasswordFromUserObject(user) {
  if (user.password) {
    delete user.password
  }
}

function prepareUserDataToReturn(user) {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  }
}

module.exports = {
  signIn,
  register,
}