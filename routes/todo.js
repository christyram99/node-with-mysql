const express = require('express')
const {
  createTodo,
  fetchAllTodos,
  fetchTodo,
  updateTodo,
  updateStatusOfTodo,
  deleteTodo,
} = require('./../controllers/todoController')

const { validateAccessToken } = require('./../middlewares/authMiddleware')

const router = express.Router();

router.get('/todo',
  [
    validateAccessToken,
  ],
  fetchAllTodos,
);

router.post('/todo',
  [
    validateAccessToken,
  ],
  createTodo,
);

router.get('/todo/:todo_id',
  [
    validateAccessToken,
  ],
  fetchTodo,
);


router.patch('/todo/:todo_id',
  [
    validateAccessToken,
  ],
  updateTodo,
);

router.patch('/todo/:todo_id/status',
  [
    validateAccessToken,
  ],
  updateStatusOfTodo,
);

router.delete('/todo/:todo_id',
  [
    validateAccessToken,
  ],
  deleteTodo,
);

module.exports = router