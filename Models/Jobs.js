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
    location: String,
    description: {
      type: String,
      required: true,
    },
    key_res: [String], // Array of benefits offered by the job
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
    },
    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level"],
    },
    applyLink: String, // URL to apply for the job
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model representing the job poster
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", JobSchema);

export default Jobs;
