# Test connaissances web basiques

## Contexte et stack technique

- Application frontend React
  - Besoin de Node.js
  - Besoin du cli Symfony : [https://symfony.com/download](https://symfony.com/download)
  - Besoin d'un package-manager `npm` ou `yarn`
- Application backend Symfony
  - [Api] Symfony Api platform
  - [Authentification] Symfony
  - [Base de données] SQlite

## Mise en place du projet

- Cloner le repository `git clone git@github.com:re-connect/interview-symfony.git`
- `cd interview-symfony`

### Frontend

- `cd client`
- `yarn`
- `yarn start`

### Backend

- Installer les dépendances `composer install`
- Démarrer le serveur `symfony serve`
- Le serveur a démarré à [http://localhost:8000](http://localhost:8000)

## Ce qui est déjà en place

- Backend
  - Authentification possible en jwt
  - Base de données avec des utilisateurs de des données
  - Il y a un utilisateur de test: email: tester@gmail.com passwd: I@mTheT€ster
- Frontend
  - Il y a déjà une requête qui permet d'authentifier l'utilisateur et qui fait une requête au back pour récupérer les bénéficiaires du backend
  - L'email et le mot de passe sont hardcodés, c'est pour ça qu'on aimerait avoir un formulaire à la place

## Missions

- 1. Forker le projet sur votre github
- 2. Faire fonctionner le projet en local
- 3. Rajouter une page d'authentification sur le frontend qui permet de se connecter et de récupérer un token jwt pour faire des requêtes au backend
- 4. Dans une page d'accueil authentifiée, afficher les informations de l'utilisateur dans le frontend dans le header
- 5. Ajouter une barre de recherche par nom (idéalement, une recherche dans le backend via un call AJAX, sinon, en pur frontend)
  - 5.bonus Ajouter une barre de recherche front et une barre de recherche back
- 6. Ajouter un bouton qui permet d'enregistrer une personne dans la base de données
  - 6.bonus À la création d'une personne en bdd, persister en base l'email du créateur et la date de création
  - 6.bonus-bis Ajouter un bouton sur chaque personne qui permet de le supprimer de la base de données

## Points d'attention

- 1. Attention à faire du code propre, selon vos propres standards (pas forcément des tests unitaires, mais ça peut pas être mauvais)
- 2. Committez et pushez régulièrement
- 3. N'hésitez pas à noter les timings de ce que vous faites pour savoir où vous avez perdu du temps
