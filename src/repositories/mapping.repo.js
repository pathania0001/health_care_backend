const CrudRepositories = require("./crud.repo");

const { Mapping } = require("../models");

class MappingRepository extends CrudRepositories {

  constructor() {
    super(Mapping);
  }


  async assignDoctor(patientId, doctorId) {

    const response =
      await Mapping.create({
        patientId,
        doctorId
      });

    return response;

  }


  async getDoctorsByPatient(patientId) {

    const response =
      await Mapping.findAll({
        where: { patientId }
      });

    return response;

  }

}

module.exports = MappingRepository;