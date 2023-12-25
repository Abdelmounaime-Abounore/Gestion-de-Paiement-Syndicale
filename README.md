**Introduction**

Ce projet vise à créer une application web facilitant la gestion des paiements mensuels des cotisations d'un syndicat d'appartements. L'application doit fournir les fonctionnalités suivantes :

-   Le syndic peut gérer les appartements en les créant, les modifiant et les supprimant du système.
-   Le syndic peut gérer les paiements mensuels pour chaque appartement, notamment en créant le paiement pour chaque appartement et en imprimant les reçus.
-   Le syndic peut ajouter un nouveau client au système et lui attribuer un appartement.

## La partie Backend 

### Technology Stack

-   Express.js comme framework du backend
-   MongoDB comme base de données
-   Node.js comme Runtime

### Features

-   Authentification et autorisation des utilisateurs
-   Opérations CRUD
-   Téléchargement de fichiers

## Frontend Application

### Technology Stack

-   React.js

### Features

-   Components interactifs
-   Navigation flexible entre les Components

## Installation and Setup

### Backend Application

1. Clone le repository dans votre machine.

```bash
git clone https://github.com/Abdelmounaime-Abounore/Gestion-de-Paiement-Syndicale.git
```

2. Allez dans le backend dossier et exécutez le commande : 

```bash
cd Backend
```

3. Installez les dépendances requises.

```bash
npm install
```

4. Créez un fichier « .env » dans le répertoire racine du projet et ajoutez les variables d'environnement suivantes :

```
DATABASE_URL = you mongo database
ACCESS_TOKEN_SECRET = your token secret

```

5. Démarrez l'application backend.

```bash
npm start
```

### Frontend Application

1. retournez à votre racine principale

```bash
cd ..

```

2. Allez dans le frontend dossier et exécutez le commande : 

```bash
cd Frontend
```

3. Installez les dépendances requises.

```bash
npm install
```

5. Démarrez l'application frontend.

```bash
npm run dev
```

## Utilisation

### Application back-end

L'application backend fournit une API RESTful pour interagir avec les données stockées dans la base de données. Vous pouvez utiliser n'importe quel client REST, tel que Postman ou Insomnia, pour envoyer des requêtes à l'API.

### Application frontale

L'application frontend fournit une interface utilisateur pour interagir avec l'API backend. Vous pouvez utiliser un navigateur Web pour accéder à l'application.