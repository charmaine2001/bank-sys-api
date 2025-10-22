import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import errorHandler from "./middleware/errorHandler.js";


const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());


app.get("/", (req, res) => res.json({ ok: true, message: "Banking API" }));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);


app.use(errorHandler);


export default app;