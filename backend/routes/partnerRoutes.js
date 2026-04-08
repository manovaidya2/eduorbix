// routes/partnerRoutes.js
import express from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/partnerController.js';

const router = express.Router();

// Public routes
router.post('/enquiry', createEnquiry);

// Protected routes (add authentication middleware in production)
router.get('/enquiries', getAllEnquiries);
router.get('/enquiry/:id', getEnquiryById);
router.put('/enquiry/:id/status', updateEnquiryStatus);
router.delete('/enquiry/:id', deleteEnquiry);

export default router;