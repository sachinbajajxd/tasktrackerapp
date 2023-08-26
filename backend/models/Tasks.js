const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    requires: true
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
