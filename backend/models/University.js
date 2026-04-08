import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Indian', 'Abroad'],
    required: true
  },
  rank: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Public', 'Private', 'Deemed', 'Central', 'State'],
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add index for better search performance
universitySchema.index({ name: 1, category: 1 });
universitySchema.index({ tags: 1 });

const University = mongoose.model('University', universitySchema);
export default University;