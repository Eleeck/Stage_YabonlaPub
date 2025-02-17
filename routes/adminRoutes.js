// adminRoutes
const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @route   POST /admin/create_account
 * @desc    Seul un admin connecté peut créer un autre administrateur
 * @access  Privé (Admin uniquement)
 */
router.post('/create_account', authenticateToken, adminController.addAdmin);

/**
 * @route   POST /admin/login
 * @desc    Connexion admin et génération d'un token JWT
 * @access  Public
 */
router.post('/login', adminController.loginAdmin);

/**
 * @route   GET /admin/account/:id_admin
 * @desc    Récupérer les infos d'un administrateur
 * @access  Privé (Admin uniquement)
 */
router.get('/account/:id_admin', authenticateToken, adminController.getAdmin);

module.exports = router;
