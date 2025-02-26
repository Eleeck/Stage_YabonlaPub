const express = require('express');
const router = express.Router();
const campagneController = require('../controller/campagneController');
const PubCampagneController = require('../controller/PubCampagneController')
const authenticateToken = require('../middleware/authMiddleware');

// Ajouter une campagne
router.post('/add', authenticateToken,campagneController.addCampagne);

// Récupérer uniquement les campagnes actives
router.get('/get', authenticateToken,campagneController.getAllCampagnes);

// Récupérer uniquement les campagnes actives
router.get('/get/active', authenticateToken,campagneController.getOnlyActiveCampagnes);

// Consulter une campagne
router.get('/get/:id_campagne', authenticateToken,campagneController.getCampagne);

// Modifier une campagne
router.put('/update/:id_campagne', authenticateToken,campagneController.updateCampagne);

// Supprimer une campagne
router.delete('/delete/:id_campagne', authenticateToken,campagneController.deleteCampagne);

// Ajouter une pub à une campagne
router.post('/ad/add', authenticateToken, PubCampagneController.addPubCampagne);

// Récupérer une pub associée à une campagne par ID
router.get('/ad/get/:id', authenticateToken, PubCampagneController.getPubCampagneById);

// Supprimer une association Pub et Campagne
router.delete('/ad/delete/:id', authenticateToken, PubCampagneController.deletePubCampagne);


module.exports = router;
