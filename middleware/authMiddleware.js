const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // 🔍 Voir les headers pour debug
    console.log("Headers reçus :", req.headers); 

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Accès refusé : Aucun header Authorization fourni' });
    }

    // 💡 Vérifie que le header est bien au format "Bearer <token>"
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Format du token invalide. Utilisez : Bearer <token>' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé : Aucun token trouvé après Bearer' });
    }

    // ✅ Vérifie le token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Erreur de vérification du token :', err.message);
            return res.status(403).json({ message: 'Accès interdit : Token invalide ou expiré' });
        }

        req.user = user; // Données du token stockées dans req.user
        next();
    });
};

module.exports = authenticateToken;
