const Service = require('../services');

const { StatusCodes } =
require('http-status-codes');

const {
  ErrorResponse,
  SuccessResponse
} = require('../utils/common');



const registerPatient = async (req, res) => {

  try {

    const patient =
      await Service.Patient.createPatient({

        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        userId: req.userId

      });

    SuccessResponse.data = patient;

    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error = error;

    return res
      .status(error.statusCode)
      .json(ErrorResponse);

  }

};



const getAllPatients = async (req, res) => {

  try {

    const patients =
      await Service.Patient
        .getAllPatients(req.userId);

    SuccessResponse.data = patients;

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error = error;

    return res
      .status(error.statusCode)
      .json(ErrorResponse);

  }

};




const getPatientById = async (req, res) => {

  try {

    const patient =
      await Service.Patient
        .getPatientById(req.params.id);

    SuccessResponse.data = patient;

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error = error;

    return res
      .status(error.statusCode)
      .json(ErrorResponse);

  }

};



const destroyPatient = async (req, res) => {

  try {

    const response =
      await Service.Patient
        .destroyPatient(req.params.id);

    SuccessResponse.data = response;

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error = error;

    return res
      .status(error.statusCode)
      .json(ErrorResponse);

  }

};





const updatePatient = async (req, res) => {

  try {

    const patient =
      await Service.Patient
        .updatePatient(
          req.params.id,
          req.body
        );

    SuccessResponse.data = patient;

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error = error;

    return res
      .status(error.statusCode)
      .json(ErrorResponse);

  }

};


module.exports = {

  registerPatient,
  getAllPatients,
  getPatientById,
  destroyPatient,
  updatePatient

};