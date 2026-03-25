const CrudRepositories = require("./crud.repo");

const { Doctor } = require("../models");

class DoctorRepository extends CrudRepositories {

  constructor() {
    super(Doctor);
  }

}

module.exports = DoctorRepository;