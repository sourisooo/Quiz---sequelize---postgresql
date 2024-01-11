require("dotenv/config");

const { Sequelize } = require('sequelize');

// Créer une instance de connexion à notre BDD Postgres (équivalent du new pg.Client() en avec pg)
const sequelize = new Sequelize('postgres://postgres:random@localhost/quizoclock', {
  define: {
    createdAt: "created_at", // Rajouter le mapping createdAt (Sequelize) -> created_at (Postgres) pour tous nos modèles
    updatedAt: "updated_at"
  }
});

module.exports = sequelize;
