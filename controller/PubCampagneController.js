// controllers/PubCampagneController.js
const db = require('../config/dbconfig');

// Accocier une campagne et une pub
exports.addPubCampagne = (req, res) => {
    const { campagne_id, publicite_id } = req.body;
    const sql = 'INSERT INTO pub_campagne (campagne_id, publicite_id) VALUES (?, ?)';
    
    db.query(sql, [campagne_id, publicite_id], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'association des données:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.status(201).json({ message: "Association effectuée avec succès", id: result.insertId });
    });
};

// Récupérer une association campagne et pub par ID
exports.getPubCampagneById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM pub_campagne WHERE campagne_id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des pubs associées", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Données non trouvées" });
        }
        res.json(result[0]);
    });
};

// Supprimer une campagne active
exports.deletePubCampagne = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM pub_campagne WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression des pubs associées :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pub associée non trouvée" });
        }
        res.json({ message: "pub associée supprimée avec succès" });
    });
};
