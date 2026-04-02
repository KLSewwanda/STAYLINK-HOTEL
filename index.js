import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dns from "node:dns"
import userRouter from "./routers/userRouter.js"
import authenticate from './middlewares/authenticate.js'
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config()

const mongoDBURI = process.env.MONGO_URI

mongoose.connect(mongoDBURI).then(
    () => {
        console.log("Connected mongoDB successfully")
    }
)

const app = express()
app.use(express.json())

app.use(authenticate)
    


app.use("/users", userRouter)

app.listen(3000, () => {
        console.log('Server is running on port 3000')
    }
)