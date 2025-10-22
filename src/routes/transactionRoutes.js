import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { deposit, withdraw, transfer, history } from "../controllers/transactionController.js";


const router = express.Router();
router.use(authMiddleware);


router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/transfer", transfer);
router.get("/history", history);


export default router;