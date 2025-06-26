const matiereSchema = new Schema({
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    niveau: { type: String, required: true },
    professeurs: [{ type: Schema.Types.ObjectId, ref: 'Professeur' }]
  });
  
module.exports = mongoose.model('Matiere', matiereSchema);