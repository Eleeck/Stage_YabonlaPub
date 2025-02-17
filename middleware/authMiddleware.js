// authMiddleware
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log("Headers reçus :", req.headers); // DEBUG
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Accès refusé : Aucun token fourni' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Accès interdit : Token invalide' });

        req.user = user; // Ajout des infos de l'utilisateur à la requête
        next(); 
    });
};

module.exports = authenticateToken;
