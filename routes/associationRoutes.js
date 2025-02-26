// routes/associationRoutes.js
const express = require('express');
const router = express.Router();
const associationController = require('../controller/associationController');
const authenticateToken = require('../middleware/authMiddleware');


// Ajouter une association
router.post('/add', authenticateToken, associationController.addAssociation);

// Consulter une association
router.get('/get/:id', authenticateToken, associationController.getAssociation);

// Modifier une association
router.put('/update/:id', authenticateToken, associationController.updateAssociation);

// Supprimer une association
router.delete('/delete/:id', authenticateToken, associationController.deleteAssociation);

module.exports = router;
