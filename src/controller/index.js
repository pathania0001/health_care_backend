const UserController =
require('./user.controller');

const PatientController =
require('./patient.controller');

const DoctorController =
require('./doctor.controller');

const MappingController =
require('./mapping.controller');


module.exports = {

  User: UserController,

  Patient: PatientController,

  Doctor: DoctorController,

  Mapping: MappingController

};