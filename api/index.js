const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');

const EtudiantRoutes = require('../Routes/etudiants');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/etudiants', EtudiantRoutes);

// Connect to MongoDB (only once)
let isConnected = false;

const connectToDB = async () => {
  if (isConnected) return;
  await mongoose.connect('mongodb://root:root@cluster0-shard-00-00.qx1gf.mongodb.net:27017,cluster0-shard-00-01.qx1gf.mongodb.net:27017,cluster0-shard-00-02.qx1gf.mongodb.net:27017/TriProf?ssl=true&replicaSet=atlas-12tepc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
  isConnected = true;
};

app.use(async (req, res, next) => {
  await connectToDB();
  next();
});

// Export handler for Vercel
module.exports = serverless(app);
