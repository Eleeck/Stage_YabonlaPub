const fs = require('fs');
const path = require('path');
const http = require('http');
const app = require('./app');

// Définir le mode actuel (par défaut: development)
const NODE_ENV = process.env.NODE_ENV || 'development';

// Définir le chemin du bon fichier .env
const envFile = path.resolve(__dirname, `.env.${NODE_ENV}`);

// Vérifier si le fichier .env existe et le charger
if (fs.existsSync(envFile)) {
    require('dotenv').config({ path: envFile });
    console.log(`📄 Fichier de configuration chargé: ${envFile}`);
} else {
    console.warn(`⚠️ Attention: Aucun fichier .env spécifique trouvé pour '${NODE_ENV}', utilisation des variables globales.`);
}

// Définir le port du serveur
const PORT = process.env.SERVER_PORT || 3000;

console.log(`🌍 Mode actuel : ${NODE_ENV}`);
console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);

// Création du serveur HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
