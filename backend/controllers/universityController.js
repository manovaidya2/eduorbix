import University from '../models/University.js';

// Get all universities
export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find({ isActive: true })
      .sort({ rank: 1, name: 1 });
    
    res.status(200).json({
      success: true,
      count: universities.length,
      data: universities
    });
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching universities',
      error: error.message
    });
  }
};

// Get single university by ID
export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: university
    });
  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching university',
      error: error.message
    });
  }
};

// Create new university
export const createUniversity = async (req, res) => {
  try {
    const { country, category, rank, name, location, type, tags } = req.body;
    
    // Check if university already exists
    const existingUniversity = await University.findOne({ name });
    if (existingUniversity) {
      return res.status(400).json({
        success: false,
        message: 'University with this name already exists'
      });
    }
    
    // Create new university
    const university = await University.create({
      country,
      category,
      rank,
      name,
      location,
      type,
      tags: tags || []
    });
    
    res.status(201).json({
      success: true,
      message: 'University created successfully',
      data: university
    });
  } catch (error) {
    console.error('Error creating university:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating university',
      error: error.message
    });
  }
};

// Update university
export const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const university = await University.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'University updated successfully',
      data: university
    });
  } catch (error) {
    console.error('Error updating university:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating university',
      error: error.message
    });
  }
};

// Delete university (soft delete)
export const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'University deleted successfully',
      data: university
    });
  } catch (error) {
    console.error('Error deleting university:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting university',
      error: error.message
    });
  }
};

// Hard delete university (permanently remove)
export const hardDeleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'University permanently deleted'
    });
  } catch (error) {
    console.error('Error permanently deleting university:', error);
    res.status(500).json({
      success: false,
      message: 'Error permanently deleting university',
      error: error.message
    });
  }
};

// Get universities by category
export const getUniversitiesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const universities = await University.find({ 
      category, 
      isActive: true 
    }).sort({ rank: 1 });
    
    res.status(200).json({
      success: true,
      count: universities.length,
      data: universities
    });
  } catch (error) {
    console.error('Error fetching universities by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching universities by category',
      error: error.message
    });
  }
};

// Search universities
export const searchUniversities = async (req, res) => {
  try {
    const { query } = req.query;
    
    const universities = await University.find({
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    }).sort({ rank: 1 });
    
    res.status(200).json({
      success: true,
      count: universities.length,
      data: universities
    });
  } catch (error) {
    console.error('Error searching universities:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching universities',
      error: error.message
    });
  }
};

// Bulk delete universities
export const bulkDeleteUniversities = async (req, res) => {
  try {
    const { ids } = req.body;
    
    await University.updateMany(
      { _id: { $in: ids } },
      { isActive: false }
    );
    
    res.status(200).json({
      success: true,
      message: `${ids.length} universities deleted successfully`
    });
  } catch (error) {
    console.error('Error bulk deleting universities:', error);
    res.status(500).json({
      success: false,
      message: 'Error bulk deleting universities',
      error: error.message
    });
  }
};

// Create a default export object with all controllers
const universityController = {
  getAllUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  hardDeleteUniversity,
  getUniversitiesByCategory,
  searchUniversities,
  bulkDeleteUniversities
};

export default universityController;