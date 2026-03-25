// repositories/patient.repo.js

const CrudRepositories = require("./crud.repo");

const { Patient } = require("../models");

class PatientRepository
extends CrudRepositories {

  constructor() {
    super(Patient);
  }

}

module.exports = PatientRepository;