// controllers/partnerController.js
import Partner from '../models/Partner.js';

// @desc    Create a new partnership enquiry
// @route   POST /api/partners/enquiry
// @access  Public
export const createEnquiry = async (req, res) => {
  try {
    const { institutionName, contactPerson, email, partnershipType, message } = req.body;

    // Validate required fields
    if (!institutionName || !contactPerson || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide institution name, contact person, and email',
      });
    }

    // Create new partner enquiry
    const partnerEnquiry = await Partner.create({
      institutionName,
      contactPerson,
      email,
      partnershipType: partnershipType || 'Institution',
      message: message || '',
    });

    res.status(201).json({
      success: true,
      message: 'Partnership enquiry submitted successfully',
      data: partnerEnquiry,
    });
  } catch (error) {
    console.error('Error creating partner enquiry:', error);
    
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

// @desc    Get all partnership enquiries
// @route   GET /api/partners/enquiries
// @access  Private/Admin
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Partner.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Get single partnership enquiry
// @route   GET /api/partners/enquiry/:id
// @access  Private/Admin
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Partner.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Update partnership enquiry status
// @route   PUT /api/partners/enquiry/:id/status
// @access  Private/Admin
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'contacted', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }
    
    const enquiry = await Partner.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Delete partnership enquiry
// @route   DELETE /api/partners/enquiry/:id
// @access  Private/Admin
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Partner.findByIdAndDelete(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};