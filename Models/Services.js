import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true
  },
  countries: [String], // Array of countries where the service is offered
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model representing the creator of the service
    required: true,
  },

},{timestamps:true});

const Services = mongoose.model('Services', serviceSchema);

export default Services;
