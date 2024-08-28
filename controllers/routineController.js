const Routine = require('../models/Routine');
const CompletedRoutine = require('../models/CompletedRoutine');

const createRoutine = async (req, res) => {
    const { name, exercises } = req.body;

    try {
        const routine = new Routine({
            user: req.user._id,  
            name,
            exercises,
        });

        const createdRoutine = await routine.save();  
        res.status(201).json(createdRoutine);  
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la rutina', error });
    }
};

const getRoutines = async (req, res) => {
    try {
        const routines = await Routine.find({ user: req.user._id });  
        res.json(routines); 
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las rutinas', error });
    }
};

const deleteRoutine = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRoutine = await Routine.findByIdAndDelete(id);
        if (!deletedRoutine) {
            return res.status(404).json({ message: 'Rutina no encontrada' });
        }

        await CompletedRoutine.deleteMany({ routine: id });

        res.json(deletedRoutine);
    } catch (error) {
        res.status(400).json({ message: 'Error al borrar la rutina', error });
    }
};

const getRoutineById = async (req, res) => {
    const { id } = req.params;

    try {
        const routine = await Routine.findOne({ _id: id, user: req.user._id });
        if (!routine) {
            return res.status(404).json({ message: 'Rutina no encontrada' });
        }

        res.json(routine);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener la rutina', error });
    }
};




module.exports = { createRoutine, getRoutines, deleteRoutine, getRoutineById };
