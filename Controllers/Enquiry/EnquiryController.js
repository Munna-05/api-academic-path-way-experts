import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import httpError from "../../Helpers/httpError.js";
import Enquiry from "../../Models/Enquiry.js";
import User from "../../Models/User.js";
import enquiryValidation from "./EnquiryValidation.js";
import bcrypt from "bcrypt";

export const EnquiryController = {
  getAllEnquiries: TryCatch(async (req, res) => {
    const data = await Enquiry.find().sort({createdAt:-1}).catch((e) => console.log(e));
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
      bcrypt.hash(value?.phone, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          console.log(err);
        } else {
          const isUserExists = await User.findOne({
            $or: [{ email: value?.email }, { phone: value?.phone }],
          }).catch((e) => console.log(e));
         

          if (!isUserExists) {
            const data = {
              name: value?.name,
              email: value?.email,
              password: hash,
              phone: value?.phone,
            };
            const newUser = new User(data);
            const saveUser = await newUser.save().catch((e) => console.log(e));
            const enquiry = {
              name: value?.name,
              email: value?.email,
              message: value?.message,
              phone: value?.phone,
              userid: saveUser?._id,
            };

            const newData = new Enquiry(enquiry);
            const saved = await newData.save();
            saved && saveUser
              ? sendResponse(
                  200,
                  {
                    data: saved,
                    message: "Enquiry submitted and Account created",
                  },
                  res
                )
              : sendResponse(
                  400,
                  { message: "Enquiry Failed , Try again" },
                  res
                );
          } else {
            const enquiry = {
              name: value?.name,
              email: value?.email,
              message: value?.message,
              phone: value?.phone,
              userid: isUserExists?._id,
            };
            const newData = new Enquiry(enquiry);
            const saved = await newData.save();
            saved
              ? sendResponse(
                  200,
                  { data: saved, message: "Enquiry submitted" },
                  res
                )
              : sendResponse(
                  400,
                  { message: "Enquiry Failed , Try again" },
                  res
                );
          }
        }
      });
    }
  }),
  getAllEnquiriesByUser: TryCatch(async (req, res) => {
    const user = await User.findById(req.params.userid).catch((e) =>
      console.log(e)
    );
    const data = await Enquiry.find({ userid: user?._id }).sort({createdAt:-1}).catch((e) =>
      console.log(e)
    );
    data
      ? sendResponse(200, data, res)
      : sendResponse(400, { message: "No data" }, res);
  }),
  updateEnquiry: TryCatch(async (req, res) => {
    const { error, value } = enquiryValidation.validate(req.body); 
    if (error) {
      throw new httpError(400, getError(error));
    } else {
      const updated = await Enquiry.findByIdAndUpdate(
        req.params.id,
        { value },
        { new: true }
      ).catch((e) => console.log(e));
      updated
        ? sendResponse(200, { message: "Enquiry Updated" }, res)
        : sendResponse(400, { message: "Error Updating" }, res);
    }
  }),
};
