const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const EtudiantRoutes = require('../Routes/etudiants');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/etudiants', EtudiantRoutes);

let isConnected = false;

async function connectToDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

app.use(async (req, res, next) => {
  await connectToDB();
  next();
});

module.exports = serverless(app);
