const Service = require('../services');

const { StatusCodes } =
require('http-status-codes');

const {
  ErrorResponse,
  SuccessResponse
} = require('../utils/common');



/*
POST /api/v1/patients
Create Patient
*/

const registerPatient = async (req, res) => {

  try {

    const patient =
      await Service.Patient.createPatient({

        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,

        // important — logged in user
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



/*
GET /api/v1/patients
Get all patients of logged user
*/

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



/*
GET /api/v1/patients/:id
*/

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



/*
DELETE /api/v1/patients/:id
*/

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



/*
PUT /api/v1/patients/:id
*/

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