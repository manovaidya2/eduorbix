// models/Partner.js
import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  institutionName: {
    type: String,
    required: [true, 'Institution/Organization name is required'],
    trim: true,
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  partnershipType: {
    type: String,
    enum: ['University / College', 'Agent', 'Institution'],
    default: 'Institution',
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
partnerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;