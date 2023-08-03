const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'please provide name of the company'],
      max: [50, 'Company name cannot be more than 50 characters'],
    },
    position: {
      type: String,
      required: [true, 'Please provide the position'],
      max: [100, 'This cannot be more than 100 characters'],
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
