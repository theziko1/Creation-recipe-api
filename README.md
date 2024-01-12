# Projet API avec Express.js, MongoDB (Mongoose) et Multer

Ce projet est une API construite avec Express.js pour la gestion des données dans une base de données MongoDB à l'aide de Mongoose. Il utilise également Multer pour la gestion des fichiers, notamment pour le téléchargement d'images.

## Configuration et Installation

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/votre-utilisateur/express-mongodb-multer-api.git
   cd express-mongodb-multer-api
Installer les dépendances :

bash
Copy code
npm install
Configurer la base de données MongoDB :

Assurez-vous que MongoDB est installé localement ou configurez l'URL de votre base de données dans le fichier config/db.js.
Configurer les variables d'environnement :

Créez un fichier .env à la racine du projet et définissez les variables d'environnement nécessaires. Vous pouvez utiliser le fichier .env.example comme modèle.
Exécution de l'application
Démarrer l'application :

bash
Copy code
npm start
L'API sera accessible à l'adresse http://localhost:3000.

Tester l'API :

Utilisez des outils comme Postman ou cURL pour tester les différentes routes de l'API.
Routes de l'API
GET /recipes: Récupérer toutes les recettes.
GET /recipes/:id: Récupérer une recette par ID.
POST /recipes: Ajouter une nouvelle recette avec une image (utilisation de Multer).
PUT /recipes/:id: Mettre à jour une recette par ID.
DELETE /recipes/:id: Supprimer une recette par ID.
Contribuer
Si vous souhaitez contribuer à ce projet, suivez ces étapes :

Fork du projet
Créez une branche pour votre fonctionnalité (git checkout -b feature/ma-fonctionnalite)
Commit de vos modifications (git commit -am 'Ajout d'une nouvelle fonctionnalité')
Push de la branche (git push origin feature/ma-fonctionnalite)
Créez une nouvelle Pull Request
Licence
Ce projet est sous licence MIT.

