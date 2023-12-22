import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type:String,
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    key_res: {
      type:Array,
      required:true
    }, // Array of benefits offered by the job
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
    },
    icon:{
      type:String,
      required:true
    },
    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level"],
    },
    // applyLink: String, // URL to apply for the job
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model representing the job poster
      required: true,
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", JobSchema);

export default Jobs;
