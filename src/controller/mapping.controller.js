const Service = require('../services');

const { StatusCodes } =
require('http-status-codes');

const {
  ErrorResponse,
  SuccessResponse
} = require('../utils/common');



/*
POST /api/v1/mappings
Assign doctor to patient
*/

const assignDoctor = async (req, res) => {

  try {

    const mapping =
      await Service.Mapping
        .assignDoctor({

          patientId:
            req.body.patientId,

          doctorId:
            req.body.doctorId

        });

    SuccessResponse.data = mapping;

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
GET /api/v1/mappings/:patientId
*/

const getDoctorsByPatient = async (req, res) => {

  try {

    const doctors =
      await Service.Mapping
        .getDoctorsByPatient(
          req.params.patientId
        );

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
DELETE /api/v1/mappings/:id
*/

const removeMapping = async (req, res) => {

  try {

    const response =
      await Service.Mapping
        .removeMapping(req.params.id);

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


module.exports = {

  assignDoctor,
  getDoctorsByPatient,
  removeMapping

};