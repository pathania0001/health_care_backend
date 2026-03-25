const express =
require("express");

const router =
express.Router();

const {User} =
require("../../controller");

const authMiddleware =
require("../../middlewares/auth.middleware");

router.post(
  "/register",
  User.registerUser
);

router.post(
  "/login",
  User.loginUser
);

router.post(
  "/refresh-token",
  User.refreshToken
);

router.post(
  "/logout",
  authMiddleware,
  User.logout
);

module.exports =
router;