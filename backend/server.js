import express from 'express'
import 'dotenv/config'
import { dbConnnect } from './config/db.js'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 3003

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use("api/message",messageRoute)

dbConnnect()
app.listen(PORT,()=>{
    console.log('server is running')
})