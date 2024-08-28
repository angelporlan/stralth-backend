const express = require('express');
const { createRoutine, getRoutines, deleteRoutine, getRoutineById } = require('../controllers/routineController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createRoutine);

router.route('/').get(protect, getRoutines);

router.route('/:id').delete(protect, deleteRoutine);

router.route('/:id').get(protect, getRoutineById);


module.exports = router;
