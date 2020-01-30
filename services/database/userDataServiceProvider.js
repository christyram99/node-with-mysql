const Database = require('../../database')
const bcrypt = require('bcrypt')
const saltRounds = 12

async function register (userData) {
  console.log('TCL: register -> userData', userData)
  // Hash Password
  // userData.password = await bcrypt.hash(userData.password, saltRounds)
  // actually we need to encrypt the password. For easy understanding I am removing encryption for password

  const sql = `INSERT INTO users(email, first_name, last_name, password) VALUES ('${userData.email}', '${userData.first_name}', '${userData.last_name}', '${userData.password}')`
  return Database.query(sql)
}

function login (email, password) {
  const sql = `SELECT * FROM users where email = '${email}' AND password='${password}'`
  return Database.query(sql)
}

function fetchUserByEmail (email) {
  const sql = `SELECT * FROM users where email = '${email}'`
  return Database.query(sql)
}

module.exports = {
  register,
  fetchUserByEmail,
  login,
}
