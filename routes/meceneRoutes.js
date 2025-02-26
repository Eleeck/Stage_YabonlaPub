// routes/meceneRoutes.js

const express = require('express');
const router = express.Router();
const meceneController = require('../controller/meceneController');
const authenticateToken = require('../middleware/authMiddleware');
const validEmailFormat = require('../middleware/validationMiddleware');

// Ajouter un mécène
router.post('/add', authenticateToken, validEmailFormat, meceneController.addMecene);

// Consulter un mécène
router.get('/get/:id_mecene', authenticateToken, meceneController.getMecene);

// Modifier un mécène
router.put('/update/:id_mecene', authenticateToken, meceneController.updateMecene);

// Supprimer un mécène
router.delete('/delete/:id_mecene', authenticateToken,meceneController.deleteMecene);

module.exports = router;
