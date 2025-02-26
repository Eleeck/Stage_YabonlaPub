const extractToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Supposons que le token soit envoyé dans l'en-tête au format "Bearer <token>"
        req.token = token;
    } else {
        return res.status(401).json({ error: "Token manquant" });
    }
    next();
};
