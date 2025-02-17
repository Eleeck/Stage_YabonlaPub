// routes/meceneRoutes.js

const express = require('express');
const router = express.Router();
const meceneController = require('../controller/meceneController');
const authenticateToken = require('../middleware/authMiddleware');

// Ajouter un mécène
router.post('/ajout_mecene', authenticateToken,meceneController.addMecene);

// Consulter un mécène
router.get('/select/:id_mecene', authenticateToken,meceneController.getMecene);

// Modifier un mécène
router.put('/change/:id_mecene', authenticateToken,meceneController.updateMecene);

// Supprimer un mécène
router.delete('/supprimer/:id_mecene', authenticateToken,meceneController.deleteMecene);

module.exports = router;
