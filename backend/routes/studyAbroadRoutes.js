import express from "express";
import {
  createStudyAbroad,
  getStudyAbroad,
  getStudyAbroadById,
  updateStudyAbroad,
  deleteStudyAbroad
} from "../controllers/studyAbroadController.js";

const router = express.Router();

router.post("/", createStudyAbroad);
router.get("/", getStudyAbroad);
router.get("/:id", getStudyAbroadById);
router.put("/:id", updateStudyAbroad);
router.delete("/:id", deleteStudyAbroad);

export default router;