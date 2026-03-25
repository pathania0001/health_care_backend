const { StatusCodes } =
require("http-status-codes");

const { AppError } =
require("../utils");

const MappingRepository =
require("../repositories/mapping.repo");

const mappingRepository =
new MappingRepository();

const assignDoctor = async (data) => {

  try {

    const mapping =
      await mappingRepository
        .assignDoctor(
          data.patientId,
          data.doctorId
        );

    return mapping;

  } catch (error) {

    throw new AppError(
      "Cannot assign doctor",
      StatusCodes.INTERNAL_SERVER_ERROR
    );

  }

};

const getDoctorsByPatient = async (patientId) => {

  return await mappingRepository
    .getDoctorsByPatient(patientId);

};

const removeMapping = async (id) => {

  return await mappingRepository.destroy(id);

};

module.exports = {

  assignDoctor,
  getDoctorsByPatient,
  removeMapping

};