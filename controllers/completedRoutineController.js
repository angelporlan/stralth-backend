const CompletedRoutine = require('../models/CompletedRoutine');
const Routine = require('../models/Routine');

exports.completeRoutine = async (req, res) => {
  const { exercises } = req.body;
  const userId = req.user._id;
  const routineId = req.params.id;

  try {
    const routine = await Routine.findById(routineId);

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    const completedRoutine = new CompletedRoutine({
      user: userId,
      routine: routineId,
      exercises: exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets.map(set => ({
          weight: set.weight,
          reps: set.reps,
        })),
      })),
    });

    await completedRoutine.save();

    res.status(201).json(completedRoutine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompletedRoutines = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const completedRoutines = await CompletedRoutine.find({ user: userId }).populate('routine');
  
      res.json(completedRoutines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.deleteCompletedRoutine = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCompletedRoutine = await CompletedRoutine.findByIdAndDelete(id);
      if (!deletedCompletedRoutine) {
        return res.status(404).json({ message: 'Completed routine not found' });
      }
  
      res.json(deletedCompletedRoutine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
