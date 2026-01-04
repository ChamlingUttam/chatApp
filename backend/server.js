// import express from 'express'
// import 'dotenv/config'
// import { dbConnnect } from './config/db.js'
// import authRoute from './routes/auth.route.js'
// import messageRoute from './routes/message.route.js'
// import cookieParser from 'cookie-parser'
// import cors from 'cors'
// const PORT = process.env.PORT || 3003

// const app = express()

// app.use(express.json())
// app.use(cookieParser())

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials:true,
//      methods: ["GET","POST","PUT","DELETE"],
//     allowedHeaders: ["Content-Type","Authorization"],

// }))

// app.use('/api/auth',authRoute)
// app.use("/api/message",messageRoute)

// dbConnnect()
// app.listen(PORT,()=>{
//     console.log('server is running')
// })







import express from "express";
import "dotenv/config";
import { dbConnnect } from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3003;

/* ✅ CORS */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Body size for base64 images */
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

dbConnnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
