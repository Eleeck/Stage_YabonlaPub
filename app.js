// app.js 
const express = require('express');
require('dotenv').config(); // Charger les variables d'environnement
const cors = require('cors'); // Permet les requêtes externes
const db = require('./config/dbconfig');
const bodyParser = require('body-parser');

const routes = require('./routes'); // Import centralisé des routes

const app = express();

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Activer CORS pour permettre les requêtes depuis d'autres origines 
app.use(cors());

// Logger pour voir le mode en cours
console.log(`🌍 Mode actuel : ${process.env.NODE_ENV || 'development'}`);

// Utilisation des routes
app.use('/admins', routes.adminRoutes);
app.use('/admins/associations', routes.associationRoutes);
app.use('/admins/mecenes', routes.meceneRoutes);
app.use('/admins/publicites', routes.publiciteRoutes);
app.use('/admins/campagnes', routes.campagneRoutes);
app.use('/admins/campagnes/actives', routes.campagneActiveRoutes);

// Middleware pour gérer les routes inexistantes
app.use((req, res, next) => {
    res.status(404).json({ message: "❌ Route non trouvée." });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error('❌ Erreur serveur:', err.stack);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
});

module.exports = app;
