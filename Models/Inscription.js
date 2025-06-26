const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const inscriptionSchema = new Schema({
    etudiant: { type: Schema.Types.ObjectId, ref: 'Etudiant', required: true },
    matiere: { type: Schema.Types.ObjectId, ref: 'Matiere', required: true },
    date_inscription: { type: Date, default: Date.now }
  });
module.exports = mongoose.model('Inscription', inscriptionSchema);