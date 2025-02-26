const db = require('../config/dbconfig');
const campagneSchema = require('../Schema/campagneSchema'); // Importation du schéma

// Ajouter une campagne
exports.addCampagne = (req, res) => {

    const { error, value } = campagneSchema.validate(req.body);

    if (error) {
        return res.status(400).send(`Erreur de validation: ${error.details[0].message}`);
    }
    const { nom, description, date_debut, date_fin} = req.body;
    const sql = 'INSERT INTO campagnes (nom, description, date_debut, date_fin) VALUES (?,?,?,?)';
    db.query(sql, [nom, description, date_debut, date_fin], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de la campagne:', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.status(201).send('Campagne ajoutée avec succès');
    });
};


// Récupérer toutes les campagnes actives avec le statut "active"
exports.getOnlyActiveCampagnes = (req, res) => {
    const sql = 'SELECT * FROM campagnes WHERE status = 1 ';

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des campagnes actives:", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json(result);
    });
};

// Consulter une campagne
exports.getCampagne = (req, res) => {
    const { id_campagne } = req.params;
    const sql = 'SELECT * FROM campagnes WHERE id_campagne = ?';
    db.query(sql, [id_campagne], (err, results) => {
        if (err) {
            console.error('Erreur lors de la consultation de la campagne:', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        if (results.length === 0) {
            return res.status(404).send('Campagne non trouvée');
        }
        res.status(200).send(results[0]);
    });
};

// Récupérer toutes les campagnes
exports.getAllCampagnes = (req, res) => {
    const sql = 'SELECT * FROM campagnes';
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des campagnes :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json(result);
    });
};

// Modifier une campagne
exports.updateCampagne = (req, res) => {
    const { id_campagne } = req.params;
    const updates = req.body;

    // Vérifier si des données ont été envoyées
    if (Object.keys(updates).length === 0) {
        return res.status(400).send('Aucune information à mettre à jour');
    }

    // Récupérer les données actuelles de la campagne
    const getCurrentSql = 'SELECT * FROM campagnes WHERE id_campagne = ?';
    db.query(getCurrentSql, [id_campagne], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données:', err);
            return res.status(500).send('Erreur serveur');
        }

        if (results.length === 0) {
            return res.status(404).send('Campagne non trouvée');
        }

        // Fusionner les nouvelles valeurs avec celles existantes
        const currentData = results[0];
        const newData = {
            titre: updates.nom || currentData.nom,
            description: updates.description || currentData.description,
            date_debut: updates.date_debut || currentData.date_debut,
            date_fin: updates.date_fin || currentData.date_fin,
            status: updates.status || currentData.status
        };

        // Construire la requête SQL dynamiquement
        const sql = 'UPDATE campagnes SET nom = ?, description = ?, date_debut = ?, date_fin = ?, status = ? WHERE id_campagne = ?';
        db.query(sql, [newData.titre, newData.description, newData.date_debut, newData.date_fin, newData.status, id_campagne], (err, result) => {
            if (err) {
                // console.error('Erreur lors de la modification de la campagne:', err); 
                return res.status(500).send('Erreur serveur');
            }

            res.status(200).send('Campagne modifiée avec succès');
        });
    });
};

// Supprimer une campagne
exports.deleteCampagne = (req, res) => {
    const { id_campagne } = req.params;
    const sql = 'DELETE FROM campagnes WHERE id_campagne = ?';
    db.query(sql, [id_campagne], (err, result) => {
        if (err) {
            // console.error('Erreur lors de la suppression de la campagne:', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Campagne non trouvée');
        }
        res.status(200).send('Campagne supprimée avec succès');
    });
};
