const { Tag, Level, Quiz, Question, User, Answer  } = require("../models/index.js");

const mainController = {
  async renderHomePage(req, res) {

    const quizs =  await Quiz.findAll({

      

      include: [{
        association: "tags",
        attributes: ["name"],
        through: { attributes: [] }, // Bonus : pour ne PAS inclure la TABLE de liaison
        order: [["quiz","title", "ASC"]]
        
      },
      {association: "author",},
   
      ]
     
    });
   
    // console.log(JSON.stringify(quizs, null, 2));

    res.render("home", {quizs});
  }
};

module.exports = mainController;
