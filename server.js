import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()
import userRoute from './Routes/UserRouter.js'
import adminRouter from './Routes/AdminRouter.js'
import { handleError } from './Helpers/Error.js';
import logger from "morgan"
import morgan from 'morgan';

// app.use(morgan(':method :url :status :response-time ms'));
app.use(cors())
app.use(express.json())
dotenv.config()

let port = 5000 || 5001 || 5002
const server = app.listen(port, () => {

    console.log(`server started ${port}`)
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("DataBase connection successfull")
    }).catch(() => {
        console.log('Connection Error')
    })
}) 
app.use((req,res,next)=>{
    console.log(req.method +" "+ req.url)
    
    next()
})
app.use('/admin', adminRouter)
app.use('/', userRoute)    
app.use(handleError)