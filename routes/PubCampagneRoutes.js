const express = require('express');
const router = express.Router();
const PubCampagneController = require('../controller/PubCampagneController');
const authenticateToken = require('../middleware/authMiddleware');


// Ajouter une pub à une campagne
router.post('/add', authenticateToken, PubCampagneController.addPubCampagne);

// Récupérer une pub associée à une campagne par ID
router.get('/get/:id', authenticateToken, PubCampagneController.getPubCampagneById);

// Supprimer une association Pub et Campagne
router.delete('/delete/:id', authenticateToken, PubCampagneController.deleteCampagneActive);

module.exports = router;
