const { User, Question, Quiz } = require("./associations");

main();

async function main() {
  // Exercice 1 : récupérer uniquement le firstname, lastname de l'utilisateur n°1
  const user1 = await User.findByPk(1, {
    attributes: ["firstname", "lastname"]
  });
  console.log(user1.toJSON());

  // Exercice 2 : récupérer le user 1 ainsi que la description (et uniquement la description) des quizzes qu'il a créé
  const user2 = await User.findByPk(1, {
    include: {
      association: "quizzes", // on précise l'alias via la clé "association"
      attributes: ["description"] // On selecte uniquement ces champs là sur l'association !
    },
    attributes: ["firstname", "lastname"]
  });
  console.log(user2.toJSON());

  // Exercice 3 : récupérer la question 1 et inclure à la fois son Level et ses Propositions !
  const question1 = await Question.findByPk(1, {
    include: ["level", "propositions"]
  });
  console.log(question1.toJSON());

  // Exercice 4 : récupérer la question 1 (juste la description et id) et inclure à la fois son Level (juste le name) et ses Propositions (juste la description)!
  const question2 = await Question.findByPk(1, {
    attributes: ["description", "id"],
    include: [
      { association: "level", attributes: ["name"] },
      { association: "propositions", attributes: ["description"] }
    ]
  });
  console.log(question2.toJSON());

  // Exercice 5 (mauvais exo !) : récupérer TOUS les quizzes en incluant leurs Tag (juste le name du tag) triés par ordre alphabétique
  const quizzes = await Quiz.findAll({
    include: {
      association: "tags",
      attributes: ["name"],
      through: { attributes: [] }, // Bonus : pour ne PAS inclure la TABLE de liaison
    },
    order: [
      ["tags", "name", "ASC"] // Bonus 2 : deep ordering 
    ]
  });
  console.log(JSON.stringify(quizzes, null, 2));

  // Exercice 6 : récupérer un quiz en incluant ses questions ET les propositions aux questions
  const quiz = await Quiz.findByPk(1, {
    include: {
      association: "questions",
      include: { association: "propositions" }
    }
  });
  console.log(quiz.toJSON());

  // Affichage du nom du quiz : 
  console.log(quiz.title);

  // Affichage des descriptions des questions
  quiz.questions.forEach(question => {
    console.log("  ", question.description);

    question.propositions.forEach(proposition => {
      console.log("    ", proposition.description);
    });

  });

}