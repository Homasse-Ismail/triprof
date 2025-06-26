const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const etudiantSchema = new Schema({
    nom: { type: String, required: true },
    phone: { type: String, required: true },
    niveau: { type: String, required: true }
  });
module.exports = mongoose.model('Etudiant', etudiantSchema);