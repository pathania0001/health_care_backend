const express = require("express");

const router = express.Router();

const {
  Mapping
} = require("../../controller");

const authMiddleware =
require("../../middlewares/auth.middleware");

router.post(
  "/",
  Mapping.assignDoctor
);

router.get(
  "/:patientId",
  Mapping.getDoctorsByPatient
);

router.delete(
  "/:id",
  Mapping.removeMapping
);


module.exports = router;