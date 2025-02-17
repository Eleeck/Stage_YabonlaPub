const { body, validationResult } = require('express-validator');

// Middleware pour valider les données de requêtes
const validateRequest = [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 12 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRequest;
