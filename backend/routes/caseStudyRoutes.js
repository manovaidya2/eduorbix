import express from "express";
import {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudyBySlug,
  deleteCaseStudy,
  updateCaseStudy
} from "../controllers/caseStudyController.js";

const router = express.Router();

router.post("/", createCaseStudy);
router.get("/", getAllCaseStudies);
router.get("/:slug", getCaseStudyBySlug);
router.delete("/:id", deleteCaseStudy);
router.put("/:id", updateCaseStudy);  // Add this route

export default router;
