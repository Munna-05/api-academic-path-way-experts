import httpError from "./httpError.js";

export const handleError = (error, req, res, next) => {
  if (error instanceof httpError) {
    return res.status(error.statusCode).json({message:error.message});
  }
  return res.status(500).json({message:error.message});
};
export const createError =(status ,errorMessage) =>{
    const err = new Error()
    err.status = status
    err.message = errorMessage
    return err
}

export const TryCatch = (controller) => async(req,res,next)=>{
    try {
        await controller(req,res)
    } catch (error) {
        console.log("🚀 ~ file: Error.js:20 ~ TryCatch ~ error:", error)
        return next(error)
    }
}  

export const sendResponse = (status,message,res)=>{
    console.log(`Responded with status code : ${status}`)
    res.status(status).json(message)
}

export const getError =(error)=> error.details[0].message