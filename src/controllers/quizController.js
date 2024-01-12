const { Quiz } = require("../models");
let visible;
let data;

const quizController = {
  async renderQuizPage(req, res) {
    try {

      const { id } = req.params;

      const quiz = await Quiz.findByPk(id,{

        include: [
          { association: 'tags' }, 
          { association: 'questions', include: [
            { association: 'level' }, 
            { association: 'propositions' },
            { association: 'good_answer' }
          ] }
        ],
      });

      req.session.bookmarks = quiz;
      req.session.visible = false;
      visible=req.session.visible;
      data = req.session.bookmarks;

      //   console.log(JSON.stringify(quiz, null, 2));

      res.render("quiz", { quiz,visible });

    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  renderResult (req, res){


    req.session.visible = true;
    visible=req.session.visible;
    // console.log(visible, visible===true);
    // console.log(data);

    const yourresponses = Object.entries(req.body).map(([key, value]) => ({ key, value }));
    console.log(yourresponses);

    let quiz = data;


    res.render("quiz", { quiz,visible, yourresponses});


  }


};

module.exports = quizController;
