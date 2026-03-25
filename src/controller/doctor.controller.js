const Service = require('../services');

const { StatusCodes } =
require('http-status-codes');

const {
  ErrorResponse,
  SuccessResponse
} = require('../utils/common');



/*
POST /api/v1/doctors
*/

const registerDoctor = async (req, res) => {

  try {

    const doctor =
      await Service.Doctor.createDoctor({

        name: req.body.name,
        specialization:
          req.body.specialization

      });

    SuccessResponse.data = doctor;

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
GET /api/v1/doctors
*/

const getAllDoctors = async (req, res) => {

  try {

    const doctors =
      await Service.Doctor
        .getAllDoctors();

    SuccessResponse.data = doctors;

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
GET /api/v1/doctors/:id
*/

const getDoctorById = async (req, res) => {

  try {

    const doctor =
      await Service.Doctor
        .getDoctorById(req.params.id);

    SuccessResponse.data = doctor;

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
DELETE /api/v1/doctors/:id
*/

const destroyDoctor = async (req, res) => {

  try {

    const response =
      await Service.Doctor
        .destroyDoctor(req.params.id);

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
PUT /api/v1/doctors/:id
*/

const updateDoctor = async (req, res) => {

  try {

    const doctor =
      await Service.Doctor
        .updateDoctor(
          req.params.id,
          req.body
        );

    SuccessResponse.data = doctor;

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

  registerDoctor,
  getAllDoctors,
  getDoctorById,
  destroyDoctor,
  updateDoctor

};