const { Router } = require("express");
const mainController = require("./controllers/mainController");
const levelController = require("./controllers/levelController");
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
// Créer un router
const router = Router();

// Le configurer
router.get("/", mainController.renderHomePage);
router.get("/levels", levelController.renderLevelsPage);
router.get("/quiz/:id", quizController.renderQuizPage);
router.post("/quiz/:id", quizController.renderResult);
router.get("/quiz", quizController.renderQuizPage);
router.get("/tag", tagController.renderTagPage);
// L'exporter
module.exports = router;

