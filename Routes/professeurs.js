const express = require('express');
const router = express.Router();
const Professeur = require('../models/Professeur');

// GET tous les professeurs
router.get('/', async (req, res) => {
  try {
    const professeurs = await Professeur.find().populate('matieres');
    res.json(professeurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un professeur par ID
router.get('/:id', getProfesseur, (req, res) => {
  res.json(res.professeur);
});

// POST créer un professeur
router.post('/', async (req, res) => {
  const professeur = new Professeur({
    nom: req.body.nom,
    phone: req.body.phone,
    pourcentage: req.body.pourcentage
  });

  try {
    const newProfesseur = await professeur.save();
    res.status(201).json(newProfesseur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT modifier un professeur
router.put('/:id', getProfesseur, async (req, res) => {
  if (req.body.nom != null) {
    res.professeur.nom = req.body.nom;
  }
  if (req.body.phone != null) {
    res.professeur.phone = req.body.phone;
  }
  if (req.body.pourcentage != null) {
    res.professeur.pourcentage = req.body.pourcentage;
  }

  try {
    const updatedProfesseur = await res.professeur.save();
    res.json(updatedProfesseur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer un professeur
router.delete('/:id', getProfesseur, async (req, res) => {
  try {
    await res.professeur.remove();
    res.json({ message: 'Professeur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour récupérer un professeur par ID
async function getProfesseur(req, res, next) {
  let professeur;
  try {
    professeur = await Professeur.findById(req.params.id).populate('matieres');
    if (professeur == null) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.professeur = professeur;
  next();
}

module.exports = router;