const express = require('express');
const router = express.Router();
const Etudiant = require('../Models/Etudiant');

// GET tous les étudiants
router.get('/', async (req, res) => {
  try {
    const etudiants = await Etudiant.find();
    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getEtudiant, (req, res) => {
  res.json(res.etudiant);
});

// POST créer un étudiant
router.post('/', async (req, res) => {
  const etudiant = new Etudiant({
    nom: req.body.nom,
    phone: req.body.phone,
    niveau: req.body.niveau
  });

  try {
    const newEtudiant = await etudiant.save();
    res.status(201).json(newEtudiant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT modifier un étudiant
router.put('/:id', getEtudiant, async (req, res) => {
  if (req.body.nom != null) {
    res.etudiant.nom = req.body.nom;
  }
  if (req.body.phone != null) {
    res.etudiant.phone = req.body.phone;
  }
  if (req.body.niveau != null) {
    res.etudiant.niveau = req.body.niveau;
  }

  try {
    const updatedEtudiant = await res.etudiant.save();
    res.json(updatedEtudiant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer un étudiant
router.delete('/:id', getEtudiant, async (req, res) => {
  try {
    await res.etudiant.remove();
    res.json({ message: 'Étudiant supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour récupérer un étudiant par ID
async function getEtudiant(req, res, next) {
  let etudiant;
  try {
    etudiant = await Etudiant.findById(req.params.id);
    if (etudiant == null) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.etudiant = etudiant;
  next();
}

module.exports = router;