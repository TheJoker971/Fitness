# Fitness API

## Sommaire
* INSTALLATION DE L'API 
* CONFIGURATION


## Installation de l'API

Lorsque vous récupérez l'API dans le répertoire GitHub lancez la command :
```shell
npm install
```
Pour installer les packages nécessaires au lancement de l'API


## Configuration de l'API

Rajoutez un fichier ``.env`` pour configurer l'API avec vos variables d'environnement
Exemple fichier ``.env``:
```dotenv
PORT=<num_port>
MONGODB_URI=mongodb:<uri_db>
MONGODB_USER=<user_db>
MONGODB_PASSWORD=<password>
```