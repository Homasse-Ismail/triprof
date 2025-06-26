const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const professeurSchema = new Schema({
    nom: { type: String, required: true },
    phone: { type: String, required: true },
    pourcentage: { type: Number, required: true }
  });
  
module.exports = mongoose.model('Professeur', professeurSchema);