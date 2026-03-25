const { StatusCodes } =
require("http-status-codes");

const { AppError } =
require("../utils");

const PatientRepository =
require("../repositories/patient.repo");

const patientRepository =
new PatientRepository();




const createPatient = async (data) => {

  try { 
   // console.log("i am getting data :",data)

    const patient =
      await patientRepository.create(data);
     
    return patient;

  } catch (error) {
   console.log("my error :",error)
    if (
      error.name === "SequelizeValidationError"
    ) {

      let explanation = [];

      error.errors.forEach(err => {
        explanation.push(err.message);
      });

      throw new AppError(
        explanation,
        StatusCodes.BAD_REQUEST
      );

    }

    throw new AppError(
      "Cannot Create Patient",
      StatusCodes.INTERNAL_SERVER_ERROR
    );

  }

};



const getAllPatients = async (userId) => {

  try {

    const patients =
      await patientRepository
        .getPatientsByUser(userId);

    return patients;

  } catch (error) {

    throw new AppError(
      "Cannot fetch patients",
      StatusCodes.INTERNAL_SERVER_ERROR
    );

  }

};


const getPatientById = async (id) => {

  try {

    const patient =
      await patientRepository.get(id);

    return patient;

  } catch (error) {

    if (
      error.statusCode === StatusCodes.NOT_FOUND
    ) {

      throw new AppError(
        "Patient not found",
        error.statusCode
      );

    }

    throw new AppError(
      "Cannot fetch patient",
      StatusCodes.INTERNAL_SERVER_ERROR
    );

  }

};



const destroyPatient = async (id) => {

  return await patientRepository.destroy(id);

};


const updatePatient = async (id, data) => {

  return await patientRepository.update(id, data);

};


module.exports = {

  createPatient,
  getAllPatients,
  getPatientById,
  destroyPatient,
  updatePatient

};