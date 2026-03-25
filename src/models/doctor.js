'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
  Doctor.belongsToMany(models.Patient, { through: 'Mappings', foreignKey: 'doctorId' });
}
  }
  Doctor.init({
    name: DataTypes.STRING,
    specialty: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};