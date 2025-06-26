const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const EtudiantRoutes = require('../Routes/etudiants');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ربط MongoDB باستخدام متغير بيئي
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// routes
app.use('/api/etudiants', EtudiantRoutes);

module.exports = serverless(app);
