import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import Jobs from "../../Models/Jobs.js";
import jobValidation from "./JobsValidation.js";

export const OpeningsController = {
  createNewOpening: TryCatch(async (req, res) => {
    const { error, value } = jobValidation.validate(req.body);

    // Extract job details from the request body

    if (error) {
      console.log(
        "🚀 ~ file: OpeningsController.js:11 ~ createNewOpening:TryCatch ~ error:",
        getError(error)
      );

      sendResponse(400, { message: getError(error) }, res);
    } else {
      const {
        title,
        company,
        location,
        description,
        key_res,
        type,
        icon,
        experienceLevel,
        applyLink,
        postedBy,
      } = value;

      // Create a new job instance using the Jobs model
      const newJob = new Jobs({
        title,
        company,
        location,
        description,
        key_res,
        type,
        icon,
        experienceLevel,
        applyLink,
        postedBy: postedBy, // Assuming postedBy is a user ID
      });

      // Save the job to the database
      await newJob.save();

      // Respond with a success message
      sendResponse(200, { message: "New Job listed" }, res);
    }
  }),
  getAllOpenings: TryCatch(async (req, res) => {
    const data = await Jobs.find().sort({createdAt:-1}).catch((e) => console.log(e));
    data
      ? sendResponse(200, data, res)
      : sendResponse(400, { message: "No Data" }, res);
  }),
  getOpeningsById: TryCatch(async (req, res) => {}),
  updateOpenings: TryCatch(async (req, res) => {}),
  deleteOpenings: TryCatch(async (req, res) => {}),
};
