const { Op } = require("sequelize");
const Level = require("./Level");
const User = require("./User");
const Tag = require("./Tag");
const Quiz = require("./Quiz");
const Question = require("./Question");
const Answer = require("./Answer");

test();

async function test() {
  
  // =========================
  // ======== READ ===========
  // =========================

  // ==== findAll ====
  const levels = await Level.findAll();
  console.log(levels); // [Level{}, Level{}, Level{}]
  console.log(levels[0].id);
  console.log(levels[0].name);

  // === findAll ===
  const users = await User.findAll();
  console.log(users);

  // => Astuce pour VISUALISER les tableaux d'objet Sequelize de manière "visuel" (uniquement à but de console.log)
  console.log(JSON.stringify(users, null, 2));

  // === findByPk ===
  const user3 = await User.findByPk(3); // Pk = Primary Key = ID
  console.log(user3);

  // => Astuce pour VISUALISER les objet Sequelize de manière "visuel" (uniquement à but de console.log)
  console.log(user3.get());
  console.log(user3.toJSON());

  // ==== count ====
  const nbOfLevel = await Level.count(); // équivalent de :    SELECT COUNT(*) FROM "level"
  console.log(nbOfLevel); // 3

  // ==== findOne ====
  const expertLevel = await Level.findOne({       // équivalent de : .... LIMIT 1
    where: { name: "Expert" }                     // équivalent de WHERE name = 'Expert'
  }); 
  console.log(expertLevel.get());


  // Autres options : REGEX
  const levelsContainingLetter = await Level.findAll({
    where: {
      name: {
        [Op.like]: '%r%' // LIKE %
      }
    }
  });
  console.log(JSON.stringify(levelsContainingLetter, null, 2));

  // Autres options : ORDER BY
  const orderedLevels = await Level.findAll({
    order: [['name', 'ASC']]
  });
  console.log(JSON.stringify(orderedLevels, null, 2));



  // =========================
  // ======== CREATE =========
  // =========================

  // Créer un user Harry Potter !
  
  // Méthode 1 : instancier un User puis persister
  const harry = new User({
    firstname: "Harry",
    lastname: "Potter",
    email: "harry@hogwarts.io",
    password: "123456"
  });
  await harry.save(); // équivalent du 'insert()' qu'on avait codé à la main

  // Méthode 2 : les deux en 1 
  const hermione = await User.create({ // Créer l'instance, insert(), et renvoie l'instance
    firstname: "Hermione",
    lastname: "Granger",
    email: "hermione@hogwarts.io",
    password: "123456"
  });
  console.log(hermione.get());


  // =========================
  // ======== DELETE =========
  // =========================

  const voldy = await User.create({
    firstname: "Tom",
    lastname: "Jedusor",
    email: "voldy@hogwarts.io",
    password: "M0rtAuxM0ldu"
  });
  await voldy.destroy();

  // Autre exemple
  // const user = await User.findByPk(4);
  // user.destroy();


  // =========================
  // ======== UPDATE =========
  // =========================

  const chuck = await User.findOne({ where: { email: "chuck@oclock.io" }});
  chuck.lastname = "Berry"; // On modifie sur l'instance le nom de famille
  await chuck.save(); // On persiste en base => comme notre 'update()' maison


  // Alternativement, en 1 ligne
  await chuck.update({ lastname: "Norris" });


  // ==== TAG ====
  const tag = await Tag.findByPk(1);
  console.log(tag.get());

  // ==== Quiz ===
  const quizzes = await Quiz.findAll();
  console.log(quizzes.length); // 18

  // === Question ===
  const question = await Question.findOne({ where: { description: "Toto" }});
  console.log(question); // null

  // === Answer ====
  const answers = await Answer.findAll({ limit: 2 });
  console.log(answers.length); // 2
}

