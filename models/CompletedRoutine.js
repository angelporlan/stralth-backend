const mongoose = require('mongoose');

const completedRoutineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  routine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Routine',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      name: { type: String, required: true },
      sets: [
        {
          weight: { type: Number, required: true },
          reps: { type: Number, required: true },
        },
      ],
    },
  ],
});

const CompletedRoutine = mongoose.model('CompletedRoutine', completedRoutineSchema);

module.exports = CompletedRoutine;
