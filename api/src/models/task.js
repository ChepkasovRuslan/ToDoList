const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

module.exports = Task = mongoose.model('tasks', taskSchema);