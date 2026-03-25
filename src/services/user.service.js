const bcrypt = require("bcrypt");

const { StatusCodes } =
require("http-status-codes");

const { AppError } =
require("../utils");

const {

  generateAccessToken,

  generateRefreshToken,

  verifyRefreshToken

} = require(
  "../utils/common/jwt"
);

const UserRepository =
require("../repositories/user.repo");

const userRepository =
new UserRepository();

const registerUser =
async (data) => {

  try {

    const existingUser =
      await userRepository
        .getUserByEmail(
          data.email
        );

    if (existingUser) {

      throw new AppError(
        "Email already exists",
        StatusCodes.BAD_REQUEST
      );

    }

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

    const accessToken =
      generateAccessToken(
        user.id
      );

    const refreshToken =
      generateRefreshToken(
        user.id
      );

    await userRepository
      .updateRefreshToken(
        user.id,
        refreshToken
      );

    return {
      user,
      accessToken,
      refreshToken
    };

  } catch (error) {

    throw error;

  }

};

const loginUser =
async (data) => {

  try {

    const user =
      await userRepository
        .getUserByEmail(
          data.email
        );

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

    const accessToken =
      generateAccessToken(
        user.id
      );

    const refreshToken =
      generateRefreshToken(
        user.id
      );

    await userRepository
      .updateRefreshToken(
        user.id,
        refreshToken
      );

    return {
      user,
      accessToken,
      refreshToken
    };

  } catch (error) {

    throw error;

  }

};

const refreshAccessToken =
async (refreshToken) => {

  try {

    if (!refreshToken) {

      throw new AppError(
        "Refresh token required",
        StatusCodes.BAD_REQUEST
      );

    }

    const decoded =
      verifyRefreshToken(
        refreshToken
      );

    const user =
      await userRepository
        .getById(
          decoded.id
        );

    if (!user) {

      throw new AppError(
        "User not found",
        StatusCodes.NOT_FOUND
      );

    }

    if (
      user.refreshToken !==
      refreshToken
    ) {

      throw new AppError(
        "Invalid refresh token",
        StatusCodes.UNAUTHORIZED
      );

    }

    const newAccessToken =
      generateAccessToken(
        user.id
      );

    return {
      accessToken: newAccessToken
    };

  } catch (error) {

    throw error;

  }

};

const logoutUser =
async (userId) => {

  await userRepository
    .updateRefreshToken(
      userId,
      null
    );

  return true;

};

module.exports = {

  registerUser,

  loginUser,

  refreshAccessToken,

  logoutUser

};