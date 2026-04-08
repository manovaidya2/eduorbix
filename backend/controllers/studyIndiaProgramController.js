import StudyIndiaProgram from '../models/StudyIndiaProgram.js';

// @desc    Create a new program
// @route   POST /api/study-india-programs
// @access  Private/Admin
export const createProgram = async (req, res) => {
  try {
    console.log('=== CREATE PROGRAM CONTROLLER ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const {
      title,
      description,
      programOverview,
      programOutcomes,
      duration,
      fee,
      category,
      eligibility,
      universities,
      admission
    } = req.body;

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Program title is required'
      });
    }

    if (!programOverview || !programOverview.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Program overview is required'
      });
    }

    if (!programOutcomes || !programOutcomes.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Program outcomes is required'
      });
    }

    // Filter out empty strings from arrays
    const filteredEligibility = (eligibility || []).filter(item => item && item.trim() !== '');
    const filteredUniversities = (universities || []).filter(item => item && item.trim() !== '');
    const filteredAdmission = (admission || []).filter(item => item && item.trim() !== '');

    // Validate arrays have at least one item
    if (filteredEligibility.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one eligibility criteria is required'
      });
    }

    if (filteredUniversities.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one university is required'
      });
    }

    if (filteredAdmission.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one admission step is required'
      });
    }

    // Check for duplicate program title
    const existingProgram = await StudyIndiaProgram.findOne({ 
      title: { $regex: new RegExp(`^${title.trim()}$`, 'i') } 
    });

    if (existingProgram) {
      return res.status(400).json({
        success: false,
        message: 'A program with this title already exists'
      });
    }

    // Create new program
    const program = new StudyIndiaProgram({
      title: title.trim(),
      description: description?.trim() || '',
      programOverview: programOverview.trim(),
      programOutcomes: programOutcomes.trim(),
      duration: duration?.trim() || '',
      fee: fee?.trim() || '',
      category: category || 'REGULAR PROGRAMS',
      eligibility: filteredEligibility,
      universities: filteredUniversities,
      admission: filteredAdmission
    });

    await program.save();

    console.log('Program created successfully:', program._id);

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: program
    });

  } catch (error) {
    console.error('Error in createProgram:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create program'
    });
  }
};

// @desc    Get all programs with filters
// @route   GET /api/study-india-programs
// @access  Public
export const getAllPrograms = async (req, res) => {
  try {
    const { category, isActive, search, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    // Apply filters
    if (category) {
      query.category = category;
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const programs = await StudyIndiaProgram.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    const total = await StudyIndiaProgram.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: programs,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      }
    });
    
  } catch (error) {
    console.error('Error in getAllPrograms:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch programs'
    });
  }
};

// @desc    Get single program by ID
// @route   GET /api/study-india-programs/:id
// @access  Public
export const getProgramById = async (req, res) => {
  try {
    const program = await StudyIndiaProgram.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: program
    });
    
  } catch (error) {
    console.error('Error in getProgramById:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch program'
    });
  }
};

// @desc    Update program
// @route   PUT /api/study-india-programs/:id
// @access  Private/Admin
export const updateProgram = async (req, res) => {
  try {
    const {
      title,
      description,
      programOverview,
      programOutcomes,
      duration,
      fee,
      category,
      eligibility,
      universities,
      admission,
      isActive
    } = req.body;
    
    const program = await StudyIndiaProgram.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    
    // Check for duplicate title (excluding current program)
    if (title && title !== program.title) {
      const existingProgram = await StudyIndiaProgram.findOne({ 
        title: { $regex: new RegExp(`^${title.trim()}$`, 'i') },
        _id: { $ne: req.params.id }
      });
      
      if (existingProgram) {
        return res.status(400).json({
          success: false,
          message: 'Another program with this title already exists'
        });
      }
    }
    
    // Update fields
    if (title) program.title = title.trim();
    if (description !== undefined) program.description = description?.trim() || '';
    if (programOverview) program.programOverview = programOverview.trim();
    if (programOutcomes) program.programOutcomes = programOutcomes.trim();
    if (duration !== undefined) program.duration = duration?.trim() || '';
    if (fee !== undefined) program.fee = fee?.trim() || '';
    if (category) program.category = category;
    if (eligibility) {
      program.eligibility = eligibility.filter(item => item && item.trim() !== '');
    }
    if (universities) {
      program.universities = universities.filter(item => item && item.trim() !== '');
    }
    if (admission) {
      program.admission = admission.filter(item => item && item.trim() !== '');
    }
    if (isActive !== undefined) program.isActive = isActive;
    
    program.updatedAt = Date.now();
    await program.save();
    
    res.status(200).json({
      success: true,
      message: 'Program updated successfully',
      data: program
    });
    
  } catch (error) {
    console.error('Error in updateProgram:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update program'
    });
  }
};

// Update the deleteProgram function in your controller

// @desc    Delete program (hard delete - permanent)
// @route   DELETE /api/study-india-programs/:id
// @access  Private/Admin
export const deleteProgram = async (req, res) => {
  try {
    console.log('=== DELETE PROGRAM CONTROLLER ===');
    console.log('Program ID to delete:', req.params.id);
    
    const program = await StudyIndiaProgram.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    
    // Hard delete - permanently remove from database
    await StudyIndiaProgram.findByIdAndDelete(req.params.id);
    
    console.log('Program deleted successfully:', req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Program deleted successfully'
    });
    
  } catch (error) {
    console.error('Error in deleteProgram:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete program'
    });
  }
};

// Keep soft delete as a separate function if needed
export const softDeleteProgram = async (req, res) => {
  try {
    const program = await StudyIndiaProgram.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    
    // Soft delete by setting isActive to false
    program.isActive = false;
    program.updatedAt = Date.now();
    await program.save();
    
    res.status(200).json({
      success: true,
      message: 'Program deactivated successfully'
    });
    
  } catch (error) {
    console.error('Error in softDeleteProgram:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to deactivate program'
    });
  }
};

// @desc    Hard delete program (permanent)
// @route   DELETE /api/study-india-programs/:id/permanent
// @access  Private/Admin
export const permanentDeleteProgram = async (req, res) => {
  try {
    const program = await StudyIndiaProgram.findByIdAndDelete(req.params.id);
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Program permanently deleted'
    });
    
  } catch (error) {
    console.error('Error in permanentDeleteProgram:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to permanently delete program'
    });
  }
};

// @desc    Get programs by category
// @route   GET /api/study-india-programs/category/:category
// @access  Public
export const getProgramsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const programs = await StudyIndiaProgram.findByCategory(category);
    
    res.status(200).json({
      success: true,
      count: programs.length,
      data: programs
    });
    
  } catch (error) {
    console.error('Error in getProgramsByCategory:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch programs by category'
    });
  }
};

// @desc    Get category statistics
// @route   GET /api/study-india-programs/stats/categories
// @access  Public
export const getCategoryStats = async (req, res) => {
  try {
    const stats = await StudyIndiaProgram.getCategoryCounts();
    
    res.status(200).json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Error in getCategoryStats:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch category statistics'
    });
  }
};

// @desc    Toggle program status (activate/deactivate)
// @route   PATCH /api/study-india-programs/:id/toggle-status
// @access  Private/Admin
export const toggleProgramStatus = async (req, res) => {
  try {
    const program = await StudyIndiaProgram.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }
    
    program.isActive = !program.isActive;
    program.updatedAt = Date.now();
    await program.save();
    
    res.status(200).json({
      success: true,
      message: `Program ${program.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { isActive: program.isActive }
    });
    
  } catch (error) {
    console.error('Error in toggleProgramStatus:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to toggle program status'
    });
  }
};




