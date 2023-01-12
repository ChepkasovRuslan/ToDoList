const { PORT, DB_CONNECTION } = require('./config')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./src/routes/task.routes');

const app = express();

const loadApp = async () => {
  try {
    mongoose.set('strictQuery', false);

    app.use(express.json());
    app.use('/', apiRoutes);
    app.use(cors());

    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log('To-Do API listening on port 8000');
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

loadApp();