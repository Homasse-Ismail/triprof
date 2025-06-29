const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express()
const PORT = 6000;
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://root:root@cluster0-shard-00-00.qx1gf.mongodb.net:27017,cluster0-shard-00-01.qx1gf.mongodb.net:27017,cluster0-shard-00-02.qx1gf.mongodb.net:27017/TriProf?ssl=true&replicaSet=atlas-12tepc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));



const EtudiantRoutes = require('./Routes/etudiants');
app.use('/api/etudiants',EtudiantRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})