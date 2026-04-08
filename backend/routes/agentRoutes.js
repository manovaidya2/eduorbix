// routes/agentRoutes.js
import express from 'express';
import {
  registerAgent,
  getAllAgents,
  getAgentById,
  updateAgentStatus,
  deleteAgent,
  getAgentStats,
} from '../controllers/agentController.js';

const router = express.Router();

// Public routes
router.post('/register', registerAgent);

// Protected routes (add authentication middleware in production)
router.get('/registrations', getAllAgents);
router.get('/registration/:id', getAgentById);
router.put('/registration/:id/status', updateAgentStatus);
router.delete('/registration/:id', deleteAgent);
router.get('/stats', getAgentStats);

export default router;