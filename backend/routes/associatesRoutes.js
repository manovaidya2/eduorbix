import express from "express";
import { 
  createAssociates, 
  getAllAssociates, 
  getAssociateById,
  updateAssociate,
  deleteAssociate,
  deleteDocument
} from "../controllers/associatesController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

// Routes
router.post("/associates", uploadFields, createAssociates);
router.get("/associates", getAllAssociates);
router.get("/associates/:id", getAssociateById);
router.put("/associates/:id", uploadFields, updateAssociate);
router.delete("/associates/:id", deleteAssociate);
router.delete("/associates/:id/documents/:docIndex", deleteDocument);

export default router;