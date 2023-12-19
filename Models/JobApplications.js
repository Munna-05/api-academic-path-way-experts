import mongoose from "mongoose";

const jobApplications = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jobs"
      }
},{timestamps:true});



export default mongoose.model('JobApplications',jobApplications)