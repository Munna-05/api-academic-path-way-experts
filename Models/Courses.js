import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['UG', 'PG'],
    required: true,
  },
  duration: {
    type: Number, // Duration in years
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},{timestamps:true});

const Courses = mongoose.model('Courses', courseSchema);

export default Courses;
