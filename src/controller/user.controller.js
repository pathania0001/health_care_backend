const Service = require("../services");

const { StatusCodes } =
require("http-status-codes");

const {
  ErrorResponse,
  SuccessResponse
} = require("../utils/common");



/*
POST /api/v1/auth/register
*/

const registerUser = async (req, res) => {

  try {

    const user =
      await Service.User.registerUser({

        name: req.body.name,
        email: req.body.email,
        password: req.body.password

      });

    SuccessResponse.data = user;

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
POST /api/v1/auth/login
*/

const loginUser = async (req, res) => {

  try {

    const response =
      await Service.User.loginUser({

        email: req.body.email,
        password: req.body.password

      });

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

  registerUser,
  loginUser

};