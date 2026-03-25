const { StatusCodes } =
require("http-status-codes");

const { AppError } =
require("../utils");

const DoctorRepository =
require("../repositories/doctor.repo");

const doctorRepository =
new DoctorRepository();

const createDoctor = async (data) => {

  try {

    const doctor =
      await doctorRepository.create(data);

    return doctor;

  } catch (error) {

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
      "Cannot Create Doctor",
      StatusCodes.INTERNAL_SERVER_ERROR
    );

  }

};

const getAllDoctors = async () => {

  try {

    return await doctorRepository.getAll();

  } catch (error) {

    throw new AppError(
      "Cannot fetch doctors",
      StatusCodes.INTERNAL_SERVER_ERROR
    );

  }

};

const getDoctorById = async (id) => {

  return await doctorRepository.get(id);

};

const destroyDoctor = async (id) => {

  return await doctorRepository.destroy(id);

};

const updateDoctor = async (id, data) => {

  return await doctorRepository.update(id, data);

};

module.exports = {

  createDoctor,
  getAllDoctors,
  getDoctorById,
  destroyDoctor,
  updateDoctor

};