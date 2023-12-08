import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import Enquiry from "../../Models/Enquiry.js";
import User from "../../Models/User.js";
import enquiryValidation from "./EnquiryValidation.js";
import bcrypt from "bcrypt";

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
      bcrypt.hash(value?.phone, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          console.log(err);
        } else {
          const isUserExists = await User.findOne({
            $or: [{ email: value?.email }, { phone: value?.phone }],
          }).catch((e) => console.log(e));
          console.log(
            "🚀 ~ file: EnquiryController.js:29 ~ isUserExists:",
            isUserExists
          );

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
    const user = await User.findById(req.params.id).catch((e) =>
      console.log(e)
    );
    const data = await Enquiry.find({ userid: user?._id }).catch((e) =>
      console.log(e)
    );
    data
      ? sendResponse(200, data, res)
      : sendResponse(400, { message: "No data" }, res);
  }),
};
