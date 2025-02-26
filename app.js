const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./config/dbconfig');

const routes = require('./routes'); // Import centralisé des routes

const app = express();

// ✅ Middleware natif pour parser les requêtes en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Activer CORS pour permettre les requêtes externes
app.use(cors());

// Logger pour voir le mode en cours
console.log(`🌍 Mode actuel : ${process.env.NODE_ENV || 'development'}`);

// Utilisation des routes
app.use('/admin', routes.adminRoutes);
app.use('/admin/association', routes.associationRoutes);
app.use('/admin/mecene', routes.meceneRoutes);
app.use('/admin/ad', routes.publiciteRoutes);
app.use('/admin/campaign', routes.campagneRoutes);
// app.use('/admin/campaign_ads', routes.PubCampagneRoutes);

// Middleware pour gérer les routes inexistantes
app.use((req, res, next) => {
    res.status(404).json({ message: "❌ Route non trouvée." });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error('❌ Erreur serveur:', err.stack);
    res.status(500).json({ message: "Erreur serveur" });
});

module.exports = app;
