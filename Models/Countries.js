import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true
  }
},{timestamps:true});

const Countries = mongoose.model('Countries', countrySchema);

export default Countries;
