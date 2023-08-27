const mongoose = require('mongoose');
const User = require('./User')

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;
