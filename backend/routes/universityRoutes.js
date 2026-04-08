import express from "express";
const router = express.Router();

import universityController from "../controllers/universityController.js";

// Public routes
router.get("/", universityController.getAllUniversities);
router.get("/search", universityController.searchUniversities);
router.get("/category/:category", universityController.getUniversitiesByCategory);
router.get("/:id", universityController.getUniversityById);

// Admin routes
router.post("/", universityController.createUniversity);
router.put("/:id", universityController.updateUniversity);
router.delete("/:id", universityController.deleteUniversity);
router.delete("/hard/:id", universityController.hardDeleteUniversity);
router.post("/bulk-delete", universityController.bulkDeleteUniversities);

export default router;