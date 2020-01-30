const UserDataServiceProvider = require('../services/database/userDataServiceProvider')
const config = require('./../config/app')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function signIn (req, res, next) {
  try {
    const [ rows ] = await UserDataServiceProvider.login(req.body.email, req.body.password)
    const mainUserData = rows[0]
    
    if (!mainUserData) {
      const respData = {
        success: false,
        message: 'Invalid credentials!'
      }
      
      return res.status(401).json(respData)
    }

    /* Generating access token */
    const token = jwt.sign({
      first_name: mainUserData.first_name,
      last_name: mainUserData.last_name,
      email: mainUserData.email,
    }, config.jwt.token_secret, {
      expiresIn: config.jwt.token_life
    })

    const user = {
      email: mainUserData.email,
      first_name: mainUserData.first_name,
      last_name: mainUserData.last_name,
    }

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