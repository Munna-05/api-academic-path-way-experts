import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import httpError from "../../Helpers/httpError.js";
import Services from "../../Models/Services.js";
import serviceValidation from "./ServiceValidation.js";

export const ServiceController = {
  addServices: TryCatch(async (req, res) => {
    const { error, value } = serviceValidation.validate(req.body);
    if (error) {
      throw new httpError(400, getError(error));
    } else {
      const newService = new Services(value);
      const saveService = await newService.save();
      saveService
        ? sendResponse(
            200,
            { data: saveService, message: "New Service Added" },
            res
          )
        : sendResponse(400, { message: "Error Adding New Service" }, res);
    }
  }),
  getAllServices: TryCatch(async (req, res) => {
    const data = await Services.find()
      .sort({ createdAt: -1 })
      .catch((e) => console.log(e));
    data
      ? sendResponse(200, data, res)
      : sendResponse(400, { message: "No data" }, res);
  }),
  getServiceById: TryCatch(async (req, res) => {}),
  editServices: TryCatch(async (req, res) => {}),
  deleteServices: TryCatch(async (req, res) => {
    const deleteService = await Services.findByIdAndDelete(req.params.id).catch(
      (e) => console.log(e)
    );
    setTimeout(() => {
      deleteService
        ? sendResponse(200, { message: "Service Deleted" }, res)
        : sendResponse(400, { message: "Delete Service Failed" }, res);
    }, 1000);
  }),
};
