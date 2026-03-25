const Service =
require("../services");

const { StatusCodes } =
require("http-status-codes");

const {

  ErrorResponse,

  SuccessResponse

} = require(
  "../utils/common"
);

const registerUser =
async (req, res) => {

  try {

    const response =
      await Service.User
        .registerUser({

          name: req.body.name,

          email: req.body.email,

          password: req.body.password

        });

    SuccessResponse.data =
      response;

    return res

      .status(StatusCodes.CREATED)

      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error =
      error;

    return res

      .status(error.statusCode)

      .json(ErrorResponse);

  }

};

const loginUser =
async (req, res) => {

  try {

    const response =
      await Service.User
        .loginUser({

          email: req.body.email,

          password: req.body.password

        });

    SuccessResponse.data =
      response;

    return res

      .status(StatusCodes.OK)

      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error =
      error;

    return res

      .status(error.statusCode)

      .json(ErrorResponse);

  }

};

const refreshToken =
async (req, res) => {

  try {

    const response =
      await Service.User
        .refreshAccessToken(
          req.body.refreshToken
        );

    SuccessResponse.data =
      response;

    return res

      .status(StatusCodes.OK)

      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error =
      error;

    return res

      .status(error.statusCode)

      .json(ErrorResponse);

  }

};

const logout =
async (req, res) => {

  try {

    await Service.User
      .logoutUser(req.userId);

    SuccessResponse.data =
      "Logged out";

    return res

      .status(StatusCodes.OK)

      .json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error =
      error;

    return res

      .status(error.statusCode)

      .json(ErrorResponse);

  }

};

module.exports = {

  registerUser,

  loginUser,

  refreshToken,

  logout

};