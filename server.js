import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()
import userRoute from './Routes/UserRouter.js'
import adminController from './Routes/AdminRouter.js'
import { handleError } from './Helpers/Error.js';

app.use(cors())
app.use(express.json())
dotenv.config()

let port = 5000 || 5001 || 5002
const server = app.listen(port, () => {

    console.log(`server started ${port}`)
    mongoose.connect('mongodb+srv://APE:APE_2023@cluster0.r8qezcf.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log("DataBase connection successfull")
    }).catch(() => {
        console.log('Connection Error')
    })
})
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})
app.use('/admin', adminController)
app.use('/', userRoute)    
app.use(handleError)