const mysql = require('mysql2');
require('dotenv').config(); // Charge les variables d'environnement

// Création de la connexion MySQL avec les variables d'environnement
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'yabonlapub',
  port: process.env.MYSQL_PORT || 3306
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('✅ Connecté à la base de données MySQL.');
});

module.exports = connection;
