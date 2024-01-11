// Charger les variables d'environnement
require("dotenv/config");

// Importer les dépendances
const express = require("express");
const router = require("./src/router");
const middleware404 = require("./middlewares/middleware404");

// Créer une app Express
const app = express();

// Configurer EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Servir statiquement le contenu du dossier public
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

const expressSession = require('express-session');

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));

// Brancher le router
app.use(router);

app.use(middleware404);

// Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
