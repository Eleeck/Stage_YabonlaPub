const express = require('express');
const router = express.Router();
const campagneActiveController = require('../controller/campagneActiveController');
const authenticateToken = require('../middleware/authMiddleware');


// Ajouter une campagne active
router.post('/ajout_campagne_active', authenticateToken ,campagneActiveController.addCampagneActive);

// Récupérer toutes les campagnes actives
router.get('/select_campagnes_actives', authenticateToken,campagneActiveController.getAllCampagnesActives);

// Récupérer une campagne active par ID
router.get('/select_campagne_active/:id', authenticateToken,campagneActiveController.getCampagneActiveById);

// Modifier le statut d'une campagne active
router.put('/change_campagne_active/:id', authenticateToken,campagneActiveController.updateCampagneActive);

// Supprimer une campagne active
router.delete('/supprime_campagne_active/:id', authenticateToken,campagneActiveController.deleteCampagneActive);

// Récupérer uniquement les campagnes actives
router.get('/select_campagnes_actives/status_active', authenticateToken,campagneActiveController.getOnlyActiveCampagnes);


module.exports = router;
