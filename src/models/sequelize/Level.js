const { DataTypes, Model } = require('sequelize');
const sequelize = require("./sequelize-client");

class Level extends Model {}

Level.init({
  name: DataTypes.TEXT
}, {
  sequelize,
  tableName: "level",
});

module.exports = Level;

