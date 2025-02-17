const express = require('express');
const router = express.Router();
const publiciteController = require('../controller/publiciteController');
const authenticateToken = require('../middleware/authMiddleware');

// Ajouter une publicité
router.post('/ajout_pub', authenticateToken,publiciteController.addPublicite);

// Consulter une publicité par ID
router.get('/select_pub/:id_pub', authenticateToken,publiciteController.getPublicite);

// Modifier une publicité
router.put('/change_pub/:id_pub',authenticateToken, publiciteController.updatePublicite);

// Supprimer une publicité
router.delete('/supprimer_pub/:id_pub', authenticateToken, publiciteController.deletePublicite);

module.exports = router;
