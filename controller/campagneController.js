const db = require('../config/dbconfig');

// Ajouter une campagne
exports.addCampagne = (req, res) => {
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
            date_fin: updates.date_fin || currentData.date_fin
        };

        // Construire la requête SQL dynamiquement
        const sql = 'UPDATE campagnes SET nom = ?, description = ?, date_debut = ?, date_fin = ? WHERE id_campagne = ?';
        db.query(sql, [newData.titre, newData.description, newData.date_debut, newData.date_fin, id_campagne], (err, result) => {
            if (err) {
                console.error('Erreur lors de la modification de la campagne:', err);
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
            console.error('Erreur lors de la suppression de la campagne:', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Campagne non trouvée');
        }
        res.status(200).send('Campagne supprimée avec succès');
    });
};
