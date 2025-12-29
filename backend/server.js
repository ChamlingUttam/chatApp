import express from 'express'
import 'dotenv/config'
import { dbConnnect } from './config/db.js'
import authRoute from './routes/auth.route.js'
const PORT = process.env.PORT || 3003

const app = express()

app.use(express.json())

app.use('/api/auth',authRoute)

dbConnnect()
app.listen(PORT,()=>{
    console.log('server is running')
})