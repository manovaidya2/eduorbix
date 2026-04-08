import express from 'express';
import * as contactController from '../controllers/contactController.js';

const router = express.Router();

// Contact routes
router.post('/contact', contactController.createContact);
router.get('/contact', contactController.getAllContacts);
router.get('/contact/stats', contactController.getContactStats);
router.get('/contact/:id', contactController.getContactById);
router.patch('/contact/:id/status', contactController.updateContactStatus);
router.delete('/contact/:id', contactController.deleteContact);

export default router;