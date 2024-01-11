const { Question, Level, User, Quiz, Answer, Tag } = require("./associations");

main();

async function main() {
  // Récupérer une Question (et son Level associé)
  const question = await Question.findByPk(1, { include: "level" });
  console.log(question.toJSON());

  // Récupérer un Level (et ses Question associées)
  const level = await Level.findOne({
    where: { name: "Expert" },
    include: "questions"
  });
  console.log(level.toJSON());

  // Récupérer un User (et ses quizzes)
  const user = await User.findByPk(1, { include: "quizzes" });
  console.log(user.toJSON());

  // Récupérer les Quizzes (et leur author)
  const quizzes = await Quiz.findAll({ include: "author" });
  console.log(JSON.stringify(quizzes, null, 2));

  // Récupérer un quiz (et ses questions)
  const quiz = await Quiz.findOne({ include: "questions" });
  console.log(quiz.toJSON());

  // Récupérer une question (et le quiz duquel elle appartient)
  const firstQuestion = await Question.findByPk(1, { include: "quiz" });
  console.log(firstQuestion.toJSON());

  // Récupérer une question (et ses propositions)
  const secondQuestion = await Question.findByPk(2, { include: "propositions" });
  console.log(secondQuestion.toJSON());

  // Récupérer une proposition (et savoir à quelle question elle appartient) --> weird use case !
  const propositions = await Answer.findAll({ include: "question" });
  console.log(JSON.stringify(propositions, null, 2));

  // Récupérer une question (et sa bonne réponse !)
  const thirdQuestion = await Question.findByPk(3, { include: "good_answer" });
  console.log(thirdQuestion.toJSON());

  // Récupérer la question à partir d'une "bonne réponse" (encore plus weird)
  const goodAnswer = await Answer.findByPk(1, { include: "question_it_answers" });
  console.log(goodAnswer.toJSON()); // goodAnswer.question_it_answers = { ... }

  const badAnswer = await Answer.findByPk(946, { include: "question_it_answers" });
  console.log(badAnswer.toJSON()); // badAnswer.question_it_answers = null ici !

  // Récupérer une quiz et tous ses tags
  const quiz1 = await Quiz.findByPk(1, { include : "tags" });
  console.log(quiz1.toJSON());

  // Récupérer un tag (et tous ses quizzes associés)
  const cookingTag = await Tag.findOne({ where: { name: "Gastronomie" }, include: "quizzes" });
  console.log(cookingTag.toJSON());
}


// Note : faire des query complexes !
