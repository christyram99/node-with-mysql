const jwt = require('jsonwebtoken')
const config = require('../config/app')
const userDataServiceProvider = require('../services/database/userDataServiceProvider')

async function validateAccessToken (req, res, next) {
  try {
    const accessToken = req.headers.authorization

    if (!accessToken) {
      let respData = {
        success: false,
        message: 'No Authorization Token'
      }
      return res.status(403).json(respData)
    }

    // Decode JWT received via Header
    const userDetails = jwt.decode(accessToken)

    // Fetch User From DB
    const [ userRows] = await userDataServiceProvider.fetchUserByEmail(userDetails.email)
    const user = userRows[0]

    if (!user) {
      let respData = {
        success: false,
        message: 'Invalid Credentials!'
      }

      return res.status(401).json(respData)
    }

    const tokenSecret = config.jwt.token_secret

    try {
      // Verify JWT
      jwt.verify(accessToken, tokenSecret)

      // Add User to the Request Payload
      req.user = user

      next()
    } catch (error) {
      let respData = {
        success: false,
        message: error.message,
        error: error
      }
      return res.status(401).json(respData)
    }
  } catch (error) {
    console.log(error)

    let respData = {
      success: false,
      message: 'Invalid Access Token'
    }

    return res.status(401).json(respData)
  }
}

module.exports = {
  validateAccessToken,
}