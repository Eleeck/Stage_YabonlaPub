# Stage_YabonlaPub
Réalisation pour le site Yabonlapub
API admin en NODE.JS en utilisant XAMP 

Langage utilisé : JavaScript

Le dossier doc contient : 
- Un fichier .yaml pour les entrées, sorties et routes
- Un fichier sql de création de la base de données
- Un fichier .txt avec toutes les fonctionnalités listées

Conseillé d'installer npm pour le projet
composants utilisés :
- npm install express
- npm install jsonwebtoken
- npm install dotenv
- npm install bcrypt
- npm install mysql2 (ou - npm install mongoose en fonction de votre configuration et vos outils)
- npm install body-parser

L'api possède déjà des scripts de lancement dans package.json
❗Fichiers contenant les variables d'environnements : 
.env.developemnt et .env.production 
doivent être modifiés avant le lancement du serveur❗
Configurer les ports du serveur et de la base de données en fonctions du mode et de vos paramètres
 Démarrage en mode dev : npm run dev
 Démarrage en mode production : npm start
Le fichier .sh permet de faire les tests des routes. Vous pouvez le réutiliser ou utiliser Postman ou votre outil habituel
