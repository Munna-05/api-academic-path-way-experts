import { TryCatch } from "../Helpers/Error.js";

export const adminController = {
    login:TryCatch(async(req,res)=>{

    }),
    createAdmin:TryCatch(async(req,res)=>{
        const {username,password} = req.body
    }),
    changePassword:TryCatch(async(req,res)=>{

    }),
    getAllEnquiries:TryCatch(async(req,res)=>{

    }),
    addCountries:TryCatch(async(req,res)=>{

    }),
    editCountries:TryCatch(async(req,res)=>{

    }),
    deleteCountries:TryCatch(async(req,res)=>{

    }),
    addServices:TryCatch(async(req,res)=>{

    }),
    editServices:TryCatch(async(req,res)=>{

    }),
    deleteServices:TryCatch(async(req,res)=>{

    }),


}