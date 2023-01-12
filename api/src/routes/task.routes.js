const express = require("express");

const router = express.Router();

const {
  getTask,
  getTasks,
  createOneTask,
  patchTaskText,
  patchTaskCompleted,
  deleteTask,
  deleteTasks
} = require('../controllers/task.controller');

router.get('/tasks/:id', getTask);
router.get('/tasks', getTasks);
router.post('/tasks', createOneTask);
router.patch('/tasks/text/:id', patchTaskText);
router.patch('/tasks/completed/:id', patchTaskCompleted);
router.delete('/tasks/:id', deleteTask);
router.delete('/tasks', deleteTasks);

module.exports = router;