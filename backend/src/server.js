
import express from 'express';
import cors from 'cors';
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "../config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(express.json());
app.use(rateLimiter)


app.use("/api/notes",notesRoutes);

connectDB().then(()=>{

    app.listen(PORT,()=>{
    console.log("Server started on port:",PORT);
});

});