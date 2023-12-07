import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import Enquiry from "../../Models/Enquiry.js";
import enquiryValidation from "./EnquiryValidation.js";

export const EnquiryController = {
  getAllEnquiries: TryCatch(async (req, res) => {
    const data = await Enquiry.find().catch((e) => console.log(e));
    data
      ? sendResponse(200, data, res)
      : sendResponse(404, { message: "No data found" }, res);
  }),
  createEnquiry: TryCatch(async (req, res) => {
    const { error, value } = enquiryValidation.validate(req.body);

    if (error) {
      sendResponse(400, { message: getError(error) }, res);
    } else {
      console.log(value);
      const newData = new Enquiry(req.body);
      const saved = await newData.save();

      saved
        ? sendResponse(200, saved, res)
        : sendResponse(400, { message: "Enquiry Failed , Try again" }, res);
    }
  }),
};
