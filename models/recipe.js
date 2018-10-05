module.exports = function(sequelize, DataTypes) {
  var Allergy = sequelize.define("Allergy", {
    meal: DataTypes.STRING,
    allergy: DataTypes.TEXT
  });
  return Allergy;
};