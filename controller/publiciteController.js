const db = require('../config/dbconfig');

// Ajouter une publicité
exports.addPublicite = (req, res) => {
    const { titre, descriptif } = req.body; // Harmonisation avec la base de données

    if (!titre || !descriptif) {
        return res.status(400).json({ error: "Le titre et la description sont obligatoires." });
    }

    const sql = 'INSERT INTO publicites (titre, descriptif) VALUES (?, ?)';
    db.query(sql, [titre, descriptif], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de la publicité:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(201).json({ message: 'Publicité ajoutée avec succès', id: result.insertId });
    });
};

// Consulter une publicité
exports.getPublicite = (req, res) => {
    const { id_pub } = req.params;
    const sql = 'SELECT * FROM publicites WHERE id_pub = ?';

    db.query(sql, [id_pub], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de la publicité:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Publicité non trouvée' });
        }
        res.json(result[0]);
    });
};

// Modifier une publicité
exports.updatePublicite = (req, res) => {
    const { id_pub } = req.params;
    const { titre, descriptif } = req.body; // Harmonisation des noms

    if (!titre && !descriptif) {
        return res.status(400).json({ error: "Au moins un champ (titre ou description) doit être fourni." });
    }

    // Construction dynamique de la requête SQL
    let sql = 'UPDATE publicites SET ';
    const values = [];
    
    if (titre) {
        sql += 'titre = ?, ';
        values.push(titre);
    }
    if (descriptif) {
        sql += 'descriptif = ?, ';
        values.push(descriptif);
    }

    sql = sql.slice(0, -2) + ' WHERE id_pub = ?'; // Supprime la dernière virgule et ajoute la condition WHERE
    values.push(id_pub);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la modification de la publicité:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Publicité non trouvée' });
        }
        res.json({ message: 'Publicité mise à jour avec succès' });
    });
};

// Supprimer une publicité
exports.deletePublicite = (req, res) => {
    const { id_pub } = req.params;
    const sql = 'DELETE FROM publicites WHERE id_pub = ?';

    db.query(sql, [id_pub], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la publicité:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Publicité non trouvée' });
        }
        res.json({ message: 'Publicité supprimée avec succès' });
    });
};
