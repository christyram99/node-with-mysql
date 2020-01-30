const Database = require('../../database')

async function createTodo (todoData) {
  const sql = `INSERT INTO todos (title, description, user_id) VALUES ('${todoData.title}', '${todoData.description}', ${todoData.user_id});`
  return Database.query(sql)
}

function fetchTodo (todoId) {
  const sql = `SELECT * FROM todos where id = ${todoId}`
  return Database.query(sql)
}

function fetchAllTodos (user_id) {
  const sql = `SELECT * FROM todos where user_id = ${user_id}`
  return Database.query(sql)
}

function updateTodo (todoId, todoData) {
  const sql = `UPDATE todos SET title = '${todoData.title}', description = '${todoData.description}' WHERE id = ${todoId};`
  return Database.query(sql)
}

function updateStatsOfTodo (todoId, status) {
  const sql = `UPDATE todos SET status = ${status} WHERE id = ${todoId};`
  return Database.query(sql)
}

function deleteTodo (todoId) {
  const sql = `DELETE FROM todos WHERE id = ${todoId};`
  return Database.query(sql)
}

module.exports = {
  createTodo,
  fetchTodo,
  fetchAllTodos,
  updateTodo,
  updateStatsOfTodo,
  deleteTodo,
}
