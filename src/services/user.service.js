const bcrypt = require("bcrypt");

const { StatusCodes } =
require("http-status-codes");

const { AppError } =
require("../utils");

const generateToken =
require("../utils/common/jwt");

const UserRepository =
require("../repositories/user.repo");

const userRepository =
new UserRepository();



// REGISTER USER

const registerUser = async (data) => {

  try {

    const existingUser =
      await userRepository
        .getUserByEmail(data.email);

    if (existingUser) {

      throw new AppError(
        "Email already exists",
        StatusCodes.BAD_REQUEST
      );

    }

    // Hash password

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    const user =
      await userRepository.create({

        name: data.name,
        email: data.email,
        password: hashedPassword

      });

    return user;

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

    throw error;

  }

};



// LOGIN USER

const loginUser = async (data) => {

  try {

    const user =
      await userRepository
        .getUserByEmail(data.email);

    if (!user) {

      throw new AppError(
        "User not found",
        StatusCodes.NOT_FOUND
      );

    }

    const validPassword =
      await bcrypt.compare(
        data.password,
        user.password
      );

    if (!validPassword) {

      throw new AppError(
        "Invalid credentials",
        StatusCodes.UNAUTHORIZED
      );

    }

    const token =
      generateToken(user.id);

    return {
      user,
      token
    };

  } catch (error) {

    throw error;

  }

};


module.exports = {

  registerUser,
  loginUser

};