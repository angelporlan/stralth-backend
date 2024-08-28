const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  exercises: {
    type: [String],
    required: true,
  }
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
