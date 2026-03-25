const express = require("express");

const router = express.Router();

const {
  Patient
} = require("../../controller");

const authMiddleware =
require("../../middlewares/auth.middleware");



router.post(
  "/",
  Patient.registerPatient
);

router.get(
  "/",
  Patient.getAllPatients
);

router.get(
  "/:id",
  Patient.getPatientById
);

router.put(
  "/:id",
  Patient.updatePatient
);

router.delete(
  "/:id",
  Patient.destroyPatient
);


module.exports = router;