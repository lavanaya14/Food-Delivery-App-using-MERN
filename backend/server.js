import express from "express"
import cors from "cors";
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import dotenv from 'dotenv';
import cartRouter from "./routes/cartRoute.js"
import orderRoutes from "./routes/orderRoute.js"
import paymentRoutes from "./routes/paymentRoutes.js";
// import path from "path";
// import { fileURLToPath } from "url";




// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, ".env") });

//app config
dotenv.config();
const app = express()
const port = 4000

// //middleware
app.use(express.json())
// app.use(cors({
//     origin: "http://localhost:3000",  // <-- frontend React ka port
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
app.use(cors());

//db connection
connectDB();


//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRoutes)
app.use("/api/payment",paymentRoutes);

app.get("/", (req, res) => {
    res.send("API working");
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})