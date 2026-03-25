const express = require("express");

const router = express.Router();

const {
  Doctor
} = require("../../controller");

const authMiddleware =
require("../../middlewares/auth.middleware");

router.post(
  "/",
  Doctor.registerDoctor
);

router.get(
  "/",
  Doctor.getAllDoctors
);

router.get(
  "/:id",
  Doctor.getDoctorById
);

router.put(
  "/:id",
  Doctor.updateDoctor
);

router.delete(
  "/:id",
  Doctor.destroyDoctor
);


module.exports = router;