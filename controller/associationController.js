// controllers/associationController.js
const db = require('../config/dbconfig');
const associationValidation = require('../Schema/associationSchema');

// Ajouter une association
const addAssociation = (req, res) => {
    const { nom, description, adresse, site_web } = req.body;
    // Validation des données
    const { error } = associationValidation.validate({ nom, description, adresse, site_web }, { presence: 'required' });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const sql = 'INSERT INTO associations (nom, description, adresse, site_web) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, description, adresse, site_web], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'association:', err);
            return res.status(500).send('Erreur serveur');
        }
        res.status(201).send('Association ajoutée avec succès');
    });
};

// Consulter une association
const getAssociation = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM associations WHERE id_assoc = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la consultation de l\'association:', err);
            return res.status(500).send('Erreur serveur');
        }
        if (results.length === 0) {
            return res.status(404).send('Association non trouvée');
        }
        res.status(200).json(results[0]);
    });
};

// Modifier association 
const updateAssociation = (req, res) => {
    const { id } = req.params;
    const { nom, description, adresse, site_web } = req.body;

    // Validation des données
    if (!nom && !description && !adresse && !site_web) {
        return res.status(400).send('Aucune donnée fournie pour la mise à jour');
    }

    const { error } = associationValidation.validate({ nom, description, adresse, site_web });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Requête SQL pour obtenir les données actuelles de l'association
    const selectSql = 'SELECT * FROM associations WHERE id_assoc = ?';
    db.query(selectSql, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'association:', err);
            return res.status(500).send('Erreur serveur');
        }
        if (results.length === 0) {
            return res.status(404).send('Association non trouvée');
        }

        // Construction de la requête de mise à jour dynamique
        const fields = [];
        const values = [];

        // Ajouter uniquement les champs modifiés
        if (nom) {
            fields.push('nom = ?');
            values.push(nom);
        }
        if (description) {
            fields.push('description = ?');
            values.push(description);
        }
        if (adresse) {
            fields.push('adresse = ?');
            values.push(adresse);
        }
        if (site_web) {
            fields.push('site_web = ?');
            values.push(site_web);
        }

        // Ajouter l'ID à la fin des valeurs
        values.push(id);

        // Si aucun champ n'est passé pour mise à jour
        if (fields.length === 0) {
            return res.status(400).send('Aucune modification détectée');
        }

        // Requête SQL de mise à jour
        const updateSql = `UPDATE associations SET ${fields.join(', ')} WHERE id_assoc = ?`;
        db.query(updateSql, values, (updateErr, result) => {
            if (updateErr) {
                console.error('Erreur lors de la modification de l\'association:', updateErr);
                return res.status(500).send('Erreur serveur');
            }
            res.status(200).send('Association modifiée avec succès');
        });
    });
};


// Supprimer une association
const deleteAssociation = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM associations WHERE id_assoc = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'association:', err);
            return res.status(500).send('Erreur serveur');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Association non trouvée');
        }
        res.status(200).send('Association supprimée avec succès');
    });
};

module.exports = {
    addAssociation,
    getAssociation,
    updateAssociation,
    deleteAssociation
};
