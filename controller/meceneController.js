// meceneController
const db = require('../config/dbconfig');

exports.addMecene = (req, res) => {
    const { nom, email, telephone, adresse } = req.body;

    // Log des informations reçues
    console.log('Données reçues :', { nom, email, telephone, adresse });

    // Validation des champs
    if (!nom || !email) {
        return res.status(400).send('Le nom et l\'email sont obligatoires');
    }

    const sql = 'INSERT INTO mecenes (nom_mecene, email, telephone, adresse) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, email, telephone || null, adresse || null], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du mécène:', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.status(201).send('Mécène ajouté avec succès');
    });
};


// Consulter un mécène
exports.getMecene = (req, res) => {
    const { id_mecene } = req.params;
    console.log(`Recherche du mécène avec ID : ${id_mecene}`);
    const sql = 'SELECT id_mecene, nom_mecene, email, telephone, adresse FROM mecenes WHERE id_mecene = ?';
    db.query(sql, [id_mecene], (err, results) => {
        if (err) {
            console.error('Erreur lors de la consultation du mécène:', err.message);  // Afficher le message d'erreur complet
            res.status(500).send('Erreur serveur');
            return;
        }
        if (results.length === 0) {
            console.log('Aucun mécène trouvé');
            res.status(404).send('Mécène non trouvé');
            return;
        }
        // console.log('Mécène trouvé:', results[0]);
        res.status(200).send(results[0]);
    });
};


// Modifier un mécène
exports.updateMecene = (req, res) => {
    const { id_mecene } = req.params;
    const updates = req.body;

    // Vérifier si des données ont été envoyées
    if (Object.keys(updates).length === 0) {
        return res.status(400).send('Aucune information à mettre à jour');
    }

    // Vérifier le format de l'adresse email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (updates.email && !emailRegex.test(updates.email)) {
        return res.status(400).send('Adresse email invalide');
    }

    // Récupérer les valeurs actuelles du mécène
    const getCurrentSql = 'SELECT * FROM mecenes WHERE id_mecene = ?';
    db.query(getCurrentSql, [id_mecene], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données:', err);
            return res.status(500).send('Erreur serveur');
        }

        if (results.length === 0) {
            return res.status(404).send('Mécène non trouvé');
        }

        // Fusionner les nouvelles valeurs avec celles existantes
        const currentData = results[0];
        const newData = {
            nom_mecene: updates.nom_mecene || currentData.nom_mecene,
            email: updates.email || currentData.email,
            telephone: updates.telephone || currentData.telephone,
            adresse: updates.adresse || currentData.adresse
        };

        // Construire la requête SQL dynamiquement
        const sql = 'UPDATE mecenes SET nom_mecene = ?, email = ?, telephone = ?, adresse = ? WHERE id_mecene = ?';
        db.query(sql, [newData.nom_mecene, newData.email, newData.telephone, newData.adresse, id_mecene], (err, result) => {
            if (err) {
                console.error('Erreur lors de la modification du mécène:', err);
                return res.status(500).send('Erreur serveur');
            }

            res.status(200).send('Mécène modifié avec succès');
        });
    });
};


// Supprimer un mécène
exports.deleteMecene = (req, res) => {
    const { id_mecene } = req.params;

    // Validation que id_mecene est un nombre
    if (isNaN(id_mecene)) {
        return res.status(400).send('L\'ID du mécène doit être un nombre');
    }

    const sql = 'DELETE FROM mecenes WHERE id_mecene = ?';
    db.query(sql, [id_mecene], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du mécène:', err.message);
            res.status(500).send('Erreur serveur');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Mécène non trouvé');
            return;
        }
        res.status(200).send('Mécène supprimé avec succès');
    });
};
