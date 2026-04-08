import Appointment from "../models/Appointment.js";

/* CREATE APPOINTMENT */
export const createAppointment = async (req, res) => {
  try {
    const { name, phone, location, date, message } = req.body;

    if (!name || !phone || !location || !date) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const appointment = await Appointment.create({
      name,
      phone,
      location,
      date,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ADMIN – GET ALL APPOINTMENTS */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
