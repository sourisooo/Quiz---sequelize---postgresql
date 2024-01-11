const { Tag } = require("../models");

const tagController = {
  async renderTagPage(req, res) {
    try {

      const tags = await Tag.findAll({

        include: [
          { association: 'quizzes' }
        ],
      });

      

      // console.log(JSON.stringify(tags, null, 2));

      res.render("tags", { tags });

    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = tagController;