import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create an index on contactId for faster queries
messageSchema.index({ contactId: 1 });

// Create an index on timestamp for sorting
messageSchema.index({ timestamp: -1 });

// Update the updatedAt timestamp before saving
messageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Message = mongoose.model('Message', messageSchema); 