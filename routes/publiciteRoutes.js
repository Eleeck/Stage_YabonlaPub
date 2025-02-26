const express = require('express');
const router = express.Router();
const publiciteController = require('../controller/publiciteController');
const authenticateToken = require('../middleware/authMiddleware');

// Ajouter une publicité
router.post('/add', authenticateToken,publiciteController.addPublicite);

// Consulter une publicité par ID
router.get('/get/:id_pub', authenticateToken,publiciteController.getPublicite);

// Modifier une publicité
router.put('/update/:id_pub',authenticateToken, publiciteController.updatePublicite);

// Supprimer une publicité
router.delete('/delete/:id_pub', authenticateToken, publiciteController.deletePublicite);

module.exports = router;
