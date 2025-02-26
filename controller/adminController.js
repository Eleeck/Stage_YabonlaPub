const db = require('../config/dbconfig'); // Connexion à MySQL
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginSchema = require('../Schema/adminSchema');

/**
 * @route   POST /admin/login
 * @desc    Connexion admin et génération d'un token JWT
 * @access  Public
 */
exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    // Validation avec schéma
    const { error } = loginSchema.validate({ email, password });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const sql = 'SELECT * FROM admins WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        console.log(results)
        if (err) {
            console.error('Erreur lors de l\'authentification:', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        // Vérifier si l'utilisateur existe dans la table admins
        if (results.length === 0) {
            return res.status(401).json({ message: 'Seul un administrateur peut se connecter ici' });
        }

        const admin = results[0];
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { 
                id_admin: admin.id_admin, 
                email: admin.email 
            },
            process.env.JWT_SECRET_KEY,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN 
            }
        );

        res.status(200).json({ message: 'Authentification réussie', token });
    });
};

/**
 * @route   POST /admin/create_account
 * @desc    Seul un admin peut créer un autre admin
 * @access  Privé (Admin uniquement)
 */
// exports.addAdmin = (req, res) => {
//     const {nom, prenom, email, password } = req.body;
//     console.log("Corps de la requête:", req.body)

//     // Hashage du mot de passe
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//         if (err) {
//             console.error('Erreur de hashage du mot de passe:', err);
//             return res.status(500).json({ message: 'Erreur serveur' });
//         }

//         const sql = 'INSERT INTO admins (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
//         db.query(sql, [nom, prenom, email, hashedPassword], (err, result) => {
//             if (err) {
//                 console.error('Erreur lors de la création de l\'admin:', err);
//                 return res.status(500).json({ message: 'Erreur serveur' });
//             }

//             res.status(201).json({ message: 'Administrateur créé avec succès' });
//         });
//     });
// };

/**
 * @route   GET /admin/account/:id_admin
 * @desc    Récupérer les infos d'un admin 
 * @access  Privé
 */
exports.getAdmin = (req, res) => {
    const { id_admin } = req.params;
    const sql = 'SELECT id_admin,nom, prenom, email FROM admins WHERE id_admin = ?';
    db.query(sql, [id_admin], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations:', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }

        res.status(200).json(results[0]);
    });
};