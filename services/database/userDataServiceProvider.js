const Database = require('../../database')
const bcrypt = require('bcrypt')
const saltRounds = 12

async function register (userData) {
  console.log('TCL: register -> userData', userData)
  // Hash Password
  userData.password = await bcrypt.hash(userData.password, saltRounds)

  const sql = `INSERT INTO users(email, first_name, last_name, password) VALUES ('${userData.email}', '${userData.first_name}', '${userData.last_name}', '${userData.password}')`
  return Database.query(sql)
}

function login (email) {
  const sql = `SELECT * FROM users where email = '${email}'`
  return Database.query(sql)
}

module.exports = {
  register,
  login,
}
