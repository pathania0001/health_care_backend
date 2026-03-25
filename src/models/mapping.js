'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Mapping.belongsTo(models.Patient, { foreignKey: 'patientId' });
  Mapping.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
}

  }
  Mapping.init({
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mapping',
  });
  return Mapping;
};