import { TryCatch, getError, sendResponse } from "../../Helpers/Error.js";
import Countries from "../../Models/Countries.js";
import countryValidation from "./CountryValidation.js";

export const ContryController = {
  addCountries: TryCatch(async (req, res) => {
    const { error, value } = countryValidation.validate(req.body);
    if (error) {
      sendResponse(400, { message: getError(error) }, res);
    } else {
      const newCountry = new Countries(value);
      const save = await newCountry.save();
      save
        ? sendResponse(200, { message: "new country details added" }, res)
        : sendResponse(400, { message: "Error , Try again" }, res);
    }
  }),

  getAllCountries: TryCatch(async (req, res) => {
    const data = await Countries.find()
      .sort({ createdAt: -1 })
      .catch((e) => console.log(e));
    data
      ? sendResponse(200, data, res)
      : sendResponse(400, { message: "No data" }, res);
  }),

  getCountriesById: TryCatch(async (req, res) => {}),

  editCountries: TryCatch(async (req, res) => {}),

  deleteCountries: TryCatch(async (req, res) => {
    const deleteCountry = await Countries.findByIdAndDelete(req.query.id).then(()=>{
        sendResponse(200,{message:"Country details removed"},res)
    }).catch(e=>console.log(e))
    
  }),
};
