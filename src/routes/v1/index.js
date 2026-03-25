
const express  = require('express');
const authRouter = require('./auth.routes');
const patientRouter = require('./patient.routes ');
const doctorRouter = require('./doctor.routes');
const mappingRouter = require('./mapping.routes');
const v1Routes = express.Router();
const authMiddleware =
require("../../middlewares/auth.middleware");

v1Routes.use(
  "/auth",
  authRouter
);

v1Routes.use(
  "/patients",
  authMiddleware,
  patientRouter
);

v1Routes.use(
  "/doctors",
  authMiddleware,
  doctorRouter
);

v1Routes.use(
  "/mappings",
  authMiddleware,
  mappingRouter
);
module.exports = v1Routes;
