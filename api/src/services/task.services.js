const Task = require("../models/task");

const getTaskById = async id => {
  const task = await Task.findById(id);

  return task;
};

const getAllTasks = async () => {
  const allTasks = await Task.find();

  return allTasks;
};

const createTask = async body => {
  const newTask = new Task(body);
  const savedTask = await newTask.save();

  return savedTask;
};

const updateTaskText = async (id, text) => {
  const updatedTask = await Task.findByIdAndUpdate(id, { text: text });

  return updatedTask;
};

const updateTaskCompleted = async (id) => {
  const task = await Task.findById(id);
  task.isCompleted = !task.isCompleted;
  await task.save();

  return task;
};

const deleteTaskById = async id => {
  const deletedTask = await Task.findByIdAndDelete(id);

  return deletedTask;
};

const deleteAllTasks = async () => {
  const deletedTasks = await Task.deleteMany({});

  return deletedTasks;
};

module.exports = {
  getTaskById,
  getAllTasks,
  createTask,
  updateTaskText,
  updateTaskCompleted,
  deleteTaskById,
  deleteAllTasks
};