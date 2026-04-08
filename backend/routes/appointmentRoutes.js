import express from "express";
import {
  createAppointment,
  getAllAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

/* USER */
router.post("/book", createAppointment);

/* ADMIN */
router.get("/admin/all", getAllAppointments);

export default router;
