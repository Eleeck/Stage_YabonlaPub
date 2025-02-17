// controllers/campagneActiveController.js
const db = require('../config/dbconfig');

// Ajouter une campagne active
exports.addCampagneActive = (req, res) => {
    const { campagne_id, publicite_id } = req.body;
    const sql = 'INSERT INTO campagne_active (campagne_id, publicite_id) VALUES (?, ?)';
    
    db.query(sql, [campagne_id, publicite_id], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'ajout de la campagne active:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.status(201).json({ message: "Campagne active ajoutée avec succès", id: result.insertId });
    });
};

// Récupérer toutes les campagnes actives
exports.getAllCampagnesActives = (req, res) => {
    const sql = 'SELECT * FROM campagne_active WHERE status = "active"';
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des campagnes actives:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json(result);
    });
};

// Récupérer une campagne active par ID
exports.getCampagneActiveById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM campagne_active WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de la campagne active:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Campagne active non trouvée" });
        }
        res.json(result[0]);
    });
};

// Récupérer toutes les campagnes actives avec le statut "active"
exports.getOnlyActiveCampagnes = (req, res) => {
    const sql = 'SELECT * FROM campagne_active WHERE status = "active"';

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des campagnes actives:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json(result);
    });
};


// Modifier le statut d'une campagne active
exports.updateCampagneActive = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const sql = 'UPDATE campagne_active SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de la campagne active:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Campagne active non trouvée" });
        }
        res.json({ message: "Statut de la campagne active mis à jour avec succès" });
    });
};

// Supprimer une campagne active
exports.deleteCampagneActive = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM campagne_active WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de la campagne active:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Campagne active non trouvée" });
        }
        res.json({ message: "Campagne active supprimée avec succès" });
    });
};
