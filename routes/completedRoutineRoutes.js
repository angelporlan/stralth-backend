const express = require('express');
const { completeRoutine, getCompletedRoutines, deleteCompletedRoutine } = require('../controllers/CompletedRoutineController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:id/complete', protect, completeRoutine);

router.route('/').get(protect, getCompletedRoutines);

router.route('/:id').delete(protect, deleteCompletedRoutine);

module.exports = router;
