import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },

  status: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const Enquiry = mongoose.model("Enquiry", EnquirySchema);

export default Enquiry;
