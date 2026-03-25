'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
   static associate(models) {
  Patient.belongsTo(models.User, { foreignKey: 'userId' });
  Patient.belongsToMany(models.Doctor, { through: 'Mappings', foreignKey: 'patientId' });
}
  }
  Patient.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};