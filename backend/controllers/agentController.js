// controllers/agentController.js
import Agent from '../models/Agent.js';

// @desc    Register a new agent/franchise
// @route   POST /api/agents/register
// @access  Public
export const registerAgent = async (req, res) => {
  try {
    const { fullName, phone, email, city, interest } = req.body;

    // Validate required fields
    if (!fullName || !phone || !email || !city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, phone, email, and city',
      });
    }

    // Check if agent already exists with same email
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({
        success: false,
        message: 'Agent with this email already registered',
      });
    }

    // Create new agent registration
    const agentRegistration = await Agent.create({
      fullName,
      phone,
      email,
      city,
      interest: interest || 'Agent',
    });

    res.status(201).json({
      success: true,
      message: 'Agent registration submitted successfully',
      data: agentRegistration,
    });
  } catch (error) {
    console.error('Error creating agent registration:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Get all agent registrations
// @route   GET /api/agents/registrations
// @access  Private/Admin
export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ registeredAt: -1 });
    
    res.status(200).json({
      success: true,
      count: agents.length,
      data: agents,
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Get single agent registration
// @route   GET /api/agents/registration/:id
// @access  Private/Admin
export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent registration not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    console.error('Error fetching agent:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Agent registration not found',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Update agent registration status
// @route   PUT /api/agents/registration/:id/status
// @access  Private/Admin
export const updateAgentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'contacted', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }
    
    const agent = await Agent.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent registration not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Agent status updated successfully',
      data: agent,
    });
  } catch (error) {
    console.error('Error updating agent:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Delete agent registration
// @route   DELETE /api/agents/registration/:id
// @access  Private/Admin
export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent registration not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Agent registration deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting agent:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Get statistics of agent registrations
// @route   GET /api/agents/stats
// @access  Private/Admin
export const getAgentStats = async (req, res) => {
  try {
    const total = await Agent.countDocuments();
    const pending = await Agent.countDocuments({ status: 'pending' });
    const contacted = await Agent.countDocuments({ status: 'contacted' });
    const approved = await Agent.countDocuments({ status: 'approved' });
    const rejected = await Agent.countDocuments({ status: 'rejected' });
    
    const franchiseCount = await Agent.countDocuments({ interest: 'Franchise' });
    const agentCount = await Agent.countDocuments({ interest: 'Agent' });
    
    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        contacted,
        approved,
        rejected,
        franchiseCount,
        agentCount,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};