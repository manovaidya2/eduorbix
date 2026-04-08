import express from 'express';
import * as applicationController from '../controllers/applicationController.js';

const router = express.Router();

// Application routes
router.post('/applications', applicationController.createApplication);
router.get('/applications', applicationController.getAllApplications);
router.get('/applications/stats', applicationController.getApplicationStats);
router.get('/applications/status/:status', applicationController.getApplicationsByStatus);
router.get('/applications/:id', applicationController.getApplicationById);
router.put('/applications/:id', applicationController.updateApplication);
router.patch('/applications/:id/status', applicationController.updateApplicationStatus);
router.delete('/applications/:id', applicationController.deleteApplication);

export default router;