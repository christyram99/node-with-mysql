const TodoDataServiceProvider = require('../services/database/todoDataServiceProvider')

async function createTodo (req, res, next) {
  try {
    const todoPayload = req.body

    /* adding user id fetched in middleware */
    todoPayload.user_id = req.user.id

    const [ todoRows ] = await TodoDataServiceProvider.createTodo(todoPayload )
    const todoData = todoRows[0]

    const respData = {
      success: true,
      todo_data: todoData,
      message: 'Successfully created todo',
    }

    return res.status(201).json(respData)
  } catch (error) {
    next(error)
  }
}

async function fetchTodo (req, res, next) {
  try {
    const [ todoRows ] = await TodoDataServiceProvider.fetchTodo(req.params.todo_id)
    const todoData = todoRows[0]

    if (!todoData || todoData.user_id !== req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user'
      })
    }

    const respData = {
      success: true,
      todo_data: todoData,
      message: 'Successfully fetched todo',
    }

    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

async function fetchAllTodos (req, res, next) {
  try {
    const [ todoRows ] = await TodoDataServiceProvider.fetchAllTodos(req.user.id)

    const respData = {
      success: true,
      todo_data: todoRows,
      message: 'Successfully fetched todos',
    }

    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

async function updateTodo (req, res, next) {
  try {
    const [ todoRows ] = await TodoDataServiceProvider.fetchTodo(req.params.todo_id)
    const todoData = todoRows[0]

    if (!todoData || todoData.user_id !== req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user'
      })
    }

    const [ updatedRows ] = await TodoDataServiceProvider.updateTodo(req.params.todo_id, req.body)
    const updatedData = updatedRows[0]

    const respData = {
      success: true,
      todo_data: updatedData,
      message: 'Successfully updated the todo',
    }

    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

async function updateStatusOfTodo (req, res, next) {
  try {
    const [ todoRows ] = await TodoDataServiceProvider.fetchTodo(req.params.todo_id)
    const todoData = todoRows[0]

    if (!todoData || todoData.user_id !== req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user'
      })
    }

    const [ updatedRows ] = await TodoDataServiceProvider.updateStatsOfTodo(req.params.todo_id, req.body.status)
    const updatedData = updatedRows[0]

    const respData = {
      success: true,
      todo_data: updatedData,
      message: 'Successfully updated status of the todo',
    }

    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

async function deleteTodo (req, res, next) {
  try {
    const [ todoRows ] = await TodoDataServiceProvider.fetchTodo(req.params.todo_id)
    const todoData = todoRows[0]

    if (!todoData || todoData.user_id !== req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user'
      })
    }

    const [ ] = await TodoDataServiceProvider.deleteTodo(req.params.todo_id)

    const respData = {
      success: true,
      message: 'Successfully deleted the todo',
    }

    return res.status(200).json(respData)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createTodo,
  fetchAllTodos,
  fetchTodo,
  updateTodo,
  deleteTodo,
  updateStatusOfTodo,
}