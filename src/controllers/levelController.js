const { Level } = require("../models");
const prompt = require('prompt');
let levelchange;
let lvlid;

const levelController = {
  async renderLevelsPage(req, res) {
    try {

      const levels = await Level.findAll();
      req.session.levelchange = false;
      levelchange = req.session.levelchange;

      req.session.levels = levels;
  
      res.render("levels", { levels, levelchange  });

    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  async addLevel (req,res) {

    // console.log(req.body.name);

    const newLevel = await Level.create({name: req.body.name});

    // console.log(newLevel);

    res.redirect('/levels');


  },

  async deleteLevel (req,res) {


    const deletelvl = Object.entries(req.body).map(([key, value]) => ({ key}));

    // console.log(deletelvl[0].key);

    await Level.destroy({where: {id: deletelvl[0].key}});

    res.redirect('/levels');

  },


  async changelevelname (req,res) {


    const changenamelvl = Object.entries(req.body).map(([key, value]) => ({ key}));

    // console.log(changenamelvl[0].key);

      req.session.levelchange = true;
      levelchange = req.session.levelchange;

      levels = req.session.levels;

      const level = await Level.findByPk(parseInt(changenamelvl[0].key))

      lvlid = {id: changenamelvl[0].key, name: level.dataValues.name};

      console.log(lvlid);

      req.session.lvlid = lvlid;

      res.render("levels", { levels, levelchange, lvlid });


  },


  async validatename (req, res){

    const newlevelname = Object.entries(req.body).map(([key, value]) => ({ key, value }));

    // console.log(newlevelname, newlevelname[0].key, newlevelname[0].value, typeof parseInt(newlevelname[0].key));

    const level = await Level.findByPk(parseInt(newlevelname[0].key))

    level.name = newlevelname[0].value;

    // console.log(level);

    await level.save();

    const levels = await Level.findAll();

    req.session.levelchange = false;
    levelchange = req.session.levelchange;

    res.render("levels", { levels, levelchange  });

  }

};

module.exports = levelController;
