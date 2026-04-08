import express from 'express';
import {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  permanentDeleteProgram,
  getProgramsByCategory,
  getCategoryStats,
  toggleProgramStatus,
  softDeleteProgram  // Add this if you want to keep soft delete
} from '../controllers/studyIndiaProgramController.js';

const router = express.Router();

// Public routes
router.get('/', getAllPrograms);
router.get('/stats/categories', getCategoryStats);
router.get('/category/:category', getProgramsByCategory);
router.get('/:id', getProgramById);

// Delete routes
router.delete('/:id', deleteProgram);  // Hard delete
router.delete('/:id/soft', softDeleteProgram);  // Soft delete (optional)
router.delete('/:id/permanent', permanentDeleteProgram);  // Permanent delete

// Other routes
router.post('/', createProgram);
router.put('/:id', updateProgram);
router.patch('/:id/toggle-status', toggleProgramStatus);

export default router;