// routes/associationRoutes.js
const express = require('express');
const router = express.Router();
const associationController = require('../controller/associationController');
const authenticateToken = require('../middleware/authMiddleware');


// Ajouter une association
router.post('/ajout_assoc', authenticateToken, associationController.addAssociation);

// Consulter une association
router.get('/select_assoc/:id', authenticateToken, associationController.getAssociation);

// Modifier une association
router.put('/change/:id', authenticateToken, associationController.updateAssociation);

// Supprimer une association
router.delete('/supprimer/:id', authenticateToken, associationController.deleteAssociation);

module.exports = router;
