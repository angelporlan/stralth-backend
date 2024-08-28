const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const routineRoutes = require('./routes/routineRoutes');
const completedRoutineRoutes = require('./routes/completedRoutineRoutes');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running... 🚀');
});

app.use('/api/users', userRoutes);  
app.use('/api/routines', routineRoutes); 
app.use('/api/completed-routines', completedRoutineRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
