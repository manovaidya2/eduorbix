import mongoose from 'mongoose';

const studyIndiaProgramSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Program title is required'],
    trim: true,
    index: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  programOverview: {
    type: String,
    required: [true, 'Program overview is required'],
    trim: true
  },
  programOutcomes: {
    type: String,
    required: [true, 'Program outcomes is required'],
    trim: true
  },
  duration: {
    type: String,
    trim: true,
    default: ''
  },
  fee: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Program category is required'],
    enum: [
      'REGULAR PROGRAMS',
      'COUNCIL APPROVED PROGRAMS',
      'SKILLED BASED INDUSTRY INTEGRATED PROGRAMS',
      'ONLINE & DISTANCE MODE EDUCATION',
      'BOARD EDUCATION'
    ],
    default: 'REGULAR PROGRAMS',
    index: true
  },
  eligibility: [{
    type: String,
    trim: true,
    required: [true, 'Eligibility criteria cannot be empty']
  }],
  universities: [{
    type: String,
    trim: true,
    required: [true, 'University name cannot be empty']
  }],
  admission: [{
    type: String,
    trim: true,
    required: [true, 'Admission step cannot be empty']
  }],
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search functionality
studyIndiaProgramSchema.index({ 
  title: 'text', 
  description: 'text', 
  programOverview: 'text' 
});

// Pre-save middleware to update timestamps
studyIndiaProgramSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for program type
studyIndiaProgramSchema.virtual('programType').get(function() {
  if (this.category.includes('ONLINE')) return 'Online';
  if (this.category.includes('SKILLED')) return 'Skilled Based';
  if (this.category.includes('COUNCIL')) return 'Council Approved';
  if (this.category.includes('BOARD')) return 'Board Education';
  return 'Regular';
});

// Method to get summary
studyIndiaProgramSchema.methods.getSummary = function() {
  return {
    id: this._id,
    title: this.title,
    category: this.category,
    duration: this.duration,
    fee: this.fee,
    eligibilityCount: this.eligibility.length,
    universityCount: this.universities.length
  };
};

// Static method to find by category
studyIndiaProgramSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ createdAt: -1 });
};

// Static method to get all categories with counts
studyIndiaProgramSchema.statics.getCategoryCounts = async function() {
  return this.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

const StudyIndiaProgram = mongoose.model('StudyIndiaProgram', studyIndiaProgramSchema);

export default StudyIndiaProgram;