const express = require('express');
const router = express.Router();
const campagneController = require('../controller/campagneController');
const authenticateToken = require('../middleware/authMiddleware');

// Ajouter une campagne
router.post('/ajout_campagne', authenticateToken,campagneController.addCampagne);

// Consulter une campagne
router.get('/select_campagne/:id_campagne', authenticateToken,campagneController.getCampagne);

// Modifier une campagne
router.put('/change-campagne/:id_campagne', authenticateToken,campagneController.updateCampagne);

// Supprimer une campagne
router.delete('/supprime_campagne/:id_campagne', authenticateToken,campagneController.deleteCampagne);

module.exports = router;
