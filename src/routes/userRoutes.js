import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, deleteAccount } from "../controllers/userController.js";


const router = express.Router();


router.use(authMiddleware);


router.get("/me", getProfile);
router.put("/me", updateProfile);
router.delete("/me", deleteAccount);


export default router;